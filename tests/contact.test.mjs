import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, createMessageText } from '../src/utils/contact.js';
import { portfolio } from '../src/data/portfolioData.js';

const valid = { name: 'Test Recruiter', email: 'recruiter@example.com', subject: 'Front-end opportunity', message: 'I would like to discuss a React development opportunity.' };
test('valid contact data produces no field errors', () => assert.deepEqual(validateContact(valid), {}));
test('missing or malformed fields return actionable errors', () => { const errors = validateContact({ name: ' ', email: 'bad@', subject: '', message: 'Hi' }); assert.deepEqual(Object.keys(errors).sort(), ['email', 'message', 'name', 'subject']); });
test('overlong content and header injection are rejected', () => { assert.ok(validateContact({ ...valid, message: 'a'.repeat(5001) }).message); assert.ok(validateContact({ ...valid, subject: 'Role\nBcc: someone@example.com' }).subject); });
test('message draft keeps every supplied contact field', () => { const text = createMessageText(valid); for (const value of Object.values(valid)) assert.ok(text.includes(value)); });
test('projects and navigation have stable unique identities', () => { assert.equal(new Set(portfolio.projects.map(project => project.id)).size, portfolio.projects.length); assert.equal(new Set(portfolio.navigation.map(item => item.id)).size, portfolio.navigation.length); for (const project of portfolio.projects) { assert.ok(project.problem && project.solution && project.learned); for (const url of [project.github, project.live]) assert.ok(!url || /^https:\/\//.test(url)); } });
