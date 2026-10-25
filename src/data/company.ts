import type { L } from '../i18n';

export const TEAM: [string, string, L][] = [
  ['CM', 'Claire Morel', { fr: 'Responsable produit', en: 'Head of Product' }],
  ['AM', 'Antoine Martin', { fr: 'Product manager', en: 'Product manager' }],
  ['JR', 'Julien Roux', { fr: 'Responsable qualité', en: 'Quality lead' }],
  ['SL', 'Sarah Lefèvre', { fr: 'Ingénieure qualité', en: 'Quality engineer' }],
  ['TB', 'Thomas Bernard', { fr: 'Ingénieur plateforme', en: 'Platform engineer' }],
  ['ND', 'Nadia Dubois', { fr: 'Responsable plateforme', en: 'Platform lead' }],
];

export const JOBS: [L, L, L, L][] = [
  [
    { fr: 'Ingénieur·e backend senior', en: 'Senior backend engineer' },
    { fr: 'Plateforme', en: 'Platform' },
    { fr: 'Paris · hybride · CDI', en: 'Paris · hybrid · permanent' },
    { fr: '<p><strong>Missions</strong> : concevoir les services d’import, d’export et d’audit trail ; garantir la performance et la traçabilité.</p><p><strong>Profil</strong> : 5 ans d’expérience backend, PostgreSQL, goût pour la qualité logicielle et les environnements réglementés.</p>', en: '<p><strong>Role</strong>: design import, export and audit trail services; ensure performance and traceability.</p><p><strong>Profile</strong>: 5 years of backend experience, PostgreSQL, care for software quality and regulated environments.</p>' },
  ],
  [
    { fr: 'Chef·fe de projet clinique', en: 'Clinical project manager' },
    { fr: 'Projets', en: 'Projects' },
    { fr: 'Paris · hybride · CDI', en: 'Paris · hybrid · permanent' },
    { fr: '<p><strong>Missions</strong> : paramétrer les études de nos clients, piloter la recette et former les centres.</p><p><strong>Profil</strong> : expérience en data management ou ARC, connaissance des BPC et des CRF.</p>', en: '<p><strong>Role</strong>: build customer studies, lead UAT and train sites.</p><p><strong>Profile</strong>: data management or CRA experience, knowledge of GCP and CRFs.</p>' },
  ],
  [
    { fr: 'Responsable assurance qualité GxP', en: 'GxP quality assurance lead' },
    { fr: 'Qualité', en: 'Quality' },
    { fr: 'Paris · CDI', en: 'Paris · permanent' },
    { fr: '<p><strong>Missions</strong> : maintenir le système qualité, piloter la validation GAMP 5 et accompagner les audits clients.</p><p><strong>Profil</strong> : expérience CSV / GAMP 5, 21 CFR Part 11, audits fournisseurs.</p>', en: '<p><strong>Role</strong>: maintain the quality system, lead GAMP 5 validation and support customer audits.</p><p><strong>Profile</strong>: CSV / GAMP 5 experience, 21 CFR Part 11, vendor audits.</p>' },
  ],
];

export const HIRING_STEPS: L[] = [
  { fr: 'Échange de 30 min avec le ou la manager', en: '30-min call with the hiring manager' },
  { fr: 'Exercice pratique, sans piège', en: 'Practical exercise, no tricks' },
  { fr: 'Rencontre avec l’équipe', en: 'Meet the team' },
  { fr: 'Proposition sous une semaine', en: 'Offer within a week' },
];
