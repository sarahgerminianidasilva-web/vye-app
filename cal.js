/* Calendário do ano letivo: aulas de cada aluno no ano, semanas de reposição
   (5ª semana do mês), férias e feriados. Usado na página do aluno (panel.js) e
   na página do aluno no controle da teacher (board.js). Também gera o arquivo
   de agenda (.ics) para o aluno colocar tudo no celular. */
(function () {
  "use strict";
  var CFG = {
    2027: {
      ferias: [
        { de: "2026-12-14", ate: "2027-01-10", nome: "Férias de fim de ano", volta: "2027-01-11" },
        { de: "2027-12-20", ate: "2028-01-09", nome: "Férias de fim de ano" }
      ],
      feriados: {
        "2027-01-01": "Confraternização Universal", "2027-02-08": "Carnaval", "2027-02-09": "Carnaval",
        "2027-03-26": "Sexta-feira Santa", "2027-04-21": "Tiradentes", "2027-05-01": "Dia do Trabalho",
        "2027-05-27": "Corpus Christi", "2027-09-07": "Independência", "2027-10-12": "Nossa Senhora Aparecida",
        "2027-11-02": "Finados", "2027-11-15": "Proclamação da República", "2027-11-20": "Consciência Negra",
        "2027-12-25": "Natal"
      }
    }
  };
  var MES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var DOW = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  var PLURAL = ["domingos", "segundas", "terças", "quartas", "quintas", "sextas", "sábados"];
  function iso(y, m, d) { return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0"); }
  function br(s) { var p = s.split("-"); return p[2] + "/" + p[1]; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function join(a) { return a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " e " + a[a.length - 1]; }
  function fromIso(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }

  /* opts: {days:[0-6], year, semFeriado, teacher, local:{iso:nome}, time:"18:00", name} */
  function compute(opts) {
    var year = opts.year || 2027, cfg = CFG[year] || { ferias: [], feriados: {} };
    var days = (opts.days || []).map(Number).filter(function (d, i, a) { return a.indexOf(d) === i; }).sort();
    var local = opts.local || {}, hol = {};
    Object.keys(cfg.feriados).forEach(function (k) { hol[k] = { nome: cfg.feriados[k], tipo: "nacional" }; });
    Object.keys(local).forEach(function (k) { if (local[k]) hol[k] = { nome: local[k], tipo: "local" }; });
    function ferias(s) { return cfg.ferias.some(function (f) { return s >= f.de && s <= f.ate; }); }
    var per = days.length, months = [], total = 0, repos = [], holOnClass = [];
    for (var m = 0; m < 12; m++) {
      var n = new Date(year, m + 1, 0).getDate(), cells = [], cnt = 0, rep = 0;
      for (var d = 1; d <= n; d++) {
        var s = iso(year, m, d), wd = new Date(year, m, d).getDay(), isClass = days.indexOf(wd) >= 0;
        var fe = ferias(s), ho = hol[s], k = "";
        if (isClass) {
          if (fe) k = "fer";
          else if (ho && opts.semFeriado) k = "hol";
          else {
            k = Math.ceil(d / 7) === 5 ? "repo" : "aula";
            if (k === "repo") { rep++; repos.push(s); } else cnt++;
            if (ho) holOnClass.push({ s: s, nome: ho.nome, tipo: ho.tipo });
          }
        } else if (fe) k = "ferx";
        cells.push({ d: d, s: s, wd: wd, k: k, ho: ho });
      }
      total += cnt + rep;
      months.push({ m: m, cells: cells, cnt: cnt, rep: rep });
    }
    /* aulas que caem nas férias de fim do ano anterior (dez/jan), sem contar as 5ªs semanas */
    var pausa = cfg.ferias[0], lost = [];
    if (pausa && per) {
      for (var t = fromIso(pausa.de); t <= fromIso(pausa.ate); t.setDate(t.getDate() + 1)) {
        if (days.indexOf(t.getDay()) >= 0 && Math.ceil(t.getDate() / 7) !== 5) lost.push(iso(t.getFullYear(), t.getMonth(), t.getDate()));
      }
    }
    var holList = Object.keys(hol).filter(function (k) { return k.slice(0, 4) === String(year); }).sort().map(function (k) { return { s: k, nome: hol[k].nome, tipo: hol[k].tipo, aula: holOnClass.some(function (x) { return x.s === k; }) }; });
    return { year: year, days: days, per: per, months: months, total: total, repos: repos, lost: lost, pausa: pausa, holList: holList, holOnClass: holOnClass, hasLocal: Object.keys(local).length > 0 };
  }

  function monthHTML(M, year) {
    var first = new Date(year, M.m, 1).getDay(), pad = "";
    for (var i = 0; i < first; i++) pad += "<i></i>";
    var cells = M.cells.map(function (c) {
      var t = c.k === "aula" ? "Aula" : c.k === "repo" ? "Reposição" : c.k === "fer" ? "Férias (sem aula)" : c.k === "hol" ? "Feriado (sem aula)" : c.k === "ferx" ? "Férias" : "";
      if (c.ho) t += (t ? " · " : "") + c.ho.nome + (c.k === "aula" || c.k === "repo" ? " (a combinar)" : "");
      return '<i class="' + c.k + (c.ho ? " ho" + (c.ho.tipo === "local" ? " hl" : "") : "") + '"' + (t ? ' title="' + esc(br(c.s) + " · " + t) + '"' : "") + '>' + c.d + '</i>';
    }).join("");
    var tag = M.rep ? '<em class="rp">+' + M.rep + ' reposição' + (M.rep > 1 ? "ões" : "") + '</em>' : "";
    return '<div class="cal-m"><div class="cal-mh"><b>' + MES[M.m] + '</b><span>' + (M.cnt + M.rep) + ' aula' + (M.cnt + M.rep === 1 ? "" : "s") + tag + '</span></div><div class="cal-g"><u>D</u><u>S</u><u>T</u><u>Q</u><u>Q</u><u>S</u><u>S</u>' + pad + cells + '</div></div>';
  }

  function html(opts) {
    var R = compute(opts);
    if (!R.per) return opts.teacher ? '<section class="cal"><h3>Calendário ' + R.year + '</h3><p class="cal-note">Sem dia fixo de aula cadastrado.</p></section>' : "";
    var dias = join(R.days.map(function (d) { return PLURAL[d]; }));
    var P = R.pausa, saldo = R.repos.length - R.lost.length;
    var sum = '<p class="cal-lede">Aulas às <b>' + dias + '</b>' + (opts.time ? ', às ' + esc(opts.time.replace(":00", "h").replace(":", "h")) : '') + '. ' +
      (P ? '<b>Férias de ' + br(P.de) + ' a ' + br(P.ate) + '</b>, volta em ' + br(P.volta) + '. ' : '') +
      'As aulas das férias são repostas nas <b>semanas de reposição</b> (a 5ª semana do mês, em amarelo)' + (R.repos.length ? ': ' + join(R.repos.map(br)) + '.' : '.') + '</p>';
    var kpis = '<div class="cal-k"><div><b>' + R.lost.length + '</b><span>aulas nas férias</span></div><div class="rk"><b>' + R.repos.length + '</b><span>reposições em ' + R.year + '</span></div><div><b>' + R.total + '</b><span>aulas em ' + R.year + '</span></div>' +
      (opts.teacher ? '<div><b class="' + (saldo < 0 ? "dn" : "up") + '">' + (saldo > 0 ? "+" : "") + saldo + '</b><span>saldo de reposição</span></div>' : "") + '</div>';
    var legend = '<p class="cal-leg"><span><i class="aula"></i>aula</span><span><i class="repo"></i>reposição</span><span><i class="fer"></i>férias</span><span><i class="ho"></i>feriado nacional</span>' + (R.hasLocal ? '<span><i class="ho hl"></i>feriado da sua cidade</span>' : '') + '</p>';
    var hols = R.holList.length ? '<div class="cal-hols"><b>Feriados ' + R.year + '</b><ul>' + R.holList.map(function (h) {
      return '<li' + (h.aula ? ' class="on"' : '') + '><span>' + br(h.s) + '</span> ' + esc(h.nome) + (h.tipo === "local" ? ' <small>(local)</small>' : '') + (h.aula ? ' <small>· cai no seu dia de aula, a combinar</small>' : '') + '</li>';
    }).join("") + '</ul></div>' : '';
    var btn = '<div class="cal-act"><button class="btn" type="button" data-calics="1" data-days="' + R.days.join(",") + '" data-time="' + esc(opts.time || "") + '" data-name="' + esc(opts.name || "") + '" data-local="' + esc(JSON.stringify(opts.local || {})) + '" data-semferiado="' + (opts.semFeriado ? 1 : "") + '">📅 Adicionar à minha agenda</button><small>Coloca todas as aulas, reposições, férias e feriados no calendário do seu celular.</small></div>';
    return '<section class="cal"><details' + (opts.open ? " open" : "") + '><summary><b>Calendário ' + R.year + ' · férias e reposições</b><small>' + R.lost.length + ' aulas nas férias · ' + R.repos.length + ' reposições</small></summary>' + sum + kpis + btn + legend +
      '<div class="cal-ms">' + R.months.map(function (M) { return monthHTML(M, R.year); }).join("") + '</div>' + hols + '</details></section>';
  }

  /* ---------- arquivo de agenda (.ics) ---------- */
  function ics(opts) {
    var R = compute(opts), cfg = CFG[R.year], hm = String(opts.time || "18:00").split(":"), h = +hm[0] || 18, mi = +(hm[1] || 0);
    var now = new Date(), stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    function p2(x) { return String(x).padStart(2, "0"); }
    function dt(s, hh, mm) { return s.replace(/-/g, "") + "T" + p2(hh) + p2(mm) + "00"; }
    function next(s) { var d = fromIso(s); d.setDate(d.getDate() + 1); return iso(d.getFullYear(), d.getMonth(), d.getDate()).replace(/-/g, ""); }
    function e(s) { return String(s).replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;"); }
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Voice Your English//Calendario//PT", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:" + e("Inglês " + R.year + (opts.name ? " · " + opts.name : "")), "X-WR-TIMEZONE:America/Sao_Paulo",
      "BEGIN:VTIMEZONE", "TZID:America/Sao_Paulo", "BEGIN:STANDARD", "DTSTART:19700101T000000", "TZOFFSETFROM:-0300", "TZOFFSETTO:-0300", "TZNAME:-03", "END:STANDARD", "END:VTIMEZONE"];
    function ev(uid, lines) { L.push("BEGIN:VEVENT", "UID:" + uid + "@voiceyourenglish", "DTSTAMP:" + stamp); L.push.apply(L, lines); L.push("END:VEVENT"); }
    cfg.ferias.forEach(function (f, i) { ev("ferias-" + i, ["DTSTART;VALUE=DATE:" + f.de.replace(/-/g, ""), "DTEND;VALUE=DATE:" + next(f.ate), "SUMMARY:" + e("🌴 Férias VYE (sem aula ao vivo)"), "TRANSP:TRANSPARENT"]); });
    R.months.forEach(function (M) {
      M.cells.forEach(function (c) {
        if (c.k !== "aula" && c.k !== "repo") return;
        var end = h * 60 + mi + 60, title = (c.k === "repo" ? "🟡 Reposição de inglês" : "📚 Aula de inglês") + (c.ho ? " (feriado: " + c.ho.nome + " – a combinar)" : "");
        ev("aula-" + c.s, ["DTSTART;TZID=America/Sao_Paulo:" + dt(c.s, h, mi), "DTEND;TZID=America/Sao_Paulo:" + dt(c.s, Math.floor(end / 60), end % 60), "SUMMARY:" + e(title), "DESCRIPTION:Voice Your English"]);
      });
    });
    R.holList.forEach(function (x) { ev("feriado-" + x.s, ["DTSTART;VALUE=DATE:" + x.s.replace(/-/g, ""), "DTEND;VALUE=DATE:" + next(x.s), "SUMMARY:" + e((x.tipo === "local" ? "📍 Feriado local: " : "🇧🇷 Feriado nacional: ") + x.nome), "TRANSP:TRANSPARENT"]); });
    L.push("END:VCALENDAR");
    return L.join("\r\n") + "\r\n";
  }

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-calics]");
    if (!b) return;
    var local = {}; try { local = JSON.parse(b.dataset.local || "{}"); } catch (x) {}
    var name = b.dataset.name || "";
    var txt = ics({ days: (b.dataset.days || "").split(",").filter(String).map(Number), time: b.dataset.time, name: name, local: local, semFeriado: !!b.dataset.semferiado, year: 2027 });
    var file = "ingles-2027" + (name ? "-" + name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "") + ".ics";
    var blob = new Blob([txt], { type: "text/calendar;charset=utf-8" });
    /* iPhone/iPad: abrir o arquivo faz o Safari oferecer "Adicionar tudo" ao Calendário */
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
      var r = new FileReader(); r.onload = function () { location.href = r.result; }; r.readAsDataURL(blob); return;
    }
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  });

  window.VYECal = { compute: compute, html: html, ics: ics, CFG: CFG };
})();
