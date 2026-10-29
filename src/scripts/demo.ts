import { $, $$ } from './dom';

// The demo request is sent to the Worker (POST /api/demo), which checks the Turnstile token and
// e-mails the team. Nothing is stored in the browser.
interface Turnstile {
  render(el: string | HTMLElement, options: Record<string, unknown>): string;
  reset(id?: string): void;
  remove(id?: string): void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const form = $<HTMLFormElement>('#demo-f');
if (form) {
  const fr = form.dataset.lang !== 'en';
  const L = (a: string, b: string) => (fr ? a : b);
  const send = $<HTMLButtonElement>('#demo-send')!;
  const status = $('#demo-status')!;
  const check = $('#demo-check')!;
  let token = '';
  let widget = '';
  let siteKey = '';

  const checkState = (state: 'pending' | 'ok' | 'error') => {
    check.dataset.state = state;
    check.querySelector('span')!.textContent = {
      pending: L('Vérification anti-robot en cours…', 'Robot check in progress…'),
      ok: L('Vérification anti-robot réussie', 'Robot check passed'),
      error: L('La vérification anti-robot a échoué. Rechargez la page ou écrivez-nous à demo@synapse-medical.fr.', 'The robot check failed. Reload the page or write to us at demo@synapse-medical.fr.'),
    }[state];
  };

  const say = (msg: string, alert = false) => {
    status.textContent = msg;
    status.setAttribute('role', alert ? 'alert' : 'status');
  };

  const refused = () =>
    say(L('Votre demande n’a pas pu être envoyée. Vérifiez les champs et la vérification anti-robot, ou écrivez-nous à demo@synapse-medical.fr.', 'Your request could not be sent. Check the fields and the robot check, or write to us at demo@synapse-medical.fr.'), true);

  // The widget follows the theme of the site (not only the system one); it is shown only when the visitor must act.
  const render = () => {
    token = '';
    send.disabled = true;
    checkState('pending');
    widget = window.turnstile!.render('#demo-turnstile', {
      sitekey: siteKey,
      language: fr ? 'fr' : 'en',
      theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
      size: 'flexible',
      appearance: 'interaction-only',
      callback: (t: string) => {
        token = t;
        send.disabled = false;
        checkState('ok');
      },
      'expired-callback': () => {
        token = '';
        send.disabled = true;
        checkState('pending');
        window.turnstile?.reset(widget);
      },
      'error-callback': () => {
        token = '';
        send.disabled = true;
        checkState('error');
      },
    });
  };

  // Turnstile widget: the site key comes from the Worker (one place to configure it per environment).
  const mount = async () => {
    try {
      siteKey = ((await (await fetch('/api/demo/config')).json()) as { siteKey?: string }).siteKey ?? '';
      if (!siteKey) throw new Error('no site key');
      await new Promise<void>((ok, ko) => {
        const s = document.createElement('script');
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.onload = () => ok();
        s.onerror = () => ko(new Error('turnstile'));
        document.head.append(s);
      });
      render();
      new MutationObserver(() => {
        window.turnstile?.remove(widget);
        render();
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    } catch {
      checkState('error');
      refused();
    }
  };
  void mount();

  form.addEventListener('input', (e) => (e.target as Element).closest('.fld.bad')?.classList.remove('bad'));

  const valid = (name: string, value: string) => {
    if (name === 'email') return /^[^\s@<>(),;:"\\[\]]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (name === 'phone') return value === '' || /^[0-9+().\- ]{6,30}$/.test(value);
    return value.length >= 2;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let first: HTMLInputElement | null = null;
    for (const input of $$<HTMLInputElement>('.fld input', form)) {
      const ok = valid(input.name, input.value.trim());
      input.closest('.fld')?.classList.toggle('bad', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      if (!ok && !first) first = input;
    }
    if (first) {
      say(L('Merci de corriger les champs signalés.', 'Please fix the highlighted fields.'), true);
      return first.focus();
    }
    if (!token) return refused();

    const field = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    send.disabled = true;
    form.setAttribute('aria-busy', 'true');
    say(L('Envoi en cours…', 'Sending…'));
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: field('name'), organisation: field('organisation'), email: field('email'), phone: field('phone'), website: field('website'), token }),
      });
      if (!res.ok) throw new Error('refused');
      const card = $('#demo-card')!;
      card.innerHTML = `<div class="fdone" role="status"><span class="ck"><svg class="i" aria-hidden="true"><use href="#i-check"></use></svg></span><h2>${L('Demande envoyée', 'Request sent')}</h2><p>${L('Merci, nous vous recontactons très bientôt.', 'Thank you, we will get back to you very soon.')}</p></div>`;
      $('.fdone', card)?.setAttribute('tabindex', '-1');
      $<HTMLElement>('.fdone', card)?.focus();
    } catch {
      refused();
      token = '';
      checkState('pending');
      if (widget) window.turnstile?.reset(widget);
    } finally {
      form.removeAttribute('aria-busy');
    }
  });
}
