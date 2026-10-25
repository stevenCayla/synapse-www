import type { L } from '../i18n';

export interface Role {
  k: 'inv' | 'arc' | 'dm' | 'sp';
  s: { fr: string; en: string };
  n: L;
  ic: string;
  h: L;
  p: L;
  f: [L, L][];
  w: L[];
  q: [L, string, L];
}

export const ROLES: Role[] = [
  {
    k: 'inv',
    s: { fr: 'investigateur', en: 'investigator' },
    n: { fr: 'Investigateur', en: 'Investigator' },
    ic: 'i-users',
    h: { fr: 'Moins de temps à saisir, <em>plus de temps pour vos patients.</em>', en: 'Less time on data entry, <em>more time for patients.</em>' },
    p: { fr: 'Pour les investigateurs, attachés de recherche clinique et infirmiers de recherche en centre.', en: 'For investigators, study coordinators and research nurses at site level.' },
    f: [
      [{ fr: 'Saisie guidée', en: 'Guided entry' }, { fr: 'Champs conditionnels et contrôles en direct : les erreurs sont signalées pendant la saisie, pas trois semaines plus tard.', en: 'Conditional fields and live checks: errors are flagged as you type, not three weeks later.' }],
      [{ fr: 'Requêtes dans l’eCRF', en: 'Queries in the eCRF' }, { fr: 'Chaque requête s’affiche sur le champ concerné. Vous répondez en un clic, sans changer d’écran.', en: 'Each query appears on the field it concerns. Reply in one click without leaving the form.' }],
      [{ fr: 'Signature électronique', en: 'Electronic signature' }, { fr: 'Signez vos visites par lot, avec ré-authentification conforme 21 CFR Part 11.', en: 'Sign visits in batches, with 21 CFR Part 11 compliant re-authentication.' }],
      [{ fr: 'Vue patient', en: 'Patient view' }, { fr: 'Toutes les visites, formulaires et requêtes d’un patient sur une seule ligne de temps.', en: 'All of a patient’s visits, forms and queries on a single timeline.' }],
    ],
    w: [
      { fr: 'Inclure le patient et vérifier l’éligibilité', en: 'Enrol the patient and check eligibility' },
      { fr: 'Saisir la visite pendant ou après la consultation', en: 'Enter the visit during or after the consultation' },
      { fr: 'Répondre aux requêtes de l’ARC', en: 'Answer the CRA’s queries' },
      { fr: 'Signer les visites terminées', en: 'Sign completed visits' },
    ],
    q: [{ fr: '« Les contrôles en direct ont changé notre façon de saisir : on corrige tout de suite, plus de relances. »', en: '“Live checks changed how we enter data: we fix things immediately, no more chasing.”' }, 'Dr S. Moreau', { fr: 'Investigatrice principale, centre de lutte contre le cancer', en: 'Principal investigator, cancer centre' }],
  },
  {
    k: 'arc',
    s: { fr: 'arc', en: 'cra' },
    n: { fr: 'ARC moniteur', en: 'CRA / Monitor' },
    ic: 'i-shield',
    h: { fr: 'Un monitoring ciblé, <em>pas une chasse aux erreurs.</em>', en: 'Targeted monitoring, <em>not error hunting.</em>' },
    p: { fr: 'Pour les attachés de recherche clinique moniteurs, côté promoteur ou CRO.', en: 'For clinical research associates on the sponsor or CRO side.' },
    f: [
      [{ fr: 'SDV ciblée', en: 'Targeted SDV' }, { fr: 'Marquez les données critiques et vérifiez-les en priorité, conformément à l’approche fondée sur les risques.', en: 'Flag critical data and verify it first, in line with a risk-based approach.' }],
      [{ fr: 'Tableau de bord par centre', en: 'Per-site dashboard' }, { fr: 'Délais de saisie, requêtes ouvertes, formulaires manquants : repérez les centres à visiter.', en: 'Entry delays, open queries, missing forms: spot which sites need a visit.' }],
      [{ fr: 'Requêtes structurées', en: 'Structured queries' }, { fr: 'Modèles de requêtes, relances automatiques et historique complet dans l’audit trail.', en: 'Query templates, automatic reminders and full history in the audit trail.' }],
      [{ fr: 'Rapports de visite', en: 'Visit reports' }, { fr: 'Préparez votre visite de monitoring à partir des écarts détectés à distance.', en: 'Prepare monitoring visits from discrepancies detected remotely.' }],
    ],
    w: [
      { fr: 'Consulter les indicateurs de chaque centre', en: 'Review each site’s indicators' },
      { fr: 'Vérifier les données critiques à distance', en: 'Verify critical data remotely' },
      { fr: 'Ouvrir et suivre les requêtes', en: 'Open and track queries' },
      { fr: 'Préparer et documenter la visite sur site', en: 'Prepare and document the site visit' },
    ],
    q: [{ fr: '« Je sais avant de partir quel centre a besoin de moi, et pourquoi. »', en: '“Before I leave, I know which site needs me, and why.”' }, 'Camille R.', { fr: 'ARC senior, CRO', en: 'Senior CRA, CRO' }],
  },
  {
    k: 'dm',
    s: { fr: 'data-manager', en: 'data-manager' },
    n: { fr: 'Data manager', en: 'Data manager' },
    ic: 'i-form',
    h: { fr: 'De la conception au gel de base, <em>sans tableur.</em>', en: 'From build to database lock, <em>no spreadsheets.</em>' },
    p: { fr: 'Pour les data managers et les équipes de méthodologie et biostatistique.', en: 'For data managers and methodology and biostatistics teams.' },
    f: [
      [{ fr: 'Form builder eCRF', en: 'eCRF form builder' }, { fr: 'Glisser-déposer, sections répétables, contrôles de cohérence et versionnage des amendements.', en: 'Drag and drop, repeatable sections, edit checks and amendment versioning.' }],
      [{ fr: 'Recette intégrée', en: 'Built-in UAT' }, { fr: 'Cahiers de test exécutables, statuts OK / KO / Bloqué et PV signable.', en: 'Executable test scripts, OK / KO / Blocked statuses and a signable report.' }],
      [{ fr: 'Import prospectif', en: 'Prospective import' }, { fr: 'Reprenez des données existantes avec mapping et rapport d’anomalies.', en: 'Bring in existing data with mapping and an anomaly report.' }],
      [{ fr: 'Exports CDISC', en: 'CDISC exports' }, { fr: 'ODM, CSV et jeux de données prêts pour l’analyse statistique.', en: 'ODM, CSV and datasets ready for statistical analysis.' }],
    ],
    w: [
      { fr: 'Construire l’eCRF depuis le protocole', en: 'Build the eCRF from the protocol' },
      { fr: 'Recetter en environnement UAT', en: 'Test in the UAT environment' },
      { fr: 'Suivre la qualité et gérer les requêtes', en: 'Track quality and manage queries' },
      { fr: 'Geler la base et exporter', en: 'Lock the database and export' },
    ],
    q: [{ fr: '« L’import prospectif nous a évité trois semaines de ressaisie sur une étude déjà lancée. »', en: '“Prospective import saved us three weeks of re-entry on a study already underway.”' }, 'Thomas M.', { fr: 'Data manager, CHU', en: 'Data manager, university hospital' }],
  },
  {
    k: 'sp',
    s: { fr: 'promoteur', en: 'sponsor' },
    n: { fr: 'Promoteur', en: 'Sponsor' },
    ic: 'i-flask',
    h: { fr: 'Toutes vos études, <em>une seule vue.</em>', en: 'All your studies, <em>one view.</em>' },
    p: { fr: 'Pour les promoteurs académiques et industriels, chefs de projet et responsables qualité.', en: 'For academic and industry sponsors, project managers and quality leads.' },
    f: [
      [{ fr: 'Vue portefeuille', en: 'Portfolio view' }, { fr: 'Inclusions, avancement et qualité de chaque étude sur un même tableau de bord.', en: 'Enrolment, progress and quality of every study on one dashboard.' }],
      [{ fr: 'Conformité documentée', en: 'Documented compliance' }, { fr: 'Dossier de validation GAMP 5, hébergement HDS et audit trail exportable pour vos inspections.', en: 'GAMP 5 validation package, HDS hosting and exportable audit trail for inspections.' }],
      [{ fr: 'Accès délégués', en: 'Delegated access' }, { fr: 'Ouvrez des accès limités à vos CRO et prestataires, par étude et par rôle.', en: 'Grant scoped access to CROs and vendors, per study and role.' }],
      [{ fr: 'Mise en production rapide', en: 'Fast go-live' }, { fr: '2 à 4 semaines entre le protocole et le premier patient, recette comprise.', en: '2 to 4 weeks from protocol to first patient, UAT included.' }],
    ],
    w: [
      { fr: 'Lancer l’étude avec l’équipe projet Synapse', en: 'Launch the study with the Synapse project team' },
      { fr: 'Suivre les inclusions et la qualité par centre', en: 'Track enrolment and quality per site' },
      { fr: 'Préparer les inspections et audits', en: 'Prepare for inspections and audits' },
      { fr: 'Clôturer et archiver', en: 'Close out and archive' },
    ],
    q: [{ fr: '« L’audit trail est lisible. Lors de l’inspection, tout était déjà prêt. »', en: '“The audit trail is readable. When the inspection came, everything was ready.”' }, 'Sophie B.', { fr: 'Responsable qualité, promoteur', en: 'Quality lead, sponsor' }],
  },
];
