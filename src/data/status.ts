// Sample availability data of the status page. The series are generated from a fixed seed, so the page is
// reproducible; they are NOT measurements (see the "Valider le contenu" issue).
const rnd = (s: string) => {
  let x = 0;
  for (const c of s) x = (x * 31 + c.charCodeAt(0)) >>> 0;
  return () => (x = (x * 1664525 + 1013904223) >>> 0) / 4294967296;
};

export type Level = '' | 'w' | 'k';
export interface Day {
  /** Days before today. */
  d: number;
  c: Level;
  /** Availability of the day, in %. */
  u: number;
}
export const COMPONENTS = ['app', 'api', 'auth', 'imp', 'exp', 'sig', 'bak'] as const;
export type Component = (typeof COMPONENTS)[number];

export const SERIES = Object.fromEntries(
  COMPONENTS.map((k) => {
    const r = rnd(k + '#');
    const safe = k === 'sig' || k === 'bak';
    const days: Day[] = Array.from({ length: 365 }, (_, i) => {
      const d = 364 - i;
      const v = r();
      let c: Level = '';
      if (k === 'imp' && d < 2) c = 'w';
      else if (!safe && v > 0.996) c = 'k';
      else if (!safe && v > 0.982) c = 'w';
      else if (safe && v > 0.995) c = 'w';
      const u = c === 'k' ? 97.6 + r() * 1.2 : c === 'w' ? 99.3 + r() * 0.6 : 100;
      return { d, c, u };
    });
    return [k, days];
  }),
) as Record<Component, Day[]>;

/** API response time (ms), one point every 15 minutes over 24 hours. */
export const API_MS: number[] = (() => {
  const r = rnd('api-rt');
  return Array.from({ length: 96 }, (_, i) => {
    let v = 124 + 14 * Math.sin((i / 96) * 12.56 + 1) + r() * 22;
    if (i > 68 && i < 76) v += 62 * (1 - Math.abs(i - 72) / 4);
    return Math.round(v);
  });
})();
