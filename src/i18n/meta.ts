import { CASES } from '../data/cases';
import { FEATURES } from '../data/features';
import { POSTS } from '../data/posts';
import { ROLES } from '../data/roles';
import { tr, type Lang } from './index';
import type { RouteKey } from './routes';

type Pair = { fr: [string, string]; en: [string, string] };

const BASE: Record<string, Pair> = {
  home: { fr: ['Synapse Medical — EDC pour la recherche clinique', 'Plateforme EDC conforme 21 CFR Part 11, hébergée HDS en France : conception d’études, eCRF, monitoring et export.'], en: ['Synapse Medical — EDC for clinical research', '21 CFR Part 11 compliant EDC platform hosted on HDS infrastructure in France: study design, eCRF, monitoring and export.'] },
  soon: { fr: ['Feuille de route — Synapse Medical', 'Ce que prépare la prochaine version de Synapse EDC.'], en: ['Roadmap — Synapse Medical', 'What the next version of Synapse EDC brings.'] },
  status: { fr: ['Statut des services — Synapse Medical', 'Disponibilité en temps réel de la plateforme EDC, de l’API et de l’hébergement HDS.'], en: ['Service status — Synapse Medical', 'Real-time availability of the EDC platform, API and HDS hosting.'] },
  pricing: { fr: ['Tarifs — Synapse Medical', 'Offres Académique, Industrie et Entreprise. Hébergement HDS, sauvegardes et support inclus.'], en: ['Pricing — Synapse Medical', 'Academic, Industry and Enterprise plans. HDS hosting, backups and support included.'] },
  demo: { fr: ['Demander une démo — Synapse Medical', '30 minutes pour voir Synapse appliqué à votre protocole.'], en: ['Book a demo — Synapse Medical', '30 minutes to see Synapse applied to your protocol.'] },
  blog: { fr: ['Blog — Synapse Medical', 'Réglementation, méthodes et retours d’expérience pour les équipes de recherche clinique.'], en: ['Blog — Synapse Medical', 'Regulation, methods and field experience for clinical research teams.'] },
  changelog: { fr: ['Nouveautés — Synapse Medical', 'Toutes les évolutions de Synapse EDC, version par version.'], en: ['What’s new — Synapse Medical', 'Every Synapse EDC update, release by release.'] },
  security: { fr: ['Sécurité & conformité — Synapse Medical', 'Hébergement HDS, chiffrement, audit trail, validation GAMP 5 et sous-traitants RGPD.'], en: ['Security & compliance — Synapse Medical', 'HDS hosting, encryption, audit trail, GAMP 5 validation and GDPR sub-processors.'] },
  nf: { fr: ['Page introuvable — Synapse Medical', 'Cette page n’existe pas ou a été déplacée.'], en: ['Page not found — Synapse Medical', 'This page does not exist or has moved.'] },
  cases: { fr: ['Études de cas — Synapse Medical', 'Promoteurs académiques, CRO et biotech : comment ils ont lancé leurs études sur Synapse.'], en: ['Case studies — Synapse Medical', 'Academic sponsors, CROs and biotech: how they launched their studies on Synapse.'] },
  legal: { fr: ['Mentions légales — Synapse Medical', 'Éditeur, hébergement et propriété intellectuelle.'], en: ['Legal notice — Synapse Medical', 'Publisher, hosting and intellectual property.'] },
  privacy: { fr: ['Politique de confidentialité — Synapse Medical', 'Données collectées, finalités, durées de conservation, cookies et droits.'], en: ['Privacy policy — Synapse Medical', 'Data collected, purposes, retention, cookies and rights.'] },
  features: { fr: ['Fonctionnalités — Synapse Medical', 'Form builder eCRF, monitoring, import prospectif, exports CDISC.'], en: ['Features — Synapse Medical', 'eCRF form builder, monitoring, prospective import, CDISC exports.'] },
  integrations: { fr: ['Intégrations — Synapse Medical', 'API REST, webhooks, SSO SAML/OIDC, laboratoires, exports SAS et R.'], en: ['Integrations — Synapse Medical', 'REST API, webhooks, SAML/OIDC SSO, labs, SAS and R exports.'] },
  about: { fr: ['À propos — Synapse Medical', 'Notre histoire, notre mission et l’équipe derrière Synapse.'], en: ['About — Synapse Medical', 'Our story, mission and the team behind Synapse.'] },
  careers: { fr: ['Carrières — Synapse Medical', 'Rejoignez les équipes produit, plateforme et qualité.'], en: ['Careers — Synapse Medical', 'Join the product, platform and quality teams.'] },
  glossary: { fr: ['Glossaire de la recherche clinique — Synapse Medical', 'eCRF, SDV, RIPH, audit trail… les notions clés expliquées.'], en: ['Clinical research glossary — Synapse Medical', 'eCRF, SDV, RIPH, audit trail… key concepts explained.'] },
  tour: { fr: ['Visite guidée — Synapse Medical', 'Essayez la saisie d’une visite dans Synapse, sans inscription.'], en: ['Product tour — Synapse Medical', 'Try entering a visit in Synapse, no sign-up.'] },
  trust: { fr: ['Centre de confiance — Synapse Medical', 'Disponibilité, sécurité, conformité et documents d’audit.'], en: ['Trust center — Synapse Medical', 'Uptime, security, compliance and audit documents.'] },
  disclosure: { fr: ['Divulgation responsable — Synapse Medical', 'Signaler une vulnérabilité de sécurité.'], en: ['Responsible disclosure — Synapse Medical', 'Report a security vulnerability.'] },
};

/** Title and description of a page, for <title>, Open Graph and the search index. */
export function metaOf(key: RouteKey | 'nf', lang: Lang, id?: string): [string, string] {
  if (key === 'role') {
    const r = ROLES.find((x) => x.k === id)!;
    return [`${tr(lang, r.n)} — Synapse Medical`, tr(lang, r.p)];
  }
  if (key === 'case') {
    const c = CASES.find((x) => x.k === id)!;
    return [`${tr(lang, c.t)} — Synapse Medical`, tr(lang, c.x)];
  }
  if (key === 'feature') {
    const f = FEATURES.find((x) => x.k === id)!;
    return [`${tr(lang, f.n)} — Synapse Medical`, tr(lang, f.p)];
  }
  if (key === 'post') {
    const p = POSTS.find((x) => x.id === id)!;
    return [`${tr(lang, p.t)} — Synapse Medical`, tr(lang, p.x)];
  }
  return BASE[key][lang];
}

/** Image used for Open Graph, per page family (exported to public/og/, see the issue on share images). */
export const OG_KEY: Partial<Record<RouteKey, string>> = {
  home: 'home', pricing: 'pricing', security: 'security', trust: 'security', cases: 'cases', case: 'cases',
  post: 'blog', blog: 'blog', status: 'status', tour: 'tour', features: 'features', feature: 'features',
};
