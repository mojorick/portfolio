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
    stack: ['Python'],
  },
  {
    title: { fr: 'Gestion des perturbations', en: 'Disruption management' },
    contribution: {
      fr: 'J’ai contribué à la refonte d’un outil d’aide à la décision qui permet d’adapter le plan de transport lors d’un incident.',
      en: 'I contributed to redesigning a decision-support tool for adjusting transport plans during disruptions.',
    },
    stack: ['Python', 'React', 'TypeScript'],
  },
];

export const education = [
  {
    institution: 'CESI La Rochelle',
    degree: {
      fr: 'Diplôme d’ingénieur en informatique, en cours',
      en: 'Computer engineering degree, in progress',
    },
    description: {
      fr: 'Quatrième année en alternance. Projets en développement logiciel, bases de données et systèmes distribués.',
      en: 'Fourth-year work-study student. Projects in software development, databases, and distributed systems.',
    },
    location: 'La Rochelle, France',
  },
  {
    institution: 'INP-HB',
    degree: {
      fr: 'Classes préparatoires scientifiques MPSI / MP*',
      en: 'Intensive mathematics and science program (MPSI / MP*)',
    },
    description: {
      fr: 'Algèbre linéaire, analyse, physique et algorithmique.',
      en: 'Linear algebra, mathematical analysis, physics, and algorithms.',
    },
    location: 'Yamoussoukro, Côte d’Ivoire',
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
  period: { fr: 'avril – août 2025', en: 'April – August 2025' },
  contribution: {
    fr: 'Développement et intégration d’applications web avec Symfony et WordPress.',
    en: 'Built and integrated web applications with Symfony and WordPress.',
  },
};
