# Validation notes

Original checks: 19 September 2026. Contact and visual update: 22 September 2026.

## September 22 update

- Supplied email, GitHub, LinkedIn, Instagram and international WhatsApp number are configured. Instagram sharing query removed.
- Web3Forms direct HTTPS submission replaces draft mode. Success requires the provider's `success: true`; missing configuration and delivery errors fail visibly. The key is a public form identifier, not a Gmail credential.
- Eleven frontend/data/delivery tests pass, including fixed destination, field selection, strict response checking, rate-limit/timeout errors, missing configuration, server compatibility and WhatsApp encoding. Provider responses are injected in tests; tests do not send email.
- ESLint passed. Vite build and generated canonical/sitemap checked before publishing.
- Empty-form validation, dark/light display, mobile menu and mobile contact layout reviewed in the browser. Supplied social/WhatsApp hrefs inspected without sending messages or logging into those services.
- Updated layout checked at 320, 375, 425, 768, 1024, 1280, 1440 and 1920 CSS pixels; no horizontal page overflow.
- Placeholder avatar is an original illustration, optimized to a 12 KB WebP, explicitly labeled and easy to replace. About copy is shorter with an accessible component/data diagram; motion respects reduced-motion preferences.
- Canonical build configuration corrected to the existing deployed hostname.
- No real email submission was made in this update. Gmail receipt, Web3Forms account verification/settings and actual inbox/spam placement still need the owner's live check. No Gmail account was accessed. No CAPTCHA/account/domain settings changed.

## Original September 19 checks (historical)


### Automated checks on September 19

- Production Vite compilation and build-time SEO generation succeed.
- ESLint completes without errors or warnings.
- Five frontend/data tests pass.
- Eight Express behavior tests pass, using an injected mailer without sending real email.
- npm audit reports zero known vulnerabilities for both frontend and server dependency trees at the time checked. This is a point-in-time dependency check, not a security certification.
- The résumé is one A4 page with embedded fonts, selectable text, and no clipping in the rendered review.

### Browser checks on September 19

- Desktop light and dark layouts visually reviewed.
- Theme choice persists through page reload/navigation in the same browser.
- Full Stack filtering shows the CMS project and excludes EasyBuy.
- Command palette search returns the matching command; Enter navigates and closes it.
- Mobile navigation opens and closes on a project link.
- Project case studies open with their complete content, scroll within the viewport, and close with Escape.
- The original contact form rejected missing fields and supported draft download. Web3Forms replaced that default flow on September 22; this bullet describes the original release only.
- No application console errors observed in the reviewed flow; browser-extension diagnostics are outside the application.
- Responsive harness checked at widths 320, 375, 425, 768, 1024, 1280, 1440, and 1920 CSS pixels. Content width matched each available layout width; no horizontal page overflow. The desktop browser reserves 15 px for a vertical scrollbar; while dialogs lock page scroll, the available width increases accordingly.

The harness uses same-origin iframes, not real-device emulation. Layout was reviewed visually at desktop and mobile widths. Actual iOS/Android hardware, screen-reader announcements, OS reduced-motion emulation, and a formal WCAG audit were not performed. Reduced-motion rules and native modal behavior are implemented, but this is not a claim of formal conformance.

## Integration limits before public launch

- Supply your professional photo, final résumé, project source/live links and project screenshots. Public email/social/WhatsApp information is now supplied and configured. Current project visuals remain labeled interface concepts.
- Review project names and case-study narratives for consistency with your actual repositories. Planned work is marked explicitly.
- Replace the generated résumé with your final résumé including contact details.
- Web3Forms is configured for direct email delivery; verify it with a live submission and Gmail receipt. The optional Express service is not deployed and is not required for Web3Forms mode.
- Set the actual public domain in `VITE_SITE_URL` and rebuild when moving to Vercel or Netlify.
- No Lighthouse score is reported; the code is structured for performance, but a production audit should use your final assets and deployment.
- Optional GitHub API, image-failure fallback and Clipboard API fallback have not been exercised with live account data in this update. External links were checked against supplied URLs, not account ownership or third-party login flows.

## Focused regression commands

```bash
npm run lint
npm test
npm run test:server
npm run build
```

Keep the frontend and server lockfiles. Repeat the relevant tests when changing form validation, delivery, modal behavior, or the central data shape.

## Export verification — September 22

The download was reconstructed from the committed source for the latest published update. Application code is unchanged; README, release notes and this export clarification are refreshed. Every exported text file is included verbatim in Complete-Source.md, and all binary assets are included in the ZIP. Archive CRC and content-byte checks passed. Installed dependencies, build output, Git history, hosting-service internals and local environment files are excluded; both package lockfiles and environment examples are included.

This export step did not rerun the application tests or send any email. It reuses the prior successful build and eleven frontend tests. Live Gmail receipt remains unconfirmed.
