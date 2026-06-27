# Vona AI

A multilingual, themeable chatbot web app built on Next.js 16 (App Router) with `next-intl`, Tailwind CSS v4, and Framer Motion. The project ships a marketing landing page, a simulated chat dashboard, and a full settings area for model, account, statistics, and appearance preferences.

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack dev server, server + client components)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4 (`@theme inline` design tokens in `app/globals.css`), `lucide-react` icons
- **Animation**: `framer-motion`
- **i18n**: `next-intl` with English and Indonesian locales (`messages/en.json`, `messages/id.json`)
- **State**: A small `useSyncExternalStore`-based settings store backed by `localStorage` (`lib/settings/`)

## Project structure

```
app/
  layout.tsx                       # Root layout, fonts, theme bootstrap script
  globals.css                      # Theme tokens (light/dark), Tailwind v4 theme
  [lang]/
    layout.tsx                     # Locale provider, settings applier
    (marketing)/
      layout.tsx                   # Marketing chrome (navbar + footer)
      page.tsx                     # Landing page (hero, features, how-it-works, etc.)
      login/page.tsx               # Login form
    dashboard/
      layout.tsx                   # App shell with sticky header
      page.tsx                     # Chat experience
    settings/
      layout.tsx                   # Settings wrapper
      page.tsx                     # Redirects to /settings/model
      model/account/appearance/statistics/page.tsx
components/
  navbar.tsx                       # Marketing navbar (sticky, glass)
  footer.tsx                       # Marketing footer
  theme-toggle.tsx                 # Light / dark / system theme switcher
  language-switcher.tsx            # English / Indonesian switcher
  settings-applier.tsx             # Applies stored settings to <html> data-* attrs
  animated-section.tsx             # Scroll-triggered section animations
  auth/login-form.tsx              # Login UI
  chat/                            # Chat sidebar, input, bubbles, empty state
  landing/                         # Hero, features, how-it-works, testimonials, CTA
  settings/                        # Settings tabs, nav, shell, charts, controls
lib/
  i18n/                            # next-intl routing, request, navigation helpers
  settings/                        # Settings types, defaults, store, accent palettes
messages/
  en.json, id.json                 # Translation source of truth
```

## Getting started

### Prerequisites

- Node.js 20.9 or newer (required by Next.js 16)
- One of: `npm`, `yarn`, `pnpm`, or `bun`

### Install

```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

### Run the dev server

```bash
npm run dev
# or
pnpm dev / yarn dev / bun dev
```

The app boots on <http://localhost:3000>. Because the locale prefix is `as-needed`, the default English root is `/`, and Indonesian lives under `/id`.

### Build for production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Marketing landing page (hero, features, how it works, testimonials, CTA) |
| `/login` | Login form with social options |
| `/dashboard` | Chat experience with sidebar, conversation list, message bubbles |
| `/settings` | Redirects to `/settings/model` |
| `/settings/model` | AI model selection and parameters |
| `/settings/account` | Profile, email, password, 2FA, danger zone |
| `/settings/appearance` | Theme, accent color, font size, chat style, code theme, send behavior |
| `/settings/statistics` | Token usage, model breakdown, daily activity charts |

## Settings store

`lib/settings/store.ts` exposes a `useSettings()` hook (via `useSyncExternalStore`) that reads from and persists to `localStorage` under the key `vona-settings-v1`. The store hydrates safely on the server with a server snapshot, so SSR does not flash stale data.

The `SettingsApplier` component watches the store and reflects changes on `<html data-theme="..." data-font-size="..." data-chat-style="..." data-code-theme="..." data-send-behavior="...">`, while accent colors are applied via CSS custom properties on `document.documentElement`.

## Theming

- Light and dark themes are defined as CSS variables in `app/globals.css` under `[data-theme="light"]` and `[data-theme="dark"]`.
- Tailwind v4 exposes those tokens via the `@theme inline` block, so utility classes like `bg-background`, `text-foreground`, `bg-card`, `border-border`, and `bg-glass-bg` map directly.
- Accent palettes (indigo, blue, purple, green, rose, orange) live in `lib/settings/accent.ts` and override `--primary`, `--gradient-end`, etc. at runtime.

## Internationalization

- Locales are configured in `lib/i18n/routing.ts` (`en`, `id`, prefix `as-needed`).
- Pathname translations for `login`, `dashboard`, and the four settings tabs are declared there.
- Add a new locale by appending to `routing.locales`, creating `messages/<locale>.json` with the same key shape as the English file, and registering the locale in the language switcher.

## Notes for contributors

- **Read `node_modules/next/dist/docs/` before writing Next.js code.** This repo uses Next.js 16 and the conventions differ from earlier versions; the bundled docs are authoritative.
- Keep components focused. The `chat/` group holds chat-specific UI, `landing/` holds marketing sections, `settings/` holds the settings tabs and shell.
- New copy must be added to both `messages/en.json` and `messages/id.json`. Run the dev server to validate translation keys load correctly.
- The chatbot responses in `components/chat/chat-main.tsx` are simulated client-side; wire a real backend in the `handleSend` callback when ready.

## License

Private project. All rights reserved by Vornexa.