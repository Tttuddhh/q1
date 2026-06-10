import fs from 'fs';

let content = fs.readFileSync('/workspace/src/data/fonts.ts', 'utf8');

// 找到 FONTS 数组的开始和结束
const startMarker = 'export const FONTS: FontData[] = [';
const endMarker = '];';
const startIdx = content.indexOf(startMarker) + startMarker.length;
let endIdx = content.lastIndexOf(endMarker);

// 提取数组内容
let arrayContent = content.substring(startIdx, endIdx);

// 解析每个字体对象
const fontRegex = /\{\s*name:\s*'([^']+)'[\s\S]*?\},?/g;
const fonts = [];
let match;
while ((match = fontRegex.exec(arrayContent)) !== null) {
  fonts.push({
    fullText: match[0],
    name: match[1],
  });
}

// 去重，保留第一个
const seen = new Set();
const uniqueFonts = [];
for (const f of fonts) {
  if (!seen.has(f.name)) {
    seen.add(f.name);
    uniqueFonts.push(f.fullText);
  }
}

console.log(`Original: ${fonts.length}, Unique: ${uniqueFonts.length}`);

// 如果不够150，需要补充
if (uniqueFonts.length < 150) {
  console.log(`Need ${150 - uniqueFonts.length} more fonts`);
}

// 重建数组内容
const newArrayContent = '\n  ' + uniqueFonts.join('\n  ') + '\n';

// 替换回去
const newContent = content.substring(0, startIdx) + newArrayContent + content.substring(endIdx);

fs.writeFileSync('/workspace/src/data/fonts.ts', newContent);
console.log('Done!');
