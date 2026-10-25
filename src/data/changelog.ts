import type { L } from '../i18n';

export type ChangeType = 'new' | 'imp' | 'fix';
export const CHANGE_TYPES: Record<ChangeType, L> = {
  new: { fr: 'Nouveau', en: 'New' },
  imp: { fr: 'Amélioré', en: 'Improved' },
  fix: { fr: 'Corrigé', en: 'Fixed' },
};

export interface Release {
  v: string;
  date: L;
  title: L;
  current?: boolean;
  items: [ChangeType, L][];
}

export const RELEASES: Release[] = [
  {
    v: '3.1.0', current: true,
    date: { fr: '18 oct. 2026', en: 'Oct 18, 2026' },
    title: { fr: 'Import prospectif et signature eIDAS', en: 'Prospective import and eIDAS signatures' },
    items: [
      ['new', { fr: 'Import prospectif depuis Excel, avec mapping assisté et contrôles ligne à ligne.', en: 'Prospective import from Excel, with assisted mapping and row-by-row checks.' }],
      ['new', { fr: 'Conservation des données identifiantes pour les études RIPH 1 et 2 avec consentement.', en: 'Identifying data retained for RIPH 1 and 2 studies with consent.' }],
      ['new', { fr: 'Export CDISC ODM 1.3.2.', en: 'CDISC ODM 1.3.2 export.' }],
      ['new', { fr: 'Signature électronique qualifiée eIDAS.', en: 'Qualified eIDAS electronic signature.' }],
      ['imp', { fr: 'Tableau de bord centre deux fois plus rapide au-delà de 1 000 patients.', en: 'Site dashboard twice as fast beyond 1,000 patients.' }],
      ['fix', { fr: 'Les dates partielles (UK/MM/AAAA) sont correctement exportées en CSV.', en: 'Partial dates (UK/MM/YYYY) now export correctly to CSV.' }],
    ],
  },
  {
    v: '3.0',
    date: { fr: '22 sept. 2026', en: 'Sep 22, 2026' },
    title: { fr: 'Nouveau form builder', en: 'New form builder' },
    items: [
      ['new', { fr: 'Form builder eCRF refondu : glisser-déposer, sections répétables, aperçu en direct.', en: 'Redesigned eCRF form builder: drag and drop, repeatable sections, live preview.' }],
      ['new', { fr: 'Mode Avancé de création d’étude.', en: 'Advanced study creation mode.' }],
      ['imp', { fr: 'Les requêtes s’ouvrent et se résolvent depuis le champ concerné.', en: 'Queries are opened and resolved from the field itself.' }],
      ['imp', { fr: 'Recherche patient par identifiant, centre ou visite.', en: 'Patient search by ID, site or visit.' }],
      ['fix', { fr: 'Le compteur de requêtes ouvertes exclut les requêtes annulées.', en: 'The open query counter excludes cancelled queries.' }],
    ],
  },
  {
    v: '2.9',
    date: { fr: '11 juil. 2026', en: 'Jul 11, 2026' },
    title: { fr: 'Audit trail filtrable et thème sombre', en: 'Filterable audit trail and dark theme' },
    items: [
      ['new', { fr: 'Thème sombre.', en: 'Dark theme.' }],
      ['imp', { fr: 'Audit trail filtrable par utilisateur, formulaire et période, exportable en PDF.', en: 'Audit trail filterable by user, form and period, exportable to PDF.' }],
      ['fix', { fr: 'L’expiration de session redirige vers la connexion sans perte de saisie.', en: 'Session expiry redirects to sign-in without losing entered data.' }],
    ],
  },
];
