import { $, $$, L } from './dom';

// The site is static and has no mail service yet (see the "Formulaire de demande de démo" issue):
// the form validates the request and opens the visitor's mail client with the message pre-filled.
const form = $<HTMLFormElement>('#demo-f');
if (form) {
  const data: { docs: Record<string, string>; plans: Record<string, string> } = JSON.parse($('#demo-data')?.textContent ?? '{}');
  const q = new URLSearchParams(location.search);
  const msg = form.elements.namedItem('msg') as HTMLTextAreaElement;
  const quote = q.get('quote');
  const doc = q.get('doc');
  const plan = q.get('plan');
  if (quote) msg.value = quote;
  else if (doc && data.docs?.[doc]) msg.value = L('Je souhaite recevoir : ', 'I would like to receive: ') + data.docs[doc];
  else if (plan && data.plans?.[plan]) msg.value = L('Je suis intéressé(e) par l’offre ', 'I am interested in the ') + data.plans[plan] + L('.', ' plan.');

  form.addEventListener('input', (e) => (e.target as Element).closest('.fld.bad')?.classList.remove('bad'));
  form.addEventListener('change', (e) => (e.target as Element).closest('.fld.bad')?.classList.remove('bad'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first: HTMLElement | null = null;
    $$('[data-req]', form).forEach((fl) => {
      const i = fl.querySelector<HTMLInputElement>('input,select,textarea')!;
      const v = i.type === 'checkbox' ? i.checked : i.value.trim();
      const ok = i.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v)) : !!v;
      fl.classList.toggle('bad', !ok);
      if (!ok && !first) first = i;
    });
    if (first) return (first as HTMLElement).focus();

    const f = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '').trim();
    const radio = (n: string) => form.querySelector<HTMLInputElement>(`[name=${n}]:checked`)?.value ?? '';
    const body = [
      `${L('Nom', 'Name')} : ${f('fn')} ${f('ln')}`,
      `E-mail : ${f('em')}`,
      f('tel') ? `${L('Téléphone', 'Phone')} : ${f('tel')}` : '',
      `${L('Établissement', 'Organisation')} : ${f('org')}`,
      `${L('Fonction', 'Role')} : ${f('role')}`,
      `${L('Type de promoteur', 'Sponsor type')} : ${radio('sp')}`,
      `${L('Études prévues sur 12 mois', 'Studies planned in the next 12 months')} : ${radio('ns')}`,
      '',
      f('msg'),
    ].join('\n');
    const to = form.dataset.to!;
    const href = `mailto:${to}?subject=${encodeURIComponent(form.dataset.subject ?? '')}&body=${encodeURIComponent(body)}`;
    const card = $('#demo-card')!;
    card.innerHTML = `<div class="fdone"><span class="ck"><svg class="i" aria-hidden="true"><use href="#i-check"></use></svg></span><h2>${L('Presque terminé', 'Almost done')}</h2><p>${L('Votre messagerie s’ouvre avec votre demande. Envoyez le message pour que nous la recevions.', 'Your email app is opening with your request. Send the message so that we receive it.')}</p><div class="actions"><a class="btn pri" href="${href}">${L('Rouvrir mon message', 'Reopen my message')}</a></div><p style="font-size:13.5px">${L('Rien ne s’ouvre ? Écrivez-nous à', 'Nothing opens? Write to us at')} <b>${to}</b>.</p></div>`;
    location.href = href;
  });
}
