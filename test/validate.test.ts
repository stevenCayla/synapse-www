import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bodyOf, parseDemoRequest, subjectOf } from '../worker/validate.ts';

const valid = { name: 'Claire Martin', organisation: 'CHU de Lille', email: 'claire.martin@chu-lille.fr', phone: '03 20 00 00 00', token: 'tok', website: '' };

test('accepts a complete request', () => {
  const r = parseDemoRequest(valid);
  assert.ok(r.ok === true);
  assert.equal(r.value.email, 'claire.martin@chu-lille.fr');
});

test('phone is optional', () => {
  assert.equal(parseDemoRequest({ ...valid, phone: '' }).ok, true);
  assert.equal(parseDemoRequest({ ...valid, phone: undefined }).ok, true);
});

test('a filled honeypot is reported apart, whatever the rest', () => {
  assert.equal(parseDemoRequest({ ...valid, website: 'http://spam.example' }).ok, 'trap');
});

test('rejects missing or malformed fields', () => {
  for (const patch of [{ name: '' }, { organisation: 'x' }, { email: 'not-an-email' }, { email: 'a@b' }, { phone: 'abc' }, { token: '' }, { name: 42 }]) {
    assert.equal(parseDemoRequest({ ...valid, ...patch }).ok, false, JSON.stringify(patch));
  }
  assert.equal(parseDemoRequest(null).ok, false);
  assert.equal(parseDemoRequest('text').ok, false);
});

test('rejects header injection attempts', () => {
  for (const patch of [
    { organisation: 'CHU\r\nBcc: victim@example.com' },
    { name: 'Claire\nBcc: victim@example.com' },
    { email: 'a@b.fr\r\nBcc: victim@example.com' },
    { email: 'a@b.fr,victim@example.com' },
    { name: 'Claire <victim@example.com>' },
  ]) {
    assert.equal(parseDemoRequest({ ...valid, ...patch }).ok, false, JSON.stringify(patch));
  }
});

test('enforces size limits', () => {
  assert.equal(parseDemoRequest({ ...valid, name: 'a'.repeat(121) }).ok, false);
  assert.equal(parseDemoRequest({ ...valid, organisation: 'a'.repeat(161) }).ok, false);
});

test('builds the subject and the plain text body', () => {
  const r = parseDemoRequest(valid);
  assert.ok(r.ok === true);
  assert.equal(subjectOf(r.value), 'Demande de démo — CHU de Lille');
  assert.match(bodyOf(r.value), /Nom : Claire Martin/);
  assert.match(bodyOf(r.value), /Téléphone : 03 20 00 00 00/);
});
