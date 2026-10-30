/* Calendário do ano letivo: aulas de cada aluno no ano, meses com aula a mais
   e como elas compensam as férias. Usado na página do aluno (panel.js) e na
   página do aluno no controle da teacher (board.js). */
(function () {
  "use strict";
  var CFG = {
    2027: {
      ferias: [
        { de: "2026-12-21", ate: "2027-01-03", nome: "Recesso de fim de ano" },
        { de: "2027-12-20", ate: "2028-01-02", nome: "Recesso de fim de ano" }
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
  function iso(y, m, d) { return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0"); }
  function br(s) { var p = s.split("-"); return p[2] + "/" + p[1]; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* opts: {days:[0-6], year, semFeriado, teacher} */
  function compute(opts) {
    var year = opts.year || 2027, cfg = CFG[year] || { ferias: [], feriados: {} };
    var days = (opts.days || []).filter(function (d, i, a) { return a.indexOf(d) === i; }).sort();
    var per = days.length, months = [], total = 0, lostFer = 0, lostHol = 0, extraMonths = [];
    function ferias(s) { return cfg.ferias.some(function (f) { return s >= f.de && s <= f.ate; }); }
    for (var m = 0; m < 12; m++) {
      var n = new Date(year, m + 1, 0).getDate(), cells = [], cnt = 0, off = 0;
      for (var d = 1; d <= n; d++) {
        var s = iso(year, m, d), wd = new Date(year, m, d).getDay(), isClass = days.indexOf(wd) >= 0;
        var fe = ferias(s), ho = cfg.feriados[s], k = "";
        if (isClass) {
          if (fe) { k = "fer"; off++; lostFer++; }
          else if (ho && opts.semFeriado) { k = "hol"; off++; lostHol++; }
          else { k = "aula"; cnt++; }
        } else if (fe) k = "ferx";
        cells.push({ d: d, s: s, wd: wd, k: k, ho: ho });
      }
      var diff = cnt - 4 * per;
      if (diff > 0) extraMonths.push({ m: m, n: diff });
      total += cnt;
      months.push({ m: m, cells: cells, cnt: cnt, diff: diff, off: off });
    }
    return { year: year, days: days, per: per, months: months, total: total, base: 48 * per, saldo: total - 48 * per, lostFer: lostFer, lostHol: lostHol, extraMonths: extraMonths, ferias: cfg.ferias.filter(function (f) { return f.ate >= year + "-01-01" && f.de <= year + "-12-31"; }) };
  }

  function monthHTML(M, year) {
    var first = new Date(year, M.m, 1).getDay(), pad = "";
    for (var i = 0; i < first; i++) pad += "<i></i>";
    var cells = M.cells.map(function (c) {
      var t = c.k === "aula" ? "Aula" : c.k === "fer" ? "Férias (sem aula)" : c.k === "hol" ? "Feriado (sem aula)" : c.k === "ferx" ? "Férias" : "";
      if (c.ho) t += (t ? " · " : "") + c.ho;
      return '<i class="' + c.k + (c.ho ? " ho" : "") + '"' + (t ? ' title="' + esc(br(c.s) + " · " + t) + '"' : "") + '>' + c.d + '</i>';
    }).join("");
    var tag = M.diff > 0 ? '<em class="up">+' + M.diff + ' extra</em>' : M.diff < 0 ? '<em class="dn">' + M.diff + '</em>' : "";
    return '<div class="cal-m"><div class="cal-mh"><b>' + MES[M.m] + '</b><span>' + M.cnt + ' aula' + (M.cnt === 1 ? "" : "s") + tag + '</span></div><div class="cal-g"><u>D</u><u>S</u><u>T</u><u>Q</u><u>Q</u><u>S</u><u>S</u>' + pad + cells + '</div></div>';
  }

  function html(opts) {
    var R = compute(opts);
    if (!R.per) return opts.teacher ? '<section class="cal"><h3>Calendário ' + R.year + '</h3><p class="cal-note">Sem dia fixo de aula cadastrado.</p></section>' : "";
    var dias = R.days.map(function (d) { return DOW[d].toLowerCase(); }).join(" e ");
    var ext = R.extraMonths.map(function (x) { return MES[x.m] + (x.n > 1 ? " (+" + x.n + ")" : ""); }).join(", ");
    var fer = R.ferias.map(function (f) { return br(f.de) + (f.de.slice(0, 4) !== f.ate.slice(0, 4) ? "/" + f.de.slice(2, 4) : "") + " a " + br(f.ate) + (f.de.slice(0, 4) !== f.ate.slice(0, 4) ? "/" + f.ate.slice(2, 4) : ""); }).join(" e ");
    var sum = '<p class="cal-lede">Aulas às <b>' + dias + '</b>. A mensalidade é a mesma nos 12 meses e cobre ' + (4 * R.per) + ' aulas por mês. ' +
      (ext ? 'Os meses com aula a mais (<b>' + ext + '</b>) compensam as férias' + (fer ? ' (' + fer + ')' : '') + '.' : '') + '</p>';
    var kpis = '<div class="cal-k"><div><b>' + R.total + '</b><span>aulas em ' + R.year + '</span></div><div><b>' + R.extraMonths.reduce(function (a, x) { return a + x.n; }, 0) + '</b><span>aulas a mais nos meses de 5 semanas</span></div><div><b>' + R.lostFer + '</b><span>aulas nas férias</span></div>' +
      (opts.teacher ? '<div><b class="' + (R.saldo < 0 ? "dn" : "up") + '">' + (R.saldo > 0 ? "+" : "") + R.saldo + '</b><span>saldo do ano (vs. ' + R.base + ' pagas)' + (R.lostHol ? ' · ' + R.lostHol + ' feriado' + (R.lostHol > 1 ? "s" : "") : "") + '</span></div>' : "") + '</div>';
    var legend = '<p class="cal-leg"><span><i class="aula"></i>aula</span><span><i class="fer"></i>férias</span><span><i class="ho"></i>feriado' + (opts.semFeriado ? " (sem aula)" : " (tem aula normal)") + '</span></p>';
    return '<section class="cal"><details' + (opts.open ? " open" : "") + '><summary><b>Calendário do ano letivo ' + R.year + '</b><small>' + R.total + ' aulas · ' + (ext ? "aulas extras em " + ext : "") + '</small></summary>' + sum + kpis + legend +
      '<div class="cal-ms">' + R.months.map(function (M) { return monthHTML(M, R.year); }).join("") + '</div></details></section>';
  }

  window.VYECal = { compute: compute, html: html, CFG: CFG };
})();
