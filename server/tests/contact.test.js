import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { loadConfig } from '../src/config.js';

const body = { name: 'Test Recruiter', email: 'recruiter@example.com', subject: 'React role', message: 'I would like to discuss a frontend development role.', website: '' };
const config = { allowedOrigins: ['https://portfolio.example'], trustProxy: 0 };
async function withServer(options, callback) {
  const app = createApp({ config, logError: () => {}, ...options });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/contact`;
  const post = (payload = body, headers = {}) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://portfolio.example', ...headers }, body: typeof payload === 'string' ? payload : JSON.stringify(payload) });
  try { await callback(post); } finally { await new Promise(resolve => server.close(resolve)); }
}

test('valid submission delivers validated fields with security headers', async () => { let delivered; await withServer({ sendMail: async value => { delivered = value; } }, async post => { const response = await post(); assert.equal(response.status, 200); assert.equal(response.headers.get('x-content-type-options'), 'nosniff'); assert.equal(response.headers.get('access-control-allow-origin'), 'https://portfolio.example'); assert.deepEqual(await response.json(), { ok: true }); }); assert.equal(delivered.email, body.email); });
test('invalid email and short message never reach the mailer', async () => { let called = false; await withServer({ sendMail: async () => { called = true; } }, async post => { const response = await post({ ...body, email: 'bad', message: 'short' }); assert.equal(response.status, 400); const data = await response.json(); assert.ok(data.errors.email && data.errors.message); }); assert.equal(called, false); });
test('malformed JSON, wrong content type and oversized bodies fail safely', async () => { await withServer({ sendMail: async () => {} }, async post => { assert.equal((await post('{')).status, 400); assert.equal((await post(body, { 'Content-Type': 'text/plain' })).status, 415); assert.equal((await post({ ...body, message: 'x'.repeat(14000) })).status, 413); }); });
test('untrusted origin and injected headers are rejected', async () => { await withServer({ sendMail: async () => {} }, async post => { assert.equal((await post(body, { Origin: 'https://untrusted.example' })).status, 403); assert.equal((await post({ ...body, subject: 'Hello\r\nBcc: other@example.com' })).status, 400); }); });
test('honeypot submissions do not send email', async () => { let calls = 0; await withServer({ sendMail: async () => { calls++; } }, async post => assert.equal((await post({ ...body, website: 'bot.example' })).status, 200)); assert.equal(calls, 0); });
test('unconfigured and failed delivery do not report success', async () => { await withServer({ sendMail: null }, async post => assert.equal((await post()).status, 503)); await withServer({ sendMail: async () => { throw new Error('secret transport details'); } }, async post => { const response = await post(); assert.equal(response.status, 502); assert.ok(!(await response.text()).includes('secret')); }); });
test('rate limit stops repeated sends', async () => { await withServer({ sendMail: async () => {}, limit: 2 }, async post => { assert.equal((await post()).status, 200); assert.equal((await post()).status, 200); const response = await post(); assert.equal(response.status, 429); assert.ok(response.headers.get('retry-after')); }); });
test('production refuses incomplete email settings or wildcard origins', () => { assert.throws(() => loadConfig({ NODE_ENV: 'production' }), /incomplete/); assert.throws(() => loadConfig({ ALLOWED_ORIGINS: '*' }), /exact HTTP/); });
