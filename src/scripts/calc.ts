import { $, L, lang } from './dom';

const box = $('#calc');
if (box) {
  const demo = box.dataset.demo ?? '/demo';
  const eur = (v: number) => v.toLocaleString(lang() === 'en' ? 'en-GB' : 'fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const el = <T extends HTMLElement>(id: string) => $<T>('#' + id)!;

  const calc = () => {
    const plan = $<HTMLInputElement>('[name=c-plan]:checked', box)?.value ?? 'academic';
    const n = +el<HTMLInputElement>('c-n').value;
    const t = +el<HTMLInputElement>('c-t').value;
    const imp = el<HTMLInputElement>('c-imp');
    const build = el<HTMLInputElement>('c-build').checked;
    el('c-n-o').textContent = String(n);
    el('c-t-o').textContent = String(t);
    const industry = plan === 'industry';
    imp.disabled = industry;
    if (industry) imp.checked = true;
    el('c-imp-n').textContent = industry ? L('(inclus)', '(included)') : L('(+1 500 € / étude)', '(+€1,500 / study)');

    const lines: [string, number][] = [
      [
        L(`Licence ${industry ? 'Industrie' : 'Académique'} × ${n} étude${n > 1 ? 's' : ''}`, `${industry ? 'Industry' : 'Academic'} licence × ${n} stud${n > 1 ? 'ies' : 'y'}`),
        (industry ? 14900 : 4900) * n,
      ],
    ];
    if (imp.checked && !industry) lines.push([L('Import prospectif', 'Prospective import'), 1500 * n]);
    if (build) lines.push([L('Paramétrage eCRF', 'eCRF build'), 2500 * n]);
    if (t) lines.push([L(`Formation sur site × ${t} j`, `On-site training × ${t} d`), 1200 * t]);
    const total = lines.reduce((s, x) => s + x[1], 0);
    el('c-tot').textContent = eur(total);
    el('c-lines').innerHTML = lines.map((x) => `<li><span>${x[0]}</span><b>${eur(x[1])}</b></li>`).join('');
    el('c-hint').hidden = n <= 5;
    const msg =
      L('Estimation demandée : ', 'Requested estimate: ') +
      lines.map((x) => `${x[0]} (${eur(x[1])})`).join(', ') +
      L(' — total ', ' — total ') +
      eur(total) +
      L(' HT / an.', ' excl. VAT / year.');
    el<HTMLAnchorElement>('c-cta').href = `${demo}?plan=${plan}&quote=${encodeURIComponent(msg)}`;
  };
  box.addEventListener('input', calc);
  box.addEventListener('change', calc);
  calc();
}
