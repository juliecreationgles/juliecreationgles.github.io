/* APP.JS — construit l'en-tête, le pied de page, les formations, le planning
   et les formulaires à partir de data.js. Normalement, pas besoin d'y toucher. */
(function () {
  var S = window.SITE || {}, F = window.FORMATIONS || [], SE = window.SESSIONS || [];
  var missing = {};
  var LABELS = {
    ville: "ville", adresse: "adresse", cp: "code postal", email: "e-mail", tel: "téléphone", horaires: "horaires",
    siret: "SIRET", nda: "n° de déclaration d'activité", region_nda: "région d'enregistrement",
    assurance: "assurance RC Pro", hebergeur: "hébergeur du site", directeur_publication: "directeur de la publication",
    mediateur_nom: "nom du médiateur", mediateur_adresse: "adresse du médiateur", mediateur_site: "site du médiateur",
    referent_handicap: "référent handicap", acompte_pct: "% d'acompte", delai_paiement_solde: "délai de paiement du solde",
    delai_reponse: "délai de réponse", form_url: "lien Google Form", form_embed_url: "lien d'intégration du formulaire",
    rdv_url: "lien Google Agenda (RDV)", a_propos: "texte « À propos »", date_maj_legal: "date de mise à jour",
    qualiopi_num: "n° Qualiopi", forme: "forme juridique", tva: "mention TVA"
  };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function todo(label, key) { if (key) missing[key] = label; return '<mark class="todo">[' + esc(label) + ' à compléter]</mark>'; }
  function v(k) { var x = S[k]; return (x === undefined || x === null || x === "") ? todo(LABELS[k] || k, k) : esc(x); }
  function euro(n) { return n == null ? todo("tarif") : new Intl.NumberFormat("fr-FR").format(n) + " €"; }
  function nf(n) { return new Intl.NumberFormat("fr-FR").format(n) + " €"; }
  function fromPrice(f) {
    if (f.tarifs && f.tarifs.length) { var m = Math.min.apply(null, f.tarifs.map(function (t) { return t.prix; })); return (f.tarifs.length > 1 ? "À partir de " : "") + nf(m) + ""; }
    return euro(f.prix);
  }
  function tarifTable(f, choose) {
    var ch = choose && f.form_entry;
    if (!f.tarifs || !f.tarifs.length) return euro(f.prix);
    return '<div class="tablewrap"><table class="plan"><thead><tr><th>Formule</th><th>Tarif</th>' + (ch ? '<th></th>' : '') + '</tr></thead><tbody>' +
      f.tarifs.map(function (t, i) { return "<tr><td>" + esc(t.label) + "</td><td><strong>" + nf(t.prix) + "</strong></td>" + (ch ? "<td>" + (t.form ? '<a class="btn ghost" style="padding:8px 18px;white-space:nowrap" href="' + inscLink(f, i) + '">Choisir</a>' : "") + "</td>" : "") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function fdate(iso) { var d = new Date(iso + "T12:00:00"); return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); }
  function fperiod(a, b) {
    if (a === b) return fdate(a);
    var d1 = new Date(a + "T12:00:00"), d2 = new Date(b + "T12:00:00");
    if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear())
      return "Du " + d1.getDate() + " au " + fdate(b);
    return "Du " + fdate(a) + " au " + fdate(b);
  }
  function fById(id) { for (var i = 0; i < F.length; i++) if (F[i].id === id) return F[i]; return null; }
  /* lien tarif -> case pré-cochée dans le Google Form (form_entry / form dans data.js) */
  function inscLink(f, i) { return "inscription.html?f=" + encodeURIComponent(f.id) + "&t=" + i; }
  function picked() {
    var m = /[?&]f=([^&#]+)/.exec(location.search), n = /[?&]t=(\d+)/.exec(location.search);
    if (!m || !n) return null;
    var f = fById(decodeURIComponent(m[1])), t = f && f.tarifs && f.tarifs[+n[1]];
    return (f && f.form_entry && t && t.form) ? { f: f, t: t } : null;
  }
  function prefill(url) { var p = picked(); if (!url || !p) return url; return url + (url.indexOf("?") < 0 ? "?" : "&") + p.f.form_entry + "=" + encodeURIComponent(p.t.form); }
  function showPick(el) {
    var p = picked(); if (!p || document.getElementById("pick-note")) return;
    var n = document.createElement("div"); n.id = "pick-note"; n.className = "notice"; n.style.marginBottom = "16px";
    n.innerHTML = "Formule choisie : <strong>" + esc(p.f.titre) + " — " + esc(p.t.label) + "</strong>. La case correspondante est déjà cochée dans le formulaire.";
    el.parentNode.insertBefore(n, el);
  }
  var exBadge = '<span class="badge-ex">exemple à remplacer</span>';
  var page = (location.pathname.split("/").pop() || "index.html");

  /* ---------- en-tête ---------- */
  function header() {
    var items = [
      ["index.html", "Accueil"], ["formations.html", "Formations"], ["planning.html", "Planning"], ["tarifs.html", "Tarifs"], ["simulateur-de-devis.html", "Devis"],
      ["rendez-vous.html", "Rendez-vous téléphonique"], ["index.html#contact", "Contact"]
    ];
    var li = items.map(function (it) {
      var cur = (it[0] === page) ? ' aria-current="page"' : "";
      return '<li><a href="' + it[0] + '"' + cur + ">" + it[1] + "</a></li>";
    }).join("");
    li += '<li><a class="cta" href="inscription.html">Je m\'inscris</a></li>';
    return '<div class="topbar">Inscriptions ouvertes toute l\'année · <a href="rendez-vous.html">Besoin d\'en parler ? Réservez un rendez-vous téléphonique</a></div>' +
      '<header class="site"><div class="wrap nav">' +
      '<a class="logo" href="index.html">' + esc(S.nom || "Mon centre") + "<small>" + esc(S.baseline || "") + "</small></a>" +
      '<button class="burger" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>' +
      '<ul class="menu" id="menu">' + li + "</ul></div></header>";
  }

  /* ---------- pied de page ---------- */
  function footer() {
    var soc = [["instagram", "Instagram"], ["facebook", "Facebook"], ["tiktok", "TikTok"]].filter(function (x) { return S[x[0]]; })
      .map(function (x) { return '<li><a href="' + esc(S[x[0]]) + '" rel="noopener" target="_blank">' + x[1] + "</a></li>"; }).join("");
    var q = S.qualiopi ? '<p><strong>Qualiopi</strong> — certification qualité délivrée au titre de la catégorie : actions de formation. N° ' + v("qualiopi_num") + "</p>" : "";
    return '<footer class="site"><div class="wrap"><div class="fgrid">' +
      "<div><h4>" + esc(S.nom || "") + "</h4><p>" + esc(S.baseline || "") + "</p>" + q +
      "<p>SIRET " + v("siret") + "</p></div>" +
      "<div><h4>Contact</h4><p>" + v("adresse") + ", " + v("cp") + " " + v("ville") + "<br>" + v("email") + (S.tel ? "<br>" + esc(S.tel) : "") + "<br>" + v("horaires") + "</p></div>" +
      '<div><h4>Informations</h4><ul><li><a href="formations.html">Formations & programmes</a></li><li><a href="planning.html">Planning</a></li><li><a href="tarifs.html">Tarifs</a></li><li><a href="inscription.html">Inscription</a></li><li><a href="accessibilite.html">Accessibilité & handicap</a></li>' + soc + "</ul></div>" +
      '<div><h4>Informations légales</h4><ul><li><a href="mentions-legales.html">Mentions légales</a></li><li><a href="cgv.html">Conditions générales de vente</a></li><li><a href="confidentialite.html">Politique de confidentialité</a></li></ul>' +
      (S.mediateur_nom ? "<p style=\"margin-top:12px\"><strong>Médiation de la consommation</strong><br>" + v("mediateur_nom") + "<br>" + v("mediateur_adresse") + "<br>" + v("mediateur_site") + "</p>" : "") + "</div>" +
      '</div><div class="copy">© ' + new Date().getFullYear() + " " + esc(S.nom || "") + " — Tous droits réservés.</div></div></footer>";
  }

  /* ---------- cartes formations ---------- */
  function cards(limit) {
    return F.slice(0, limit || F.length).map(function (f) {
      return '<article class="card"><h3>' + esc(f.titre) + (f.exemple ? exBadge : "") + "</h3>" +
        '<div class="meta"><span class="badge">' + esc(f.format) + '</span><span class="badge">' + esc(f.duree) + "</span></div>" +
        "<p>" + esc(f.accroche) + '</p><div class="price">' + fromPrice(f) + '</div><div class="push"><a class="btn ghost" href="formations.html#' + f.id + '">Voir le programme</a></div></article>';
    }).join("");
  }

  /* ---------- détail des programmes ---------- */
  function detail() {
    return F.map(function (f, i) {
      var obj = (f.objectifs || []).map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("");
      function lst(a) { return "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
      function part(nom, t, a) { return a && a.length ? '<p class="jour-part">' + nom + (t ? " <span>(" + esc(t) + ")</span>" : "") + "</p>" + lst(a) : ""; }
      var prog = '<div class="jours">' + (f.programme || []).map(function (p) {
        if (p.contenu) return '<div class="jour"><h4>' + esc(p.jour) + "</h4><p>" + esc(p.contenu) + "</p></div>";
        return '<div class="jour"><h4>' + esc(p.jour) + "</h4>" + part("Matin", p.matin_titre, p.matin) + part("Après-midi", p.apresmidi_titre, p.apresmidi) + (p.items ? lst(p.items) : "") + (p.note ? '<p class="jour-note">' + esc(p.note) + "</p>" : "") + "</div>";
      }).join("") + "</div>";
      var res = [];
      if (f.taux_satisfaction) res.push("Taux de satisfaction : " + esc(f.taux_satisfaction));
      if (f.taux_reussite) res.push("Taux de réussite : " + esc(f.taux_reussite));
      var resHtml = res.length ? res.join(" · ") : 'Indicateurs en cours de collecte, publiés prochainement.';
      return '<details class="prog" id="' + f.id + '"' + "><summary><h3>" + esc(f.titre) + (f.exemple ? exBadge : "") + "</h3><span class=\"badge\">" + esc(f.duree) + "</span></summary>" +
        '<div class="prog-body"><p>' + esc(f.accroche) + "</p>" +
        '<dl class="fiche">' +
        "<div><dt>Durée</dt><dd>" + esc(f.duree) + "</dd></div><div><dt>Format</dt><dd>" + esc(f.format) + "</dd></div>" +
                "<div><dt>Public concerné</dt><dd>" + esc(f.public) + "</dd></div><div><dt>Prérequis</dt><dd>" + esc(f.prerequis) + "</dd></div>" +
        "<div><dt>Délai d'accès</dt><dd>" + esc(f.delai_acces) + "</dd></div><div><dt>Financements</dt><dd>" + esc(f.financements) + "</dd></div>" +
        "<div><dt>Accessibilité</dt><dd>" + esc(f.accessibilite) + "</dd></div></dl>" +
        "<h3>Tarifs </h3>" + tarifTable(f, true) + (f.prix_note ? "<p><small>" + esc(f.prix_note) + "</small></p>" : "") + "<h3>Objectifs</h3><ul>" + obj + "</ul><h3>Programme</h3>" + prog +
        "<h3>Méthodes pédagogiques</h3><p>" + esc(f.moyens) + "</p><h3>Évaluation</h3><p>" + esc(f.evaluation) + "</p>" +
        "<h3>Résultats</h3><p>" + resHtml + '</p><div class="btns"><a class="btn" href="' + (f.tarifs && f.tarifs.length === 1 ? inscLink(f, 0) : 'inscription.html') + '">Je m\'inscris</a><a class="btn ghost" href="rendez-vous.html">En parler au téléphone</a><a class="btn ghost" href="#ask">Poser ma question</a></div></div></details>';
    }).join("");
  }

  /* ---------- planning ---------- */
  function sessions(limit) {
    var today = new Date().toISOString().slice(0, 10);
    var list = SE.filter(function (s) { return s.fin >= today; }).sort(function (a, b) { return a.debut < b.debut ? -1 : 1; });
    if (limit) list = list.slice(0, limit);
    if (!list.length) return '<div class="notice"><strong>Aucune date n\'est publiée pour le moment.</strong></div>';
    var rows = list.map(function (s) {
      var f = fById(s.formation) || { titre: s.formation };
      var st = s.places <= 0 ? '<span class="badge complet">Complet</span>' : (s.places <= 2 ? '<span class="badge peu">Dernières places (' + s.places + ")</span>" : '<span class="badge ok">Places disponibles</span>');
      var act = s.places <= 0 ? '<a href="rendez-vous.html">Liste d\'attente</a>' : '<a class="btn ghost" style="padding:8px 18px" href="inscription.html">Réserver</a>';
      return "<tr><td><strong>" + esc(f.titre) + "</strong>" + (s.exemple ? exBadge : "") + "</td><td>" + fperiod(s.debut, s.fin) + "</td><td>" + (s.lieu ? esc(s.lieu) : todo("lieu")) + "</td><td>" + st + "</td><td>" + act + "</td></tr>";
    }).join("");
    return '<div class="tablewrap"><table class="plan"><thead><tr><th>Formation</th><th>Dates</th><th>Lieu</th><th>Disponibilité</th><th></th></tr></thead><tbody>' + rows + "</tbody></table></div>";
  }

  /* ---------- stats / avis ---------- */
  function stats() {
    if (!S.stats || !S.stats.length) return "";
    return '<section class="dark"><div class="wrap"><div class="stats">' + S.stats.map(function (s) { return '<div class="stat"><b>' + esc(s.valeur) + "</b><span>" + esc(s.label) + "</span></div>"; }).join("") + "</div></div></section>";
  }
  function avis() {
    if (!S.avis || !S.avis.length) return "";
    return '<section class="alt"><div class="wrap"><div class="center"><span class="eyebrow">Ce qu\'elles en disent</span><h2>Avis des stagiaires</h2></div><div class="cards">' +
      S.avis.map(function (a) { return '<div class="card"><p>« ' + esc(a.texte) + ' »</p><p><strong>' + esc(a.auteur) + "</strong><br><small>" + esc(a.date || "") + "</small></p></div>"; }).join("") + "</div></div></section>";
  }

  /* ---------- intégrations Google (chargées seulement au clic : vie privée) ---------- */
  function embeds() {
    var els = document.querySelectorAll("[data-embed]");
    Array.prototype.forEach.call(els, function (el) {
      var key = el.getAttribute("data-embed"), link = el.getAttribute("data-link"), label = el.getAttribute("data-label") || "Afficher";
      var src = S[key], url = S[link] || src;
      if (key === "form_embed_url") { src = prefill(src); url = prefill(url); showPick(el); }
      if (!src && !url) { el.innerHTML = "<p>" + todo(LABELS[key] || key, key) + "</p><p><small>Une fois ce lien ajouté dans data.js, le service s'affichera ici.</small></p>"; return; }
      var html = "";
      if (src) html += '<p>Pour protéger votre vie privée, ce service Google ne se charge qu\'après votre clic.</p><button class="btn" type="button">' + esc(label) + "</button> ";
      if (url) html += '<a class="btn ghost" href="' + esc(url) + '" target="_blank" rel="noopener">Ouvrir dans un nouvel onglet</a>';
      el.innerHTML = html;
      var b = el.querySelector("button"); if (b && el.hasAttribute("data-autoload")) setTimeout(function () { b.click(); }, 0);
      if (b) b.addEventListener("click", function () { el.classList.add("ready"); el.innerHTML = '<iframe src="' + esc(src) + '" title="' + esc(label) + '" loading="lazy"></iframe>'; });
    });
  }

  /* ---------- assemblage ---------- */
  /* ---------- page tarifs ---------- */
  function tarifsAll() {
    return F.map(function (f) {
      return '<div class="tarif-bloc" id="tarif-' + f.id + '" style="margin-bottom:44px"><h2>' + esc(f.titre) + "</h2>" +
        '<div class="meta" style="margin-bottom:14px"><span class="badge">' + esc(f.format) + '</span><span class="badge">' + esc(f.duree) + "</span></div>" +
        tarifTable(f, true) + (f.prix_note ? "<p><small>" + esc(f.prix_note) + "</small></p>" : "") +
        '<div class="btns"><a class="btn ghost" href="formations.html#' + f.id + '">Voir le programme</a><a class="btn" href="' + (f.tarifs && f.tarifs.length === 1 ? inscLink(f, 0) : 'inscription.html') + '">Je m\'inscris</a><a class="btn ghost" href="#ask">Poser ma question</a></div></div>';
    }).join("");
  }
  function mount() {
    var h = document.getElementById("site-header"); if (h) h.outerHTML = header();
    var f = document.getElementById("site-footer"); if (f) f.outerHTML = footer();
    var map = { "cards-all": function () { return cards(); }, "cards-3": function () { return cards(3); }, "detail": detail, "sessions-all": function () { return sessions(); }, "sessions-3": function () { return sessions(3); }, "stats": stats, "avis": avis, "tarifs-all": tarifsAll };
    Object.keys(map).forEach(function (id) { var el = document.querySelector('[data-render="' + id + '"]'); if (el) el.innerHTML = map[id](); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-site]"), function (el) { var k = el.getAttribute("data-site"); el.innerHTML = (k === "a_propos" && S.a_propos) ? S.a_propos : v(k); });
    var socials = document.querySelector("[data-socials]");
/* médiation : masquée tant que le médiateur n'est pas renseigné dans data.js */
if (!S.mediateur_nom) {
var gone = 0;
Array.prototype.forEach.call(document.querySelectorAll("main h2"), function (h) {
var m = /^(\d+)\.\s/.exec(h.textContent);
if (gone && m) h.textContent = h.textContent.replace(/^\d+/, String(+m[1] - gone));
if (/Médiation/.test(h.textContent) && !h.hasAttribute("data-gone")) {
var n = h.nextElementSibling;
while (n && n.tagName !== "H2") { var nx = n.nextElementSibling; n.remove(); n = nx; }
h.remove(); gone++;
}
});
}
    embeds();
    var burger = document.querySelector(".burger"), menu = document.getElementById("menu");
    if (burger) burger.addEventListener("click", function () { var o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
    if (/[?&]check=1/.test(location.search)) {
      var keys = Object.keys(missing);
      var p = document.createElement("div"); p.id = "checkpanel";
      p.innerHTML = "<h4>À compléter (" + keys.length + ")</h4><ul>" + keys.map(function (k) { return "<li>" + esc(LABELS[k] || k) + " <small>(" + k + ")</small></li>"; }).join("") + "</ul>" +
        "<p><small>Liste pour cette page. Voir A-COMPLETER.md pour la liste complète.</small></p>";
      document.body.appendChild(p);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();


/* === Encart « Poser ma question » + lien simulateur === */
(function () {
  var FORM = "https://docs.google.com/forms/d/e/1FAIpQLSes4HvZyrk6K3CihgGZ4PLRGnjj5B165DREIntUnr0fi4nHTg/formResponse";
  var E = { prenom: "entry.1453383954", mail: "entry.2032733479", q: "entry.1870630926" };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function start() {
    var tries = 0;
    var iv = setInterval(function () {
      var foot = document.querySelector("footer");
      tries++;
      if (!foot && tries < 40) return;
      clearInterval(iv);
      if (!foot) return;
      var page = location.pathname;
      var a = foot.querySelector('a[href$="inscription.html"]');
      if (a && !foot.querySelector('a[href$="simulateur-de-devis.html"]')) {
        var host = a.closest("li") || a;
        var n = host.cloneNode(true);
        var na = n.tagName === "A" ? n : n.querySelector("a");
        na.setAttribute("href", "simulateur-de-devis.html");
        na.textContent = "Simulateur de devis";
        host.parentNode.insertBefore(n, host.nextSibling);
      }
      if (/inscription|simulateur/.test(page) || document.getElementById("ask")) return;
      var d = (window.SITE && window.SITE.delai_reponse) || "sous 48 h";
      var s = document.createElement("section");
      s.id = "ask";
      s.innerHTML =
        '<style>' +
        '#ask{background:var(--creme2,#F3EBE0);padding:3rem 1.25rem}' +
        '#ask .box{max-width:720px;margin:0 auto;background:#fff;border:1px solid rgba(201,169,110,.45);border-radius:var(--rayon,18px);padding:2rem 1.6rem;box-shadow:0 8px 30px rgba(26,18,16,.06)}' +
        '#ask h2{font-family:var(--serif,"Cormorant Garamond",serif);font-weight:500;font-size:2rem;margin:.2rem 0 .6rem;color:var(--noir,#1A1210)}' +
        '#ask .eyebrow{color:var(--or-fonce,#a98a4f);letter-spacing:.18em;text-transform:uppercase;font-size:.75rem}' +
        '#ask p.lead{margin:0 0 1.2rem;color:#4a3f3a;line-height:1.6}' +
        '#ask .row{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}' +
        '@media(max-width:600px){#ask .row{grid-template-columns:1fr}}' +
        '#ask label{display:block;font-size:.85rem;margin:.7rem 0 .25rem;color:#4a3f3a}' +
        '#ask input,#ask textarea{width:100%;box-sizing:border-box;font:inherit;padding:.7rem .8rem;border:1px solid #d9cdb8;border-radius:12px;background:var(--creme,#FAF5EC)}' +
        '#ask input:focus,#ask textarea:focus{outline:2px solid var(--or,#C9A96E);border-color:var(--or,#C9A96E)}' +
        '#ask textarea{min-height:130px;resize:vertical}' +
        '#ask .hp{position:absolute;left:-9999px;height:0;overflow:hidden}' +
        '#ask button{margin-top:1.1rem;cursor:pointer}' +
        '#ask .msg{margin-top:1rem;padding:.9rem 1rem;border-radius:12px;font-size:.95rem}' +
        '#ask .ok{background:#eef6ea;color:#2f5a22}#ask .ko{background:#fbeceb;color:#8a2a22}' +
        '</style>' +
        '<div class="box"><span class="eyebrow">Une question ?</span><h2>Poser ma question</h2>' +
        '<p class="lead">Une hésitation, une question ? Je suis là pour vous aider : écrivez-moi ici et je vous réponds ' + esc(d) + '.</p>' +
        '<form id="askf" novalidate><div class="row"><div><label for="ask-p">Prénom</label><input id="ask-p" autocomplete="given-name"></div>' +
        '<div><label for="ask-m">Votre e-mail *</label><input id="ask-m" type="email" autocomplete="email" required></div></div>' +
        '<label for="ask-q">Votre question *</label><textarea id="ask-q" required></textarea>' +
        '<div class="hp" aria-hidden="true"><label>Ne pas remplir <input id="ask-h" tabindex="-1" autocomplete="off"></label></div>' +
        '<button class="btn" type="submit">Envoyer ma question</button><div id="ask-msg" role="status"></div></form></div>';
      var ct = document.getElementById("contact");
      if (ct) ct.parentNode.insertBefore(s, ct); else foot.parentNode.insertBefore(s, foot);
      if (ct && location.hash === "#contact") setTimeout(function () { ct.scrollIntoView(); }, 0);
      var form = s.querySelector("#askf"), msg = s.querySelector("#ask-msg");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var m = s.querySelector("#ask-m").value.trim(), q = s.querySelector("#ask-q").value.trim();
        if (s.querySelector("#ask-h").value) return;
        if (!/^\S+@\S+\.\S+$/.test(m) || !q) { msg.className = "msg ko"; msg.textContent = "Merci d’indiquer un e-mail valide et votre question."; return; }
        var P = new URLSearchParams();
        P.append(E.prenom, s.querySelector("#ask-p").value.trim());
        P.append(E.mail, m);
        P.append(E.q, q);
        var btn = form.querySelector("button"); btn.disabled = true;
        fetch(FORM, { method: "POST", mode: "no-cors", body: P }).then(function () {
          form.reset(); msg.className = "msg ok";
          msg.textContent = "Merci, votre question est bien envoyée ! Je vous réponds " + d + ".";
          btn.disabled = false;
        }).catch(function () {
          msg.className = "msg ko"; msg.textContent = "Oups, l’envoi a échoué. Réessayez dans un instant."; btn.disabled = false;
        });
      });
    }, 50);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();


/* Bouton « Poser ma question » dans l'en-tête de la page d'accueil */
(function () {
  function go() {
    if (/inscription|simulateur/.test(location.pathname)) return;
    if (/(^|\/)(index\.html)?$/.test(location.pathname)) return; /* pas sur la page d'accueil */
    var hero = document.querySelector("main .btns");
    if (!hero || hero.querySelector('a[href="#ask"]')) return;
    if (!hero.querySelector('a[href$="inscription.html"]')) return;
    var a = document.createElement("a");
    a.className = "btn ghost";
    a.href = "#ask";
    a.textContent = "Poser ma question";
    a.addEventListener("click", function (e) {
      var t = document.getElementById("ask");
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
    hero.appendChild(a);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(go, 0); }); else setTimeout(go, 0);
})();

/* Inscription : coche la formule choisie sur la page Tarifs (bouton « Choisir ») */
(function () {
  var NAMES = { "base": "bases", "popit": "popit", "perfectionnement": "perf", "perfectionnement-prive": "coach", "amandes-russes": "amandes" };
  function go() {
    if (!/inscription/.test(location.pathname)) return;
    var m = /[?&]f=([^&#]+)/.exec(location.search), n = /[?&]t=(\d+)/.exec(location.search);
    if (!m || !n) return;
    var id = decodeURIComponent(m[1]), name = NAMES[id], tries = 0;
    if (!name) return;
    var iv = setInterval(function () {
      var box = document.querySelector('main form input[type="checkbox"][name="' + name + '"][value="' + n[1] + '"]');
      if (!box && ++tries < 40) return;
      clearInterval(iv);
      if (!box) return;
      if (!box.checked) { box.checked = true; box.dispatchEvent(new Event("input", { bubbles: true })); box.dispatchEvent(new Event("change", { bubbles: true })); }
      var F = window.FORMATIONS || [], f = null, i;
      for (i = 0; i < F.length; i++) if (F[i].id === id) f = F[i];
      var t = f && f.tarifs && f.tarifs[+n[1]], form = box.closest("form");
      if (f && t && form && !document.getElementById("pick-note")) {
        var note = document.createElement("div"); note.id = "pick-note"; note.className = "notice"; note.style.marginBottom = "16px";
        note.textContent = "Formule choisie : " + f.titre + " — " + t.label + ". Elle est déjà cochée dans le bulletin ci-dessous.";
        form.parentNode.insertBefore(note, form);
      }
    }, 50);
  }
  /* pick-box */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go); else go();
})();

/* Programmes : tous fermés ; celui visé par un lien (#id) s'ouvre */
(function () {
  function ouvrir() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var d = document.getElementById(id);
    if (d && d.tagName === "DETAILS") { d.open = true; d.scrollIntoView(); }
  }
  window.addEventListener("hashchange", ouvrir);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(ouvrir, 0); }); else setTimeout(ouvrir, 0);
})();
