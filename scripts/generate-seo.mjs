import { readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { portfolio } from '../src/data/portfolioData.js';

const env = loadEnv('production', process.cwd(), 'VITE_');
const candidate = process.env.VITE_SITE_URL || env.VITE_SITE_URL || '';
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let html = await readFile('dist/index.html', 'utf8');
html = html.replace(/<title>.*?<\/title>/, `<title>${escape(portfolio.seo.title)}</title>`);
html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(portfolio.seo.description)}" />`);
for (const field of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta (?:property|name)="${field}" content=")[^"]*("\\s*/>)`), `$1${escape(portfolio.seo.title)}$2`);
for (const field of ['og:description', 'twitter:description']) html = html.replace(new RegExp(`(<meta (?:property|name)="${field}" content=")[^"]*("\\s*/>)`), `$1${escape(portfolio.seo.description)}$2`);
let url = '';
if (candidate) { const parsed = new URL(candidate); if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') throw new Error('VITE_SITE_URL must be an HTTP(S) origin.'); url = parsed.origin; }
const structured = { '@context': 'https://schema.org', '@type': 'Person', name: portfolio.name, jobTitle: portfolio.title, description: portfolio.seo.description, ...(url ? { url } : {}), sameAs: Object.values(portfolio.social).filter(Boolean) };
const metadata = `${url ? `<link rel="canonical" href="${escape(url)}/" /><meta property="og:url" content="${escape(url)}/" />` : ''}<script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>`;
html = html.replace('</head>', `${metadata}</head>`);
await writeFile('dist/index.html', html);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${url ? `Sitemap: ${url}/sitemap.xml\n` : ''}`);
if (url) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(url)}/</loc></url></urlset>`);
console.log(url ? 'Canonical URL, structured data and sitemap generated.' : 'Structured data generated. Set VITE_SITE_URL for canonical and sitemap.');
