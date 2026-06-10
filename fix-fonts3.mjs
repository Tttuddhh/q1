import fs from 'fs';

const finalFonts = JSON.parse(fs.readFileSync('/workspace/fonts-150-final.json', 'utf8'));
const allOriginal = JSON.parse(fs.readFileSync('/workspace/fonts-150.json', 'utf8'));
const results = JSON.parse(fs.readFileSync('/workspace/verify-results.json', 'utf8'));

const usedFamilies = new Set(finalFonts.map(f => f.family));
const passedNames = new Set(results.passed.map(f => f.name));

// 从原始列表中找还没用的、且通过验证的字体
for (const f of allOriginal) {
  if (finalFonts.length >= 150) break;
  if (usedFamilies.has(f.family)) continue;
  // 只添加通过验证的（或者是 Google Fonts）
  if (f.googleFontName || passedNames.has(f.name)) {
    usedFamilies.add(f.family);
    finalFonts.push(f);
  }
}

// 如果还不够，从原始列表中找任何还没用的
if (finalFonts.length < 150) {
  for (const f of allOriginal) {
    if (finalFonts.length >= 150) break;
    if (usedFamilies.has(f.family)) continue;
    usedFamilies.add(f.family);
    finalFonts.push(f);
  }
}

// 统计
const cats = {};
finalFonts.forEach(f => { cats[f.category] = (cats[f.category] || 0) + 1; });

console.log(`Final font count: ${finalFonts.length}`);
console.log('Categories:', cats);
console.log('Unique families:', new Set(finalFonts.map(f => f.family)).size);

fs.writeFileSync('/workspace/fonts-150-final.json', JSON.stringify(finalFonts, null, 2));
