const fs = require('fs');

// Read font_details.json
const fontDetails = JSON.parse(fs.readFileSync('/workspace/font_details.json', 'utf8'));

const fonts = [];
const seenFamilies = new Set();

function addFont(name, family, displayName, previewText, category, cssUrl, googleFontName) {
  if (seenFamilies.has(family)) return;
  seenFamilies.add(family);
  fonts.push({
    name,
    family,
    displayName,
    previewText,
    category,
    ...(cssUrl ? { cssUrl } : {}),
    ...(googleFontName ? { googleFontName } : {})
  });
}

// Helper: build CSS URL from pkg and first variant
function buildCssUrl(pkg, variant) {
  // Prefer jsdelivr, fallback to unpkg based on original data patterns
  const encoded = encodeURIComponent(variant);
  // Most use jsdelivr or unpkg; use the same pattern as in font_details
  if (pkg === 'blbbsxt' || pkg === 'cezkzdbs' || pkg === 'crgkk' || pkg === 'fhst' || pkg === 'hlxsjt' || pkg === 'hyqzp' || pkg === 'jxzk' || pkg === 'jyhpws' || pkg === 'qtbfsxt' || pkg === 'rmjzqpybxs' || pkg === 'scjssh' || pkg === 'sft' || pkg === 'stdgt' || pkg === 'stmdxf' || pkg === 'syftjkt' || pkg === 'sypxzs' || pkg === 'ysbth' || pkg === 'ysbzt' || pkg === 'yzgcxst' || pkg === 'yzklct' || pkg === 'zhbtt' || pkg === 'zjmc' || pkg === 'zkxw' || pkg === 'zlmyz' || pkg === 'zqfs' || pkg === 'zqzmxs' || pkg === 'zzqxmxht' || pkg === 'pfgzt' || pkg === 'pfmmd' || pkg === 'pmzdxxt' || pkg === 'pfljhlyt' || pkg === 'dyzgt' || pkg === 'fbdzt' || pkg === 'bwckkt') {
    return `https://unpkg.com/@chinese-fonts/${pkg}@latest/dist/${encoded}/result.css`;
  }
  return `https://cdn.jsdelivr.net/npm/@chinese-fonts/${pkg}@latest/dist/${variant}/result.css`;
}

// Category mapping for @chinese-fonts packages
const categoryMap = {
  'blbbsxt': '手写',
  'bwckkt': '圆体',
  'bxzlzt': '艺术',
  'cef': '黑体',
  'cezkzdbs': '艺术',
  'cqscbbt': '艺术',
  'crgkk': '楷体',
  'cubic': '像素',
  'dyh': '黑体',
  'dymh': '黑体',
  'dyzgt': '黑体',
  'fbdzt': '手写',
  'fhst': '宋体',
  'hcqyt': '圆体',
  'hldqjt': '黑体',
  'hlxsjt': '行书',
  'hqzmt': '黑体',
  'hwmct': '明体',
  'hyqzp': '艺术',
  'jhlst': '宋体',
  'jnjj': '卡通',
  'jpdzt': '像素',
  'jxzk': '楷体',
  'jyhpws': '宋体',
  'kksjt': '黑体',
  'lxgwmanhei': '黑体',
  'lxgwwenkai': '楷体',
  'lxgwwenkaibright': '楷体',
  'lywkpmydb': '楷体',
  'maple-mono-cn': '黑体',
  'mksjh': '黑体',
  'mkwtyt': '圆体',
  'mkzyt': '圆体',
  'moon-stars-kai': '楷体',
  'mzxst': '像素',
  'pfgzt': '手写',
  'pfljhfyt': '手写',
  'pfljhlyt': '艺术',
  'pfmmd': '卡通',
  'pmzdxxt': '黑体',
  'qtbfsxt': '手写',
  'qxs': '像素',
  'rmjzqpybxs': '行书',
  'rzjkxzdmh': '楷体',
  'rzjryzzk': '楷体',
  'scjssh': '艺术',
  'sft': '手写',
  'stdgt': '楷体',
  'stmdxf': '黑体',
  'syftjkt': '黑体',
  'sypxzs': '宋体',
  'syst': '宋体',
  'the-write-right-font': '手写',
  'tjl': '隶书',
  'xiaolai': '手写',
  'xuandongkaishu': '楷体',
  'yfxy': '手写',
  'yidianyan': '黑体',
  'yozai': '黑体',
  'yqt': '卡通',
  'ysbth': '黑体',
  'ysbzt': '篆书',
  'ysfxt': '手写',
  'ysyrxk': '楷体',
  'yzgcxst': '卡通',
  'yzklct': '行书',
  'zhbtt': '艺术',
  'zjmc': '明体',
  'zkxw': '艺术',
  'zlmyz': '复古',
  'zqfs': '仿宋',
  'zqzmxs': '行书',
  'zzqxmxht': '卡通'
};

// Process @chinese-fonts packages
for (const pkg of fontDetails) {
  if (!pkg.family || !pkg.variants || pkg.variants.length === 0) continue;
  if (pkg.pkg === 'hqzmt') continue; // Korean font

  const baseCategory = categoryMap[pkg.pkg] || '艺术';

  // For packages with multiple meaningful variants, add each as separate font
  const multiVariantPackages = ['lxgwwenkai', 'lxgwwenkaibright', 'moon-stars-kai', 'yfxy', 'yozai', 'maple-mono-cn', 'bwckkt', 'hcqyt', 'jhlst', 'stdgt', 'mzxst', 'jpdzt', 'lywkpmydb', 'cef'];

  if (multiVariantPackages.includes(pkg.pkg)) {
    for (const variant of pkg.variants) {
      let variantFamily = variant;
      // Clean up family names
      if (pkg.pkg === 'lxgwwenkai') {
        if (variant.includes('Mono')) continue; // skip mono variants to keep count manageable
        variantFamily = variant.replace('LXGWWenKai-', 'LXGW WenKai ');
      } else if (pkg.pkg === 'lxgwwenkaibright') {
        variantFamily = variant.replace('LXGWBright-', 'LXGW Bright ');
      } else if (pkg.pkg === 'moon-stars-kai') {
        if (variant.includes('HW') || variant.includes('T-')) continue;
        variantFamily = variant.replace('MoonStarsKai-', 'Moon Stars Kai ');
      } else if (pkg.pkg === 'yfxy') {
        variantFamily = variant.replace('YuFanXinYu-', 'YuFan XinYu ');
      } else if (pkg.pkg === 'yozai') {
        variantFamily = variant.replace('Yozai-', 'Yozai ');
      } else if (pkg.pkg === 'maple-mono-cn') {
        if (!variant.includes('Regular') || variant.includes('Italic')) continue;
        variantFamily = variant.replace('MapleMono-CN-', 'Maple Mono CN ');
      } else if (pkg.pkg === 'bwckkt') {
        variantFamily = variant.replace('白无常可可体-', 'Baiwuchang Keke ');
      } else if (pkg.pkg === 'hcqyt') {
        variantFamily = variant.replace('ChillRoundF', 'Chill Round ');
      } else if (pkg.pkg === 'jhlst') {
        variantFamily = variant; // keep as is
      } else if (pkg.pkg === 'stdgt') {
        variantFamily = variant.replace('上图东观体-', 'Shangtu Dongguan ');
      } else if (pkg.pkg === 'mzxst') {
        variantFamily = variant === 'MZPXflat' ? 'MuzaiPixel Flat' : 'MuzaiPixel Orig';
      } else if (pkg.pkg === 'jpdzt') {
        variantFamily = variant.replace('BoutiqueBitmap', 'Boutique Bitmap ').replace('_1_6', '');
      } else if (pkg.pkg === 'lywkpmydb') {
        if (variant.includes('MonoScreen')) continue;
        variantFamily = 'LXGW WenKai Screen';
      } else if (pkg.pkg === 'cef') {
        if (variant.includes('Mono')) continue;
        variantFamily = 'CEF Fonts CJK';
      }

      const cssUrl = buildCssUrl(pkg.pkg, variant);
      const displayName = variantFamily;
      addFont(variantFamily, variantFamily, displayName, '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', baseCategory, cssUrl);
    }
  } else {
    // Single variant
    const variant = pkg.variants[0];
    const cssUrl = pkg.cssUrl || buildCssUrl(pkg.pkg, variant);
    addFont(pkg.family, pkg.family, pkg.family, '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', baseCategory, cssUrl);
  }
}

// Google Fonts Chinese
const googleFonts = [
  { name: 'Noto Sans SC', family: 'Noto Sans SC', displayName: 'Noto Sans SC', category: '黑体', googleFontName: 'Noto+Sans+SC' },
  { name: 'Noto Serif SC', family: 'Noto Serif SC', displayName: 'Noto Serif SC', category: '宋体', googleFontName: 'Noto+Serif+SC' },
  { name: 'Noto Sans TC', family: 'Noto Sans TC', displayName: 'Noto Sans TC', category: '黑体', googleFontName: 'Noto+Sans+TC' },
  { name: 'Noto Serif TC', family: 'Noto Serif TC', displayName: 'Noto Serif TC', category: '宋体', googleFontName: 'Noto+Serif+TC' },
  { name: 'Noto Sans HK', family: 'Noto Sans HK', displayName: 'Noto Sans HK', category: '黑体', googleFontName: 'Noto+Sans+HK' },
  { name: 'Noto Serif HK', family: 'Noto Serif HK', displayName: 'Noto Serif HK', category: '宋体', googleFontName: 'Noto+Serif+HK' },
  { name: 'ZCOOL KuaiLe', family: 'ZCOOL KuaiLe', displayName: '站酷快乐体', category: '卡通', googleFontName: 'ZCOOL+KuaiLe' },
  { name: 'ZCOOL XiaoWei', family: 'ZCOOL XiaoWei', displayName: '站酷小薇体', category: '手写', googleFontName: 'ZCOOL+XiaoWei' },
  { name: 'ZCOOL QingKe HuangYou', family: 'ZCOOL QingKe HuangYou', displayName: '站酷庆科黄油体', category: '圆体', googleFontName: 'ZCOOL+QingKe+HuangYou' },
  { name: 'Ma Shan Zheng', family: 'Ma Shan Zheng', displayName: '马善政毛笔楷体', category: '楷体', googleFontName: 'Ma+Shan+Zheng' },
  { name: 'Zhi Mang Xing', family: 'Zhi Mang Xing', displayName: '志莽行书', category: '行书', googleFontName: 'Zhi+Mang+Xing' },
  { name: 'Liu Jian Mao Cao', family: 'Liu Jian Mao Cao', displayName: '刘建毛草', category: '草书', googleFontName: 'Liu+Jian+Mao+Cao' },
  { name: 'Long Cang', family: 'Long Cang', displayName: '龙藏体', category: '行书', googleFontName: 'Long+Cang' },
];

for (const gf of googleFonts) {
  addFont(gf.name, gf.family, gf.displayName, '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', gf.category, null, gf.googleFontName);
}

// Other CDN fonts
addFont('MiSans', 'MiSans', 'MiSans', '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', '黑体', 'https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-Normal.min.css');
addFont('MiSans VF', 'MiSans VF', 'MiSans 可变字体', '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', '黑体', 'https://cdn.jsdelivr.net/npm/misans@4.1.0/lib/Normal/MiSans-VF.min.css');

// Additional fonts to reach 150
const additionalFonts = [
  // 黑体
  { name: 'OPPO Sans', family: 'OPPO Sans', displayName: 'OPPO Sans', category: '黑体', cssUrl: 'https://static01.fontke.com/ossfont/static/opposans/OPPOSans-R/result.css' },
  { name: 'HarmonyOS Sans', family: 'HarmonyOS Sans', displayName: '鸿蒙系统字体', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/harmonyos-sans@1.0.0/HarmonyOS_Sans_Regular/result.css' },
  { name: 'Source Han Sans CN', family: 'Source Han Sans CN', displayName: '思源黑体', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syst@latest/dist/SourceHanSerifCN/result.css' }, // placeholder, will replace
  // 宋体
  { name: 'Source Han Serif CN', family: 'Source Han Serif CN', displayName: '思源宋体', category: '宋体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syst@latest/dist/SourceHanSerifCN/result.css' },
  // 楷体
  { name: 'LXGW WenKai TC', family: 'LXGW WenKai TC', displayName: '霞鹜文楷 TC', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Regular/result.css' },
  // 手写
  { name: 'Slidefu', family: 'Slidefu', displayName: '演示佛系体', category: '手写', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysfxt@latest/dist/Slidefu-Regular/result.css' },
  // 行书
  { name: '鸿雷行书简体', family: 'hongleixingshu', displayName: '鸿雷行书简体', category: '行书', cssUrl: 'https://unpkg.com/@chinese-fonts/hlxsjt@latest/dist/%E9%B8%BF%E9%9B%B7%E8%A1%8C%E4%B9%A6%E7%AE%80%E4%BD%93/result.css' },
  // 隶书
  { name: 'Tiejili', family: 'Tiejili', displayName: '铁蒺藜体', category: '隶书', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/tjl@latest/dist/Tiejili_Regular/result.css' },
  // 篆书
  { name: '峄山碑篆体', family: '峄山碑篆体', displayName: '峄山碑篆体', category: '篆书', cssUrl: 'https://unpkg.com/@chinese-fonts/ysbzt@latest/dist/%E5%B3%84%E5%B1%B1%E7%A2%91%E7%AF%86%E4%BD%93/result.css' },
  // 仿宋
  { name: 'Zhuque Fangsong', family: 'Zhuque Fangsong', displayName: '朱雀仿宋', category: '仿宋', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqfs@latest/dist/ZhuqueFangsong-Regular/result.css' },
  // 明体
  { name: '装甲明朝体', family: '装甲明朝体', displayName: '装甲明朝体', category: '明体', cssUrl: 'https://unpkg.com/@chinese-fonts/zjmc@latest/dist/%E8%A3%85%E7%94%B2%E6%98%8E%E6%9C%9D%E4%BD%93/result.css' },
  // 圆体
  { name: '猫啃珠圆体', family: '猫啃珠圆体', displayName: '猫啃珠圆体', category: '圆体', cssUrl: 'https://unpkg.com/@chinese-fonts/mkzyt@latest/dist/%E7%8C%AB%E5%95%83%E7%8F%A0%E5%9C%86%E4%BD%93/result.css' },
  // 像素
  { name: 'Cubic 11', family: 'Cubic 11', displayName: 'Cubic 11', category: '像素', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cubic@latest/dist/Cubic/result.css' },
  // 艺术
  { name: '仓耳周珂正大榜书', family: '仓耳周珂正大榜书', displayName: '仓耳周珂正大榜书', category: '艺术', cssUrl: 'https://unpkg.com/@chinese-fonts/cezkzdbs@latest/dist/%E4%BB%93%E8%80%B3%E5%91%A8%E7%8F%82%E6%AD%A3%E5%A4%A7%E6%A6%9C%E4%B9%A6/result.css' },
  // 卡通
  { name: 'Child Fun Sans', family: 'Child Fun Sans', displayName: '有字库童趣体', category: '卡通', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yqt@latest/dist/ChildFunSans-Demo/result.css' },
  // 复古
  { name: '逐浪萌芽字', family: '逐浪萌芽字', displayName: '逐浪萌芽字', category: '复古', cssUrl: 'https://unpkg.com/@chinese-fonts/zlmyz@latest/dist/%E9%80%90%E6%B5%AA%E8%90%8C%E8%8A%BD%E5%AD%97/result.css' },
];

for (const af of additionalFonts) {
  addFont(af.name, af.family, af.displayName, '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', af.category, af.cssUrl);
}

// Now add more fonts from @chinese-fonts to reach 150, including more variants
const extraVariants = [];

// Add all remaining unique fonts from fontDetails that weren't added yet
for (const pkg of fontDetails) {
  if (!pkg.family || !pkg.variants || pkg.variants.length === 0) continue;
  if (pkg.pkg === 'hqzmt') continue;
  if (seenFamilies.has(pkg.family)) continue;

  const baseCategory = categoryMap[pkg.pkg] || '艺术';
  const variant = pkg.variants[0];
  const cssUrl = pkg.cssUrl || buildCssUrl(pkg.pkg, variant);
  addFont(pkg.family, pkg.family, pkg.family, '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', baseCategory, cssUrl);
}

// If still not enough, add some manual extra fonts
const manualExtras = [
  { name: '霞鹜文楷 Light', family: 'LXGW WenKai Light', displayName: '霞鹜文楷 Light', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Light/result.css' },
  { name: '霞鹜文楷 Medium', family: 'LXGW WenKai Medium', displayName: '霞鹜文楷 Medium', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Medium/result.css' },
  { name: '霞鹜文楷 Regular', family: 'LXGW WenKai Regular', displayName: '霞鹜文楷 Regular', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Regular/result.css' },
  { name: 'LXGW Bright Light', family: 'LXGW Bright Light', displayName: 'LXGW Bright Light', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkaibright@latest/dist/LXGWBright-Light/result.css' },
  { name: 'LXGW Bright Regular', family: 'LXGW Bright Regular', displayName: 'LXGW Bright Regular', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkaibright@latest/dist/LXGWBright-Regular/result.css' },
  { name: 'LXGW Bright Medium', family: 'LXGW Bright Medium', displayName: 'LXGW Bright Medium', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkaibright@latest/dist/LXGWBright-Medium/result.css' },
  { name: 'Moon Stars Kai Bold', family: 'Moon Stars Kai Bold', displayName: 'Moon Stars Kai Bold', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/moon-stars-kai@latest/dist/MoonStarsKai-Bold/result.css' },
  { name: 'Moon Stars Kai Regular', family: 'Moon Stars Kai Regular', displayName: 'Moon Stars Kai Regular', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/moon-stars-kai@latest/dist/MoonStarsKai-Regular/result.css' },
  { name: 'Moon Stars Kai Light', family: 'Moon Stars Kai Light', displayName: 'Moon Stars Kai Light', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/moon-stars-kai@latest/dist/MoonStarsKai-Light/result.css' },
  { name: 'YuFan XinYu Bold', family: 'YuFan XinYu Bold', displayName: '余繁新语 Bold', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yfxy@latest/dist/YuFanXinYu-Bold/result.css' },
  { name: 'YuFan XinYu Regular', family: 'YuFan XinYu Regular', displayName: '余繁新语 Regular', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yfxy@latest/dist/YuFanXinYu-Regular/result.css' },
  { name: 'Yozai Bold', family: 'Yozai Bold', displayName: '悠哉 Bold', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Bold/result.css' },
  { name: 'Yozai Regular', family: 'Yozai Regular', displayName: '悠哉 Regular', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Regular/result.css' },
  { name: 'Yozai Light', family: 'Yozai Light', displayName: '悠哉 Light', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Light/result.css' },
  { name: 'Boutique Bitmap 9x9', family: 'Boutique Bitmap 9x9', displayName: '精品点阵体 9x9', category: '像素', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jpdzt@latest/dist/BoutiqueBitmap9x9_1_6/result.css' },
  { name: 'Boutique Bitmap 7x7', family: 'Boutique Bitmap 7x7', displayName: '精品点阵体 7x7', category: '像素', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jpdzt@latest/dist/BoutiqueBitmap7x7_1_6/result.css' },
  { name: '上图东观体 常规', family: 'Shangtu Dongguan 常规', displayName: '上图东观体 常规', category: '楷体', cssUrl: 'https://unpkg.com/@chinese-fonts/stdgt@latest/dist/%E4%B8%8A%E5%9B%BE%E4%B8%9C%E8%A7%82%E4%BD%93-%E5%B8%B8%E8%A7%84/result.css' },
  { name: '上图东观体 粗体', family: 'Shangtu Dongguan 粗体', displayName: '上图东观体 粗体', category: '楷体', cssUrl: 'https://unpkg.com/@chinese-fonts/stdgt@latest/dist/%E4%B8%8A%E5%9B%BE%E4%B8%9C%E8%A7%82%E4%BD%93-%E7%B2%97%E4%BD%93/result.css' },
  { name: '上图东观体 细体', family: 'Shangtu Dongguan 细体', displayName: '上图东观体 细体', category: '楷体', cssUrl: 'https://unpkg.com/@chinese-fonts/stdgt@latest/dist/%E4%B8%8A%E5%9B%BE%E4%B8%9C%E8%A7%82%E4%BD%93-%E7%BB%86%E4%BD%93/result.css' },
  { name: 'Chill Round Regular', family: 'Chill Round Regular', displayName: '寒蝉全圆体 Regular', category: '圆体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hcqyt@latest/dist/ChillRoundFRegular/result.css' },
  { name: 'Chill Round Bold', family: 'Chill Round Bold', displayName: '寒蝉全圆体 Bold', category: '圆体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hcqyt@latest/dist/ChillRoundFBold/result.css' },
  { name: 'MuzaiPixel Flat', family: 'MuzaiPixel Flat', displayName: '目哉像素 Flat', category: '像素', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mzxst@latest/dist/MZPXflat/result.css' },
  { name: 'MuzaiPixel Orig', family: 'MuzaiPixel Orig', displayName: '目哉像素 Orig', category: '像素', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mzxst@latest/dist/MZPXorig/result.css' },
  { name: '白无常可可体 Bold', family: 'Baiwuchang Keke Bold', displayName: '白无常可可体 Bold', category: '圆体', cssUrl: 'https://unpkg.com/@chinese-fonts/bwckkt@latest/dist/%E7%99%BD%E6%97%A0%E5%B8%B8%E5%8F%AF%E5%8F%AF%E4%BD%93-Bold/result.css' },
  { name: '白无常可可体 Regular', family: 'Baiwuchang Keke Regular', displayName: '白无常可可体 Regular', category: '圆体', cssUrl: 'https://unpkg.com/@chinese-fonts/bwckkt@latest/dist/%E7%99%BD%E6%97%A0%E5%B8%B8%E5%8F%AF%E5%8F%AF%E4%BD%93-Regular/result.css' },
  { name: '白无常可可体 Light', family: 'Baiwuchang Keke Light', displayName: '白无常可可体 Light', category: '圆体', cssUrl: 'https://unpkg.com/@chinese-fonts/bwckkt@latest/dist/%E7%99%BD%E6%97%A0%E5%B8%B8%E5%8F%AF%E5%8F%AF%E4%BD%93-Light/result.css' },
  { name: 'LXGW WenKai Mono Screen', family: 'LXGW WenKai Mono Screen', displayName: '霞鹜文楷等宽屏显', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lywkpmydb@latest/dist/LXGWWenKaiMonoScreen/result.css' },
  { name: 'LXGW WenKai Screen', family: 'LXGW WenKai Screen', displayName: '霞鹜文楷屏显', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lywkpmydb@latest/dist/LXGWWenKaiScreen/result.css' },
  { name: 'CEF Fonts CJK Mono', family: 'CEF Fonts CJK Mono', displayName: 'CEF Fonts CJK Mono', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cef@latest/dist/CEFFontsCJKMono-Regular/result.css' },
  { name: 'Maple Mono CN Bold', family: 'Maple Mono CN Bold', displayName: 'Maple Mono CN Bold', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/maple-mono-cn@latest/dist/MapleMono-CN-Bold/result.css' },
  { name: 'Maple Mono CN Regular', family: 'Maple Mono CN Regular', displayName: 'Maple Mono CN Regular', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/maple-mono-cn@latest/dist/MapleMono-CN-Regular/result.css' },
  { name: 'Maple Mono CN Light', family: 'Maple Mono CN Light', displayName: 'Maple Mono CN Light', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/maple-mono-cn@latest/dist/MapleMono-CN-Light/result.css' },
  { name: '京华老宋体 v1', family: '京華老宋体v1_007', displayName: '京华老宋体 v1', category: '宋体', cssUrl: 'https://unpkg.com/@chinese-fonts/jhlst@latest/dist/%E4%BA%AC%E8%8F%AF%E8%80%81%E5%AE%8B%E4%BD%93v1_007/result.css' },
  { name: '京华老宋体 v2', family: '京華老宋体v2_002', displayName: '京华老宋体 v2', category: '宋体', cssUrl: 'https://unpkg.com/@chinese-fonts/jhlst@latest/dist/%E4%BA%AC%E8%8F%AF%E8%80%81%E5%AE%8B%E4%BD%93v2_002/result.css' },
  // More distinct fonts
  { name: '优设标题黑', family: 'YouSheBiaoTiHei', displayName: '优设标题黑', category: '黑体', cssUrl: 'https://unpkg.com/@chinese-fonts/ysbth@latest/dist/%E4%BC%98%E8%AE%BE%E6%A0%87%E9%A2%98%E9%BB%91/result.css' },
  { name: '快看世界体', family: '快看世界体', displayName: '快看世界体', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/kksjt@latest/dist/kuaikanshijieti20231213/result.css' },
  { name: '斗鱼追光体', family: '斗鱼追光体', displayName: '斗鱼追光体', category: '黑体', cssUrl: 'https://unpkg.com/@chinese-fonts/dyzgt@latest/dist/%E6%96%97%E9%B1%BC%E8%BF%BD%E5%85%89%E4%BD%93/result.css' },
  { name: '抖音美好体', family: 'Douyin Sans', displayName: '抖音美好体', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dymh@latest/dist/DouyinSansBold/result.css' },
  { name: '优设鲨鱼菲特健康体', family: '优设鲨鱼菲特健康体', displayName: '优设鲨鱼菲特健康体', category: '黑体', cssUrl: 'https://unpkg.com/@chinese-fonts/syftjkt@latest/dist/%E4%BC%98%E8%AE%BE%E9%B2%A8%E9%B1%BC%E8%8F%B2%E7%89%B9%E5%81%A5%E5%BA%B7%E4%BD%93/result.css' },
  { name: '摄图摩登小方体', family: '摄图摩登小方体', displayName: '摄图摩登小方体', category: '黑体', cssUrl: 'https://unpkg.com/@chinese-fonts/stmdxf@latest/dist/%E6%91%84%E5%9B%BE%E6%91%A9%E7%99%BB%E5%B0%8F%E6%96%B9%E4%BD%93/result.css' },
  { name: '庞门正道细线体', family: '庞门正道细线体', displayName: '庞门正道细线体', category: '黑体', cssUrl: 'https://unpkg.com/@chinese-fonts/pmzdxxt@latest/dist/%E5%BA%9E%E9%97%A8%E6%AD%A3%E9%81%93%E7%BB%86%E7%BA%BF%E4%BD%93/result.css' },
  { name: '千图笔锋手写体', family: '千图笔锋手写体', displayName: '千图笔锋手写体', category: '手写', cssUrl: 'https://unpkg.com/@chinese-fonts/qtbfsxt@latest/dist/%E5%8D%83%E5%9B%BE%E7%AC%94%E9%94%8B%E6%89%8B%E5%86%99%E4%BD%93/result.css' },
  { name: '白路棒棒手写体', family: '白路棒棒手写体', displayName: '白路棒棒手写体', category: '手写', cssUrl: 'https://unpkg.com/@chinese-fonts/blbbsxt@latest/dist/%E7%99%BD%E8%B7%AF%E6%A3%92%E6%A3%92%E6%89%8B%E5%86%99%E4%BD%93/result.css' },
  { name: '飞波正点体', family: '飞波正点体', displayName: '飞波正点体', category: '手写', cssUrl: 'https://unpkg.com/@chinese-fonts/fbdzt@latest/dist/%E9%A3%9E%E6%B3%A2%E6%AD%A3%E7%82%B9%E4%BD%93V2_1/result.css' },
  { name: '平方公子体', family: '平方公子体', displayName: '平方公子体', category: '手写', cssUrl: 'https://unpkg.com/@chinese-fonts/pfgzt@latest/dist/%E5%B9%B3%E6%96%B9%E5%85%AC%E5%AD%90%E4%BD%93/result.css' },
  { name: '平方赖江湖飞扬体', family: '平方赖江湖飞扬体', displayName: '平方赖江湖飞扬体', category: '手写', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pfljhfyt@latest/dist/PingFangLaiJiangHuFeiYangTi-2/result.css' },
  { name: '平方赖江湖琅琊体', family: '平方赖江湖琅琊体', displayName: '平方赖江湖琅琊体', category: '艺术', cssUrl: 'https://unpkg.com/@chinese-fonts/pfljhlyt@latest/dist/%E5%B9%B3%E6%96%B9%E8%B5%96%E6%B1%9F%E6%B9%96%E7%90%85%E7%90%8A%E4%BD%93/result.css' },
  { name: '也字工厂小石头', family: '也字工厂小石头', displayName: '也字工厂小石头', category: '卡通', cssUrl: 'https://unpkg.com/@chinese-fonts/yzgcxst@latest/dist/%E4%B9%9F%E5%AD%97%E5%B7%A5%E5%8E%82%E5%B0%8F%E7%9F%B3%E5%A4%B4/result.css' },
  { name: '字魂扁桃体', family: '字魂扁桃体', displayName: '字魂扁桃体', category: '艺术', cssUrl: 'https://unpkg.com/@chinese-fonts/zhbtt@latest/dist/%E5%AD%97%E9%AD%82%E6%89%81%E6%A1%83%E4%BD%93/result.css' },
  { name: '字制区喜脉喜欢体', family: '字制区喜脉喜欢体', displayName: '字制区喜脉喜欢体', category: '卡通', cssUrl: 'https://unpkg.com/@chinese-fonts/zzqxmxht@latest/dist/%E5%AD%97%E5%88%B6%E5%8C%BA%E5%96%9C%E8%84%89%E5%96%9C%E6%AC%A2%E4%BD%93/result.css' },
  { name: '站酷小薇LOGO体', family: '站酷小薇LOGO体', displayName: '站酷小薇LOGO体', category: '艺术', cssUrl: 'https://unpkg.com/@chinese-fonts/zkxw@latest/dist/%E7%AB%99%E9%85%B7%E5%B0%8F%E8%96%87LOGO%E4%BD%93_%E7%8C%AB%E5%95%83%E7%BD%91/result.css' },
  { name: '标小智龙珠体', family: '标小智龙珠体', displayName: '标小智龙珠体', category: '艺术', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/bxzlzt@latest/dist/%E6%A0%87%E5%B0%8F%E6%99%BA%E9%BE%99%E7%8F%A0%E4%BD%93/result.css' },
  { name: '荆南俊俊体', family: '荆南俊俊体', displayName: '荆南俊俊体', category: '卡通', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jnjj@latest/dist/JUNJUN/result.css' },
  { name: '黄引齐招牌体', family: '黄引齐招牌体', displayName: '黄引齐招牌体', category: '艺术', cssUrl: 'https://unpkg.com/@chinese-fonts/hyqzp@latest/dist/%E9%BB%84%E5%BC%95%E9%BD%90%E6%8B%9B%E7%89%8C%E4%BD%93/result.css' },
  { name: '素材集市社会体', family: '素材集市社会体', displayName: '素材集市社会体', category: '艺术', cssUrl: 'https://unpkg.com/@chinese-fonts/scjssh@latest/dist/%E7%B4%A0%E6%9D%90%E9%9B%86%E5%B8%82%E7%A4%BE%E4%BC%9A%E4%BD%93/result.css' },
  { name: '极影毁片文宋', family: '极影毁片文宋', displayName: '极影毁片文宋', category: '宋体', cssUrl: 'https://unpkg.com/@chinese-fonts/jyhpws@latest/dist/%E6%9E%81%E5%BD%B1%E6%AF%81%E7%89%87%E6%96%87%E5%AE%8B/result.css' },
  { name: '飞花宋体', family: '飞花宋体', displayName: '飞花宋体', category: '宋体', cssUrl: 'https://unpkg.com/@chinese-fonts/fhst@latest/dist/%E9%A3%9E%E8%8A%B1%E5%AE%8B%E4%BD%93/result.css' },
  { name: '汇文明朝体', family: '汇文明朝体', displayName: '汇文明朝体', category: '明体', cssUrl: 'https://unpkg.com/@chinese-fonts/hwmct@latest/dist/%E6%B1%87%E6%96%87%E6%98%8E%E6%9C%9D%E4%BD%93/result.css' },
  { name: 'nzgr康熙', family: 'nzgr康熙', displayName: 'nzgr康熙', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjkxzdmh@latest/dist/nzgrKangxi/result.css' },
  { name: 'nzgr儒印奏章楷', family: 'nzgr儒印奏章楷', displayName: 'nzgr儒印奏章楷', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjryzzk@latest/dist/nzgrRuYinZouZhangKai/result.css' },
  { name: '钟齐志莽行书', family: '钟齐志莽行书', displayName: '钟齐志莽行书', category: '行书', cssUrl: 'https://unpkg.com/@chinese-fonts/zqzmxs@latest/dist/%E9%92%9F%E9%BD%90%E5%BF%97%E8%8E%BD%E8%A1%8C%E4%B9%A6/result.css' },
  { name: '有字库龙藏体', family: '有字库龙藏体', displayName: '有字库龙藏体', category: '行书', cssUrl: 'https://unpkg.com/@chinese-fonts/yzklct@latest/dist/%E6%9C%89%E5%AD%97%E5%BA%93%E9%BE%99%E8%97%8F%E4%BD%93/result.css' },
  { name: '瑞美加张清平硬笔行书', family: '瑞美加张清平硬笔行书', displayName: '瑞美加张清平硬笔行书', category: '行书', cssUrl: 'https://unpkg.com/@chinese-fonts/rmjzqpybxs@latest/dist/%E7%91%9E%E7%BE%8E%E5%8A%A0%E5%BC%A0%E6%B8%85%E5%B9%B3%E7%A1%AC%E7%AC%94%E8%A1%8C%E4%B9%A6/result.css' },
  { name: 'Slideyouran', family: 'slideyouran', displayName: '演示悠然小楷', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysyrxk@latest/dist/slideyouran-Regular2_0/result.css' },
  { name: 'Xiaolai SC', family: 'Xiaolai SC', displayName: '小赖体', category: '手写', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@latest/dist/Xiaolai/result.css' },
  { name: 'Xuandong Kaishu', family: 'XuandongKaishu', displayName: '玄冬楷书', category: '楷体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xuandongkaishu@latest/dist/XuandongKaishu/result.css' },
  { name: 'The Write Right Font', family: 'The Write Right Font', displayName: 'The Write Right Font', category: '手写', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/the-write-right-font@latest/dist/the-write-right-font-2023_0401/result.css' },
  { name: '随峰体', family: '随峰体', displayName: '随峰体', category: '手写', cssUrl: 'https://unpkg.com/@chinese-fonts/sft@latest/dist/%E9%9A%8F%E5%B3%B0%E4%BD%93/result.css' },
  { name: '猫啃杂黑', family: 'MaokenAssortedSans', displayName: '猫啃杂黑', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mksjh@latest/dist/MaokenAssortedSans/result.css' },
  { name: '猫啃汤圆', family: 'MaoKenTangYuan', displayName: '猫啃汤圆', category: '圆体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mkwtyt@latest/dist/MaoKenTangYuan/result.css' },
  { name: 'QIJI Fallback', family: 'QIJIFALLBACK', displayName: '奇吉Fallback', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hldqjt@latest/dist/qiji-fallback/result.css' },
  { name: 'QuanPixel', family: 'QuanPixel 8px', displayName: '全像素 8px', category: '像素', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qxs@latest/dist/quan/result.css' },
  { name: 'Yidianyan', family: 'I.Ngaan', displayName: '一点颜', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yidianyan@latest/dist/yidianyan/result.css' },
  { name: 'Smiley Sans', family: 'Smiley Sans Oblique', displayName: '得意黑', category: '黑体', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyh@latest/dist/SmileySans-Oblique/result.css' },
  { name: '程荣光刻楷', family: '程荣光刻楷', displayName: '程荣光刻楷', category: '楷体', cssUrl: 'https://unpkg.com/@chinese-fonts/crgkk@latest/dist/%E7%A8%8B%E8%8D%A3%E5%85%89%E5%88%BB%E6%A5%B7/result.css' },
  { name: '江西拙楷', family: '江西拙楷', displayName: '江西拙楷', category: '楷体', cssUrl: 'https://unpkg.com/@chinese-fonts/jxzk@latest/dist/%E6%B1%9F%E8%A5%BF%E6%8B%99%E6%A5%B7/result.css' },
  { name: '平方萌萌哒', family: '平方萌萌哒', displayName: '平方萌萌哒', category: '卡通', cssUrl: 'https://unpkg.com/@chinese-fonts/pfmmd@latest/dist/%E5%B9%B3%E6%96%B9%E8%90%8C%E8%90%8C%E5%93%92/result.css' },
  { name: '重庆山城棒棒体', family: '重庆山城棒棒体', displayName: '重庆山城棒棒体', category: '艺术', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cqscbbt@latest/dist/YunFengZiKuZhongQingShanChengBangBangTi-2/result.css' },
];

for (const me of manualExtras) {
  addFont(me.name, me.family, me.displayName, '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。', me.category, me.cssUrl);
}

// Trim to exactly 150
const finalFonts = fonts.slice(0, 150);

// Verify categories
const categories = new Set(finalFonts.map(f => f.category));
console.log(`Total fonts: ${finalFonts.length}`);
console.log(`Categories (${categories.size}):`, [...categories].sort());

// Verify no duplicates
const families = finalFonts.map(f => f.family);
const uniqueFamilies = new Set(families);
console.log(`Unique families: ${uniqueFamilies.size}`);

fs.writeFileSync('/workspace/fonts-150.json', JSON.stringify(finalFonts, null, 2));
console.log('Saved to /workspace/fonts-150.json');
