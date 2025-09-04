.# Basic openAI powered tool for translating language files (json)

in .env, add OPENAI_API_KEY=

## Example Usage

```bash
node tools/translate/translate-json.js src/i18n/de.json
node tools/translate/translate-json.js src/i18n/de.json --skip-existing
node tools/translate/translate-json.js src/i18n/de.json en fr es ja
node tools/translate/translate-json.js src/i18n/de.json en fr es ja --skip-existing # for adding new keys only
```

remove node (to prepare for re-translation of individual nodes):

- update skip-nodes.js EXCLUDED_FILES (if needed)
- update skip-nodes.js KEYS_TO_REMOVE

```bash
node tools/translate/skip-nodes.js 
```

## Instructions

- Fine-tune the prompt in `prompt-template.txt`
- Add more languages in `const langMap`

## Language handling

- check cloudflare -> rules -> overview: there are rules that redirect /de and /de/ to root (why 2? regex not available on free plan, and wildcard matching doesn't work in this case)
