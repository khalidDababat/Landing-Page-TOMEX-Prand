# TOMEX Landing Page

Production-ready TOMEX site built with **Next.js (App Router)**, React, TypeScript, SCSS Modules
and Material UI icons. The Home Services section and the Portfolio and Careers pages are served by **json-server**
from `data/db.json`; Hero, About, Contact and the footer are static.

## Tech stack

| Concern    | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript |
| Routing    | Next.js App Router (`src/app`)                  |
| Data       | `json-server` (REST API over `db.json`)         |
| Styling    | SCSS Modules (component styles)                 |
| Icons      | Material UI (`@mui/icons-material`)             |
| Toasts     | `react-toastify`                                |
| Quality    | ESLint + Prettier                               |

Component-specific styling lives entirely in `*.module.scss` files, with the design tokens in
`src/styles/_variables.scss`. Material UI is used for iconography only — no CSS-in-JS.

## Getting started

The Home (Services), Portfolio and Careers pages read from the API, so run **both processes**:

```bash
npm install
npm run dev:all
```

`dev:all` starts json-server on `http://localhost:3001` and Next.js on `http://localhost:3000`.
To run them separately, use `npm run server` and `npm run dev` in two terminals.

## Scripts

| Script              | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev:all`   | Start the API and the dev server together |
| `npm run dev`       | Start the Next.js dev server only         |
| `npm run start`     | Start the production server               |
| `npm run server`    | Start json-server on port 3001            |
| `npm run build`     | Production build                          |
| `npm run lint`      | Run ESLint                                |
| `npm run format`    | Format `src` with Prettier                |
| `npm run typecheck` | Run TypeScript without emitting output    |

## Pages

| Route        | Page      | Content source                         |
| ------------ | --------- | -------------------------------------- |
| `/`          | Home      | static, except Services (`services` API) |
| `/portfolio` | Portfolio | `projects` (API)                       |
| `/careers`   | Careers   | `jobs` (API)                           |

Unknown routes render a standalone 404 page (`src/app/not-found.tsx`). In-page links use absolute hashes (`/#about`); `useHashScroll` scrolls to
the anchored section after navigation, so anchors work from any page.

## Project structure

```
src/
├── app/                App Router routes and root layout (metadata, fonts, global styles)
├── components/
│   ├── common/         AsyncContent, Badge, Button, JobCard, ProjectCard,
│   │                   SectionTitle, SmartLink, SocialLinks, Toast
│   └── layout/         Header, Footer, ScrollManager (hash-scroll behaviour)
├── views/              Home, Portfolio, Careers (page implementations)
├── sections/           Hero, About, Services, Contact (composed by Home)
├── hooks/              useFetch, useContactForm, useBodyScrollLock, useHashScroll
├── services/           apiClient, contentService, contactService
├── types/              Shared TypeScript interfaces
├── utils/              Icon registry, navigation links, toast helper, validation
├── styles/             _variables, _mixins, _global, main
└── (public/ at repo root)   Imagery, favicon
```

## Client vs Server components

Server Components are the default. The `'use client'` boundary is limited to components that
genuinely need it: `Header` (menu state & scroll lock), `Toast`, `ScrollManager`, the `Services` section and the
`Portfolio`/`Careers` views (client-side `useFetch`), and the `Contact` section (form state).

## Data layer

- **`services/apiClient.ts`** — the only place that calls `fetch`. Owns the base URL
  (`NEXT_PUBLIC_API_URL`), headers and the `ApiError` shape.
- **`services/contentService.ts`** — typed fetchers per resource (`fetchServices`,
  `fetchPortfolio`, `fetchCareers`).
- **`hooks/useFetch.ts`** — generic hook returning `{ data, status, error, retry }`. Aborts
  in-flight requests on unmount. Pages use it instead of implementing request state themselves.
- **`components/common/AsyncContent`** — renders the shared loading spinner, the error state with
  a retry button, and the empty state. Pages only describe their success case.

`db.json` top-level keys become REST endpoints: `/services`, `/projects` and `/jobs`.

## Reusable components

- **`Badge`** — one pill component serving both job types and project technology tags (`size` prop).
- **`ProjectCard`** — a single component covering all three portfolio bento shapes; the layout is
  selected by the `variant` field in the data (`overlay`, `stacked`, `split`).
- **`SmartLink`** — renders a navigation entry as a Next.js link, so header, mobile menu and footer
  share one behaviour.
- **`Button`** — `primary`, `outline` and `accent` (the mint outline used by "Apply Now").

Navigation is not content data: header and footer links (`HEADER_NAV_LINKS`, `FOOTER_NAV_LINKS`) live in `src/utils/navigation.ts` as typed
constants alongside the `ROUTES` map.

## Toasts

Notifications use **react-toastify**. The `<ToastContainer />` is configured once in
`src/components/common/Toast/Toast.tsx` (bottom-center, 3s auto-close, one toast at a time) and
rendered from the root layout.

`showComingSoonToast()` in `src/utils/toast.ts` uses a fixed `toastId`, so repeated clicks refresh
the existing toast instead of stacking duplicates. It backs "Apply Now" and "View Case Study".

## Brand tokens

Defined in `src/styles/_variables.scss`:

- Primary Navy `#0B2A4A`
- Mint Green `#2DD598`
- White `#FFFFFF`

Surface shades (page, cards, raised panels, footer, badges) are derived from the brand navy.

## Contact form

`src/hooks/useContactForm.ts` manages typed form state with client-side validation (required
fields, email format, minimum message length) and accessible error messaging via
`aria-invalid` / `aria-describedby`.

Submissions are handled by `src/services/contactService.ts`. Set `NEXT_PUBLIC_CONTACT_API_URL` in a
`.env` file (see `.env.example`) to POST submissions to a real endpoint; when unset, the form
resolves locally.

## Responsive behaviour

Breakpoints are defined as SCSS mixins (`up` / `down`) in `src/styles/_mixins.scss`:

| Range             | Layout                                                                   |
| ----------------- | ------------------------------------------------------------------------ |
| Desktop ≥ 1200px  | Two-column hero, three-column cards, portfolio bento grid                |
| Laptop 992–1199px | Same structure, reduced type scale; portfolio cards go full width        |
| Tablet 768–991px  | Hero stacks, cards become two columns, contact panel stacks              |
| Mobile < 768px    | Single column, mobile menu, portfolio overlay card falls back to stacked |