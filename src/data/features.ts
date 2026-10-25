import type { L } from '../i18n';
import type { Role } from './roles';

export interface Feature {
  k: 'fb' | 'mon' | 'imp' | 'exp';
  ic: string;
  s: { fr: string; en: string };
  n: L;
  h: L;
  p: L;
  pts: [L, L][];
  sp: L[];
  roles: Role['k'][];
}

export const FEATURES: Feature[] = [
  {
    k: 'fb', ic: 'i-form', s: { fr: 'form-builder', en: 'form-builder' },
    n: { fr: 'Form builder eCRF', en: 'eCRF form builder' },
    h: { fr: 'Votre eCRF, <em>construit en jours, pas en semaines.</em>', en: 'Your eCRF, <em>built in days, not weeks.</em>' },
    p: { fr: 'Concevez les formulaires de l’étude par glisser-déposer, avec contrôles de cohérence et versionnage des amendements.', en: 'Design study forms by drag and drop, with edit checks and amendment versioning.' },
    pts: [
      [{ fr: 'Glisser-déposer', en: 'Drag and drop' }, { fr: 'Champs, sections répétables, tableaux et champs conditionnels.', en: 'Fields, repeatable sections, grids and conditional fields.' }],
      [{ fr: 'Contrôles de cohérence', en: 'Edit checks' }, { fr: 'Bornes, formats, cohérence entre dates, calculs automatiques.', en: 'Ranges, formats, cross-date consistency, derived values.' }],
      [{ fr: 'Amendements maîtrisés', en: 'Controlled amendments' }, { fr: 'Nouvelle version du formulaire sans perte des données déjà saisies.', en: 'New form versions without losing data already entered.' }],
      [{ fr: 'Bibliothèque', en: 'Library' }, { fr: 'Réutilisez vos formulaires standard d’une étude à l’autre.', en: 'Reuse your standard forms across studies.' }],
    ],
    sp: [
      { fr: 'Aperçu en direct, côté centre', en: 'Live preview, site view' },
      { fr: 'Dates partielles (UK/MM/AAAA)', en: 'Partial dates (UK/MM/YYYY)' },
      { fr: 'Libellés bilingues', en: 'Bilingual labels' },
      { fr: 'Marquage des données critiques', en: 'Critical data flagging' },
      { fr: 'Export de la spécification eCRF', en: 'eCRF specification export' },
      { fr: 'Recette intégrée', en: 'Built-in UAT' },
    ],
    roles: ['dm', 'sp'],
  },
  {
    k: 'mon', ic: 'i-shield', s: { fr: 'monitoring', en: 'monitoring' },
    n: { fr: 'Monitoring et requêtes', en: 'Monitoring and queries' },
    h: { fr: 'Un monitoring <em>fondé sur les risques.</em>', en: 'Monitoring, <em>risk-based.</em>' },
    p: { fr: 'Repérez à distance les centres qui ont besoin d’attention et résolvez les requêtes directement dans l’eCRF.', en: 'Spot remotely which sites need attention and resolve queries right inside the eCRF.' },
    pts: [
      [{ fr: 'Indicateurs par centre', en: 'Per-site indicators' }, { fr: 'Délais de saisie, requêtes, formulaires manquants, valeurs atypiques.', en: 'Entry delays, queries, missing forms, outliers.' }],
      [{ fr: 'SDV ciblée', en: 'Targeted SDV' }, { fr: 'Vérification prioritaire des données critiques, statut par champ.', en: 'Critical data verified first, status per field.' }],
      [{ fr: 'Requêtes dans l’eCRF', en: 'Queries in the eCRF' }, { fr: 'Ouverture, réponse et clôture sur le champ concerné.', en: 'Open, answer and close on the field itself.' }],
      [{ fr: 'Relances automatiques', en: 'Automatic reminders' }, { fr: 'Les requêtes sans réponse sont relancées selon vos règles.', en: 'Unanswered queries are chased according to your rules.' }],
    ],
    sp: [
      { fr: 'Modèles de requêtes', en: 'Query templates' },
      { fr: 'Historique dans l’audit trail', en: 'History in the audit trail' },
      { fr: 'Export des indicateurs', en: 'Indicator export' },
      { fr: 'Vue portefeuille promoteur', en: 'Sponsor portfolio view' },
      { fr: 'Rapports de visite', en: 'Visit reports' },
      { fr: 'Accès délégués CRO', en: 'Delegated CRO access' },
    ],
    roles: ['arc', 'sp'],
  },
  {
    k: 'imp', ic: 'i-import', s: { fr: 'import-prospectif', en: 'prospective-import' },
    n: { fr: 'Import prospectif', en: 'Prospective import' },
    h: { fr: 'Reprenez une étude en cours, <em>sans ressaisie.</em>', en: 'Take over an ongoing study, <em>no re-entry.</em>' },
    p: { fr: 'Chargez des données existantes depuis Excel ou CSV, avec mapping assisté et contrôles ligne à ligne.', en: 'Load existing data from Excel or CSV, with assisted mapping and row-by-row checks.' },
    pts: [
      [{ fr: 'Mapping assisté', en: 'Assisted mapping' }, { fr: 'Correspondance proposée entre colonnes et champs, enregistrable.', en: 'Suggested column-to-field matching, saved for reuse.' }],
      [{ fr: 'Mêmes contrôles qu’en saisie', en: 'Same checks as entry' }, { fr: 'Chaque ligne passe les contrôles de cohérence de l’étude.', en: 'Every row runs the study’s edit checks.' }],
      [{ fr: 'Rapport d’anomalies', en: 'Anomaly report' }, { fr: 'Les lignes en erreur sont listées sans bloquer les autres.', en: 'Failing rows are listed without blocking the rest.' }],
      [{ fr: 'Traçabilité', en: 'Traceability' }, { fr: 'Source, auteur et date de l’import dans l’audit trail.', en: 'Source, author and date of import in the audit trail.' }],
    ],
    sp: [
      { fr: 'Excel multi-onglets', en: 'Multi-sheet Excel' },
      { fr: 'Données identifiantes RIPH 1 et 2', en: 'Identifying data for RIPH 1 and 2' },
      { fr: 'Import incrémental', en: 'Incremental import' },
      { fr: 'Simulation avant chargement', en: 'Dry run before load' },
      { fr: 'Annulation d’un import', en: 'Import rollback' },
      { fr: 'Recette REC-01b fournie', en: 'UAT script REC-01b provided' },
    ],
    roles: ['dm'],
  },
  {
    k: 'exp', ic: 'i-flask', s: { fr: 'exports', en: 'exports' },
    n: { fr: 'Exports et gel de base', en: 'Exports and database lock' },
    h: { fr: 'Des données prêtes <em>pour l’analyse.</em>', en: 'Data ready <em>for analysis.</em>' },
    p: { fr: 'Gelez par patient, formulaire ou étude, puis exportez vers vos outils statistiques.', en: 'Lock by patient, form or study, then export to your statistical tools.' },
    pts: [
      [{ fr: 'Gel progressif', en: 'Progressive lock' }, { fr: 'Par patient, visite, formulaire ou étude complète.', en: 'By patient, visit, form or whole study.' }],
      [{ fr: 'CDISC ODM', en: 'CDISC ODM' }, { fr: 'Export ODM 1.3.2 avec métadonnées.', en: 'ODM 1.3.2 export with metadata.' }],
      [{ fr: 'CSV et dictionnaire', en: 'CSV and data dictionary' }, { fr: 'Fichiers à plat et dictionnaire des variables pour SAS, R ou Stata.', en: 'Flat files and variable dictionary for SAS, R or Stata.' }],
      [{ fr: 'Exports planifiés', en: 'Scheduled exports' }, { fr: 'Extractions récurrentes déposées sur un espace sécurisé.', en: 'Recurring extracts delivered to a secure space.' }],
    ],
    sp: [
      { fr: 'Audit trail exportable', en: 'Exportable audit trail' },
      { fr: 'Exports par centre', en: 'Per-site exports' },
      { fr: 'Archivage en lecture seule', en: 'Read-only archive' },
      { fr: 'Pseudonymisation à l’export', en: 'Pseudonymisation on export' },
      { fr: 'Historique des exports', en: 'Export history' },
      { fr: 'Export SDTM (planifié)', en: 'SDTM export (planned)' },
    ],
    roles: ['dm', 'sp'],
  },
];

export type IntegrationStatus = 'ok' | 'rq' | 'soon';
export const INTEGRATION_STATUS: Record<IntegrationStatus, L> = {
  ok: { fr: 'Disponible', en: 'Available' },
  rq: { fr: 'Sur demande', en: 'On request' },
  soon: { fr: 'En préparation', en: 'In progress' },
};
export const INTEGRATIONS: [L, L, [L, IntegrationStatus][]][] = [
  [{ fr: 'API REST et webhooks', en: 'REST API and webhooks' }, { fr: 'Lisez et écrivez patients, visites et formulaires ; recevez les événements en temps réel.', en: 'Read and write subjects, visits and forms; receive events in real time.' }, [['REST v1', 'ok'], ['Webhooks', 'ok'], ['OpenAPI 3', 'ok']]],
  [{ fr: 'Authentification unique', en: 'Single sign-on' }, { fr: 'Connexion avec l’annuaire de votre établissement.', en: 'Sign in with your organisation’s directory.' }, [['SAML 2.0', 'ok'], ['OpenID Connect', 'ok'], ['SCIM', 'soon']]],
  [{ fr: 'Laboratoires', en: 'Laboratories' }, { fr: 'Intégration des résultats biologiques avec normes par centre.', en: 'Lab results integration with per-site reference ranges.' }, [['HL7 v2', 'rq'], ['FHIR R4', 'soon'], ['CSV', 'ok']]],
  [{ fr: 'Imagerie', en: 'Imaging' }, { fr: 'Lien vers les examens et lecture centralisée.', en: 'Links to studies and central reading.' }, [['DICOM (PACS)', 'rq']]],
  [{ fr: 'Randomisation', en: 'Randomisation' }, { fr: 'Module intégré ou système externe via l’API.', en: 'Built-in module or external system via the API.' }, [[{ fr: 'Module intégré', en: 'Built-in module' }, 'ok'], ['IWRS / API', 'rq']]],
  [{ fr: 'Statistiques', en: 'Statistics' }, { fr: 'Jeux de données et dictionnaires prêts pour vos outils.', en: 'Datasets and dictionaries ready for your tools.' }, [['SAS', 'ok'], ['R', 'ok'], ['Stata', 'ok'], ['Python', 'ok'], ['CDISC ODM', 'ok'], ['SDTM', 'soon']]],
];
