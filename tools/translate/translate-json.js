const fs = require('fs');
const path = require('path');
const promptTemplatePath = path.join(__dirname, 'prompt-template.txt');
const promptTemplate = fs.readFileSync(promptTemplatePath, 'utf-8');
const { OpenAI } = require('openai');
require('dotenv').config();
const minimist = require('minimist');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function flattenJSON(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const val = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null) {
      flattenJSON(val, newKey, result);
    } else {
      result[newKey] = val;
    }
  }
  return result;
}

function unflattenJSON(flatObj) {
  const result = {};
  for (const key in flatObj) {
    const keys = key.split('.');
    keys.reduce((acc, cur, idx) => {
      if (idx === keys.length - 1) {
        acc[cur] = flatObj[key];
      } else {
        acc[cur] = acc[cur] || {};
      }
      return acc[cur];
    }, result);
  }
  return result;
}

async function translateValues(flatValues, targetLang = 'French') {
  const translated = {};
  const entries = Object.entries(flatValues);
  const chunkSize = 40;

  for (let i = 0; i < entries.length; i += chunkSize) {
    const chunk = entries.slice(i, i + chunkSize);
    const textBlock = chunk
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n');

    const prompt = promptTemplate
      .replace('{textBlock}', textBlock)
      .replace('{targetLang}', targetLang);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const lines = completion.choices[0].message.content.split('\n');
    for (const line of lines) {
      const match = line.match(/^- (.+?):\s*(.+)$/);
      if (match) {
        translated[match[1].trim()] = match[2].trim();
      }
    }
  }

  return translated;
}

async function translateFile(sourceFile, targetFile, targetLang, skipExisting = false) {
  const raw = fs.readFileSync(sourceFile, 'utf-8');
  const originalJson = JSON.parse(raw);
  const flatOriginal = flattenJSON(originalJson);
  const orderedKeys = Object.keys(flatOriginal);

  let existingFlat = {};
  let toTranslate = flatOriginal;

  if (skipExisting && fs.existsSync(targetFile)) {
    const existingRaw = fs.readFileSync(targetFile, 'utf-8');
    const existingJson = JSON.parse(existingRaw);
    existingFlat = flattenJSON(existingJson);

    toTranslate = Object.fromEntries(
      Object.entries(flatOriginal).filter(([k]) => !existingFlat.hasOwnProperty(k))
    );
  }

  const translatedFlat = await translateValues(toTranslate, targetLang);

  // Merge: existing + translated, preserving original key order
  const finalFlat = {};
  for (const key of orderedKeys) {
    finalFlat[key] = translatedFlat[key] || existingFlat[key] || flatOriginal[key];
  }

  fs.writeFileSync(targetFile, JSON.stringify(finalFlat, null, 2), 'utf-8');
  console.log(`✅ Saved: ${targetFile}`);
}

// -----------------------------
// CLI Setup
// -----------------------------
const argv = minimist(process.argv.slice(2), {
  boolean: ['skip-existing'],
  alias: { s: 'skip-existing' },
});

const sourceFile = argv._[0];
const langs = argv._.slice(1).filter(arg => !arg.startsWith('--'));

if (!sourceFile || langs.length === 0) {
  console.error('❌ Usage: node translate-json.js source.json lang1 lang2 [--skip-existing]');
  process.exit(1);
}

const langMap = {
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
  jp: 'Japanese',
  ko: 'Korean',
  tw: 'Chinese (Taiwan)',
  nl: 'Dutch',
  pl: 'Polish',
};

(async () => {
  for (const langCode of langs) {
    const targetLang = langMap[langCode] || langCode;
    const dir = path.dirname(sourceFile);
    const targetFile = path.join(dir, `${langCode}.json`);

    console.log(`🔄 Translating ${sourceFile} → ${targetFile} (${targetLang})...`);
    await translateFile(sourceFile, targetFile, targetLang, argv['skip-existing']);
  }
})();
