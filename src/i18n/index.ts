export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];

// A text that exists in French and, optionally, in English (French is the fallback).
export type L = string | { fr: string; en?: string };

export const tr = (lang: Lang, o: L | undefined | null): string =>
  o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.fr);

export const initials = (name: string) =>
  name
    .split(' ')
    .map((x) => x[0])
    .join('')
    .slice(0, 2);
