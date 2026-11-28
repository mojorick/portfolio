const givenNames = 'Josué Hémérick';
const familyName = 'MORIÉ';

export const personalInfo = {
  givenNames,
  familyName,
  name: `${givenNames} ${familyName}`,
  shortName: 'Hémérick Morié',
  email: 'josuehemerick.morie@viacesi.fr',
  location: 'Nantes & La Rochelle, France',
  linkedin: 'https://www.linkedin.com/in/josu%C3%A9-h%C3%A9m%C3%A9rick-mori%C3%A9-891166336/',
  github: 'https://github.com/mojorick',
  photo: '/images/profile.jpg',
};

export const projects = [
  {
    title: { fr: 'Outil de gestion des transports perturbés', en: 'Railway disruption management tool' },
    contribution: {
      fr: 'J’ai réalisé l’essentiel de la refonte de cet outil d’aide à la décision chez SNCF Voyageurs, de la conception de l’architecture au développement en Python et React/TypeScript. L’application permet d’adapter le plan de transport en temps réel lors d’un incident.',
      en: 'I carried out most of the redesign of this decision-support tool at SNCF Voyageurs, from designing the software architecture to implementing it in Python and React/TypeScript. The tool supports real-time changes to transport plans during disruptions.',
    },
    stack: ['Python', 'React', 'TypeScript'],
  },
  {
    title: { fr: 'Pipelines de planification ferroviaire', en: 'Railway planning data pipelines' },
    contribution: {
      fr: 'J’ai travaillé sur la modélisation des données et l’automatisation des flux entre les outils de planification et les tableaux de bord Power BI.',
      en: 'I worked on data modeling and automated data flows from scheduling tools to Power BI dashboards.',
    },
    stack: ['SQL', 'Python', 'Power BI'],
  },
  {
    title: { fr: 'Quotas de réservation de groupe', en: 'Group booking quotas' },
    contribution: {
      fr: 'J’ai participé à la conception d’un algorithme d’allocation intégrant les règles tarifaires, le taux de remplissage et la contiguïté des places.',
      en: 'I helped design an allocation algorithm that accounts for pricing rules, train occupancy, and seating groups together.',
    },
    stack: ['Excel / VBA'],
  },
];

export const education = [
  {
    institution: 'INP-HB',
    period: { fr: 'Septembre 2022 – avril 2024', en: 'September 2022 – April 2024' },
    degree: {
      fr: 'Deux ans de prépa maths-physique · MPSI puis MP*',
      en: 'Two-year mathematics and physics program · MPSI then MP*',
    },
    description: {
      fr: 'Deux années à l’INP-HB m’ont donné des bases solides en algèbre linéaire, analyse, physique et algorithmique. J’utilise ce socle pour modéliser des problèmes, poser des hypothèses et comprendre les méthodes d’optimisation et d’apprentissage automatique.',
      en: 'Two years at INP-HB gave me a strong grounding in linear algebra, mathematical analysis, physics, and algorithms. I draw on that foundation to model problems, state assumptions, and understand optimization and machine learning methods.',
    },
    topics: {
      fr: [
        'Recherche opérationnelle : définir une fonction objectif, traduire les contraintes métier et comparer des solutions réalisables.',
        'Mathématiques du machine learning : relier l’algèbre linéaire à la représentation des données, et l’analyse à la minimisation d’une fonction de perte.',
      ],
      en: [
        'Operations research: defining an objective, expressing operational constraints, and comparing feasible solutions.',
        'Mathematics of machine learning: connecting linear algebra to data representation, and calculus to minimizing a loss function.',
      ],
    },
    location: 'Yamoussoukro, Côte d’Ivoire',
  },
  {
    institution: 'CESI La Rochelle',
    period: { fr: 'Octobre 2024 – septembre 2028', en: 'October 2024 – September 2028' },
    degree: {
      fr: 'Diplôme d’ingénieur en informatique, en cours',
      en: 'Computer engineering degree, in progress',
    },
    description: {
      fr: 'Actuellement en A4, j’ai commencé mon alternance en A3 pour une durée de trois ans. Au CESI, je travaille en équipe sur des problèmes d’ingénierie concrets grâce à l’apprentissage actif par problèmes et par projets (A2P2).',
      en: 'I’m in the fourth year of the engineering program and started my three-year apprenticeship in my third year. At CESI, I work in teams to solve practical engineering problems through problem- and project-based learning.',
    },
    topics: {
      fr: [
        'Génie logiciel : modéliser un système, structurer une application et développer ses fonctionnalités.',
        'Données : concevoir un modèle relationnel, interroger une base avec SQL et exploiter les résultats.',
        'Systèmes distribués : raisonner sur les échanges entre composants d’une application.',
      ],
      en: [
        'Software engineering: modeling systems, structuring applications, and implementing features.',
        'Data: designing relational models, querying databases with SQL, and working with the results.',
        'Distributed systems: reasoning about how application components communicate.',
      ],
    },
    location: 'La Rochelle, France',
  },
];

export const internship = {
  fr: {
    availability: 'Dès le 12 juillet 2027 · 12 semaines minimum',
    preference: 'Pays anglophones privilégiés, ouvert à d’autres destinations.',
  },
  en: {
    availability: 'From 12 July 2027 · At least 12 weeks',
    preference: 'English-speaking countries preferred. Open to other destinations.',
  },
};

export const webInternship = {
  title: { fr: 'Stage en développement web', en: 'Web Development Intern' },
  period: { fr: 'Avril – août 2025', en: 'April – August 2025' },
  location: 'Saint-Nazaire, France',
  contribution: {
    fr: 'J’ai participé au développement et à la maintenance de sites web sur mesure. J’ai travaillé sur la personnalisation de sites WordPress et sur le développement web en PHP avec Symfony.',
    en: 'I helped build and maintain custom websites. My work included customizing WordPress sites and developing web applications in PHP with Symfony.',
  },
  stack: ['WordPress', 'PHP', 'Symfony'],
};
