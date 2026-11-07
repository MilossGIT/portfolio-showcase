# Miloš Minić - Portfolio

A high-performance portfolio website built with Next.js 14 App Router, React, TypeScript, and Tailwind CSS.
Positioning: **Product Engineer** building AI-powered tools and modern web applications.

Live at: [https://www.milosminic.net](https://www.milosminic.net)

---

## Features

- 🌓 **Pure Dark Design:** Engineered with accessible high-contrast dark tokens (~5:1 contrast) and print media stylesheet.
- ⚡ **Next.js 14 App Router:** Server Component architecture with selective client boundaries.
- 🎨 **Framer Motion LazyMotion:** Strict `m.*` components using `domAnimation` bundle to keep First Load JS ~112 kB.
- 🌌 **Adaptive Canvas Starfield:** Lazy loaded dynamically on the client, capped to 110 stars on mobile, paused on tab blur, and renders a static frame on `prefers-reduced-motion`.
- 🐙 **Curated GitHub Integration:** Server-side ISR (1h) fetching 6 featured repositories with automatic static fallback snapshot.
- 📧 **Hardened Contact Pipeline:**
  - Server-side email delivery via **Resend** with input HTML-escaping and header injection defense.
  - Server-side schema validation via **Zod** (zero client bundle overhead).
  - Multi-tier spam protection: hidden honeypot field (`b_website`) returning silent 200 OK.
  - In-memory token bucket rate limiting (5 req / 10 min per IP) with 429 status code.
  - Accessible error and success states with `aria-live="polite"`.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (LazyMotion)
- **Icons:** Lucide React
- **Email Delivery:** Resend
- **Validation:** Zod (Server-side)
- **Deployment:** Vercel

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and populate:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description | Default |
| :--- | :--- | :--- | :--- |
| `RESEND_API_KEY` | Optional in dev / Required in prod | API key from [Resend](https://resend.com/api-keys). In dev without this key, submissions are simulated and logged. | - |
| `RESEND_FROM_EMAIL` | Optional | Sender address configured in Resend. | `Portfolio Contact <onboarding@resend.dev>` |
| `CONTACT_NOTIFICATION_EMAIL` | Optional | Destination inbox where contact form submissions are delivered. | `minicm034@gmail.com` |
| `GITHUB_TOKEN` | Optional | GitHub personal access token to raise API rate limits to 5,000 req/hr. | - |

---

## Vercel WAF Rate Limiting Setup

In addition to the code-level IP rate limiter, edge-level rate limiting can be configured on Vercel:

### Plan Requirements
- **Vercel Pro / Enterprise:** Includes Vercel Firewall / WAF with up to 10 custom Rate Limiting rules.
- **Vercel Hobby:** Includes automated DDoS mitigation and Attack Challenge Mode. Custom per-path rules are not available on Hobby, so the built-in in-memory token bucket in `src/app/api/contact/route.ts` provides the primary protection.

### Steps to Configure (Vercel Pro / Enterprise)
1. Go to your project in the **Vercel Dashboard**.
2. Navigate to **Security** > **Firewall** (or **WAF**).
3. Under **Custom Rules**, click **Add Rule**.
4. Configure rule parameters:
   - **Name:** `Contact Form Rate Limit`
   - **Path:** Equals `/api/contact`
   - **Method:** Equals `POST`
   - **Action:** `Rate Limit`
   - **Rate Limit Window:** 10 requests per 10 minutes per IP
   - **Response:** 429 (Too Many Requests)
5. Save and deploy the rule to edge regions.

---

## Getting Started

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building & Benchmarking

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```
