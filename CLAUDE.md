# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev:all    # Start json-server (port 3001) + Next.js dev server (port 3000) together — required for Portfolio/Careers pages
npm run dev         # Next.js dev server only
npm run server       # json-server only (data/db.json), port 3001
npm run build        # Production build
npm run start        # Start production server
npm run lint          # ESLint
npm run format         # Prettier --write src/**/*.{ts,tsx,scss,json}
npm run typecheck       # tsc --noEmit
```

There is no test suite configured in this repository.

Env vars (see `.env.example`): `NEXT_PUBLIC_API_URL` (json-server base URL), `NEXT_PUBLIC_CONTACT_API_URL` (optional; contact form resolves locally when unset), `NEXT_PUBLIC_APP_NAME`.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript + SCSS Modules. Material UI is used for icons only (`@mui/icons-material`) — no CSS-in-JS/MUI components for layout or styling.

**Routing & pages** (`src/app`): `/` (Home), `/portfolio`, `/careers`. Unknown routes render `not-found.tsx`, a standalone 404 page (own markup — "404" heading, message, "Go Back Home" link — imports `globals.scss` directly). Each route's actual page composition lives in `src/views/{Home,Portfolio,Careers}`, not in `src/app` — the `app/*/page.tsx` files are thin route entries.

**Data flow** — two different content sources feed the same pipeline shape:
- Hero, About, Contact and the footer are static, hardcoded in their own components.
- The Home `Services` section, Portfolio and Careers content come from `json-server` over `data/db.json`. Each top-level key in `db.json` (`services`, `careers`, `projects`, `jobs`) is its own REST endpoint.
- The layered data pipeline: `services/apiClient.ts` (the only module that calls `fetch`; owns base URL, headers, `ApiError` shape) → `services/contentService.ts` (typed per-page fetchers, e.g. `fetchPortfolio`/`fetchCareers`, fetching related resources in parallel) → `hooks/useFetch.ts` (generic `{ data, status, error, retry }` hook, aborts in-flight requests on unmount) → `components/common/AsyncContent` (renders shared loading/error+retry/empty states so pages only implement the success case).

**Server vs Client components**: Server Components are the default. `'use client'` is deliberately scoped to components that need interactivity/state: `Header` (menu state & scroll lock), the `Services` section (client-side `useFetch`), `SmartLink` (click/toast behavior), `Toast`, `ScrollManager` (hash-scroll), the `Contact` section (form state), and the `Portfolio`/`Careers` views (client-side `useFetch` + interactive buttons). When adding new UI, keep it a Server Component unless it genuinely needs state, effects, or browser APIs.

**Navigation vs content**: header/footer links are not part of the content data layer — they're typed constants in `src/utils/navigation.ts` alongside a `ROUTES` map. In-page links use absolute hashes (`/#about`); `useHashScroll` handles scrolling to the anchored section after navigation, which is what makes anchors work correctly from any page (not just `/`).

**Key reusable components** (`src/components/common`): `Badge` (one component for both job-type and project-technology tags via `size` prop), `ProjectCard` (single component covering all three portfolio bento layouts, selected by a `variant` field — `overlay`/`stacked`/`split` — in the data itself), `SmartLink` (decides between a real Next.js link and a "Coming Soon" toast per nav entry), `Button` (`primary`/`outline`/`accent` variants, `accent` being the mint outline used for "Apply Now").

**Toasts**: `react-toastify`, configured once in `components/common/Toast/Toast.tsx` (bottom-center, 2.4s auto-close, one at a time) and rendered from the root layout. `showComingSoonToast()` in `src/utils/toast.ts` uses a fixed `toastId` so repeated clicks refresh rather than stack — it backs the Privacy Policy link, "Apply Now", and "View Case Study".

**Contact form**: `hooks/useContactForm.ts` owns typed form state, client-side validation (required fields, email format, min message length), and accessible error messaging (`aria-invalid`/`aria-describedby`). Submission goes through `services/contactService.ts`, which POSTs to `NEXT_PUBLIC_CONTACT_API_URL` when set, otherwise resolves locally.

**Styling**: SCSS Modules per component (`*.module.scss`); shared design tokens in `src/styles/_variables.scss` (brand: Navy `#0B2A4A`, Mint `#2DD598`, White — surface shades for cards/panels/footer/badges are derived from navy). Responsive breakpoints are SCSS mixins (`up`/`down`) in `src/styles/_mixins.scss`, with four target ranges: desktop ≥1200px, laptop 992–1199px, tablet 768–991px, mobile <768px.

**Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).

**Lint note**: `@next/next/no-img-element` is intentionally disabled — plain `<img>` is used to preserve exact layout. `@typescript-eslint/no-explicit-any` is an error; unused vars are errors except when prefixed with `_`.
