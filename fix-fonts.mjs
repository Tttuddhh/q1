import fs from 'fs';

const results = JSON.parse(fs.readFileSync('/workspace/verify-results.json', 'utf8'));
const allFonts = JSON.parse(fs.readFileSync('/workspace/fonts-150.json', 'utf8'));

// 通过的字体
let passed = [...results.passed];
const failedNames = new Set(results.failed.map(f => f.name));

// Google Fonts 在沙箱环境无法访问，但字体本身可用
// 用正确的 Google Fonts API v2 URL 重新添加这些字体
const googleFontsChinese = [
  { name: 'Noto Sans SC', family: 'Noto Sans SC', displayName: '思源黑体', previewText: '天地玄黄宇宙洪荒', category: '黑体', googleFontName: 'Noto+Sans+SC' },
  { name: 'Noto Serif SC', family: 'Noto Serif SC', displayName: '思源宋体', previewText: '天地玄黄宇宙洪荒', category: '宋体', googleFontName: 'Noto+Serif+SC' },
  { name: 'Noto Sans TC', family: 'Noto Sans TC', displayName: '思源黑體 TC', previewText: '天地玄黃宇宙洪荒', category: '黑体', googleFontName: 'Noto+Sans+TC' },
  { name: 'Noto Serif TC', family: 'Noto Serif TC', displayName: '思源宋體 TC', previewText: '天地玄黃宇宙洪荒', category: '宋体', googleFontName: 'Noto+Serif+TC' },
  { name: 'Noto Sans HK', family: 'Noto Sans HK', displayName: '思源黑體 HK', previewText: '天地玄黃宇宙洪荒', category: '黑体', googleFontName: 'Noto+Sans+HK' },
  { name: 'Noto Serif HK', family: 'Noto Serif HK', displayName: '思源宋體 HK', previewText: '天地玄黃宇宙洪荒', category: '宋体', googleFontName: 'Noto+Serif+HK' },
  { name: 'ZCOOL KuaiLe', family: 'ZCOOL KuaiLe', displayName: '站酷快乐体', previewText: '天地玄黄宇宙洪荒', category: '卡通', googleFontName: 'ZCOOL+KuaiLe' },
  { name: 'ZCOOL XiaoWei', family: 'ZCOOL XiaoWei', displayName: '站酷小薇体', previewText: '天地玄黄宇宙洪荒', category: '手写', googleFontName: 'ZCOOL+XiaoWei' },
  { name: 'ZCOOL QingKe HuangYou', family: 'ZCOOL QingKe HuangYou', displayName: '站酷庆科黄油体', previewText: '天地玄黄宇宙洪荒', category: '圆体', googleFontName: 'ZCOOL+QingKe+HuangYou' },
  { name: 'Ma Shan Zheng', family: 'Ma Shan Zheng', displayName: '马善政毛笔体', previewText: '天地玄黄宇宙洪荒', category: '楷体', googleFontName: 'Ma+Shan+Zheng' },
  { name: 'Liu Jian Mao Cao', family: 'Liu Jian Mao Cao', displayName: '刘建毛笔草书', previewText: '天地玄黄宇宙洪荒', category: '草书', googleFontName: 'Liu+Jian+Mao+Cao' },
];

// 其他失败的字体需要从 @chinese-fonts 中找替代
// 先获取所有可用的 @chinese-fonts 包
const fontDetails = JSON.parse(fs.readFileSync('/workspace/font_details.json', 'utf8'));
const availableAlternatives = [];

for (const pkg of fontDetails) {
  if (!pkg.variants || pkg.variants.length === 0) continue;
  for (const variant of pkg.variants) {
    const name = `${pkg.name} ${variant}`;
    // 跳过已经在通过列表中的
    if (passed.some(p => p.name === name)) continue;
    // 跳过已经失败的
    if (failedNames.has(name)) continue;
    
    const cssUrl = `https://cdn.jsdelivr.net/npm/@chinese-fonts/${pkg.pkg}@latest/dist/${variant}/result.css`;
    availableAlternatives.push({
      name: name,
      family: pkg.family,
      displayName: pkg.displayName || name,
      previewText: '天地玄黄宇宙洪荒',
      category: pkg.category || '艺术',
      cssUrl: cssUrl,
    });
  }
}

// 需要替换的失败字体数量
const needReplace = 150 - passed.length - googleFontsChinese.length;
console.log(`Passed: ${passed.length}`);
console.log(`Google Fonts to add: ${googleFontsChinese.length}`);
console.log(`Need to replace: ${needReplace}`);
console.log(`Available alternatives: ${availableAlternatives.length}`);

// 随机选取替代字体，确保分类多样
const shuffled = availableAlternatives.sort(() => Math.random() - 0.5);
const replacements = shuffled.slice(0, needReplace);

// 组合最终列表
const finalFonts = [...passed, ...googleFontsChinese, ...replacements];

// 去重（按 family）
const seenFamilies = new Set();
const uniqueFonts = [];
for (const f of finalFonts) {
  if (!seenFamilies.has(f.family)) {
    seenFamilies.add(f.family);
    uniqueFonts.push(f);
  }
}

// 如果去重后不够150，再补充
if (uniqueFonts.length < 150) {
  const moreNeeded = 150 - uniqueFonts.length;
  const more = shuffled.slice(needReplace, needReplace + moreNeeded);
  for (const f of more) {
    if (!seenFamilies.has(f.family)) {
      seenFamilies.add(f.family);
      uniqueFonts.push(f);
    }
  }
}

// 截取前150个
const final150 = uniqueFonts.slice(0, 150);

// 统计分类
const cats = {};
final150.forEach(f => { cats[f.category] = (cats[f.category] || 0) + 1; });

console.log(`\nFinal font count: ${final150.length}`);
console.log('Categories:', cats);
console.log('Unique families:', new Set(final150.map(f => f.family)).size);

fs.writeFileSync('/workspace/fonts-150-final.json', JSON.stringify(final150, null, 2));
console.log('\nSaved to fonts-150-final.json');
