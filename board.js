/* Teacher board: agenda, class control and per-student class history.
   Data lives in public.teacher_board (one row, teacher-only via RLS). */
(function () {
  var DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  var DIASL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var ST = { p: ["Presente", "ok"], fj: ["Falta justificada", "warn"], fi: ["Falta injustificada", "bad"], s: ["Sem registro", "idle"], f: ["Agendada", "info"], h: ["Hoje", "info"], rc: ["Reposição cancelada", "idle"], c: ["Aula cancelada", "idle"] };
  var PAG = { Pago: "ok", Pendente: "warn", Atrasado: "bad" };
  var FORMATOS = ["Todos", "Individual", "Dupla", "Família", "Trabalho"];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function dm(s) { var p = s.split("-"); return p[2] + "/" + p[1]; }
  function dow(s) { var p = s.split("-"); return new Date(+p[0], p[1] - 1, +p[2]).getDay(); }
  function fmt(f) { return f === "Trabalho" ? "Inglês p/ trabalho" : f; }
  function byId(B, id) { return (B.A || []).filter(function (s) { return s.id === id; })[0]; }
  function all(B, s) { return ((B.HIST || {})[s.id] || []).concat(s.aulas || []); }
  function given(list) { return list.filter(function (a) { return a[2] === "p"; }).length; }
  function curMonth(B, s) { var ym = iso(new Date()).slice(0, 7); return all(B, s).filter(function (a) { return a[0].slice(0, 7) === ym; }); }

  function dayList(B, d) {
    var k = iso(d), wd = d.getDay(), out = [];
    (B.A || []).forEach(function (s) { (s.slots || []).forEach(function (sl) { if (sl[0] === wd) out.push({ h: sl[1], s: s, tipo: "Aula" }); }); });
    (B.EXTRAS || []).forEach(function (e) { var s = byId(B, e.id); if (e.d === k && s) out.push({ h: e.h, s: s, tipo: e.tipo }); });
    return out.sort(function (a, b) { return a.h < b.h ? -1 : 1; });
  }
  function hourState(h) {
    var p = h.split(":"), t = new Date(); t.setHours(+p[0], +p[1], 0, 0);
    var diff = (t - new Date()) / 60000;
    if (diff < -60) return ["Fazer pós aula", "warn"];
    if (diff <= 0) return ["Agora", "ok"];
    if (diff <= 30) return ["Em " + Math.round(diff) + " min", "info"];
    return ["Agendada", "idle"];
  }
  function chip(st) { return '<span class="bd-pill ' + st[1] + '">' + esc(st[0]) + '</span>'; }

  /* Card shown on the teacher home */
  function agenda(B) {
    var now = new Date(), today = dayList(B, now), up = "";
    for (var i = 1; i <= 7; i++) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i), l = dayList(B, d);
      if (!l.length) continue;
      up += '<div class="bd-day"><p><b>' + DIASL[d.getDay()] + '</b> ' + dm(iso(d)) + '</p><div class="bd-chips">' + l.map(function (x) {
        return '<a class="bd-chip" href="#/controle/' + x.s.id + '"><b>' + x.h + '</b> ' + esc(x.s.nome) + (x.tipo !== "Aula" ? ' · <em>' + esc(x.tipo) + '</em>' : "") + '</a>';
      }).join("") + '</div></div>';
    }
    var rep = (B.A || []).filter(function (s) { return s.repos > 0; });
    var pend = (B.A || []).filter(function (s) { return s.pag === "Pendente"; });
    return '<section class="t-sec wrap bd-agenda"><div class="bd-h"><h2>Agenda</h2><a class="tb-btn primary" href="#/controle">Controle de aulas →</a></div>' +
      '<div class="bd-card"><h3>Hoje</h3>' + (today.length ? today.map(function (x) {
        return '<div class="bd-row"><span class="bd-hour">' + x.h + '</span><div class="bd-main"><a href="#/controle/' + x.s.id + '"><b>' + esc(x.s.nome) + '</b></a>' + (x.tipo !== "Aula" ? ' <span class="bd-pill info">' + esc(x.tipo) + '</span>' : "") + '<small>' + esc(x.s.licao) + '</small></div>' + chip(hourState(x.h)) + '</div>';
      }).join("") : '<p class="bd-empty">Nenhuma aula hoje.</p>') +
      '<h3>Próximos 7 dias</h3>' + (up || '<p class="bd-empty">Nada agendado.</p>') +
      ((rep.length || pend.length) ? '<h3>Precisa de atenção</h3>' + rep.map(function (s) {
        return '<a class="bd-alert" href="#/controle/' + s.id + '"><span class="bd-dot warn"></span>' + esc(s.nome) + ' · ' + s.repos + ' reposiç' + (s.repos === 1 ? "ão" : "ões") + ' em aberto</a>';
      }).join("") + pend.map(function (s) {
        return '<a class="bd-alert" href="#/controle/' + s.id + '"><span class="bd-dot bad"></span>' + esc(s.nome) + ' · mensalidade pendente (' + esc(s.valor) + ')</a>';
      }).join("") : "") +
      '<p class="bd-foot">Atualizado em ' + esc(B.updated ? dm(B.updated) : "–") + ' · pela planilha Controle de aulas</p></div></section>';
  }

  /* Full list of students */
  function control(B, filtro) {
    filtro = filtro || "Todos";
    var L = (B.A || []).filter(function (s) { return filtro === "Todos" || s.formato === filtro; });
    var monthName = MESES[new Date().getMonth()];
    return '<div class="wrap t-head"><a class="bd-back" href="#">← Voltar</a><p class="eyebrow">Teacher · Controle de aulas</p><h1>Controle de <em>aulas</em></h1><p class="lede">Agenda, conteúdo de cada aula e histórico desde o início de cada aluno.</p></div>' +
      '<div class="wrap bd-filters">' + FORMATOS.map(function (f) { return '<button class="bd-f" data-bdf="' + f + '" aria-pressed="' + (f === filtro) + '">' + esc(fmt(f)) + '</button>'; }).join("") + '</div>' +
      '<div class="wrap bd-list">' + (L.length ? L.map(function (s) {
        var m = curMonth(B, s), tot = given(all(B, s));
        return '<a class="bd-st" href="#/controle/' + s.id + '"><div class="bd-main"><b>' + esc(s.nome) + '</b><small>' + esc(fmt(s.formato)) + ' · ' + esc(s.nivel) + ' · ' + esc(s.horario) + '</small><small class="bd-last">' + esc(s.licao) + '</small></div>' +
          '<div class="bd-nums"><span><b>' + given(m) + '</b> em ' + monthName + '</span><span><b>' + tot + '</b> no total</span>' + (s.repos ? '<span class="bd-r"><b>' + s.repos + '</b> repos.</span>' : "") + '</div>' +
          '<span class="bd-pill ' + (PAG[s.pag] || "idle") + '">' + esc(s.pag) + '</span></a>';
      }).join("") : '<p class="bd-empty">Nenhum aluno com esse filtro.</p>') + '</div>';
  }

  function item(a) {
    var st = ST[a[2]] || ST.s, t = a[1] || "";
    return '<div class="bd-row"><span class="bd-date">' + dm(a[0]) + '<small>' + DIAS[dow(a[0])] + '</small></span><div class="bd-main">' +
      (a[2] === "p" ? (t ? '<b>' + esc(t) + '</b>' : '<span class="bd-mut">Conteúdo não registrado</span>') : '<span class="bd-mut">' + (esc(t) || "—") + '</span>') +
      (a[3] ? '<small>' + esc(a[3]) + '</small>' : "") + '</div>' + chip(st) + '</div>';
  }

  /* One student's page */
  function student(B, id) {
    var s = byId(B, id); if (!s) return '<div class="wrap t-head"><a class="bd-back" href="#/controle">← Voltar</a><p class="bd-empty">Aluno não encontrado.</p></div>';
    var list = all(B, s), first = list[0], m = curMonth(B, s), monthName = MESES[new Date().getMonth()];
    var fal = m.filter(function (a) { return a[2] === "fj" || a[2] === "fi"; }).length;
    var hist = (B.HIST || {})[s.id] || [], groups = {}, order = [];
    hist.forEach(function (a) { var k = a[0].slice(0, 7); if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(a); });
    var histHTML = order.reverse().map(function (k, i) {
      var l = groups[k], n = given(l), p = k.split("-");
      return '<details class="bd-mes"' + (i === 0 ? " open" : "") + '><summary><b>' + MESES[+p[1] - 1] + ' ' + p[0] + '</b><span>' + n + ' aula' + (n === 1 ? "" : "s") + (l.length > n ? ' · ' + (l.length - n) + ' outro' + (l.length - n === 1 ? "" : "s") : "") + '</span></summary>' + l.slice().reverse().map(item).join("") + '</details>';
    }).join("");
    return '<div class="wrap t-head"><a class="bd-back" href="#/controle">← Controle de aulas</a><p class="eyebrow">' + esc(fmt(s.formato)) + ' · ' + esc(s.nivel) + ' · ' + esc(s.horario) + '</p><h1>' + esc(s.nome) + '</h1>' + (s.nota ? '<p class="lede">' + esc(s.nota) + '</p>' : "") + '</div>' +
      '<div class="wrap bd-kpis">' +
      '<div class="bd-kpi"><span>Último conteúdo</span><b class="sm">' + esc(s.licao) + '</b></div>' +
      '<div class="bd-kpi"><span>Aulas em ' + monthName + '</span><b>' + given(m) + '</b><small>' + fal + ' falta' + (fal === 1 ? "" : "s") + '</small></div>' +
      '<div class="bd-kpi"><span>Aluno desde</span><b class="sm">' + (first ? first[0].split("-").reverse().join("/") : "—") + '</b><small>' + given(list) + ' aulas registradas</small></div>' +
      '<div class="bd-kpi"><span>Reposições em aberto</span><b' + (s.repos ? ' class="bad"' : "") + '>' + (s.repos || 0) + '</b></div>' +
      '<div class="bd-kpi"><span>Mensalidade</span><b class="sm">' + esc(s.valor) + '</b><small>' + esc(s.venc) + ' · <span class="bd-pill ' + (PAG[s.pag] || "idle") + '">' + esc(s.pag) + '</span></small></div>' +
      '</div><div class="wrap bd-cols"><section class="bd-card"><h3>Aulas recentes</h3>' + ((s.aulas || []).length ? s.aulas.slice().reverse().map(item).join("") : '<p class="bd-empty">Nenhuma aula registrada ainda.</p>') + '</section>' +
      (hist.length ? '<section class="bd-card"><h3>Histórico desde o início <small>' + hist.length + ' registros</small></h3>' + histHTML + '</section>' : "") + '</div>';
  }

  window.VYEBoard = { agenda: agenda, control: control, student: student };
})();
