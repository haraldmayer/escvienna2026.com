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
node tools/translate/translate-json.js src/i18n/de.json # entirely translates all existing language files but de.json
node tools/translate/translate-json.js src/i18n/de.json fr es en ja it tr pl --skip-existing # only translate new keys
node tools/translate/translate-json.js src/i18n/de.json --skip-existing # translates missing keys in all existing language files
```

#### removing nodes from translated files so that they are part of a re-run with --skip-existing:
- tools/translate/skip-nodes.js, add the nodes to skip
- node tools/translate/skip-nodes.js

#### Adding new languages

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
