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
  function tarifTable(f) {
    if (!f.tarifs || !f.tarifs.length) return euro(f.prix);
    return '<div class="tablewrap"><table class="plan"><thead><tr><th>Formule</th><th>Tarif</th><th>Si financement CPF</th></tr></thead><tbody>' +
      f.tarifs.map(function (t) { return "<tr><td>" + esc(t.label) + "</td><td><strong>" + nf(t.prix) + "</strong></td><td>" + (t.cpf ? nf(t.cpf) : "—") + "</td></tr>"; }).join("") + "</tbody></table></div>";
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
  var exBadge = '<span class="badge-ex">exemple à remplacer</span>';
  var page = (location.pathname.split("/").pop() || "index.html");

  /* ---------- en-tête ---------- */
  function header() {
    var items = [
      ["index.html", "Accueil"], ["formations.html", "Formations"], ["planning.html", "Planning"],
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
      "<p>SIRET " + v("siret") + "<br>N° de déclaration d'activité " + v("nda") + "</p></div>" +
      "<div><h4>Contact</h4><p>" + v("adresse") + ", " + v("cp") + " " + v("ville") + "<br>" + v("email") + (S.tel ? "<br>" + esc(S.tel) : "") + "<br>" + v("horaires") + "</p></div>" +
      '<div><h4>Informations</h4><ul><li><a href="formations.html">Formations & programmes</a></li><li><a href="planning.html">Planning</a></li><li><a href="inscription.html">Inscription</a></li><li><a href="accessibilite.html">Accessibilité & handicap</a></li>' + soc + "</ul></div>" +
      '<div><h4>Informations légales</h4><ul><li><a href="mentions-legales.html">Mentions légales</a></li><li><a href="cgv.html">Conditions générales de vente</a></li><li><a href="confidentialite.html">Politique de confidentialité</a></li></ul>' +
      "<p style=\"margin-top:12px\"><strong>Médiation de la consommation</strong><br>" + v("mediateur_nom") + "<br>" + v("mediateur_adresse") + "<br>" + v("mediateur_site") + "</p></div>" +
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
      var prog = (f.programme || []).map(function (p) { return "<li><strong>" + esc(p.jour) + " :</strong> " + esc(p.contenu) + "</li>"; }).join("");
      var res = [];
      if (f.taux_satisfaction) res.push("Taux de satisfaction : " + esc(f.taux_satisfaction));
      if (f.taux_reussite) res.push("Taux de réussite : " + esc(f.taux_reussite));
      var resHtml = res.length ? res.join(" · ") : '<mark class="todo">[résultats à communiquer dès qu\'ils sont mesurés]</mark>';
      return '<details class="prog" id="' + f.id + '"' + (i === 0 ? " open" : "") + "><summary><h3>" + esc(f.titre) + (f.exemple ? exBadge : "") + "</h3><span class=\"badge\">" + esc(f.duree) + "</span></summary>" +
        '<div class="prog-body"><p>' + esc(f.accroche) + "</p>" +
        '<dl class="fiche">' +
        "<div><dt>Durée</dt><dd>" + esc(f.duree) + "</dd></div><div><dt>Format</dt><dd>" + esc(f.format) + "</dd></div>" +
                "<div><dt>Public concerné</dt><dd>" + esc(f.public) + "</dd></div><div><dt>Prérequis</dt><dd>" + esc(f.prerequis) + "</dd></div>" +
        "<div><dt>Délai d'accès</dt><dd>" + esc(f.delai_acces) + "</dd></div><div><dt>Financements</dt><dd>" + esc(f.financements) + "</dd></div>" +
        "<div><dt>Accessibilité</dt><dd>" + esc(f.accessibilite) + "</dd></div></dl>" +
        "<h3>Tarifs </h3>" + tarifTable(f) + (f.prix_note ? "<p><small>" + esc(f.prix_note) + "</small></p>" : "") + "<h3>Objectifs</h3><ul>" + obj + "</ul><h3>Programme</h3><ul>" + prog + "</ul>" +
        "<h3>Méthodes pédagogiques</h3><p>" + esc(f.moyens) + "</p><h3>Évaluation</h3><p>" + esc(f.evaluation) + "</p>" +
        "<h3>Résultats</h3><p>" + resHtml + '</p><div class="btns"><a class="btn" href="inscription.html">Je m\'inscris</a><a class="btn ghost" href="rendez-vous.html">En parler au téléphone</a></div></div></details>';
    }).join("");
  }

  /* ---------- planning ---------- */
  function sessions(limit) {
    var today = new Date().toISOString().slice(0, 10);
    var list = SE.filter(function (s) { return s.fin >= today; }).sort(function (a, b) { return a.debut < b.debut ? -1 : 1; });
    if (limit) list = list.slice(0, limit);
    if (!list.length) return '<div class="notice"><strong>Aucune date n\'est publiée pour le moment.</strong> Écrivez-nous ou prenez un rendez-vous téléphonique : de nouvelles sessions sont régulièrement ouvertes.</div>';
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
      if (!src && !url) { el.innerHTML = "<p>" + todo(LABELS[key] || key, key) + "</p><p><small>Une fois ce lien ajouté dans data.js, le service s'affichera ici.</small></p>"; return; }
      var html = "";
      if (src) html += '<p>Pour protéger votre vie privée, ce service Google ne se charge qu\'après votre clic.</p><button class="btn" type="button">' + esc(label) + "</button> ";
      if (url) html += '<a class="btn ghost" href="' + esc(url) + '" target="_blank" rel="noopener">Ouvrir dans un nouvel onglet</a>';
      el.innerHTML = html;
      var b = el.querySelector("button");
      if (b) b.addEventListener("click", function () { el.classList.add("ready"); el.innerHTML = '<iframe src="' + esc(src) + '" title="' + esc(label) + '" loading="lazy"></iframe>'; });
    });
  }

  /* ---------- assemblage ---------- */
  function mount() {
    var h = document.getElementById("site-header"); if (h) h.outerHTML = header();
    var f = document.getElementById("site-footer"); if (f) f.outerHTML = footer();
    var map = { "cards-all": function () { return cards(); }, "cards-3": function () { return cards(3); }, "detail": detail, "sessions-all": function () { return sessions(); }, "sessions-3": function () { return sessions(3); }, "stats": stats, "avis": avis };
    Object.keys(map).forEach(function (id) { var el = document.querySelector('[data-render="' + id + '"]'); if (el) el.innerHTML = map[id](); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-site]"), function (el) { el.innerHTML = v(el.getAttribute("data-site")); });
    var socials = document.querySelector("[data-socials]");
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
