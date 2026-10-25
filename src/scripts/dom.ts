export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];
export const lang = (): 'fr' | 'en' => (document.documentElement.lang === 'en' ? 'en' : 'fr');
export const L = (fr: string, en: string) => (lang() === 'en' ? en : fr);
export const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage can be unavailable (private window, blocked data) */
    }
  },
};
