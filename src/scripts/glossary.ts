import { $, $$ } from './dom';

$<HTMLInputElement>('#gl-q')?.addEventListener('input', (e) => {
  const q = (e.target as HTMLInputElement).value.trim().toLowerCase();
  let n = 0;
  $$('#gl .gl-i').forEach((i) => {
    const ok = !q || i.dataset.k!.includes(q);
    i.hidden = !ok;
    if (ok) n++;
  });
  const none = $('#gl-none');
  if (none) none.hidden = n > 0;
});
