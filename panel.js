/* Generated from claudinei-dashboard.html by build/make_panel.py — do not edit by hand */
window.VYEPanel={mount:function(ctx){
var LS=ctx.store,SS={getItem:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},setItem:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},removeItem:function(k){try{sessionStorage.removeItem(k)}catch(e){}}};

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
 star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>'
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
 ].filter(function(x){return x.u});
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
  var S=(l.say||[]).map(function(t){return'<li>'+esc(t)+sayBtn(t)+'</li>'}).join("");
  var L=(l.notes?'<a class="la g" href="'+esc(safeUrl(l.notes))+'" target="_blank" rel="noopener">✦ Resumo do Gemini</a>':'')+(l.rec?'<a class="la" href="'+esc(safeUrl(l.rec))+'" target="_blank" rel="noopener">▶ Gravação</a>':'')+(l.chat?'<a class="la" href="'+esc(safeUrl(l.chat))+'" target="_blank" rel="noopener">💬 Chat da aula</a>':'')+(l.extra||[]).map(function(x){return'<a class="la" href="'+esc(safeUrl(x.u))+'" target="_blank" rel="noopener">'+esc(x.t)+' ↗</a>'}).join("");
  return'<details class="lesson lx" data-les="'+esc(l.id)+'"'+(op?' open':'')+'><summary>'+head+'<span class="chev" aria-hidden="true"></span></summary><div class="lb">'+
   (l.sum?'<p class="lsum">'+esc(l.sum)+'</p>':'')+
   (V?'<h3>Vocabulário <small>'+(canSay?'toque 🔊 para ouvir':'com pronúncia')+'</small></h3><ul class="voc">'+V+'</ul>':'')+
   (S?'<h3>Frases da aula</h3><ul class="say-l">'+S+'</ul>':'')+
   (L?'<div class="lls">'+L+'</div>':'')+xBtn("lessons",l.id)+'</div></details>'}).join(""):'<div class="empty">As aulas aparecem aqui conforme forem registradas.</div>';
 var add=editing?'<form class="add" data-add="lessons"><input type="date" name="date" id="a-ldate" required aria-label="Data"><input name="title" id="a-ltitle" placeholder="Tema da aula" required><input class="wide" name="note" id="a-lnote" placeholder="O que vimos (opcional)"><button class="btn primary" type="submit">Registrar aula</button></form>':'';
 return'<section aria-labelledby="h-les"><h2 id="h-les">Últimas aulas</h2><p class="note-sm" style="margin:-4px 0 10px">Toque numa aula para ver o vocabulário, a pronúncia e o resumo.</p><div class="panel">'+body+'</div>'+add+'</section>';
}

function pathHTML(){
 var U=D.units||[],nd=U.filter(function(u){return u.status==="done"}).length;
 var body=U.map(function(u,i){
  var t='<span class="ln">Lesson '+(i+1)+'</span> '+esc(u.title)+(u.url?' <a class="sl" href="'+esc(safeUrl(u.url))+'" target="_blank" rel="noopener">Slides ↗</a>':'');
  var ctl=editing?'<div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap"><select data-unit="'+esc(u.id)+'" aria-label="Status"><option value="todo"'+(u.status==="todo"?" selected":"")+'>Ainda não</option><option value="now"'+(u.status==="now"?" selected":"")+'>Estudando agora</option><option value="done"'+(u.status==="done"?" selected":"")+'>Concluída</option></select>'+xBtn("units",u.id)+'</div>':'';
  return'<li class="unit '+esc(u.status||"todo")+'"><span class="dot">'+(u.status==="done"?"✓":(i+1))+'</span><div><div class="t">'+t+(u.status==="now"?'<span class="tagnow">agora</span>':'')+'</div>'+(u.note?'<p>'+esc(u.note)+'</p>':'')+ctl+'</div></li>';
 }).join("");
 var add=editing?'<form class="add" data-add="units"><input name="title" id="a-utitle" placeholder="Nome da lição" required><input name="note" id="a-unote" placeholder="Assunto"><input class="wide" name="url" id="a-uurl" placeholder="Link dos slides (opcional)"><button class="btn primary" type="submit">Adicionar lição</button></form>':'';
 return'<section aria-labelledby="h-path"><h2 id="h-path">Trilha do curso<span class="count">'+nd+' de '+U.length+' lições</span></h2><div class="panel" style="padding-block:16px 0"><ol class="path">'+body+'</ol></div>'+add+'</section>';
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

var ABS={pendente:{l:"A repor",c:"var(--warm)"},agendada:{l:"Reposição agendada",c:"var(--accent)"},reposta:{l:"Reposta",c:"var(--ok)"},sem:{l:"Sem reposição",c:"var(--muted)"}};
var PAY={pago:{l:"Pago",c:"var(--ok)"},pendente:{l:"Pendente",c:"var(--warm)"},atrasado:{l:"Atrasado",c:"var(--c-vocab)"}};
var MONF=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
function br(iso){var p=String(iso||"").split("-");return p.length<3?"":p[2]+"/"+p[1]}
function monLabel(ym){var p=String(ym||"").split("-");return p.length<2?ym:(MONF[+p[1]-1]||"").replace(/^./,function(c){return c.toUpperCase()})+" "+p[0]}
function sel(attr,id,opts,cur){return'<select '+attr+'="'+esc(id)+'" aria-label="Status">'+Object.keys(opts).map(function(k){return'<option value="'+k+'"'+(k===cur?" selected":"")+'>'+opts[k].l+'</option>'}).join("")+'</select>'}
function absHTML(){
 var A=(D.absences||[]).slice().sort(function(a,b){return a.date<b.date?1:-1});
 var nP=A.filter(function(a){return a.status==="pendente"}).length,nA=A.filter(function(a){return a.status==="agendada"}).length,nR=A.filter(function(a){return a.status==="reposta"}).length;
 var rows=A.length?A.map(function(a){var s=ABS[a.status]||ABS.pendente;
  return'<div class="row"><div class="main"><b>Falta em '+esc(br(a.date))+'</b><small>'+esc(a.reason||"")+(a.makeup?' · reposição '+esc(br(a.makeup)):(a.status==="pendente"?' · a combinar':''))+'</small></div>'+
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
 var big='<div class="big" style="--st:'+c.c+'"><div><div class="m">'+esc(monLabel(ym))+'</div><small>'+(pd?'Vence dia '+pd:'')+(D.payValue?' · '+esc(D.payValue):'')+(c.note?' · '+c.note:'')+'</small></div><span class="st" style="--st:'+c.c+'">'+c.l+'</span></div>';
 var rows=months.filter(function(k){return k!==ym}).map(function(k){var s=st(k),p=byM[k];
  var right=editing?(p?sel("data-pay",p.id,PAY,p.status)+xBtn("payments",p.id):'<span class="st" style="--st:'+s.c+'">'+s.l+'</span>'):
   (!s.paid&&!s.future&&!s.none&&D.payForm?'<a class="st" style="--st:var(--accent);text-decoration:none" target="_blank" rel="noopener" data-paysent="'+k+'" href="'+esc(payLink(k))+'">Enviar comprovante</a> ':'')+'<span class="st" style="--st:'+s.c+'">'+s.l+'</span>';
  return'<div class="row"><div class="main"><b>'+esc(monLabel(k))+'</b><small>'+(pd?'Venc. '+String(pd).padStart(2,"0")+'/'+k.slice(5,7):'')+(s.note?' · '+s.note:'')+'</small></div>'+right+'</div>'}).join("");
 var add=editing?'<form class="add" data-add="payments" style="margin-top:0"><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Mês<input type="month" name="month" id="a-pmonth" required value="'+ym+'"></label><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Vencimento<input type="date" name="due" id="a-pdue"></label><select name="status" id="a-pstatus" aria-label="Status"><option value="pendente">Pendente</option><option value="pago">Pago</option><option value="atrasado">Atrasado</option></select><button class="btn primary" type="submit">Marcar mês</button><label class="note-sm wide" style="display:flex;flex-direction:column;gap:4px">Dia de vencimento padrão<input id="e-payday" value="'+esc(D.payDay||"")+'" placeholder="ex.: 10"></label></form>':'';
 var ask=(c.paid||!D.payForm)?'':'<div class="paid-ask"><a class="btn primary" style="text-decoration:none" target="_blank" rel="noopener" data-paysent="'+ym+'" href="'+esc(payLink(ym))+'">Já paguei · enviar comprovante</a><small>Anexe o print do Pix e envie — o mês já aparece como pago aqui e a teacher vê na hora.</small></div>';
 return'<section class="ccard" aria-labelledby="h-pay"><h2 id="h-pay">Mensalidade</h2>'+big+ask+'<p class="note-sm" style="margin:10px 0 4px">Todos os meses · '+nPaid+' pago'+(nPaid===1?'':'s')+'</p><div>'+rows+'</div>'+add+'</section>';
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
 if(r)body+='<p class="fb '+(r.ok?"ok":"no")+'">'+(r.ok?"Isso! ":"Quase. ")+esc(q.e||"")+(!r.ok&&q.ans?'<br>Resposta: <b>'+esc(q.ans[0])+'</b>':'')+'</p><button type="button" class="btn small primary ex-next" data-exnext="'+esc(h.id)+'">'+(st.i+1<n?"Próxima →":"Ver minha nota")+'</button>';
 return bar+body}
function exFind(id){return(D.homework||[]).filter(function(x){return x.id===id})[0]}
function hwHTML(){
 var H=(D.homework||[]).slice().sort(function(a,b){return(a.sent||"")<(b.sent||"")?1:-1});
 var body=H.length?H.map(function(h,i){var d=!!done[h.id],links="";
  if(h.file)links+='<a class="hwbtn" href="'+esc(h.file)+'" target="_blank" rel="noopener">Abrir arquivo</a>';
  if(h.url)links+='<a class="hwbtn" href="'+esc(safeUrl(h.url))+'" target="_blank" rel="noopener">Abrir link ↗</a>';
  if(h.ex&&h.ex.length){var st0=hwSt(h);links='<button type="button" class="hwbtn" data-exopen="'+esc(h.id)+'" aria-expanded="'+(hwOpen[h.id]?"true":"false")+'">'+(hwOpen[h.id]?"Fechar":st0.i>=h.ex.length?"Ver minha nota":st0.i>0?"Continuar ✎":"Fazer aqui ✎")+'</button>'+links}
  if(D.doneForm&&!d&&!(h.ex&&h.ex.length))links+='<a class="hwbtn hwdone" href="'+esc(D.doneForm+"?aluno="+encodeURIComponent((D.student&&D.student.name)||"")+"&licao="+encodeURIComponent(h.title)+"&codigo="+encodeURIComponent(h.id))+'" target="_blank" rel="noopener" data-hwdone="'+esc(h.id)+'">Terminei esta lição ✓</a>';
  return'<div class="hw'+(d?' done':'')+'"><input type="checkbox" id="hw-'+esc(h.id)+'" data-task="'+esc(h.id)+'"'+(d?' checked':'')+' aria-label="Marcar como feita"><div class="hwb"><div class="hwt">'+esc(h.title)+(i===0&&!d?'<span class="tagnow">nova</span>':'')+'</div>'+
  '<small>'+(h.sent?'Enviada em '+esc(br(h.sent)):'')+(h.due?' · entregar até '+esc(br(h.due)):'')+'</small>'+(h.note?'<p>'+esc(h.note)+'</p>':'')+'<div class="hwl">'+links+'</div>'+(h.ex&&hwOpen[h.id]?'<div class="ex" id="ex-'+esc(h.id)+'">'+exHTML(h)+'</div>':'')+'</div>'+xBtn("homework",h.id)+'</div>'}).join(""):'<div class="empty">Quando a teacher enviar uma lição de casa, ela aparece aqui.</div>';
 var add=editing?'<form class="add" id="hwf"><input id="hw-title" placeholder="Nome da lição (ex.: Present simple – exercícios)" class="wide" required><label class="note-sm" style="display:flex;flex-direction:column;gap:4px">Entregar até<input type="date" id="hw-due"></label><input id="hw-url" placeholder="Link (Drive, Wordwall, Liveworksheets...)"><label class="note-sm wide" style="display:flex;flex-direction:column;gap:4px">Ou anexe um arquivo (PDF ou imagem)<input type="file" id="hw-file" accept="application/pdf,image/*"></label><input class="wide" id="hw-note" placeholder="Instruções (opcional)"><button class="btn primary" type="submit">Anexar lição</button><span class="status" id="hw-status"></span></form>':'';
 return'<section aria-labelledby="h-hw"><h2 id="h-hw">Lição de casa'+(H.length?'<span class="count">'+H.filter(function(h){return done[h.id]}).length+' de '+H.length+' feitas</span>':'')+'</h2><div class="panel">'+body+'</div>'+add+'</section>';
}
var vidTab="aula",qAns={},wVal={},wRes={},wShow={},freeTxt="",freeRes=null,copied="";
function normA(x){return String(x||"").toLowerCase().replace(/[’`´]/g,"'").replace(/\bdo not\b/g,"don't").replace(/\bdoes not\b/g,"doesn't").replace(/[^a-z' ]/g," ").replace(/'/g,"").replace(/\s+/g," ").trim()}
function wCheck(w){var v=normA(wVal[w.id]);return(w.ans||[]).some(function(a){return normA(a)===v})}
function freeCheck(t){var out=[],ss=t.split(/[.!?\n]+/).map(function(x){return x.trim()}).filter(Boolean),low=" "+t.toLowerCase().replace(/[’`´]/g,"'")+" ";
 var neg=(low.match(/\b(don't|doesn't|do not|does not)\b/g)||[]).length;
 out.push(ss.length>=4?{ok:1,t:"Você escreveu "+ss.length+" frases."}:{ok:0,t:"Escreva pelo menos 4 frases (agora tem "+ss.length+")."});
 out.push(neg>=2?{ok:1,t:"Usou a negativa "+neg+" vezes."}:{ok:0,t:"Use don't / doesn't em pelo menos 2 frases."});
 var e1=low.match(/\b(doesn't|does not)\s+(\w+s)\b/g);if(e1)e1.forEach(function(x){if(!/\b(is|was|has|does)$/.test(x))out.push({ok:0,t:"“"+x+"”: depois de doesn't o verbo fica sem -s."})});
 var e2=low.match(/\b(he|she|it|my \w+)\s+(don't|do not)\b/g);if(e2)e2.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com he / she / it use doesn't."})});
 var e3=low.match(/\b(i|you|we|they)\s+(doesn't|does not)\b/g);if(e3)e3.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com I / you / we / they use don't."})});
 var e4=low.match(/\b(i|you|we|they)\s+(eats|drinks|sleeps|plays|goes|does|exercises|walks|runs|works)\b/g);if(e4)e4.forEach(function(x){out.push({ok:0,t:"“"+x+"”: com I / you / we / they o verbo fica sem -s."})});
 var e5=low.match(/\b(i|you|we|they|he|she)\s+(not)\s+\w+/g);if(e5)e5.forEach(function(x){out.push({ok:0,t:"“"+x+"”: para negar, use don't / doesn't antes do verbo."})});
 var e6=low.match(/\b(i|he|she|we|they|you)\s+(eat|drink|sleep|go|play|do|exercise|eats|drinks|sleeps|goes|plays|exercises)\s+(always|never|usually|sometimes|often)\b/g);if(e6)e6.forEach(function(x){out.push({ok:0,t:"“"+x+"”: a palavra de frequência vem antes do verbo."})});
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
 var V=D.videos||[],tabs=[{id:"aula",l:"Videoaulas"},{id:"listening",l:"Listening"},{id:"exerc",l:"Exercícios"},{id:"write",l:"Escrita"},{id:"news",l:"Notícias"},{id:"read",l:"Leituras"},{id:"pod",l:"Podcasts"},{id:"ia",l:"Pratique com IA"}];
 var body;
 if(vidTab==="exerc")body=quizHTML();else if(vidTab==="write")body=writeHTML();else if(vidTab==="ia")body=aiHTML();
 else{var items=V.filter(function(v){return v.tab===vidTab});
  body=items.length?items.map(function(r){return'<div class="rl"><span class="ico">'+svg(r.kind)+'</span><div class="body"><a href="'+esc(safeUrl(r.url))+'" target="_blank" rel="noopener">'+esc(r.title)+'</a>'+(r.note?'<p>'+esc(r.note)+'</p>':'')+'</div>'+xBtn("videos",r.id)+'</div>'}).join(""):'<div class="empty">Nada nesta aba ainda.</div>'}
 var add=editing&&["exerc","write","ia"].indexOf(vidTab)<0?'<form class="add" data-add="videos"><input name="title" id="a-ytitle" placeholder="Nome" required><input name="url" id="a-yurl" placeholder="Link" required><select name="tab" id="a-ytab" aria-label="Aba"><option value="aula">Videoaulas</option><option value="listening">Listening</option><option value="news">Notícias</option><option value="read">Leituras</option><option value="pod">Podcasts</option></select><input type="hidden" name="kind" value="video"><input class="wide" name="note" id="a-ynote" placeholder="Por que ver (opcional)"><button class="btn primary" type="submit">Adicionar</button></form>':'';
 return'<section class="study" aria-labelledby="h-vid"><h2 id="h-vid">Estude o tema atual</h2>'+(D.studyTheme?'<p class="note-sm" style="margin:-4px 0 10px">'+esc(D.studyTheme)+'</p>':'')+'<div class="tabs" role="tablist">'+tabs.map(function(t){return'<button type="button" role="tab" class="tab" data-vtab="'+t.id+'" aria-selected="'+(vidTab===t.id)+'">'+t.l+'</button>'}).join("")+'</div><div class="res">'+body+'</div>'+add+'</section>';
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

function editHeadHTML(){
 if(!editing)return"";
 var s=D.student||{},L=D.links||{};
 var dayChk=[1,2,3,4,5,6].map(function(d){return'<label style="flex-direction:row;align-items:center;gap:4px"><input type="checkbox" data-day="'+d+'"'+((s.days||[]).indexOf(d)>=0?" checked":"")+' style="width:auto">'+DOW[d].slice(0,3)+'</label>'}).join("");
 function f(id,lab,val,ph){return'<label>'+lab+'<input id="'+id+'" value="'+esc(val||"")+'"'+(ph?' placeholder="'+ph+'"':'')+'></label>'}
 return'<div class="wrap"><div class="edit-head">'+
 f("e-name","Nome do aluno",s.name)+f("e-level","Nível",s.level)+f("e-time","Horário (HH:MM)",s.time,"18:00")+f("e-meet","Link da aula (Meet)",s.meet)+
 '<label>Dias de aula<span style="display:flex;gap:10px;flex-wrap:wrap;padding-top:6px">'+dayChk+'</span></label>'+
 f("e-mat","Pasta de materiais",L.materials)+f("e-rec","Pasta de gravações",L.recordings)+f("e-reccount","Nº de aulas gravadas",D.recCount)+f("e-nb","Digital Notebook",L.notebook)+
 '</div></div>';
}

function render(){
 var s=D.student||{};
 var html=(D.banner?'<div class="wrap" style="padding-block:16px 0"><img class="banner" src="'+esc(D.banner)+'" alt="Voice Your English · English Course" width="1920" height="480"></div>':'')+
 (canEdit?'<div class="wrap ownerbar"><button class="btn" id="toggleEdit" type="button">'+(editing?"Ver como aluno":"Editar dashboard")+'</button></div>':'')+
 '<header class="mast wrap"><div><p class="eyebrow">Voice Your English · Seu painel</p><h1>Hi, <em>'+esc(s.name||"")+'</em>!</h1><p class="lede">Tudo do seu curso em um lugar: a próxima aula, o que praticar esta semana e por onde você já passou.</p>'+
 '<div class="pills"><span class="pill lvl">Nível '+esc(s.level||"")+'</span><span class="pill">'+esc(s.course||"English Course")+'</span><span class="pill">Aulas ao vivo pelo Google Meet</span></div></div>'+nextHTML()+'</header>'+
 editHeadHTML()+quickHTML()+planHTML()+progHTML()+
 '<div class="wrap" style="padding-top:20px">'+dailyHTML()+'</div>'+
 '<main class="wrap"><div class="col">'+hwHTML()+tasksHTML()+recHTML()+lessonsHTML()+'</div><div class="col">'+pathHTML()+vidHTML()+resHTML()+phrasesHTML()+'</div></main>'+
 (editing?'<div class="wrap"><div class="savebar"><span class="status" id="status">'+(dirty?'Você tem alterações não publicadas.':'Tudo publicado. O aluno vê exatamente esta página.')+'</span><button class="btn primary" id="publish" type="button"'+(dirty?'':' disabled')+'>Publicar alterações</button></div></div>':'')+
 '<footer class="wrap">Dúvida ou link quebrado? Me chama no grupo do WhatsApp.</footer>';
 document.getElementById("app").innerHTML=html;
}

function mark(){dirty=true;var st=document.getElementById("status"),p=document.getElementById("publish");if(st)st.textContent="Você tem alterações não publicadas.";if(p)p.disabled=false}
function json(x){return JSON.stringify(x).replace(/</g,"\\u003c")}
function buildDoc(){
 var css=document.getElementById("app-css").textContent,js=document.getElementById("app-js").textContent;
 return SKEL+HEAD_EXTRA+'<style id="app-css">'+css+'</style><script type="application/json" id="app-data">'+json(D)+'<\/script><div id="app"></div><script id="app-js">'+js+'<\/script></body></html>';
}

render();
var app=document.getElementById("app");
app.addEventListener("toggle",function(e){if(e.target.id==="prog"){progOpen=e.target.open;return}if(e.target.dataset&&e.target.dataset.les){lesOpen[e.target.dataset.les]=e.target.open;return}if(e.target.id==="plan"&&!editing)planOpen=e.target.open},true);
app.addEventListener("change",function(e){
 var t=e.target;
 if(t.dataset.task){if(t.checked)done[t.dataset.task]=1;else delete done[t.dataset.task];try{LS.setItem("cl-done",JSON.stringify(done))}catch(err){}render();return}
 if(t.dataset.unit){D.units.forEach(function(u){if(u.id===t.dataset.unit)u.status=t.value});mark();render();return}
 if(t.dataset.abs){D.absences.forEach(function(a){if(a.id===t.dataset.abs)a.status=t.value});mark();render();return}
 if(t.dataset.pay){D.payments.forEach(function(p){if(p.id===t.dataset.pay)p.status=t.value});mark();render();return}
 if(t.id==="e-reccount"){D.recCount=t.value.trim();mark();render();return}
 if(t.id==="e-payday"){D.payDay=t.value.trim();mark();render();return}
 if(t.dataset.day){var d=+t.dataset.day,ds=(D.student.days||[]).filter(function(x){return x!==d});if(t.checked)ds.push(d);ds.sort();D.student.days=ds;mark();render();return}
 var map={"e-name":["student","name"],"e-level":["student","level"],"e-time":["student","time"],"e-meet":["student","meet"],"e-mat":["links","materials"],"e-rec":["links","recordings"],"e-nb":["links","notebook"]};
 if(map[t.id]){var k=map[t.id];D[k[0]]=D[k[0]]||{};D[k[0]][k[1]]=t.value.trim();mark();render()}
});
app.addEventListener("input",function(e){var t=e.target;if(t.dataset.win)wVal[t.dataset.win]=t.value;if(t.id==="w-free")freeTxt=t.value});
app.addEventListener("keydown",function(e){var t=e.target;if(e.key==="Enter"&&t.dataset&&t.dataset.exin){e.preventDefault();var be=document.querySelector('[data-excheck="'+t.dataset.exin+'"]');if(be)be.click();return}if(e.key==="Enter"&&t.dataset&&t.dataset.win){e.preventDefault();var bb=document.querySelector('[data-wchk="'+t.dataset.win+'"]');if(bb)bb.click()}});
app.addEventListener("submit",function(e){
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
 if(hd){done[hd.dataset.hwdone]=1;try{LS.setItem("cl-done",JSON.stringify(done))}catch(err){}setTimeout(render,400);return}
 var b=e.target.closest("button");if(!b)return;
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
 if(b.dataset.exopen){hwOpen[b.dataset.exopen]=!hwOpen[b.dataset.exopen];render();return}
 if(b.dataset.exmc){var H1=exFind(b.dataset.exmc),S1=hwSt(H1),Q1=H1.ex[S1.i];S1.r[S1.i]={v:+b.dataset.o,ok:+b.dataset.o===Q1.a};hwSave();render();return}
 if(b.dataset.expick){var pk=hwPick[b.dataset.expick]||[];pk.push(+b.dataset.j);hwPick[b.dataset.expick]=pk;render();return}
 if(b.dataset.exun){hwPick[b.dataset.exun]=(hwPick[b.dataset.exun]||[]).filter(function(j){return j!==+b.dataset.j});render();return}
 if(b.dataset.excheck){var H2=exFind(b.dataset.excheck),S2=hwSt(H2),Q2=H2.ex[S2.i],v;
  if(Q2.t==="order"){v=(hwPick[H2.id]||[]).map(function(j){return Q2.w[j]}).join(" ");hwPick[H2.id]=[]}else{var ei=document.getElementById("exw-"+H2.id);v=ei?ei.value.trim():"";if(!v)return}
  S2.r[S2.i]={v:v,ok:(Q2.ans||[]).some(function(a){return normA(a)===normA(v)})};hwSave();render();return}
 if(b.dataset.exnext){var S3=hwSt(exFind(b.dataset.exnext));S3.i++;hwSave();render();var ex=document.getElementById("ex-"+b.dataset.exnext);if(ex)ex.scrollIntoView({block:"nearest"});return}
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
ctx.every(function(){var ae=document.activeElement;if(!editing&&!(ae&&ae.closest&&ae.closest(".study,.ex")))render()},60000);

ctx.api={render:function(){render()},
 markPay:function(ym){paySent[ym]=1;try{LS.setItem("cl-paysent",JSON.stringify(paySent))}catch(e){}render()},
 markDone:function(id){done[id]=1;try{LS.setItem("cl-done",JSON.stringify(done))}catch(e){}render()},
 data:function(){return D},
 isDirty:function(){return dirty}};

}};
