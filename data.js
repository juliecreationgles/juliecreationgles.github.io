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
   FORMATIONS — source : sa page Booksy (23/11/2026). À relire par Julie.
   tarifs = liste de formules ; cpf = tarif si financement CPF (facultatif).
   ===================================================================== */
window.FORMATIONS = [
  {
    id: "base",
    titre: "Formation de base — prothésie ongulaire",
    accroche: "Une formation de base très complète : vous travaillez sur vous, sur main d'entraînement et sur modèle.",
    format: "Présentiel",
    duree: "3 ou 5 jours (7 h 30 par jour)",
    tarifs: [
      { label: "En groupe de 4 élèves max (5 jours)", prix: 1190, cpf: 2200 },
      { label: "En duo (3 jours) — par élève", prix: 1190, cpf: 2200 },
      { label: "En privé (3 jours)", prix: 1610, cpf: 3000 }
    ],
    prix_note: "Tarif par élève. Pour un financement CPF, se référer au tarif CPF indiqué.",
    public: "Toute personne souhaitant apprendre la prothésie ongulaire, débutantes acceptées.",
    prerequis: "Aucun niveau requis.",
    objectifs: [
      "Maîtriser la théorie du métier : anatomie, maladies, règles du métier, chimie des produits",
      "Réaliser un gainage et une pose complète avec différents rallongements (capsules, chablon, popit)",
      "Réaliser remplissages, dépose, baby-boomer et french",
      "Connaître les démarches et aides pour s'immatriculer en chambre des métiers"
    ],
    programme: [
      { jour: "Théorie", contenu: "Anatomie, maladies, règles du métier, chimie des produits." },
      { jour: "Pratique", contenu: "Gainage, pose complète avec rallongements (capsules, chablon, popit), remplissages, dépose, baby-boomer, french — sur soi, sur main d'entraînement puis sur modèle." },
      { jour: "Installation", contenu: "Démarches et aides pour l'immatriculation en chambre des métiers." }
    ],
    moyens: "Alternance de théorie et de pratique (sur soi, main d'entraînement, modèle). Groupes de 4 élèves maximum. Programme complet transmis sur demande.",
    evaluation: "[à compléter : modalités d'évaluation et attestation de fin de formation]",
    delai_acces: "[à compléter : délai entre l'inscription et le début de la formation]",
    accessibilite: "Contactez le référent handicap avant l'inscription pour étudier les adaptations possibles.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
    taux_satisfaction: null,
    taux_reussite: null
  },
  {
    id: "perfectionnement",
    titre: "Perfectionnement — groupe, duo ou privé",
    accroche: "Pour les professionnelles qui n'arrivent pas à corriger leurs défauts : on revoit toutes les méthodes de rallongement.",
    format: "Présentiel",
    duree: "1, 2 ou 3 jours (7 h 30 par jour)",
    tarifs: [
      { label: "En groupe (2 jours, 4 élèves max)", prix: 550, cpf: 1500 },
      { label: "En duo — 1 jour (par élève)", prix: 525, cpf: 1500 },
      { label: "En duo — 2 jours (par élève)", prix: 875, cpf: 2200 },
      { label: "En duo — 3 jours (par élève)", prix: 1090, cpf: 3000 },
      { label: "En privé — 1 jour", prix: 700, cpf: 1500 },
      { label: "En privé — 2 jours", prix: 1190, cpf: 2200 },
      { label: "En privé — 3 jours", prix: 1610, cpf: 3000 }
    ],
    prix_note: "En duo et en privé, le planning est 100 % personnalisé selon vos besoins.",
    public: "Prothésistes ongulaires en exercice qui souhaitent corriger leurs défauts et progresser.",
    prerequis: "Niveau base recommandé.",
    objectifs: [
      "Identifier et corriger vos points faibles",
      "Revoir toutes les méthodes de rallongement",
      "Gagner en précision et en qualité de finition"
    ],
    programme: [
      { jour: "En groupe (2 jours)", contenu: "Révision de toutes les méthodes de rallongement." },
      { jour: "En duo ou en privé (1 à 3 jours)", contenu: "Planning élaboré ensemble, 100 % personnalisé selon vos besoins." }
    ],
    moyens: "Pratique encadrée et corrections personnalisées. Jamais plus de 4 élèves par session en groupe. Programme complet transmis sur demande.",
    evaluation: "[à compléter]",
    delai_acces: "[à compléter]",
    accessibilite: "Contactez le référent handicap avant l'inscription pour étudier les adaptations possibles.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
    taux_satisfaction: null,
    taux_reussite: null
  },
  {
    id: "amandes-russes",
    titre: "Formation amandes russes",
    accroche: "Réaliser de belles amandes russes avec une structure correcte et plusieurs techniques de french reverse, selon les tendances actuelles.",
    format: "Présentiel",
    duree: "2 jours (7 h 30 par jour)",
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
      { jour: "Jours 1 et 2", contenu: "Structure de l'amande russe et techniques de french reverse. [détail du programme à compléter]" }
    ],
    moyens: "Pratique encadrée en groupe de 4 élèves maximum. Programme complet transmis sur demande.",
    evaluation: "[à compléter]",
    delai_acces: "[à compléter]",
    accessibilite: "Contactez le référent handicap avant l'inscription pour étudier les adaptations possibles.",
    financements: "Autofinancement ou CPF (tarif CPF indiqué ci-dessus).",
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
