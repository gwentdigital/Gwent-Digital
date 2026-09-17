# GWENT DIGITAL — MASTER PROMPT (ZIP → GITHUB → VERCEL)

Copy everything below this line and paste it into Claude Code, opened in D:\GwentDigital (with the zip files in that folder).

---

Context: I run Gwent Digital, a web agency in Newport, Wales (brand: navy #1E2761, ice blue #CADCFC, gold #C9A24B). This folder contains zipped website projects. I am logged in to GitHub CLI (gh) and Vercel CLI. Deploy ALL of them and give me live links.

For EACH zip file in this folder, in one continuous run:

## 1. EXTRACT
- Unzip into its own folder, named from the business name inside (check index.html `<title>`, README, package.json). Kebab-case, e.g. ./my-punjab-restaurant/
- Delete junk: __MACOSX, .DS_Store, node_modules, .env files.

## 2. INSPECT & FIX (light QA only)
- Detect type: static HTML vs framework (React/Next/Vite).
- Static: ensure index.html is at folder root (move up if nested).
- Framework: verify `npm install && npm run build` succeeds.
- Fix ONLY blocking issues (broken paths, missing root index). No redesigns.
- SECURITY SCAN: find hardcoded API keys, passwords, tokens, or personal client data. Remove/replace with placeholders and list every removal in the final report. Do not deploy secrets.

## 3. README.md — create one per project using EXACTLY this template

```markdown
# [Business Name] — Website

Built and managed by **Gwent Digital** — web & automation studio, Newport, Wales.

## About This Project
[2-3 factual lines based on what the code actually shows: business type, what the site does, who it serves]

## Features
- 📱 Mobile-first responsive design
- ⚡ Fast static build
- [Only REAL features found in the code — booking forms, galleries, WhatsApp buttons, SEO tags. Do not invent features that aren't there.]

## Tech
[Actual stack: Static HTML/CSS/JS | React | Vite — whatever it really is]

## Live Site
🔗 [PLACEHOLDER — fill after Vercel deploy in step 5]

## Deployment
Hosted on Vercel. Auto-deploys from `main` branch.

---
© Gwent Digital · gwentdigital.co.uk · hello@gwentdigital.co.uk
Managed builds by Gwent Digital. All rights reserved.
```

## 4. GITHUB
- git init, add all, commit: "Initial import — Gwent Digital portfolio"
- Create PRIVATE repo: `gh repo create gwent-<folder-name> --private --source=. --push`

## 5. VERCEL
- From inside each project folder: `vercel --prod --yes`
- Capture the production URL.
- Update that project's README.md "Live Site" section with the real URL, commit ("Add live URL"), and push.

## 6. VERIFY
- curl each production URL: expect HTTP 200 and the site's real title in the HTML (not a Vercel error page).
- Spot-check that CSS/JS/assets aren't 404ing.

## 7. FINAL REPORT — one copy-paste table
| Project | GitHub repo | Live URL | Status | Secrets removed | Issues fixed |

Then, for each project, one ready-made line for my website's portfolio card: business name + type + "View live site" URL.

## RULES
- Do NOT ask me questions; decide sensibly and continue.
- PRIVATE repos only.
- If one project fails, log the reason and CONTINUE with the rest.
- Never invent features, clients, or results — READMEs must reflect only what the code actually contains.
