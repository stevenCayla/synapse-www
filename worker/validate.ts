// Validation of a demo request. Pure functions, no I/O: see test/validate.test.ts.

export interface DemoRequest {
  name: string;
  organisation: string;
  email: string;
  phone: string;
}

export const MAX_BODY_BYTES = 4096;

// Control characters (CR and LF included) would allow header injection in the e-mail.
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/;
const EMAIL = /^[^\s@<>(),;:"\\[\]]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
// Characters that would break the display name of the Reply-To header.
const ADDRESS_SYNTAX = /[<>"\\]/;
const PHONE = /^[0-9+().\- ]{6,30}$/;

const text = (value: unknown, min: number, max: number): string | null => {
  if (typeof value !== 'string') return null;
  const v = value.trim().replace(/ {2,}/g, ' ');
  return v.length >= min && v.length <= max && !CONTROL.test(v) ? v : null;
};

export type Parsed = { ok: true; value: DemoRequest; token: string } | { ok: false } | { ok: 'trap' };

/** Checks the JSON body sent by the form. A filled honeypot ("website") is reported apart. */
export function parseDemoRequest(body: unknown): Parsed {
  if (typeof body !== 'object' || body === null) return { ok: false };
  const b = body as Record<string, unknown>;
  if (typeof b.website === 'string' && b.website.trim() !== '') return { ok: 'trap' };

  const name = text(b.name, 2, 120);
  const organisation = text(b.organisation, 2, 160);
  const email = text(b.email, 6, 254);
  const phone = b.phone === undefined || b.phone === '' ? '' : text(b.phone, 6, 30);
  const token = typeof b.token === 'string' && b.token.length > 0 && b.token.length <= 2048 ? b.token : null;

  if (!name || ADDRESS_SYNTAX.test(name) || !organisation || !email || !EMAIL.test(email) || phone === null || (phone !== '' && !PHONE.test(phone)) || !token) {
    return { ok: false };
  }
  return { ok: true, value: { name, organisation, email, phone }, token };
}

export const subjectOf = (r: DemoRequest) => `Demande de démo — ${r.organisation}`;

export const bodyOf = (r: DemoRequest) =>
  [`Nom : ${r.name}`, `Établissement : ${r.organisation}`, `E-mail : ${r.email}`, `Téléphone : ${r.phone || 'non renseigné'}`, '', 'Demande envoyée depuis le formulaire de synapse-medical.fr.'].join('\r\n');
