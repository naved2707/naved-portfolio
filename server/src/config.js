import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  ALLOWED_ORIGINS: z.string().default('http://localhost:4173,http://127.0.0.1:4173'),
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(0),
  SMTP_HOST: z.string().default(''),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).default(587),
  SMTP_SECURE: z.enum(['true', 'false']).default('false'),
  SMTP_USER: z.string().default(''),
  SMTP_PASSWORD: z.string().default(''),
  EMAIL_FROM: z.union([z.string().email(), z.literal('')]).default(''),
  EMAIL_TO: z.union([z.string().email(), z.literal('')]).default(''),
});

export function loadConfig(env = process.env) {
  const result = envSchema.safeParse(env);
  if (!result.success) throw new Error(`Invalid environment settings: ${result.error.issues.map(issue => issue.path.join('.')).join(', ')}`);
  const value = result.data;
  const allowedOrigins = value.ALLOWED_ORIGINS.split(',').map(item => item.trim()).filter(Boolean);
  if (!allowedOrigins.length || allowedOrigins.some(origin => { try { const url = new URL(origin); return !['http:', 'https:'].includes(url.protocol) || url.origin !== origin; } catch { return true; } })) throw new Error('ALLOWED_ORIGINS must contain exact HTTP(S) origins without paths or wildcards.');
  const mailConfigured = [value.SMTP_HOST, value.SMTP_USER, value.SMTP_PASSWORD, value.EMAIL_FROM, value.EMAIL_TO].every(Boolean);
  if (value.NODE_ENV === 'production' && !mailConfigured) throw new Error('Production email configuration is incomplete.');
  return { env: value.NODE_ENV, port: value.PORT, allowedOrigins, trustProxy: value.TRUST_PROXY_HOPS, mailConfigured, smtp: { host: value.SMTP_HOST, port: value.SMTP_PORT, secure: value.SMTP_SECURE === 'true', auth: { user: value.SMTP_USER, pass: value.SMTP_PASSWORD } }, emailFrom: value.EMAIL_FROM, emailTo: value.EMAIL_TO };
}
