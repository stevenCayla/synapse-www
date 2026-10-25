import { $, store } from './dom';

// CNIL: refusing must be as easy as accepting. The choice is kept for 6 months.
const KEY = 'syn-consent';
const MAX_AGE = 1.58e10;
const banner = $('#cookie');
const prefs = $('#ck-prefs');
const analytics = $<HTMLInputElement>('#ck-a');

const read = (): { a: boolean; t: number } | null => {
  try {
    const v = JSON.parse(store.get(KEY) ?? 'null');
    return v && Date.now() - v.t < MAX_AGE ? v : null;
  } catch {
    return null;
  }
};
const save = (a: boolean) => {
  store.set(KEY, JSON.stringify({ a, t: Date.now() }));
  if (banner) banner.hidden = true;
};
const open = (withPrefs: boolean) => {
  if (!banner || !prefs) return;
  banner.hidden = false;
  prefs.hidden = !withPrefs;
  const v = read();
  if (analytics) analytics.checked = !!(v && v.a);
};

document.addEventListener('click', (e) => {
  const t = e.target as Element;
  const b = t.closest<HTMLElement>('[data-ck]');
  if (b) {
    const k = b.dataset.ck;
    if (k === 'yes') save(true);
    else if (k === 'no') save(false);
    else if (k === 'custom') open(true);
    else if (k === 'save') save(!!analytics?.checked);
    return;
  }
  if (t.closest('[data-cookie-open]')) {
    e.preventDefault();
    open(true);
  }
});
if (!read()) open(false);
