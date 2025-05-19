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
npm run deploy   # Pushes the contents of /dist to the gh-pages branch
```

### Translate

```bash
node tools/translate/translate-json.js src/i18n/de.json fr es
node tools/translate/translate-json.js src/i18n/de.json fr es en ja --skip-existing # only translate new keys
```

In src/pages/[lang]/index.astro:

- add additional languages at the top of file (add to imports, function getStaticPaths, const translations)
- in de.json, add keys for additional languages and re-generate other language files with --skip-existing

## TODO

### code and content

- Add no-cookie web analytics
- add additional languages
- allow markup inside of language file
- add a "content regenerator" logic (rewrite the main content block based on current events)

### other

- Submit to Google index  
- link building (eg reddits about ESC but also about chatGPT hacks)

