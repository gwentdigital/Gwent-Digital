# Deployment Checklist

Everything below is what's left after the code itself: real accounts, real
credentials, real DNS. None of it can be done from inside this repo — it's
listed here so nothing gets forgotten.

## 1. Public website (static, Netlify)

1. Create a Netlify site from this repository (or drag-and-drop the folder).
2. Confirm `netlify.toml` at the repo root is picked up — it sets security
   headers and proxies `/api/*` to the admin backend.
3. In `netlify.toml`, replace `REPLACE-WITH-YOUR-ADMIN-SERVER-URL.example.com`
   with the real admin server URL from step 2 below.
4. Point your domain (e.g. `gwentdigital.co.uk`) at Netlify and enable HTTPS
   (Netlify issues a free Let's Encrypt certificate automatically once DNS
   is pointed at it — no action needed beyond adding the domain).
5. Run `python tools/smoke_check.py` locally before every deploy.

### Netlify Forms email notification (the "email notifications" gap)

The contact form already has `data-netlify="true"` as a fallback path, and
posts to the admin API first (`/api/public-enquiry`). To get an email when
someone submits via the Netlify fallback:

1. Netlify dashboard → your site → **Forms** → **Form notifications**.
2. **Add notification** → **Email notification**.
3. Set the recipient to `hello@gwentdigital.co.uk` and select the `contact`
   form.

This is free, requires no code, and is deliberately not duplicated with an
SMTP integration in `admin/server.py` — the admin panel is intentionally
zero-cost/zero-dependency (see `admin/README.md`, "Deliberately not built").
If you outgrow this later, revisit — don't add SMTP just to have it.

## 2. Admin backend (`admin/server.py`)

This is a stdlib-only Python server holding real lead data — it must not sit
on the open internet without a password and HTTPS.

1. Pick a host: a small VPS, Fly.io, Render, or similar. Anywhere that can
   run `python admin/server.py` and stay up.
2. Copy `admin/.env.example` to `admin/.env` on that host and set:
   - `ACCESS_PASSWORD` — required, the server refuses to start without it.
   - `PUBLIC_ORIGIN` — the exact public site origin, e.g.
     `https://gwentdigital.co.uk` (used for CORS on `/api/public-enquiry`).
   - `OPENAI_API_KEY` / `OPENAI_MODEL` — optional, only needed for the
     outreach-email drafting feature in the admin panel.
3. Put the admin server behind HTTPS. Either:
   - Terminate TLS with the host's own proxy (Fly/Render do this for you), or
   - Run Caddy or nginx + certbot in front of it on a VPS.
4. Take the resulting HTTPS URL and put it in `netlify.toml`'s `/api/*`
   redirect (step 3 above) so the public form can reach it same-origin.
5. Confirm `GET /api/health` responds once deployed, then confirm a real
   test submission from the live public site lands in the admin panel.

## 3. Backups

`GET /api/backup` (authenticated) downloads a SQLite snapshot. There is no
automatic schedule yet — set up a simple cron/scheduled task on the admin
host that hits this endpoint and stores the file outside the web root, and
periodically test restoring one.

## 4. Analytics (optional)

`assets/js/main.js` has a Google Tag Manager loader wired to the site's
existing `dataLayer` events (`gwent_*`), gated behind a cookie-consent
banner that only appears once analytics is actually configured. To turn it
on: open `assets/js/main.js`, set `GTM_ID` to your real GTM container ID
(e.g. `GTM-ABCD123`), and set up GA4 (or another tag) inside that GTM
container as usual. Leave it as the placeholder to keep analytics fully off.

## 5. Booking link (optional)

The contact section on `index.html` has a "Book a free 15-min call" link
pointing at a placeholder Calendly URL
(`https://calendly.com/gwent-digital/15min`). Replace it with your real
Calendly/Cal.com scheduling link before launch, or remove the block if you'd
rather keep enquiries to the form/WhatsApp/phone only.

## 6. Content still needed (not a deployment task, but blocks "done")

- Real client testimonials and a real Google Business Profile review link —
  do not fabricate these; add them once you have genuine ones.
- Real case-study evidence (before/after screenshots, actual speed scores,
  measurable results) for the work already delivered.
- Legal review of `service-agreement.html` and `terms.html` before relying
  on them commercially.
