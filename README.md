# TOMEX Landing Page

Production-ready TOMEX site — built from the reference designs with React, TypeScript, Vite,
SCSS Modules, Tailwind CSS and Material UI icons. Content is served by **json-server** from
`src/data/db.json`.

## Tech stack

| Concern    | Choice                                         |
| ---------- | ---------------------------------------------- |
| Framework  | React 18 + TypeScript (strict)                 |
| Build tool | Vite 5                                         |
| Routing    | `react-router-dom`                             |
| Data       | `json-server` (REST API over `db.json`)        |
| Styling    | SCSS Modules (component styles) + Tailwind CSS |
| Icons      | Material UI (`@mui/icons-material`)            |
| Toasts     | `react-toastify`                               |
| Quality    | ESLint + Prettier                              |

Component-specific styling lives entirely in `*.module.scss` files. Tailwind is available for
utility-level layout tweaks, and Material UI is used for iconography only — no CSS-in-JS.

## Getting started

The app reads its content from the API, so **run both processes**:

```bash
npm install
npm run dev:all
```

`dev:all` starts json-server on `http://localhost:3001` and Vite on `http://localhost:5173`.
To run them separately, use `npm run server` and `npm run dev` in two terminals.

## Scripts

| Script              | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev:all`   | Start the API and the dev server together |
| `npm run dev`       | Start the Vite dev server only            |
| `npm run server`    | Start json-server on port 3001            |
| `npm run build`     | Type-check and build for production       |
| `npm run preview`   | Preview the production build              |
| `npm run lint`      | Run ESLint                                |
| `npm run format`    | Format `src` with Prettier                |
| `npm run typecheck` | Run TypeScript without emitting output    |

## Pages

| Route        | Page      | Content source                         |
| ------------ | --------- | -------------------------------------- |
| `/`          | Home      | `hero`, `about`, `services`, `contact` |
| `/portfolio` | Portfolio | `portfolio` + `projects`               |
| `/careers`   | Careers   | `careers` + `jobs`                     |

`Layout` renders the header, footer and toast container once for every route, so pages only
describe their own content. In-page links use absolute hashes (`/#about`) and `useHashScroll`
waits for the fetched section to mount before scrolling — so anchors work from any page.

## Project structure

```
src/
├── assets/            Static assets bundled by Vite (logo, fonts)
├── components/
│   ├── common/        AsyncContent, Badge, Button, JobCard, ProjectCard,
│   │                  SectionTitle, SmartLink, SocialLinks, Toast
│   └── layout/        Header, Footer, Layout
├── pages/             Home, Portfolio, Careers
├── sections/          Hero, About, Services, Contact (composed by Home)
├── hooks/             useFetch, useContactForm, useBodyScrollLock, useHashScroll
├── services/          apiClient, contentService, contactService
├── types/             Shared TypeScript interfaces
├── utils/             Icon registry, navigation links, toast helper, validation
├── data/db.json       All content, served by json-server
├── styles/            _variables, _mixins, _global, main
├── App.tsx            Routes
└── index.ts           Application entry point
```

Public imagery lives in `public/images/`, the favicon in `public/favicon/`.

## Data layer

Everything the pages render comes from the API, and the plumbing exists exactly once:

- **`services/apiClient.ts`** — the only place that calls `fetch`. Owns the base URL
  (`VITE_API_URL`), headers and the `ApiError` shape.
- **`services/contentService.ts`** — typed functions per page (`fetchHomeContent`,
  `fetchPortfolio`, `fetchCareers`, `fetchFooterContent`), fetching related resources in parallel.
- **`hooks/useFetch.ts`** — generic hook returning `{ data, status, error, retry }`. Aborts
  in-flight requests on unmount. Every page uses it; none implements request state itself.
- **`components/common/AsyncContent`** — renders the shared loading spinner, the error state with
  a retry button, and the empty state. Pages only describe their success case.

`db.json` top-level keys become REST endpoints: `/hero`, `/about`, `/services`, `/contact`,
`/footer`, `/portfolio`, `/careers`, `/projects`, `/jobs`.

## Reusable components

- **`Badge`** — one pill component serving both job types and project technology tags (`size` prop).
- **`ProjectCard`** — a single component covering all three portfolio bento shapes; the layout is
  selected by the `variant` field in the data (`overlay`, `stacked`, `split`) rather than by
  duplicating markup.
- **`SmartLink`** — decides between a router link and a "Soon" toast for each navigation entry, so
  header, mobile menu and footer share one behaviour.
- **`Button`** — `primary`, `outline` and `accent` (the mint outline used by "Apply Now").

Navigation is not content data: header and footer links live in `src/utils/navigation.ts` as typed
constants alongside the `ROUTES` map.

## Toasts

Notifications use **`react-toastify`**. The container is configured once in
`src/components/common/Toast/Toast.tsx` (bottom-center, 2.4s auto-close, one toast at a time) and
the brand pill appearance is applied through `Toast.module.scss` — the library's stylesheet is
imported once in `src/index.ts`, so no CSS-in-JS is involved.

`showComingSoonToast()` in `src/utils/toast.ts` uses a fixed `toastId`, so repeated clicks refresh
the existing toast instead of stacking duplicates. It backs the Privacy Policy link, "Apply Now"
and "View Case Study".

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

Submissions are handled by `src/services/contactService.ts`. Set `VITE_CONTACT_API_URL` in a
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
