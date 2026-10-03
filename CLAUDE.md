# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev:all    # Start json-server (port 3001) + Next.js dev server (port 3000) together — required: Home (Services), Portfolio and Careers all fetch from itnpm run dev         # Next.js dev server only
npm run server       # json-server only (data/db.json), port 3001
npm run build        # Production build
npm run start        # Start production server
npm run lint          # ESLint
npm run format         # Prettier --write src/**/*.{ts,tsx,scss,json}
npm run typecheck       # tsc --noEmit
```

There is no test suite configured in this repository.

Env vars (see `.env.example`):
- `API_URL` — json-server base URL for **server-side** fetches. Server-only (no `NEXT_PUBLIC_` prefix), read at runtime, never reaches the browser.
- `NEXT_PUBLIC_API_URL` — same API, for **client-side** fetches (Careers and Services still fetch in the browser). Inlined at build time.
- Resolution in `services/apiClient.ts`: `API_URL` → `NEXT_PUBLIC_API_URL` → `http://127.0.0.1:3001`. In the browser `API_URL` is `undefined`, so the same module works on both sides.
- `NEXT_PUBLIC_CONTACT_API_URL` (optional; contact form resolves locally when unset), `NEXT_PUBLIC_APP_NAME`.

Don't run `npm run build` while `npm run dev:all` is running — it overwrites the `.next` folder the dev server uses.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript + SCSS Modules. Material UI is used for icons only (`@mui/icons-material`) — no CSS-in-JS/MUI components for layout or styling.

**Routing & pages** (`src/app`): `/` (Home), `/portfolio`, `/careers`. Unknown routes render `not-found.tsx`, a standalone 404 page (own markup — "404" heading, message, "Go Back Home" link — imports `globals.scss` directly). Home is composed directly in `src/app/page.tsx` (Hero, About, Services, Contact from `src/sections`; there is no `views/Home`). Portfolio and Careers compose their pages in `src/views/{Portfolio,Careers}`, with `app/portfolio/page.tsx` and `app/careers/page.tsx` as thin route entries (`app/portfolio/page.tsx` also exports page `metadata`). `app/portfolio/loading.tsx` is the route's loading UI and `app/error.tsx` is a root-level client error boundary for unexpected render errors.

**Data flow** — two different content sources feed the same pipeline shape:
- Hero, About, Contact and the footer are static, hardcoded in their own components.
- The Home `Services` section, Portfolio and Careers content come from `json-server` over `data/db.json`. Each top-level key in `db.json` (`services`, `projects`, `jobs`) is its own REST endpoint; page headings for Portfolio/Careers are hardcoded in the views.
- Shared base of the pipeline: `services/apiClient.ts` (`getResource`; the only module that fetches the content API — owns base URL, headers, `cache: 'no-store'`, `ApiError` shape; used from both server and client code; `contactService.ts` separately POSTs the contact form) → `services/contentService.ts` (typed per-page fetchers: `fetchServices`, `fetchPortfolio`, `fetchCareers`).
- The pipeline then **differs per page**, because the migration to server-side fetching is in progress:
  - **Portfolio — server-fetched.** `views/Portfolio` is an async Server Component that awaits `fetchPortfolio()` and renders in the initial HTML. It catches fetch errors itself and renders the shared states from `components/common/AsyncContent/` (`ErrorState`, `EmptyState`) in place, so a failure never throws to an error boundary. While the request is pending, `app/portfolio/loading.tsx` renders `LoadingState`. `/portfolio` is dynamic (`ƒ`) because of the `no-store` fetch, so no `force-dynamic` export is used.
  - **Careers and Home `Services` — still client-fetched.** They are Client Components using `hooks/useFetch.ts` (generic `{ data, status, error, retry }` hook, aborts in-flight requests on unmount) → `AsyncContent/AsyncContent.tsx` (renders loading / error+retry / empty from a `status` value so the page only writes its success case). These routes prerender statically and fetch in the browser via `NEXT_PUBLIC_API_URL`.
- **Retry on server-fetched pages** is `AsyncContent/RetryButton.tsx` (client): `router.refresh()` inside `startTransition`, which re-runs the server fetch (a real new request). `error.tsx`'s `reset()` alone would not refetch, so `app/error.tsx` also calls `router.refresh()`.

**Server vs Client components**: Server Components are the default. `'use client'` is deliberately scoped to components that need interactivity/state: `Header` (menu state & scroll lock), `Toast` (the `ToastContainer`), `ScrollManager` (hash-scroll), the `Contact` section (form state), `ComingSoonButton` and `RetryButton` (click handlers), `app/error.tsx` (error boundaries must be client components), and — until they are migrated — the `Services` section and `Careers` view (client-side `useFetch`).

Server Components: `views/Portfolio` (async, fetches data), the Home page (`app/page.tsx`), `Hero`, `About`, `Footer`, `ProjectCard`, `Badge`, `Button`, `SectionTitle`, and the `AsyncContent` `LoadingState`/`ErrorState`/`EmptyState`. A Server Component cannot pass function props to a Client Component, so click handlers live inside small client leaves (`ComingSoonButton`) instead of being passed down as callbacks. `JobCard` still takes an `onApply` prop because its parent, `Careers`, is a Client Component. When adding new UI, keep it a Server Component unless it genuinely needs state, effects, or browser APIs.

**Known streaming caveat**: MUI icons render through Emotion. Inside a streamed region (a `loading.tsx` fallback resolving, or a `Suspense` boundary) Emotion's inline `<style>` tag causes a React hydration mismatch (error #418) unless `@mui/material-nextjs`'s `AppRouterCacheProvider` wraps the app, which this repo does not yet include. It reproduces on `/portfolio` when the API is slow enough for the loading state to show.

**Navigation vs content**: header/footer links are not part of the content data layer — they're typed constants in `src/utils/navigation.ts` (`HEADER_NAV_LINKS`, `FOOTER_NAV_LINKS`) alongside a `ROUTES` map; Header and Footer both render them via `SmartLink`. In-page links use absolute hashes (`/#about`); `useHashScroll` handles scrolling to the anchored section after navigation, which is what makes anchors work correctly from any page (not just `/`).

**Key reusable components** (`src/components/common`): `Badge` (one component for both job-type and project-technology tags via `size` prop), `ProjectCard` (single component covering all three portfolio bento layouts, selected by a `variant` field — `overlay`/`stacked`/`split` — in the data itself), `SmartLink` (renders a nav entry from `utils/navigation.ts` as a Next.js link; used by Header and Footer), `Button` (a standard `<button>` accepting native button props, with `primary`/`accent` variants — `accent` being the mint outline used for "Apply Now"; it never renders a link, use `next/link` for navigation), `ComingSoonButton` (client wrapper rendering a plain `<button>` that fires `showComingSoonToast`, so `ProjectCard` keeps its custom link styling).

**Toasts**: `react-toastify`, configured once in `components/common/Toast/Toast.tsx` (bottom-center, 3s auto-close, `limit={1}`) and rendered from the root layout. `showComingSoonToast()` in `src/utils/toast.ts` uses a fixed `toastId` so repeated clicks refresh rather than stack — it backs "Apply Now" (called by `Careers` via `JobCard`'s `onApply`) and "View Case Study" (via `ComingSoonButton` inside `ProjectCard`).

**Contact form**: `hooks/useContactForm.ts` owns typed form state (`handleChange` reads the input's `name` and ignores anything that is not a `ContactFormValues` key), client-side validation (required fields, email format, min message length), and accessible error messaging (`aria-invalid`/`aria-describedby`). Submission goes through `services/contactService.ts`, which POSTs to `NEXT_PUBLIC_CONTACT_API_URL` when set, otherwise resolves locally.

**Styling**: SCSS Modules per component (`*.module.scss`); shared design tokens in `src/styles/_variables.scss` (brand: Navy `#0B2A4A`, Mint `#2DD598`, White — surface shades for cards/panels/footer/badges are derived from navy). Responsive breakpoints are SCSS mixins (`up`/`down`) in `src/styles/_mixins.scss`, with four target ranges: desktop ≥1200px, laptop 992–1199px, tablet 768–991px, mobile <768px.

**Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).

**Lint note**: `@next/next/no-img-element` is intentionally disabled — plain `<img>` is used to preserve exact layout. `@typescript-eslint/no-explicit-any` is an error; unused vars are errors except when prefixed with `_`.
