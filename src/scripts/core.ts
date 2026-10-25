import { $, $$, lang, store } from './dom';

/* theme */
const themeBtn = $('#theme');
const setTheme = (t: string) => {
  document.documentElement.dataset.theme = t;
  themeBtn?.querySelector('use')?.setAttribute('href', t === 'dark' ? '#i-sun' : '#i-moon');
  store.set('syn-theme', t);
};
themeBtn?.querySelector('use')?.setAttribute('href', document.documentElement.dataset.theme === 'dark' ? '#i-sun' : '#i-moon');
themeBtn?.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

/* floating header once the page is scrolled */
const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* mobile menu */
const mnav = $('#mnav');
const burger = $('#burger');
const closeMenu = () => {
  mnav?.classList.remove('on');
  burger?.setAttribute('aria-expanded', 'false');
  burger?.querySelector('use')?.setAttribute('href', '#i-menu');
};
burger?.addEventListener('click', () => {
  if (mnav?.classList.contains('on')) return closeMenu();
  const hdr = $('.hdr');
  if (mnav && hdr) mnav.style.top = hdr.getBoundingClientRect().bottom + 8 + 'px';
  mnav?.classList.add('on');
  burger.setAttribute('aria-expanded', 'true');
  burger.querySelector('use')?.setAttribute('href', '#i-x');
});
addEventListener('resize', () => innerWidth > 980 && closeMenu());
addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* in-page anchors keep the header out of the way */
const scrollTo84 = (id: string) => {
  const el = document.getElementById(id);
  if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 84, behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
};
document.addEventListener('click', (e) => {
  const target = e.target as Element;
  const skip = target.closest('[data-skip]');
  if (skip) {
    e.preventDefault();
    const main = $('#main');
    main?.focus();
    scrollTo({ top: 0 });
    return;
  }
  const a = target.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!.slice(1);
  if (id.length < 1 || !document.getElementById(id)) return;
  e.preventDefault();
  closeMenu();
  history.replaceState(null, '', '#' + id);
  scrollTo84(id);
});
if (location.hash.length > 1) requestAnimationFrame(() => scrollTo84(decodeURIComponent(location.hash.slice(1))));

/* print */
document.addEventListener('click', (e) => {
  if ((e.target as Element).closest('[data-print]')) print();
});

/* counters */
const fmt = (v: number, e: HTMLElement) =>
  (e.dataset.pre ?? '') + Math.round(v).toLocaleString(lang() === 'en' ? 'en-US' : 'fr-FR') + (e.dataset.suf ?? '');
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((x) => {
      if (!x.isIntersecting) return;
      io.unobserve(x.target);
      const e = x.target as HTMLElement;
      const to = +(e.dataset.count ?? 0);
      const t0 = performance.now();
      const step = (t: number) => {
        const k = reduce ? 1 : Math.min(1, (t - t0) / 1400);
        e.textContent = fmt(to * (1 - Math.pow(1 - k, 3)), e);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }),
  { threshold: 0.4 },
);
$$('[data-count]').forEach((e) => io.observe(e));
