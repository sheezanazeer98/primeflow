# PrimeFlow Plumbing — Website

Marketing site for **PrimeFlow Plumbing**, a licensed plumbing contractor serving **Northeastern Pennsylvania**. Single-page app with config-driven copy, service and location detail pages, blog (Decap CMS + markdown), and Netlify-friendly deployment.

**Production URL:** [www.primeflowplumbing.com](https://www.primeflowplumbing.com) (update if your domain differs).

## Tech stack

- **SPA** — Client-side routing; one `index.html` with `<template>` blocks per page
- **Tailwind CSS 3.4** — Navy / teal / emergency-red theme in `tailwind.config.js`
- **Vanilla JavaScript** — `js/config.js`, `js/components.js`, `js/app.js`
- **Decap CMS** — Blog and optional page stubs under `content/`
- **Netlify** — Forms, Identity, Git Gateway, `_redirects` SPA fallback

## Project structure

```
├── index.html                 # SPA shell + all page `<template>`s
├── js/
│   ├── config.js              # Company info, 23 services, 7 area pages, SEO
│   ├── components.js          # Header, footer, icons, emergency bar
│   └── app.js                 # Router, page init, blog rendering
├── css/
│   ├── input.css              # Tailwind + custom components
│   └── styles.css             # Generated (run build:css)
├── content/
│   ├── blog/*.md              # Blog posts (YAML front matter)
│   └── pages/                 # Optional CMS-managed snippets (home/about)
├── data/
│   └── posts.json             # Built from blog markdown (`npm run build:blog`)
├── images/
│   ├── favicon.svg            # Tab icon (SVG)
│   ├── logo.png               # Logo, PNG favicon fallback, apple-touch-icon
│   ├── hero-bg.jpg            # Home hero
│   ├── og-image.jpg           # Default OG / social preview
│   └── uploads/               # CMS media (e.g. blog featured images)
├── admin/
│   ├── index.html             # Decap CMS UI
│   └── config.yml             # Collections, fields
├── scripts/
│   ├── build-blog.js
│   ├── dev-server.js
│   └── dev-start.js
├── _redirects                 # Netlify SPA + blog post route
├── serve.json                 # Local static server SPA behavior
├── netlify.toml
├── tailwind.config.js
└── package.json
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | All services grid |
| `/services/:slug` | Service detail (23 plumbing services in `config.js`) |
| `/service-areas` | Coverage / map |
| `/service-areas/:slug` | City or area landing (7 entries in `config.js`) |
| `/contact` | Contact + Netlify form |
| `/testimonials` | Reviews |
| `/gallery` | Project gallery |
| `/faq` | FAQ |
| `/financing` | Financing |
| `/coupons` | Coupons |
| `/blog` | Blog index |
| `/blog/:slug` | Single post (markdown loaded client-side) |

## Quick start

**Requirements:** Node.js 18+, npm.

```bash
npm install
npm run dev
```

Dev server (see `scripts/dev-server.js`) with CSS watch — typically **http://localhost:3000**.

**Useful scripts**

| Command | Purpose |
|---------|---------|
| `npm run build` | `build:css` + `build:blog` |
| `npm run build:css` | Compile Tailwind to `css/styles.css` |
| `npm run build:blog` | Regenerate `data/posts.json` from `content/blog/*.md` |
| `npm run dev:css` | Watch Tailwind only |
| `npm run serve` | Static server only |
| `npm run cms` | Local Decap server (with Git Gateway in production) |

## How it works

### Router (`js/app.js`)

Internal links are intercepted; the matching `<template>` is cloned into `<main id="app">`, the page initializer runs, and `<title>` / meta / canonical update from route + `SITE_CONFIG`.

### Content (`js/config.js`)

Single source for business info, navigation, **services** (copy, FAQs, related links), **locations**, testimonials, SEO (`seo.siteUrl`, `seo.ogImage`), and social URLs. Header, footer, and dynamic sections read from here.

### Blog

1. Add or edit markdown in `content/blog/` or use `/admin/` (after Netlify Identity + Git Gateway).
2. Run `npm run build:blog` (or full `npm run build`) so `data/posts.json` stays in sync.
3. Posts use front matter; images often live under `images/uploads/`.

Example front matter:

```yaml
---
title: "Your Post Title"
date: 2026-04-06
slug: "your-post-slug"
description: "Short SEO / card excerpt"
image: "/images/og-image.jpg"
tags:
  - maintenance
  - residential
---

Body in **Markdown**.
```

### Contact form

Hidden Netlify form in `index.html` (`name="contact"`). Submissions appear in the Netlify dashboard; enable notifications under **Site settings → Forms**.

## Deployment (Netlify)

1. Connect the Git repo; use **`npm run build`** and publish the **repository root** (see `netlify.toml`).
2. **`_redirects`** serves `index.html` for unknown paths so `/blog/your-post` and other client routes work. Optional rules in `netlify.toml` apply in addition (e.g. blog slug handling if you add them).

**CMS after deploy:** Enable **Identity** (invite-only), then **Git Gateway**. Open `/admin/`, sign in, and edit collections defined in `admin/config.yml`.

## Branding and assets

- **Colors:** `tailwind.config.js` — `primary` (navy), `teal`, `emergency` (red).
- **Images:** Replace `images/hero-bg.jpg`, `images/logo.png`, `images/og-image.jpg` as needed. **`images/favicon.svg`** is the primary favicon; `logo.png` is used as PNG fallback and Apple touch icon.
- **Head metadata:** Default tags live in `index.html`; router updates per route.

## Performance notes

- No React/Vue — small JS footprint, code-split concerns handled by loading blog markdown and `marked` only on blog routes (see `app.js`).
- Tailwind is purged against `*.html` + `js/**/*.js`.
- Preload on home hero image; lazy-load patterns where used in templates.

## License

Template-style project: use and modify for your business as needed.
