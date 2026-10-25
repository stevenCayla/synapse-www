import { $, L } from './dom';

// Interactive product tour: enter a value, fix it, answer a query, sign. Nothing leaves the page.
const el = $('#tour');
if (el) {
  const demo = el.dataset.demo ?? '/demo';
  const STEPS: [string, string][] = [
    [L('Ouvrir le dossier patient', 'Open the subject record'), L('Cliquez sur le patient P-0398 dans la liste du centre.', 'Click subject P-0398 in the site list.')],
    [L('Saisir une valeur', 'Enter a value'), L('Saisissez 120 dans « Fraction d’éjection ». Le contrôle de cohérence réagit pendant la saisie.', 'Type 120 in “Ejection fraction”. The edit check reacts as you type.')],
    [L('Corriger la valeur', 'Correct the value'), L('Les valeurs attendues vont de 10 à 80 %. Saisissez 48.', 'Expected values range from 10 to 80%. Type 48.')],
    [L('Répondre à la requête', 'Answer the query'), L('L’ARC a ouvert une requête sur la date de visite. Répondez directement sur le champ.', 'The CRA opened a query on the visit date. Answer it right on the field.')],
    [L('Signer la visite', 'Sign the visit'), L('Signez avec ré-authentification, conformément au 21 CFR Part 11.', 'Sign with re-authentication, per 21 CFR Part 11.')],
  ];
  const fresh = () => ({ s: 0, v: '', ans: false, sig: false, modal: false });
  let tv = fresh();

  const render = () => {
    const s = tv.s;
    const done = s >= STEPS.length;
    const side = `<div class="tour-side"><div class="tour-prog"><i style="width:${Math.min(100, (s / STEPS.length) * 100)}%"></i></div><ol class="tour-steps">${STEPS.map(
      (x, i) => `<li class="${i < s ? 'done' : i === s ? 'on' : ''}"><span>${i < s ? '✓' : i + 1}</span>${x[0]}</li>`,
    ).join('')}</ol>${
      done
        ? `<div class="tour-card ok"><b>${L('Visite saisie, vérifiée et signée', 'Visit entered, checked and signed')}</b><p>${L('Chaque action est tracée dans l’audit trail : ancienne valeur, nouvelle valeur, auteur, motif.', 'Every action is logged in the audit trail: old value, new value, author, reason.')}</p><div class="actions" style="justify-content:flex-start"><a class="btn sm pri" href="${demo}">${L('Demander une démo', 'Book a demo')}</a><button class="btn sm" type="button" data-tour="reset">${L('Recommencer', 'Restart')}</button></div></div>`
        : `<div class="tour-card"><small>${L('Étape', 'Step')} ${s + 1} / ${STEPS.length}</small><b>${STEPS[s][0]}</b><p>${STEPS[s][1]}</p><button class="btn sm" type="button" data-tour="skip">${L('Faire pour moi', 'Do it for me')}</button></div>`
    }</div>`;

    const list = `<div class="ta-list"><div class="ta-row ta-hd"><span>PATIENT</span><span>${L('VISITE', 'VISIT')}</span><span>${L('STATUT', 'STATUS')}</span></div>${(
      [['P-0412', 'V3 · M6', L('Validé', 'Verified'), 'ok'], ['P-0398', 'V2 · M3', L('À saisir', 'To enter'), 'w'], ['P-0377', 'V4 · M12', L('Validé', 'Verified'), 'ok']] as const
    )
      .map((r) => `<button type="button" class="ta-row${r[0] === 'P-0398' ? ' tour-hl' : ''}" ${r[0] === 'P-0398' ? 'data-tour="open"' : 'disabled'}><code>${r[0]}</code><span>${r[1]}</span><span class="dot d-${r[3]}">${r[2]}</span></button>`)
      .join('')}</div>`;

    const v = tv.v;
    const bad = v !== '' && (+v < 10 || +v > 80 || isNaN(+v));
    const answer = L('Confirmée, visite avancée à la demande du patient.', 'Confirmed, visit brought forward at the patient’s request.');
    const form = `<div class="ta-form"><div class="ta-crumb"><code>P-0398</code> · ${L('Visite 2 · Mois 3', 'Visit 2 · Month 3')}</div>
<div class="ta-f${s === 3 ? ' tour-hl' : ''}"><label>${L('Date de visite', 'Visit date')}</label><div class="ta-in ro">12/09/2026</div>${
      tv.ans
        ? `<div class="ta-q ok">✓ ${L('Requête close — date confirmée par le centre.', 'Query closed — date confirmed by site.')}</div>`
        : `<div class="ta-q"><b>${L('Requête ARC', 'CRA query')}</b> ${L('La date est-elle confirmée ? Elle précède le rendez-vous prévu.', 'Is this date confirmed? It precedes the scheduled appointment.')}${
            s === 3 ? `<div class="ta-qa"><input id="ta-ans" value="${answer}" aria-label="${L('Réponse', 'Reply')}"><button class="btn sm pri" type="button" data-tour="answer">${L('Répondre', 'Reply')}</button></div>` : ''
          }</div>`
    }</div>
<div class="ta-f${s === 1 || s === 2 ? ' tour-hl' : ''}${bad ? ' bad' : ''}"><label for="ta-fevg">${L('Fraction d’éjection (%)', 'Ejection fraction (%)')}</label><input class="ta-in" id="ta-fevg" inputmode="numeric" value="${v}" ${s < 1 || s > 2 ? 'disabled' : ''} placeholder="10 – 80"><div class="ta-err" id="ta-err"${bad ? '' : ' hidden'}>${L('Valeur hors bornes (10 – 80 %). Vérifiez la saisie.', 'Out of range (10 – 80%). Please check.')}</div></div>
<div class="ta-f"><label>${L('Traitement concomitant', 'Concomitant medication')}</label><div class="ta-in ro">${L('Bêtabloquant', 'Beta blocker')}</div></div>
<div class="ta-sign"><span class="dot ${tv.sig ? 'd-ok' : 'd-w'}">${tv.sig ? L('Signée · Dr Martin', 'Signed · Dr Martin') : L('Non signée', 'Not signed')}</span><button class="btn sm pri${s === 4 ? ' tour-hl' : ''}" type="button" data-tour="sign" ${s === 4 ? '' : 'disabled'}>${L('Signer la visite', 'Sign visit')}</button></div>
${
  tv.modal
    ? `<div class="ta-modal"><div><b>${L('Signature électronique', 'Electronic signature')}</b><p>${L('Je certifie l’exactitude des données de cette visite.', 'I certify the data in this visit is accurate.')}</p><label>${L('Mot de passe', 'Password')}<input type="password" class="ta-in" id="ta-pw" value="demo-synapse"></label><div class="actions" style="justify-content:flex-end"><button class="btn sm" type="button" data-tour="cancel">${L('Annuler', 'Cancel')}</button><button class="btn sm pri" type="button" data-tour="confirm">${L('Signer', 'Sign')}</button></div></div></div>`
    : ''
}</div>`;

    el.innerHTML = `${side}<div class="tour-app"><div class="ta-h"><span class="ta-dot"></span><b>CARDIO-PROSP-24</b><span>CHU Lyon</span><span style="flex:1"></span><span>Dr Martin</span></div><div class="ta-b">${s === 0 ? list : form}</div></div>`;
    if (s === 1 || s === 2) {
      const i = $<HTMLInputElement>('#ta-fevg');
      i?.focus();
      i?.setSelectionRange(i.value.length, i.value.length);
    }
  };
  const next = () => {
    tv.s++;
    render();
  };

  el.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-tour]');
    if (!b) return;
    const a = b.dataset.tour;
    if (a === 'open' && tv.s === 0) next();
    else if (a === 'answer') { tv.ans = true; next(); }
    else if (a === 'sign') { tv.modal = true; render(); }
    else if (a === 'cancel') { tv.modal = false; render(); }
    else if (a === 'confirm') { tv.modal = false; tv.sig = true; next(); }
    else if (a === 'reset') { tv = fresh(); render(); }
    else if (a === 'skip') {
      const s = tv.s;
      if (s === 1) tv.v = '120';
      else if (s === 2) tv.v = '48';
      else if (s === 3) tv.ans = true;
      else if (s === 4) tv.sig = true;
      next();
    }
  });
  el.addEventListener('input', (e) => {
    const i = e.target as HTMLInputElement;
    if (i.id !== 'ta-fevg') return;
    tv.v = i.value.replace(/[^\d]/g, '');
    const n = +tv.v;
    const bad = tv.v !== '' && (n < 10 || n > 80);
    i.closest('.ta-f')?.classList.toggle('bad', bad);
    const err = $('#ta-err');
    if (err) err.hidden = !bad;
    if (tv.s === 1 && n > 80) setTimeout(next, 700);
    else if (tv.s === 2 && tv.v.length >= 2 && !bad) setTimeout(next, 500);
  });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.target as HTMLElement).id === 'ta-pw') {
      e.preventDefault();
      tv.modal = false;
      tv.sig = true;
      next();
    }
  });
  render();
}
