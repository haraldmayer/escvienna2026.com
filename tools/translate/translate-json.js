const fs = require('fs');
const path = require('path');
const promptTemplatePath = path.join(__dirname, 'prompt-template.txt');
const promptTemplate = fs.readFileSync(promptTemplatePath, 'utf-8');
const { OpenAI } = require('openai');
require('dotenv').config();

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

async function translateFile(sourceFile, targetFile, targetLang) {
  const raw = fs.readFileSync(sourceFile, 'utf-8');
  const originalJson = JSON.parse(raw);
  const flat = flattenJSON(originalJson);

  const translatedFlat = await translateValues(flat, targetLang);

  // Write the flat translated JSON directly, no unflattening
  fs.writeFileSync(targetFile, JSON.stringify(translatedFlat, null, 2), 'utf-8');
  console.log(`✅ Saved: ${targetFile}`);
}


const [, , sourceFile = 'src/i18n/en.json', ...langs] = process.argv;

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
  // Add more mappings if needed
};

(async () => {
  for (const langCode of langs) {
    const targetLang = langMap[langCode] || langCode;

    // derive output filename from input filename + lang code
    const dir = path.dirname(sourceFile);
    const base = path.basename(sourceFile, '.json'); // e.g. 'de' if 'de.json'

    const targetFile = path.join(dir, `${langCode}.json`);

    console.log(`🔄 Translating ${sourceFile} to ${targetFile} (${targetLang})...`);

    await translateFile(sourceFile, targetFile, targetLang);
  }
})();
