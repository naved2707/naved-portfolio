import { loadConfig } from './config.js';
import { createApp } from './app.js';
import { createMailer } from './mailer.js';

try {
  const config = loadConfig();
  const app = createApp({ config, sendMail: createMailer(config) });
  const server = app.listen(config.port, () => { console.log(`Contact service listening on port ${config.port}.`); if (!config.mailConfigured) console.log('Email is not configured; delivery requests return 503.'); });
  const shutdown = () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10000).unref(); };
  process.on('SIGTERM', shutdown); process.on('SIGINT', shutdown);
} catch (error) { console.error(error.message); process.exitCode = 1; }
