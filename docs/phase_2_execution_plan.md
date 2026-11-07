# Implementation Plan: Phase 2 - Data Hardening, Contact Form & Copy Updates

## Goal Description
Implement Phase 2 of the portfolio overhaul on branch `phase-2-data-contact`:
1. **Curate & Harden GitHub Repos:**
   - Server-side ISR (1h) using `GITHUB_TOKEN` when present, falling back cleanly to a complete static snapshot if API errors or token is omitted.
   - Limit `FEATURED_REPO_NAMES` to exactly 6: `unidep`, `relay-http`, `AI-Powered-Email-Response-Generator`, `PDF-Helper`, `macOS-Window-Position-Utility`, `Portfolio-Illustration`.
   - Hide star/fork stat badges entirely when value is 0 or missing.
   - Add a prominent "View all on GitHub" button.
2. **Contact Form Pipeline Overhaul:**
   - Remove `formsubmit.co` relay and eliminate client-side email exposure.
   - Install `resend` and `zod` as server-only dependencies.
   - Implement route handler (`src/app/api/contact/route.ts`) with:
     - Zod server-side validation with input length limits.
     - Input HTML escaping and header injection defense (stripping newlines from name).
     - Hidden honeypot field (`company_website` / `b_url`): returns standard HTTP 200 `{ success: true }` without invoking email delivery.
     - Sliding window / token bucket IP rate limiter: 5 requests per 10 minutes per IP. Returns 429 Too Many Requests.
     - Vercel WAF rate limiting documentation and configuration guide.
     - Resend sending with default `onboarding@resend.dev` -> `process.env.CONTACT_NOTIFICATION_EMAIL || 'minicm034@gmail.com'`, with dynamic `from` via `RESEND_FROM_EMAIL` and `reply_to` pointing to the submitter's email.
     - Generic client-facing error message with fallback email `minicm034@gmail.com` if email delivery fails.
   - In `ContactForm.tsx`:
     - Client bundle stays zero-cost for validation: native HTML attributes (`required`, `type="email"`, `maxLength`).
     - Honeypot input (`tabIndex={-1}`, `aria-hidden="true"`, off-screen).
     - Accessible alerts: `aria-live="polite"` for error banner and success message.
3. **Copy Polish:**
   - Replace "Product-Minded Engineer" / "Product-minded engineer" with **"Product Engineer"** across `Hero.tsx`, `About.tsx`, and `layout.tsx`.
   - Remove the robot emoji (`🤖`) from the badge in `Hero.tsx`.
4. **Docs & Env Config:**
   - Update `.env.local.example` and `README.md` with all optional and required env vars.
   - Verify bundle sizes remain <= 112 kB First Load JS.
   - Run local automated tests and open a pull request.

---

## User Review Required
> [!IMPORTANT]
> **Vercel WAF Plan Requirement:**
> Custom WAF Rate Limiting rules (`Security > Firewall > Custom Rules > Rate Limiting`) in the Vercel Dashboard require a **Vercel Pro** or **Enterprise** plan (10 custom rate limiting rules included in Pro).
> On **Vercel Hobby** plans, Vercel provides basic automatic DDoS mitigation and Attack Challenge Mode, but custom path rate limits (`/api/contact`) cannot be set in the UI. For this reason, the code-level IP token bucket in `/src/app/api/contact/route.ts` is essential to protect Hobby deployments as well.

---

## Proposed Changes

### 1. Dependencies
Add `resend` and `zod`:
```bash
npm install resend zod
```

---

### 2. Copy Updates: "Product Engineer" & Remove Robot Emoji

#### [MODIFY] [Hero.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/components/sections/Hero.tsx)
- Line 36: `Product-Minded Engineer` -> `Product Engineer`
- Line 39: `🤖 AI-Powered Tools &amp; Automation` -> `AI-Powered Tools &amp; Automation`

#### [MODIFY] [About.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/components/sections/About.tsx)
- Line 12: `Product-minded engineer with 10+ years...` -> `Product engineer with 10+ years...`

#### [MODIFY] [layout.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/app/layout.tsx)
- Replace all occurrences of `Product-minded engineer` with `Product engineer` in titles, descriptions, OpenGraph, and Twitter tags.

---

### 3. GitHub Data & Project Display

#### [MODIFY] [constants.ts](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/lib/constants.ts)
- Update `FEATURED_REPO_NAMES` to exactly 6 repos:
```typescript
export const FEATURED_REPO_NAMES = [
  'unidep',
  'relay-http',
  'AI-Powered-Email-Response-Generator',
  'PDF-Helper',
  'macOS-Window-Position-Utility',
  'Portfolio-Illustration'
]
```

#### [MODIFY] [github.ts](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/lib/github.ts)
- Add complete static fallback data for the 6 featured repos if GitHub API is unreachable, rate limited (403), or returns non-200.
- Fetch with `next: { revalidate: 3600 }` (1 hour ISR).
- Include `Authorization: Bearer ${process.env.GITHUB_TOKEN}` if `GITHUB_TOKEN` is present in environment.

#### [MODIFY] [ProjectCard.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/components/animations/ProjectCard.tsx)
- Hide star and fork badges when `project.stars === 0` or missing.

#### [MODIFY] [FeaturedProjectSpotlight.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/components/animations/FeaturedProjectSpotlight.tsx)
- Hide star and fork count badges when 0 or undefined.

#### [MODIFY] [Projects.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/components/sections/Projects.tsx)
- Add "View all on GitHub" button at the bottom of the section linking to `https://github.com/MilossGIT` with external link icon.

---

### 4. Contact Form Pipeline

#### [MODIFY] [src/app/api/contact/route.ts](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/app/api/contact/route.ts)
- Implement:
  1. **In-Memory IP Token Bucket Rate Limiter**: 5 requests per 10 minutes per IP (`x-forwarded-for` / `x-real-ip`). Returns 429 when exceeded with generic client message.
  2. **Honeypot Check**: Check `body.b_website`. If non-empty, silently log honeypot hit and return HTTP 200 `{ success: true }`.
  3. **Zod Schema Validation**:
     ```typescript
     const ContactSchema = z.object({
       name: z.string().trim().min(1, 'Name is required').max(100),
       email: z.string().trim().email('Invalid email address').max(120),
       message: z.string().trim().min(5, 'Message is too short').max(2000),
       b_website: z.string().optional(),
     })
     ```
  4. **Sanitization**:
     - Strip newlines from name: `name.replace(/[\r\n]/g, ' ')`
     - HTML escape all user values in the email body: `& -> &amp;`, `< -> &lt;`, `> -> &gt;`, `" -> &quot;`, `' -> &#039;`.
  5. **Resend Email Delivery**:
     - Client initialized with `process.env.RESEND_API_KEY`.
     - `from`: `process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'`
     - `to`: `process.env.CONTACT_NOTIFICATION_EMAIL || 'minicm034@gmail.com'`
     - `reply_to`: submitter's validated email.
     - Fallback: If `RESEND_API_KEY` is not configured, logs to server console in development and returns success or simulated response, or if sending fails, returns 500 with friendly message instructing user to email `minicm034@gmail.com` directly.

#### [MODIFY] [ContactForm.tsx](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/src/components/sections/ContactForm.tsx)
- Add hidden honeypot field (`name="b_website"`), hidden via CSS and `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`.
- Add `aria-live="polite"` error banner above form fields for errors.
- Include direct mailto fallback link to `minicm034@gmail.com` if server reports a failure.
- Native HTML constraints: `required`, `maxLength={100}`, `maxLength={120}`, `maxLength={2000}`.
- Disable submit button and render spinner while submitting.

---

### 5. Documentation & Environment Configuration

#### [MODIFY] [.env.local.example](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/.env.local.example)
```env
# Contact Form (Resend)
# Optional in dev; required in production for real email delivery
RESEND_API_KEY=re_your_api_key_here
# Optional: defaults to 'Portfolio Contact <onboarding@resend.dev>'
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
# Optional: defaults to 'minicm034@gmail.com'
CONTACT_NOTIFICATION_EMAIL=minicm034@gmail.com

# GitHub API (Optional: increases rate limit from 60 to 5,000 req/hr)
GITHUB_TOKEN=ghp_your_token_here
```

#### [MODIFY] [README.md](file:///Users/minasesek/Downloads/Milos/Milos%20coding/portfolio-showcase/README.md)
- Document environment variables and the Vercel WAF setup steps.

---

## Verification Plan

### Automated Verification
1. Run local test suite / verification script:
   - Test 1: Valid submission -> returns 200 OK.
   - Test 2: Invalid email / short message -> returns 400 Bad Request.
   - Test 3: Honeypot field filled -> returns 200 OK without sending email.
   - Test 4: Rate limit hit (6th request within window) -> returns 429 Too Many Requests.
2. Run build and typecheck:
   ```bash
   npm run lint && npm run build
   ```
3. Check First Load JS size comparison to verify zero client bundle inflation.

### Manual Verification
1. Verify "Product Engineer" badge in Hero.
2. Verify "View all on GitHub" button in Projects section.
3. Test Contact Form in browser:
   - Fill out and submit form.
   - Inspect network request: confirm no secrets or direct email URL relays.
