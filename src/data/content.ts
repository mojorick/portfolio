import type { Experience, Education, ResearchAxiom, Project } from '../types';

export const personalInfo = {
  name: "Josué Hémérick MORIÉ",
  shortName: "Hémérick MORIÉ",
  domain: "hemerickmorie.com",
  role: {
    fr: "Data Engineer • Optimisation & IA • Futur Doctorant CIFRE",
    en: "Data Engineer • Optimization & AI • Prospective CIFRE PhD Candidate"
  },
  headline: {
    fr: "De la rigueur mathématique des classes prépas (MP*) aux pipelines critiques de la SNCF.",
    en: "From the mathematical rigor of French Prep Classes (MP*) to SNCF's mission-critical data pipelines."
  },
  bio: {
    fr: "Élève-ingénieur en informatique au CESI La Rochelle et Data Engineer en alternance chez SNCF Voyageurs. Issu de classes préparatoires MPSI/MP* avec un socle solide en mathématiques et algorithmique, je prépare une spécialisation en Intelligence Artificielle et Recherche Opérationnelle. En recherche d'un stage de mobilité internationale (6 mois) et d'une thèse CIFRE combinant optimisation combinatoire, graphes et apprentissage automatique.",
    en: "Computer Science Engineering Student at CESI La Rochelle and Data Engineer Apprentice at SNCF Voyageurs. With a rigorous background in MPSI/MP* Intensive Preparatory Classes in mathematics and algorithms, I am specializing in Artificial Intelligence and Operations Research. Actively seeking a 6-month international internship and a CIFRE PhD position bridging combinatorial optimization, graph theory, and machine learning."
  },
  email: "josuehemerick.morie@viacesi.fr",
  phone: "+33 6 21 64 93 10",
  location: "Nantes & La Rochelle, France",
  linkedin: "https://www.linkedin.com/in/josu%C3%A9-h%C3%A9m%C3%A9rick-mori%C3%A9-891166336/",
  github: "https://github.com/mojorick",
  photo: "/images/profile.jpg",
  availability: {
    international: {
      fr: "Stage Mobilité Internationale (6 mois) — Dès Printemps 2027",
      en: "6-Month International Internship — Available Spring 2027"
    },
    cifre: {
      fr: "Thèse CIFRE en IA / Recherche Opérationnelle — Dès Automne 2027 / 2028",
      en: "CIFRE Industrial PhD in AI / Operations Research — Fall 2027 / 2028"
    }
  },
  stats: [
    { value: "MP*", label: { fr: "Excellence Mathématique (INPHB)", en: "Math Foundations (MPSI/MP*)" } },
    { value: "3+", label: { fr: "Années d'alternance SNCF", en: "Years SNCF Apprenticeship" } },
    { value: "100k+", label: { fr: "Lignes de flux ferroviaires traités", en: "Railway schedule rows processed" } },
    { value: "< 2ms", label: { fr: "Temps d'exécution des algos de quota", en: "Quota engine compute latency" } }
  ]
};

export const experiences: Experience[] = [
  {
    id: "sncf-voyageurs",
    company: "SNCF Voyageurs",
    role: {
      fr: "Data Engineer (Alternance Ingénieur)",
      en: "Data Engineer (Apprentice Engineer)"
    },
    location: "Nantes (44), France",
    period: "Oct. 2025 - Sep. 2028",
    type: { fr: "Alternance (3 ans)", en: "Apprenticeship (3 years)" },
    color: "#e01a22",
    description: {
      fr: "Conception, développement et industrialisation de pipelines de données critiques et d'outils décisionnels algorithmiques pour la gestion de l'offre ferroviaire et la régulation des flux.",
      en: "Design, development, and production rollout of mission-critical data pipelines and algorithmic decision engines for railway operations and passenger capacity management."
    },
    bulletPoints: {
      fr: [
        "Refonte architecturale du SI Planification ferroviaire (Hastus / OSCAR) : modélisation de schémas de données, consolidation multi-sources et automatisation des flux ETL/ELT vers Power BI.",
        "Conception de l'algorithme d'optimisation de quotas de réservation de groupe : modélisation sous contraintes multiples (Yield Management, contiguïté des sièges, règles multi-tarifs, taux de charge dynamique).",
        "Refonte du système de gestion des transports perturbés (Python, React TypeScript) : architecture logicielle hautement réactive aux aléas d'exploitation (pannes, retards, substitutions)."
      ],
      en: [
        "Architectural overhaul of the railway planning IS (Hastus / OSCAR): data schema modeling, multi-source ingestion, and automated ETL/ELT pipelines targeting Power BI.",
        "Development of a group reservation quota optimization engine: multi-constraint formulation (Yield Management, contiguous seating, dynamic occupancy, tariff rules).",
        "Redesign of the real-time disrupted transport operations tool (Python, React TypeScript): highly reactive software architecture for unexpected operational hazards."
      ]
    },
    technicalStack: ["Python", "React", "TypeScript", "SQL (PostgreSQL)", "Power BI", "ETL Pipelines", "Hastus / OSCAR", "Algorithmique Avancée"]
  },
  {
    id: "jolipixel",
    company: "JOLIPIXEL",
    role: {
      fr: "Développeur Web (Stage)",
      en: "Web Developer (Internship)"
    },
    location: "Saint-Nazaire (44), France",
    period: "Avril 2025 - Août 2025",
    type: { fr: "Stage technique (4 mois)", en: "Technical Internship (4 months)" },
    color: "#6366f1",
    description: {
      fr: "Développement full-stack de solutions web performantes et sur-mesure pour des clients entreprises.",
      en: "Full-stack development of performant and tailored web solutions for enterprise clients."
    },
    bulletPoints: {
      fr: [
        "Conception et intégration d'applications web modernes avec architectures PHP / Symfony et WordPress headless.",
        "Optimisation des temps de réponse, des requêtes SQL et de la conformité UX/accessibilité.",
        "Collaboration agile en équipe pluridisciplinaire et déploiement continu."
      ],
      en: [
        "Designed and implemented modern web applications with PHP / Symfony and headless WordPress architectures.",
        "Optimized backend response times, SQL database queries, and accessibility/UX guidelines.",
        "Agile team collaboration with continuous delivery and code reviews."
      ]
    },
    technicalStack: ["Symfony", "PHP", "WordPress", "JavaScript / TypeScript", "MySQL", "CSS / Tailwind"]
  }
];

export const educations: Education[] = [
  {
    id: "cesi",
    institution: "CESI École d'Ingénieurs",
    degree: {
      fr: "Diplôme d'Ingénieur en Informatique (Cycle Ingénieur)",
      en: "Master of Science in Computer Science & Engineering"
    },
    location: "La Rochelle, France",
    period: "Oct. 2024 - Sep. 2028",
    badge: "Grade de Master - CTI",
    description: {
      fr: "Pédagogie active par projets (PBL - Problem-Based Learning) immergeant l'ingénieur dans des problématiques industrielles complexes : architectures distribuées, cloud, data science, et intelligence artificielle.",
      en: "Problem-Based Learning (PBL) pedagogy tackling realistic corporate IT architectures: distributed systems, cloud computing, data pipelines, and artificial intelligence."
    },
    highlights: {
      fr: [
        "Spécialisation 5e année ciblée : Intelligence Artificielle & Sciences des Données.",
        "Conduite de projets d'ingénierie logicielle avancés (systèmes répartis, microservices, bases relationnelles et NoSQL).",
        "Préparation active du projet de recherche doctoral (Thèse CIFRE)."
      ],
      en: [
        "Final year specialization target: Artificial Intelligence & Data Science.",
        "Advanced software engineering projects (distributed systems, microservices, SQL & NoSQL architectures).",
        "Active preparation for doctoral research proposal (CIFRE PhD)."
      ]
    }
  },
  {
    id: "inphb",
    institution: "INPHB (Institut National Polytechnique Félix Houphouët-Boigny)",
    degree: {
      fr: "Classes Préparatoires aux Grandes Écoles (MPSI - MP*)",
      en: "Intensive Preparatory Classes for Grandes Écoles (MPSI - MP*)"
    },
    location: "Yamoussoukro, Côte d'Ivoire",
    period: "Sept. 2022 - Avril 2024",
    badge: "Filière d'Élite MP*",
    description: {
      fr: "Deux années de formation scientifique intensive d'excellence en Mathématiques pures (Algèbre linéaire, Analyse spectrale, Topologie), Physique et Informatique fondamentale.",
      en: "Two years of intensive and rigorous scientific training in pure Mathematics (Linear Algebra, Spectral Theory, Topology), Physics, and Theoretical Computer Science."
    },
    highlights: {
      fr: [
        "Filière MP* (Maths Spé étoile) : réservée aux meilleurs profils scientifiques.",
        "Maîtrise approfondie de l'algèbre bilinéaire, des espaces euclidiens, de la diagonalisation, des séries et équations différentielles.",
        "Développement d'une endurance intellectuelle et d'une rigueur de démonstration directement transférables à la recherche en IA et en Optimisation combinatoire."
      ],
      en: [
        "MP* track (Maths Special Star): honors tier reserved for top-performing students.",
        "Deep mastery of linear algebra, spectral decomposition, metric spaces, multivariate calculus, and discrete mathematics.",
        "Rigorous deductive reasoning and abstract modeling directly applicable to AI theory and Combinatorial Optimization."
      ]
    }
  }
];

export const researchAxioms: ResearchAxiom[] = [
  {
    id: "spectral-latent",
    title: {
      fr: "Algèbre Spectrale, Décomposition Matricielle & Espaces Latents",
      en: "Spectral Algebra, Matrix Decomposition & Latent Spaces"
    },
    problem: {
      fr: "Comment les transformations linéaires fondamentales (vecteurs et valeurs propres, SVD, diagonalisation) permettent de réduire la dimensionnalité et d'apprendre des représentations compressées d'un réseau complexe sans perte d'information critique ?",
      en: "How fundamental linear transformations (eigenvectors/values, SVD, spectral decomposition) enable dimensionality reduction and compressed representation learning in complex networks without losing critical information?"
    },
    methodology: {
      fr: "Analyse spectrale du Laplacien de graphe $L = D - A$, factorisation de matrices de covariance pour la PCA, et projection dans des espaces de plongement (embeddings) exploitables par les mécanismes d'attention Transformer.",
      en: "Spectral analysis of graph Laplacians $L = D - A$, covariance matrix factorization for PCA, and projection into embedding spaces leveraged by Transformer attention mechanisms."
    },
    mathEquation: "A\\vec{v} = \\lambda \\vec{v} \\quad \\iff \\quad \\det(A - \\lambda I) = 0 \\quad \\implies \\quad C = V \\Lambda V^T",
    potentialIndustrialApplication: {
      fr: "Détection temps réel d'anomalies structurelles sur les trafics ferroviaires et clustering spectral des gares à forte criticité.",
      en: "Real-time structural anomaly detection across railway networks and spectral clustering of bottleneck transit stations."
    }
  },
  {
    id: "ro-disruptions",
    title: {
      fr: "Optimisation Combinatoire & Re-routage Dynamique sous Aléas",
      en: "Combinatorial Optimization & Dynamic Rerouting under Disruptions"
    },
    problem: {
      fr: "Face à une rupture inopinée de voie ou un retard critique, comment reconfigurer en temps réel (sub-secondaire) le plan de transport tout en respectant les contraintes strictes de capacité, de sécurité et d'enchaînement matériel ?",
      en: "When confronted with an unexpected track disruption or severe delay, how can the railway schedule be reconfigured in real time (sub-second) while satisfying hard safety, capacity, and rolling-stock constraints?"
    },
    methodology: {
      fr: "Formulation en programmation linéaire mixte en nombres entiers (MILP), couplée à des métaheuristiques adaptatives (Recherche avec Tabous, Recuit Simulé) et à des algorithmes de plus court chemin dynamiques (A* pénalisé).",
      en: "Mixed-Integer Linear Programming (MILP) formulation coupled with adaptive metaheuristics (Tabu Search, Simulated Annealing) and dynamic shortest path search (Penalized A*)."
    },
    mathEquation: "\\min \\sum_{e \\in E} c_e x_e + \\sum_{i \\in V} \\operatorname{Penalty}(t_i) \\quad \\text{s.t.} \\quad A x = b, \\; x_e \\in \\{0, 1\\}",
    potentialIndustrialApplication: {
      fr: "Moteur d'aide à la décision pour les régulateurs de lignes à grande vitesse et TER (projet cœur chez SNCF Voyageurs).",
      en: "Automated decision-support engine for railway dispatchers and high-speed / regional train coordinators."
    }
  },
  {
    id: "marl-dispatching",
    title: {
      fr: "Apprentissage par Renforcement Multi-Agents (MARL) pour la Régulation",
      en: "Multi-Agent Reinforcement Learning (MARL) for Dynamic Dispatching"
    },
    problem: {
      fr: "Peut-on modéliser chaque convoi ou chaque nœud de transit comme un agent autonome apprenant une politique coopérative pour résorber les effets de propagation de retards en chaîne (effet papillon ferroviaire) ?",
      en: "Can individual trains or transit hubs be modeled as autonomous agents learning cooperative policies to mitigate cascading delay propagation across dense networks?"
    },
    methodology: {
      fr: "Formalisation par Processus Décisionnel de Markov Décentralisé (Dec-POMDP) avec entraînement centralisé et exécution décentralisée (CTDE, ex: MAPPO / QMIX).",
      en: "Decentralized Partially Observable Markov Decision Processes (Dec-POMDP) with Centralized Training and Decentralized Execution (CTDE, e.g., MAPPO / QMIX)."
    },
    mathEquation: "Q_{tot}(\\mathbf{s}, \\mathbf{a}) = f\\big(Q_1(s_1, a_1), \\dots, Q_N(s_N, a_N)\\big), \\quad \\nabla_\\theta J(\\theta) = \\mathbb{E}[\\nabla_\\theta \\log \\pi_\\theta(a|s) A(s,a)]",
    potentialIndustrialApplication: {
      fr: "Régulation automatique de carrefours ferroviaires complexes (nœud de Nantes, gares parisiennes).",
      en: "Autonomous dispatching and bottleneck deconfliction for high-density railway junctions."
    }
  }
];

export const projects: Project[] = [
  {
    id: "disrupted-transport",
    title: {
      fr: "Système de Gestion des Transports Perturbés",
      en: "Real-Time Disrupted Transport Management System"
    },
    subtitle: {
      fr: "Architecture logicielle réactive face aux aléas d'exploitation ferroviaire",
      en: "Reactive software architecture handling railway operational hazards"
    },
    category: "data-engineering",
    period: "2026",
    company: "SNCF Voyageurs",
    featured: true,
    description: {
      fr: "Conception et déploiement d'une application d'ingénierie critique permettant d'adapter instantanément le plan de transport lors d'incidents d'exploitation (pannes de caténaire, alertes météo, incidents de circulation).",
      en: "Design and deployment of a critical engineering application enabling instant adaptation of railway schedules during operational hazards (catenary failures, extreme weather, traffic interruptions)."
    },
    impact: {
      fr: [
        "Réduction drastique du temps de calcul de solution de contournement (de plusieurs dizaines de minutes à quelques secondes).",
        "Traçabilité intégrale des décisions de réacheminement et visualisation instantanée des impacts voyageurs.",
        "Synchronisation continue avec les référentiels métiers de circulation."
      ],
      en: [
        "Dramatic reduction of workaround generation latency (from tens of minutes to seconds).",
        "Full auditability of rerouting decisions and real-time visualization of passenger travel impacts.",
        "Continuous two-way synchronization with operational dispatch databases."
      ]
    },
    academicFormulation: {
      fr: "Modélisation du réseau sous forme de graphe dynamique orienté pondéré $G=(V, E, W_t)$ où le poids des arêtes évolue stochastiquement selon la gravité des perturbations.",
      en: "Formulation as a dynamic time-dependent weighted directed graph $G=(V, E, W_t)$ where edge weights vary stochastically according to disruption severity."
    },
    tags: ["Python", "React", "TypeScript", "Dynamic Graphs", "SNCF", "High Availability"],
    metrics: [
      { label: { fr: "Temps de réaction", en: "Response Time" }, value: "< 3s" },
      { label: { fr: "Fiabilité du plan", en: "Schedule Integrity" }, value: "99.8%" }
    ]
  },
  {
    id: "quota-engine",
    title: {
      fr: "Moteur d'Optimisation des Quotas & Yield Management",
      en: "Group Booking Quota & Yield Management Engine"
    },
    subtitle: {
      fr: "Algorithme d'optimisation d'occupation des rames sous contraintes multiples",
      en: "Constrained train occupancy & group seating optimization algorithm"
    },
    category: "ai-ro",
    period: "2026",
    company: "SNCF Voyageurs",
    featured: true,
    description: {
      fr: "Modélisation et implémentation d'un moteur d'allocation automatique de billets pour les réservations de groupe, intégrant simultanément des contraintes de contiguïté physique des places, de règles de yield management et de multi-tarification.",
      en: "Mathematical modeling and algorithmic implementation of an automated ticket allocation engine for group reservations, reconciling physical seat contiguity, revenue yield management, and tiered pricing schemes."
    },
    impact: {
      fr: [
        "Maximisation du taux d'occupation des trains tout en préservant l'inventaire pour la clientèle individuelle à haute contribution.",
        "Suppression des conflits d'attribution de sièges contigus.",
        "Intégration directe dans les outils de gestion d'offres ferroviaires."
      ],
      en: [
        "Maximized train seat occupancy while safeguarding high-yield individual inventory.",
        "Eliminated seat contiguity conflicts for large groups.",
        "Seamless integration with railway offering and booking management workflows."
      ]
    },
    academicFormulation: {
      fr: "Problème d'affectation quadratique sous contraintes de sac à dos multi-dimensionnel (Multi-Dimensional Knapsack Problem).",
      en: "Formulation as a Multi-Dimensional Knapsack Problem with quadratic adjacency constraints."
    },
    tags: ["Recherche Opérationnelle", "Combinatoire", "Yield Management", "Python", "VBA / Office automation"],
    metrics: [
      { label: { fr: "Optimisation de charge", en: "Occupancy Boost" }, value: "+14%" },
      { label: { fr: "Calcul de contiguïté", en: "Adjacency Guarantee" }, value: "100%" }
    ]
  },
  {
    id: "railway-is-modernization",
    title: {
      fr: "Refonte & Pipelines Data du SI Planification",
      en: "Railway Planning IS Modernization & Data Pipelines"
    },
    subtitle: {
      fr: "Automatisation et unification des flux Hastus / OSCAR vers Power BI",
      en: "End-to-end ELT orchestration from Hastus / OSCAR to Power BI"
    },
    category: "data-engineering",
    period: "2025 - 2026",
    company: "SNCF Voyageurs",
    featured: false,
    description: {
      fr: "Restructuration complète des flux de données entre les logiciels de confection de roulement matériel/conducteurs (Hastus, OSCAR) et les dashboards d'aide au pilotage stratégique.",
      en: "End-to-end restructuring of data pipelines connecting train/crew scheduling software (Hastus, OSCAR) with strategic executive decision dashboards."
    },
    impact: {
      fr: [
        "Automatisation de rapports auparavant compilés manuellement chaque semaine.",
        "Fiabilisation des métriques de productivité et de conformité réglementaire ferroviaire.",
        "Mise à disposition de visualisations interactives Power BI pour les directeurs de lignes."
      ],
      en: [
        "Replaced recurring manual weekly compilation with automated pipelines.",
        "Enhanced metric consistency across regulatory and train performance indicators.",
        "Delivered actionable Power BI dashboards for regional line leadership."
      ]
    },
    tags: ["Data Pipelines", "SQL", "PostgreSQL", "Power BI", "Hastus", "Python ETL"],
    metrics: [
      { label: { fr: "Temps économisé", en: "Hours Saved / wk" }, value: "12h/sem" },
      { label: { fr: "Disponibilité Data", en: "Data Availability" }, value: "99.9%" }
    ]
  }
];

export const skillCategories = [
  {
    name: { fr: "Mathématiques & Algorithmique (MP* & RO)", en: "Mathematics & Algorithms (MP* & OR)" },
    icon: "Sigma",
    skills: [
      "Algèbre Linéaire & Décomposition Spectrale",
      "Valeurs & Vecteurs Propres (Diagonalisation)",
      "Recherche Opérationnelle (MILP, Simplex)",
      "Théorie des Graphes (Dijkstra, A*, Flot Max)",
      "Optimisation Combinatoire & Heuristiques",
      "Calcul Matriciel & Réduction de Dimension (PCA, SVD)"
    ]
  },
  {
    name: { fr: "Data Engineering & Systèmes", en: "Data Engineering & Systems" },
    icon: "Database",
    skills: [
      "Pipelines ETL / ELT automatisés",
      "Modélisation de données (Merise, Star/Snowflake)",
      "PostgreSQL, MySQL, MongoDB",
      "Systèmes critiques de planification (Hastus, OSCAR)",
      "Power BI & Data Storytelling",
      "Architectures réactives temps réel"
    ]
  },
  {
    name: { fr: "Langages & Développement", en: "Programming & Software Engineering" },
    icon: "Code2",
    skills: [
      "Python (NumPy, SciPy, Pandas)",
      "TypeScript & JavaScript (Modern ESNext)",
      "C++ / C (Algorithmique & Performance)",
      "React, Next.js, RxJS, Angular",
      "Node.js, Express, Symfony, PHP",
      "Git, GitHub CI/CD, Linux"
    ]
  },
  {
    name: { fr: "Soft Skills & Créativité", en: "Personal Traits & Creative Spark" },
    icon: "Sparkles",
    skills: [
      "Piano (Jazz, Classique & Contemporain)",
      "Rigueur de démonstration & Esprit d'analyse",
      "Résolution de problèmes complexes (PBL)",
      "Adaptabilité & Travail d'équipe",
      "Basketball en compétition",
      "Bilingue Français / Anglais professionnel"
    ]
  }
];
