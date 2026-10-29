import { WorkerMailer } from 'worker-mailer';
import { bodyOf, MAX_BODY_BYTES, parseDemoRequest, subjectOf } from './validate.ts';

export interface Env {
  // Public settings (wrangler.jsonc).
  TURNSTILE_SITE_KEY: string;
  DEMO_RECIPIENT: string;
  DEMO_SENDER: string;
  /** "smtp" sends the e-mail; "dry-run" validates everything but sends nothing (dev-www, local). */
  DEMO_SEND: string;
  // Secrets (wrangler secret put, or .dev.vars locally). Never committed.
  TURNSTILE_SECRET_KEY: string;
  SMTP_USERNAME: string;
  SMTP_TOKEN: string;
}

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });

// One answer for every outcome the client must not tell apart (bot, bad input, failed challenge).
const REFUSED = () => json({ ok: false }, 400);
const UNAVAILABLE = () => json({ ok: false }, 502);

async function challengePassed(token: string, ip: string | null, env: Env): Promise<boolean> {
  const form = new FormData();
  form.set('secret', env.TURNSTILE_SECRET_KEY);
  form.set('response', token);
  if (ip) form.set('remoteip', ip);
  try {
    const res = await fetch(SITEVERIFY, { method: 'POST', body: form });
    return res.ok && ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

async function sendDemo(request: Request, env: Env): Promise<Response> {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return REFUSED();
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) return REFUSED();
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return REFUSED();

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return REFUSED();
  }

  const parsed = parseDemoRequest(body);
  // A robot that fills the hidden field gets the answer of a success, and nothing is sent.
  if (parsed.ok === 'trap') return json({ ok: true });
  if (!parsed.ok) return REFUSED();
  if (!(await challengePassed(parsed.token, request.headers.get('CF-Connecting-IP'), env))) return REFUSED();

  if (env.DEMO_SEND !== 'smtp') return json({ ok: true });

  try {
    // Proton SMTP: port 587, upgraded with STARTTLS. The data is neither stored nor logged.
    const mailer = await WorkerMailer.connect({
      host: 'smtp.protonmail.ch',
      port: 587,
      secure: false,
      startTls: true,
      authType: 'plain',
      credentials: { username: env.SMTP_USERNAME, password: env.SMTP_TOKEN },
    });
    try {
      await mailer.send({
        from: { name: 'Synapse Medical', email: env.DEMO_SENDER },
        to: env.DEMO_RECIPIENT,
        reply: { name: parsed.value.name, email: parsed.value.email },
        subject: subjectOf(parsed.value),
        text: bodyOf(parsed.value),
      });
    } finally {
      await mailer.close();
    }
  } catch {
    return UNAVAILABLE();
  }
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/demo/config') {
      return request.method === 'GET'
        ? new Response(JSON.stringify({ siteKey: env.TURNSTILE_SITE_KEY }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })
        : new Response(null, { status: 405, headers: { Allow: 'GET' } });
    }
    if (pathname === '/api/demo') {
      return request.method === 'POST' ? sendDemo(request, env) : new Response(null, { status: 405, headers: { Allow: 'POST' } });
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
