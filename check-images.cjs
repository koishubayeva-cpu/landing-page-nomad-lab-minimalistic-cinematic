const fs = require('fs');
const path = require('path');

const appPath = path.join('src', 'App.jsx');
const imageDir = path.join('public', 'images');
const appSource = fs.readFileSync(appPath, 'utf8');
const imageRefs = [...appSource.matchAll(/src="\/images\/([^"]+)"/g)].map((match) => match[1]);
const files = fs.readdirSync(imageDir);
const fileSet = new Set(files);
const lowerCaseMap = new Map(files.map((file) => [file.toLowerCase(), file]));

let hasError = false;
for (const ref of imageRefs) {
  if (fileSet.has(ref)) continue;

  const caseMatch = lowerCaseMap.get(ref.toLowerCase());
  if (caseMatch) {
    console.error(`Case mismatch: referenced "${ref}" but file is "${caseMatch}"`);
  } else {
    console.error(`Missing image file: ${ref}`);
  }
  hasError = true;
}

if (hasError) process.exit(1);
console.log('All referenced public images exist with exact matching file names.');
