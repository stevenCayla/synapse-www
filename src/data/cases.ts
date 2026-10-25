import type { L } from '../i18n';

export interface Case {
  k: 'c1' | 'c2' | 'c3';
  s: { fr: string; en: string };
  org: L;
  t: L;
  x: L;
  facts: [L, L][];
  m: [L, L][];
  ch: L;
  so: L;
  q: [L, string, L];
}

export const CASES: Case[] = [
  {
    k: 'c1',
    s: { fr: 'etude-cardio-multicentrique', en: 'multicentre-cardiology-study' },
    org: { fr: 'CHU universitaire', en: 'University hospital' },
    t: { fr: 'Une étude de cardiologie multicentrique, 38 % de requêtes en moins', en: 'A multicentre cardiology study with 38% fewer queries' },
    x: { fr: '18 centres, 412 patients : comment un promoteur académique a fiabilisé sa saisie dès le premier mois.', en: '18 sites, 412 patients: how an academic sponsor made data entry reliable from month one.' },
    facts: [[{ fr: 'Phase', en: 'Phase' }, 'III'], [{ fr: 'Aire', en: 'Area' }, { fr: 'Cardiologie', en: 'Cardiology' }], [{ fr: 'Centres', en: 'Sites' }, '18'], [{ fr: 'Patients', en: 'Patients' }, '412']],
    m: [['−38 %', { fr: 'de requêtes ouvertes à 3 mois', en: 'open queries at 3 months' }], [{ fr: '2,5 j', en: '2.5 d' }, { fr: 'délai moyen de saisie, contre 9 auparavant', en: 'average entry delay, down from 9' }], ['0', { fr: 'constat critique lors de l’inspection', en: 'critical findings at inspection' }]],
    ch: { fr: 'L’étude précédente du service tournait sur un EDC générique : contrôles de cohérence rares, requêtes envoyées par e-mail, saisie souvent faite en fin de mois. Résultat : des milliers de requêtes à la clôture et un gel de base repoussé de deux mois.', en: 'The department’s previous study ran on a generic EDC: few edit checks, queries sent by email, data often entered at month end. The result: thousands of queries at close-out and database lock pushed back by two months.' },
    so: { fr: 'L’équipe a construit l’eCRF dans le form builder avec des contrôles concentrés sur les données critiques, recetté l’étude en quatre jours avec le kit de recette, puis formé les 18 centres en une demi-journée par rôle.', en: 'The team built the eCRF in the form builder with checks focused on critical data, tested the study in four days with the UAT kit, then trained all 18 sites in a half-day per role.' },
    q: [{ fr: '« Nos centres ont été formés en une demi-journée. Le taux de requêtes a chuté dès le premier mois. »', en: '“Our sites were trained in half a day. Query rates dropped in the very first month.”' }, 'Claire L.', { fr: 'Cheffe de projet', en: 'Project lead' }],
  },
  {
    k: 'c2',
    s: { fr: 'reprise-etude-oncologie', en: 'oncology-study-takeover' },
    org: { fr: 'CRO européenne', en: 'European CRO' },
    t: { fr: 'Reprendre une étude d’oncologie en cours, sans interrompre les inclusions', en: 'Taking over an ongoing oncology study without pausing enrolment' },
    x: { fr: '6 200 lignes importées, trois semaines de ressaisie évitées.', en: '6,200 rows imported, three weeks of re-entry avoided.' },
    facts: [[{ fr: 'Phase', en: 'Phase' }, 'II'], [{ fr: 'Aire', en: 'Area' }, { fr: 'Oncologie', en: 'Oncology' }], [{ fr: 'Centres', en: 'Sites' }, '9'], [{ fr: 'Patients', en: 'Patients' }, '164']],
    m: [[{ fr: '6 200', en: '6,200' }, { fr: 'lignes importées avec contrôles', en: 'rows imported with checks' }], [{ fr: '3 sem.', en: '3 wks' }, { fr: 'de ressaisie évitées', en: 'of re-entry avoided' }], ['0', { fr: 'jour d’interruption des inclusions', en: 'days of enrolment pause' }]],
    ch: { fr: 'Le promoteur changeait de CRO en cours d’étude. L’EDC précédent devait être abandonné, avec 18 mois de données à reprendre et des inclusions qui ne pouvaient pas s’arrêter.', en: 'The sponsor was switching CROs mid-study. The previous EDC had to be retired, with 18 months of data to migrate and enrolment that could not stop.' },
    so: { fr: 'L’eCRF a été reconstruit à l’identique, puis les données historiques chargées par l’import prospectif : mapping enregistré, contrôles ligne à ligne et rapport d’anomalies traité avec les centres. La bascule s’est faite un week-end.', en: 'The eCRF was rebuilt like-for-like, then historical data loaded through prospective import: saved mapping, row-by-row checks and an anomaly report worked through with sites. Cut-over happened over a weekend.' },
    q: [{ fr: '« L’import prospectif nous a évité trois semaines de ressaisie sur une étude déjà lancée. »', en: '“Prospective import saved us three weeks of re-entry on a study already underway.”' }, 'Thomas M.', { fr: 'Data manager', en: 'Data manager' }],
  },
  {
    k: 'c3',
    s: { fr: 'biotech-phase-1', en: 'biotech-phase-1' },
    org: { fr: 'Biotech', en: 'Biotech' },
    t: { fr: 'Une phase I en production trois semaines après le protocole final', en: 'A phase I live three weeks after the final protocol' },
    x: { fr: 'Recette en quatre jours, PV signé du premier coup.', en: 'UAT in four days, report signed first time.' },
    facts: [[{ fr: 'Phase', en: 'Phase' }, 'I'], [{ fr: 'Aire', en: 'Area' }, { fr: 'Immunologie', en: 'Immunology' }], [{ fr: 'Centres', en: 'Sites' }, '3'], [{ fr: 'Patients', en: 'Patients' }, '48']],
    m: [[{ fr: '3 sem.', en: '3 wks' }, { fr: 'du protocole au premier patient', en: 'from protocol to first patient' }], [{ fr: '4 j', en: '4 d' }, { fr: 'de recette UAT', en: 'of UAT' }], ['1', { fr: 'seul cycle de recette', en: 'single UAT cycle' }]],
    ch: { fr: 'Une start-up biotech sans équipe data management interne devait démarrer sa première étude clinique dans un calendrier imposé par sa levée de fonds.', en: 'A biotech start-up with no in-house data management team had to start its first clinical study on a timeline set by its funding round.' },
    so: { fr: 'L’équipe projet Synapse a paramétré l’eCRF à partir du protocole, fourni le plan de recette et accompagné le promoteur jusqu’à la signature du PV.', en: 'The Synapse project team built the eCRF from the protocol, provided the UAT plan and supported the sponsor through to sign-off.' },
    q: [{ fr: '« Nous n’avions pas d’équipe data. Synapse a tenu le calendrier sans compromis sur la conformité. »', en: '“We had no data team. Synapse held the timeline without compromising on compliance.”' }, 'Marc D.', { fr: 'Directeur des opérations cliniques', en: 'Head of clinical operations' }],
  },
];
