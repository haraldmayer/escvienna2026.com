# [escvienna2026.com](https://escvienna2026.com)

- Header image downloaded from [Pixabay](https://pixabay.com/photos/vienna-city-hall-building-7971742/)

## Dev

The `gh-pages` branch contains only the `dist/` folder and is used for GitHub Pages.

```bash
# Start the server and serves project
# need to call language dir since the index.html is only created post build
# http://localhost:4321/de
npm run dev      
npm run build    # Generate the static site in /dist
npm run preview  # Starts server and serves /dist (e.g., http://localhost:4321)
npm run deploy   # Pushes the contents of /dist to the gh-pages branch; obsolete since done from ci (gh actions)
```

### Translate

```bash
node tools/translate/translate-json.js src/i18n/de.json fr es
node tools/translate/translate-json.js src/i18n/de.json fr es en ja it tr pl --skip-existing # only translate new keys
```

In src/pages/[lang]/index.astro:

- add additional languages at the top of file (add to imports, function getStaticPaths, const translations)
- in de.json, add keys for additional languages and re-generate other language files with --skip-existing

## Maintain content

- copy/paste template of index.astro and prompt:

```txt
- extend content of this page based on latest news on ESC 2026 (in german)
- print a flat json with new language keys to store all new content in key/value pairs
```

### daily news

- prompt:

```txt
extend this json with more latest ESC news, and continue the array "newsDates" with the correct keys:
  "news.2025-05-22": "Die Stadt Wien präsentiert ein erstes Konzept für den ESC 2026, das eine Bühne am Rathausplatz und ein umfassendes Nachhaltigkeitskonzept beinhaltet.",
  "news.2025-05-21": "Die Stadt Wels zieht ihre Bewerbung überraschend zurück. Als Grund werden logistische Herausforderungen genannt.",

const newsDates = [
  "2025-05-22",
  "2025-05-21",
];
```

- updates newsDates in index.astro and de.json accordingly

- run translations with:

```bash
node tools/translate/translate-json.js src/i18n/de.json el en es fr it ja nl pl sv tr --skip-existing
```

## TODO

### code and content

- add fanartikel affiliate link https://amzn.to/3Fn7dbd
- optimize CTAs for conversion
- add a "content regenerator" logic (rewrite the main content block based on current events)
- make sitemap dynamic
- add meta for tags, OpenGraph, SERP listing...
- Add no-cookie web analytics ✅
- add cloudflare ✅
  - enforce ssl ✅
  - set page rule to redirect /de* to / ✅
  - enable web analytics <https://dash.cloudflare.com/d838d7b16170f41e64a5b02035f81f5f/web-analytics/sites> ✅
- language tooling: allow re-translating individual keys only (also support hirarchy: eg only pass "parent node" and translate sub-nodes)
- add ci/cd which automatically sends "update news" prompt to openai, rewrites index.astro, commits + builds (or local "cron job" on mac)
- add additional languages ✅
  - da
  - ru
  - no
  - uk
- allow markup inside of language file ✅
- add gh action for automated building ✅
- add FAQ ✅
- add news section ✅


### other

- check in on affiliate applications (avin, cj...)

- Submit to Google index ✅

- regularly check <https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aescvienna2026.com&hl=de&last_24_hours=true&metrics=CLICKS%2CPOSITION>

- regularly check [text](https://dash.cloudflare.com/d838d7b16170f41e64a5b02035f81f5f/analytics)
- link building (eg reddits about ESC but also about chatGPT hacks)