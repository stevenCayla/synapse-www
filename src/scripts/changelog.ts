import { $, $$ } from './dom';

// Filters the release notes by type (new / improved / fixed).
document.addEventListener('click', (e) => {
  const b = (e.target as Element).closest<HTMLElement>('.chips button');
  if (!b) return;
  const box = b.closest<HTMLElement>('.chips')!;
  $$('button', box).forEach((x) => {
    x.classList.toggle('on', x === b);
    x.setAttribute('aria-pressed', String(x === b));
  });
  const target = $('#' + box.dataset.for);
  if (target) target.dataset.f = b.dataset.f;
});
