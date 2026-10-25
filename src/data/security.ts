import type { L } from '../i18n';

export const PILLARS: [string, L, L][] = [
  ['i-shield', { fr: 'Hébergement HDS en France', en: 'HDS hosting in France' }, { fr: 'Données de santé hébergées chez un hébergeur certifié HDS et ISO 27001, sur deux sites distincts en France.', en: 'Health data hosted by an HDS and ISO 27001 certified provider, across two separate sites in France.' }],
  ['i-shield', { fr: 'Chiffrement', en: 'Encryption' }, { fr: '<b>AES-256</b> au repos, <b>TLS 1.3</b> en transit. Les clés sont gérées séparément des données.', en: '<b>AES-256</b> at rest, <b>TLS 1.3</b> in transit. Keys are managed separately from data.' }],
  ['i-users', { fr: 'Contrôle des accès', en: 'Access control' }, { fr: 'Double authentification obligatoire, rôles par étude et par centre, revue périodique des droits.', en: 'Mandatory two-factor authentication, roles per study and site, periodic access reviews.' }],
  ['i-form', { fr: 'Audit trail immuable', en: 'Immutable audit trail' }, { fr: 'En ajout seul, horodaté en UTC : ancienne valeur, nouvelle valeur, auteur et motif.', en: 'Append-only, UTC-stamped: old value, new value, author and reason.' }],
  ['i-import', { fr: 'Sauvegardes et PRA', en: 'Backups and DR' }, { fr: 'Sauvegardes chiffrées quotidiennes sur un second site. <b>RPO 24 h</b>, <b>RTO 4 h</b>, testé chaque année.', en: 'Daily encrypted backups to a second site. <b>RPO 24 h</b>, <b>RTO 4 h</b>, tested yearly.' }],
  ['i-flask', { fr: 'Tests et validation', en: 'Testing and validation' }, { fr: 'Validation GAMP 5 à chaque version, test d’intrusion annuel par un prestataire indépendant.', en: 'GAMP 5 validation for every release, yearly penetration test by an independent provider.' }],
];

export const FRAMEWORKS: [L, L][] = [
  ['21 CFR Part 11', { fr: 'Enregistrements et signatures électroniques', en: 'Electronic records & signatures' }],
  ['ICH-GCP E6(R3)', { fr: 'Bonnes pratiques cliniques', en: 'Good clinical practice' }],
  [{ fr: 'RGPD', en: 'GDPR' }, { fr: 'Protection des données personnelles', en: 'Personal data protection' }],
  ['HDS', { fr: 'Hébergeur de données de santé', en: 'Health data hosting' }],
  ['GAMP 5', { fr: 'Validation des systèmes informatisés', en: 'Computerised system validation' }],
  ['ISO 27001', { fr: 'Sécurité de l’information (hébergeur)', en: 'Information security (host)' }],
];

export const AUDIT_DOCS: [string, string, L, L][] = [
  ['validation', 'PDF', { fr: 'Dossier de validation GAMP 5', en: 'GAMP 5 validation package' }, { fr: 'Stratégie, matrice de traçabilité, PV de la version en cours', en: 'Strategy, traceability matrix, current release report' }],
  ['hds', 'PDF', { fr: 'Certificat HDS de l’hébergeur', en: 'Hosting provider HDS certificate' }, { fr: 'Périmètre, organisme certificateur, validité', en: 'Scope, certification body, validity' }],
  ['rgpd', 'XLSX', { fr: 'Registre des sous-traitants', en: 'Sub-processor register' }, { fr: 'Activités, localisation et garanties contractuelles', en: 'Activities, location and contractual safeguards' }],
  ['pentest', 'PDF', { fr: 'Synthèse du dernier test d’intrusion', en: 'Latest penetration test summary' }, { fr: 'Réalisé par un prestataire indépendant', en: 'Performed by an independent provider' }],
];

export const SUBPROCESSORS: [L, L, L][] = [
  [{ fr: 'Hébergement des données de santé', en: 'Health data hosting' }, { fr: 'France', en: 'France' }, { fr: 'Certifié HDS, ISO 27001', en: 'HDS, ISO 27001 certified' }],
  [{ fr: 'Sauvegardes chiffrées', en: 'Encrypted backups' }, { fr: 'France (second site)', en: 'France (second site)' }, { fr: 'Certifié HDS', en: 'HDS certified' }],
  [{ fr: 'E-mails transactionnels', en: 'Transactional email' }, { fr: 'Union européenne', en: 'European Union' }, { fr: 'DPA, aucune donnée patient', en: 'DPA, no patient data' }],
  [{ fr: 'Support et tickets', en: 'Support and ticketing' }, { fr: 'Union européenne', en: 'European Union' }, { fr: 'DPA, aucune donnée patient', en: 'DPA, no patient data' }],
];

/** Names of the audit documents, used to pre-fill the demo form (?doc=…). */
export const DOC_NAMES: Record<string, L> = Object.fromEntries(AUDIT_DOCS.map((d) => [d[0], d[2]]));
