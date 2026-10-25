import { DOCS } from '../site';
import type { Lang } from './index';

/** Address of a page of the documentation site (French at the root, English under /en/). */
export const docsUrl = (lang: Lang, p = '/') => `${DOCS}${lang === 'en' ? '/en' : ''}${p}`;
