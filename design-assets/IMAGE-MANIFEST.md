# Gwent Digital — image manifest

Everything in this folder is code-drawn (SVG) and ready to use. This file lists the
**photographs and screenshots that must be supplied by hand** — no AI can produce these,
and stock photos would undercut the "we run real businesses ourselves" positioning.

Wire the HTML to these exact filenames now, with `surfaces/placeholder.svg` as the
fallback, so files can be dropped in later without touching markup.

## Conventions

| Thing | Rule |
|---|---|
| Format | `.webp` primary, `.jpg` fallback via `<picture>` |
| Naming | lowercase, hyphens, no spaces: `my-punjab-shopfront.webp` |
| Attributes | always set `width`, `height`, `loading="lazy"` (except the hero: `loading="eager"`, `fetchpriority="high"`) |
| Orientation | landscape unless stated |
| Shooting | daylight, phone is fine, wipe the lens, no flash, hold horizontal |

## Required

| Filename | Section | Size (px) | Ratio | What it must show | Alt text |
|---|---|---|---|---|---|
| `hero-newport.webp` | Hero | 1600×900 | 16:9 | A real Newport street or shopfront, ideally recognisable. Not a stock city skyline. | Independent shops on a Newport high street |
| `founders.webp` | About | 1200×900 | 4:3 | Both founders, plain background, looking at camera. | The two founders of Gwent Digital |
| `my-punjab-shopfront.webp` | Showcase card | 1200×800 | 3:2 | The restaurant front with signage legible. | My Punjab Desi Kitchen shopfront in Newport |
| `my-punjab-food.webp` | Showcase card | 1200×800 | 3:2 | One well-lit dish. Overhead or 45°. | A dish served at My Punjab Desi Kitchen |
| `fonetech-counter.webp` | Showcase card | 1200×800 | 3:2 | Shop counter or repair bench, tidy, no customers' faces. | The repair counter at Fonetech Solutions |
| `fonetech-labels.webp` | Showcase card | 1200×800 | 3:2 | Printed price labels on real stock. Proof of the system working. | Printed price labels on phone stock |
| `screen-gwentdigital.png` | Studio build | 1440×1800 | — | Full-page screenshot of gwentdigital.co.uk. Goes inside `frames/browser-frame.svg`. | The Gwent Digital website homepage |
| `screen-command-centre.png` | Studio build | 1440×1200 | — | The admin dashboard. **Blur or replace every real name, email and phone number before export.** | The internal operations dashboard |
| `screen-zoya.png` | Studio build | 760×1560 | — | Zoya in listening state. Goes inside `frames/phone-frame.svg`. | The Zoya voice assistant interface |

## Optional

| Filename | Section | Size (px) | What it shows |
|---|---|---|---|
| `azi-phones.webp` | Showcase card | 1200×800 | Azi Phones storefront or interior |
| `workspace.webp` | Process | 1200×800 | Desk, laptop, notebook — used behind the process section |
| `og-card.png` | Social preview | 1200×630 | Logo on navy with the tagline. Needed for link previews. |
| `favicon.svg` + `favicon-180.png` | `<head>` | 180×180 | The G mark only, no wordmark |

## Legal before publishing

- No customer's face, order, receipt or personal detail in any photo without written permission — UK GDPR applies to photographs of identifiable people.
- Screenshots of the command centre must have all real prospect data removed. A blurred region is not enough if the text is still recoverable; crop or overwrite it.
- Label showcase cards **"Group business"**, never "Client". None of these were paying external clients, and the ASA treats a misleading portfolio as a misleading advertisement.
- Any result you cannot evidence gets the literal text `[RESULT NEEDED]` until you have the number. Do not invent percentages.

## Shooting order — one session, about 40 minutes

1. Fonetech: counter, repair bench, printed labels on stock.
2. Walk to My Punjab: shopfront from across the road, then two dishes inside.
3. Newport high street: three or four wide shots for the hero.
4. Founders portrait — plain wall, window light to the side.
5. At home: the three screenshots, with data redacted first.
