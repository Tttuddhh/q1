import fs from 'fs';

const results = JSON.parse(fs.readFileSync('/workspace/verify-results.json', 'utf8'));
const fontDetails = JSON.parse(fs.readFileSync('/workspace/font_details.json', 'utf8'));

// 1. 从验证结果中获取通过的字体
let passed = [...results.passed];
const failedNames = new Set(results.failed.map(f => f.name));
const passedFamilies = new Set(passed.map(f => f.family));

// 2. Google Fonts 中文字体（沙箱环境无法测试，但真实环境可用）
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
  { name: 'Long Cang', family: 'Long Cang', displayName: '龙苍手写体', previewText: '天地玄黄宇宙洪荒', category: '行书', googleFontName: 'Long+Cang' },
  { name: 'Zhi Mang Xing', family: 'Zhi Mang Xing', displayName: '志莽行书', previewText: '天地玄黄宇宙洪荒', category: '行书', googleFontName: 'Zhi+Mang+Xing' },
  { name: 'LXGW Marker Gothic', family: 'LXGW Marker Gothic', displayName: '霞鹜铭心体', previewText: '天地玄黄宇宙洪荒', category: '黑体', googleFontName: 'LXGW+Marker+Gothic' },
  { name: 'LXGW WenKai TC', family: 'LXGW WenKai TC', displayName: '霞鹜文楷繁体', previewText: '天地玄黃宇宙洪荒', category: '楷体', googleFontName: 'LXGW+WenKai+TC' },
];

// 3. 从 font_details.json 获取所有可用变体
const allVariants = [];
for (const pkg of fontDetails) {
  if (!pkg.variants || pkg.variants.length === 0 || pkg.error) continue;
  for (const variant of pkg.variants) {
    const cssUrl = `https://cdn.jsdelivr.net/npm/@chinese-fonts/${pkg.pkg}@latest/dist/${variant}/result.css`;
    allVariants.push({
      name: `${pkg.name} ${variant}`,
      family: pkg.family,
      displayName: pkg.displayName || `${pkg.name} ${variant}`,
      previewText: '天地玄黄宇宙洪荒',
      category: pkg.category || '艺术',
      cssUrl: cssUrl,
    });
  }
}

// 4. 构建最终列表
const finalFonts = [];
const usedFamilies = new Set();

// 先添加通过的字体
for (const f of passed) {
  if (!usedFamilies.has(f.family)) {
    usedFamilies.add(f.family);
    finalFonts.push(f);
  }
}

// 添加 Google Fonts
for (const f of googleFontsChinese) {
  if (!usedFamilies.has(f.family)) {
    usedFamilies.add(f.family);
    finalFonts.push(f);
  }
}

// 从 allVariants 补充，优先选择不同分类的
const categoryCount = {};
finalFonts.forEach(f => { categoryCount[f.category] = (categoryCount[f.category] || 0) + 1; });

// 按分类多样性排序 allVariants
allVariants.sort((a, b) => {
  const countA = categoryCount[a.category] || 0;
  const countB = categoryCount[b.category] || 0;
  return countA - countB;
});

for (const f of allVariants) {
  if (finalFonts.length >= 150) break;
  if (usedFamilies.has(f.family)) continue;
  // 检查是否已经在通过列表中
  if (passedFamilies.has(f.family)) continue;
  
  usedFamilies.add(f.family);
  finalFonts.push(f);
  categoryCount[f.category] = (categoryCount[f.category] || 0) + 1;
}

// 如果还不够150，继续补充
if (finalFonts.length < 150) {
  for (const f of allVariants) {
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
console.log('\nSaved to fonts-150-final.json');
