# SRM Placement Strategistgit remote add origin https://github.com/YOUR-USERNAME/cutoffx.git

**Turn placement uncertainty into a strategy.**

A Vercel-ready React/Vite MVP for exploring community-reported placement patterns, anonymous interview experiences, and a deterministic personal placement strategy.

> This is an independent student project, not an official SRM placement portal. Community data may be incomplete, inaccurate, or unverified and does not guarantee eligibility or placement.

## Features
- Dashboard with live Supabase counts and demo fallback
- Search/filter/sort company explorer
- Company detail pages with difficulty distribution and reports
- Anonymous placement experience detail pages
- Rule-based strategist using CGPA, skills, internship status and offer status
- Anonymous report submission
- Responsive startup-style UI
- Loading, empty, validation and error states

## Tech stack
React + Vite + JavaScript + Tailwind CSS + Lucide React + Supabase PostgreSQL. No custom backend is required.

## Architecture
```text
React/Vite
    ↓
Supabase JS Client
    ↓
Supabase PostgreSQL
    ↓
Persistent placement reports
```

## Database
Run `supabase.sql` in the Supabase SQL Editor. It creates `companies` and `placement_reports`, foreign keys, RLS, public read policies and anonymous insert policy, plus clearly labelled fictional demo data.

## Environment
Copy `.env.example` to `.env` and add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never commit `.env` or credentials.

## Local setup
```bash
npm install
npm run dev
```
Then open the Vite URL.

## Build
```bash
npm run build
```

## Vercel
Import the GitHub repository into Vercel, use the default Vite build settings (`npm run build` / `dist`), and add the two `VITE_SUPABASE_*` environment variables in Vercel project settings.

## Strategist rules
- CGPA >= reported minimum: **Likely within reported range** / Strong Match
- Within 0.5 below minimum: **Stretch target**
- More than 0.5 below minimum: **Currently below reported range**
- Missing DSA → prioritize DSA
- Missing SQL or DBMS → strengthen SQL/DBMS
- No internship → build 1–2 strong projects or pursue an internship
- Core CS and interview preparation are always recommended

The strategy is intentionally deterministic and explainable; it is guidance based on available community reports, not guaranteed placement advice.

## Future improvements
Moderation workflow, report verification badges, branch/role filters, richer analytics, duplicate detection, and authenticated student accounts after the core MVP is stable.
