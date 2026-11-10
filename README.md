# Creedtech website

The marketing site for Creedtech: products, services, company pages and a
contact form. Built with Next.js 16 (App Router, Cache Components), TypeScript,
Tailwind CSS v4 and shadcn/ui. Every page is statically prerendered, and there
is no database.

## Quick start

Requirements: Node.js 20.9+ and pnpm 10.

```bash
pnpm install
cp .env.example .env.local   # optional for local development
pnpm dev                     # http://localhost:3000
```

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Development server with hot reload              |
| `pnpm build`        | Production build (must pass before deploying)   |
| `pnpm start`        | Serve the production build locally              |
| `pnpm lint`         | ESLint (Next.js + TypeScript rules)             |
| `pnpm typecheck`    | Generate route types, then run `tsc --noEmit`   |
| `pnpm format`       | Format everything with Prettier                 |
| `pnpm format:check` | Check formatting without writing (useful in CI) |

## Environment variables

Set these in `.env.local` for local development and in **Vercel → Project →
Settings → Environment Variables** for production.

| Variable               | Required         | Purpose                                                                                                                                                                                        |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended      | Public URL, no trailing slash, e.g. `https://creedtech.com`. Used for canonical URLs, the sitemap, Open Graph images and JSON-LD. On Vercel it defaults to the project's production domain.    |
| `RESEND_API_KEY`       | Yes (production) | [Resend](https://resend.com/api-keys) API key for the contact form.                                                                                                                            |
| `CONTACT_TO_EMAIL`     | Yes (production) | Inbox that receives contact form submissions.                                                                                                                                                  |
| `CONTACT_FROM_EMAIL`   | Recommended      | Sender, e.g. `Creedtech Website <website@creedtech.com>`. Must be on a domain verified in Resend. Defaults to Resend's test sender, which can only deliver to your own Resend account address. |

**Contact form behaviour without email configured:** in development,
submissions are validated and printed to the terminal, and the visitor sees
the success message. In production, the visitor is asked to email you directly
instead, and the server logs an error, so messages are never silently lost.

## Project structure

```
content/                 All site content as typed data (edit these)
  products.ts            Products and product categories
  services.ts            Services, engagement models, FAQ
  team.ts                Team members and groups
  jobs.ts                Open roles
  testimonials.ts        Testimonials
  about.ts               Story, mission, vision, values, timeline
  careers.ts             Culture points, hiring steps
  company.ts             How we work, industries, stats
  site.ts                Name, URL, emails, social links, navigation
  types.ts               Types for everything above
src/app/                 Routes (one folder per page)
  contact/               Contact page, form, Server Action, Zod schema
  products/[slug]/       Product page + per-product Open Graph image
src/components/          UI, grouped by area (home, layout, products, ui…)
src/lib/                 Helpers: metadata, JSON-LD, theme, OG renderer
```

## Editing content

Content lives in `/content`. You don't need to touch components to add or
change anything below; TypeScript will flag missing or misspelled fields.

### Add a product

1. Open `content/products.ts` and copy an existing entry in `products`.
2. Give it a unique, URL-friendly `slug` (this becomes `/products/<slug>`).
3. Fill in every field:
   - `category`: one of `edutech`, `health`, `crm`, `productivity`
     (add a new category to `productCategories` first if needed).
   - `status`: `live`, `beta` or `coming-soon` (controls the badge).
   - `ctaLabel` / `ctaHref`: e.g. `"Request demo"` +
     `"/contact?interest=product-demo&product=<slug>"`, or
     `"Visit product"` + a full `https://…` URL (opens in a new tab).
   - `accentColor`: any CSS colour; `oklch(…)` works best.
   - `screenshots`: add images under `public/products/<slug>/` and list them
     with `src`, `alt`, `width` and `height`. Leave `[]` to show placeholders.
   - `disclaimer` (optional): shown prominently on the product page.
4. Save. The card, filter, detail page, sitemap entry, Open Graph image and
   JSON-LD are generated automatically.

Links like `/contact?interest=product-demo&product=<slug>` pre-select the
enquiry type and pre-fill the message on the contact form.

### Add a team member

1. Open `content/team.ts` and add an entry to `team`.
2. Set `group` to `leadership`, `engineering`, `design` or `operations`.
3. Optional: add a square photo (at least 400×400) to `public/team/` and set
   `photo: "/team/<file>.jpg"`. Without a photo, an initials avatar is shown.
4. Optional: add `links` (`linkedin`, `github`, `x`). Only links you provide
   are shown.

### Add or remove a job

Edit `content/jobs.ts`. Each job needs a `slug`, `title`, `department`,
`location`, `type`, `summary` and an `applyHref` (a `mailto:` link or an
application form URL). Set `export const jobs: Job[] = []` when nothing is
open; the careers page then shows an empty state with a speculative
application link.

### Other content

- Testimonials: `content/testimonials.ts` (the section hides itself when the
  list is empty).
- Contact email, social links, company name, domain: `content/site.ts`.
- Legal pages: `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`.

## Brand and design

- **Colours:** brand tokens are at the top of `src/app/globals.css`
  (`--brand-navy`, `--brand-indigo`, `--brand-indigo-soft`, `--brand-accent`,
  `--brand-accent-ink`). Light and dark palettes derive from them; change
  those five values to rebrand. The dark palette is defined twice (once for
  the theme toggle, once as a no-JavaScript fallback), so keep both blocks
  in sync if you edit it.
- **Logo:** the placeholder mark lives in `src/components/brand/logo.tsx`,
  `src/app/icon.svg`, `src/app/apple-icon.tsx` and `src/lib/og.tsx`.
- **Fonts:** Geist (body), Mona Sans (headings), Geist Mono (small labels),
  configured in `src/app/layout.tsx`. Only the weights in use are declared;
  add a weight there if you start using a new one.
- **Theme:** light/dark follows the visitor's system setting, with a toggle in
  the header and a System/Light/Dark switch in the footer. An inline script
  applies it before first paint (no flash), so pages stay static.

## Conventions worth knowing

- **Server Components by default.** Client Components are limited to the
  header navigation, theme controls, product filter and contact form.
- **Don't import `cn` in Client Components.** The `cn` class-merging helper
  ships a ~10 KB engine to the browser. Client code uses `cx` from
  `src/lib/cx.ts`; Server Components can use `cn` freely.
- **Animation:** scroll reveals are pure CSS (`reveal` utility). Motion
  (Framer Motion) is only used for the product filter's layout animation and
  loads lazily. Both respect `prefers-reduced-motion`.
- **Don't enable `experimental.inlineCss`.** With this setup it embeds the
  stylesheet three times and more than doubles the HTML size.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The
   framework (Next.js) and package manager (pnpm, from `pnpm-lock.yaml`) are
   detected automatically; no build settings need changing.
3. Add the environment variables above for the **Production** environment
   (and **Preview** if you want the contact form to work on preview URLs).
4. Deploy. Every push to the main branch then deploys to production, and
   every pull request gets its own preview URL.
5. Add your domain under **Settings → Domains**. If you set
   `NEXT_PUBLIC_SITE_URL`, make sure it matches, and redeploy after changing
   it. If you leave it unset, the site uses Vercel's production domain (your
   custom domain once added, otherwise `*.vercel.app`).
6. In Resend, verify your sending domain and set `CONTACT_FROM_EMAIL` to an
   address on it.

After the first deploy, run [PageSpeed Insights](https://pagespeed.web.dev/)
against the production URL, and submit `https://<your-domain>/sitemap.xml` in
Google Search Console.
