const fs = require('fs');
const path = require('path');

const fromPath = path.resolve('dist/de/index.html');
const toPath = path.resolve('dist/index.html');

fs.copyFileSync(fromPath, toPath);
console.log('✅ Copied de/index.html → index.html as default root page');
