# TOMEX Landing Page

Production-ready TOMEX site built with **Next.js (App Router)**, React, TypeScript, SCSS Modules
and Material UI icons. The Home Services and Team sections and the Portfolio and Careers pages read their
content from the local `data/data.json`; Hero, About, Contact and the footer are static.

## Tech stack

| Concern    | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript |
| Routing    | Next.js App Router (`src/app`)                  |
| Data       | Local `data/data.json` (imported server-side)   |
| Styling    | SCSS Modules (component styles)                 |
| Icons      | Material UI (`@mui/icons-material`)             |
| Toasts     | `react-toastify`                                |
| Quality    | ESLint + Prettier                               |

Component-specific styling lives entirely in `*.module.scss` files, with the design tokens in
`src/styles/_variables.scss`. Material UI is used for iconography only — no CSS-in-JS.

## Getting started

```bash
npm install
npm run dev
```

The site runs on `http://localhost:3000`; no separate content API is needed.

## Scripts

| Script              | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the Next.js dev server              |
| `npm run start`     | Start the production server               |
| `npm run build`     | Production build                          |
| `npm run lint`      | Run ESLint                                |
| `npm run format`    | Format `src` with Prettier                |
| `npm run typecheck` | Run TypeScript without emitting output    |

## Pages

| Route        | Page      | Content source                         |
| ------------ | --------- | -------------------------------------- |
| `/`          | Home      | static, except Services/Team (`services`, `team`) |
| `/portfolio` | Portfolio | `projects`                             |
| `/careers`   | Careers   | `jobs`                                 |

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
├── hooks/              useContactForm, useBodyScrollLock, useHashScroll
├── services/           contentService, contactService
├── types/              Shared TypeScript interfaces
├── utils/              Icon registry, navigation links, toast helper, validation
├── styles/             _variables, _mixins, _global, main
└── (public/ at repo root)   Imagery, favicon
```

## Client vs Server components

Server Components are the default. The `'use client'` boundary is limited to components that
genuinely need it: `Header` (menu state & scroll lock), `Toast`, `ScrollManager`, and the `Contact` section
(form state). Content-driven views and sections read their data on the server.

## Data layer

- **`data/data.json`** — the single source of site content (`services`, `projects`, `jobs`, `team`).
- **`services/contentService.ts`** — imports `data.json` and exposes typed getters per resource
  (`fetchServices`, `fetchPortfolio`, `fetchCareers`, `fetchJob`, `fetchTeam`). Used from Server
  Components only.
- **`components/common/AsyncContent`** — the shared loading spinner and empty state.

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