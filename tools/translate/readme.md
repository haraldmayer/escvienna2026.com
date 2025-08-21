.# Basic openAI powered tool for translating language files (json)

in .env, add OPENAI_API_KEY=

## Example Usage

```bash
node tools/translate/translate-json.js src/i18n/de.json
node tools/translate/translate-json.js src/i18n/de.json --skip-existing
node tools/translate/translate-json.js src/i18n/de.json en fr es ja
node tools/translate/translate-json.js src/i18n/de.json en fr es ja --skip-existing # for adding new keys only
```

remove node (in this example: "summary"):
Use find/replace with this regex:

```bash
"summary"\s*:\s*"((?:[^"\\]|\\.|[\r\n])*)"\s*,?
```

## Instructions

- Fine-tune the prompt in `prompt-template.txt`
- Add more languages in `const langMap`
