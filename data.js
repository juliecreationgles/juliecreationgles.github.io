/* =====================================================================
   DATA.JS — LE SEUL FICHIER À MODIFIER POUR METTRE À JOUR LE SITE
   (tarifs, programmes, planning, coordonnées, liens, mentions légales)

   Règle : tout champ laissé vide ("") apparaît en jaune « [à compléter] »
   sur le site. Ajoutez ?check=1 à l'adresse d'une page (ex. index.html?check=1)
   pour voir la liste de tout ce qui reste à remplir.
   ===================================================================== */

window.SITE = {
  /* ---------- IDENTITÉ ---------- */
  nom: "Julie Créationgles",               // nom commercial (celui de son Booksy)
  prenom: "Julie",
  baseline: "Formations en prothésie ongulaire",
  ville: "La Fare-les-Oliviers",
  adresse: "55 Av. des Puisatiers",
  cp: "13580",
  email: "formation.juliecreationgles@gmail.com",
  tel: "06 80 22 50 08",
  horaires: "Sur rendez-vous, 9h-17h",

  /* ---------- LÉGAL (mentions légales) ---------- */
  forme: "Entrepreneur individuel (micro-entreprise)",   // à confirmer
  siret: "522 448 091 00028",
  nda: "93132000613",
  region_nda: "Provence-Alpes-Côte d'Azur",
  tva: "TVA non applicable, article 293 B du Code général des impôts",   // confirmé : pas de TVA
  assurance: "",                          // ex. "RC Pro - nom de l'assureur, n° de contrat" (facultatif)
  directeur_publication: "Julie Zobel",
  hebergeur: "Site hébergé par GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  qualiopi: false,                        // passer à true SEULEMENT si elle est certifiée Qualiopi
  qualiopi_num: "",
  date_maj_legal: "23/11/2026",

  /* ---------- MÉDIATEUR DE LA CONSOMMATION (obligatoire pour les particuliers) ---------- */
  mediateur_nom: "",
  mediateur_adresse: "",
  mediateur_site: "",

  /* ---------- HANDICAP ---------- */
  referent_handicap: "Julie Zobel (formatrice)",

  /* ---------- CONDITIONS ---------- */
  acompte_pct: "",                        // ex. "30"
  delai_retractation_jours: "10",         // contrat de formation signé avec un particulier
  delai_paiement_solde: "",               // ex. "au plus tard le premier jour de la formation"
  delai_reponse: "sous 48 h",                      // ex. "sous 48 h ouvrées"

  /* ---------- LIENS (à créer par Julie, tout est gratuit) ---------- */
  form_url: "https://docs.google.com/forms/d/e/1FAIpQLSf359fmJnEunw0QHTfEWp3EVXIY7nTO6SdJQzg-3DhQitSZ2Q/viewform",             // lien du Google Form d'inscription (« Envoyer > lien »)
  form_embed_url: "https://docs.google.com/forms/d/e/1FAIpQLSf359fmJnEunw0QHTfEWp3EVXIY7nTO6SdJQzg-3DhQitSZ2Q/viewform?embedded=true",       // lien d'intégration du formulaire (« Envoyer > < > intégrer » : l'adresse après src=)
  rdv_url: "https://calendar.app.google/MR1W8x9pdVdgkJM3A",              // lien de la page de réservation Google Agenda (RDV téléphonique)
  rdv_embed_url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ38p1T2T-eZYaJdIhm-vNgGmbeigZxIJErSFffQ5PJcBSzEjbCZJXvCrbyfIwWgrb40FtNaPFDA?gv=true",        // même adresse, version « intégrer » (facultatif : sinon le bouton ouvre le lien)
  planning_sheet_url: "",   // facultatif : Google Sheet publié sur le web pour afficher un planning vivant
  instagram: "", facebook: "", tiktok: "",

  /* ---------- TEXTES ---------- */
  a_propos: "<p>Prothésiste ongulaire et formatrice passionnée depuis plus de 8 ans, je prends plaisir à transmettre mon savoir et mes connaissances lors de mes formations : bases initiales, perfectionnements de groupe, coaching privé ou duo, amandes russes.</p><p>Ma passion ne s'arrête pas là : j'ai commencé la compétition internationale il y a 3 ans, avec 12 médailles à mon actif (3 d'or, 5 d'argent, 4 de bronze) et 2 coupes avec ma team ALMAS. Je suis aussi ambassadrice de la marque ALMAS et je dispose d'un point de vente sur place.</p><p>Pour garder la qualité de mes formations, les groupes sont limités à 4 élèves maximum.</p>",             // 2-3 paragraphes de présentation (parcours, approche pédagogique)
  accroche_hero: "Apprenez la prothésie ongulaire avec passion.",

  /* ---------- CHIFFRES CLÉS (n'affichez QUE des chiffres réels et vérifiables) ----------
     ex. { valeur: "120", label: "stagiaires formées" }, { valeur: "98%", label: "de satisfaction" }  */
  stats: [{ valeur: "8 ans +", label: "d'expérience" }, { valeur: "12", label: "médailles en compétition internationale" }, { valeur: "4 max", label: "élèves par session" }],

  /* ---------- AVIS (vrais avis uniquement) ----------
     ex. { texte: "…", auteur: "Prénom · Formation Bases", date: "Mars 2026" }  */
  avis: []
};

/* =====================================================================
   FORMATIONS — programmes fournis par Julie (23/11/2026).
   programme : une entrée par jour, dans l'ordre. matin / apresmidi = listes,
   matin_titre / apresmidi_titre = thème facultatif, items = liste simple, note = phrase facultative.
   tarifs = liste de formules ; cpf = tarif si financement CPF (facultatif).
   ===================================================================== */
window.FORMATIONS = [
  {
    id: "base",
    titre: "Formation de base — Initial",
    accroche: "Une formation de base très complète : vous travaillez sur vous et sur modèle.",
    format: "Présentiel",
    duree: "5 jours en groupe, 3 jours en duo ou en privé (7 h par jour)",
    tarifs: [
      { label: "En groupe de 4 élèves max (5 jours)", prix: 1190, cpf: 2500 },
      { label: "En duo (3 jours) — par élève", prix: 1190, cpf: 2500 },
      { label: "En privé (3 jours)", prix: 1610, cpf: 3000 }
    ],
    prix_note: "Tarif par élève. En duo et en privé, le programme est identique mais concentré sur 3 jours, sans le jour d'examen. En duo, c'est à vous de trouver votre binôme.",
    public: "Toute personne souhaitant apprendre la prothésie ongulaire, se remettre à niveau ou perfectionner ses techniques selon les tendances actuelles. Débutantes acceptées.",
    prerequis: "Aucun niveau requis.",
    objectifs: [
      "Maîtriser la théorie du métier : cycle de vie de l'ongle, hygiène et maladies, règles et obligations, chimie des produits",
      "Réaliser une pose complète au chablon, à la capsule, au Popit plein et au Popit extension",
      "Réaliser dépose, gainage, remplissage, baby-boomer et french",
      "Connaître les démarches et les aides pour créer votre entreprise"
    ],
    programme: [
      { jour: "Jour 1",
        matin: ["9 h : accueil des élèves", "Présentation des élèves et de la formatrice", "Liste du matériel pour débuter", "Cycle de vie de l'ongle", "Hygiène et maladies de l'ongle", "Les règles du métier et les obligations", "Les termes techniques", "La chimie de nos produits"],
        apresmidi: ["La dépose, maîtrise de la ponceuse", "La préparation de l'ongle naturel", "La manucure profonde", "La pose du VSP", "Le gainage / renfort à la Rubber base", "La forme ovale", "Démo + entraînement sur soi"] },
      { jour: "Jour 2",
        matin: ["La pose complète au chablon", "La forme carrée", "La méthode sans limage", "Démo + entraînement sur soi"],
        apresmidi: ["La pose complète à la capsule", "La forme amande", "La méthode sans limage", "La pose de la couleur avec précision (façon manucure russe)", "Démo + entraînement sur soi"] },
      { jour: "Jour 3",
        matin: ["La pose complète au Popit plein", "La forme coffin / ballerine", "Le baby-boomer en incrustations", "Les proportions de la French idéale", "Démo + entraînement sur soi"],
        apresmidi: ["La pose complète au Popit extension", "Forme au choix", "La méthode sans limage", "Le baby-boomer (2e méthode)", "Démo + entraînement sur soi"] },
      { jour: "Jour 4",
        matin: ["Les démarches et les aides pour la création de votre entreprise", "Le comblage / remplissage", "Apprentissage de quelques décos à réaliser en clientèle", "Démo + entraînement sur soi ou sur capsule"],
        apresmidi: ["Entraînement libre", "Révision de l'examen théorique sous forme de quiz"] },
      { jour: "Jour 5",
        matin: ["9 h : examen théorique (durée : 1 h)", "10 h : début de l'épreuve pratique sur modèle (durée : 5 h). C'est à vous de trouver votre modèle.", "Votre modèle déjeunera avec vous et devra être disponible jusqu'à 16 h environ.", "Elle devra arriver les ongles nus et sans vernis, même transparent."] },
      { jour: "Fin de formation",
        items: ["Remise du certificat", "Mes conseils individuels sur vos tarifs à appliquer après la formation", "La prise de photos", "Code promo Almas de 12 %"] }
    ],
    moyens: "Alternance de théorie et de pratique (démonstrations, entraînement sur soi, sur capsule et sur modèle). Groupes de 4 élèves maximum.",
    evaluation: "En groupe : examen théorique (1 h) et épreuve pratique sur modèle (5 h) le 5e jour. Remise du certificat en fin de formation.",
    delai_acces: "Autofinancement : inscription au plus tard 1 semaine avant le début de la formation. Financement CPF : inscription au plus tard 3 semaines avant.",
    accessibilite: "Locaux accessibles aux personnes en situation de handicap. Pour toute adaptation, contactez le référent handicap avant l'inscription.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
    taux_satisfaction: null,
    taux_reussite: null
  },
  {
    id: "perfectionnement",
    titre: "Perfectionnement en groupe",
    accroche: "Deux journées au programme bien défini pour revoir toutes les méthodes de rallongement : Popit plein, Popit extension, chablon et capsule.",
    format: "Présentiel, en groupe de 4 élèves max",
    duree: "2 jours (7 h par jour)",
    tarifs: [
      { label: "En groupe (2 jours, 4 élèves max)", prix: 550, cpf: 1500 }
    ],
    prix_note: "Tarif par élève.",
    public: "Prothésistes ongulaires en exercice qui souhaitent consolider leur technique et se perfectionner.",
    prerequis: "Niveau base recommandé.",
    objectifs: [
      "Identifier et corriger vos points faibles",
      "Revoir toutes les méthodes de rallongement : Popit plein, Popit extension, chablon, capsule",
      "Gagner en précision et en qualité de finition"
    ],
    programme: [
      { jour: "Jour 1",
        matin_titre: "Popit plein",
        matin: ["Présentation des élèves et de la formatrice", "Manucure profonde", "Tout savoir sur le Popit plein", "French paint / baby-boomer", "Forme coffin"],
        apresmidi_titre: "Extension Popits",
        apresmidi: ["Extension Popits « True Colors »", "Baby-color au builder gel", "Cuti-glitter", "Technique sans limage", "Forme amande"] },
      { jour: "Jour 2",
        matin_titre: "Chablon",
        matin: ["Extension chablon", "Création d'une extension transparente avec incrustations", "Le limage parfait", "Forme square (le carré parfait)"],
        apresmidi_titre: "Capsule",
        apresmidi: ["Extension capsule", "French reverse avec effets et incrustation", "Travailler le polygel", "Forme au choix", "Shooting photo de vos travaux", "Remise des certificats de formation", "Achats possibles au shop avec remise"] }
    ],
    moyens: "Démonstrations, pratique encadrée et corrections personnalisées. Jamais plus de 4 élèves par session.",
    evaluation: "Évaluation continue de la pratique sur vos propres mains, à chaque technique, avec une grille de critères (préparation, structure, limage, forme, finition). Bilan individuel et remise du certificat en fin de formation.",
    delai_acces: "Autofinancement : inscription au plus tard 1 semaine avant le début de la formation. Financement CPF : inscription au plus tard 3 semaines avant.",
    accessibilite: "Locaux accessibles aux personnes en situation de handicap. Pour toute adaptation, contactez le référent handicap avant l'inscription.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
    taux_satisfaction: null,
    taux_reussite: null
  },
  {
    id: "perfectionnement-prive",
    titre: "Coaching privé ou en duo",
    accroche: "Un coaching 100 % à la carte, adapté à votre niveau, à vos lacunes et à vos envies. Vous choisissez la durée : 1, 2 ou 3 jours.",
    format: "Présentiel, en privé ou en duo",
    duree: "1, 2 ou 3 jours au choix (7 h par jour)",
    tarifs: [
      { label: "En privé — 1 jour", prix: 700, cpf: 1500 },
      { label: "En privé — 2 jours", prix: 1190, cpf: 2500 },
      { label: "En privé — 3 jours", prix: 1610, cpf: 3000 },
      { label: "En duo — 1 jour (par élève)", prix: 525, cpf: 1500 },
      { label: "En duo — 2 jours (par élève)", prix: 875, cpf: 2200 },
      { label: "En duo — 3 jours (par élève)", prix: 1090, cpf: 3000 }
    ],
    prix_note: "En duo, le tarif est par élève et c'est à vous de trouver votre binôme.",
    public: "Prothésistes ongulaires en exercice qui souhaitent progresser sur des points précis.",
    prerequis: "Niveau base recommandé.",
    objectifs: [
      "Travailler précisément les techniques de votre choix",
      "Corriger vos lacunes avec un suivi individuel",
      "Progresser à votre rythme"
    ],
    programme: [
      { jour: "Programme 100 % à la carte",
        items: ["Vous choisissez la durée : 1, 2 ou 3 jours.", "Le programme est construit avec vous avant la formation.", "Il s'adapte à votre niveau, à vos lacunes et à vos envies."] }
    ],
    moyens: "Accompagnement individuel (en privé) ou à deux (en duo) : démonstrations, pratique encadrée et corrections personnalisées.",
    evaluation: "[à compléter]",
    delai_acces: "Autofinancement : inscription au plus tard 1 semaine avant le début de la formation. Financement CPF : inscription au plus tard 3 semaines avant.",
    accessibilite: "Locaux accessibles aux personnes en situation de handicap. Pour toute adaptation, contactez le référent handicap avant l'inscription.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
    taux_satisfaction: null,
    taux_reussite: null
  },
  {
    id: "amandes-russes",
    titre: "Formation Amande russe",
    accroche: "Réaliser de belles amandes russes avec une structure correcte et plusieurs techniques de french reverse, selon les tendances actuelles.",
    format: "Présentiel, en groupe de 4 élèves max",
    duree: "2 jours (7 h par jour)",
    tarifs: [{ label: "En groupe (4 élèves max)", prix: 700, cpf: 1500 }],
    prix_note: "",
    public: "Prothésistes ongulaires en exercice.",
    prerequis: "Formation non accessible aux débutantes : un minimum d'expérience dans le métier est exigé.",
    objectifs: [
      "Réaliser des amandes russes avec une structure correcte",
      "Maîtriser différentes techniques de french reverse selon les tendances actuelles",
      "Gagner en technicité et en précision au quotidien"
    ],
    programme: [
      { jour: "Jour 1",
        matin: ["Présentation des élèves et de la formatrice", "La théorie de la structure de l'Amande russe", "Manucure profonde", "La pose du chablon et ses découpes", "Full cover et French paint"],
        apresmidi: ["Mise en pratique de la théorie abordée le matin", "Entraînement sur soi"] },
      { jour: "Jour 2",
        matin: ["L'Amande russe avec French reverse à effets selon l'inspiration du moment (mosaïque, rose 3D, effet froissé, incrustation nacre, etc.)"],
        apresmidi: ["Mise en pratique", "Shooting photo de vos travaux", "Remise du certificat de formation", "Achats possibles au shop avec remise exceptionnelle"] }
    ],
    moyens: "Démonstrations et pratique encadrée en groupe de 4 élèves maximum.",
    evaluation: "[à compléter]",
    delai_acces: "Autofinancement : inscription au plus tard 1 semaine avant le début de la formation. Financement CPF : inscription au plus tard 3 semaines avant.",
    accessibilite: "Locaux accessibles aux personnes en situation de handicap. Pour toute adaptation, contactez le référent handicap avant l'inscription.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
    taux_satisfaction: null,
    taux_reussite: null
  },
  {
    id: "popit",
    titre: "Formation Popit",
    accroche: "Maîtrisez le Popit plein et le Popit extension, en petit groupe. Vous choisissez le Jour 1, le Jour 2 ou les deux.",
    format: "Présentiel, en groupe de 4 élèves max",
    duree: "Jour 1 uniquement, Jour 2 uniquement ou les 2 jours (7 h par jour), de 9 h à 16 h 30",
    tarifs: [
      { label: "En groupe — Jour 1 ou Jour 2 au choix (7 h)", prix: 390 },
      { label: "En groupe — Jour 1 + Jour 2 (14 h)", prix: 590, cpf: 1100 }
    ],
    prix_note: "Formation en groupe de 4 élèves max. Le programme de chaque journée est déjà défini et ne peut pas être modifié si vous choisissez une seule journée. Paiement possible en 4 fois sans frais. Prise en charge FAFCEA possible.",
    public: "[à compléter]",
    prerequis: "[à compléter]",
    objectifs: [
      "Choisir le Popit adapté à chaque type d'ongle",
      "Réaliser une pose complète et un remplissage au Popit plein",
      "Réaliser une extension Popit, en méthode classique et pour ongles courts"
    ],
    programme: [
      { jour: "Jour 1",
        items: ["Manucure profonde « russe »", "Analyse des différents types d'ongles", "Choix du Popit adapté selon le type d'ongle", "Pose complète Popit plein", "Remplissage Popit", "Baby-boomer en incrustation", "Différentes déco selon le goût du jour"],
        note: "Gardez vos ongles pour le remplissage." },
      { jour: "Jour 2",
        items: ["Manucure profonde « russe »", "Analyse des différents types d'ongles", "Popit extension méthode classique", "Popit extension méthode ongles courts", "Technique sans limage", "Différentes déco selon le goût du jour", "Apprendre à mettre en valeur vos photos"] },
      { jour: "1 ou 2 journées au choix",
        items: ["Vous pouvez choisir uniquement le Jour 1, uniquement le Jour 2, ou les deux.", "Attention : le programme de chaque journée est déjà défini (voir ci-dessus) et ne pourra pas être modifié si vous choisissez une seule journée."] }
    ],
    moyens: "Démonstrations et pratique encadrée en groupe de 4 élèves maximum.",
    evaluation: "[à compléter]",
    delai_acces: "Autofinancement : inscription au plus tard 1 semaine avant le début de la formation. Financement CPF : inscription au plus tard 3 semaines avant.",
    accessibilite: "Locaux accessibles aux personnes en situation de handicap. Pour toute adaptation, contactez le référent handicap avant l'inscription.",
    financements: "Autofinancement, CPF (formule 2 jours) ou FAFCEA. Paiement possible en 4 fois sans frais.",
    taux_satisfaction: null,
    taux_reussite: null
  }
];

/* =====================================================================
   PLANNING — une ligne par session (les dates passées disparaissent seules).
   Julie transmet le planning sur demande : à renseigner avec ses vraies dates.
   Exemple : { formation: "base", debut: "2027-01-18", fin: "2027-01-22", lieu: "", places: 4 }
   ===================================================================== */
window.SESSIONS = [];
