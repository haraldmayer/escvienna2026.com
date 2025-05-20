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

copy/paste template of index.astro and prompt:

```txt
- extend content of this page based on latest news on ESC 2026 (in german)
- print a flat json with new language keys to store all new content in key/value pairs, and reference it from the template
<add template>
```

run translations with:

```bash
node tools/translate/translate-json.js src/i18n/de.json en fr es ja it tr pl --skip-existing
```

## TODO

### code and content

- add a "content regenerator" logic (rewrite the main content block based on current events)
- make sitemap dynamic
- Add no-cookie web analytics (probably requires cloudflare upfront)
- language tooling: allow re-translating individual keys only (also support hirarchy: eg only pass "parent node" and translate sub-nodes)
- add ci/cd which automatically sends "update news" prompt to openai, rewrites index.astro, commits + builds (or local "cron job" on mac)
- add additional languages ✅
- allow markup inside of language file ✅
- add gh action for automated building ✅
- add FAQ ✅
- add news section ✅


### other

- Submit to Google index ✅

- regularly check <https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aescvienna2026.com&hl=de&last_24_hours=true&metrics=CLICKS%2CPOSITION>
- link building (eg reddits about ESC but also about chatGPT hacks)

