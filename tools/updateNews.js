/* 
- reads  ./../../src/components/News.astro and assign to newsTemplate
- sets const 'date' to the value passed as --date (if blank: use today), expecting date format YYYY-MM-DD
- adds it to the array 'newsDates' in newsTemplate
- concatenates const prompt with const date and send it to openAI
- adds (or overwrites if exists) a key news.<date> to ./../../src/ to i18n/de.json, using the openAI response as value
- translates it to all languages currently supported via tranlate-json with --skip-existing
*/
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();
const minimist = require('minimist');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const prompt = `
I'm building a website providing relevant information on ESC (Eurovision Song Contest) 2026;
I'm covering events since ESC 2025, focussing on topics like the location, date etc of the next event.
Provide brief and consice news update in german, using plain text (no formatting). 
`;

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Read the sitemap.xml file
fs.readFile('./../../public/Sitemap.xml', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading sitemap:', err);
    return;
  }

  // Replace all <lastmod>...</lastmod> with today's date
  const updatedXml = data.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

  // Write back to the same file or to a new one
  fs.writeFile(sitemapPath, updatedXml, 'utf8', (err) => {
    if (err) {
      console.error('Error writing updated sitemap:', err);
    } else {
      console.log(`Sitemap updated with today's date (${today}).`);
    }
  });
});

// -----------------------------
// CLI Setup
// -----------------------------
const argv = minimist(process.argv.slice(2), {
  boolean: ['date'],
  alias: { d: 'date' },
});
const date = argv._[0];