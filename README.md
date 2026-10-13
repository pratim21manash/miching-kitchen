# Assamese Miching Kitchen: website

React + Vite + TypeScript, Tailwind CSS v4, React Three Fiber + Drei, GSAP ScrollTrigger, Framer Motion, React Router, Zustand.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview
```

## What to fill in before launch (nothing is invented)

Everything unverified is `null` and shown as "to be confirmed", never as fact.

| File | What to set |
| --- | --- |
| `src/data/site.ts` | street address, postal code, phone, WhatsApp (digits with country code), email, opening hours, production domain, Google Maps link, coordinates, tax % (only if verified) |
| `src/data/menu.ts` | The listed dishes are **candidates** from general Assamese cuisine. Set real `price`, `vegetarian`, `allergens`, `serving`, `available`, `confirmed: true` per dish, and add/remove dishes |
| `src/data/images.ts` | Image registry. Each slot with `src: null` shows an illustrated "Photo to be added" poster |
| `src/pages/Story.tsx` | `ownerStory` (origin, people, philosophy) with the owner's own words |
| `public/sitemap.xml`, `public/robots.txt` | Replace `YOUR-DOMAIN` |

Setting `phone`, `whatsapp`, `email`, `openingHours`, `streetAddress`, `latitude`/`longitude` also feeds the Restaurant JSON-LD automatically. Fields left `null` are omitted from structured data.

## Images

- The Assamese thali photo is hotlinked from Wikimedia Commons ("Assamese vegetarian thali.jpg"). **Verify the licence and author on its Commons page and update the `credit` string before launch.** The credit is shown in the footer and lightbox.
- For production, download licensed photos (or commission your own), compress to WebP/AVIF (about 1600px wide max), place them in `public/images/`, and set `src: '/images/name.webp'`.
- If an image fails to load, an illustrated poster is shown instead of a broken image.

## Ordering and enquiries

No payment gateway or backend is connected, so the site never claims an order or booking is confirmed.

- Cart: hands off to WhatsApp if `site.whatsapp` is set, otherwise offers "Copy Order Enquiry".
- Table enquiry: opens WhatsApp or email if configured, otherwise the form is disabled with a clear note.
- To add real checkout later, connect a backend from a server-side function; never put secret keys in frontend code.

## 3D

`FoodScene3D.tsx` is a stylised procedural thali (plate, bowls, rice, papad) with clickable hotspots. It is labelled as an illustration. Three.js is lazy-loaded only when the section nears the viewport, skipped when Data Saver is on (user taps "Start 3D View"), and replaced by the photo poster if WebGL is unavailable or errors. To use a real model, add an optimised GLB and load it with Drei's `useGLTF`.

## Deploy

Static site: run `npm run build` and upload `dist/` to Netlify, Vercel, Cloudflare Pages or any static host. Add an SPA fallback so deep links work:

- Netlify: `/* /index.html 200` in `public/_redirects`
- Vercel: a rewrite of all paths to `/index.html`
- Cloudflare Pages: SPA mode is the default

After deployment, set `site.domain`, update the sitemap, and submit it in Google Search Console. Claim and verify the Google Business Profile for local search.

## Accessibility notes

Skip link, keyboard-operable dialogs with focus trap and focus return, `prefers-reduced-motion` support (GSAP reveals, floating, cursor effect and page fades are disabled), tab-based category filters, text alternatives for the 3D scene (component list), and visible focus rings.
