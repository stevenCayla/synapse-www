import { $, lang } from './dom';

interface Item {
  g: string;
  t: string;
  d: string;
  url: string;
  ext?: boolean;
}

const scrim = $('#s-scrim');
const qi = $<HTMLInputElement>('#s-q');
const res = $('#s-res');
let all: Item[] | null = null;
let items: Item[] = [];
let sel = 0;

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const render = () => {
  if (!qi || !res) return;
  const q = norm(qi.value.trim());
  let list = all ?? [];
  if (q) list = list.filter((x) => q.split(/\s+/).every((w) => norm(x.t + ' ' + x.d).includes(w)));
  items = list.slice(0, 12);
  sel = 0;
  if (!items.length) {
    res.innerHTML = `<div class="s-empty">${lang() === 'en' ? 'No results for' : 'Aucun résultat pour'} « ${esc(qi.value)} »</div>`;
    return;
  }
  let g = '';
  res.innerHTML = items
    .map((x, i) => {
      const head = x.g !== g ? `<div class="s-g">${esc(x.g)}</div>` : '';
      g = x.g;
      return `${head}<a class="s-it${i ? '' : ' on'}" href="${esc(x.url)}"><b>${esc(x.t)}</b><small>${esc(x.d)}</small>${x.ext ? '<span class="s-ext">↗</span>' : ''}</a>`;
    })
    .join('');
};

const load = async () => {
  if (all || !scrim) return;
  try {
    all = await (await fetch(scrim.dataset.index!)).json();
  } catch {
    all = [];
  }
  render();
};
const open = () => {
  if (!scrim || !qi) return;
  scrim.classList.add('on');
  qi.value = '';
  render();
  void load();
  setTimeout(() => qi.focus(), 10);
};
const close = () => scrim?.classList.remove('on');

document.querySelectorAll('[data-search]').forEach((b) => b.addEventListener('click', open));
qi?.addEventListener('input', render);
scrim?.addEventListener('click', (e) => {
  const t = e.target as Element;
  if (t === scrim) close();
});
const mark = () =>
  res?.querySelectorAll<HTMLElement>('.s-it').forEach((a, i) => {
    a.classList.toggle('on', i === sel);
    if (i === sel && res) {
      const r = a.getBoundingClientRect(), p = res.getBoundingClientRect();
      if (r.bottom > p.bottom) res.scrollTop += r.bottom - p.bottom;
      if (r.top < p.top) res.scrollTop -= p.top - r.top;
    }
  });
addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    scrim?.classList.contains('on') ? close() : open();
    return;
  }
  if (!scrim?.classList.contains('on')) return;
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); mark(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); mark(); }
  else if (e.key === 'Enter') { res?.querySelectorAll<HTMLElement>('.s-it')[sel]?.click(); }
});
