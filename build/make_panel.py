#!/usr/bin/env python3
"""Gera panel.js e panel.css do app a partir do painel do aluno (HTML do artifact).

Uso: python3 build/make_panel.py <painel.html>
O painel do artifact continua sendo o modelo; este script adapta o código dele
para rodar dentro do app (dados do Supabase, progresso sincronizado, sem hash nas abas).
"""
import re, sys, pathlib

src = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
root = pathlib.Path(__file__).resolve().parent.parent
js = re.search(r'<script id="app-js">(.*?)</script>', src, re.S).group(1)
css = re.search(r'<style id="app-css">(.*?)</style>', src, re.S).group(1)

def rep(a, b, n=1):
    global js
    c = js.count(a)
    if c != n:
        sys.exit("make_panel: esperava %d ocorrência(s) e achei %d de: %r" % (n, c, a[:90]))
    js = js.replace(a, b)

# casca: tira o IIFE do artifact
js = js.strip()
assert js.startswith("(function(){") and js.endswith("})();"), "formato inesperado do app-js"
js = js[len("(function(){"):-len("})();")]

# dados, rascunho e edição
rep('var saved;try{saved=JSON.parse(document.getElementById("app-data").textContent)}catch(e){saved={}}', 'var saved=ctx.data||{};')
rep('try{var dr=sessionStorage.getItem("cl-draft");if(dr){D=JSON.parse(dr);sessionStorage.removeItem("cl-draft")}}catch(e){}',
    'try{var dr=SS.getItem(ctx.draftKey);if(dr){D=JSON.parse(dr);SS.removeItem(ctx.draftKey)}}catch(e){}')
rep('var canEdit=false,editing=false,dirty=false,artifactNs=null;',
    'var canEdit=!!ctx.teacher,editing=false,dirty=false,artifactNs=ctx.teacher?{publish:function(){return ctx.save(D).then(function(){saved=JSON.parse(JSON.stringify(D));dirty=false})}}:null;')
rep('sessionStorage.setItem("cl-draft",', 'SS.setItem(ctx.draftKey,')
rep('sessionStorage.removeItem("cl-draft")', 'SS.removeItem(ctx.draftKey)', js.count('sessionStorage.removeItem("cl-draft")') or 1)
js = js.replace("localStorage.", "LS.")
rep('artifactNs.publish(buildDoc())', 'artifactNs.publish()')
rep('var assetsNs=null;', 'var assetsNs=ctx.assets||null;')

# recibos fixados pela teacher ficam só no artifact (no app o aluno envia o comprovante)
i = js.index('function rcptHTML(k,p){'); j = js.index('function payHTML(){', i)
js = js[:i] + 'function rcptHTML(){return""}\n' + js[j:]
assert 'function rcptHTML(){return""}' in js

# faltas "a confirmar" (vêm da automação do app)
rep('sem:{l:"Sem reposição",c:"var(--muted)"}};', 'sem:{l:"Sem reposição",c:"var(--muted)"},confirmar:{l:"A confirmar",c:"var(--muted)"}};')
rep("""'<div class="row"><div class="main"><b>Falta em '+esc(br(a.date))+'</b><small>'+esc(a.reason||"")+(a.makeup?' · reposição '+esc(br(a.makeup)):(a.status==="pendente"?' · a combinar':''))+'</small></div>'""",
    """'<div class="row"><div class="main"><b>'+(a.status==="confirmar"?'Aula de ':'Falta em ')+esc(br(a.date))+'</b><small>'+esc(a.reason||"")+(a.makeup?' · reposição '+esc(br(a.makeup)):(a.status==="pendente"?' · a combinar':a.status==="confirmar"?' · a teacher vai confirmar se a aula aconteceu':''))+'</small></div>'""")

# abas sem mexer no endereço (o app usa o # para as próprias páginas)
rep('try{if(String(location.hash).replace("#","")!==id)location.hash=id}catch(e){}', '')
rep('window.addEventListener("hashchange",function(){var t=tabFromHash();if(t!==mainTab){mainTab=t;render()}});', '')
rep('if(mainTab!==t){mainTab=t;try{location.hash=t}catch(e){}ch=true}', 'if(mainTab!==t){mainTab=t;ch=true}')
rep('function tabFromHash(){', 'function tabFromHash(){return"hoje";')

# calendário do ano no Meu plano e revisão rápida nas aulas
rep("""else body='<div class="wrap"><div class="control plan-tab">'+payHTML()+absHTML()+'</div></div>';""",
    """else body='<div class="wrap"><div class="control plan-tab">'+payHTML()+absHTML()+'</div>'+(window.VYECal?window.VYECal.html({days:(D.student||{}).days,year:2027,semFeriado:!!(D.student||{}).semFeriado}):'')+'</div>';""")
rep("""(S?'<h3>Frases da aula</h3><ul class="say-l">'+S+'</ul>':'')+
   (L?""", """(S?'<h3>Frases da aula</h3><ul class="say-l">'+S+'</ul>':'')+revHTML(l)+
   (L?""")

# IA: no app ainda não há IA embutida, então a conversa abre no Claude já configurada
rep("""if(aiChecked&&(!aiNs||aiOff))return'<section class="aic" aria-labelledby="h-ai">'+head+'<div class="ai-start"><p><b>Para usar a IA aqui, entre na sua conta do Claude</b> (pode ser a gratuita) e abra o painel de novo. Na primeira vez, toque em Permitir.</p><p class="note-sm">Enquanto isso, copie um destes comandos e cole no Claude, no ChatGPT ou no Gemini:</p></div>'+aiHTML()+'</section>';""",
"""if(aiChecked&&(!aiNs||aiOff)){var md='<div class="modes" role="tablist">'+AI_MODES.map(function(m){return'<button type="button" class="tab" role="tab" data-aimode="'+m.id+'" aria-selected="'+(aiMode===m.id)+'">'+m.l+'</button>'}).join("")+'</div>'+(aiMode==="roleplay"?'<div class="scen">'+AI_SCEN.map(function(x){return'<button type="button" class="tab" data-aiscen="'+x.id+'" aria-pressed="'+(aiScen===x.id)+'"'+(aiScen===x.id?' aria-selected="true"':'')+'>'+x.l+'</button>'}).join("")+'</div>':'');
  return'<section class="aic" aria-labelledby="h-ai">'+head+md+'<div class="ai-start"><p><b>A conversa abre no Claude, já pronta para você.</b> Ele sabe o seu nível, o tema da aula e corrige em português. Dá para escrever ou falar: toque no ícone de voz do Claude.</p><a class="btn primary" style="align-self:flex-start;text-decoration:none" href="'+esc(aiLiveUrl())+'" target="_blank" rel="noopener">Começar no Claude ↗</a><p class="note-sm">Precisa de uma conta do Claude (a gratuita serve).</p></div><details class="more"><summary>Ou copie um comando pronto para o ChatGPT ou o Gemini</summary>'+aiHTML()+'</details></section>'}""")

# o tour não abre sozinho quando a teacher está vendo o painel de um aluno
rep('if(!seen&&!editing)setTimeout(', 'if(!seen&&!editing&&!ctx.teacher)setTimeout(')

# timer de atualização
rep('setInterval(function(){var ae=document.activeElement;', 'ctx.every(function(){var ae=document.activeElement;')

# tira a conexão com o runtime do claude.ai (o app tem a própria)
m = re.search(r'\nif\(window\.claude&&window\.claude\.use\)\{\n Promise\.all\(\[window\.claude\.use\("user"\).*?\n\}\n', js, re.S)
if not m: sys.exit("make_panel: bloco window.claude.use do artifact não encontrado")
js = js[:m.start()] + "\n" + js[m.end():]

# ouvintes no document: remove os do painel anterior quando outro painel é aberto
js = js.replace("document.addEventListener(", "__on(")

head = ('/* Generated from the student panel artifact by build/make_panel.py — do not edit by hand */\n'
        'window.VYEPanel={mount:function(ctx){\n'
        'var LS=ctx.store,SS={getItem:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},setItem:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},removeItem:function(k){try{sessionStorage.removeItem(k)}catch(e){}}};\n'
        'var __offs=(window.__vyeOffs=window.__vyeOffs||[]);while(__offs.length){var __o=__offs.pop();document.removeEventListener(__o[0],__o[1],__o[2])}\n'
        'var __tb=document.getElementById("tour");if(__tb)__tb.remove();\n'
        'function __on(t,f,c){document.addEventListener(t,f,c);__offs.push([t,f,c])}\n')
tail = ('\nctx.api={render:function(){render()},\n'
        ' markPay:function(ym){paySent[ym]=1;try{LS.setItem("cl-paysent",JSON.stringify(paySent))}catch(e){}render()},\n'
        ' markDone:function(id){done[id]=1;try{LS.setItem("cl-done",JSON.stringify(done))}catch(e){}render()},\n'
        ' data:function(){return D},\n'
        ' isDirty:function(){return dirty}};\n'
        '}};\n')
(root / "panel.js").write_text(head + js + tail, encoding="utf-8")
(root / "panel.css").write_text(css.strip() + "\n", encoding="utf-8")
# stamp index.html so phones load the new files right away
import time as _t
ix = root / "index.html"; h = ix.read_text(encoding="utf-8"); v = _t.strftime("%Y%m%d%H%M")
h = re.sub(r'(href|src)="(panel\.css|app\.css|config\.js|panel\.js|cal\.js|board\.js|app\.js)(\?v=\d+)?"', lambda m: '%s="%s?v=%s"' % (m.group(1), m.group(2), v), h)
ix.write_text(h, encoding="utf-8")
print("panel.js e panel.css gerados")
