# Project Overview

Multi-language website for Eurovision Song Contest 2026 in Vienna, Austria.

**Target audience:** Eurovision fans, media, potential attendees  
**Primary goal:** Provide up-to-date information about ESC 2026
**Monetization:** Affiliate marketing (links to ticket platform, booking platform, merchandise) and CPM (Google Adsense)

## Tech Stack

- **Framework:** Astro (static site generation)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions (auto-deploy on commits to `main` branch)
- **Languages:** German (default), with multi-language support
- **Translation:** Custom Node.js script (`tools/translate/translate-json.js`)

## Architecture & File Structure

```text
src/
├── pages/          # Astro page routes
├── components/     # Reusable components
└── i18n/           # Language files (de.json, en.json, etc.)
    └── de.json     # German (source language)
```

**Routing conventions:**

- Default language: German (`/de` served at `/`)
- Language-specific routes use language code prefix (e.g., `/en`, `/fr`)

## Development Setup

```bash
npm install
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Common Tasks

### Adding News Entries

1. **Locate latest entry:** Open `src/i18n/de.json` and find the most recent `news.YYYY-MM-DD` key
2. **Create new entry:** Add a new key with today's date in format `news.YYYY-MM-DD`
3. **Write summary:**
   - Search for recent ESC 2026 news and create an entry based on current developments
   - Maximum 250 words
   - Cover relevant events since the last entry
   - Be concise and factual
   - **Important:** Paraphrase web sources completely to avoid plagiarism - rewrite in your own words
4. **Translate:** Run translation script:

```bash
   node tools/translate/translate-json.js src/i18n/de.json --skip-existing
```
   This auto-translates the new German entry to other languages

### Translation Workflow

- **Source of truth:** `de.json` (German)
- **Workflow:** Always edit German first, then run translation script
- `--skip-existing` flag: Only translates new/missing keys, preserves existing translations

## Content Guidelines

- **News entries:** Focus on official ESC 2026 announcements, artist reveals, venue updates, ticket sales
- **Tone:** Informative and neutral
- **Date format:** YYYY-MM-DD (ISO 8601)

## Deployment

- **Trigger:** Automatic on push to `main`
- **Process:** GitHub Actions workflow builds and deploys to GitHub Pages
- **URL:** [Add your actual GitHub Pages URL here]

## Important Notes

- German is the source language - always update `de.json` first before translating
- The homepage automatically redirects or serves `/de` content
- Translation script requires Node.js to be installed
