# TODO

## code and content

- complete retranslate-json and updatenews 
- learn more about affiliate programs and their localization (eg amazon)
- localize wikipedia links (eg move to shared, for every language)
- improve code by declaring language array only once; generate automatically:
  - LanguageSwitcher
  - LanguageMeta
  - i18n files + shared.json
  - sitemap.xml
  - utils/i18n.js
- add fanartikel affiliate link https://amzn.to/3Fn7dbd ✅
- localize affiliate links
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
  - runs tools/updateNews.js
  - runs add / commit / push
  - npm run deploy-from-ci
- add additional languages ✅
  - da
  - ru
  - no
  - uk
- allow markup inside of language file ✅
- add gh action for automated building ✅
- add FAQ ✅
- add news section ✅

## other

- check in on affiliate applications (avin, cj...)

- Submit to Google index ✅

- regularly check <https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aescvienna2026.com&hl=de&last_24_hours=true&metrics=CLICKS%2CPOSITION>

- regularly check [text](https://dash.cloudflare.com/d838d7b16170f41e64a5b02035f81f5f/analytics)
- link building (eg reddits about ESC but also about chatGPT hacks)
