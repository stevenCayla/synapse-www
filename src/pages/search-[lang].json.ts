import type { APIRoute, GetStaticPaths } from 'astro';
import { CASES } from '../data/cases';
import { FEATURES } from '../data/features';
import { GLOSSARY } from '../data/glossary';
import { POSTS } from '../data/posts';
import { ROLES } from '../data/roles';
import { LANGS, tr, type Lang } from '../i18n';
import { docsUrl } from '../i18n/docs';
import { metaOf } from '../i18n/meta';
import { path, type StaticKey } from '../i18n/routes';

export const getStaticPaths = (() => LANGS.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang as Lang;
  const site = tr(lang, { fr: 'Site', en: 'Website' });
  const items: { g: string; t: string; d: string; url: string; ext?: boolean }[] = [];
  const add = (g: string, t: string, d: string, url: string, ext = false) => items.push({ g, t: strip(t), d: strip(d), url, ext });

  const pages: [StaticKey, string][] = [
    ['home', tr(lang, { fr: 'Accueil', en: 'Home' })],
    ['features', tr(lang, { fr: 'Fonctionnalités', en: 'Features' })],
    ['integrations', tr(lang, { fr: 'Intégrations', en: 'Integrations' })],
    ['tour', tr(lang, { fr: 'Visite guidée', en: 'Product tour' })],
    ['pricing', tr(lang, { fr: 'Tarifs', en: 'Pricing' })],
    ['security', tr(lang, { fr: 'Sécurité & conformité', en: 'Security & compliance' })],
    ['trust', tr(lang, { fr: 'Centre de confiance', en: 'Trust center' })],
    ['disclosure', tr(lang, { fr: 'Divulgation responsable', en: 'Responsible disclosure' })],
    ['demo', tr(lang, { fr: 'Demander une démo', en: 'Book a demo' })],
    ['cases', tr(lang, { fr: 'Études de cas', en: 'Case studies' })],
    ['blog', 'Blog'],
    ['changelog', tr(lang, { fr: 'Nouveautés', en: 'What’s new' })],
    ['soon', tr(lang, { fr: 'Feuille de route', en: 'Roadmap' })],
    ['status', tr(lang, { fr: 'Statut des services', en: 'Service status' })],
    ['glossary', tr(lang, { fr: 'Glossaire', en: 'Glossary' })],
    ['about', tr(lang, { fr: 'À propos', en: 'About' })],
    ['careers', tr(lang, { fr: 'Carrières', en: 'Careers' })],
    ['legal', tr(lang, { fr: 'Mentions légales', en: 'Legal notice' })],
    ['privacy', tr(lang, { fr: 'Politique de confidentialité', en: 'Privacy policy' })],
  ];
  for (const [k, name] of pages) add(site, name, metaOf(k, lang)[1], path(k, lang));
  for (const f of FEATURES) add(site, tr(lang, f.n), tr(lang, f.p), path('feature', lang, f.k));
  for (const r of ROLES) add(site, `Solutions · ${tr(lang, r.n)}`, tr(lang, r.p), path('role', lang, r.k));
  for (const c of CASES) add(site, tr(lang, c.t), tr(lang, c.x), path('case', lang, c.k));
  for (const p of POSTS) add('Blog', tr(lang, p.t), tr(lang, p.x), path('post', lang, p.id));
  for (const [term, def] of GLOSSARY) add(tr(lang, { fr: 'Glossaire', en: 'Glossary' }), tr(lang, term), tr(lang, def), path('glossary', lang));

  const docs: [Parameters<typeof tr>[1], string, Parameters<typeof tr>[1]][] = [
    [{ fr: 'Premiers pas', en: 'Getting started' }, '/guides/premiers-pas/', { fr: 'Prendre en main Synapse', en: 'Get started with Synapse' }],
    [{ fr: 'Recette : création d’étude', en: 'UAT: study creation' }, '/recette/creation-etude/', { fr: 'Cahier de recette REC-01', en: 'UAT script REC-01' }],
    [{ fr: 'FAQ conformité', en: 'Compliance FAQ' }, '/resources/compliance-faq/', { fr: '21 CFR Part 11, HDS, RGPD, validation', en: '21 CFR Part 11, HDS, GDPR, validation' }],
    [{ fr: 'Glossaire (documentation)', en: 'Glossary (documentation)' }, '/resources/glossary/', { fr: 'RIPH, SDV, RBQM, CPP…', en: 'RIPH, SDV, RBQM, CPP…' }],
    [{ fr: 'Journal des modifications', en: 'Changelog' }, '/changelog/', { fr: 'Notes techniques par version', en: 'Technical release notes' }],
    [{ fr: 'Architecture', en: 'Architecture' }, '/architecture/overview/', { fr: 'Services, modèle de données, flux', en: 'Services, data model, flows' }],
  ];
  for (const [t, u, d] of docs) add('Documentation', tr(lang, t), tr(lang, d), docsUrl(lang, u), true);

  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
