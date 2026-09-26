import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { contactSchema, validationErrors } from './validation.js';

export function createApp({ config, sendMail, limit = 5, logError = code => console.error(code) }) {
  const app = express();
  app.disable('x-powered-by');
  if (config.trustProxy) app.set('trust proxy', config.trustProxy);
  app.use(helmet());
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    const origin = req.get('origin');
    if (origin && !config.allowedOrigins.includes(origin)) return res.status(403).json({ ok: false, message: 'Origin is not allowed.' });
    next();
  });
  app.use(cors({ origin: config.allowedOrigins, methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'], credentials: false }));
  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit, standardHeaders: 'draft-7', legacyHeaders: false, message: { ok: false, message: 'Too many attempts. Please try again later.' } });
  app.get('/api/health', (_req, res) => res.json({ ok: true, deliveryConfigured: Boolean(sendMail) }));
  app.post('/api/contact', limiter, (req, res, next) => {
    if (!req.is('application/json')) return res.status(415).json({ ok: false, message: 'Use application/json.' });
    next();
  }, express.json({ limit: '12kb', strict: true }), async (req, res) => {
    const result = contactSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ ok: false, message: 'Please check the form fields.', errors: validationErrors(result.error) });
    if (result.data.website) return res.status(200).json({ ok: true });
    if (!sendMail) return res.status(503).json({ ok: false, message: 'Email delivery is not configured.' });
    try { await sendMail(result.data); return res.status(200).json({ ok: true }); }
    catch { logError('CONTACT_DELIVERY_FAILED'); return res.status(502).json({ ok: false, message: 'Email delivery failed. Please try again.' }); }
  });
  app.use((_req, res) => res.status(404).json({ ok: false, message: 'Endpoint not found.' }));
  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.too.large') return res.status(413).json({ ok: false, message: 'Request body is too large.' });
    if (error.type === 'entity.parse.failed') return res.status(400).json({ ok: false, message: 'Malformed JSON.' });
    logError('CONTACT_SERVER_ERROR');
    return res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' });
  });
  return app;
}
