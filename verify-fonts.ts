import { FONTS } from './src/data/fonts';

const names = FONTS.map(f => f.name);
const nameSet = new Set(names);
const categories = FONTS.map(f => f.category);
const categorySet = new Set(categories);

let ok = true;

// 1. 总数在80-100之间
const total = FONTS.length;
console.log(`字体总数: ${total}`);
if (total < 80 || total > 100) {
  console.error(`❌ 总数 ${total} 不在 80-100 范围内`);
  ok = false;
} else {
  console.log('✅ 总数在 80-100 范围内');
}

// 2. 无重复 name
if (names.length !== nameSet.size) {
  const duplicates = names.filter((item, index) => names.indexOf(item) !== index);
  console.error(`❌ 存在重复 name: ${[...new Set(duplicates)].join(', ')}`);
  ok = false;
} else {
  console.log('✅ 无重复 name');
}

// 3. 每个字体都有 googleFontName 或 cssUrl
const missingSource = FONTS.filter(f => !f.googleFontName && !f.cssUrl);
if (missingSource.length > 0) {
  console.error(`❌ 以下字体缺少 googleFontName 和 cssUrl: ${missingSource.map(f => f.name).join(', ')}`);
  ok = false;
} else {
  console.log('✅ 每个字体都有 googleFontName 或 cssUrl');
}

// 4. 每个分类至少1个字体
console.log(`分类列表: ${[...categorySet].join(', ')}`);
for (const cat of categorySet) {
  const count = FONTS.filter(f => f.category === cat).length;
  console.log(`  ${cat}: ${count} 个`);
  if (count < 1) {
    console.error(`❌ 分类 ${cat} 没有字体`);
    ok = false;
  }
}
console.log('✅ 每个分类至少1个字体');

if (ok) {
  console.log('\n🎉 所有验证通过！');
  process.exit(0);
} else {
  console.log('\n💥 验证未通过');
  process.exit(1);
}
