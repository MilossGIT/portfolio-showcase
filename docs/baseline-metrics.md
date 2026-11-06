# Baseline Metrics (Pre-Phase 1)

Captured on production build (`next build && next start`) with Lighthouse Mobile emulation (throttled 4x CPU, mobile network profile).

## 1. Bundle Sizes (`next build`)
```
Route (app)                              Size     First Load JS
┌ ○ /                                    14.1 kB         141 kB
├ ○ /_not-found                          873 B            88 kB
├ ƒ /api/contact                         0 B                0 B
├ ○ /api/github                          0 B                0 B
└ ○ /icon.svg                            0 B                0 B
+ First Load JS shared by all            87.1 kB
  ├ chunks/117-e707368c5a14e6f8.js       31.6 kB
  ├ chunks/fd9d1056-8fef90fb5a0b2194.js  53.6 kB
  └ other shared chunks (total)          1.92 kB
```

## 2. Lighthouse Mobile Scores
| Category | Score |
| :--- | :--- |
| **Performance** | **39 / 100** |
| **Accessibility** | **96 / 100** |
| **Best Practices** | **96 / 100** |
| **SEO** | **100 / 100** |

### Core Web Vitals & Loading Metrics
- **First Contentful Paint (FCP):** 2.3 s
- **Largest Contentful Paint (LCP):** 6.5 s (Severe delay due to client hydration and opacity animations)
- **Total Blocking Time (TBT):** 4,850 ms (Heavily blocked by client JS and canvas particle loop initialization)
- **Speed Index:** 6.0 s
- **Cumulative Layout Shift (CLS):** 0
