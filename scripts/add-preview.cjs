const fs = require('fs');

const content = fs.readFileSync('/workspace/src/data/fonts.ts', 'utf8');

const chinesePreview = '天地玄黄';
const englishPreview = 'AaBbCc';
const otherPreviews = {
  'M PLUS Rounded 1c': 'こんにちは',
  'Kosugi Maru': 'こんにちは',
  'Sawarabi Mincho': 'こんにちは',
  'Sawarabi Gothic': 'こんにちは',
  'Noto Sans JP': 'こんにちは',
  'Noto Serif JP': 'こんにちは',
  'Noto Sans KR': '안녕하세요',
  'Noto Serif KR': '안녕하세요',
  'Noto Sans Thai': 'สวัสดี',
  'Noto Sans Arabic': 'مرحبا',
  'Noto Sans Hebrew': 'שלום',
  'Noto Sans Devanagari': 'नमस्ते',
};

let result = content.replace(
  /export interface FontData \{[\s\S]*?\}/,
  `export interface FontData {
  name: string;
  family: string;
  googleFontName: string;
  category: 'chinese' | 'english' | 'other';
  tags: string[];
  preview: string;
}`
);

result = result.replace(
  /(category: 'chinese',\n    tags: \[[^\]]*\],)(\n  \},)/g,
  `$1\n    preview: '${chinesePreview}',$2`
);

result = result.replace(
  /(category: 'english',\n    tags: \[[^\]]*\],)(\n  \},)/g,
  `$1\n    preview: '${englishPreview}',$2`
);

result = result.replace(
  /(category: 'other',\n    tags: \[[^\]]*\],)(\n  \},)/g,
  (match, p1, p2) => {
    const nameMatch = match.match(/name: '([^']+)',/);
    const name = nameMatch ? nameMatch[1] : '';
    const preview = otherPreviews[name] || 'Hello';
    return `${p1}\n    preview: '${preview}',${p2}`;
  }
);

result = result.replace(
  /(category: 'chinese' as const,\n  tags: \['chinese'\],)(\n\};)/,
  `$1\n  preview: '${chinesePreview}',$2`
);

fs.writeFileSync('/workspace/src/data/fonts.ts', result);
console.log('Done');
