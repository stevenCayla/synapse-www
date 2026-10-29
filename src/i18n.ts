export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];

// French is served at the root, English under /en/ (same layout as the documentation).
export const home = (lang: Lang) => (lang === 'en' ? '/en/' : '/');
export const demoPath = (lang: Lang) => (lang === 'en' ? '/en/demo/' : '/demo/');
export const docs = (lang: Lang, base: string) => (lang === 'en' ? `${base}/en/` : `${base}/`);

export const UI = {
  fr: { theme: 'Changer de thème', links: 'Liens', docs: 'Documentation', lang: 'Langue' },
  en: { theme: 'Toggle theme', links: 'Links', docs: 'Documentation', lang: 'Language' },
} as const;
