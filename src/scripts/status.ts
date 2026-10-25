import { API_MS, type Component } from '../data/status';
import { barsHtml, chartY, CHART, fmtPct, uptimeOf } from '../lib/status-render';
import { $, $$, lang } from './dom';
import { EMAIL } from '../site';

let per = 90;
const L = lang();

/* time of the last update */
const time = () => {
  const e = $('#stt-time');
  if (e) e.textContent = new Date().toLocaleTimeString(L === 'en' ? 'en-GB' : 'fr-FR', { hour: '2-digit', minute: '2-digit' });
};
time();
setInterval(time, 30000);

/* period switch */
const update = () => {
  $$('#stt-per button').forEach((b) => b.classList.toggle('on', +b.dataset.n! === per));
  $$('.bars').forEach((el) => {
    el.classList.toggle('dense', per > 90);
    el.innerHTML = barsHtml(el.dataset.c as Component, per);
  });
  $$('[data-up]').forEach((e) => (e.textContent = `${fmtPct(uptimeOf(e.dataset.up as Component, per), L)} % ${L === 'en' ? 'uptime' : 'de disponibilité'}`));
  $$('[data-ago]').forEach((e) => (e.textContent = L === 'en' ? `${per} days ago` : `il y a ${per} jours`));
};
document.addEventListener('click', (e) => {
  const b = (e.target as Element).closest<HTMLElement>('#stt-per button');
  if (b) {
    per = +b.dataset.n!;
    update();
  }
});

/* tooltips */
const tip = document.createElement('div');
tip.className = 'tip';
tip.setAttribute('role', 'tooltip');
document.body.appendChild(tip);
const show = (x: number, y: number, html: string) => {
  tip.innerHTML = html;
  tip.style.display = 'block';
  const w = tip.offsetWidth;
  tip.style.left = Math.max(w / 2 + 8, Math.min(innerWidth - w / 2 - 8, x)) + 'px';
  tip.style.top = y + 'px';
};
const hide = () => (tip.style.display = 'none');
const dfmt = (d: number) => new Date(Date.now() - d * 864e5).toLocaleDateString(L === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

document.addEventListener('pointerover', (e) => {
  const b = (e.target as Element).closest<HTMLElement>('.bars i');
  if (!b) return;
  const r = b.getBoundingClientRect();
  const label = ({ '': ['Aucun incident', 'No incidents'], w: ['Performances dégradées', 'Degraded performance'], k: ['Interruption partielle', 'Partial outage'] } as Record<string, [string, string]>)[b.className][L === 'en' ? 1 : 0];
  show(r.left + r.width / 2, r.top, `<b>${dfmt(+b.dataset.d!)}</b>${label} · ${fmtPct(+b.dataset.u!, L)} %`);
});
document.addEventListener('pointerout', (e) => {
  if ((e.target as Element).closest('.bars i')) hide();
});

/* response-time chart: crosshair and value under the pointer */
const box = $('#api-ch');
box?.addEventListener('pointermove', (e) => {
  const r = box.getBoundingClientRect();
  const n = API_MS.length - 1;
  const i = Math.max(0, Math.min(n, Math.round(((e.clientX - r.left) / r.width) * n)));
  const v = API_MS[i];
  const x = i / n;
  const y = chartY(v);
  const cx = $('#api-cx');
  const dot = $('#api-dot');
  if (cx) { cx.setAttribute('x1', String(x * CHART.W)); cx.setAttribute('x2', String(x * CHART.W)); cx.style.display = ''; }
  if (dot) { dot.style.display = 'block'; dot.style.left = x * 100 + '%'; dot.style.top = y * 100 + '%'; }
  const t = new Date(Date.now() - (n - i) * 9e5).toLocaleTimeString(L === 'en' ? 'en-GB' : 'fr-FR', { hour: '2-digit', minute: '2-digit' });
  show(r.left + x * r.width, r.top + y * r.height - 8, `<b>${v} ms</b>${t}`);
});
box?.addEventListener('pointerleave', () => {
  hide();
  const cx = $('#api-cx');
  const dot = $('#api-dot');
  if (cx) cx.style.display = 'none';
  if (dot) dot.style.display = 'none';
});

/* subscription: no mail service yet, so the form opens the visitor's mail client */
$<HTMLFormElement>('#stt-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.currentTarget as HTMLFormElement;
  const mail = f.querySelector('input')!.value.trim();
  location.href = `mailto:${EMAIL.contact}?subject=${encodeURIComponent(f.dataset.subject ?? '')}&body=${encodeURIComponent(mail)}`;
});
