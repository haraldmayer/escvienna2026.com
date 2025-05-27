// call with:
// node tools/translate/skip-nodes.js
// after updating KEYS_TO_REMOVE and EXCLUDED_FILES

const fs = require('fs');
const path = require('path');

// Keys to be removed from each JSON file (supports nested keys like 'home.subkey')
const KEYS_TO_REMOVE = ['history'];

// Directory to process
const DIRECTORY_PATH = path.join(__dirname, './../../src/i18n');

// Files to exclude from processing
const EXCLUDED_FILES = ['de.json', 'en.json', 'it.json']; // <--- Update this list as needed

// Helper: remove all keys that match or start with a target key
function removeKeysFromFlatJson(flatObj, keysToRemove) {
  const cleaned = {};
  for (const key in flatObj) {
    const shouldRemove = keysToRemove.some(removeKey =>
      key === removeKey || key.startsWith(removeKey + '.')
    );
    if (!shouldRemove) {
      cleaned[key] = flatObj[key];
    }
  }
  return cleaned;
}

// Main function
function cleanJsonFiles() {
  fs.readdir(DIRECTORY_PATH, (err, files) => {
    if (err) {
      console.error('❌ Failed to read directory:', err);
      return;
    }

    files
      .filter(file => file.endsWith('.json') && !EXCLUDED_FILES.includes(file))
      .forEach(file => {
        const filePath = path.join(DIRECTORY_PATH, file);
        fs.readFile(filePath, 'utf8', (readErr, data) => {
          if (readErr) {
            console.error(`❌ Failed to read file ${file}:`, readErr);
            return;
          }

          try {
            const json = JSON.parse(data);
            const cleaned = removeKeysFromFlatJson(json, KEYS_TO_REMOVE);

            fs.writeFile(filePath, JSON.stringify(cleaned, null, 2), 'utf8', writeErr => {
              if (writeErr) {
                console.error(`❌ Failed to write file ${file}:`, writeErr);
              } else {
                console.log(`✅ Cleaned ${file}`);
              }
            });
          } catch (parseErr) {
            console.error(`❌ Failed to parse JSON in ${file}:`, parseErr);
          }
        });
      });
  });
}

cleanJsonFiles();
