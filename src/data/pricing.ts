import type { L } from '../i18n';

export interface Plan {
  k: 'academic' | 'industry' | 'enterprise';
  feat?: boolean;
  n: L;
  f: L;
  p: L;
  u: L;
  h: L | null;
  li: L[];
}

export const PLANS: Plan[] = [
  {
    k: 'academic',
    n: { fr: 'Académique', en: 'Academic' },
    f: { fr: 'Pour les promoteurs institutionnels, CHU et équipes de recherche.', en: 'For institutional sponsors, university hospitals and research teams.' },
    p: { fr: '4 900 €', en: '€4,900' },
    u: { fr: '/ étude / an HT', en: '/ study / year excl. VAT' },
    h: null,
    li: [
      { fr: '1 étude en production', en: '1 study in production' },
      { fr: 'Centres et utilisateurs illimités', en: 'Unlimited sites and users' },
      { fr: 'Form builder eCRF et contrôles', en: 'eCRF form builder and edit checks' },
      { fr: 'Audit trail 21 CFR Part 11', en: '21 CFR Part 11 audit trail' },
      { fr: 'Support e-mail, J+1 ouvré', en: 'Email support, next business day' },
    ],
  },
  {
    k: 'industry', feat: true,
    n: { fr: 'Industrie', en: 'Industry' },
    f: { fr: 'Pour les promoteurs industriels, biotech et medtech.', en: 'For industry sponsors, biotech and medtech.' },
    p: { fr: '14 900 €', en: '€14,900' },
    u: { fr: '/ étude / an HT', en: '/ study / year excl. VAT' },
    h: { fr: 'Tout Académique, plus :', en: 'Everything in Academic, plus:' },
    li: [
      { fr: 'Signature électronique eIDAS', en: 'eIDAS electronic signature' },
      { fr: 'Import prospectif', en: 'Prospective import' },
      { fr: 'Export CDISC ODM', en: 'CDISC ODM export' },
      { fr: 'Recette UAT accompagnée', en: 'Assisted UAT' },
      { fr: 'Support prioritaire, 4 h ouvrées', en: 'Priority support, 4 business hours' },
    ],
  },
  {
    k: 'enterprise',
    n: { fr: 'Entreprise & CRO', en: 'Enterprise & CRO' },
    f: { fr: 'Pour les CRO et les portefeuilles multi-études.', en: 'For CROs and multi-study portfolios.' },
    p: { fr: 'Sur devis', en: 'Custom' },
    u: { fr: 'licence annuelle', en: 'annual licence' },
    h: { fr: 'Tout Industrie, plus :', en: 'Everything in Industry, plus:' },
    li: [
      { fr: 'Études illimitées', en: 'Unlimited studies' },
      { fr: 'Hébergement HDS dédié', en: 'Dedicated HDS hosting' },
      { fr: 'SSO SAML / OIDC', en: 'SAML / OIDC SSO' },
      { fr: 'Chef de projet dédié', en: 'Dedicated project manager' },
      { fr: 'Support 24/7, SLA 99,9 %', en: '24/7 support, 99.9% SLA' },
    ],
  },
];

/** A section header (one cell) or a feature row: 1 = included, 0 = not included, otherwise a label. */
export type CmpCell = 0 | 1 | L;
export const CMP: (([L] | [L, CmpCell, CmpCell, CmpCell]))[] = [
  [{ fr: 'Plateforme', en: 'Platform' }],
  [{ fr: 'Centres et utilisateurs illimités', en: 'Unlimited sites and users' }, 1, 1, 1],
  [{ fr: 'Form builder eCRF', en: 'eCRF form builder' }, 1, 1, 1],
  [{ fr: 'Audit trail 21 CFR Part 11', en: '21 CFR Part 11 audit trail' }, 1, 1, 1],
  [{ fr: 'Import prospectif', en: 'Prospective import' }, { fr: 'Option', en: 'Add-on' }, 1, 1],
  [{ fr: 'Signature eIDAS', en: 'eIDAS signature' }, 0, 1, 1],
  [{ fr: 'Export CDISC ODM', en: 'CDISC ODM export' }, 0, 1, 1],
  [{ fr: 'Sécurité & service', en: 'Security & service' }],
  [{ fr: 'SSO SAML / OIDC', en: 'SAML / OIDC SSO' }, 0, 0, 1],
  [{ fr: 'Hébergement HDS dédié', en: 'Dedicated HDS hosting' }, 0, 0, 1],
  [{ fr: 'Disponibilité garantie', en: 'Guaranteed uptime' }, { fr: '99,5 %', en: '99.5%' }, { fr: '99,5 %', en: '99.5%' }, { fr: '99,9 %', en: '99.9%' }],
  [{ fr: 'Support', en: 'Support' }, { fr: 'J+1 ouvré', en: 'Next business day' }, { fr: '4 h ouvrées', en: '4 business hours' }, '24/7'],
];

export const ADDONS: [L, L, L][] = [
  [{ fr: 'Formation sur site', en: 'On-site training' }, { fr: 'Par rôle, jusqu’à 12 personnes', en: 'Role-based, up to 12 people' }, { fr: '1 200 € / jour', en: '€1,200 / day' }],
  [{ fr: 'Paramétrage eCRF par nos équipes', en: 'eCRF build by our team' }, { fr: 'À partir du protocole validé', en: 'From the approved protocol' }, { fr: 'Sur devis', en: 'Custom' }],
  [{ fr: 'Import prospectif (Académique)', en: 'Prospective import (Academic)' }, { fr: 'Mapping et rapport d’anomalies', en: 'Mapping and anomaly report' }, { fr: '1 500 € / étude', en: '€1,500 / study' }],
  [{ fr: 'Migration depuis un autre EDC', en: 'Migration from another EDC' }, { fr: 'Données et audit trail historiques', en: 'Historical data and audit trail' }, { fr: 'Sur devis', en: 'Custom' }],
];

export const PRICING_FAQ: [L, L][] = [
  [{ fr: 'Qu’est-ce qui est inclus dans le prix ?', en: 'What is included in the price?' }, { fr: 'Hébergement HDS, sauvegardes quotidiennes, mises à jour, support et accès illimité pour les centres et utilisateurs de l’étude.', en: 'HDS hosting, daily backups, updates, support and unlimited access for the study’s sites and users.' }],
  [{ fr: 'Comment une étude est-elle comptée ?', en: 'How is a study counted?' }, { fr: 'Une étude correspond à un protocole en production, quel que soit le nombre de centres ou de patients. La conception et la recette ne sont pas facturées.', en: 'A study is one protocol in production, regardless of the number of sites or patients. Design and UAT are not billed.' }],
  [{ fr: 'Que se passe-t-il à la fin de l’étude ?', en: 'What happens when the study ends?' }, { fr: 'Après le gel de base, les données restent consultables en lecture seule et archivables pendant la durée réglementaire, sans surcoût la première année.', en: 'After database lock, data stays available read-only and can be archived for the regulatory period, at no extra cost in the first year.' }],
];
