import test from 'node:test';
import assert from 'node:assert/strict';
import { sendContact, contactMode } from '../src/utils/sendContact.js';
import { whatsappUrl } from '../src/utils/links.js';

const values = { name: ' Test Visitor ', email: ' visitor@example.com ', subject: ' React opportunity ', message: ' I would like to discuss a front-end role. ', website: '' };
const contact = { provider: 'web3forms', accessKey: 'test-form-key' };

test('Web3Forms submits only message fields to the fixed HTTPS endpoint', async () => {
  let request;
  const client = { post: async (...args) => { request = args; return { data: { success: true } }; } };
  await sendContact({ ...values, unexpected: 'private value' }, contact, { client });
  assert.equal(request[0], 'https://api.web3forms.com/submit');
  assert.equal(request[1].email, 'visitor@example.com');
  assert.equal(request[1].message, values.message.trim());
  assert.equal(request[1].subject, 'Portfolio enquiry: React opportunity');
  assert.equal(request[1].botcheck, false);
  assert.equal(request[1].unexpected, undefined);
  assert.equal(request[2].timeout, 20000);
});
test('a successful HTTP response is insufficient without provider success', async () => {
  for (const data of [{ success: false }, { ok: true }, {}]) {
    await assert.rejects(sendContact(values, contact, { client: { post: async () => ({ data }) } }), /did not accept/);
  }
});
test('rate limits and timeouts produce useful errors without leaking service data', async () => {
  await assert.rejects(sendContact(values, contact, { client: { post: async () => { throw { response: { status: 429, data: { secret: 'must not appear' } } }; } } }), /Too many attempts/);
  await assert.rejects(sendContact(values, contact, { client: { post: async () => { throw { code: 'ECONNABORTED' }; } } }), /could not be confirmed/);
});
test('missing Web3Forms configuration fails explicitly without changing to draft mode', async () => {
  assert.equal(contactMode({ provider: 'web3forms' }, ''), 'web3forms');
  await assert.rejects(sendContact(values, { provider: 'web3forms' }), /not configured/);
});
test('server provider and honeypot keep their original protocol', async () => {
  let payload;
  await sendContact({ ...values, website: 'spam' }, { provider: 'server', endpoint: '/api/contact' }, { client: { post: async (_url, data) => { payload = data; return { data: { ok: true } }; } } });
  assert.equal(payload.website, 'spam');
  assert.equal(payload.access_key, undefined);
});
test('WhatsApp links use international digits and safely encode draft text', () => {
  const url = new URL(whatsappUrl({ number: '+91 79727 57620', message: 'Hi & hello?' }));
  assert.equal(url.pathname, '/917972757620');
  assert.equal(url.searchParams.get('text'), 'Hi & hello?');
  assert.equal(whatsappUrl({ number: 'javascript:alert(1)' }), '');
});
