# Project Handoff Context — eKashmirTourPackage.com

You are continuing work on an existing Next.js project. Read this fully before writing any code.

---

## 1. Project

**eKashmirTourPackage.com** — a Kashmir travel/tour-package website.

**Stack**
- Next.js (App Router) — a recent version with breaking changes vs. older docs. **Before writing code, read the relevant guide in `node_modules/next/dist/docs/`.** Do not assume older Next.js conventions.
- Tailwind CSS v4
- MongoDB + Mongoose
- framer-motion for animation
- lucide-react for icons
- Local dev: `http://localhost:3000`
- Repo root: `/Users/atulmishra/Experience my india/EKashmirTourPackage`
- Current git branch: `package`

---

## 2. HARD RULES (the user has stated these explicitly — never violate)

1. **Never use browser preview / Playwright / screenshots / any extra verification tool.** It burns tokens. The user will tell you what is wrong visually.
2. **Never use Y-axis padding greater than `10`** (i.e. max `py-10`, `sm:py-10`, etc.) on ANY component, at ANY screen size. This applies to all future components too.
3. The user works **section by section from Figma screenshots**. Wait for the screenshot/description; implement exactly that one component; don't redesign neighbouring things unasked.
4. Colour theme is **white + sky/cyan/blue Tailwind variants**. Gradients are almost always `from-sky-500 to-cyan-400` (or `from-sky-600 to-cyan-400` for text).

---

## 3. Codebase gotchas learned the hard way (do not re-discover these)

| Gotcha | Detail |
| --- | --- |
| **framer-motion kills inline `transform`** | Never put `transform: "translate(-50%,-50%)"` in a `motion.div` style — motion overwrites it. Wrap in a plain `<div>` for positioning, put the `motion.div` inside for scale/opacity only. |
| **`@tailwindcss/typography` is NOT installed** | All `prose-*` classes are silent no-ops. For `dangerouslySetInnerHTML` content, write scoped global styles instead — the codebase uses `<style jsx global>` with scoped class names: `.blog-content`, `.overview-content`, `.itinerary-content`. Style h1–h4, p, ul, ol, table, blockquote explicitly. |
| **lucide-react has NO brand icons** | `Instagram`, `Youtube`, `Facebook`, `Twitter` are `undefined` in this version. Use inline `<svg>` brand glyphs (Footer.tsx already has them). |
| **`bg-clip-text` on a lucide icon makes it invisible** | To gradient-fill a lucide icon, render an `<svg width="0" height="0">` with a `<linearGradient id="...">` in `<defs>`, then pass `fill="url(#id)" stroke="url(#id)"` to the icon. See `PackagesShowcaseRow.tsx`. |
| **`PackageEditor.tsx` is DEAD CODE** | `src/components/admin/package/PackageEditor.tsx` is imported by nothing. The **real** CMS forms are `src/app/admin/packages/create/page.tsx` and `src/app/admin/packages/[id]/edit/page.tsx`. Any new CMS field must be added to BOTH of those (form state `PkgForm`, `INITIAL`, `buildPayload`, plus a `CMSSection` in the JSX). |
| **Async server components can't be rendered by client components** | Standard App Router rule; it has bitten this project. |
| **Mongoose serialization** | Always `.lean()` then `JSON.parse(JSON.stringify(...))` (or map to a plain DTO) before passing to client components. |
| **Tailwind v4 dynamic spacing works** | `h-37.5`, `h-4.5`, `scale-108`, `duration-600`, `-rotate-40` are all valid. Use `bg-linear-to-r` (v4 canonical), not `bg-gradient-to-r`. |

---

## 4. Directory map (the parts that matter)

```
src/
  app/
    page.tsx                                  # home page
    kashmir-tour-packages/
      page.tsx                                # package ARCHIVE / hub page
      [slug]/page.tsx                         # resolves BOTH packages AND hub pages via classifySlug()
    admin/packages/create/page.tsx            # REAL CMS create form
    admin/packages/[id]/edit/page.tsx         # REAL CMS edit form
    admin/city-hubs/ | duration-hubs/ | theme-hubs/
    api/city-hubs/ | duration-hubs/ | theme-hubs/
  components/
    home/
      AnimatedHeroHome.tsx                    # sky/mountain/foreground/cloud layers, 200 snowflakes
      AboutUs.tsx
      Topdestinations.tsx                     # hover-to-widen cards
      PopularPackagesCarousel.tsx             # ★ THE CANONICAL CARD DESIGN — copy from this
      Howitworks.tsx                          # dashed wave SVG + numbered nodes
      TourCategories.tsx                      # exports `PackageCard` type used everywhere
      cta/whatsapp.ts, CtaGradientBanner.tsx, CtaSplitImage.tsx, CtaGlassOverlay.tsx
    layout/
      Navbar.tsx, Footer.tsx, Breadcrumbs.tsx
    package/
      PackageHero.tsx, PackageOverview.tsx, PackageHighlights.tsx,
      PackageItinerary.tsx, InclusionsExclusions.tsx, KnowBeforeYouGo.tsx,
      PackageInclusionsStrip.tsx, Destinationroute.tsx, BookingForm.tsx,
      PackageLocationMap.tsx, PackageTestimonial.tsx
    packageArchive/
      PackagesShowcaseRow.tsx                 # shared row layout + ShowcaseCard
      CityPackagesShowcase.tsx                # thin wrapper
      ThemePackagesShowcase.tsx               # thin wrapper
      DurationPackagesShowcase.tsx            # thin wrapper
      PackageHubLinks.tsx                     # crawlable hub link pills (server component)
      Kashmirtruststats.tsx, PremiumTravelAssistance.tsx, packageArchiveHero.tsx
  models/
    Package.ts, CityHub.ts, DurationHub.ts, ThemeHub.ts
  lib/db.ts                                   # connectDB()
  hooks/useInView.ts
public/
  Home/Hero/, TopDestination/, LittleMountainLeft.svg, LittleMountainRight.svg, footer-mountain.svg
```

---

## 5. Key shared types

```ts
// src/components/home/TourCategories.tsx
export interface PackageCard {
  id: string;
  slug: string;
  title: string;
  days: number;
  location: string;
  idealFor?: string;
  themes: string[];
  inclusions: string[];
  price: string;          // pre-formatted "₹12,000"
  originalPrice: string;
  images: string[];       // [hero, ...childImages]
  rating?: number;
}
```

```ts
// src/components/packageArchive/PackageHubLinks.tsx
export interface HubLink { label: string; href: string; sublabel?: string }
```

---

## 6. What was JUST completed (most recent work)

### The package archive page `/kashmir-tour-packages`

`src/app/kashmir-tour-packages/page.tsx` fetches published **CityHub / DurationHub / ThemeHub** docs, then for the first `FEATURED_ROWS_PER_TYPE = 2` hubs of each type, fetches matching packages and renders a horizontally-scrolling card row per hub, each with a CTA button linking to that hub page. Below the rows, three `<PackageHubLinks>` blocks render the FULL list of hub links (server-rendered, crawlable — required by the SOP).

Key helpers in that file:
```ts
const PACKAGE_CARD_FIELDS = "title slug category themes days nights destination price rating heroImage childImages isTransferIncluded isStayIncluded isBreakfastIncluded isSightseeingIncluded inclusions";
function toPackageCard(pkg: any): PackageCard
async function findPackageCards(filter = {}, limit?): Promise<PackageCard[]>   // single query path
const ciExact = (v: string) => new RegExp(`^${escapeRegex(v)}$`, "i");
function escapeRegex(v: string) { return v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
async function getPackagesByCity(cityName, limit = 8)      // { availableSrc: ciExact(cityName) }
async function getPackagesByTheme(themeName, limit = 8)    // { themes: ciExact(themeName) }
async function getPackagesByDuration(days, limit = 8)      // { days }
async function getHubs()                                   // { cities, durations, themes }
const hubUrl = (slug: string) => `/kashmir-tour-packages/${slug}/`;
```

`ciExact` exists because **`availableSrc` is stored lowercase (`"delhi"`) while hub `cityName` is title-cased (`"Delhi"`)** — exact equality silently returned zero rows. Verified via a DB probe: exact `"Delhi"` → 0 results, case-insensitive → 1 result.

### `PackagesShowcaseRow.tsx` — the card

`ShowcaseCard` was rewritten to exactly match `PopularPackagesCarousel`:
- framer-motion image `scale: 1.08` on expand
- Top-right gallery (`ImageIcon`) + `Heart` icons, gradient-filled via `ICON_GRADIENT_ID = "showcase-icon-gradient"` and an `<svg width="0" height="0">` defs block at the bottom of the section
- Glass panel `bg-white/15 backdrop-blur-md`, animating `height: 92 → 184`
- Meta row: `CloudSun` days + `Star` rating; then price + `/ Person`; then a **Book Now** pill (`group/cta`, text slides left, arrow slides right and rotates `-40deg`)
- `const expanded = isDesktop ? hovered : true;` — the whole card is a `<Link>`, so tapping navigates on mobile; the panel stays open there instead of toggling
- Book Now is a styled `<span>`, **not** a `<button>`/`<Link>` — nesting interactive elements inside an anchor is invalid HTML
- `shrink-0 snap-start` live on the `<article>` (the flex item), the inner `Link` is `w-full`
- `if (packages.length === 0) return null;` — rows self-hide

Typecheck was clean (`npx tsc --noEmit`).

---

## 7. ⚠️ OPEN ISSUE — the rows render empty (DATA problem, not code)

Direct MongoDB probe found:

```
Published packages: 1
  "dal lake package"  →  days=3, themes=[], availableSrc=["delhi"]

Published hubs:
  City hub     → "Mumbai"        (slug: from-mumbai)
  Duration hub → 6 days/5 nights (slug: 6-days-5-nights)
  Theme hub    → "Honeymoon"     (slug: honeymoon-packages)
```

**Zero overlap.** So all three showcase rows correctly return `null`. Nothing is broken.

To make cards appear, the user must do ONE of these in the CMS:
- Create a **3-days duration hub** (matches `days=3`)
- Create a **Delhi city hub** (now works thanks to the case-insensitive fix)
- Add `"Honeymoon"` to the package's `themes`
- Add `"Mumbai"` to the package's `availableSrc`

**If the user says "the cards still aren't showing" — check the data first, not the CSS.**

---

## 8. Other pending / previously-offered but unconfirmed items

- Reciprocal **spoke → hub** links on the individual hub pages (SOP internal-linking requirement)
- A lightweight `fields` / `limit` query param on `/api/packages` — the Footer currently fetches ALL published packages client-side just to show 6 thumbnails
- Delete the dead `src/components/admin/package/PackageEditor.tsx`
- Footer still has **placeholder** social URLs and placeholder NAP (name/address/phone) contact details — needs real data
- WhatsApp number in `src/components/home/cta/whatsapp.ts` is still the placeholder `919999999999`

---

## 9. SEO / AEO / GEO requirements (from `eKashmir-Website-Architecture-SOP.pdf` in repo root)

- **No `AggregateRating` schema without genuine reviews** — do not fabricate ratings in JSON-LD.
- All critical content and internal links must be **server-rendered** in the SSR HTML (this is why `PackageHubLinks` is a server component with no `"use client"`).
- Money pages must be **≤ 2 clicks from the home page**.
- JSON-LD already implemented: `TouristTrip` + `Offer` (package pages), `BreadcrumbList` (in `Breadcrumbs.tsx`), `FAQPage` (built only from non-empty FAQs).
- Hub-and-spoke internal linking: archive → city/duration/theme hubs → individual packages.

---

## 10. How to work with this user

- They give a screenshot + a numbered list of fixes. Address every numbered item.
- They notice small visual details (padding, alignment, transition speed, icon fill, text wrapping). Prefer slower, smoother transitions (`0.5s–1.8s`) — they repeatedly asked for slower.
- They want mobile behaviour specified separately: desktop = hover, mobile = tap or always-open. The codebase pattern is:
  ```ts
  const mql = window.matchMedia("(min-width: 640px)");
  ```
- Don't claim something is done without it actually compiling. Run `npx tsc --noEmit` instead of a browser preview.
- Be precise about whether a file was **created** vs **modified** — the user got confused once when a modified file was described as new.
