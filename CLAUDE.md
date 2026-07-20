# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Angular 19 (standalone components, no NgModules) single-page app that renders an internal
operations manual — "Manual Hidráulico" — for a farm's water intake/treatment/distribution
system ("Finca Sausalito"). All UI copy and content is in Spanish. The app itself is a thin
shell: actual manual content is Markdown fetched over HTTP at runtime, not hardcoded in
components.

## Commands

- Install dependencies: `npm install`
- Dev server: `npm start` (alias for `ng serve`) — serves at `http://localhost:4200` with live reload
- Production build: `npm run build` — outputs to `dist/manual-hidraulico-ng`
- Dev build with watch (no server): `npm run watch`
- Run all tests: `npm test` (alias for `ng test`) — Karma + Jasmine, launches Chrome
- Run a single spec file: `ng test --include=src/app/app.component.spec.ts`

There is no lint script or ESLint config in this project.

## Architecture

### Content lives outside the component tree

Manual content is not written in Angular templates. Each "page" is a Markdown file under
`public/content/<section>/<page>.md`, fetched at runtime and rendered by a single generic
component:

- `src/app/manual-page/manual-page.component.ts` reads `file`/`title` off the active route's
  `data`, builds the path `content/<file>`, sets the document title, and renders it with
  `<markdown mermaid [src]="filePath()">` (from `ngx-markdown`).
- `src/app/app.routes.ts` maps each URL to a markdown file + title via route `data`. All manual
  routes are children of `ManualShellComponent` (topbar + collapsible sidenav); `HomeComponent`
  is the only route outside the shell.
- Markdown supports GFM tables/blockquotes and fenced ` ```mermaid ` code blocks for diagrams.
  Mermaid is loaded as a global script (see `scripts` in `angular.json`) and enabled per-render
  via the `mermaid` attribute on `<markdown>`.
- Images go in `public/img/<section>/`, downloadable files (PDFs, videos) in
  `public/files/<section>/`, referenced from markdown with root-relative paths
  (e.g. `/img/captacion/foo.jpg`). `public/content/anexos/planos-fotos-videos.md` documents
  these conventions in-app and is the reference to check for the exact copy-paste snippets.
- `public/assets/` is for global/shared branding resources used by the app shell itself (logo,
  app icons) — not manual content. Reference from component templates/CSS with a root-relative
  path (e.g. `/assets/logo.svg`). Keep it separate from `public/img/`/`public/files/`, which are
  strictly per-section manual content.

### Adding a manual page requires 3 files to stay in sync

1. Create `public/content/<section>/<page>.md`.
2. Add a route in `src/app/app.routes.ts` (as a child of `ManualShellComponent`) with
   `data: { file: '<section>/<page>.md', title: '<Title>' }`.
3. Add a link in `src/app/shared/manual-nav.data.ts` — `MANUAL_NAV` (sidebar, grouped by
   category) and, if it's a top-level process stage, `PROCESS_STAGES` (home page cards) too.

`manual-nav.data.ts` is the single source of truth for navigation structure; it is independent
of `app.routes.ts` and nothing enforces the two stay consistent, so check both when adding,
renaming, or removing a page.

### Static single-user auth (client-side only, no backend)

There's no backend or database, so the whole app sits behind a single hardcoded
username/password gate. This is **not real security** — the credentials ship inside the
compiled JS bundle and are trivially visible to anyone who opens dev tools — it only exists to
keep casual visitors out.

- `src/app/auth/auth.service.ts` — `AuthService` hardcodes the one valid username/password pair
  and exposes `isAuthenticated` as a signal backed by `localStorage`
  (key `manual-hidraulico-auth`), so a login survives full page reloads and browser restarts
  until `logout()` runs.
- `src/app/auth/auth.guard.ts` — `authGuard` (`CanActivateFn`) is applied to both the
  `HomeComponent` route and the `ManualShellComponent` route in `app.routes.ts`. Since guards on
  a parent route run for all of its children too, this one guard protects every manual page.
  An unauthenticated visit redirects to `/login?returnUrl=<original path>`.
- `src/app/auth/login.component.ts` — the public `/login` route. On success it navigates to
  `returnUrl` (falling back to `/`); if the user is already authenticated it immediately
  redirects away from `/login`.
- Logout is exposed from two places, because `HomeComponent` lives outside `ManualShellComponent`:
  the shell's topbar (`manual-shell.component.html`) and a small link in the home hero
  (`home.component.html`). Both just call `AuthService.logout()` then navigate to `/login`.

### Styling

- All theming is plain CSS custom properties defined once in `src/styles.css` (`:root`), with a
  `prefers-color-scheme: dark` override block. No Angular Material, no Tailwind.
- Fonts (Fraunces for display/headings, IBM Plex Sans for body, IBM Plex Mono for
  labels/table headers) are loaded from Google Fonts in `src/index.html`.
- Styling for *rendered markdown content* (headings, tables, blockquotes, code, `.mermaid`
  containers) lives entirely in `src/styles.css` under the `.manual-page markdown ...`
  selectors — component-level `.css` files only style app chrome (shell, nav, cards), never
  rendered markdown.

### App shell

- `app.config.ts` wires up: router (with scroll position restoration + anchor scrolling),
  `HttpClient`, and `provideMarkdown({ loader: HttpClient })`.
- This is a pure client-side SPA (browser build only — no SSR/server builder configured in
  `angular.json`).
