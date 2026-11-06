# Phase 0: Project Audit Report

**Project:** Miloš Minić Personal Portfolio (`portfolio-showcase`)  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion  
**Deployment:** Vercel (`https://milosminic.net`)  
**Positioning:** Product-minded engineer building AI-powered tools  

---

## 1. Bundle-Size & Performance Concerns
- **Framer Motion Full Runtime Overhead:** Currently imported with standard `import { motion } from 'framer-motion'` across 8+ component files without `LazyMotion` or `domAnimation`. This bundles the full motion library (~35kB+ gzipped / ~120kB unminified) into the initial payload.
- **Particle Background (`StarfieldWarp.tsx`):**
  - Renders 380 canvas stars continuously on all devices without dynamic import (`next/dynamic` with `ssr: false`).
  - Does not reduce particle count for mobile screens (same 380 stars render on low-power mobile GPUs).
  - Listens to mouse movements and runs `requestAnimationFrame` continuously.
  - Pauses only via IntersectionObserver when scrolled offscreen, but **fails to pause when the browser tab is hidden** (`document.visibilityState === 'hidden'`).
  - **Ignores `prefers-reduced-motion` completely**, triggering motion sickness risks.
- **Unoptimized Hero Image:** The profile photo in `Hero.tsx` uses a raw HTML `<img>` tag instead of `next/image`. It lacks Next.js automatic WebP/AVIF compression, modern srcset responsive sizing, and explicit priority loading flags.

---

## 2. SSR Opacity & Hydration Flash
- **Content Rendered at `opacity: 0` in SSR:**
  - `FadeInView.tsx` defines `initial={{ opacity: 0, y: 24 }}`.
  - Because `FadeInView` wraps `SectionHeader`, `About`, `Experience`, `Projects`, `Contact`, and `Footer`, the initial HTML sent by the server has `style="opacity: 0; transform: translateY(24px)"`.
  - In `WorkHighlights.tsx`, every card uses `initial={{ opacity: 0, y: 36 }}` and every tag uses `initial={{ opacity: 0, y: 8 }}`.
  - **Impact:** Web crawlers, Lighthouse bots, or users on slow connections initially receive invisible text. This penalizes the Largest Contentful Paint (LCP) and First Meaningful Paint.

---

## 3. Client vs. Server Component Boundaries
- **Pervasive `'use client'` Directive:**
  - `page.tsx` is the only Server Component.
  - Every single section component (`Hero.tsx`, `About.tsx`, `Experience.tsx`, `WorkHighlights.tsx`, `Projects.tsx`, `Contact.tsx`), along with `Navbar.tsx`, `Footer.tsx`, and `SectionHeader.tsx`, is marked `'use client'`.
  - Content that is purely static (career descriptions, education history, about text, project summaries) is serialized into client bundles rather than streaming lightweight static HTML.

---

## 4. Accessibility (a11y) Gaps
- **Missing Skip Link:** No `<a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>`. Keyboard and screen reader users must tab through all navigation items on every page visit.
- **Missing Landmark Labeling:** `<section>` tags lack `aria-label` or `aria-labelledby` attributes pointing to their corresponding section headers.
- **Inconsistent Focus States:**
  - While `Button.tsx` has `focus-visible:ring-2 focus-visible:ring-primary`, navigation items in `Navbar.tsx`, social links in `Footer.tsx`, and contact links in `Contact.tsx` lack high-contrast visible focus rings.
- **Color Contrast:**
  - In light mode, `--muted-foreground: 0 0% 45%` against white background gives a contrast ratio of ~4.48:1 (slightly below the WCAG AA 4.5:1 minimum for normal text).
- **Reduced Motion:** No global listener (`useReducedMotion` or `MotionConfig reducedMotion="user"`) to suppress motion for sensitive users.

---

## 5. GitHub Repository Data Fetching
- **Current Flow:**
  - `page.tsx` fetches server-side via `fetchGitHubRepos(FEATURED_REPO_NAMES)` with Next.js ISR (`next: { revalidate: 3600 }`).
  - Fallback logic switches to `staticProjectsToGitHub(PROJECTS)` if the GitHub API fails or rate-limits.
  - `Projects.tsx` also contains a duplicate client-side `useEffect` that calls `/api/github` if `initialProjects` is empty.
- **Issues:**
  - If a repo has 0 stars or missing metadata, the UI still renders empty stat placeholders.
  - `FEATURED_REPO_NAMES` in `constants.ts` is outdated (contains older repos rather than the curated AI/developer tooling list).

---

## 6. Contact Form & Security
- **Current Implementation:**
  - Client component submits to internal `/api/contact` route.
  - `/api/contact` forwards requests to `https://formsubmit.co/ajax/${CONTACT_EMAIL}`.
- **Issues:**
  - Exposes the target email address in the third-party endpoint URL.
  - **No honeypot field** to catch automated bots.
  - **No rate limiting** (susceptible to spam loops).
  - Validation is manual regex; lacks resilient Zod schema parsing.
  - Error and success states are not hooked up with accessible ARIA live regions (`aria-live="polite"`).

---

## 7. SEO & Metadata Status
- **Strengths:** Base metadata in `layout.tsx` is configured with `metadataBase`, OpenGraph tags, Twitter card, description, and keywords.
- **Gaps:**
  - Missing explicit canonical URL in metadata (`alternates: { canonical: 'https://milosminic.net' }`).
  - Missing `sitemap.ts` (or `sitemap.xml`) in `src/app/`.
  - Missing `robots.ts` (or `robots.txt`) in `src/app/`.
  - Missing JSON-LD structured data (`Person` schema) to establish identity in Google Knowledge Graph.
  - Vercel preview domain (`portfolio-showcase-mu.vercel.app`) is not redirected or configured with `noindex`.

---

## Prioritized List of Fixes

| Priority | Category | Proposed Action | Target Phase |
| :--- | :--- | :--- | :--- |
| **HIGH** | **Performance & SSR** | Replace `initial={{ opacity: 0 }}` in SSR with CSS progressive enhancement or `LazyMotion` to eliminate invisible text in initial HTML. | Phase 1 |
| **HIGH** | **Performance** | Lazy-load `StarfieldWarp` with `next/dynamic({ ssr: false })`, reduce stars on mobile (<150), and pause on tab hidden (`visibilitychange`). | Phase 1 |
| **HIGH** | **Accessibility** | Enforce global `prefers-reduced-motion` check for both Framer Motion and the canvas Starfield animation. | Phase 1 |
| **HIGH** | **Images** | Convert profile photo in `Hero.tsx` to `next/image` with responsive `sizes` and `priority`. | Phase 1 |
| **HIGH** | **Security & Spam** | Add honeypot field, rate limiting, and Zod validation to contact form handling; eliminate third-party FormSubmit exposure. | Phase 2 |
| **MEDIUM** | **Bundle Size** | Switch Framer Motion to `LazyMotion` with `domAnimation` and extract static content to Server Components where feasible. | Phase 1 |
| **MEDIUM** | **Data Architecture** | Curate featured repos to 6 AI/product projects, clean up stats display (hide empty stats), and ensure ISR stability. | Phase 2 |
| **MEDIUM** | **Accessibility** | Add Skip to Content link, landmark labels (`aria-labelledby`), and visible `focus-visible` rings on all interactive elements. | Phase 4 |
| **MEDIUM** | **SEO** | Add `sitemap.ts`, `robots.ts`, canonical link, and JSON-LD `Person` schema. | Phase 4 |
| **LOW** | **Theme & Contrast** | Fine-tune `--muted-foreground` lightness in `globals.css` to guarantee strict WCAG AA contrast. | Phase 4 |
| **LOW** | **Repo & Docs** | Polish README, document env vars in `.env.local.example`, and prepare Next.js upgrade assessment. | Phase 5 |
