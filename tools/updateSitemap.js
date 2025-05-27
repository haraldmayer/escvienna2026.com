const fs = require('fs');
const path = require('path');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
// Read the sitemap.xml file
fs.readFile(sitemapPath, 'utf8', (err, data) => {
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