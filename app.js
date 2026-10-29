/* Voice Your English · app shell
   Login (e-mail code or magic link) → student panel or teacher area.
   Data lives in Supabase: students (panel data), progress (per-student state),
   submissions (homework scores, payment receipts, self-evaluations). */
(function () {
  "use strict";
  var C = window.VYE_CONFIG || {};
  var root = document.getElementById("root");
  var toastEl = document.getElementById("toast");
  var sb = null;
  try {
    sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  } catch (e) { root.innerHTML = '<div class="login"><p>Não foi possível iniciar o app. Tente de novo mais tarde.</p></div>'; return; }

  var me = { email: null, teacher: false };
  var timers = [];
  var current = null;      // { student, teacherView, api }
  var MONF = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function toast(t, ms) { toastEl.textContent = t; toastEl.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(function () { toastEl.hidden = true; }, ms || 3200); }
  function clearTimers() { timers.forEach(clearInterval); timers = []; }
  function fmtDT(iso) { var d = new Date(iso); return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function ymNow() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); }
  function monLabel(ym) { var p = String(ym || "").split("-"); if (p.length < 2) return ym || ""; var m = MONF[+p[1] - 1] || ""; return m.charAt(0).toUpperCase() + m.slice(1) + " " + p[0]; }
  function initials(n) { return String(n || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join(""); }
  function appUrl() { return location.origin + location.pathname; }
  function fixData(d) { d = d || {}; if (!d.banner || /^\/_blob\//.test(d.banner)) d.banner = "assets/banner.jpg"; return d; }
  function isStandalone() { return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; }

  /* ---------- PWA ---------- */
  var installEvt = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); installEvt = e; var b = document.getElementById("installBtn"); if (b) b.hidden = false; });
  if ("serviceWorker" in navigator) { window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); }); }
  function installHTML() {
    if (isStandalone()) return "";
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    return '<div class="wrap"><div class="install"><span style="font-size:1.4rem" aria-hidden="true">📲</span><div><b>Instale o app no seu celular</b>' +
      (ios ? 'No Safari, toque em <b style="display:inline">Compartilhar</b> e depois em <b style="display:inline">Adicionar à Tela de Início</b>.' : 'Fica com ícone na tela, igual a um aplicativo.') +
      '</div>' + (ios ? "" : '<button type="button" class="tb-btn primary" id="installBtn"' + (installEvt ? "" : " hidden") + '>Instalar</button>') + '</div></div>';
  }

  /* ---------- Modal helper ---------- */
  function modal(html, onReady) {
    var wrap = document.createElement("div");
    wrap.className = "modal"; wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML = '<div class="modal-card">' + html + '</div>';
    document.body.appendChild(wrap);
    function close() { wrap.remove(); document.removeEventListener("keydown", onKey); }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    wrap.addEventListener("click", function (e) { if (e.target === wrap || e.target.closest("[data-close]")) close(); });
    var first = wrap.querySelector("input,textarea,button"); if (first) setTimeout(function () { first.focus(); }, 50);
    if (onReady) onReady(wrap, close);
    return close;
  }

  /* ---------- Auth ---------- */
  function showLogin(state) {
    clearTimers(); current = null;
    state = state || {};
    root.innerHTML = '<div class="login"><div class="login-card"><img class="lb" src="assets/banner.jpg" alt="Voice Your English">' +
      '<form class="login-body" id="loginForm" novalidate>' +
      '<p class="eyebrow" style="margin:0">Voice Your English</p><h1>' + (state.sent ? "Confira seu e-mail" : "Entrar") + '</h1>' +
      (state.sent
        ? '<p>Enviamos um e-mail para <b>' + esc(state.email) + '</b>. Toque no link do e-mail <b>ou</b> digite o código abaixo.</p>' +
          '<label class="field">Código<input id="code" class="code-in" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="••••••"></label>' +
          '<button class="big-btn" type="submit" id="go">Entrar</button>' +
          '<button class="link-btn" type="button" id="back">Usar outro e-mail</button>'
        : '<p>Use o e-mail que você passou para a teacher. Não precisa de senha: a gente te manda um link de acesso.</p>' +
          '<label class="field">Seu e-mail<input id="email" type="email" inputmode="email" autocomplete="email" required placeholder="voce@email.com" value="' + esc(state.email || "") + '"></label>' +
          '<button class="big-btn" type="submit" id="go">Receber acesso</button>') +
      '<div class="msg' + (state.err ? " err" : "") + '" id="lmsg"' + (state.msg || state.err ? "" : " hidden") + '>' + esc(state.err || state.msg || "") + '</div>' +
      '</form></div></div>';
    var f = document.getElementById("loginForm");
    var back = document.getElementById("back");
    if (back) back.onclick = function () { showLogin({ email: state.email }); };
    f.onsubmit = function (e) {
      e.preventDefault();
      var go = document.getElementById("go"); go.disabled = true;
      if (!state.sent) {
        var em = document.getElementById("email").value.trim().toLowerCase();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { go.disabled = false; return showLogin({ email: em, err: "Confira o e-mail digitado." }); }
        sb.auth.signInWithOtp({ email: em, options: { emailRedirectTo: appUrl(), shouldCreateUser: true } }).then(function (r) {
          if (r.error) {
            var m = /rate|seconds|limit/i.test(r.error.message) ? "Muitos pedidos seguidos. Espere um minutinho e tente de novo." : "Não deu para enviar agora. Tente de novo em instantes.";
            return showLogin({ email: em, err: m });
          }
          showLogin({ email: em, sent: true });
        });
      } else {
        var code = document.getElementById("code").value.replace(/\D/g, "");
        if (code.length < 6) { go.disabled = false; var lm = document.getElementById("lmsg"); lm.hidden = false; lm.className = "msg err"; lm.textContent = "Digite o código do e-mail."; return; }
        sb.auth.verifyOtp({ email: state.email, token: code, type: "email" }).then(function (r) {
          if (r.error) return showLogin({ email: state.email, sent: true, err: "Código inválido ou expirado. Confira ou peça outro." });
          boot();
        });
      }
    };
  }

  function boot() {
    sb.auth.getSession().then(function (r) {
      var s = r.data && r.data.session;
      if (!s) return showLogin();
      me.email = (s.user.email || "").toLowerCase();
      sb.rpc("is_teacher").then(function (t) { me.teacher = !!(t && t.data === true); route(); });
    });
  }
  sb.auth.onAuthStateChange(function (ev, s) {
    if (ev === "SIGNED_IN" && s && !me.email) boot();
    if (ev === "SIGNED_OUT") { me = { email: null, teacher: false }; showLogin(); }
  });
  function logout() { sb.auth.signOut().then(function () { me = { email: null, teacher: false }; location.hash = ""; showLogin(); }); }
  window.addEventListener("hashchange", function () { if (me.email) route(); });

  function route() {
    clearTimers();
    var m = location.hash.match(/^#\/aluno\/([0-9a-f-]{36})$/);
    if (me.teacher) return m ? openStudent(m[1]) : teacherHome();
    openMine();
  }

  /* ---------- Student panel ---------- */
  function topbar(inner) {
    return '<div class="topbar"><div class="wrap"><a class="brand" href="#"><img src="assets/icon-192.png" alt=""><span>Voice Your English</span></a>' + inner + '</div></div>';
  }
  function openMine() {
    root.innerHTML = '<div class="boot"><p>Carregando seu painel…</p></div>';
    sb.from("students").select("*").eq("active", true).limit(1).then(function (r) {
      var st = r.data && r.data[0];
      if (!st) {
        root.innerHTML = topbar('<button class="tb-btn" id="out">Sair</button>') +
          '<div class="wrap" style="padding-block:40px"><div class="empty-t"><b>Seu e-mail (' + esc(me.email) + ') ainda não está cadastrado.</b><br>Fale com a teacher pelo WhatsApp para liberar seu acesso.' +
          (C.whatsapp ? '<br><br><a class="tb-btn primary" href="https://wa.me/' + esc(C.whatsapp) + '" target="_blank" rel="noopener">Falar com a teacher</a>' : '') + '</div></div>';
        document.getElementById("out").onclick = logout; return;
      }
      mountPanel(st, false);
    });
  }
  function openStudent(id) {
    root.innerHTML = '<div class="boot"><p>Abrindo painel…</p></div>';
    sb.from("students").select("*").eq("id", id).single().then(function (r) {
      if (r.error || !r.data) { toast("Aluno não encontrado."); location.hash = ""; return; }
      mountPanel(r.data, true);
    });
  }

  function mountPanel(st, teacherView) {
    sb.from("progress").select("data").eq("student_id", st.id).maybeSingle().then(function (pr) {
      var prog = (pr.data && pr.data.data) || {};
      var saveT = null;
      var store = {
        getItem: function (k) { return prog[k] == null ? null : prog[k]; },
        setItem: function (k, v) {
          prog[k] = v;
          if (teacherView) return;
          clearTimeout(saveT);
          saveT = setTimeout(function () { sb.from("progress").upsert({ student_id: st.id, data: prog, updated_at: new Date().toISOString() }).then(function (r) { if (r.error) toast("Sem conexão: seu progresso será salvo quando voltar."); }); }, 700);
        },
        removeItem: function (k) { delete prog[k]; }
      };
      root.innerHTML = topbar(teacherView
        ? '<a class="tb-btn" href="#">← Alunos</a>'
        : '<button class="tb-btn" id="out">Sair</button>') +
        (teacherView ? '<div class="wrap"><p class="note-sm" style="margin:10px 0 0">Você está vendo o painel de <b>' + esc(st.name) + '</b>. Use “Editar dashboard” para mudar e depois “Publicar alterações”.</p></div>' : installHTML()) +
        '<div id="app"></div>';
      var out = document.getElementById("out"); if (out) out.onclick = logout;
      var ib = document.getElementById("installBtn"); if (ib) ib.onclick = function () { if (installEvt) { installEvt.prompt(); installEvt = null; ib.hidden = true; } };
      var ctx = {
        data: fixData(JSON.parse(JSON.stringify(st.data || {}))),
        teacher: teacherView,
        store: store,
        draftKey: "vye-draft-" + st.id,
        every: function (fn, ms) { timers.push(setInterval(fn, ms)); },
        save: function (D) {
          return sb.from("students").update({ data: D }).eq("id", st.id).then(function (r) { if (r.error) { var e = new Error(r.error.message); e.code = "save_failed"; throw e; } st.data = D; });
        },
        assets: teacherView ? {
          upload: function (file) {
            var path = st.id + "/" + Date.now() + "-" + file.name.replace(/[^\w.\-]+/g, "_");
            return sb.storage.from("materials").upload(path, file, { upsert: false, contentType: file.type }).then(function (r) {
              if (r.error) throw r.error;
              return { url: sb.storage.from("materials").getPublicUrl(path).data.publicUrl };
            });
          }
        } : null
      };
      window.VYEPanel.mount(ctx);
      current = { student: st, teacherView: teacherView, api: ctx.api };
      document.title = (st.name || "Aluno") + " · Voice Your English";
      window.scrollTo(0, 0);
    });
  }

  /* Links that used to open Tally forms now save straight to the app. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="tally.so/r/"]');
    if (!a || !current) return;
    e.preventDefault(); e.stopPropagation();
    if (current.teacherView) { toast("No modo professora o envio fica desativado."); return; }
    var u; try { u = new URL(a.href); } catch (err) { return; }
    var form = u.pathname.split("/").pop(), p = {};
    u.searchParams.forEach(function (v, k) { p[k] = v; });
    if (form === "5XXJEE") payModal(p, a.getAttribute("data-paysent") || p.ym);
    else if (form === "BEErLK") hwSubmit(p, a.getAttribute("data-hwdone"));
    else if (form === "X55pvd") selfModal(p);
  }, true);

  function submit(kind, ref, payload, file_path) {
    return sb.from("submissions").insert({ student_id: current.student.id, kind: kind, ref: ref || null, payload: payload || {}, file_path: file_path || null }).then(function (r) { if (r.error) throw r.error; });
  }
  function hwSubmit(p, id) {
    submit("homework", id || p.codigo, { licao: p.licao, codigo: p.codigo }).then(function () {
      if (current.api && id) current.api.markDone(id);
      toast("Pronto! A teacher já recebeu ✓");
    }).catch(function () { toast("Não deu para enviar. Confira a internet e tente de novo."); });
  }
  function payModal(p, ym) {
    ym = ym || ymNow();
    modal('<h2>Enviar comprovante</h2><p>Mensalidade de <b>' + esc(p.mes || monLabel(ym)) + '</b>' + (p.valor ? ' · ' + esc(p.valor) : '') + '</p>' +
      '<label class="file-drop" id="fd">📎 Toque para escolher o print ou PDF do Pix<input type="file" id="pf" accept="image/*,application/pdf"></label>' +
      '<label class="field">Recado (opcional)<textarea id="pm" rows="2" placeholder="Ex.: paguei duas mensalidades juntas"></textarea></label>' +
      '<div class="modal-acts"><button class="tb-btn" type="button" data-close>Cancelar</button><button class="tb-btn primary" type="button" id="ps">Enviar comprovante</button></div>',
      function (w, close) {
        var f = w.querySelector("#pf"), fd = w.querySelector("#fd"), b = w.querySelector("#ps");
        f.onchange = function () { if (f.files[0]) { fd.classList.add("has"); fd.firstChild.textContent = "✓ " + f.files[0].name + " "; } };
        b.onclick = function () {
          var file = f.files[0];
          if (!file) { toast("Escolha o comprovante primeiro."); return; }
          if (file.size > 10 * 1024 * 1024) { toast("Arquivo muito grande (máx. 10 MB)."); return; }
          b.disabled = true; b.textContent = "Enviando…";
          var path = current.student.id + "/" + ym + "-" + Date.now() + "-" + file.name.replace(/[^\w.\-]+/g, "_");
          sb.storage.from("receipts").upload(path, file, { contentType: file.type }).then(function (r) {
            if (r.error) throw r.error;
            return submit("payment", ym, { mes: p.mes || monLabel(ym), valor: p.valor || "", recado: w.querySelector("#pm").value.trim() }, path);
          }).then(function () {
            close(); if (current.api) current.api.markPay(ym); toast("Comprovante enviado! A teacher já consegue ver ✓", 4000);
          }).catch(function () { b.disabled = false; b.textContent = "Enviar comprovante"; toast("Não deu para enviar. Tente de novo."); });
        };
      });
  }
  function selfModal(p) {
    modal('<h2>Enviar autoavaliação</h2><p>' + esc(p.semestre || "") + ' · Seu resultado: <b>' + esc(p.resultado || "") + '</b></p>' +
      '<label class="field">O que você mais quer melhorar no próximo semestre? (opcional)<textarea id="sm" rows="3" placeholder="Ex.: falar sem travar, entender filmes…"></textarea></label>' +
      '<div class="modal-acts"><button class="tb-btn" type="button" data-close>Cancelar</button><button class="tb-btn primary" type="button" id="ss">Enviar para a teacher</button></div>',
      function (w, close) {
        var b = w.querySelector("#ss");
        b.onclick = function () {
          b.disabled = true;
          submit("selfeval", p.semestre, { semestre: p.semestre, resultado: p.resultado, detalhes: p.detalhes, recado: w.querySelector("#sm").value.trim() })
            .then(function () { close(); toast("Autoavaliação enviada ✓ A teacher vai preparar sua avaliação.", 4500); })
            .catch(function () { b.disabled = false; toast("Não deu para enviar. Tente de novo."); });
        };
      });
  }

  /* ---------- Teacher area ---------- */
  var KIND = { homework: "Lição feita", payment: "Comprovante de mensalidade", selfeval: "Autoavaliação", message: "Recado" };
  function payState(d) {
    var ym = ymNow(), pay = (d.payments || []).filter(function (x) { return x.month === ym; })[0];
    if (pay && pay.status === "pago") return '<span class="pill-s ok">' + esc(monLabel(ym).split(" ")[0]) + ' pago</span>';
    var day = parseInt(d.payDay, 10);
    if (day && new Date().getDate() > day) return '<span class="pill-s warn">' + esc(monLabel(ym).split(" ")[0]) + ' pendente</span>';
    return "";
  }
  function teacherHome() {
    current = null;
    document.title = "Teacher · Voice Your English";
    root.innerHTML = topbar('<button class="tb-btn primary" id="newSt">+ Aluno</button><button class="tb-btn" id="out">Sair</button>') +
      '<div class="wrap t-head"><p class="eyebrow">Voice Your English · Teacher</p><h1>Hi, <em>Sarah</em>!</h1><p class="lede">Seus alunos e tudo o que eles enviaram pelo app, em tempo real.</p></div>' +
      installHTML() +
      '<div class="wrap t-grid" style="padding-top:16px"><section class="t-sec"><h2>Novidades <span class="badge" id="nb" hidden></span></h2><div class="feed" id="feed"><div class="empty-t">Carregando…</div></div></section>' +
      '<section class="t-sec"><h2>Alunos</h2><div class="st-list" id="sts"><div class="empty-t">Carregando…</div></div></section></div>';
    document.getElementById("out").onclick = logout;
    document.getElementById("newSt").onclick = newStudentModal;
    var ib = document.getElementById("installBtn"); if (ib) ib.onclick = function () { if (installEvt) { installEvt.prompt(); installEvt = null; ib.hidden = true; } };
    loadStudents().then(loadFeed);
    timers.push(setInterval(loadFeed, 30000));
  }
  var stCache = {};
  function loadStudents() {
    return sb.from("students").select("id,name,email,active,data,updated_at").order("name").then(function (r) {
      var el = document.getElementById("sts"); if (!el) return;
      var L = r.data || [];
      L.forEach(function (s) { stCache[s.id] = s; });
      if (!L.length) { el.innerHTML = '<div class="empty-t">Nenhum aluno ainda. Toque em <b>+ Aluno</b> para cadastrar.</div>'; return; }
      el.innerHTML = L.map(function (s) {
        var d = s.data || {}, last = (d.lessons || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0];
        return '<div class="st-card"><span class="st-av" aria-hidden="true">' + esc(initials(s.name)) + '</span><div class="st-main"><b>' + esc(s.name) + payState(d) + (s.active ? "" : ' <span class="pill-s warn">inativo</span>') + '</b>' +
          '<small>' + esc((d.student && d.student.level) || "") + (last ? ' · última aula ' + esc(last.date.slice(8, 10) + "/" + last.date.slice(5, 7)) : "") + ' · ' + esc(s.email) + '</small></div>' +
          '<div class="st-acts"><a class="tb-btn primary" href="#/aluno/' + s.id + '">Abrir</a><button class="tb-btn" data-invite="' + s.id + '">Convite</button></div></div>';
      }).join("");
    });
  }
  function loadFeed() {
    sb.from("submissions").select("*, students(name)").order("created_at", { ascending: false }).limit(40).then(function (r) {
      var el = document.getElementById("feed"); if (!el) return;
      var L = r.data || [], unseen = L.filter(function (x) { return !x.seen; }).length;
      var nb = document.getElementById("nb"); if (nb) { nb.hidden = !unseen; nb.textContent = unseen + " nova" + (unseen === 1 ? "" : "s"); }
      if (!L.length) { el.innerHTML = '<div class="empty-t">Quando um aluno enviar lição, comprovante ou autoavaliação, aparece aqui.</div>'; return; }
      el.innerHTML = L.map(function (x) {
        var p = x.payload || {}, body = "", acts = "";
        if (x.kind === "homework") body = esc(p.licao || "") + (p.codigo && p.codigo.indexOf("acertou") > -1 ? ' · <b>' + esc(p.codigo.split("· ").pop()) + '</b>' : "");
        if (x.kind === "payment") { body = 'Mensalidade de <b>' + esc(p.mes || monLabel(x.ref)) + '</b>' + (p.valor ? ' · ' + esc(p.valor) : ""); if (x.file_path) acts += '<button class="tb-btn" data-receipt="' + esc(x.file_path) + '">Ver comprovante</button>'; var stc = stCache[x.student_id], paid = stc && ((stc.data || {}).payments || []).some(function (q) { return q.month === x.ref && q.status === "pago"; });
          acts += paid ? '<span class="pill-s ok" style="align-self:center">' + esc((p.mes || monLabel(x.ref)).split(" ")[0]) + ' pago ✓</span>' : '<button class="tb-btn primary" data-markpaid="' + x.id + '">Marcar ' + esc((p.mes || monLabel(x.ref)).split(" ")[0]) + ' como pago</button>'; }
        if (x.kind === "selfeval") body = esc(p.semestre || "") + ' · <b>' + esc(p.resultado || "") + '</b>';
        if (p.recado) body += '<br><i>“' + esc(p.recado) + '”</i>';
        if (!x.seen) acts += '<button class="tb-btn" data-seen="' + x.id + '">✓ Visto</button>';
        acts += '<a class="tb-btn" href="#/aluno/' + x.student_id + '">Abrir painel</a>';
        return '<div class="ev' + (x.seen ? "" : " new") + '"><div class="ev-h"><b>' + esc((x.students && x.students.name) || "Aluno") + '</b><small>' + fmtDT(x.created_at) + '</small></div><span class="kind">' + esc(KIND[x.kind] || x.kind) + '</span><p>' + body + '</p><div class="ev-acts">' + acts + '</div></div>';
      }).join("");
      loadFeed.rows = L;
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button"); if (!b || !me.teacher) return;
    if (b.dataset.seen) { b.disabled = true; sb.from("submissions").update({ seen: true }).eq("id", b.dataset.seen).then(loadFeed); }
    if (b.dataset.receipt) {
      sb.storage.from("receipts").createSignedUrl(b.dataset.receipt, 600).then(function (r) { if (r.data) window.open(r.data.signedUrl, "_blank", "noopener"); else toast("Não consegui abrir o arquivo."); });
    }
    if (b.dataset.markpaid) {
      var x = (loadFeed.rows || []).filter(function (r) { return r.id === b.dataset.markpaid; })[0]; if (!x) return;
      b.disabled = true;
      sb.from("students").select("data").eq("id", x.student_id).single().then(function (r) {
        var d = r.data.data || {}, ym = x.ref, pays = d.payments || [], day = String(parseInt(d.payDay, 10) || 15).padStart(2, "0");
        var it = pays.filter(function (q) { return q.month === ym; })[0];
        if (it) { it.status = "pago"; it.paidAt = x.created_at.slice(0, 10); }
        else pays.push({ id: "pay" + ym.replace("-", ""), month: ym, due: ym + "-" + day, status: "pago", paidAt: x.created_at.slice(0, 10) });
        d.payments = pays;
        return sb.from("students").update({ data: d }).eq("id", x.student_id);
      }).then(function () { return sb.from("submissions").update({ seen: true }).eq("id", x.id); })
        .then(function () { toast("Marcado como pago ✓"); return loadStudents().then(loadFeed); })
        .catch(function () { b.disabled = false; toast("Não deu para salvar."); });
    }
    if (b.dataset.invite) {
      var s = stCache[b.dataset.invite]; if (!s) return;
      var first = (s.name || "").split(" ")[0];
      var txt = "Oi, " + first + "! 😊 Seu painel de inglês agora é um app da Voice Your English.\n\n1. Abra: " + appUrl() + "\n2. Entre com o e-mail " + s.email + " e toque no link que chegar no seu e-mail.\n3. Para virar app no celular: no Android toque em \"Instalar\"; no iPhone, Compartilhar → Adicionar à Tela de Início.\n\nQualquer dúvida, me chama!";
      var ok = function () { toast("Convite copiado! Cole no WhatsApp do aluno."); };
      try { navigator.clipboard.writeText(txt).then(ok, function () { window.prompt("Copie o convite:", txt); }); } catch (err) { window.prompt("Copie o convite:", txt); }
    }
  });

  function newStudentModal() {
    modal('<h2>Novo aluno</h2><p>O aluno entra no app com este e-mail.</p>' +
      '<div class="grid2"><label class="field">Nome<input id="nn" required placeholder="Ex.: Maria Souza"></label><label class="field">E-mail<input id="ne" type="email" required placeholder="maria@email.com"></label></div>' +
      '<div class="grid2"><label class="field">Nível<select id="nl"><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option></select></label><label class="field">Horário<input id="nt" type="time" value="18:00"></label></div>' +
      '<div class="field">Dias de aula<div class="days">' + ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(function (d, i) { return '<label><input type="checkbox" value="' + i + '">' + d + '</label>'; }).join("") + '</div></div>' +
      '<label class="field">Link do Google Meet<input id="nm" placeholder="https://meet.google.com/..."></label>' +
      '<div class="grid2"><label class="field">Vencimento (dia)<input id="nd" inputmode="numeric" value="15"></label><label class="field">Mensalidade<input id="nv" placeholder="R$ 400,00"></label></div>' +
      '<div class="modal-acts"><button class="tb-btn" type="button" data-close>Cancelar</button><button class="tb-btn primary" type="button" id="nsave">Cadastrar</button></div>',
      function (w, close) {
        w.querySelector("#nsave").onclick = function () {
          var g = function (id) { return w.querySelector(id).value.trim(); };
          var name = g("#nn"), email = g("#ne").toLowerCase();
          if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { toast("Preencha nome e e-mail."); return; }
          var days = [].map.call(w.querySelectorAll(".days input:checked"), function (x) { return +x.value; });
          var btn = w.querySelector("#nsave"); btn.disabled = true;
          fetch("template.json").then(function (r) { return r.json(); }).then(function (T) {
            T.student = { name: name.split(" ")[0], course: "English Course", level: g("#nl"), days: days, time: g("#nt"), duration: "1h", meet: g("#nm") };
            T.payDay = g("#nd"); T.payValue = g("#nv"); T.payStart = ymNow();
            return sb.from("students").insert({ name: name, email: email, data: T }).select("id").single();
          }).then(function (r) {
            if (r.error) throw r.error;
            close(); toast("Aluno cadastrado ✓ Toque em Convite para mandar o acesso."); loadStudents();
          }).catch(function (err) { btn.disabled = false; toast(/duplicate|unique/i.test(String(err && err.message)) ? "Esse e-mail já está cadastrado." : "Não deu para cadastrar."); });
        };
      });
  }

  boot();
})();
