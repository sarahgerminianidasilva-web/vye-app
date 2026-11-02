/* Generated from the student panel artifact by build/make_panel.py — do not edit by hand */
window.VYEPanel={mount:function(ctx){
var LS=ctx.store,SS={getItem:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},setItem:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},removeItem:function(k){try{sessionStorage.removeItem(k)}catch(e){}}};
var __offs=(window.__vyeOffs=window.__vyeOffs||[]);while(__offs.length){var __o=__offs.pop();document.removeEventListener(__o[0],__o[1],__o[2])}
var __tb=document.getElementById("tour");if(__tb)__tb.remove();
function __on(t,f,c){document.addEventListener(t,f,c);__offs.push([t,f,c])}

var SKEL='<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px/1.4 system-ui,-apple-system,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>';
var HEAD_EXTRA='<title>Claudinei · English Course</title><meta name="claude:viewport-fit-sides" content="cover"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap">';
var saved=ctx.data||{};
var D=JSON.parse(JSON.stringify(saved));
try{var dr=SS.getItem(ctx.draftKey);if(dr){D=JSON.parse(dr);SS.removeItem(ctx.draftKey)}}catch(e){}
var canEdit=!!ctx.teacher,editing=false,dirty=false,artifactNs=ctx.teacher?{publish:function(){return ctx.save(D).then(function(){saved=JSON.parse(JSON.stringify(D));dirty=false})}}:null;
var done={};try{done=JSON.parse(LS.getItem("cl-done")||"{}")}catch(e){}

function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function safeUrl(u){u=String(u||"").trim();if(!u)return"";if(!/^https?:\/\//i.test(u))u="https://"+u;return u}
function uid(p){return p+Date.now().toString(36)+Math.floor(Math.random()*99)}
var MON=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
var DOW=["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
var ICONS={
 video:'<rect x="3" y="4.5" width="18" height="12.5" rx="2"/><path d="M10 8.3v4.9l4.2-2.45z" fill="currentColor"/>',
 game:'<rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="15.5" cy="11.5" r="1" fill="currentColor"/><circle cx="18" cy="14" r="1" fill="currentColor"/>',
 read:'<path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h6v15.5H5a1.5 1.5 0 0 0-1.5 1.5z"/><path d="M20.5 5.5A1.5 1.5 0 0 0 19 4h-6v15.5h6a1.5 1.5 0 0 1 1.5 1.5z"/>',
 exercise:'<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M8.5 9l2 2 4-4M8.5 15.5h7"/>',
 audio:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6.5" rx="1.5"/><rect x="17" y="14" width="4" height="6.5" rx="1.5"/>',
 cam:'<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="M15.5 10.5l6-3.5v10l-6-3.5"/>',
 folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 rec:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/>',
 note:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
 star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
 cards:'<rect x="3" y="6.5" width="13" height="14" rx="2.2"/><path d="M8 3.5h10.8A2.2 2.2 0 0 1 21 5.7V17"/><path d="M6.5 11.5h6M6.5 15h4"/>',
 chat:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z"/><path d="M8.5 8.5h7M8.5 11.5h4.5"/>',
 globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.8 5.3 3.8 8.5s-1.2 6.1-3.8 8.5c-2.6-2.4-3.8-5.3-3.8-8.5S9.4 5.9 12 3.5z"/>',
 path:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18h6a3.5 3.5 0 0 0 0-7h-5a3.5 3.5 0 0 1 0-7h6"/>'
};
function svg(k){return'<svg viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[k]||ICONS.read)+'</svg>'}

function nextClass(){
 var s=D.student||{},days=s.days||[],t=(s.time||"18:00").split(":"),h=+t[0],m=+(t[1]||0);
 if(!days.length)return null;
 var now=new Date();
 for(var i=0;i<8;i++){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i,h,m);
  if(days.indexOf(d.getDay())>=0&&d.getTime()+60*60*1000>now.getTime())return{d:d,i:i,live:d<=now}}
 return null;
}
function nextHTML(){
 var s=D.student||{},n=nextClass(),when;
 if(!n)when="Horário a combinar";
 else if(n.live)when="<span>Agora</span>, até as "+esc(String((+(s.time||"18:00").split(":")[0]+1)).padStart(2,"0"))+":"+esc((s.time||"18:00").split(":")[1]||"00");
 else{var lab=n.i===0?"Hoje":n.i===1?"Amanhã":DOW[n.d.getDay()].replace(/^./,function(c){return c.toUpperCase()});
  when="<span>"+lab+"</span>, "+String(n.d.getDate()).padStart(2,"0")+"/"+String(n.d.getMonth()+1).padStart(2,"0")+" às "+esc(s.time||"18:00")}
 var dayNames=(s.days||[]).map(function(d){return DOW[d].slice(0,3)}).join(" e ");
 return'<div class="next" aria-label="Próxima aula"><div class="k">Próxima aula</div><div class="when">'+when+'</div>'+
 (s.meet?'<a class="join" href="'+esc(safeUrl(s.meet))+'" target="_blank" rel="noopener">Entrar na aula</a><div class="meet">Link fixo: '+esc(s.meet.replace(/^https?:\/\//,""))+'</div>':'')+
 '<div class="meet">Aulas toda '+esc(dayNames)+', '+esc(s.time||"")+' ('+esc(s.duration||"1h")+')</div></div>';
}

function quickHTML(){
 var L=D.links||{},items=[
  {k:"folder",t:"Materiais",s:"Slides e arquivos das aulas",u:L.materials},
  {k:"rec",t:"Gravações",s:D.recCount?D.recCount+" aulas gravadas":"Assista às aulas de novo",u:L.recordings},
  {k:"note",t:"Digital Notebook",s:"Suas anotações de cada aula",u:L.notebook},
  {k:"star",t:"Practice Hub",s:"Mais atividades para praticar",u:L.hub}
 ].concat((D.resources||[]).filter(function(r){return!r.why&&r.url}).slice(0,1).map(function(r){return{k:"read",t:"Livro do curso",s:r.title,u:r.url}})).filter(function(x){return x.u});
 return'<nav class="quick wrap" aria-label="Atalhos">'+items.map(function(x){return'<a class="ql" href="'+esc(safeUrl(x.u))+'" target="_blank" rel="noopener"><span class="ico">'+svg(x.k)+'</span><span><b>'+x.t+'</b><small>'+x.s+'</small></span></a>'}).join("")+'</nav>';
}

function xBtn(list,id){return editing?'<button class="btn small danger x" type="button" data-del="'+list+'" data-id="'+esc(id)+'">Remover</button>':''}

function tasksHTML(){
 var T=D.tasks||[],n=T.filter(function(t){return done[t.id]}).length;
 var body=T.length?T.map(function(t){var d=!!done[t.id];return'<div class="task'+(d?' done':'')+'"><input type="checkbox" id="tk-'+esc(t.id)+'" data-task="'+esc(t.id)+'"'+(d?' checked':'')+'><label for="tk-'+esc(t.id)+'">'+esc(t.text)+'</label>'+xBtn("tasks",t.id)+'</div>'}).join(""):'<div class="empty">Nenhuma tarefa para esta semana.</div>';
 var add=editing?'<form class="add" data-add="tasks"><input class="wide" id="a-task" name="text" placeholder="Nova tarefa" required><button class="btn primary" type="submit">Adicionar tarefa</button>'+(T.length?'<button class="btn" type="button" id="clearTasks">Limpar todas</button>':'')+'</form>':'';
 return'<section aria-labelledby="h-tasks"><h2 id="h-tasks">Para esta semana'+(T.length?'<span class="count">'+n+' de '+T.length+' feitas</span>':'')+'</h2><div class="panel">'+body+'</div>'+add+'</section>';
}

function fmtDate(iso){var p=String(iso||"").split("-");if(p.length<3)return{d:"",m:""};return{d:p[2],m:MON[+p[1]-1]||""}}
var canSay=false;try{canSay=!!(window.speechSynthesis&&window.SpeechSynthesisUtterance)}catch(e){}
function sayBtn(t){return canSay?'<button type="button" class="say" data-say="'+esc(t)+'" aria-label="Ouvir: '+esc(t)+'">🔊</button>':''}
var lesOpen={};
function lessonsHTML(){
 var Ls=(D.lessons||[]).slice().sort(function(a,b){return a.date<b.date?1:-1});
 var body=Ls.length?Ls.map(function(l,i){var f=fmtDate(l.date),has=(l.vocab&&l.vocab.length)||l.sum||l.notes,op=!!lesOpen[l.id];
  var head='<div class="date"><b>'+esc(f.d)+'</b>'+esc(f.m)+'</div><div class="lh"><div class="t">'+esc(l.title)+'</div>'+(l.note?'<p>'+esc(l.note)+'</p>':'')+'</div>';
  if(!has)return'<div class="lesson">'+head+xBtn("lessons",l.id)+'</div>';
  var V=(l.vocab||[]).map(function(v){return'<li><div class="vw"><b>'+esc(v.en)+'</b>'+sayBtn(v.en)+'</div><span class="vp">'+esc(v.pt)+'</span>'+(v.pr?'<span class="vr">'+esc(v.pr)+'</span>':'')+'</li>'}).join("");
  var S=(l.say||[]).map(function(t){return sayLine(t,l)}).join("");
  var L=(l.notes?'<a class="la g" href="'+esc(safeUrl(l.notes))+'" target="_blank" rel="noopener">✦ Resumo do Gemini</a>':'')+(l.rec?'<a class="la" href="'+esc(safeUrl(l.rec))+'" target="_blank" rel="noopener">▶ Gravação</a>':'')+(l.chat?'<a class="la" href="'+esc(safeUrl(l.chat))+'" target="_blank" rel="noopener">💬 Chat da aula</a>':'')+(l.extra||[]).map(function(x){return'<a class="la" href="'+esc(safeUrl(x.u))+'" target="_blank" rel="noopener">'+esc(x.t)+' ↗</a>'}).join("");
  return'<details class="lesson lx" data-les="'+esc(l.id)+'"'+(op?' open':'')+'><summary>'+head+'<span class="chev" aria-hidden="true"></span></summary><div class="lb">'+
   (l.sum?'<p class="lsum">'+esc(l.sum)+'</p>':'')+
   (V?'<h3>Vocabulário <small>'+(canSay?'toque 🔊 para ouvir':'com pronúncia')+'</small></h3><ul class="voc">'+V+'</ul>':'')+
   (S?'<h3>Frases da aula</h3><ul class="say-l">'+S+'</ul>':'')+revHTML(l)+
   (L?'<div class="lls">'+L+'</div>':'')+xBtn("lessons",l.id)+'</div></details>'}).join(""):'<div class="empty">As aulas aparecem aqui conforme forem registradas.</div>';
 var add=editing?'<form class="add" data-add="lessons"><input type="date" name="date" id="a-ldate" required aria-label="Data"><input name="title" id="a-ltitle" placeholder="Tema da aula" required><input class="wide" name="note" id="a-lnote" placeholder="O que vimos (opcional)"><button class="btn primary" type="submit">Registrar aula</button></form>':'';
 return'<section aria-labelledby="h-les"><h2 id="h-les">Últimas aulas</h2><p class="note-sm" style="margin:-4px 0 10px">Toque numa aula para ver o vocabulário, a pronúncia e o resumo.</p><div class="panel">'+body+'</div>'+add+'</section>';
}

function trilhaUrl(sem,n){var b=(D.links||{}).trilha;return b?b.replace(/#.*$/,"")+"#"+(sem==="s2"?"s2-":"")+"licao-"+n:""}
function unitRow(u,i,list,sem){
 var tu=trilhaUrl(sem,i+1),stu=u.status||"todo";
 var t='<span class="ln">Lesson '+(i+1)+'</span> '+esc(u.title)+(u.url?' <a class="sl" href="'+esc(safeUrl(u.url))+'" target="_blank" rel="noopener">Slides ↗</a>':'')+(tu?' <a class="sl st2" href="'+esc(tu)+'" target="_blank" rel="noopener">'+(stu==="todo"?'Adiantar ↗':'Estudar ↗')+'</a>':'');
 var ctl=editing?'<div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap"><select data-unit="'+esc(u.id)+'" data-ulist="'+list+'" aria-label="Status"><option value="todo"'+(stu==="todo"?" selected":"")+'>Ainda não</option><option value="now"'+(stu==="now"?" selected":"")+'>Estudando agora</option><option value="done"'+(stu==="done"?" selected":"")+'>Concluída</option></select>'+xBtn(list,u.id)+'</div>':'';
 return'<li class="unit '+esc(stu)+'"><span class="dot">'+(stu==="done"?"✓":(i+1))+'</span><div><div class="t">'+t+(stu==="now"?'<span class="tagnow">agora</span>':'')+'</div>'+(u.note?'<p>'+esc(u.note)+'</p>':'')+ctl+'</div></li>'}
function pathHTML(){
 var U=D.units||[],U2=D.units2||[],nd=U.filter(function(u){return u.status==="done"}).length,nd2=U2.filter(function(u){return u.status==="done"}).length;
 var body=U.map(function(u,i){return unitRow(u,i,"units","s1")}).join("");
 var body2=U2.map(function(u,i){return unitRow(u,i,"units2","s2")}).join("");
 var add=editing?'<form class="add" data-add="units"><input name="title" id="a-utitle" placeholder="Nome da lição" required><input name="note" id="a-unote" placeholder="Assunto"><input class="wide" name="url" id="a-uurl" placeholder="Link dos slides (opcional)"><button class="btn primary" type="submit">Adicionar lição</button></form>':'';
 var tip=(D.links||{}).trilha?'<p class="note-sm" style="margin:-4px 0 10px">Em cada lição: slides, videoaula, listening e exercícios que se corrigem na hora. Toque em Estudar.</p>':'';
 return'<section aria-labelledby="h-path"><h2 id="h-path">Trilha do curso<span class="count">Semestre 1 · '+nd+' de '+U.length+' lições</span></h2>'+tip+'<div class="panel" style="padding-block:16px 0"><ol class="path">'+body+'</ol></div>'+add+
 (U2.length?'<h3 class="path-h" id="h-path2">Semestre 2 · Book 2<small>'+nd2+' de '+U2.length+' lições · depois do Book 1</small></h3><div class="panel" style="padding-block:16px 0"><ol class="path">'+body2+'</ol></div>':'')+'</section>';
}

function phrasesHTML(){
 var P=D.phrases||[];
 var body=P.map(function(p){return'<div class="phrase" style="display:flex;gap:8px"><div style="flex:1;min-width:0"><b>'+esc(p.en)+'</b><span>'+esc(p.pt)+'</span></div>'+xBtn("phrases",p.id)+'</div>'}).join("");
 var add=editing?'<form class="add" data-add="phrases"><input name="en" id="a-pen" placeholder="Frase em inglês" required><input name="pt" id="a-ppt" placeholder="Tradução"><button class="btn primary" type="submit">Adicionar frase</button></form>':'';
 return'<section aria-labelledby="h-ph"><h2 id="h-ph">Frases que você já sabe</h2><div class="phrases">'+body+'</div>'+add+'</section>';
}

var resOpen={};
function resHTML(){
 var R=D.resources||[],top=R.filter(function(r){return!r.why}),rev=R.filter(function(r){return r.why});
 var book=top.map(function(r){return'<a class="rv-book" href="'+esc(safeUrl(r.url))+'" target="_blank" rel="noopener"><span class="ico">'+svg(r.kind)+'</span>'+esc(r.title)+' ↗</a>'}).join("");
 var card=function(r,i){var o=resOpen[r.id];
  var acts=(r.video?'<a class="rv-a v" href="'+esc(safeUrl(r.video))+'" target="_blank" rel="noopener">▶ Vídeo</a>':'')+(r.url?'<a class="rv-a" href="'+esc(safeUrl(r.url))+'" target="_blank" rel="noopener">✎ Praticar</a>':'')+(r.q?'<button type="button" class="rv-a t" data-rq="'+esc(r.id)+'" aria-expanded="'+(o?"true":"false")+'">? Teste</button>':'');
  return'<article class="rv" aria-label="'+(i+1)+' de '+rev.length+'"><span class="why">'+esc(r.why)+'</span><h3>'+esc(r.title)+'</h3><p>'+esc(r.note||"")+'</p>'+
  (o?'<div class="rv-q"><span>'+esc(r.q)+'</span><b>'+esc(r.a||"")+'</b></div>':'')+'<div class="rv-acts">'+acts+'</div>'+(editing?xBtn("resources",r.id):'')+'</article>'};
 var body=book+(rev.length?'<div class="rv-head"><small>Arraste para o lado · '+rev.length+' revisões</small><button type="button" class="rv-nav" data-rvnav="-1" aria-label="Anterior">‹</button><button type="button" class="rv-nav" data-rvnav="1" aria-label="Próxima">›</button></div><div class="rv-scroll" id="rvScroll">'+rev.map(card).join("")+'</div>':'');
 if(!R.length)body='<div class="empty">Nada por aqui ainda.</div>';
 var add=editing?'<form class="add" data-add="resources"><input name="title" id="a-rtitle" placeholder="O que revisar" required><input name="why" id="a-rwhy" placeholder="Etiqueta (ex.: Da aula de 03/11)"><input class="wide" name="note" id="a-rnote" placeholder="Lembrete curto"><input name="video" id="a-rvid" placeholder="Link do vídeo (opcional)"><input name="url" id="a-rurl" placeholder="Link do exercício (opcional)"><input name="q" id="a-rq" placeholder="Teste rápido"><input name="a" id="a-ra" placeholder="Resposta"><input type="hidden" name="kind" value="exercise"><button class="btn primary" type="submit">Adicionar revisão</button></form>':'';
 return'<section aria-labelledby="h-res"><h2 id="h-res">Pratique em casa</h2>'+body+add+'</section>';
}

var ABS={pendente:{l:"A repor",c:"var(--warm)"},agendada:{l:"Reposição agendada",c:"var(--accent)"},reposta:{l:"Reposta",c:"var(--ok)"},sem:{l:"Sem reposição",c:"var(--muted)"},confirmar:{l:"A confirmar",c:"var(--muted)"}};
var PAY={pago:{l:"Pago",c:"var(--ok)"},pendente:{l:"Pendente",c:"var(--warm)"},atrasado:{l:"Atrasado",c:"var(--c-vocab)"}};
var MONF=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
function br(iso){var p=String(iso||"").split("-");return p.length<3?"":p[2]+"/"+p[1]}
function monLabel(ym){var p=String(ym||"").split("-");return p.length<2?ym:(MONF[+p[1]-1]||"").replace(/^./,function(c){return c.toUpperCase()})+" "+p[0]}
function sel(attr,id,opts,cur){return'<select '+attr+'="'+esc(id)+'" aria-label="Status">'+Object.keys(opts).map(function(k){return'<option value="'+k+'"'+(k===cur?" selected":"")+'>'+opts[k].l+'</option>'}).join("")+'</select>'}
function absHTML(){
 var A=(D.absences||[]).slice().sort(function(a,b){return a.date<b.date?1:-1});
 var nP=A.filter(function(a){return a.status==="pendente"}).length,nA=A.filter(function(a){return a.status==="agendada"}).length,nR=A.filter(function(a){return a.status==="reposta"}).length;
 var rows=A.length?A.map(function(a){var s=ABS[a.status]||ABS.pendente;
  return'<div class="row"><div class="main"><b>'+(a.status==="confirmar"?'Aula de ':'Falta em ')+esc(br(a.date))+'</b><small>'+esc(a.reason||"")+(a.makeup?' · reposição '+esc(br(a.makeup)):(a.status==="pendente"?' · a combinar':a.status==="confirmar"?' · a teacher vai confirmar se a aula aconteceu':''))+'</small></div>'+
  (editing?sel("data-abs",a.id,ABS,a.status)+xBtn("absences",a.id):'<span class="st" style="--st:'+s.c+'">'+s.l+'</span>')+'</div>'}).join(""):'<p class="note-sm">Nenhuma falta registrada.</p>';
 var add=editing?'<form class="add" data-add="absences" style="margin-top:0"><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Dia da falta<input type="date" name="date" id="a-adate" required></label><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Reposição (se já marcada)<input type="date" name="makeup" id="a-amake"></label><input name="reason" id="a-areason" placeholder="Motivo (ex.: remarcada pelo aluno)"><select name="status" id="a-astatus" aria-label="Status"><option value="pendente">A repor</option><option value="agendada">Reposição agendada</option><option value="reposta">Reposta</option><option value="sem">Sem reposição</option></select><button class="btn primary" type="submit">Registrar falta</button></form>':'';
 return'<section class="ccard" aria-labelledby="h-abs"><h2 id="h-abs">Controle de aulas</h2><div class="stats">'+
 '<div class="stat" style="--st:var(--warm)"><b>'+nP+'</b><span>'+(nP===1?"aula a repor":"aulas a repor")+'</span></div>'+
 '<div class="stat" style="--st:var(--accent)"><b>'+nA+'</b><span>'+(nA===1?"agendada":"agendadas")+'</span></div>'+
 '<div class="stat" style="--st:var(--ok)"><b>'+nR+'</b><span>'+(nR===1?"reposta":"repostas")+'</span></div></div>'+
 '<div>'+rows+'</div>'+add+'<p class="note-sm">Precisa remarcar? Avise com antecedência pelo WhatsApp.</p></section>';
}
var paySent={};try{paySent=JSON.parse(LS.getItem("cl-paysent")||"{}")||{}}catch(e){paySent={}}
function payLink(ym){return D.payForm+"?aluno="+encodeURIComponent((D.student&&D.student.name)||"")+"&mes="+encodeURIComponent(monLabel(ym))+"&valor="+encodeURIComponent(D.payValue||"")+"&ym="+ym}
var rcptFor="",rcptBusy="";
function rcptHTML(){return""}
function payHTML(){
 var now=new Date(),ym=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0");
 var pd=parseInt(D.payDay,10)||0,start=D.payStart||"2026-03",end=D.payEnd||(now.getFullYear()+"-12");
 var byM={};(D.payments||[]).forEach(function(p){byM[p.month]=p});
 var months=[],y=+start.slice(0,4),m=+start.slice(5,7);
 while(true){var k=y+"-"+String(m).padStart(2,"0");if(k>end)break;months.push(k);m++;if(m>12){m=1;y++}}
 Object.keys(byM).forEach(function(k){if(months.indexOf(k)<0)months.push(k)});
 months.sort(function(a,b){return a<b?1:-1});
 function st(k){var p=byM[k];
  if(p&&p.status==="pago")return{l:"Pago ✓",c:"var(--ok)",paid:1};
  if(paySent[k])return{l:"Pago ✓",c:"var(--ok)",paid:1,note:"comprovante enviado"};
  if(p&&p.status==="atrasado")return{l:"Atrasado",c:"var(--warm)"};
  if(k>ym)return{l:"A vencer",c:"var(--muted, #888)",future:1};
  if(k===ym)return pd&&now.getDate()>pd?{l:"Pendente",c:"var(--warm)"}:{l:"A vencer",c:"var(--accent)"};
  if(p)return{l:"Pendente",c:"var(--warm)"};
  return{l:"Sem registro",c:"var(--muted, #888)",none:1}}
 var c=st(ym),nPaid=months.filter(function(k){return st(k).paid}).length;
 var big='<div class="big" style="--st:'+c.c+'"><div><div class="m">'+esc(monLabel(ym))+'</div><small>'+(pd?'Vence dia '+pd:'')+(D.payValue?' · '+esc(D.payValue):'')+(c.note?' · '+c.note:'')+'</small></div><span class="big-r">'+rcptHTML(ym,byM[ym])+'<span class="st" style="--st:'+c.c+'">'+c.l+'</span></span></div>';
 var rows=months.filter(function(k){return k!==ym}).map(function(k){var s=st(k),p=byM[k];
  var right=rcptHTML(k,p)+(editing?(p?sel("data-pay",p.id,PAY,p.status)+xBtn("payments",p.id):'<span class="st" style="--st:'+s.c+'">'+s.l+'</span>'):
   (!s.paid&&!s.future&&!s.none&&D.payForm?'<a class="st" style="--st:var(--accent);text-decoration:none" target="_blank" rel="noopener" data-paysent="'+k+'" href="'+esc(payLink(k))+'">Enviar comprovante</a> ':'')+'<span class="st" style="--st:'+s.c+'">'+s.l+'</span>');
  return'<div class="row"><div class="main"><b>'+esc(monLabel(k))+'</b><small>'+(pd?'Venc. '+String(pd).padStart(2,"0")+'/'+k.slice(5,7):'')+(s.note?' · '+s.note:'')+'</small></div>'+right+'</div>'}).join("");
 var add=editing?'<form class="add" data-add="payments" style="margin-top:0"><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Mês<input type="month" name="month" id="a-pmonth" required value="'+ym+'"></label><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Vencimento<input type="date" name="due" id="a-pdue"></label><select name="status" id="a-pstatus" aria-label="Status"><option value="pendente">Pendente</option><option value="pago">Pago</option><option value="atrasado">Atrasado</option></select><button class="btn primary" type="submit">Marcar mês</button><label class="note-sm wide" style="display:flex;flex-direction:column;gap:4px">Dia de vencimento padrão<input id="e-payday" value="'+esc(D.payDay||"")+'" placeholder="ex.: 10"></label></form>':'';
 var ask=(c.paid||!D.payForm)?'':'<div class="paid-ask"><a class="btn primary" style="text-decoration:none" target="_blank" rel="noopener" data-paysent="'+ym+'" href="'+esc(payLink(ym))+'">Já paguei · enviar comprovante</a><small>Anexe o print do Pix e envie — o mês já aparece como pago aqui e a teacher vê na hora.</small></div>';
 return'<section class="ccard" aria-labelledby="h-pay"><h2 id="h-pay">Mensalidade</h2>'+(editing?'<input type="file" id="rcptFile" accept="application/pdf,image/*" hidden><p class="note-sm">Recibo: toque em “Fixar recibo” no mês, escolha o PDF ou a foto e depois em Publicar alterações. O aluno passa a ver “Ver recibo” naquele mês.</p>':'')+big+ask+'<p class="note-sm" style="margin:10px 0 4px">Todos os meses · '+nPaid+' pago'+(nPaid===1?'':'s')+'</p><div>'+rows+'</div>'+add+'</section>';
}

var assetsNs=ctx.assets||null;

var streak={};try{streak=JSON.parse(LS.getItem("cl-streak")||"{}")||{}}catch(e){streak={}}
var otherOpen=false;
function saveStreak(){try{LS.setItem("cl-streak",JSON.stringify(streak))}catch(e){}}
function ymd(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function addDays(d,n){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);return x}
function stats(){
 var t=new Date(),today=ymd(t),cur=0,d=streak[today]?t:addDays(t,-1);
 while(streak[ymd(d)]){cur++;d=addDays(d,-1)}
 var keys=Object.keys(streak).sort(),best=0,run=0,prev=null;
 keys.forEach(function(k){var dd=new Date(k+"T12:00:00");run=(prev&&ymd(addDays(prev,1))===k)?run+1:1;if(run>best)best=run;prev=dd});
 return{today:today,cur:cur,total:keys.length,best:best,done:!!streak[today]};
}
var OTHERS=["Música","Série ou filme","Lição de casa","Revisão","App de inglês","Conversa"];
function dailyHTML(){
 var C=D.challenges||[],st=stats(),t=new Date();
 var idx=C.length?Math.floor(new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()/864e5)%C.length:0;
 var ch=C.length?C[idx].text:"Estude 5 minutos de inglês hoje.";
 var badge=st.cur>=30?"30 dias seguidos!":st.cur>=14?"2 semanas seguidas!":st.cur>=7?"1 semana seguida!":st.cur>=3?"3 dias seguidos!":"";
 var action;
 if(st.done){action='<div class="dc-done"><span class="dc-ok">✓</span><div><b>Feito hoje!</b><small>'+esc(streak[st.today]==="challenge"?"Você fez o desafio do dia.":"Você estudou: "+streak[st.today]+".")+' Volte amanhã para manter a sequência.</small></div><button class="btn small" type="button" id="dcUndo">Desmarcar</button></div>'}
 else action='<div class="dc-actions"><button class="btn primary" type="button" id="dcDo">Fiz o desafio de hoje</button><button class="btn" type="button" id="dcOther" aria-expanded="'+otherOpen+'">Estudei outra coisa</button></div>'+(otherOpen?'<div class="dc-chips">'+OTHERS.map(function(o){return'<button type="button" class="tab" data-other="'+esc(o)+'">'+esc(o)+'</button>'}).join("")+'</div>':'');
 // grid: last 5 weeks, aligned to week starting Sunday
 var end=new Date(t.getFullYear(),t.getMonth(),t.getDate()),start=addDays(end,-(28+end.getDay())),cells="";
 for(var d=start;d<=end;d=addDays(d,1)){var k=ymd(d),on=!!streak[k];cells+='<span class="dg'+(on?' on':'')+(k===st.today?' now':'')+'" title="'+esc(br(k))+(on?' · estudou':'')+'"></span>'}
 for(var j=end.getDay()+1;j<7;j++)cells+='<span class="dg fut"></span>';
 var editList=editing?'<div class="dc-edit"><p class="note-sm">Desafios (um por dia, em rodízio):</p>'+C.map(function(c){return'<div class="row" style="border-top:0;padding-block:4px"><div class="main" style="font-size:.9rem">'+esc(c.text)+'</div>'+xBtn("challenges",c.id)+'</div>'}).join("")+'<form class="add" data-add="challenges" style="margin-top:4px"><input class="wide" name="text" id="a-ctext" placeholder="Novo desafio (ex.: Leia 5 frases em voz alta)" required><button class="btn primary" type="submit">Adicionar desafio</button></form></div>':'';
 return'<section class="daily" aria-labelledby="h-dc"><div class="dc-top"><div><p class="dc-k">Desafio de 5 minutos</p><h2 id="h-dc">'+esc(ch)+'</h2></div><div class="dc-streak"><b>'+st.cur+'</b><span>'+(st.cur===1?"dia seguido":"dias seguidos")+'</span></div></div>'+action+
 '<div class="dc-grid" aria-label="Dias estudados nas últimas semanas"><div class="dg-h"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span></div><div class="dg-b">'+cells+'</div></div>'+
 '<div class="dc-foot"><span>'+st.total+(st.total===1?" dia":" dias")+' estudados · melhor sequência: '+st.best+'</span>'+(badge?'<span class="tagnow">'+badge+'</span>':'')+'<button class="btn small" type="button" id="dcCopy">Copiar meu progresso</button></div><p class="note-sm" id="dcMsg" hidden></p>'+editList+'</section>';
}
var hwState={};try{hwState=JSON.parse(LS.getItem("cl-hw")||"{}")||{}}catch(e){hwState={}}
var hwOpen={},hwPick={};
function hwSave(){try{LS.setItem("cl-hw",JSON.stringify(hwState))}catch(e){}}
function hwSt(h){var st=hwState[h.id];if(!st){st={i:0,r:[]};hwState[h.id]=st}return st}
function hwScore(h){var st=hwSt(h);return st.r.filter(function(x){return x&&x.ok}).length}
function exHTML(h){var E=h.ex||[],st=hwSt(h),n=E.length;
 if(st.i>=n){var sc=hwScore(h),code=h.id+" · acertou "+sc+"/"+n;
  return'<div class="ex-end"><b>'+sc+' de '+n+'</b><span>'+(sc===n?"Perfeito! 🎉":sc>=n*0.7?"Muito bem! 👏":"Bom treino! Vale refazer depois 💪")+'</span>'+
  (D.doneForm&&!done[h.id]?'<a class="hwbtn hwdone" href="'+esc(D.doneForm+"?aluno="+encodeURIComponent((D.student&&D.student.name)||"")+"&licao="+encodeURIComponent(h.title)+"&codigo="+encodeURIComponent(code))+'" target="_blank" rel="noopener" data-hwdone="'+esc(h.id)+'">Enviar minha nota para a teacher ✓</a>':(done[h.id]?'<small>Nota enviada ✓</small>':''))+
  '<button type="button" class="btn small" data-exredo="'+esc(h.id)+'">Refazer</button></div>'}
 var q=E[st.i],r=st.r[st.i],bar='<div class="ex-bar"><span style="width:'+Math.round(st.i/n*100)+'%"></span></div><small class="ex-n">'+(st.i+1)+' de '+n+'</small>';
 var body='<p class="ex-q">'+esc(q.q)+'</p>';
 if(q.t==="mc")body+='<div class="qo">'+q.o.map(function(o,j){var c=r?(j===q.a?" right":(j===r.v?" wrong":"")):"";return'<button type="button" class="qb'+c+'" data-exmc="'+esc(h.id)+'" data-o="'+j+'"'+(r?' disabled':'')+'>'+esc(o)+'</button>'}).join("")+'</div>';
 else if(q.t==="order"){var pick=hwPick[h.id]||[],left=q.w.map(function(w,j){return j}).filter(function(j){return pick.indexOf(j)<0});
  body+='<div class="ord-line">'+(r?esc(r.v):(pick.length?pick.map(function(j){return'<button type="button" class="tile on" data-exun="'+esc(h.id)+'" data-j="'+j+'">'+esc(q.w[j])+'</button>'}).join(""):'<span class="ord-ph">Toque nas palavras na ordem certa</span>'))+'</div>'+
  (r?'':'<div class="qo">'+left.map(function(j){return'<button type="button" class="tile" data-expick="'+esc(h.id)+'" data-j="'+j+'">'+esc(q.w[j])+'</button>'}).join("")+'</div>'+(pick.length===q.w.length?'<button type="button" class="btn small primary" data-excheck="'+esc(h.id)+'">Corrigir</button>':''))}
 else body+=(r?'<div class="ord-line">'+esc(r.v)+'</div>':'<div class="wrow"><input id="exw-'+esc(h.id)+'" autocomplete="off" autocapitalize="sentences" spellcheck="false" data-exin="'+esc(h.id)+'"><button type="button" class="btn small primary" data-excheck="'+esc(h.id)+'">Corrigir</button></div>');
 if(r)body+='<p class="fb '+(r.ok?"ok":"no")+'">'+(r.ok?"Isso! ":"Quase. ")+esc(q.e||"")+(!r.ok&&q.ans?'<br>Resposta: <b>'+esc(q.ans[0])+'</b>':'')+(!r.ok?'<span class="fb-fc">Esta entrou nos seus flashcards para revisar.</span>':'')+'</p><button type="button" class="btn small primary ex-next" data-exnext="'+esc(h.id)+'">'+(st.i+1<n?"Próxima →":"Ver minha nota")+'</button>';
 return bar+body}
function exFind(id){return(D.homework||[]).filter(function(x){return x.id===id})[0]}
function alertMsg(t){var el=document.getElementById("vye-msg");if(!el){el=document.createElement("div");el.id="vye-msg";el.setAttribute("role","status");el.style.cssText="position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:70;background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:12px;font-size:.92rem;max-width:calc(100% - 32px)";document.body.appendChild(el)}el.textContent=t;el.hidden=false;clearTimeout(alertMsg._t);alertMsg._t=setTimeout(function(){el.hidden=true},3500)}
var revAns={};
function revHTML(l){var R=l.rev||[];if(!R.length)return"";var ok=0,n=0;
 var items=R.map(function(q,i){var k=l.id+"|"+i,ch=revAns[k],ans=ch!==undefined;if(ans){n++;if(ch===q.a)ok++}
  return'<div class="rv-it"><p>'+(i+1)+'. '+esc(q.q)+'</p><div class="qo">'+q.o.map(function(o,j){var c=ans?(j===q.a?" right":(j===ch?" wrong":"")):"";return'<button type="button" class="qb'+c+'" data-rvq="'+esc(k)+'" data-o="'+j+'"'+(ans?' disabled':'')+'>'+esc(o)+'</button>'}).join("")+'</div>'+(ans?'<p class="fb '+(ch===q.a?"ok":"no")+'">'+(ch===q.a?"Isso! ":"Quase. ")+esc(q.e||"")+'</p>':'')+'</div>'}).join("");
 return'<div class="rvbox"><h3>Revisão da aula <small>'+(n===R.length?ok+' de '+R.length+' ✓':'teste rápido')+'</small></h3>'+items+'</div>'}
var xTxt={},xRes={};
function extraHTML(h){var x=h.extra;if(!x)return"";var d=!!done[h.id+"-extra"],r=xRes[h.id];
 return'<div class="xbox"><b>✍️ '+esc(x.title||"Extra de escrita")+'</b>'+(x.task?'<p>'+esc(x.task)+'</p>':'')+
 (x.url?'<a class="hwbtn" href="'+esc(safeUrl(x.url))+'" target="_blank" rel="noopener">'+esc(x.label||"Exercício online ↗")+'</a>':'')+
 (x.task?'<textarea id="xw-'+esc(h.id)+'" data-xin="'+esc(h.id)+'" rows="4" spellcheck="false" placeholder="Escreva aqui em inglês…">'+esc(xTxt[h.id]||"")+'</textarea><div class="wrow"><button type="button" class="btn small primary" data-xchk="'+esc(h.id)+'">Corrigir</button><button type="button" class="btn small" data-xai="'+esc(h.id)+'">Copiar para a IA</button>'+(D.doneForm?(d?'<span class="note-sm">Enviado ✓</span>':'<button type="button" class="btn small" data-xsend="'+esc(h.id)+'">Enviar para a teacher</button>'):'')+'</div>'+
  (r?'<ul class="fl">'+r.map(function(y){return'<li class="'+(y.ok?"ok":"no")+'">'+esc(y.t)+'</li>'}).join("")+(r.every(function(y){return y.ok})?'<li class="ok">Nenhum erro comum encontrado. Agora é só enviar!</li>':'')+'</ul>':''):'')+'</div>'}
function hwHTML(){
 var H=(D.homework||[]).slice().sort(function(a,b){return(a.sent||"")<(b.sent||"")?1:-1});
 var body=H.length?H.map(function(h,i){var d=!!done[h.id],links="";
  if(h.file)links+='<a class="hwbtn" href="'+esc(h.file)+'" target="_blank" rel="noopener">Abrir arquivo</a>';
  if(h.url)links+='<a class="hwbtn" href="'+esc(safeUrl(h.url))+'" target="_blank" rel="noopener">Abrir link ↗</a>';
  if(h.ex&&h.ex.length){var st0=hwSt(h);links='<button type="button" class="hwbtn" data-exopen="'+esc(h.id)+'" aria-expanded="'+(hwOpen[h.id]?"true":"false")+'">'+(hwOpen[h.id]?"Fechar":st0.i>=h.ex.length?"Ver minha nota":st0.i>0?"Continuar ✎":"Fazer aqui ✎")+'</button>'+links}
  if(D.doneForm&&!d&&!(h.ex&&h.ex.length))links+='<a class="hwbtn hwdone" href="'+esc(D.doneForm+"?aluno="+encodeURIComponent((D.student&&D.student.name)||"")+"&licao="+encodeURIComponent(h.title)+"&codigo="+encodeURIComponent(h.id))+'" target="_blank" rel="noopener" data-hwdone="'+esc(h.id)+'">Terminei esta lição ✓</a>';
  return'<div class="hw'+(d?' done':'')+'"><input type="checkbox" id="hw-'+esc(h.id)+'" data-task="'+esc(h.id)+'"'+(d?' checked':'')+' aria-label="Marcar como feita"><div class="hwb"><div class="hwt">'+esc(h.title)+(i===0&&!d?'<span class="tagnow">nova</span>':'')+'</div>'+
  '<small>'+(h.sent?'Enviada em '+esc(br(h.sent)):'')+(h.due?' · entregar até '+esc(br(h.due)):'')+'</small>'+(h.note?'<p>'+esc(h.note)+'</p>':'')+'<div class="hwl">'+links+'</div>'+extraHTML(h)+(h.ex&&hwOpen[h.id]?'<div class="ex" id="ex-'+esc(h.id)+'">'+exHTML(h)+'</div>':'')+'</div>'+xBtn("homework",h.id)+'</div>'}).join(""):'<div class="empty">Quando a teacher enviar uma lição de casa, ela aparece aqui.</div>';
 var add=editing?'<form class="add" id="hwf"><input id="hw-title" placeholder="Nome da lição (ex.: Present simple – exercícios)" class="wide" required><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Entregar até<input type="date" id="hw-due"></label><input id="hw-url" placeholder="Link (Drive, Wordwall, Liveworksheets...)"><label class="note-sm wide" style="display:flex;flex-direction:column;gap:4px">Ou anexe um arquivo (PDF ou imagem)<input type="file" id="hw-file" accept="application/pdf,image/*"></label><input class="wide" id="hw-note" placeholder="Instruções (opcional)"><button class="btn primary" type="submit">Anexar lição</button><span class="status" id="hw-status"></span></form>':'';
 return'<section aria-labelledby="h-hw"><h2 id="h-hw">Lição de casa'+(H.length?'<span class="count">'+H.filter(function(h){return done[h.id]}).length+' de '+H.length+' feitas</span>':'')+'</h2><div class="panel">'+body+'</div>'+add+'</section>';
}
var vidTab="aula",qAns={},wVal={},wRes={},wShow={},freeTxt="",freeRes=null,copied="";
function normA(x){return String(x||"").toLowerCase().replace(/[’`´]/g,"'").replace(/\bdo not\b/g,"don't").replace(/\bdoes not\b/g,"doesn't").replace(/[^a-z' ]/g," ").replace(/'/g,"").replace(/\s+/g," ").trim()}
function wCheck(w){var v=normA(wVal[w.id]);return(w.ans||[]).some(function(a){return normA(a)===v})}
function freeCheck(t,o){o=o||{min:4,neg:2};var out=[],ss=t.split(/[.!?\n]+/).map(function(x){return x.trim()}).filter(Boolean),low=(" "+t.toLowerCase().replace(/[’`´]/g,"'")+" ").replace(/\bdoesnt\b/g,"doesn't").replace(/\bdont\b/g,"don't");
 var neg=(low.match(/\b(don't|doesn't|do not|does not)\b/g)||[]).length;
 out.push(ss.length>=o.min?{ok:1,t:"Você escreveu "+ss.length+" frases."}:{ok:0,t:"Escreva pelo menos "+o.min+" frases (agora tem "+ss.length+")."});
 if(o.neg)out.push(neg>=o.neg?{ok:1,t:"Usou a negativa "+neg+" vezes."}:{ok:0,t:"Use don't / doesn't em pelo menos "+o.neg+" frases."});
 var e1=low.match(/\b(doesn't|does not)\s+(\w+s)\b/g);if(e1)e1.forEach(function(x){if(!/\b(is|was|has|does)$/.test(x))out.push({ok:0,t:"“"+x+"”: depois de doesn't o verbo fica sem -s."})});
 var e2=low.match(/\b(he|she|it|my \w+)\s+(don't|do not)\b/g);if(e2)e2.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com he / she / it use doesn't."})});
 var e3=low.match(/\b(i|you|we|they)\s+(doesn't|does not)\b/g);if(e3)e3.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com I / you / we / they use don't."})});
 var e4=low.match(/\b(i|you|we|they)\s+(eats|drinks|sleeps|plays|goes|does|exercises|walks|runs|works)\b/g);if(e4)e4.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com I / you / we / they o verbo fica sem -s."})});
 var e5=low.match(/\b(i|you|we|they|he|she)\s+(not)\s+\w+/g);if(e5)e5.forEach(function(x){out.push({ok:0,t:"“"+x+"”: para negar, use don't / doesn't antes do verbo."})});
 var e6=low.match(/\b(i|he|she|we|they|you)\s+(eat|drink|sleep|go|play|do|exercise|eats|drinks|sleeps|goes|plays|exercises)\s+(always|never|usually|sometimes|often)\b/g);if(e6)e6.forEach(function(x){out.push({ok:0,t:"“"+x+"”: a palavra de frequência vem antes do verbo."})});
 var e7=low.match(/\b(he|she|it)\s+(always\s+|usually\s+|often\s+|sometimes\s+|never\s+)?(go|do|have|eat|drink|work|play|watch|study|sleep|like|live|wake|cook|read|walk|listen|need|want)\b/g);if(e7)e7.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com he / she / it o verbo ganha -s (goes, has, works…)."})});
 if(!/^[A-Z]/.test(t.trim()))out.push({ok:0,t:"Comece a frase com letra maiúscula."});
 return out}
function quizHTML(){var Q=D.quiz||[];if(!Q.length)return'<div class="empty">Os exercícios do tema aparecem aqui.</div>';
 var n=0,ok=0;Q.forEach(function(q){if(q.id in qAns){n++;if(qAns[q.id]===q.a)ok++}});
 return'<div class="qhead"><small>Toque na resposta: a correção aparece na hora.</small><b>'+ok+' / '+Q.length+'</b>'+(n?'<button type="button" class="btn small" id="qReset">Refazer</button>':'')+'</div>'+
 Q.map(function(q,i){var ch=qAns[q.id],ans=ch!==undefined;return'<div class="qz"><div class="qq"><span>'+(i+1)+'</span>'+esc(q.q)+'</div><div class="qo">'+q.o.map(function(o,j){var c=ans?(j===q.a?" right":(j===ch?" wrong":"")):"";return'<button type="button" class="qb'+c+'" data-qz="'+esc(q.id)+'" data-o="'+j+'"'+(ans?' disabled':'')+'>'+esc(o)+'</button>'}).join("")+'</div>'+(ans?'<p class="fb '+(ch===q.a?"ok":"no")+'">'+(ch===q.a?"Isso! ":"Quase. ")+esc(q.e)+'</p>':'')+'</div>'}).join("")}
function writeHTML(){var W=D.writing||[];
 var h='<p class="note-sm">Escreva a frase e toque em Corrigir.</p>'+W.map(function(w,i){var r=wRes[w.id];return'<div class="wr"><label for="w-'+esc(w.id)+'"><span>'+(i+1)+'</span>'+esc(w.task)+'</label><div class="wrow"><input id="w-'+esc(w.id)+'" data-win="'+esc(w.id)+'" value="'+esc(wVal[w.id]||"")+'" autocomplete="off" autocapitalize="sentences" spellcheck="false"><button type="button" class="btn small primary" data-wchk="'+esc(w.id)+'">Corrigir</button></div>'+
  (r===1?'<p class="fb ok">Perfeito! ✓</p>':r===0?'<p class="fb no">Ainda não. Dica: '+esc(w.tip)+(wShow[w.id]?'<br>Resposta: <b>'+esc(w.ans[0])+'</b>':' <button type="button" class="linkbtn" data-wshow="'+esc(w.id)+'">ver resposta</button>')+'</p>':'')+'</div>'}).join("");
 if(D.freeWrite)h+='<div class="wr free"><label for="w-free"><span>✎</span>Escrita livre: '+esc(D.freeWrite)+'</label><textarea id="w-free" rows="4" placeholder="I eat fruit every day. I don&#39;t drink soda..." spellcheck="false">'+esc(freeTxt)+'</textarea><div class="wrow"><button type="button" class="btn small primary" id="freeChk">Corrigir</button><button type="button" class="btn small" id="freeAI">Copiar para corrigir com IA</button></div>'+
  (freeRes?'<ul class="fl">'+freeRes.map(function(x){return'<li class="'+(x.ok?"ok":"no")+'">'+esc(x.t)+'</li>'}).join("")+(freeRes.every(function(x){return x.ok})?'<li class="ok">Nenhum erro comum encontrado. Para uma correção completa, use o botão da IA.</li>':'')+'</ul>':'')+(copied==="free"?'<p class="fb ok">Copiado! Cole no Claude ou no ChatGPT.</p>':'')+'</div>';
 return h}
function aiHTML(){var P=D.prompts||[];return'<p class="note-sm">Copie o comando e cole no Claude, no ChatGPT ou no Gemini.</p>'+P.map(function(x){return'<div class="ai"><div class="ait"><b>'+esc(x.title)+'</b><button type="button" class="btn small primary" data-copy="'+esc(x.id)+'">'+(copied===x.id?"Copiado ✓":"Copiar")+'</button><a class="btn small" target="_blank" rel="noopener" href="https://claude.ai/new?q='+encodeURIComponent(x.p)+'">Abrir no Claude</a></div><p>'+esc(x.p).replace(/\n/g,"<br>")+'</p></div>'}).join("")}
function vidHTML(){
 var V=D.videos||[],tabs=[{id:"aula",l:"Videoaulas"},{id:"listening",l:"Listening"},{id:"write",l:"Escrita"},{id:"news",l:"Notícias"},{id:"read",l:"Leituras"},{id:"pod",l:"Podcasts"},{id:"ia",l:"Pratique com IA"}];
 var body;
 if(vidTab==="exerc")body=quizHTML();else if(vidTab==="write")body=writeHTML();else if(vidTab==="ia")body=aiHTML();
 else{var items=V.filter(function(v){return v.tab===vidTab});
  body=items.length?items.map(function(r){return'<div class="rl"><span class="ico">'+svg(r.kind)+'</span><div class="body"><a href="'+esc(safeUrl(r.url))+'" target="_blank" rel="noopener">'+esc(r.title)+'</a>'+(r.note?'<p>'+esc(r.note)+'</p>':'')+'</div>'+xBtn("videos",r.id)+'</div>'}).join(""):'<div class="empty">Nada nesta aba ainda.</div>'}
 var add=editing&&["exerc","write","ia"].indexOf(vidTab)<0?'<form class="add" data-add="videos"><input name="title" id="a-ytitle" placeholder="Nome" required><input name="url" id="a-yurl" placeholder="Link" required><select name="tab" id="a-ytab" aria-label="Aba"><option value="aula">Videoaulas</option><option value="listening">Listening</option><option value="news">Notícias</option><option value="read">Leituras</option><option value="pod">Podcasts</option></select><input type="hidden" name="kind" value="video"><input class="wide" name="note" id="a-ynote" placeholder="Por que ver (opcional)"><button class="btn primary" type="submit">Adicionar</button></form>':'';
 return'<section class="study" aria-labelledby="h-vid"><h2 id="h-vid">Extras</h2><p class="note-sm" style="margin:-4px 0 10px">Opcional: vídeos, leituras e conversa com IA sobre o tema atual'+(D.studyTheme?' ('+esc(D.studyTheme)+')':'')+'.</p>'+'<div class="tabs" role="tablist">'+tabs.map(function(t){return'<button type="button" role="tab" class="tab" data-vtab="'+t.id+'" aria-selected="'+(vidTab===t.id)+'">'+t.l+'</button>'}).join("")+'</div><div class="res">'+body+'</div>'+add+'</section>';
}
var recAll=false;
function recHTML(){
 var V=(D.recordings||[]).slice().sort(function(a,b){return a.date<b.date?1:(a.date>b.date?-1:(a.title<b.title?1:-1))});
 var shown=recAll||editing?V:V.slice(0,6);
 var body=V.length?shown.map(function(v){var f=fmtDate(v.date);
  return'<div class="vrow"><span class="vn">'+esc(v.n)+'</span><div class="vt"><a href="'+esc(safeUrl(v.url))+'" target="_blank" rel="noopener">'+esc(v.title)+'</a><small>Aula '+esc(v.n)+' · '+esc(f.d)+' '+esc(f.m)+'</small></div><a class="play" href="'+esc(safeUrl(v.url))+'" target="_blank" rel="noopener" aria-label="Assistir aula '+esc(v.n)+'">'+svg("video")+'</a>'+xBtn("recordings",v.id)+'</div>'}).join(""):'<div class="empty">As gravações aparecem aqui depois de cada aula.</div>';
 var more=(!editing&&V.length>6)?'<button class="btn small" type="button" id="recMore" style="margin-top:10px">'+(recAll?'Mostrar só as recentes':'Ver todas as '+V.length+' gravações')+'</button>':'';
 var add=editing?'<form class="add" data-add="recordings"><input name="n" id="a-vn" placeholder="Nº da aula" required><input type="date" name="date" id="a-vdate" required aria-label="Data"><input name="title" id="a-vtitle" placeholder="Tema" required><input class="wide" name="url" id="a-vurl" placeholder="Link da gravação no Drive" required><button class="btn primary" type="submit">Adicionar gravação</button></form>':'';
 return'<section aria-labelledby="h-rec"><h2 id="h-rec">Assista às aulas<span class="count">'+V.filter(function(v){return!/parte 1/.test(v.title)}).length+' gravações</span></h2><div class="panel">'+body+'</div>'+more+add+'</section>';
}
var planOpen=false;
var progOpen=false,progTab="check",cdStep=0;
var cdSt={};try{cdSt=JSON.parse(LS.getItem("cl-cando")||"{}")||{}}catch(e){cdSt={}}
function cdSave(){try{LS.setItem("cl-cando",JSON.stringify(cdSt))}catch(e){}}
var CDL=[{v:0,l:"Ainda não",e:"😕"},{v:1,l:"Mais ou menos",e:"🙂"},{v:2,l:"Consigo bem",e:"😄"}];
function cdUnits(){var U=D.units||[],ids={};(D.cando||[]).forEach(function(c){ids[c.u]=1});return U.map(function(u,i){return{u:u,n:i+1}}).filter(function(x){return ids[x.u.id]&&x.u.status!=="todo"})}
function cdSummary(){var C=(D.cando||[]).filter(function(c){return cdUnits().some(function(x){return x.u.id===c.u})}),a=0,cnt=[0,0,0],k=0;
 C.forEach(function(c){var v=cdSt[c.id];if(v!==undefined){a+=v;cnt[v]++;k++}});return{n:C.length,k:k,pct:C.length?Math.round(a/(2*C.length)*100):0,cnt:cnt,C:C}}
function checkHTML(){var L=cdUnits();if(!L.length)return'<div class="empty">A checklist aparece conforme as lições avançam.</div>';
 if(cdStep>=L.length)cdStep=L.length-1;var cur=L[cdStep],S=cdSummary();
 var dots='<div class="cd-dots">'+L.map(function(x,i){var its=(D.cando||[]).filter(function(c){return c.u===x.u.id}),ok=its.every(function(c){return cdSt[c.id]!==undefined});return'<button type="button" class="cd-dot'+(i===cdStep?' on':'')+(ok?' ok':'')+'" data-cdgo="'+i+'" aria-label="Lesson '+x.n+'">'+x.n+'</button>'}).join("")+'</div>';
 var items=(D.cando||[]).filter(function(c){return c.u===cur.u.id}).map(function(c){return'<div class="cd-it"><p>Eu consigo <b>'+esc(c.t.charAt(0).toLowerCase()+c.t.slice(1))+'</b></p><div class="cd-opts">'+CDL.map(function(o){return'<button type="button" class="cd-o'+(cdSt[c.id]===o.v?' sel v'+o.v:'')+'" data-cd="'+esc(c.id)+'" data-v="'+o.v+'" aria-pressed="'+(cdSt[c.id]===o.v)+'">'+o.e+' '+o.l+'</button>'}).join("")+'</div></div>'}).join("");
 var nav='<div class="cd-nav"><button type="button" class="btn small" data-cdgo="'+(cdStep-1)+'"'+(cdStep===0?' disabled':'')+'>‹ Anterior</button><span>Lesson '+cur.n+' · '+esc(cur.u.title)+'</span><button type="button" class="btn small" data-cdgo="'+(cdStep+1)+'"'+(cdStep>=L.length-1?' disabled':'')+'>Próxima ›</button></div>';
 var weak=S.C.filter(function(c){return cdSt[c.id]!==undefined&&cdSt[c.id]<2});
 var unitUrl=function(id){var u=(D.units||[]).filter(function(x){return x.id===id})[0];return u&&u.url};
 var res='<div class="cd-res"><div class="cd-ring" style="--p:'+S.pct+'"><b>'+S.pct+'%</b></div><div><b>'+S.k+' de '+S.n+' respondidas</b><small>😄 '+S.cnt[2]+' · 🙂 '+S.cnt[1]+' · 😕 '+S.cnt[0]+'</small></div></div>'+
  (weak.length?'<p class="cd-h">Para melhorar</p><div class="cd-weak">'+weak.map(function(c){var uu=unitUrl(c.u);return'<div><span>'+esc(c.t)+'</span><span class="cd-l">'+(uu?'<a href="'+esc(uu)+'" target="_blank" rel="noopener">Slides</a>':'')+'<a href="'+esc(c.video)+'" target="_blank" rel="noopener">▶ Vídeo</a></span></div>'}).join("")+'</div>':'')+
  (D.selfForm&&S.k===S.n?'<a class="btn primary cd-send" target="_blank" rel="noopener" href="'+esc(D.selfForm+"?aluno="+encodeURIComponent((D.student&&D.student.name)||"")+"&semestre="+encodeURIComponent((D.semester&&D.semester.label)||"")+"&resultado="+encodeURIComponent(S.pct+"% · 😄 "+S.cnt[2]+" · 🙂 "+S.cnt[1]+" · 😕 "+S.cnt[0])+"&detalhes="+encodeURIComponent(S.C.map(function(c){return c.id+":"+cdSt[c.id]}).join(",")))+'">Enviar minha autoavaliação para a teacher</a>':(S.k<S.n?'<p class="note-sm">Responda todas para enviar para a teacher.</p>':''));
 return'<p class="note-sm">Marque com sinceridade: é para a teacher montar sua avaliação e o que estudar a seguir.</p>'+dots+'<div class="cd-card">'+nav+items+'</div>'+res}
function repHTML(){var R=(D.reports||[]).filter(function(r){return r.published||editing});
 if(!R.length)return'<div class="empty">Sua avaliação do semestre aparece aqui quando a teacher publicar.</div>';
 return R.map(function(r){
  return'<article class="rep">'+(r.published?'':'<p class="rep-draft">Rascunho · só você vê <button type="button" class="btn small primary" data-reppub="'+esc(r.id)+'">Publicar para o aluno</button></p>')+(editing&&r.published?'<p class="rep-draft">Publicado <button type="button" class="btn small" data-reppub="'+esc(r.id)+'">Esconder do aluno</button></p>':'')+
  '<h3>'+esc(r.label)+'</h3><small class="rep-d">'+esc(br(r.date))+(r.date?'/'+esc(r.date.slice(0,4)):'')+'</small>'+
  (r.stats?'<div class="rep-stats">'+r.stats.map(function(x){return'<div><b>'+esc(x.n)+'</b><span>'+esc(x.l)+'</span></div>'}).join("")+'</div>':'')+
  (r.skills?'<div class="rep-sk">'+r.skills.map(function(x){return'<div class="sk"><span>'+esc(x.k)+'</span><span class="sk-bar" role="img" aria-label="'+x.v+' de 5">'+[1,2,3,4,5].map(function(i){return'<i class="'+(i<=x.v?'on':'')+'"></i>'}).join("")+'</span></div>'}).join("")+'</div>':'')+
  (r.strong?'<p class="cd-h">Pontos fortes</p><ul class="rep-l ok">'+r.strong.map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ul>':'')+
  (r.improve?'<p class="cd-h">Para evoluir</p><ul class="rep-l up">'+r.improve.map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ul>':'')+
  (r.acts?'<p class="cd-h">Atividades sugeridas</p><div class="lls">'+r.acts.map(function(a){return a.u?'<a class="la" href="'+esc(safeUrl(a.u))+'" target="_blank" rel="noopener">'+esc(a.t)+' ↗</a>':'<span class="la">'+esc(a.t)+'</span>'}).join("")+'</div>':'')+
  (r.note?'<blockquote class="rep-n">'+esc(r.note)+'<cite>Teacher Sarah</cite></blockquote>':'')+'</article>'}).join("")}
function progHTML(){var S=cdSummary(),pub=(D.reports||[]).some(function(r){return r.published});
 return'<div class="wrap"><details class="plan" id="prog"'+(progOpen?' open':'')+'><summary><span class="ico">'+svg("star")+'</span><span class="pt"><b>Meu Progresso VYE</b><small>Autoavaliação'+(S.k?' · '+S.pct+'%':'')+' e avaliação do semestre'+(pub?' · nova!':'')+'</small></span><span class="chev" aria-hidden="true"></span></summary>'+
 '<div class="prog"><div class="tabs" role="tablist"><button type="button" role="tab" class="tab" data-ptab="check" aria-selected="'+(progTab==="check")+'">Eu consigo…</button><button type="button" role="tab" class="tab" data-ptab="rep" aria-selected="'+(progTab==="rep")+'">Minhas avaliações</button></div>'+(progTab==="check"?checkHTML():repHTML())+'</div></details></div>'}
function planHTML(){
 return'<div class="wrap"><details class="plan" id="plan"'+(planOpen||editing?' open':'')+'><summary><span class="ico">'+svg("star")+'</span><span class="pt"><b>Meu Plano VYE</b><small>Suas aulas, reposições e mensalidade</small></span><span class="chev" aria-hidden="true"></span></summary>'+
 '<div class="control">'+absHTML()+payHTML()+'</div></details></div>';
}

// ---------- abas principais ----------
var TABS=[{id:"hoje",l:"Hoje"},{id:"aulas",l:"Curso"},{id:"praticar",l:"Mais prática"},{id:"plano",l:"Meu plano"}];
function tabFromHash(){return"hoje";var h=String(location.hash||"").replace("#","");return TABS.some(function(t){return t.id===h})?h:"hoje"}
var mainTab=tabFromHash();
function hwPending(){return(D.homework||[]).filter(function(h){if(done[h.id])return false;if(h.ex&&h.ex.length)return hwSt(h).i<h.ex.length;return true}).length}
function tabsNavHTML(){
 var nh=stepsLeft();
 return'<nav class="mtabs" aria-label="Seções do painel"><div class="wrap mtabs-in" role="tablist">'+TABS.map(function(t){
  var n=t.id==="hoje"?nh:0;
  return'<button type="button" role="tab" class="mtab" data-mtab="'+t.id+'" aria-selected="'+(mainTab===t.id)+'">'+t.l+(n?'<span class="mt-n" aria-label="'+n+' pendentes">'+n+'</span>':'')+'</button>'}).join("")+'</div></nav>'}
function goTab(id,then){
 mainTab=id;
 render();
 if(then){then();return}
 var n=document.querySelector(".mtabs");if(n){var top=n.getBoundingClientRect().top;if(top<0)window.scrollBy(0,top)}}


// ---------- flashcards ----------
function lsGet(k,def){try{var v=JSON.parse(LS.getItem(k)||"null");return v==null?def:v}catch(e){return def}}
var fcBox=lsGet("cl-fc",{}),fcErr=lsGet("cl-fc-err",{}),fcMine=lsGet("cl-fc-mine",[]);
function fcSaveAll(){try{LS.setItem("cl-fc",JSON.stringify(fcBox));LS.setItem("cl-fc-err",JSON.stringify(fcErr));LS.setItem("cl-fc-mine",JSON.stringify(fcMine))}catch(e){}}
var FC_INT=[0,1,3,7,14,30],FC_NEW=10,FC_MAX=15;
function today(){return ymd(new Date())}
function dayPlus(n){return ymd(addDays(new Date(),n))}
function sayOf(x){return typeof x==="string"?{en:x,pt:""}:(x||{})}
function fcCards(){
 var out=[],seen={};
 function add(c){var k=normA(c.f);if(!k||seen[k])return;seen[k]=1;out.push(c)}
 Object.keys(fcErr).forEach(function(k){var c=fcErr[k];add({id:"e:"+k,f:c.f,b:c.b,say:c.say||"",note:c.note||"",g:"erros",gl:"Erros da lição de casa",d:c.d||"",err:1})});
 fcMine.forEach(function(c){add({id:"m:"+c.id,f:c.en,b:c.pt||"",pr:c.pr||"",note:c.ex?"Exemplo: "+c.ex:(c.note||""),say:c.en,g:"meus",gl:"Meus flashcards",d:c.d||"",mine:1})});
 (D.lessons||[]).slice().sort(function(a,b){return a.date<b.date?1:-1}).forEach(function(l){
  (l.vocab||[]).forEach(function(v){add({id:"v:"+l.id+":"+v.en,f:v.en,b:v.pt,pr:v.pr||"",say:v.en,g:l.id,gl:"Aula de "+br(l.date),d:l.date})});
  (l.say||[]).forEach(function(s){s=sayOf(s);if(s.en&&s.pt)add({id:"s:"+l.id+":"+s.en,f:s.en,b:s.pt,say:s.en,g:l.id,gl:"Aula de "+br(l.date),d:l.date})})});
 (D.phrases||[]).forEach(function(p){add({id:"p:"+p.id,f:p.en,b:p.pt,say:p.en,g:"frases",gl:"Frases que você já sabe",d:""})});
 return out}
function fcById(id){return fcCards().filter(function(c){return c.id===id})[0]}
function fcToday(){
 var C=fcCards(),t=today(),newToday=0;
 Object.keys(fcBox).forEach(function(k){if(fcBox[k].first===t)newToday++});
 var rev=C.filter(function(c){var s=fcBox[c.id];return s&&s.due<=t});
 var fresh=C.filter(function(c){return!fcBox[c.id]}).slice(0,Math.max(0,FC_NEW-newToday));
 rev.sort(function(a,b){return(b.err||0)-(a.err||0)||((fcBox[a.id].b||0)-(fcBox[b.id].b||0))});
 return rev.concat(fresh)}
var fcSess=null,fcAddMsg="",fcPre="",fcForm=null,fcAIBusy=false,fcAIMsg="",fcShowAll=false;
function fcStart(cards){if(!cards.length)return;fcSess={q:cards.slice(0,FC_MAX).map(function(c){return c.id}),i:0,flip:false,n:0,ok:0,again:{}}}
function fcAnswer(ok){
 if(!fcSess)return;var id=fcSess.q[fcSess.i],s=fcBox[id],t=today();
 if(!s)s=fcBox[id]={b:0,first:t};
 if(ok){if(!fcSess.again[id]){s.b=Math.min(5,(s.b||0)+1);fcSess.ok++}s.due=dayPlus(FC_INT[s.b])}
 else{s.b=0;s.due=t;if(!fcSess.again[id]){fcSess.again[id]=1;fcSess.q.push(id)}}
 if(!fcSess.again[id]||ok)fcSess.n++;
 fcSess.i++;fcSess.flip=false;fcSaveAll();
 if(fcSess.i>=fcSess.q.length)markStudy("Flashcards")}
function markStudy(what){var k=today();if(!streak[k]){streak[k]=what;saveStreak()}}
function fcFromEx(q){
 if(q.fc)return{f:q.fc.en,b:q.fc.pt||"",say:q.fc.en,note:q.e||""};
 if(q.t==="mc"){var c=q.o[q.a];if(/_{2,}/.test(q.q)){var full=q.q.replace(/_{2,}/,c);return{f:q.q,b:full,say:full,note:q.e||""}}return{f:q.q,b:c,say:"",note:q.e||""}}
 var a=(q.ans&&q.ans[0])||"";return{f:q.t==="order"?"Monte a frase: "+q.w.join(" / "):q.q,b:a,say:a,note:q.e||""}}
function fcAddErr(h,idx){var q=h.ex[idx],k=h.id+"|"+idx;if(fcErr[k])return;var c=fcFromEx(q);c.d=today();fcErr[k]=c;fcSaveAll()}
function fcSessHTML(){
 var S=fcSess;
 if(S.i>=S.q.length){var first=S.q.length-Object.keys(S.again).length;
  return'<div class="fc-end"><b>Revisão feita!</b><span>Você sabia '+S.ok+' de '+first+' de primeira.'+(Object.keys(S.again).length?' As que você errou voltam amanhã.':'')+'</span><span class="note-sm">Hoje já conta na sua sequência de estudo ✓</span><div class="fc-row">'+(fcToday().length?'<button type="button" class="btn primary" data-fcgo="due">Mais uma rodada ('+fcToday().length+')</button>':'')+'<button type="button" class="btn" data-fcstop="1">Voltar ao baralho</button></div></div>'}
 var c=fcById(S.q[S.i]);if(!c){S.i++;return fcSessHTML()}
 var pct=Math.round(S.i/S.q.length*100),again=S.again[c.id]&&S.q.indexOf(c.id)<S.i;
 var face='<span class="fc-src">'+esc(c.gl)+(again?' · de novo':'')+'</span><div class="fc-f">'+esc(c.f)+'</div>';
 var back=S.flip?'<div class="fc-back"><div class="fc-b">'+esc(c.b||"Diga em voz alta e confira o áudio.")+'</div>'+(c.pr?'<span class="fc-pr">pronúncia: '+esc(c.pr)+'</span>':'')+(c.note?'<p class="fc-note">'+esc(c.note)+'</p>':'')+'</div>':'';
 return'<div class="fc-sess"><div class="fc-top"><span class="fc-cnt">'+(S.i+1)+' de '+S.q.length+'</span><div class="ex-bar"><span style="width:'+pct+'%"></span></div><button type="button" class="btn small" data-fcstop="1">Parar</button></div>'+
  (S.flip?'<div class="fc-card is-flip">'+face+back+'</div>':'<button type="button" class="fc-card" data-fcflip="1" aria-label="Mostrar resposta">'+face+'<span class="fc-hint">Pense na resposta e toque para virar</span></button>')+
  '<div class="fc-row">'+(c.say?sayBtnBig(c.say):'')+(S.flip?'<button type="button" class="fc-ans no" data-fcans="0">Ainda não sei</button><button type="button" class="fc-ans yes" data-fcans="1">Já sei</button>':'<button type="button" class="btn primary fc-grow" data-fcflip="1">Mostrar resposta</button>')+'</div></div>'}
function sayBtnBig(t){return canSay?'<button type="button" class="btn fc-say" data-say="'+esc(t)+'" aria-label="Ouvir: '+esc(t)+'">🔊 Ouvir</button>':''}
var fcGroupOpen="";
function fcHTML(){
 var C=fcCards(),T=fcToday(),mast=C.filter(function(c){var s=fcBox[c.id];return s&&s.b>=3}).length;
 var head='<h2 id="h-fc">Flashcards<span class="count">'+C.length+' cards · '+mast+' dominados</span></h2>';
 if(fcSess)return'<section class="fc" aria-labelledby="h-fc">'+head+fcSessHTML()+'</section>';
 var groups=[],gi={};C.forEach(function(c){if(!(c.g in gi)){gi[c.g]=groups.length;groups.push({g:c.g,l:c.gl,c:[]})}groups[gi[c.g]].c.push(c)});
 var start=T.length?'<div class="fc-start"><div><b>'+T.length+'</b><span>'+(T.length===1?'card para hoje':'cards para hoje')+'</span></div><p class="note-sm">Palavras novas da última aula, as que estão quase esquecidas e os erros da lição de casa. Cada rodada leva uns 5 minutos.</p><button type="button" class="btn primary" data-fcgo="due">Começar revisão</button></div>':
  '<div class="fc-start ok"><div><b>✓</b><span>Tudo revisado por hoje</span></div><p class="note-sm">Os cards voltam no dia certo para você não esquecer. Quer treinar mais? Escolha uma aula abaixo.</p></div>';
 var list='<div class="fc-groups">'+groups.map(function(g){var m=g.c.filter(function(c){var s=fcBox[c.id];return s&&s.b>=3}).length,pct=Math.round(m/g.c.length*100),op=fcGroupOpen===g.g;
  return'<div class="fc-g"><div class="fc-gh"><div class="fc-gt"><b>'+esc(g.l)+'</b><small>'+g.c.length+' cards · '+m+' dominados</small><span class="fc-gbar"><span style="width:'+pct+'%"></span></span></div><button type="button" class="btn small" data-fcsee="'+esc(g.g)+'" aria-expanded="'+op+'">'+(op?'Fechar':'Ver')+'</button><button type="button" class="btn small primary" data-fcgo="'+esc(g.g)+'">Estudar</button></div>'+
  (op?'<ul class="fc-gl">'+g.c.map(function(c){return'<li><b>'+esc(c.f)+'</b><span>'+esc(c.b)+'</span>'+(c.mine?'<button type="button" class="linkbtn" data-fcdel="'+esc(c.id.slice(2))+'">remover</button>':'')+'</li>'}).join("")+'</ul>':'')+'</div>'}).join("")+'</div>';
 var mine=fcMine.slice().reverse(),shown=fcShowAll?mine:mine.slice(0,5);
 var create=fcForm?fcFormHTML():'<button type="button" class="fc-create" data-fcform="new"><span class="plus" aria-hidden="true">+</span><span><b>Criar meu flashcard</b><small>Uma palavra, frase ou expressão que você quer lembrar. Ela entra nas suas revisões.</small></span></button>';
 var mineHTML=mine.length?'<div class="fc-mine"><div class="fc-mh"><b>Meus flashcards · '+mine.length+'</b><button type="button" class="btn small primary" data-fcgo="meus">Estudar só os meus</button></div>'+shown.map(function(c){return'<div class="fc-mi"><div class="t"><b>'+esc(c.en)+'</b><span>'+esc(c.pt||"(sem tradução)")+(c.pr?' · '+esc(c.pr):'')+'</span></div><button type="button" class="btn small" data-fcedit="'+esc(c.id)+'">Editar</button><button type="button" class="btn small danger" data-fcdel="'+esc(c.id)+'">Apagar</button></div>'}).join("")+(mine.length>5?'<button type="button" class="linkbtn" style="padding:8px 0" data-fcall="1">'+(fcShowAll?'Mostrar menos':'Ver todos os '+mine.length)+'</button>':'')+'</div>':'';
 var add=(fcAddMsg&&!fcForm?'<p class="fc-ok" role="status">'+esc(fcAddMsg)+'</p>':'')+create+mineHTML;
 return'<section class="fc" aria-labelledby="h-fc">'+head+start+add+'<details class="deck" id="deckX"'+(deckOpen?' open':'')+'><summary>Baralho completo · '+C.length+' cards, por aula</summary>'+list+'</details></section>'}
function fcFormHTML(){var f=fcForm,canAI=!!(aiNs&&!aiOff);
 return'<form class="fc-new" id="fcAdd"><div class="fcn-h"><b>'+(f.id?'Editar flashcard':'Novo flashcard')+'</b><button type="button" class="btn small" data-fcform="close">Fechar</button></div>'+
 '<div class="fcn-g"><label>Frente · em inglês<input id="fc-en" required value="'+esc(f.en)+'" placeholder="grandmother" autocomplete="off" autocapitalize="off" spellcheck="false"></label>'+
 '<label>Verso · o que significa<input id="fc-pt" value="'+esc(f.pt)+'" placeholder="avó" autocomplete="off"></label>'+
 '<label>Pronúncia (opcional)<input id="fc-pr" value="'+esc(f.pr)+'" placeholder="grén-mâ-dâr" autocomplete="off" spellcheck="false"></label>'+
 '<label>Exemplo (opcional)<input id="fc-ex" value="'+esc(f.ex)+'" placeholder="My grandmother lives in Santos." autocomplete="off" spellcheck="false"></label></div>'+
 (f.en||f.pt?'<div class="fc-prev" aria-hidden="true"><div><small>Frente</small><b>'+esc(f.en||"…")+'</b></div><div><small>Verso</small><b>'+esc(f.pt||"…")+'</b>'+(f.pr?'<br><i style="color:var(--muted);font-size:.85rem">'+esc(f.pr)+'</i>':'')+'</div></div>':'')+
 '<div class="fcn-acts">'+(canAI?'<button type="button" class="btn" id="fcAI"'+(fcAIBusy?' disabled':'')+'>'+(fcAIBusy?'Pensando…':'✨ Completar com IA')+'</button>':'')+'<button type="submit" class="btn primary">'+(f.id?'Salvar alterações':'Salvar flashcard')+'</button><span class="note-sm" role="status">'+esc(fcAIMsg||fcAddMsg||(canAI?'Escreva a frente e a IA sugere tradução, pronúncia e exemplo.':''))+'</span></div></form>'}

// ---------- Hoje ----------
function lastLesson(){return(D.lessons||[]).slice().sort(function(a,b){return a.date<b.date?1:-1})[0]}
function longDate(iso){var p=String(iso||"").split("-");return p.length<3?"":(+p[2])+" de "+MONF[+p[1]-1]}
function sayLine(s,l){s=sayOf(s);var inDeck=s.pt||fcMine.some(function(c){return normA(c.en)===normA(s.en)});
 return'<li><span class="sl-en">'+esc(s.en)+sayBtn(s.en)+'</span>'+(s.pt?'<span class="sl-pt">'+esc(s.pt)+'</span>':'')+(inDeck?'':'<button type="button" class="addfc" data-fcplus="'+esc(s.en)+'" aria-label="Adicionar aos flashcards">+ flashcard</button>')+'</li>'}
function afterHTML(){
 var l=lastLesson();if(!l)return'';
 var HW=D.homework||[],lk="h"+String(l.date).replace(/-/g,""),H=HW.filter(function(h){return h.lesson===l.id||h.id===lk})[0]||HW.slice().sort(function(a,b){return(a.sent||"")<(b.sent||"")?1:(a.sent||"")>(b.sent||"")?-1:(a.id<b.id?1:-1)})[0],hs="";
 if(H){if(H.ex&&H.ex.length){var st=hwSt(H);hs=st.i>=H.ex.length?"Feita · nota "+hwScore(H)+"/"+H.ex.length:st.i>0?"Parou na "+(st.i+1)+"ª de "+H.ex.length:H.ex.length+" questões com correção na hora"}else hs=done[H.id]?"Feita ✓":"Abrir a atividade"}
 if(H&&H.due)hs+=" · até "+br(H.due);
 var T=fcToday().length,V=l.vocab||[],S=l.say||[];
 var voc=V.map(function(v){return'<li><div class="vw"><b>'+esc(v.en)+'</b>'+sayBtn(v.en)+'</div><span class="vp">'+esc(v.pt)+'</span>'+(v.pr?'<span class="vr">'+esc(v.pr)+'</span>':'')+'</li>'}).join("");
 var links=(l.rec?'<a class="la" href="'+esc(safeUrl(l.rec))+'" target="_blank" rel="noopener">▶ Gravação</a>':'')+(l.notes?'<a class="la" href="'+esc(safeUrl(l.notes))+'" target="_blank" rel="noopener">✦ Resumo do Gemini</a>':'')+(l.chat?'<a class="la" href="'+esc(safeUrl(l.chat))+'" target="_blank" rel="noopener">💬 Chat da aula</a>':'');
 return'<section class="after" aria-labelledby="h-after"><p class="eyebrow">Depois da aula · '+esc(longDate(l.date))+'</p><h2 id="h-after">'+esc(l.title)+'</h2>'+(l.sum?'<p class="after-sum">'+esc(l.sum)+'</p>':'')+
 '<div class="after-acts"><button type="button" class="act" data-fcgo="due" data-totab="praticar"><span class="act-k">1</span><span class="act-t"><b>Revisar flashcards</b><small>'+(T?T+(T===1?' card para hoje':' cards para hoje'):'Tudo revisado por hoje ✓')+(V.length?' · '+V.length+' palavras desta aula':'')+'</small></span></button>'+
 (H?'<button type="button" class="act" data-hwgo="'+esc(H.id)+'"><span class="act-k">2</span><span class="act-t"><b>Fazer a lição de casa</b><small>'+esc(hs)+'</small></span></button>':'')+'</div>'+
 '<p class="note-sm after-why">Os flashcards ajudam a guardar as palavras. A lição usa essas palavras em frases. O que você errar na lição vira flashcard.</p>'+
 (voc?'<h3>Vocabulário da aula <small>'+(canSay?'toque 🔊 para ouvir':'com pronúncia')+'</small></h3><ul class="voc">'+voc+'</ul>':'')+
 (S.length?'<h3>Frases da aula</h3><ul class="say-l">'+S.map(function(s){return sayLine(s,l)}).join("")+'</ul>':'')+
 (links?'<div class="lls">'+links+'</div>':'')+'</section>'}
function streakHTML(){
 var st=stats(),t=new Date(),cells="";
 for(var i=6;i>=0;i--){var d=addDays(t,-i),k=ymd(d),on=!!streak[k];cells+='<span class="sd'+(on?' on':'')+(i===0?' now':'')+'" title="'+esc(br(k))+(on?' · '+esc(streak[k]==="challenge"?"estudou":streak[k]):'')+'"><i>'+"DSTQQSS"[d.getDay()]+'</i></span>'}
 var badge=st.cur>=30?"30 dias seguidos!":st.cur>=14?"2 semanas seguidas!":st.cur>=7?"1 semana seguida!":st.cur>=3?"3 dias seguidos!":"";
 var today2=st.done?'<p class="st-ok">✓ Hoje já conta: '+esc(streak[st.today]==="challenge"?"estudou":String(streak[st.today]).toLowerCase())+'. <button type="button" class="linkbtn" id="dcUndo">desfazer</button></p>':
  '<p class="note-sm">Conta sozinho quando você termina os flashcards ou a lição de casa.</p><button type="button" class="linkbtn" id="dcOther" aria-expanded="'+otherOpen+'">Estudei de outro jeito hoje</button>'+(otherOpen?'<div class="dc-chips">'+OTHERS.map(function(o){return'<button type="button" class="tab" data-other="'+esc(o)+'">'+esc(o)+'</button>'}).join("")+'</div>':'');
 return'<section class="streak" aria-labelledby="h-st"><div class="st-head"><div class="dc-streak"><b>'+st.cur+'</b><span>'+(st.cur===1?"dia seguido":"dias seguidos")+'</span></div><div><h2 id="h-st">Sequência de estudo</h2>'+(badge?'<span class="tagnow">'+badge+'</span>':'')+'</div></div>'+
 '<div class="sweek" aria-label="Últimos 7 dias">'+cells+'</div>'+today2+
 '<div class="dc-foot"><span>'+st.total+(st.total===1?" dia":" dias")+' no total · melhor: '+st.best+'</span><button class="btn small" type="button" id="dcCopy">Copiar meu progresso</button></div><p class="note-sm" id="dcMsg" hidden></p></section>'}
// ---------- versão foco ----------
var aulasTab="trilha",moreOpen=false,deckOpen=false;
function headerHTML(){
 var s=D.student||{},n=nextClass(),when;
 if(!n)when="Horário a combinar";
 else if(n.live)when="Agora, até "+String((+(s.time||"18:00").split(":")[0]+1)).padStart(2,"0")+":"+((s.time||"18:00").split(":")[1]||"00");
 else{var lab=n.i===0?"Hoje":n.i===1?"Amanhã":DOW[n.d.getDay()].replace(/^./,function(c){return c.toUpperCase()});when=lab+", "+String(n.d.getDate()).padStart(2,"0")+"/"+String(n.d.getMonth()+1).padStart(2,"0")+" · "+(s.time||"18:00")}
 return'<header class="top wrap"><div class="hi"><p class="eyebrow">Voice Your English · Nível '+esc(s.level||"")+'</p><h1>Hi, <em>'+esc(s.name||"")+'</em>!</h1></div>'+
 '<div class="nextbar'+(n&&n.live?' live':'')+'"><span class="nb-t"><span class="nb-k">'+(n&&n.live?'Aula ao vivo':'Próxima aula')+'</span><b>'+esc(when)+'</b></span>'+(s.meet?'<a class="join" href="'+esc(safeUrl(s.meet))+'" target="_blank" rel="noopener">Entrar</a>':'')+'</div></header>'}
function lessonHw(l){var HW=D.homework||[],lk="h"+String(l.date).replace(/-/g,"");return HW.filter(function(h){return h.lesson===l.id||h.id===lk})[0]||HW.slice().sort(function(a,b){return(a.sent||"")<(b.sent||"")?1:(a.sent||"")>(b.sent||"")?-1:(a.id<b.id?1:-1)})[0]}
function hwIsDone(h){if(!h)return true;if(done[h.id])return true;return!!(h.ex&&h.ex.length&&hwSt(h).i>=h.ex.length)}
function trlStats(){var U=D.units||[],U2=D.units2||[],cu=nowUnit(),s1=U.length&&U.every(function(u){return u.status==="done"}),in2=cu?U2.indexOf(cu.u)>=0:(s1&&U2.length>0),L=in2?U2:U,nd=L.filter(function(u){return u.status==="done"}).length;return{n:L.length,done:nd,cu:cu,sem:in2?"Semestre 2":"Semestre 1",pct:L.length?Math.round(nd/L.length*100):0}}
function trlHeroHTML(){var t=trlStats(),cu=t.cu,base=((D.links||{}).trilha||"").replace(/#.*$/,"");
 return'<section class="wrap"><div class="trl-hero"><p class="eyebrow">Sua trilha · '+esc(t.sem)+'</p><h2>'+(cu?'Agora: Lesson '+cu.n+' · '+esc(cu.u.title):'Seu caminho no curso')+'</h2>'+(cu&&cu.u.note?'<p>'+esc(cu.u.note)+'</p>':'')+
 '<div><div class="trl-meta"><span>'+t.done+' de '+t.n+' lições do '+esc(t.sem)+'</span><span>'+t.pct+'%</span></div><div class="trl-bar"><i style="width:'+t.pct+'%"></i></div></div>'+
 '<p style="font-size:.92rem">Em cada lição: slides da aula, videoaula, listening e exercícios que se corrigem na hora. Use para revisar, recuperar uma aula que perdeu ou adiantar a próxima.</p>'+
 '<div class="trl-acts">'+(cu&&cu.url3?'<a class="go1" href="'+esc(cu.url3)+'" target="_blank" rel="noopener">Estudar a Lesson '+cu.n+' ↗</a>':'')+(base?'<a class="go2" href="'+esc(base)+'" target="_blank" rel="noopener">Abrir a trilha completa ↗</a>':'')+'</div></div></section>'}
function trlMiniHTML(){var t=trlStats(),cu=t.cu;if(!t.n)return"";
 return'<button type="button" class="trl-mini" data-gotrilha="1"><span class="di" aria-hidden="true">'+svg("path")+'</span><span class="t"><b>Sua trilha · '+t.done+' de '+t.n+' lições do '+esc(t.sem)+'</b><small>'+(cu?'Agora: Lesson '+cu.n+' · '+esc(cu.u.title):'Veja todas as lições do curso')+'</small><span class="bar"><i style="width:'+t.pct+'%"></i></span></span><span class="go" aria-hidden="true">›</span></button>'}
function nowUnit(){var lists=[["units","s1"],["units2","s2"]];for(var k=0;k<lists.length;k++){var U=D[lists[k][0]]||[];for(var i=0;i<U.length;i++)if(U[i].status==="now")return{u:U[i],n:i+1,url3:trilhaUrl(lists[k][1],i+1)}}return null}
function stepsLeft(){var l=lastLesson();if(!l)return 0;return(fcToday().length?1:0)+(hwIsDone(lessonHw(l))?0:1)}
function todayHTML(){
 var l=lastLesson();
 if(!l)return'<div class="wrap narrow today"><p class="empty">Depois da primeira aula, o que fazer aparece aqui.</p></div>'+streakLineHTML();
 var H=lessonHw(l),T=fcToday().length,open=H&&hwOpen[H.id],hd=hwIsDone(H),hs="";
 if(H){if(H.ex&&H.ex.length){var st=hwSt(H);hs=st.i>=H.ex.length?"Nota "+hwScore(H)+" de "+H.ex.length:st.i>0?"Parou na "+(st.i+1)+"ª de "+H.ex.length:H.ex.length+" questões"}else hs=done[H.id]?"Feita":"Atividade em outro site";if(H.due&&!hd)hs+=" · até "+br(H.due)}
 var step1='<li><button type="button" class="step'+(T?'':' ok')+'" data-fcgo="due"><span class="snum">'+(T?'1':'✓')+'</span><span class="st-t"><b>Revisar flashcards</b><small>'+(T?T+' cards · uns 5 minutos':'Feito por hoje')+'</small></span><span class="go" aria-hidden="true">›</span></button></li>';
 var step2=!H?'':(H.ex&&H.ex.length?'<li><button type="button" class="step'+(hd?' ok':'')+(open?' open':'')+'" data-exopen="'+esc(H.id)+'" aria-expanded="'+(open?'true':'false')+'"><span class="snum">'+(hd?'✓':'2')+'</span><span class="st-t"><b>Fazer a lição de casa</b><small>'+esc(hs)+'</small></span><span class="go" aria-hidden="true">'+(open?'×':'›')+'</span></button>'+(open?'<div class="ex" id="ex-'+esc(H.id)+'">'+exHTML(H)+'</div>':'')+'</li>':
  '<li><a class="step'+(hd?' ok':'')+'" href="'+esc(safeUrl(H.url||H.file||""))+'" target="_blank" rel="noopener"><span class="snum">'+(hd?'✓':'2')+'</span><span class="st-t"><b>Fazer a lição de casa</b><small>'+esc(hs)+'</small></span><span class="go" aria-hidden="true">↗</span></a></li>');
 var cu=nowUnit(),step3=cu&&cu.url3?'<li><a class="step trl" href="'+esc(cu.url3)+'" target="_blank" rel="noopener"><span class="snum">3</span><span class="st-t"><b>Estudar a Lesson '+cu.n+' na Trilha</b><small>'+esc(cu.u.title)+' · slides, vídeo, listening e exercícios</small></span><span class="go" aria-hidden="true">↗</span></a></li>':'';
 var links=(l.rec?'<a class="la" href="'+esc(safeUrl(l.rec))+'" target="_blank" rel="noopener">▶ Gravação</a>':'')+'<button type="button" class="la" data-seeles="'+esc(l.id)+'">Vocabulário e frases</button>'+(l.notes?'<a class="la" href="'+esc(safeUrl(l.notes))+'" target="_blank" rel="noopener">Resumo do Gemini</a>':'');
 var others=(D.homework||[]).filter(function(h){return h!==H&&!hwIsDone(h)}).length;
 return'<section class="wrap narrow today" aria-labelledby="h-today"><p class="eyebrow">Depois da aula · '+esc(longDate(l.date))+'</p><h2 id="h-today">'+esc(l.title)+'</h2>'+(l.sum?'<p class="today-sum">'+esc(l.sum)+'</p>':'')+
 '<ol class="steps">'+step1+step2+step3+'</ol>'+trlMiniHTML()+(stepsLeft()===0?'<button type="button" class="done-more" data-mtab="praticar"><span><b>Terminou tudo! 🎉</b><small>Quer praticar mais? Flashcards, IA e Practice Hub.</small></span><span aria-hidden="true">→</span></button>':'')+'<div class="lls">'+links+'</div></section>'+streakLineHTML()+
 (others?'<p class="wrap narrow more-hw">'+(others===1?'Você tem 1 lição anterior em aberto.':'Você tem '+others+' lições anteriores em aberto.')+' <button type="button" class="linkbtn" data-atab="licoes">Ver</button></p>':'')}
function streakLineHTML(){
 var st=stats(),t=new Date(),cells="";
 for(var i=6;i>=0;i--){var d=addDays(t,-i),k=ymd(d),on=!!streak[k];cells+='<span class="sd'+(on?' on':'')+(i===0?' now':'')+'" title="'+esc(br(k))+'"><i>'+"DSTQQSS"[d.getDay()]+'</i></span>'}
 return'<div class="wrap narrow"><div class="sline"><span class="sl-n"><b>'+st.cur+'</b>'+(st.cur===1?' dia seguido':' dias seguidos')+'</span><div class="sweek" aria-label="Últimos 7 dias">'+cells+'</div>'+
 (st.done?'<span class="sl-ok">Hoje conta ✓ <button type="button" class="linkbtn" id="dcCopy">copiar progresso</button></span>':'<button type="button" class="linkbtn" id="dcOther" aria-expanded="'+otherOpen+'">Estudei de outro jeito</button>')+'</div>'+
 (otherOpen&&!st.done?'<div class="dc-chips" style="margin-top:8px">'+OTHERS.map(function(o){return'<button type="button" class="tab" data-other="'+esc(o)+'">'+esc(o)+'</button>'}).join("")+'</div>':'')+'<p class="note-sm" id="dcMsg" hidden></p></div>'}
function quickChipsHTML(){
 var L=D.links||{},items=[{k:"folder",t:"Materiais",u:L.materials},{k:"rec",t:"Pasta de gravações",u:L.recordings},{k:"note",t:"Digital Notebook",u:L.notebook},{k:"path",t:"Trilha A1",u:L.trilha}].concat((D.resources||[]).filter(function(r){return!r.why&&r.url}).slice(0,1).map(function(r){return{k:"read",t:"Livro do curso",u:r.url}})).filter(function(x){return x.u});
 return'<nav class="qchips wrap" aria-label="Atalhos">'+items.map(function(x){return'<a class="qc" href="'+esc(safeUrl(x.u))+'" target="_blank" rel="noopener">'+svg(x.k)+esc(x.t)+'</a>'}).join("")+'</nav>'}
function aulasHTML(){
 var T=[["trilha","Trilha"],["aulas","Aulas"],["licoes","Lições de casa"],["gravacoes","Gravações"]];
 var seg='<div class="wrap"><div class="seg" role="tablist">'+T.map(function(x){return'<button type="button" role="tab" data-atab="'+x[0]+'" aria-selected="'+(aulasTab===x[0])+'">'+x[1]+'</button>'}).join("")+'</div></div>';
 var body=aulasTab==="licoes"?'<div class="wrap seg-body">'+hwHTML()+'</div>':aulasTab==="trilha"?trlHeroHTML()+'<div class="wrap seg-body" style="padding-top:18px">'+pathHTML()+'</div>'+progHTML():aulasTab==="gravacoes"?'<div class="wrap seg-body">'+recHTML()+'</div>':'<div class="wrap seg-body">'+lessonsHTML()+'</div>';
 return seg+body+'<div class="wrap"><details class="files"><summary>Arquivos do curso ▾</summary>'+quickChipsHTML()+'</details></div>'}
var pracView="";
function praticarHTML(){
 var back='<button type="button" class="back" data-pview="">← Mais prática</button>';
 if(pracView==="fc")return'<div class="wrap narrow">'+back+'<div class="pr" style="padding-top:12px">'+fcHTML()+(editing?phrasesHTML():'')+'</div></div>';
 if(pracView==="ai")return'<div class="wrap narrow">'+back+chatHTML()+'</div>';
 if(pracView==="extras")return'<div class="wrap narrow">'+back+'<div style="padding-top:14px">'+vidHTML()+'</div></div>';
 var T=fcToday().length,hub=(D.links||{}).hub;
 return'<div class="wrap narrow doors"><div><h2>Mais prática</h2><p class="note-sm">Tudo aqui é opcional. Use quando sobrar um tempinho.</p></div>'+
 '<button type="button" class="door" data-pview="fc"><span class="di" aria-hidden="true">'+svg("cards")+'</span><span class="dt"><b>Flashcards</b><small>'+(T?T+(T===1?' card para hoje':' cards para hoje'):'Tudo revisado por hoje ✓')+' · para memorizar as palavras</small></span><span class="go" aria-hidden="true">›</span></button>'+
 '<button type="button" class="door ai" data-pview="ai"><span class="di" aria-hidden="true">'+svg("chat")+'</span><span class="dt"><b>Converse com a IA</b><small>Conversa, role-play e treino da lição, até por voz</small></span><span class="go" aria-hidden="true">›</span></button>'+
 (hub?'<a class="door hub" href="'+esc(safeUrl(hub))+'" target="_blank" rel="noopener"><span class="di" aria-hidden="true">'+svg("globe")+'</span><span class="dt"><b>Practice Hub</b><small>Mais de 50 atividades: séries, música, podcasts, leitura, viagem e trabalho</small></span><span class="go" aria-hidden="true">↗</span></a>':'')+((D.videos||[]).length||(D.prompts||[]).length?'<button type="button" class="door ext" data-pview="extras"><span class="di" aria-hidden="true">'+svg("audio")+'</span><span class="dt"><b>Do tema atual</b><small>'+(D.studyTheme?esc(D.studyTheme)+' · ':'')+'vídeos, listening, leituras, podcasts e comandos de IA</small></span><span class="go" aria-hidden="true">›</span></button>':'')+'</div>'}

function editHeadHTML(){
 if(!editing)return"";
 var s=D.student||{},L=D.links||{};
 var dayChk=[1,2,3,4,5,6].map(function(d){return'<label style="flex-direction:row;align-items:center;gap:4px"><input type="checkbox" data-day="'+d+'"'+((s.days||[]).indexOf(d)>=0?" checked":"")+' style="width:auto">'+DOW[d].slice(0,3)+'</label>'}).join("");
 function f(id,lab,val,ph){return'<label>'+lab+'<input id="'+id+'" value="'+esc(val||"")+'"'+(ph?' placeholder="'+ph+'"':'')+'></label>'}
 return'<div class="wrap"><div class="edit-head">'+
 f("e-name","Nome do aluno",s.name)+f("e-email","E-mail do aluno (lembretes)",s.email,"nome@email.com")+f("e-level","Nível",s.level)+f("e-time","Horário (HH:MM)",s.time,"18:00")+f("e-meet","Link da aula (Meet)",s.meet)+
 '<label>Dias de aula<span style="display:flex;gap:10px;flex-wrap:wrap;padding-top:6px">'+dayChk+'</span></label>'+
 f("e-mat","Pasta de materiais",L.materials)+f("e-rec","Pasta de gravações",L.recordings)+f("e-reccount","Nº de aulas gravadas",D.recCount)+f("e-nb","Digital Notebook",L.notebook)+
 '</div></div>';
}

function render(){
 var body;
 if(mainTab==="hoje")body=todayHTML();
 else if(mainTab==="praticar")body=praticarHTML();
 else if(mainTab==="aulas")body=aulasHTML();
 else body='<div class="wrap"><div class="control plan-tab">'+payHTML()+absHTML()+'</div>'+(window.VYECal?window.VYECal.html({days:(D.student||{}).days,year:2027,semFeriado:!!(D.student||{}).semFeriado}):'')+'</div>';
 var html=(canEdit?'<div class="wrap ownerbar"><span class="note-sm">Só você, a teacher, vê este botão.</span><button class="btn" id="toggleEdit" type="button">'+(editing?"Ver como aluno":"Editar dashboard")+'</button></div>':'')+
 (D.banner?'<div class="wrap" style="padding-top:16px"><img class="banner" src="'+esc(D.banner)+'" alt="Voice Your English · English Course"></div>':'')+headerHTML()+editHeadHTML()+tabsNavHTML()+'<div class="tabbody">'+body+'</div>'+
 (editing?'<div class="wrap"><div class="savebar"><span class="status" id="status">'+(dirty?'Você tem alterações não publicadas.':'Tudo publicado. O aluno vê exatamente esta página.')+'</span><button class="btn primary" id="publish" type="button"'+(dirty?'':' disabled')+'>Publicar alterações</button></div></div>':'')+
 '<footer class="wrap"><button type="button" class="linkbtn" id="tourOpen">Como usar o painel</button> · Dúvida ou link quebrado? Me chama no grupo do WhatsApp.</footer>';
 document.getElementById("app").innerHTML=html;
 if(typeof tourI!=="undefined"&&tourI>=0){var tb=document.querySelector(".tabbody");if(tb)tb.classList.add("tour-pad")}
}

function mark(){dirty=true;var st=document.getElementById("status"),p=document.getElementById("publish");if(st)st.textContent="Você tem alterações não publicadas.";if(p)p.disabled=false}
function json(x){return JSON.stringify(x).replace(/</g,"\\u003c")}
function buildDoc(){
 var css=document.getElementById("app-css").textContent,js=document.getElementById("app-js").textContent;
 return SKEL+HEAD_EXTRA+'<style id="app-css">'+css+'</style><script type="application/json" id="app-data">'+json(D)+'<\/script><div id="app"></div><script id="app-js">'+js+'<\/script></body></html>';
}

render();
var app=document.getElementById("app");
app.addEventListener("toggle",function(e){if(e.target.id==="moreX"){moreOpen=e.target.open;return}if(e.target.id==="deckX"){deckOpen=e.target.open;return}if(e.target.id==="prog"){progOpen=e.target.open;return}if(e.target.dataset&&e.target.dataset.les){lesOpen[e.target.dataset.les]=e.target.open;return}if(e.target.id==="plan"&&!editing)planOpen=e.target.open},true);
app.addEventListener("change",function(e){
 var t=e.target;
 if(t.id==="rcptFile"){var rfile=t.files&&t.files[0],ym2=rcptFor;if(!rfile||!ym2||!assetsNs)return;rcptBusy=ym2;render();
  assetsNs.upload(rfile).then(function(r){D.payments=D.payments||[];var pp=D.payments.filter(function(p){return p.month===ym2})[0];
   if(!pp){pp={id:"pay"+ym2.replace("-",""),month:ym2,due:D.payDay?ym2+"-"+String(D.payDay).padStart(2,"0"):"",status:"pago"};D.payments.push(pp)}
   pp.receipt={url:r.url,id:r.id,name:rfile.name};rcptBusy="";mark();render()},function(){rcptBusy="";render();alertMsg("Não deu para enviar esse arquivo. Use PDF ou imagem de até 20 MB.")});return}
 if(t.dataset.task){if(t.checked)done[t.dataset.task]=1;else delete done[t.dataset.task];try{LS.setItem("cl-done",JSON.stringify(done))}catch(err){}render();return}
 if(t.dataset.unit){(D[t.dataset.ulist||"units"]||[]).forEach(function(u){if(u.id===t.dataset.unit)u.status=t.value});mark();render();return}
 if(t.dataset.abs){D.absences.forEach(function(a){if(a.id===t.dataset.abs)a.status=t.value});mark();render();return}
 if(t.dataset.pay){D.payments.forEach(function(p){if(p.id===t.dataset.pay)p.status=t.value});mark();render();return}
 if(t.id==="e-reccount"){D.recCount=t.value.trim();mark();render();return}
 if(t.id==="e-payday"){D.payDay=t.value.trim();mark();render();return}
 if(t.dataset.day){var d=+t.dataset.day,ds=(D.student.days||[]).filter(function(x){return x!==d});if(t.checked)ds.push(d);ds.sort();D.student.days=ds;mark();render();return}
 var map={"e-name":["student","name"],"e-email":["student","email"],"e-level":["student","level"],"e-time":["student","time"],"e-meet":["student","meet"],"e-mat":["links","materials"],"e-rec":["links","recordings"],"e-nb":["links","notebook"]};
 if(map[t.id]){var k=map[t.id];D[k[0]]=D[k[0]]||{};D[k[0]][k[1]]=t.value.trim();mark();render()}
});
app.addEventListener("input",function(e){var t=e.target;if(fcForm&&/^fc-(en|pt|pr|ex)$/.test(t.id)){fcForm[t.id.slice(3)]=t.value}if(t.dataset&&t.dataset.xin)xTxt[t.dataset.xin]=t.value;if(t.dataset.win)wVal[t.dataset.win]=t.value;if(t.id==="w-free")freeTxt=t.value});
app.addEventListener("keydown",function(e){var t=e.target;if(e.key==="Enter"&&t.dataset&&t.dataset.exin){e.preventDefault();var be=document.querySelector('[data-excheck="'+t.dataset.exin+'"]');if(be)be.click();return}if(e.key==="Enter"&&t.dataset&&t.dataset.win){e.preventDefault();var bb=document.querySelector('[data-wchk="'+t.dataset.win+'"]');if(bb)bb.click()}});
app.addEventListener("submit",function(e){
 if(e.target.id==="fcAdd"){e.preventDefault();if(!fcForm)return;var F=fcForm,en=(F.en||"").trim(),pt=(F.pt||"").trim();fcAIMsg="";
  if(!en){fcAddMsg="Escreva a frente do card em inglês.";render();return}
  var dup=fcCards().some(function(c){return normA(c.f)===normA(en)&&c.id!=="m:"+F.id});
  if(dup){fcAddMsg="“"+en+"” já está no seu baralho.";render();return}
  var rec={en:en,pt:pt,pr:(F.pr||"").trim(),ex:(F.ex||"").trim()};
  if(F.id){fcMine=fcMine.map(function(c){return c.id===F.id?Object.assign({},c,rec):c});fcForm=null;fcAddMsg="Flashcard atualizado."}
  else{rec.id=uid("m");rec.d=today();fcMine.push(rec);fcForm={en:"",pt:"",pr:"",ex:""};fcAddMsg="Salvo: "+en+(pt?" = "+pt:"")+". Ele aparece na sua próxima revisão. Quer criar outro?"}
  fcSaveAll();render();var fi2=document.getElementById("fc-en");if(fi2)fi2.focus({preventScroll:true});return}
 if(e.target.id==="hwf"){e.preventDefault();
  var g=function(id){var x=document.getElementById(id);return x?x.value.trim():""};
  var fi=document.getElementById("hw-file"),file=fi&&fi.files&&fi.files[0],st=document.getElementById("hw-status");
  var rec={id:uid("h"),title:g("hw-title"),due:g("hw-due"),note:g("hw-note"),url:g("hw-url")?safeUrl(g("hw-url")):"",sent:new Date().toISOString().slice(0,10)};
  if(!rec.title)return;
  if(!rec.url&&!file){if(st)st.textContent="Coloque um link ou escolha um arquivo.";return}
  var finish=function(){D.homework=D.homework||[];D.homework.push(rec);mark();render()};
  if(file){
   if(!assetsNs){if(st)st.textContent="O envio de arquivos não está disponível aqui. Use um link do Drive.";return}
   if(st)st.textContent="Enviando arquivo...";
   assetsNs.upload(file).then(function(r){rec.file=r.url;rec.fileName=file.name;finish()},function(){var s2=document.getElementById("hw-status");if(s2)s2.textContent="Não foi possível enviar esse arquivo. Use PDF ou imagem, ou cole um link do Drive."});
  }else finish();
  return}
 var f=e.target,list=f.dataset.add;if(!list)return;e.preventDefault();
 var rec={},els=f.querySelectorAll("[name]");for(var i=0;i<els.length;i++)rec[els[i].name]=els[i].value.trim();
 rec.id=uid(list[0]);
 if(rec.url)rec.url=safeUrl(rec.url);if(rec.video)rec.video=safeUrl(rec.video);
 if(list==="units")rec.status="todo";
 D[list]=D[list]||[];D[list].push(rec);mark();render();
 var first=document.querySelector('form[data-add="'+list+'"] input');if(first)first.focus();
});
app.addEventListener("click",function(e){
 var ps=e.target.closest("a[data-paysent]");
 if(ps){paySent[ps.dataset.paysent]=1;try{LS.setItem("cl-paysent",JSON.stringify(paySent))}catch(err){}setTimeout(render,400);return}
 var hd=e.target.closest("a[data-hwdone]");
 if(hd){done[hd.dataset.hwdone]=1;markStudy("Lição de casa");try{LS.setItem("cl-done",JSON.stringify(done))}catch(err){}setTimeout(render,400);return}
 var b=e.target.closest("button");if(!b)return;
 if(b.id==="tourOpen"){tourGo(0);return}
 if(b.dataset.gotrilha){aulasTab="trilha";goTab("aulas");window.scrollTo({top:0});return}
 if(b.dataset.mtab){if(b.dataset.mtab==="praticar")pracView="";goTab(b.dataset.mtab);return}
 if(b.dataset.pview!==undefined){pracView=b.dataset.pview;fcSess=pracView==="fc"?fcSess:fcSess;render();window.scrollTo({top:0});return}
 if(b.dataset.rcadd){rcptFor=b.dataset.rcadd;var rf=document.getElementById("rcptFile");if(rf){rf.value="";rf.click()}return}
 if(b.dataset.rcdel){(D.payments||[]).forEach(function(p){if(p.month===b.dataset.rcdel)delete p.receipt});mark();render();return}
 if(b.dataset.atab){aulasTab=b.dataset.atab;if(mainTab!=="aulas")goTab("aulas");else render();return}
 if(b.dataset.seeles){var sl2=b.dataset.seeles;aulasTab="aulas";lesOpen[sl2]=true;goTab("aulas",function(){var de=document.querySelector('[data-les="'+sl2+'"]');if(de)de.scrollIntoView({block:"start"})});return}
 if(b.dataset.fcgo){var fg=b.dataset.fcgo;pracView="fc";fcStart(fg==="due"?fcToday():fcCards().filter(function(c){return c.g===fg}));var fgo=function(){var hf=document.getElementById("h-fc");if(hf)hf.scrollIntoView({block:"start"})};if(mainTab!=="praticar")goTab("praticar",fgo);else{render();fgo()}return}
 if(b.dataset.fcflip){if(fcSess){fcSess.flip=true;render();var ya=document.querySelector(".fc-ans.yes");if(ya)ya.focus({preventScroll:true})}return}
 if(b.dataset.fcans){fcAnswer(b.dataset.fcans==="1");render();var fl=document.querySelector("[data-fcflip]");if(fl)fl.focus({preventScroll:true});return}
 if(b.dataset.fcstop){fcSess=null;render();return}
 if(b.dataset.fcsee){fcGroupOpen=fcGroupOpen===b.dataset.fcsee?"":b.dataset.fcsee;render();return}
 if(b.dataset.fcdel){var dc=fcMine.filter(function(c){return c.id===b.dataset.fcdel})[0];fcMine=fcMine.filter(function(c){return c.id!==b.dataset.fcdel});delete fcBox["m:"+b.dataset.fcdel];if(fcForm&&fcForm.id===b.dataset.fcdel)fcForm=null;fcAddMsg=dc?"Apagado: "+dc.en:"";fcSaveAll();render();return}
 if(b.dataset.fcform){fcAIMsg="";fcAddMsg="";fcForm=b.dataset.fcform==="new"?{en:"",pt:"",pr:"",ex:""}:null;render();if(fcForm){var fe3=document.getElementById("fc-en");if(fe3)fe3.focus()}return}
 if(b.dataset.fcedit){var ec=fcMine.filter(function(c){return c.id===b.dataset.fcedit})[0];if(ec){fcForm={id:ec.id,en:ec.en||"",pt:ec.pt||"",pr:ec.pr||"",ex:ec.ex||""};fcAddMsg="";fcAIMsg="";render();var fx=document.getElementById("fcAdd");if(fx)fx.scrollIntoView({block:"center"})}return}
 if(b.dataset.fcall){fcShowAll=!fcShowAll;render();return}
 if(b.id==="fcAI"){if(!fcForm||fcAIBusy||!aiNs)return;var w=(fcForm.en||"").trim();if(!w){fcAIMsg="Escreva primeiro a frente, em inglês.";render();return}
  fcAIBusy=true;fcAIMsg="";render();
  aiNs.json("Você ajuda um aluno brasileiro de inglês, nível "+((D.student&&D.student.level)||"A1")+", a criar um flashcard. Palavra ou frase em inglês: «"+w.slice(0,120)+"».\nResponda só com JSON: {\"pt\": tradução natural e curta em português, \"pr\": pronúncia aproximada escrita para brasileiro, com hífens entre sílabas e acento na sílaba forte (ex.: \"grén-mâ-dâr\"), \"ex\": uma frase de exemplo curta e simples em inglês usando a palavra}. Se o texto não for inglês, traduza para o inglês e use isso como base.",{modelTier:"quick"}).then(function(r){fcAIBusy=false;if(fcForm&&r){if(!fcForm.pt&&r.pt)fcForm.pt=String(r.pt);if(!fcForm.pr&&r.pr)fcForm.pr=String(r.pr);if(!fcForm.ex&&r.ex)fcForm.ex=String(r.ex);fcAIMsg="Pronto! Confira e ajuste se quiser antes de salvar."}render()},function(e){fcAIBusy=false;var c=e&&e.code;if(c==="not_granted"){aiOff=true;fcAIMsg=""}else fcAIMsg=c==="rate_limited"?"Muitos pedidos seguidos. Tente de novo em um minuto.":"Não deu para sugerir agora. Preencha você mesmo.";render()});return}
 if(b.dataset.fcplus){pracView="fc";fcSess=null;fcForm={en:b.dataset.fcplus,pt:"",pr:"",ex:""};fcAddMsg="Escreva o que significa e toque em Salvar.";goTab("praticar",function(){var p=document.getElementById("fc-pt");if(p){p.scrollIntoView({block:"center"});p.focus({preventScroll:true})}});return}
 if(b.dataset.hwgo){var hg=b.dataset.hwgo;hwOpen[hg]=true;render();var hr=document.getElementById("hw-"+hg);if(hr&&hr.closest(".hw"))hr.closest(".hw").scrollIntoView({block:"start",behavior:"smooth"});return}
 if(b.dataset.del){D[b.dataset.del]=(D[b.dataset.del]||[]).filter(function(x){return x.id!==b.dataset.id});mark();render();return}
 if(b.id==="dcDo"){streak[stats().today]="challenge";otherOpen=false;saveStreak();render();return}
 if(b.id==="dcOther"){otherOpen=!otherOpen;render();return}
 if(b.dataset.other){streak[stats().today]=b.dataset.other;otherOpen=false;saveStreak();render();return}
 if(b.id==="dcUndo"){delete streak[stats().today];saveStreak();render();return}
 if(b.id==="payTell"){var n0=new Date(),mes=MONF[n0.getMonth()]+"/"+n0.getFullYear(),nm0=(D.student&&D.student.name)||"";
  var ptxt="Oi, teacher! Aqui é "+(nm0||"seu aluno")+". Já paguei a mensalidade de "+mes+". Segue o comprovante 👇";
  var pm=document.getElementById("payMsg"),pshow=function(t){if(pm){pm.hidden=false;pm.textContent=t}};
  var pfb=function(){pshow("Copie a mensagem abaixo e mande no WhatsApp da teacher com o comprovante:\n"+ptxt)};
  try{navigator.clipboard.writeText(ptxt).then(function(){pshow("Mensagem copiada! Cole no WhatsApp da teacher e anexe o comprovante.")},pfb)}catch(err){pfb()}
  return}
 if(b.id==="dcCopy"){var s0=stats(),nm=(D.student&&D.student.name)||"";
  var txt="📚 Desafio de inglês"+(nm?" – "+nm:"")+"\nSequência atual: "+s0.cur+(s0.cur===1?" dia":" dias")+"\nTotal de dias estudados: "+s0.total+"\nMelhor sequência: "+s0.best+(s0.done?"\n✅ Hoje: estudei!":"");
  var msg=document.getElementById("dcMsg"),show=function(t){if(msg){msg.hidden=false;msg.textContent=t}};
  var fb=function(){show("Copie o texto abaixo e mande no WhatsApp da teacher:\n"+txt)};
  try{navigator.clipboard.writeText(txt).then(function(){show("Copiado! Cole no WhatsApp da teacher.")},fb)}catch(err){fb()}
  return}
 if(b.dataset.ptab){progTab=b.dataset.ptab;render();return}
 if(b.dataset.cdgo!==undefined){cdStep=Math.max(0,+b.dataset.cdgo);render();return}
 if(b.dataset.cd){cdSt[b.dataset.cd]=+b.dataset.v;cdSave();render();return}
 if(b.dataset.reppub){(D.reports||[]).forEach(function(r){if(r.id===b.dataset.reppub)r.published=!r.published});mark();render();return}
 if(b.dataset.rvq){var pr=b.dataset.rvq.split("|"),L0=(D.lessons||[]).filter(function(x){return x.id===pr[0]})[0];revAns[b.dataset.rvq]=+b.dataset.o;render();return}
 if(b.dataset.xchk){var xh=(D.homework||[]).filter(function(x){return x.id===b.dataset.xchk})[0],xe=document.getElementById("xw-"+b.dataset.xchk);xTxt[b.dataset.xchk]=xe?xe.value:"";xRes[b.dataset.xchk]=xTxt[b.dataset.xchk].trim()?freeCheck(xTxt[b.dataset.xchk],{min:(xh&&xh.extra&&xh.extra.min)||3,neg:(xh&&xh.extra&&xh.extra.neg)||0}):[{ok:0,t:"Escreva suas frases primeiro."}];render();return}
 if(b.dataset.xai){var xe2=document.getElementById("xw-"+b.dataset.xai),tx=xe2?xe2.value:"";xTxt[b.dataset.xai]=tx;var base2=(D.prompts||[]).filter(function(x){return x.id==="ai3"})[0];var full=(base2?base2.p:"Corrija meu texto em inglês (nível A1) e explique os erros em português:\n\n")+tx;try{navigator.clipboard.writeText(full).then(function(){alertMsg("Copiado! Cole no Claude ou no ChatGPT.")},function(){prompt("Copie o texto:",full)})}catch(err){}return}
 if(b.dataset.xsend){var hid=b.dataset.xsend,xh2=(D.homework||[]).filter(function(x){return x.id===hid})[0],xe3=document.getElementById("xw-"+hid),tx2=(xe3?xe3.value:"").trim();if(!tx2){alertMsg("Escreva suas frases antes de enviar.");return}xTxt[hid]=tx2;
  var a=document.createElement("a");a.href=D.doneForm+"?aluno="+encodeURIComponent((D.student&&D.student.name)||"")+"&licao="+encodeURIComponent("Extra de escrita · "+(xh2?xh2.title:""))+"&codigo="+encodeURIComponent(hid+"-extra")+"&texto="+encodeURIComponent(tx2.slice(0,1500));a.target="_blank";a.rel="noopener";a.setAttribute("data-hwdone",hid+"-extra");a.hidden=true;document.getElementById("app").appendChild(a);a.click();a.remove();return}
 if(b.dataset.exopen){hwOpen[b.dataset.exopen]=!hwOpen[b.dataset.exopen];render();var eo=document.getElementById("ex-"+b.dataset.exopen);if(eo)eo.scrollIntoView({block:"nearest"});return}
 if(b.dataset.exmc){var H1=exFind(b.dataset.exmc),S1=hwSt(H1),Q1=H1.ex[S1.i];S1.r[S1.i]={v:+b.dataset.o,ok:+b.dataset.o===Q1.a};if(!S1.r[S1.i].ok)fcAddErr(H1,S1.i);hwSave();render();return}
 if(b.dataset.expick){var pk=hwPick[b.dataset.expick]||[];pk.push(+b.dataset.j);hwPick[b.dataset.expick]=pk;render();return}
 if(b.dataset.exun){hwPick[b.dataset.exun]=(hwPick[b.dataset.exun]||[]).filter(function(j){return j!==+b.dataset.j});render();return}
 if(b.dataset.excheck){var H2=exFind(b.dataset.excheck),S2=hwSt(H2),Q2=H2.ex[S2.i],v;
  if(Q2.t==="order"){v=(hwPick[H2.id]||[]).map(function(j){return Q2.w[j]}).join(" ");hwPick[H2.id]=[]}else{var ei=document.getElementById("exw-"+H2.id);v=ei?ei.value.trim():"";if(!v)return}
  S2.r[S2.i]={v:v,ok:(Q2.ans||[]).some(function(a){return normA(a)===normA(v)})};if(!S2.r[S2.i].ok)fcAddErr(H2,S2.i);hwSave();render();return}
 if(b.dataset.exnext){var H3=exFind(b.dataset.exnext),S3=hwSt(H3);S3.i++;if(S3.i>=H3.ex.length)markStudy("Lição de casa");hwSave();render();var ex=document.getElementById("ex-"+b.dataset.exnext);if(ex)ex.scrollIntoView({block:"nearest"});return}
 if(b.dataset.exredo){hwState[b.dataset.exredo]={i:0,r:[]};hwSave();render();return}
 if(b.dataset.say){try{var u=new SpeechSynthesisUtterance(b.dataset.say);u.lang="en-US";u.rate=0.85;var vs=speechSynthesis.getVoices().filter(function(v){return/^en(-|_)US/i.test(v.lang)});if(vs.length)u.voice=vs[0];speechSynthesis.cancel();speechSynthesis.speak(u)}catch(err){}return}
 if(b.dataset.qz){qAns[b.dataset.qz]=+b.dataset.o;render();return}
 if(b.id==="qReset"){qAns={};render();return}
 if(b.dataset.wchk){var wi=document.getElementById("w-"+b.dataset.wchk);if(wi)wVal[b.dataset.wchk]=wi.value;var ww=(D.writing||[]).filter(function(x){return x.id===b.dataset.wchk})[0];if(ww)wRes[ww.id]=wCheck(ww)?1:0;render();var wf=document.getElementById("w-"+b.dataset.wchk);if(wf)wf.focus();return}
 if(b.dataset.wshow){wShow[b.dataset.wshow]=1;render();return}
 if(b.id==="freeChk"){var ft=document.getElementById("w-free");freeTxt=ft?ft.value:freeTxt;freeRes=freeTxt.trim()?freeCheck(freeTxt):[{ok:0,t:"Escreva suas frases primeiro."}];copied="";render();return}
 if(b.id==="freeAI"||b.dataset.copy){var txt2,key;
  if(b.id==="freeAI"){var ft2=document.getElementById("w-free");freeTxt=ft2?ft2.value:freeTxt;var base=(D.prompts||[]).filter(function(x){return x.id==="ai3"})[0];txt2=(base?base.p:"Corrija meu texto em inglês (nível A1) e explique os erros em português:\n\n")+freeTxt;key="free"}
  else{var pr=(D.prompts||[]).filter(function(x){return x.id===b.dataset.copy})[0];if(!pr)return;txt2=pr.p;key=pr.id}
  var okc=function(){copied=key;render()};
  try{navigator.clipboard.writeText(txt2).then(okc,function(){prompt("Copie o texto:",txt2)})}catch(err){}
  return}
 if(b.dataset.vtab){vidTab=b.dataset.vtab;render();var hv=document.querySelector('[data-vtab="'+vidTab+'"]');if(hv)hv.focus();return}
 if(b.dataset.rq){var sc0=document.getElementById("rvScroll"),sl=sc0?sc0.scrollLeft:0;resOpen[b.dataset.rq]=!resOpen[b.dataset.rq];render();var sc1=document.getElementById("rvScroll");if(sc1)sc1.scrollLeft=sl;return}
 if(b.dataset.rvnav){var sc=document.getElementById("rvScroll");if(sc){var c=sc.querySelector(".rv");sc.scrollBy({left:(+b.dataset.rvnav)*((c?c.offsetWidth:260)+10),behavior:"smooth"})}return}
 if(b.id==="recMore"){recAll=!recAll;render();if(!recAll){var h=document.getElementById("h-rec");if(h)h.scrollIntoView({block:"start"})}return}
 if(b.id==="clearTasks"){D.tasks=[];mark();render();return}
 if(b.id==="toggleEdit"){editing=!editing;render();return}
 if(b.id==="publish"&&artifactNs){
  b.disabled=true;var st=document.getElementById("status");if(st)st.textContent="Publicando...";
  try{SS.setItem(ctx.draftKey,JSON.stringify(D))}catch(err){}
  artifactNs.publish().then(function(){try{SS.removeItem(ctx.draftKey)}catch(err){}if(st)st.textContent="Publicado."},function(err){
   var c=err&&err.code;
   if(c==="conflict"){if(st)st.textContent="A página foi atualizada em outro lugar. Recarregando...";return}
   try{SS.removeItem(ctx.draftKey)}catch(e2){}
   if(c==="not_writer"||c==="not_granted"||c==="consent_required"||c==="capability_disabled"){if(st)st.textContent="Esta visualização é somente leitura.";return}
   if(st)st.textContent=c==="rate_limited"?"Muitas publicações seguidas. Espere um minuto e tente de novo.":"Não foi possível publicar agora. Tente de novo em instantes.";b.disabled=false;
  });
 }
});
__on("keydown",function(e){if(!fcSess||mainTab!=="praticar"||fcSess.i>=fcSess.q.length)return;var t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName))return;
 if(!fcSess.flip&&(e.key===" "||e.key==="Enter")){e.preventDefault();fcSess.flip=true;render()}else if(fcSess.flip&&(e.key==="1"||e.key==="2")){fcAnswer(e.key==="2");render()}});
ctx.every(function(){var ae=document.activeElement;if(tourI<0&&!aiBusy&&!editing&&!(ae&&ae.closest&&ae.closest(".study,.ex,.xbox,.fc,.steps,.aic")))render()},60000);
// ---------- conversa com IA ----------
var aiVoice=lsGet("cl-aivoice",false),aiNs=null,aiChecked=false,aiMode="conversa",aiScen="cafe",aiMsgs=[],aiBusy=false,aiErr="",aiDraft="",aiAbort=null,aiOff=false,aiSent=0;
var AI_MODES=[{id:"conversa",l:"Conversa livre"},{id:"roleplay",l:"Role-play"},{id:"gramatica",l:"Treino da lição"},{id:"texto",l:"Corrigir meu texto"}];
var AI_SCEN=[{id:"cafe",l:"☕ Café",d:"você é o atendente de um café; o aluno é o cliente que pede comida e bebida e paga a conta"},
 {id:"hotel",l:"🏨 Hotel",d:"você é o recepcionista de um hotel; o aluno faz o check-in e tira dúvidas sobre o quarto"},
 {id:"aeroporto",l:"✈️ Aeroporto",d:"você é o atendente do check-in no aeroporto; o aluno despacha a mala e pergunta sobre o voo"},
 {id:"loja",l:"👕 Loja",d:"você é o vendedor de uma loja de roupas; o aluno procura uma peça, pergunta tamanho, cor e preço"},
 {id:"trabalho",l:"💼 Trabalho",d:"você é um colega de trabalho estrangeiro; vocês se apresentam e falam sobre a rotina e as tarefas do trabalho"},
 {id:"medico",l:"🩺 Consulta",d:"você é a recepcionista de um consultório; o aluno marca uma consulta e diz como está se sentindo"}];
function aiSys(){
 var s=D.student||{},cu=nowUnit(),voc=[],seen={};
 (D.lessons||[]).slice().sort(function(a,b){return a.date<b.date?1:-1}).slice(0,3).forEach(function(l){(l.vocab||[]).forEach(function(v){if(!seen[v.en]&&voc.length<25){seen[v.en]=1;voc.push(v.en)}})});
 var t="Você é o parceiro de conversa em inglês da escola Voice Your English, da Teacher Sarah. Você está falando com "+(s.name||"um aluno")+", aluno adulto brasileiro, nível "+(s.level||"A1")+" (iniciante).\n"+
 "Tema atual do curso: "+(D.studyTheme||"")+(cu?" (lição atual: "+cu.u.title+" — "+(cu.u.note||"")+")":"")+".\n"+
 (voc.length?"Palavras das últimas aulas, que ele conhece: "+voc.join(", ")+".\n":"")+
 "Regras:\n- Escreva em inglês simples de nível A1: frases curtas e vocabulário básico.\n- Faça UMA pergunta por vez e espere a resposta. No máximo 3 frases por mensagem.\n"+
 "- Se o aluno errar algo, comece a resposta com uma linha que começa exatamente com \"Correção:\" mostrando a frase certa em inglês e uma explicação curtíssima em português. Depois continue em inglês.\n"+
 "- Se ele escrever em português ou disser que não entendeu, ajude com uma tradução curta em português e uma frase-modelo em inglês para ele copiar.\n"+
 "- Seja gentil e animador. Sem markdown, sem listas, no máximo um emoji.\n- Fique sempre no papel de treino de inglês. Se pedirem outra coisa, volte ao treino com gentileza.\n";
 if(aiMode==="conversa")t+="Atividade: conversa livre sobre o tema da lição atual e a vida do aluno (rotina, família, trabalho, hábitos). Cumprimente-o pelo nome e faça a primeira pergunta.";
 else if(aiMode==="roleplay"){var sc=AI_SCEN.filter(function(x){return x.id===aiScen})[0]||AI_SCEN[0];t+="Atividade: role-play. Cena: "+sc.d+". Antes da cena, diga em uma linha em português qual é a situação e o papel dele. Depois comece a cena com uma fala curta em inglês. Depois de umas 8 trocas, encerre a cena e dê 2 dicas em português."}
 else if(aiMode==="gramatica")t+="Atividade: treino da gramática da lição atual"+(cu?" ("+(cu.u.note||cu.u.title)+")":"")+". Explique a regra em 2 linhas em português, depois dê UMA frase por vez para ele transformar ou completar. Corrija cada resposta e passe para a próxima. Depois de 8 frases, dê a pontuação e um elogio.";
 else t+="Atividade: correção de texto. Peça em português, numa frase, que ele escreva ou cole um texto curto em inglês. Quando ele mandar, mostre o texto corrigido e depois cada erro com uma explicação curta em português (aqui pode usar uma linha por erro). Termine propondo uma frase nova para ele praticar.";
 return t}
function aiHist(){var out=[{role:"user",content:aiSys()+"\n\nComece agora."}];var M=aiMsgs.filter(function(m){return!m.pending});
 if(M.length>24){var tail=M.slice(-22);if(tail[0].role==="assistant")tail=tail.slice(1);M=M.slice(0,1).concat(tail)}if(M.length&&M[0].role==="user")M=M.slice(1);
 M.forEach(function(m){out.push({role:m.role,content:m.content})});return out}
function aiCall(){
 if(!aiNs||aiBusy)return;aiBusy=true;aiErr="";var msg={role:"assistant",content:"",pending:true};aiMsgs.push(msg);
 var hist=aiHist();if(hist[hist.length-1].role!=="user"){aiMsgs.pop();aiBusy=false;return}
 aiAbort=new AbortController();render();aiScroll();
 aiNs(hist,{cache:false,signal:aiAbort.signal,modelTier:"default",onText:function(e){msg.content=e.text;var el=document.getElementById("ai-last");if(el){el.classList.remove("typing");el.innerHTML=bubBody(e.text,false)}aiScroll()}}).then(function(r){
  msg.content=(r&&r.text)||msg.content;delete msg.pending;aiBusy=false;aiAbort=null;
  if(aiVoice)aiSpeak(msg.content);if(aiSent>=3)markStudy("Conversa com IA");render();aiScroll();var ti=document.getElementById("ai-in");if(ti)ti.focus({preventScroll:true})
 },function(e){var c=e&&e.code;aiBusy=false;aiAbort=null;
  if(e&&e.text){msg.content=e.text;delete msg.pending}else aiMsgs.splice(aiMsgs.indexOf(msg),1);
  if(c==="not_granted"){aiOff=true;aiErr=""}else if(c==="rate_limited")aiErr="Muitas mensagens seguidas. Espere um minutinho e tente de novo.";else if(c==="cancelled")aiErr="";else aiErr="Não consegui responder agora. Tente de novo em instantes.";
  render()})}
function aiScroll(){var lg=document.getElementById("ai-log");if(lg)lg.scrollTop=lg.scrollHeight}
function bubBody(t,me){var h=esc(t).replace(/\n/g,"<br>");if(!me)h=h.replace(/^(Corre(ç|c)(ã|a)o:[^<]*)(<br>)?/,'<span class="fix">$1</span>');return h}
function chatHTML(){
 var head='<div><h2 id="h-ai">Converse com a IA</h2><p class="note-sm" style="margin-top:4px">Pratique inglês escrevendo, no seu ritmo. A IA conhece o tema da sua aula e corrige seus erros em português.</p></div>';
 if(aiChecked&&(!aiNs||aiOff)){var md='<div class="modes" role="tablist">'+AI_MODES.map(function(m){return'<button type="button" class="tab" role="tab" data-aimode="'+m.id+'" aria-selected="'+(aiMode===m.id)+'">'+m.l+'</button>'}).join("")+'</div>'+(aiMode==="roleplay"?'<div class="scen">'+AI_SCEN.map(function(x){return'<button type="button" class="tab" data-aiscen="'+x.id+'" aria-pressed="'+(aiScen===x.id)+'"'+(aiScen===x.id?' aria-selected="true"':'')+'>'+x.l+'</button>'}).join("")+'</div>':'');
  return'<section class="aic" aria-labelledby="h-ai">'+head+md+'<div class="ai-start"><p><b>A conversa abre no Claude, já pronta para você.</b> Ele sabe o seu nível, o tema da aula e corrige em português. Dá para escrever ou falar: toque no ícone de voz do Claude.</p><a class="btn primary" style="align-self:flex-start;text-decoration:none" href="'+esc(aiLiveUrl())+'" target="_blank" rel="noopener">Começar no Claude ↗</a><p class="note-sm">Precisa de uma conta do Claude (a gratuita serve).</p></div><details class="more"><summary>Ou copie um comando pronto para o ChatGPT ou o Gemini</summary>'+aiHTML()+'</details></section>'}
 var modes='<div class="modes" role="tablist">'+AI_MODES.map(function(m){return'<button type="button" class="tab" role="tab" data-aimode="'+m.id+'" aria-selected="'+(aiMode===m.id)+'">'+m.l+'</button>'}).join("")+'</div>'+
  (aiMode==="roleplay"?'<div class="scen">'+AI_SCEN.map(function(x){return'<button type="button" class="tab" data-aiscen="'+x.id+'" aria-pressed="'+(aiScen===x.id)+'"'+(aiScen===x.id?' aria-selected="true"':'')+'>'+x.l+'</button>'}).join("")+'</div>':'');
 if(!aiMsgs.length){var desc={conversa:"Um bate-papo sobre o tema da aula e a sua rotina.",roleplay:"Uma cena da vida real. Você faz o papel do cliente.",gramatica:"Frases para treinar a gramática da lição atual, uma por vez.",texto:"Escreva um texto curto e receba a correção explicada."}[aiMode];
  return'<section class="aic" aria-labelledby="h-ai">'+head+modes+'<div class="ai-start"><p>'+esc(desc)+'</p><button type="button" class="btn primary" id="aiGo" style="align-self:flex-start"'+(aiChecked?'':' disabled')+'>'+(aiChecked?'Começar':'Carregando…')+'</button><p class="note-sm">Usa a sua conta do Claude. Na primeira vez, ele pede sua permissão.</p></div>'+(aiErr?'<p class="ai-err" role="status">'+esc(aiErr)+'</p>':'')+aiVoiceHTML()+'</section>'}
 var log=aiMsgs.map(function(m,i){var last=i===aiMsgs.length-1&&m.role==="assistant";var me=m.role==="user";
  if(m.pending&&!m.content)return'<div class="bub ai typing" id="ai-last">Escrevendo…</div>';
  return'<div class="bub '+(me?'me':'ai')+'"'+(last?' id="ai-last"':'')+'>'+bubBody(m.content,me)+(!me&&!m.pending&&canSay?sayBtn(m.content.replace(/^Corre(ç|c)(ã|a)o:.*\n?/,"").slice(0,400)):'')+'</div>'}).join("");
 return'<section class="aic" aria-labelledby="h-ai">'+head+modes+'<div class="ai-log" id="ai-log" aria-live="polite">'+log+'</div>'+(aiErr?'<p class="ai-err" role="status">'+esc(aiErr)+'</p>':'')+
 '<form class="ai-row" id="aiForm"><textarea id="ai-in" rows="1" placeholder="Write in English…" aria-label="Sua mensagem" spellcheck="false" autocapitalize="sentences">'+esc(aiDraft)+'</textarea><button class="btn primary" type="submit"'+(aiBusy?' disabled':'')+'>Enviar</button></form>'+
 '<div class="ai-foot"><span class="note-sm">No celular, toque no 🎤 do teclado para falar em vez de digitar.</span>'+(aiBusy?'<button type="button" class="btn small" id="aiStop">Parar</button>':'<button type="button" class="btn small" id="aiNew">Nova conversa</button>')+'</div>'+aiVoiceHTML()+'</section>'}
function aiSpeak(t){if(!canSay||!t)return;var x=String(t).split("\n").filter(function(l){return!/^\s*(Corre(ç|c)(ã|a)o|Situa(ç|c)(ã|a)o|Dica)\s*:/i.test(l)}).join(" ").replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu,"").trim();if(!x)return;
 try{var u=new SpeechSynthesisUtterance(x.slice(0,600));u.lang="en-US";u.rate=0.85;var vs=speechSynthesis.getVoices().filter(function(v){return/^en(-|_)US/i.test(v.lang)});if(vs.length)u.voice=vs[0];speechSynthesis.cancel();speechSynthesis.speak(u)}catch(err){}}
function aiLiveUrl(){return"https://claude.ai/new?q="+encodeURIComponent(aiSys()+"\n\nVamos conversar POR VOZ. Respostas bem curtas (1 ou 2 frases), em inglês simples e devagar. Corrija em português, em uma frase, só os erros importantes.\n\nComece agora.")}
function aiVoiceHTML(){
 return'<div class="ai-voice">'+(canSay?'<button type="button" class="btn small" id="aiVoice" aria-pressed="'+aiVoice+'">'+(aiVoice?'🔊 Ler respostas em voz alta: ligado':'🔇 Ler respostas em voz alta: desligado')+'</button>':'')+'</div>'+
 '<div class="ai-live"><p><b>🎙️ Quer conversar ao vivo, falando?</b> Use a conversa por voz do app do Claude, já com este treino pronto:</p><ol><li>Toque no botão abaixo. O Claude abre com o treino escrito.</li><li>Envie a mensagem e depois toque no ícone de voz, ao lado de onde se escreve.</li><li>Fale em inglês. Ele responde falando.</li></ol><a class="btn small primary" style="align-self:flex-start;text-decoration:none" href="'+esc(aiLiveUrl())+'" target="_blank" rel="noopener">Conversar por voz no Claude ↗</a></div>'}
function aiSend(){var ti=document.getElementById("ai-in"),v=(ti?ti.value:aiDraft).trim();if(!v||aiBusy)return;aiMsgs.push({role:"user",content:v});aiSent++;aiDraft="";aiCall()}
__on("click",function(e){var b=e.target.closest&&e.target.closest("#aiGo,#aiNew,#aiStop,#aiVoice,[data-aimode],[data-aiscen]");if(!b)return;
 if(b.id==="aiVoice"){aiVoice=!aiVoice;try{LS.setItem("cl-aivoice",JSON.stringify(aiVoice))}catch(err){}if(!aiVoice){try{speechSynthesis.cancel()}catch(err){}}else{var la=aiMsgs.filter(function(m){return m.role==="assistant"&&!m.pending}).slice(-1)[0];if(la)aiSpeak(la.content)}render();return}
 if(b.id==="aiGo"){aiMsgs=[];aiSent=0;aiCall();return}
 if(b.id==="aiStop"){if(aiAbort)aiAbort.abort();return}
 if(b.id==="aiNew"){if(aiAbort)aiAbort.abort();aiMsgs=[];aiErr="";aiSent=0;render();return}
 if(b.dataset.aimode){if(aiBusy)return;aiMode=b.dataset.aimode;aiMsgs=[];aiErr="";aiSent=0;render();return}
 if(b.dataset.aiscen){if(aiBusy)return;aiScen=b.dataset.aiscen;aiMsgs=[];aiErr="";aiSent=0;render();return}});
__on("submit",function(e){if(e.target.id==="aiForm"){e.preventDefault();aiSend()}});
__on("keydown",function(e){if(e.target.id==="ai-in"&&e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();aiSend()}});
__on("input",function(e){if(e.target.id==="ai-in"){aiDraft=e.target.value;e.target.style.height="auto";e.target.style.height=Math.min(140,e.target.scrollHeight)+"px"}});
if(window.claude&&window.claude.use){window.claude.use("sample").then(function(sm){aiNs=sm;aiChecked=true;if(mainTab==="praticar")render()},function(){aiChecked=true;if(mainTab==="praticar")render()})}else{aiChecked=true}

// ---------- tour de boas-vindas ----------
var tourI=-1;
function tourSteps(){var nm=(D.student&&D.student.name)||"",hasTr=!!(D.links||{}).trilha;return[
 {tab:"hoje",sel:".nextbar",k:"Bem-vindo",h:"Oi"+(nm?", "+nm:"")+"! Este é o seu painel de inglês.",p:"Tudo o que acontece entre uma aula e outra fica aqui. No topo você vê a próxima aula. Na hora, é só tocar em Entrar.",w:"ter o curso inteiro num lugar só, sem procurar link no WhatsApp."},
 {tab:"hoje",sel:".steps",k:"Hoje · o essencial",h:"O que fazer depois de cada aula",p:"Aqui ficam só os passos obrigatórios da última aula: revisar os flashcards, fazer a lição de casa"+(hasTr?" e estudar a lição na Trilha":"")+". Quando terminar, aparece o convite para praticar mais.",w:"fixar o conteúdo enquanto ele está fresco. Uns 10 minutos por dia valem mais que 1 hora na véspera."},
 {tab:"aulas",atab:"trilha",sel:".trl-hero",k:"Curso · Trilha",h:"A Trilha: o caminho do livro, lição por lição",p:"Mostra a lição em que você está, quantas já fez e todas as lições do curso. O botão Estudar abre a lição com slides, videoaula, listening e exercícios que se corrigem na hora. Ela também aparece na aba Hoje.",w:"revisar uma lição antiga, recuperar a aula que perdeu ou adiantar a próxima, no seu ritmo."},
 {tab:"aulas",atab:"aulas",sel:".seg",k:"Curso · aulas e gravações",h:"O registro de cada aula",p:"Toque numa aula para ver o resumo, o vocabulário com áudio e as frases que você montou. Também ficam aqui as lições de casa, as gravações e, no fim, os arquivos do curso.",w:"rever qualquer aula, ouvir de novo a pronúncia e não perder nada."},
 {tab:"praticar",pv:"",sel:".doors",k:"Mais prática · opcional",h:"Três portas para quando sobrar tempo",p:"Flashcards: as palavras das aulas viram cartões que voltam no dia certo, e você pode criar os seus. Converse com a IA: conversa, role-play e treino da lição, com correção em português e até por voz. Practice Hub: mais de 50 atividades com séries, música, podcasts, leitura e viagem.",w:"ir além da lição. Nada aqui é obrigatório: escolha o que combina com você."},
 {tab:"plano",sel:"#h-pay",k:"Meu plano",h:"Suas aulas e a mensalidade",p:"Aqui ficam as faltas, as reposições e os pagamentos de cada mês. Pagou? Toque em Já paguei e envie o comprovante.",w:"acompanhar tudo do contrato sem precisar perguntar."},
 {tab:"hoje",sel:"",k:"Última dica",h:"Deixe o painel na tela do celular",list:["iPhone (Safari): toque em Compartilhar e depois em Adicionar à Tela de Início.","Android (Chrome): toque nos 3 pontinhos e depois em Adicionar à tela inicial."],p:"Assim ele abre como um app. Para rever este tour, toque em Como usar o painel, no fim da página."}]}
function tourHL(){document.querySelectorAll(".tour-hl").forEach(function(e){e.classList.remove("tour-hl")});
 if(tourI<0)return;var st=tourSteps()[tourI],el=st.sel&&document.querySelector(st.sel);
 if(el){el.classList.add("tour-hl");el.scrollIntoView({block:"center",behavior:"smooth"})}else window.scrollTo({top:0,behavior:"smooth"})}
function tourRender(){var box=document.getElementById("tour");
 if(tourI<0){if(box)box.remove();document.querySelectorAll(".tour-hl").forEach(function(e){e.classList.remove("tour-hl")});var tb0=document.querySelector(".tabbody");if(tb0)tb0.classList.remove("tour-pad");return}
 var S=tourSteps(),st=S[tourI],last=tourI===S.length-1;
 if(!box){box=document.createElement("div");box.id="tour";box.className="tour";box.setAttribute("role","dialog");box.setAttribute("aria-label","Como usar o painel");document.body.appendChild(box)}
 box.innerHTML='<p class="eyebrow">'+esc(st.k)+' · '+(tourI+1)+' de '+S.length+'</p><h2>'+esc(st.h)+'</h2>'+(st.list?'<ol>'+st.list.map(function(x){return'<li>'+esc(x)+'</li>'}).join("")+'</ol>':'')+'<p>'+esc(st.p)+'</p>'+(st.w?'<p class="tour-w"><b>Para que serve:</b> '+esc(st.w)+'</p>':'')+
  '<div class="tour-f"><span class="tour-d" aria-hidden="true">'+S.map(function(x,i){return'<i class="'+(i===tourI?'on':'')+'"></i>'}).join("")+'</span>'+
  (tourI>0?'<button type="button" class="btn small" data-tour="-1">Voltar</button>':'<button type="button" class="btn small" data-tour="skip">Pular</button>')+
  '<button type="button" class="btn small primary" data-tour="1">'+(last?'Começar a usar':'Próximo')+'</button></div>';
 var tb=document.querySelector(".tabbody");if(tb)tb.classList.add("tour-pad");
 setTimeout(tourHL,60);var pb=box.querySelector(".btn.primary");if(pb)pb.focus({preventScroll:true})}
function tourGo(i){var S=tourSteps();if(i<0||i>=S.length){tourI=-1;try{LS.setItem("cl-tour","1")}catch(e){}if(mainTab!=="hoje")goTab("hoje");tourRender();return}
 tourI=i;var t=S[i].tab,ch=false;if(S[i].pv!==undefined&&pracView!==S[i].pv){pracView=S[i].pv;ch=true}if(S[i].atab&&aulasTab!==S[i].atab){aulasTab=S[i].atab;ch=true}if(mainTab!==t){mainTab=t;ch=true}if(ch)render();tourRender()}
__on("click",function(e){var b=e.target.closest&&e.target.closest("[data-tour]");if(!b)return;var v=b.dataset.tour;if(v==="skip")tourGo(-1);else tourGo(tourI+(+v))});
__on("keydown",function(e){if(tourI>=0&&e.key==="Escape")tourGo(-1)});
(function(){var seen=false;try{seen=!!LS.getItem("cl-tour")}catch(e){seen=true}if(!seen&&!editing&&!ctx.teacher)setTimeout(function(){if(!editing&&tourI<0)tourGo(0)},700)})();



ctx.api={render:function(){render()},
 markPay:function(ym){paySent[ym]=1;try{LS.setItem("cl-paysent",JSON.stringify(paySent))}catch(e){}render()},
 markDone:function(id){done[id]=1;try{LS.setItem("cl-done",JSON.stringify(done))}catch(e){}render()},
 data:function(){return D},
 isDirty:function(){return dirty}};
}};
