import { API_MS, SERIES, type Component } from '../data/status';
import type { Lang } from '../i18n';

export const fmtPct = (v: number, lang: Lang) => {
  const s = v >= 99.995 ? '100' : v.toFixed(2);
  return lang === 'en' ? s : s.replace('.', ',');
};

export const barsHtml = (k: Component, per: number) =>
  SERIES[k].slice(-per).map((x) => `<i class="${x.c}" data-d="${x.d}" data-u="${x.u}"></i>`).join('');

export const uptimeOf = (k: Component, per: number) => {
  const a = SERIES[k].slice(-per);
  return a.reduce((s, x) => s + x.u, 0) / a.length;
};

// Response-time chart (24 h, one point every 15 minutes).
export const CHART = { W: 960, H: 150, MIN: 60, MAX: 240, grid: [100, 150, 200] };
export const chartY = (v: number) => 1 - (v - CHART.MIN) / (CHART.MAX - CHART.MIN);
export const chartSvg = () => {
  const { W, H, grid } = CHART;
  const pts = API_MS.map((v, i) => `${((i / (API_MS.length - 1)) * W).toFixed(1)},${(chartY(v) * H).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${grid.map((v) => `<line class="gr" x1="0" x2="${W}" y1="${chartY(v) * H}" y2="${chartY(v) * H}"></line>`).join('')}<polygon class="ar" points="0,${H} ${pts} ${W},${H}"></polygon><polyline class="ln" points="${pts}"></polyline><line class="cx" id="api-cx" x1="0" x2="0" y1="0" y2="${H}" style="display:none"></line></svg><span class="api-dot" id="api-dot"></span><div class="api-yl">${grid.map((v) => `<span style="top:${chartY(v) * 100}%">${v} ms</span>`).join('')}</div>`;
};
export const percentiles = () => {
  const s = [...API_MS].sort((a, b) => a - b);
  return { p50: s[48], p95: s[91] };
};
