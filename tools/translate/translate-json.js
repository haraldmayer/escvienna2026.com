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

    let content = completion.choices[0].message.content;

    // Remove common markdown wrappers and prefixes
    content = content
      .replace(/^```json\s*/i, '')  // remove starting ```json
      .replace(/^```/, '')          // remove stray ```
      .replace(/```$/, '')          // remove ending ```
      .replace(/^Here's the translation.*?\n/, '');  // remove intro lines if present
    
    try {
      const parsed = JSON.parse(content.trim());
      Object.assign(translated, parsed);
    } catch (err) {
      console.error('⚠️ Failed to parse JSON response:', content);
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
let langs = argv._.slice(1).filter(arg => !arg.startsWith('--'));

if (!sourceFile) {
  console.error('❌ Usage: node translate-json.js source.json [lang1 lang2 ...] [--skip-existing]');
  process.exit(1);
}

// If no languages provided, detect all JSON files in the same directory
if (langs.length === 0) {
  const dir = path.dirname(sourceFile);
  const sourceBase = path.basename(sourceFile);
  const files = fs.readdirSync(dir);
  langs = files
  .filter(f => {
    const base = path.basename(f, '.json');
    return (
      f.endsWith('.json') &&
      f !== sourceBase &&
      /^[a-z]{2}$/.test(base)
    );
  })
  .map(f => path.basename(f, '.json'));

}

(async () => {
  for (const langCode of langs) {
    const targetLang = langCode;
    const dir = path.dirname(sourceFile);
    const targetFile = path.join(dir, `${langCode}.json`);

    console.log(`🔄 Translating ${sourceFile} → ${targetFile} (${targetLang})...`);
    await translateFile(sourceFile, targetFile, targetLang, argv['skip-existing']);
  }
})();
