import { entryOf, path } from '../src/i18n/routes.ts';
import { SITE } from '../src/site.ts';

// Adds the French / English alternates of each page to the sitemap (the slugs differ per language,
// so the sitemap integration cannot pair them by itself).
export function alternates(item) {
  const hit = entryOf(new URL(item.url).pathname);
  if (!hit) return item;
  const { key, id } = hit.entry;
  const fr = SITE + path(key, 'fr', id);
  const en = SITE + path(key, 'en', id);
  item.links = [
    { url: fr, lang: 'fr' },
    { url: en, lang: 'en' },
    { url: fr, lang: 'x-default' },
  ];
  return item;
}
