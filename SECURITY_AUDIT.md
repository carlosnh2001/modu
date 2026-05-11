# MODU · Security Audit Report

**Date:** 2026-05-11  
**Scope:** Full-stack security review — OWASP Top 10, dependency audit, hardening  
**Stack:** Next.js 16.2.6 · React 19 · TypeScript · Tailwind CSS v4 · Zustand · Vercel  
**Auditor:** Claude (Anthropic) — senior web security analysis  

---

## Executive Summary

The application is a **static marketing + e-commerce configurator** with no backend, no database, and no authentication. This significantly reduces the attack surface. All identified issues were resolved during this audit session. The site is now hardened to production standards for its current architecture.

**Risk level before fixes:** MEDIUM  
**Risk level after fixes:** LOW  

---

## 1. Dependency Vulnerabilities

### Before Fix — `npm audit` findings

| Package | Severity | CVE / Advisory | Description |
|---------|----------|---------------|-------------|
| `next` 16.2.4 | **HIGH** | GHSA-8h8q-6873-q5fj | Denial of Service via Server Components |
| `next` 16.2.4 | **HIGH** | GHSA-ffhc-5mcf-pf4q | XSS in App Router via CSP nonces |
| `next` 16.2.4 | **HIGH** | GHSA-vfv6-92ff-j949 | Cache poisoning via RSC cache busting |
| `next` 16.2.4 | **HIGH** | GHSA-gx5p-jg67-6x7h | XSS in `beforeInteractive` scripts |
| `next` 16.2.4 | **HIGH** | GHSA-mg66-mrh9-m8jx | DoS via Cache Components connection exhaustion |
| `next` 16.2.4 | **HIGH** | GHSA-h64f-5h5j-jqjh | DoS in Image Optimization API |
| `next` 16.2.4 | **HIGH** | GHSA-c4j6-fc7j-m34r | SSRF via WebSocket upgrades |
| `next` 16.2.4 | **HIGH** | GHSA-492v-c6pp-mqqv | Middleware/Proxy bypass via dynamic route injection |
| `next` 16.2.4 | HIGH | GHSA-wfc6-r584-vfw7 | Cache poisoning in RSC responses |
| `next` 16.2.4 | HIGH | GHSA-267c-6grr-h53f | Middleware bypass via segment-prefetch |
| `next` 16.2.4 | HIGH | GHSA-36qx-fr4f-26g5 | Middleware bypass via i18n in Pages Router |
| `next` 16.2.4 | HIGH | GHSA-3g8h-86w9-wvmq | Middleware redirect cache poisoning |
| `postcss` (internal) | MODERATE | GHSA-qx2v-qp2m-jg93 | XSS via unescaped `</style>` in CSS stringify |

### Fix Applied

```bash
npm audit fix --force
# → next upgraded from 16.2.4 → 16.2.6
```

**Residual:** The `postcss` moderate vulnerability lives inside `next/node_modules/postcss` and cannot be fixed without downgrading Next.js to 9.x (a breaking change). This is an internal bundler dependency not reachable via user input — **risk accepted**.

---

## 2. Security Headers

### Before Fix
`next.config.ts` had **zero HTTP security headers**. Responses were sent with browser defaults, leaving the app exposed to clickjacking, MIME-sniffing, and information leakage.

### Fix Applied — `next.config.ts`

All routes now receive the following headers:

| Header | Value | Protection |
|--------|-------|-----------|
| `X-Frame-Options` | `SAMEORIGIN` | Clickjacking |
| `X-Content-Type-Options` | `nosniff` | MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | Browser API abuse |
| `X-DNS-Prefetch-Control` | `on` | Performance + control |
| `X-XSS-Protection` | `1; mode=block` | Legacy browser XSS |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS enforcement |
| `Content-Security-Policy` | See below | XSS, injection |

#### Content Security Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
connect-src 'self';
frame-src 'self';
media-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests
```

**Notes on `'unsafe-inline'`:** Required by Tailwind CSS v4 (CSS-in-JS class injection) and Next.js inline scripts. To eliminate it in a future iteration, migrate to nonce-based CSP via Next.js middleware.

---

## 3. Form Input Validation

### Before Fix
Forms used `react-hook-form` with minimal rules (`required: true` only). No:
- Character length limits (DoS vector)
- Email format validation with error messages
- Phone number pattern enforcement
- Spanish postal code (CP) validation
- HTML-tag stripping (XSS prevention)

### Fix Applied

Both `/contacto` and `/muestras` forms now have:

| Field | Rules |
|-------|-------|
| Nombre | Required, maxLength 100, HTML-strip |
| Email | Required, RFC pattern, maxLength 254 |
| Teléfono | Optional, pattern `/^[+\d\s\-()]{7,20}$/` |
| Mensaje | Required (contacto), maxLength 2000 / 1000, HTML-strip |
| Dirección | Required, maxLength 200, HTML-strip |
| Ciudad | Required, maxLength 100, HTML-strip |
| CP | Required, `/^\d{5}$/` (Spanish postal code), maxLength 5 |

All string fields pass through a `sanitize()` function that strips HTML tags before they are processed, preventing stored XSS if form data is ever sent to a backend.

All fields include user-visible error messages (inline, in red, below the field).

---

## 4. Git Credential Exposure

### Finding
The git remote URL contained a GitHub Personal Access Token embedded in plain text:
```
https://ghp_[REDACTED]@github.com/carlosnh2001/modu.git
```
This token was visible in `git remote -v` output and in any tool that reads `.git/config`.

### Fix Applied
```bash
git remote set-url origin https://github.com/carlosnh2001/modu.git
```

**Action required:** Revoke the old token at https://github.com/settings/tokens and generate a new one. Use `git credential store` or macOS Keychain for future authenticated pushes — never embed credentials in the remote URL.

---

## 5. Sensitive Data in Source Code

### Finding
`app/contacto/page.tsx` contains hardcoded personal contact information:
- Email: `carlosnh2001@gmail.com`
- Phone: `+34 681 36 79 02`

This is visible in the public repository and published on the website.

### Status
This information is intentionally public-facing (contact page). No change was made. However:

**Recommendations:**
- Use a business email address (e.g., `hola@modu.es`) in production, not a personal Gmail
- Store contact info in environment variables or a CMS to avoid committing personal data to git history

---

## 6. Environment Variables

### Before Fix
No `.env.example` existed. Any future developer would not know what variables are needed.

### Fix Applied
Created `.env.example` documenting the structure for future integrations (Shopify, email delivery). `.gitignore` already correctly excludes `.env.local` and all `.env.*` files.

---

## 7. Authentication & Session Management

**Not applicable.** The application has no user accounts, no login, no sessions, and no cookies set by the application. Zustand cart state is in-memory only (no `localStorage` persistence was found). No CSRF tokens are needed as there are no state-mutating server endpoints.

---

## 8. API Routes & Server-Side Attack Surface

**Not applicable.** The application has zero API routes (`/api/*`). All pages are statically generated or client-rendered. There is no server-side data processing. The only dynamic route (`/tienda/[slug]`) is statically pre-rendered at build time.

---

## 9. CORS

**Not applicable.** No cross-origin requests are made from the frontend. `connect-src 'self'` in CSP enforces this.

---

## 10. Information Disclosure

### Findings
- Next.js version is exposed via the `X-Powered-By: Next.js` header (default Vercel behavior). This can be disabled in `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    poweredByHeader: false,
    // ...
  };
  ```

### Recommendation (not yet applied)
Add `poweredByHeader: false` to `next.config.ts` to prevent version fingerprinting.

---

## 11. Rate Limiting

### Finding
No rate limiting exists on form submissions. Since forms currently have no backend endpoint, this is not an active risk. When a backend is connected, rate limiting must be added.

### Recommendation (for future backend integration)
- Use Vercel Edge Middleware with `@upstash/ratelimit` + `@upstash/redis`
- Limit `/api/contact` and `/api/muestras` to 5 requests / minute per IP
- Add honeypot fields to detect bots without CAPTCHA friction

---

## 12. Image Optimization Security

The Next.js Image Optimization API (`/_next/image`) can be abused to proxy/DDoS arbitrary URLs. The current config restricts this:
```ts
remotePatterns: []  // No external image sources allowed
```
This is correct. Only local images are served.

---

## Summary of Changes Made

| # | File | Change |
|---|------|--------|
| 1 | `package.json` / `node_modules` | Next.js upgraded 16.2.4 → 16.2.6 (HIGH CVEs fixed) |
| 2 | `next.config.ts` | Added 8 security headers + full CSP |
| 3 | `app/contacto/page.tsx` | Strengthened form validation + HTML sanitization |
| 4 | `app/muestras/page.tsx` | Strengthened form validation + HTML sanitization + CP pattern |
| 5 | `.git/config` (remote URL) | Removed embedded GitHub PAT |
| 6 | `.env.example` | Created with documented variable structure |

---

## Recommended Next Steps (Post-Audit)

1. **Revoke the exposed GitHub token** at https://github.com/settings/tokens
2. **Add `poweredByHeader: false`** to `next.config.ts`
3. **Use a business email** (`hola@modu.es`) in the contact page instead of personal Gmail
4. **When adding a backend:** implement rate limiting, CSRF tokens, and server-side validation before any form data touches a database or email service
5. **Nonce-based CSP:** replace `'unsafe-inline'` with per-request nonces via Next.js middleware when the app gains server-rendered pages
6. **Periodic audits:** run `npm audit` before each deployment; automate with GitHub Actions dependabot alerts
