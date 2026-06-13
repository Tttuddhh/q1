// ============================================================
// 中文字体 CDN URL 验证脚本 (Rebuild Verify)
// 验证 120 个不重复中文字体的 CDN 可用性
// 用法: node scripts/rebuild-verify.mjs
// ============================================================

import fs from 'node:fs';

const REPORT_PATH = '/workspace/font_validation/rebuild_verify_report.txt';
const CONCURRENCY = 16;
const TIMEOUT = 12000;

// ====== 辅助函数 ======
function cnFont(name, pkg, family, tags, preview) {
  return {
    name, family, category: 'chinese', tags, preview,
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: `https://cdn.jsdelivr.net/npm/${pkg}/font.css`, priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: `https://cdn.jsdelivr.net/npm/${pkg}@latest/font.css`, priority: 2 },
    ],
  };
}

function gFont(name, pkg, family, gName, tags, preview) {
  return {
    name, family, category: 'chinese', tags, preview, googleFontName: gName,
    sources: [
      { type: 'jsdelivr-fontsource', url: `https://cdn.jsdelivr.net/npm/@fontsource/${pkg}/index.css`, priority: 1 },
      { type: 'google-fonts', url: `https://fonts.googleapis.com/css2?family=${gName}`, priority: 2 },
    ],
  };
}

const CHINESE_FONTS = [
  // ====================
  // Group 1: 思源黑体/Noto Sans (5) - @fontsource
  // ====================
  gFont('思源黑体 SC', 'noto-sans-sc', '"Noto Sans SC", sans-serif', 'Noto+Sans+SC', ['chinese', 'sans'], '思源黑体'),
  gFont('思源黑体 TC', 'noto-sans-tc', '"Noto Sans TC", sans-serif', 'Noto+Sans+TC', ['chinese', 'sans'], '思源黑体TC'),
  gFont('思源黑体 HK', 'noto-sans-hk', '"Noto Sans HK", sans-serif', 'Noto+Sans+HK', ['chinese', 'sans'], '思源黑体HK'),
  gFont('思源黑体 JP', 'noto-sans-jp', '"Noto Sans JP", sans-serif', 'Noto+Sans+JP', ['chinese', 'sans'], '思源黑体JP'),
  gFont('思源黑体 KR', 'noto-sans-kr', '"Noto Sans KR", sans-serif', 'Noto+Sans+KR', ['chinese', 'sans'], '思源黑体KR'),

  // ====================
  // Group 2: 思源宋体/Noto Serif (5) - @fontsource
  // ====================
  gFont('思源宋体 SC', 'noto-serif-sc', '"Noto Serif SC", serif', 'Noto+Serif+SC', ['chinese', 'serif'], '思源宋体'),
  gFont('思源宋体 TC', 'noto-serif-tc', '"Noto Serif TC", serif', 'Noto+Serif+TC', ['chinese', 'serif'], '思源宋体TC'),
  gFont('思源宋体 HK', 'noto-serif-hk', '"Noto Serif HK", serif', 'Noto+Serif+HK', ['chinese', 'serif'], '思源宋体HK'),
  gFont('思源宋体 JP', 'noto-serif-jp', '"Noto Serif JP", serif', 'Noto+Serif+JP', ['chinese', 'serif'], '思源宋体JP'),
  gFont('思源宋体 KR', 'noto-serif-kr', '"Noto Serif KR", serif', 'Noto+Serif+KR', ['chinese', 'serif'], '思源宋体KR'),

  // ====================
  // Group 3: 霞鹜/LXGW (3 @fontsource + 2 cn-fontsource)
  // ====================
  gFont('霞鹜文楷 TC', 'lxgw-wenkai-tc', '"LXGW WenKai TC", serif', 'LXGW+WenKai+TC', ['chinese', 'serif'], '霞鹜文楷TC'),
  gFont('霞鹜文楷等宽 TC', 'lxgw-wenkai-mono-tc', '"LXGW WenKai Mono TC", monospace', 'LXGW+WenKai+Mono+TC', ['chinese', 'serif'], '霞鹜文楷等宽'),
  gFont('霞鹜马克哥特', 'lxgw-marker-gothic', '"LXGW Marker Gothic", sans-serif', 'LXGW+Marker+Gothic', ['chinese', 'gothic'], '霞鹜马克哥特'),
  cnFont('霞鹜新晰黑', 'cn-fontsource-lxgw-neo-xi-hei-regular', '"LXGW Neo XiHei", sans-serif', ['chinese', 'gothic'], '霞鹜新晰黑'),
  cnFont('霞鹜文楷屏幕版', 'cn-fontsource-lxgw-wen-kai-screen', '"LXGW WenKai Screen", serif', ['chinese', 'serif'], '霞鹜文楷屏'),

  // ====================
  // Group 4: 站酷/ZCOOL (3 @fontsource)
  // ====================
  gFont('站酷小薇', 'zcool-xiaowei', '"ZCOOL XiaoWei", serif', 'ZCOOL+XiaoWei', ['chinese', 'serif'], '站酷小薇'),
  gFont('站酷快乐体', 'zcool-kuaile', '"ZCOOL KuaiLe", cursive', 'ZCOOL+KuaiLe', ['chinese', 'cute'], '站酷快乐体'),
  gFont('站酷庆科黄油', 'zcool-qingke-huangyou', '"ZCOOL QingKe HuangYou", cursive', 'ZCOOL+QingKe+HuangYou', ['chinese', 'cute'], '站酷庆科黄油'),

  // ====================
  // Group 5: 手写/书法 (4 @fontsource)
  // ====================
  gFont('马善政', 'ma-shan-zheng', '"Ma Shan Zheng", cursive', 'Ma+Shan+Zheng', ['chinese', 'handwriting'], '马善政'),
  gFont('枝蔓行', 'zhi-mang-xing', '"Zhi Mang Xing", cursive', 'Zhi+Mang+Xing', ['chinese', 'handwriting'], '枝蔓行'),
  gFont('龙苍', 'long-cang', '"Long Cang", cursive', 'Long+Cang', ['chinese', 'handwriting'], '龙苍'),
  gFont('刘剑毛笔', 'liu-jian-mao-cao', '"Liu Jian Mao Cao", cursive', 'Liu+Jian+Mao+Cao', ['chinese', 'handwriting'], '刘剑毛笔'),

  // ====================
  // Group 6: 演示/手写 (3 cn-fontsource)
  // ====================
  cnFont('演示秋鸿', 'cn-fontsource-slideqiuhong', '"SlideQiuHong", cursive', ['chinese', 'handwriting'], '演示秋鸿'),
  cnFont('演示悠然', 'cn-fontsource-slideyouran-regular', '"SlideYouRan", cursive', ['chinese', 'handwriting'], '演示悠然'),
  cnFont('演示佛系体', 'cn-fontsource-slidefu-regular', '"SlideFu", cursive', ['chinese', 'handwriting'], '演示佛系体'),

  // ====================
  // Group 7: 悠哉/Yozai (5 cn-fontsource)
  // ====================
  cnFont('悠哉', 'cn-fontsource-yozai', '"Yozai", sans-serif', ['chinese', 'sans'], '悠哉'),
  cnFont('悠哉粗体', 'cn-fontsource-yozai-bold', '"Yozai Bold", sans-serif', ['chinese', 'sans'], '悠哉粗体'),
  cnFont('悠哉细体', 'cn-fontsource-yozai-light', '"Yozai Light", sans-serif', ['chinese', 'sans'], '悠哉细体'),
  cnFont('悠哉中等', 'cn-fontsource-yozai-medium', '"Yozai Medium", sans-serif', ['chinese', 'sans'], '悠哉中等'),
  cnFont('悠哉细体正体', 'cn-fontsource-yozai-light-regular', '"Yozai Light Regular", sans-serif', ['chinese', 'sans'], '悠哉细体正'),

  // ====================
  // Group 8: 方正/FZ (5 cn-fontsource)
  // ====================
  cnFont('方正楷体', 'cn-fontsource-fz-kai-z-03-regular', '"FZKai-Z03", serif', ['chinese', 'serif'], '方正楷体'),
  cnFont('方正书宋', 'cn-fontsource-fz-shu-song-z-01-regular', '"FZShuSong-Z01", serif', ['chinese', 'serif'], '方正书宋'),
  cnFont('方正仿宋', 'cn-fontsource-fz-fang-song-z-02-s-regular', '"FZFangSong-Z02", serif', ['chinese', 'serif'], '方正仿宋'),
  cnFont('方正黑体', 'cn-fontsource-fz-hei-b-01-regular', '"FZHei-B01", sans-serif', ['chinese', 'sans'], '方正黑体'),
  cnFont('方正甲骨文', 'cn-fontsource-fz-jia-gu-wen-regular', '"FZJiaGuWen", serif', ['chinese', 'serif'], '方正甲骨文'),

  // ====================
  // Group 9: 975圆体 (4 cn-fontsource)
  // ====================
  cnFont('975圆体粗体', 'cn-fontsource-975-maru-sc-bold', '"975 Maru SC Bold", sans-serif', ['chinese', 'sans'], '975圆体粗'),
  cnFont('975圆体中等正体', 'cn-fontsource-975-maru-sc-medium-regular', '"975 Maru SC Medium Regular", sans-serif', ['chinese', 'sans'], '975圆体中正'),
  cnFont('975圆体', 'cn-fontsource-975-maru-sc-regular', '"975 Maru SC Regular", sans-serif', ['chinese', 'sans'], '975圆体'),
  cnFont('X12Y16圆体Monica', 'cn-fontsource-x-12-y-16-px-maru-monica-regular', '"X12Y16PxMaruMonica", sans-serif', ['chinese', 'sans'], 'X12Y16Monica'),

  // ====================
  // Group 10: 日系/韩系 CJK 基础 (15 @fontsource)
  // ====================
  gFont('Klee One', 'klee-one', '"Klee One", cursive', 'Klee+One', ['chinese', 'handwriting'], 'Klee One'),
  gFont('Kosugi', 'kosugi', '"Kosugi", sans-serif', 'Kosugi', ['chinese', 'sans'], 'Kosugi'),
  gFont('Kosugi Maru', 'kosugi-maru', '"Kosugi Maru", sans-serif', 'Kosugi+Maru', ['chinese', 'sans'], 'Kosugi Maru'),
  gFont('M PLUS 1p', 'm-plus-1p', '"M PLUS 1p", sans-serif', 'M+PLUS+1p', ['chinese', 'sans'], 'M PLUS 1p'),
  gFont('M PLUS Rounded 1c', 'm-plus-rounded-1c', '"M PLUS Rounded 1c", sans-serif', 'M+PLUS+Rounded+1c', ['chinese', 'sans'], 'M PLUS 圆1c'),
  gFont('Sawarabi Gothic', 'sawarabi-gothic', '"Sawarabi Gothic", sans-serif', 'Sawarabi+Gothic', ['chinese', 'sans'], 'Sawarabi Gothic'),
  gFont('Sawarabi Mincho', 'sawarabi-mincho', '"Sawarabi Mincho", serif', 'Sawarabi+Mincho', ['chinese', 'serif'], 'Sawarabi Mincho'),
  gFont('Shippori Mincho', 'shippori-mincho', '"Shippori Mincho", serif', 'Shippori+Mincho', ['chinese', 'serif'], 'Shippori Mincho'),
  gFont('Shippori Mincho B1', 'shippori-mincho-b1', '"Shippori Mincho B1", serif', 'Shippori+Mincho+B1', ['chinese', 'serif'], 'Shippori Mincho B1'),
  gFont('Shippori Antique', 'shippori-antique', '"Shippori Antique", serif', 'Shippori+Antique', ['chinese', 'serif'], 'Shippori Antique'),
  gFont('Shippori Antique B1', 'shippori-antique-b1', '"Shippori Antique B1", serif', 'Shippori+Antique+B1', ['chinese', 'serif'], 'Shippori Antique B1'),
  gFont('Rampart One', 'rampart-one', '"Rampart One", sans-serif', 'Rampart+One', ['chinese', 'gothic'], 'Rampart One'),
  gFont('Gothic A1', 'gothic-a1', '"Gothic A1", sans-serif', 'Gothic+A1', ['chinese', 'sans'], 'Gothic A1'),
  gFont('Nanum Gothic', 'nanum-gothic', '"Nanum Gothic", sans-serif', 'Nanum+Gothic', ['chinese', 'sans'], 'Nanum Gothic'),
  gFont('Nanum Myeongjo', 'nanum-myeongjo', '"Nanum Myeongjo", serif', 'Nanum+Myeongjo', ['chinese', 'serif'], 'Nanum Myeongjo'),

  // ====================
  // Group 11: 韩系手写 (5 @fontsource)
  // ====================
  gFont('Nanum Pen Script', 'nanum-pen-script', '"Nanum Pen Script", cursive', 'Nanum+Pen+Script', ['chinese', 'handwriting'], 'Nanum Pen'),
  gFont('Nanum Brush Script', 'nanum-brush-script', '"Nanum Brush Script", cursive', 'Nanum+Brush+Script', ['chinese', 'handwriting'], 'Nanum Brush'),
  gFont('Gowun Batang', 'gowun-batang', '"Gowun Batang", serif', 'Gowun+Batang', ['chinese', 'serif'], 'Gowun Batang'),
  gFont('Gowun Dodum', 'gowun-dodum', '"Gowun Dodum", sans-serif', 'Gowun+Dodum', ['chinese', 'sans'], 'Gowun Dodum'),
  gFont('Black Han Sans', 'black-han-sans', '"Black Han Sans", sans-serif', 'Black+Han+Sans', ['chinese', 'gothic'], 'Black Han'),

  // ====================
  // Group 12: 注音/芫荽 (5 @fontsource)
  // ====================
  gFont('注音芫荽', 'bpmf-huninn', '"Bpmf Huninn", sans-serif', 'Bpmf+Huninn', ['chinese', 'sans'], '注音芫荽'),
  gFont('注音Iansui', 'bpmf-iansui', '"Bpmf Iansui", cursive', 'Bpmf+Iansui', ['chinese', 'handwriting'], '注音Iansui'),
  gFont('注音字嗨楷', 'bpmf-zihi-kai-std', '"Bpmf Zihi Kai Std", cursive', 'Bpmf+Zihi+Kai+Std', ['chinese', 'serif'], '注音字嗨楷'),
  gFont('芫荽', 'huninn', '"Huninn", sans-serif', 'Huninn', ['chinese', 'sans'], '芫荽'),
  gFont('Iansui', 'iansui', '"Iansui", cursive', 'Iansui', ['chinese', 'handwriting'], 'Iansui'),

  // ====================
  // Group 13: 昭源/Chiron (3 @fontsource)
  // ====================
  gFont('昭源黑体HK', 'chiron-hei-hk', '"Chiron Hei HK", sans-serif', 'Chiron+Hei+HK', ['chinese', 'sans'], '昭源黑体HK'),
  gFont('昭源宋体HK', 'chiron-sung-hk', '"Chiron Sung HK", serif', 'Chiron+Sung+HK', ['chinese', 'serif'], '昭源宋体HK'),
  gFont('昭源圆体TC', 'chiron-go-round-tc', '"Chiron GoRound TC", sans-serif', 'Chiron+GoRound+TC', ['chinese', 'sans'], '昭源圆体TC'),

  // ====================
  // Group 14: WDXL/Cactus/Chocolate (4 @fontsource)
  // ====================
  gFont('WDXL润滑SC', 'wdxl-lubrifont-sc', '"WDXL Lubrifont SC", sans-serif', 'WDXL+Lubrifont+SC', ['chinese', 'sans'], 'WDXL润滑SC'),
  gFont('WDXL润滑TC', 'wdxl-lubrifont-tc', '"WDXL Lubrifont TC", sans-serif', 'WDXL+Lubrifont+TC', ['chinese', 'sans'], 'WDXL润滑TC'),
  gFont('Cactus古典宋', 'cactus-classical-serif', '"Cactus Classical Serif", serif', 'Cactus+Classical+Serif', ['chinese', 'serif'], 'Cactus古典宋'),
  gFont('Chocolate古典黑', 'chocolate-classical-sans', '"Chocolate Classical Sans", sans-serif', 'Chocolate+Classical+Sans', ['chinese', 'sans'], 'Chocolate古典黑'),

  // ====================
  // Group 15: cn-fontsource 独有 (21 个)
  // ====================
  cnFont('小赖字体SC', 'cn-fontsource-xiaolai-sc-regular', '"XiaoLai SC", sans-serif', ['chinese', 'sans'], '小赖字体SC'),
  cnFont('小赖等宽SC', 'cn-fontsource-xiaolai-mono-sc-regular', '"XiaoLai Mono SC", monospace', ['chinese', 'sans'], '小赖等宽SC'),
  cnFont('思源黑体SC VF', 'cn-fontsource-source-han-sans-sc-vf', '"Source Han Sans SC VF", "Noto Sans SC", sans-serif', ['chinese', 'sans'], '思源黑体SCVF'),
  cnFont('思源宋体SC VF', 'cn-fontsource-source-han-serif-sc-vf', '"Source Han Serif SC VF", "Noto Serif SC", serif', ['chinese', 'serif'], '思源宋体SCVF'),
  cnFont('霞鹜文楷屏幕版R', 'cn-fontsource-lxgw-wen-kai-screen-r', '"LXGW WenKai Screen R", serif', ['chinese', 'serif'], '霞鹜文楷屏R'),
  cnFont('鸿雷板书简体', 'cn-fontsource-honglei-sim', '"HongLeiBanShuJianTi", cursive', ['chinese', 'handwriting'], '鸿雷板书'),
  cnFont('鸿雷行书', 'cn-fontsource-hongleixingshu-regular', '"HongLeiXingShu", cursive', ['chinese', 'handwriting'], '鸿雷行书'),
  cnFont('鸿雷拙书', 'cn-fontsource-hong-lei-zhuo-shu-regular', '"HongLeiZhuoShu", cursive', ['chinese', 'handwriting'], '鸿雷拙书'),
  cnFont('猫啃珠圆体', 'cn-fontsource-maoken-zhuyuan-ti-regular', '"MaoKenZhuYuanTi", sans-serif', ['chinese', 'sans'], '猫啃珠圆体'),
  cnFont('阿米戈德无锋体', 'cn-fontsource-mdmd-wu-feng-ti-regular', '"MDMDWuFengTi", sans-serif', ['chinese', 'sans'], '无锋体'),
  cnFont('阿里妈妈东方大楷', 'cn-fontsource-alimama-dong-fang-da-kai-regular', '"AliMamaDongFangDaKai", serif', ['chinese', 'serif'], '东方大楷'),
  cnFont('钉钉进步体', 'cn-fontsource-ding-talk-jin-bu-ti-regular', '"DingTalk JinBuTi", sans-serif', ['chinese', 'sans'], '钉钉进步体'),
  cnFont('得意黑', 'cn-fontsource-smiley-sans-oblique-regular', '"Smiley Sans Oblique", sans-serif', ['chinese', 'gothic'], '得意黑'),
  cnFont('龙珠体', 'cn-fontsource-long-zhu-ti-regular', '"LongZhuTi", sans-serif', ['chinese', 'sans'], '龙珠体'),
  cnFont('龙珠体SC', 'cn-fontsource-logo-sc-long-zhu-ti-regular', '"LogoScLongZhuTi", sans-serif', ['chinese', 'sans'], '龙珠体SC'),
  cnFont('龙珠体ZHS', 'cn-fontsource-logo-sc-long-zhu-ti-zhs-regular', '"LogoScLongZhuTiZhs", sans-serif', ['chinese', 'sans'], '龙珠体ZHS'),
  cnFont('锋刃黑体', 'cn-fontsource-rii-popkaku-r-regular', '"Rii Popkaku R", sans-serif', ['chinese', 'gothic'], '锋刃黑体'),
  cnFont('手写笔', 'cn-fontsource-rii-tegaki-fude-regular', '"Rii Tegaki Fude", cursive', ['chinese', 'handwriting'], '手写笔'),
  cnFont('新忆季象宋', 'cn-fontsource-fontquan-xin-yi-ji-xiang-song-regular', '"FontQuanXinYiJiXiangSong", serif', ['chinese', 'serif'], '新忆季象宋'),
  cnFont('花染字体', 'cn-fontsource-hanazome-font-regular', '"HanazomeFont", serif', ['chinese', 'serif'], '花染字体'),

  // ====================
  // Group 16: 更多日系/韩系 CJK 补充 (22 @fontsource)
  // ====================
  gFont('DotGothic16', 'dotgothic16', '"DotGothic16", sans-serif', 'DotGothic16', ['chinese', 'gothic'], 'DotGothic16'),
  gFont('Hina Mincho', 'hina-mincho', '"Hina Mincho", serif', 'Hina+Mincho', ['chinese', 'serif'], 'Hina Mincho'),
  gFont('Kiwi Maru', 'kiwi-maru', '"Kiwi Maru", serif', 'Kiwi+Maru', ['chinese', 'serif'], 'Kiwi Maru'),
  gFont('New Tegomin', 'new-tegomin', '"New Tegomin", serif', 'New+Tegomin', ['chinese', 'serif'], 'New Tegomin'),
  gFont('Dongle', 'dongle', '"Dongle", sans-serif', 'Dongle', ['chinese', 'sans'], 'Dongle'),
  gFont('Hi Melody', 'hi-melody', '"Hi Melody", cursive', 'Hi+Melody', ['chinese', 'handwriting'], 'Hi Melody'),
  gFont('Jua', 'jua', '"Jua", sans-serif', 'Jua', ['chinese', 'sans'], 'Jua'),
  gFont('Yeon Sung', 'yeon-sung', '"Yeon Sung", cursive', 'Yeon+Sung', ['chinese', 'handwriting'], 'Yeon Sung'),
  gFont('Do Hyeon', 'do-hyeon', '"Do Hyeon", sans-serif', 'Do+Hyeon', ['chinese', 'sans'], 'Do Hyeon'),
  gFont('Stylish', 'stylish', '"Stylish", serif', 'Stylish', ['chinese', 'serif'], 'Stylish'),
  gFont('Yuji Mai', 'yuji-mai', '"Yuji Mai", serif', 'Yuji+Mai', ['chinese', 'serif'], 'Yuji Mai'),
  gFont('Yuji Syuku', 'yuji-syuku', '"Yuji Syuku", serif', 'Yuji+Syuku', ['chinese', 'serif'], 'Yuji Syuku'),
  gFont('Zen Kaku Gothic New', 'zen-kaku-gothic-new', '"Zen Kaku Gothic New", sans-serif', 'Zen+Kaku+Gothic+New', ['chinese', 'gothic'], 'Zen Gothic'),
  gFont('Zen Old Mincho', 'zen-old-mincho', '"Zen Old Mincho", serif', 'Zen+Old+Mincho', ['chinese', 'serif'], 'Zen Mincho'),
  gFont('Zen Kurenaido', 'zen-kurenaido', '"Zen Kurenaido", sans-serif', 'Zen+Kurenaido', ['chinese', 'sans'], 'Zen Kurenaido'),
  gFont('Zen Maru Gothic', 'zen-maru-gothic', '"Zen Maru Gothic", sans-serif', 'Zen+Maru+Gothic', ['chinese', 'sans'], 'Zen Maru'),
  gFont('Yusei Magic', 'yusei-magic', '"Yusei Magic", sans-serif', 'Yusei+Magic', ['chinese', 'sans'], 'Yusei Magic'),
  gFont('Potta One', 'potta-one', '"Potta One", cursive', 'Potta+One', ['chinese', 'cute'], 'Potta One'),
  gFont('Reggae One', 'reggae-one', '"Reggae One", cursive', 'Reggae+One', ['chinese', 'handwriting'], 'Reggae One'),
  gFont('RocknRoll One', 'rocknroll-one', '"RocknRoll One", sans-serif', 'RocknRoll+One', ['chinese', 'sans'], 'RocknRoll One'),
  gFont('Train One', 'train-one', '"Train One", cursive', 'Train+One', ['chinese', 'handwriting'], 'Train One'),
  gFont('Kaisei Decol', 'kaisei-decol', '"Kaisei Decol", serif', 'Kaisei+Decol', ['chinese', 'serif'], 'Kaisei Decol'),

  // ====================
  // Group 17: 韩系更多 (7 @fontsource)
  // ====================
  gFont('Gugi', 'gugi', '"Gugi", cursive', 'Gugi', ['chinese', 'cute'], 'Gugi'),
  gFont('Dokdo', 'dokdo', '"Dokdo", cursive', 'Dokdo', ['chinese', 'handwriting'], 'Dokdo'),
  gFont('Poor Story', 'poor-story', '"Poor Story", cursive', 'Poor+Story', ['chinese', 'handwriting'], 'Poor Story'),
  gFont('Cute Font', 'cute-font', '"Cute Font", cursive', 'Cute+Font', ['chinese', 'cute'], 'Cute Font'),
  gFont('Single Day', 'single-day', '"Single Day", cursive', 'Single+Day', ['chinese', 'handwriting'], 'Single Day'),
  gFont('Gaegu', 'gaegu', '"Gaegu", cursive', 'Gaegu', ['chinese', 'handwriting'], 'Gaegu'),
  gFont('Sunflower', 'sunflower', '"Sunflower", sans-serif', 'Sunflower', ['chinese', 'sans'], 'Sunflower'),
];

// ====== 验证逻辑 ======

function checkFamilyUniqueness(fonts) {
  const families = new Map();
  const duplicates = [];
  for (const f of fonts) {
    const normalized = f.family.toLowerCase().replace(/['"]/g, '');
    if (families.has(normalized)) {
      duplicates.push({ family: f.family, font1: families.get(normalized), font2: f.name });
    } else {
      families.set(normalized, f.name);
    }
  }
  return duplicates;
}

async function checkUrl(url) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT),
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' },
    });
    const elapsed = Date.now() - start;
    const ct = res.headers.get('content-type') || '';
    const isCss = ct.includes('text') || ct.includes('css');
    let body = '';
    let validCss = false;
    if (isCss && res.status < 400) {
      body = (await res.text()).slice(0, 8192);
      validCss = /@font-face/i.test(body);
    }
    let validFont = false;
    if (!isCss && res.status < 400) {
      const ab = await res.arrayBuffer();
      const head = new Uint8Array(ab.slice(0, 4));
      const hex = Array.from(head).map(b => b.toString(16).padStart(2, '0')).join('');
      validFont = ab.byteLength > 100 && (
        hex.startsWith('774f4632') || hex.startsWith('00010000') || hex.startsWith('4f54544f')
      );
    }
    return { url, status: res.status, ok: res.ok, contentType: ct.slice(0, 80), isCss, validCss, isFont: !isCss, validFont, elapsed };
  } catch (e) {
    return { url, status: 0, ok: false, contentType: '', isCss: false, validCss: false, isFont: false, validFont: false, elapsed: Date.now() - start, error: e.message };
  }
}

async function runConcurrent(items, worker, concurrency) {
  const results = new Array(items.length);
  let idx = 0;
  async function workerFn() {
    while (true) {
      const i = idx++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, workerFn);
  await Promise.all(workers);
  return results;
}

// ====== 主流程 ======
async function main() {
  console.log('='.repeat(60));
  console.log('中文字体 CDN URL 验证 (Rebuild Verify)');
  console.log('='.repeat(60));

  console.log(`\n字体总数: ${CHINESE_FONTS.length}`);

  const dupes = checkFamilyUniqueness(CHINESE_FONTS);
  if (dupes.length > 0) {
    console.log(`\n⚠ 发现 ${dupes.length} 个重复的 font-family:`);
    for (const d of dupes) console.log(`  "${d.family}" -> ${d.font1} 与 ${d.font2}`);
  } else {
    console.log('✓ 所有 font-family 名称唯一');
  }

  let totalSources = 0;
  let fontsWithOneSource = 0;
  const sourceTypeCount = {};
  for (const f of CHINESE_FONTS) {
    totalSources += f.sources.length;
    if (f.sources.length < 2) fontsWithOneSource++;
    for (const s of f.sources) sourceTypeCount[s.type] = (sourceTypeCount[s.type] || 0) + 1;
  }
  console.log(`总 source URL 数: ${totalSources}`);
  console.log(`每字体平均 source 数: ${(totalSources / CHINESE_FONTS.length).toFixed(2)}`);
  console.log(`少于 2 个 source 的字体: ${fontsWithOneSource}`);
  console.log('Source 类型分布:', sourceTypeCount);

  const allUrls = [];
  for (const f of CHINESE_FONTS) {
    for (const s of f.sources) {
      allUrls.push({ font: f.name, family: f.family, type: s.type, priority: s.priority, url: s.url });
    }
  }
  console.log(`\n开始验证 ${allUrls.length} 个 URL (并发: ${CONCURRENCY}, 超时: ${TIMEOUT}ms)...\n`);

  const startTime = Date.now();
  const results = await runConcurrent(allUrls, async (item) => {
    const r = await checkUrl(item.url);
    return { ...item, ...r };
  }, CONCURRENCY);
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`验证完成，耗时 ${totalTime}s\n`);

  let validCount = 0;
  let invalidCount = 0;
  const fontResults = new Map();

  for (const r of results) {
    const isValid = (r.isCss && r.validCss) || (r.isFont && r.validFont);
    if (isValid) validCount++; else invalidCount++;
    if (!fontResults.has(r.font)) fontResults.set(r.font, { total: 0, valid: 0, sources: [] });
    const fr = fontResults.get(r.font);
    fr.total++;
    if (isValid) fr.valid++;
    fr.sources.push(r);
  }

  console.log('='.repeat(60));
  console.log('验证摘要');
  console.log('='.repeat(60));
  console.log(`  总字体数:      ${CHINESE_FONTS.length}`);
  console.log(`  总 URL 数:     ${allUrls.length}`);
  console.log(`  有效 URL:      ${validCount}`);
  console.log(`  无效 URL:      ${invalidCount}`);
  console.log(`  成功率:        ${((validCount / allUrls.length) * 100).toFixed(1)}%`);

  const fullyValid = [];
  const partiallyValid = [];
  const deadFonts = [];
  for (const [name, fr] of fontResults) {
    if (fr.valid === fr.total) fullyValid.push(name);
    else if (fr.valid > 0) partiallyValid.push(name);
    else deadFonts.push(name);
  }
  console.log(`  完全可用:      ${fullyValid.length} 个字体`);
  console.log(`  部分可用:      ${partiallyValid.length} 个字体`);
  console.log(`  完全失效:      ${deadFonts.length} 个字体`);

  const typeStats = {};
  for (const r of results) {
    if (!typeStats[r.type]) typeStats[r.type] = { total: 0, valid: 0 };
    typeStats[r.type].total++;
    if ((r.isCss && r.validCss) || (r.isFont && r.validFont)) typeStats[r.type].valid++;
  }
  console.log('\n--- 按 Source 类型统计 ---');
  for (const [type, stats] of Object.entries(typeStats)) {
    console.log(`  ${type}: ${stats.valid}/${stats.total} (${((stats.valid / stats.total) * 100).toFixed(1)}%)`);
  }

  if (deadFonts.length > 0) {
    console.log(`\n=== 完全失效的字体 (${deadFonts.length} 个) ===`);
    for (const n of deadFonts) console.log(`  ✗ ${n}`);
  }
  if (partiallyValid.length > 0) {
    console.log(`\n=== 部分可用的字体 (${partiallyValid.length} 个) ===`);
    for (const n of partiallyValid) {
      const fr = fontResults.get(n);
      console.log(`  ~ ${n}: ${fr.valid}/${fr.total}`);
    }
  }

  // 写报告
  const lines = [];
  lines.push(`中文字体 CDN URL 验证报告 (Rebuild Verify)`);
  lines.push(`生成时间: ${new Date().toISOString()}`);
  lines.push(`耗时: ${totalTime}s`);
  lines.push('='.repeat(60));
  lines.push(`总字体: ${CHINESE_FONTS.length} | 总 URL: ${allUrls.length} | 有效: ${validCount} | 无效: ${invalidCount}`);
  lines.push(`完全可用: ${fullyValid.length} | 部分可用: ${partiallyValid.length} | 完全失效: ${deadFonts.length}`);
  lines.push('');

  for (let i = 0; i < CHINESE_FONTS.length; i++) {
    const f = CHINESE_FONTS[i];
    const fr = fontResults.get(f.name);
    if (!fr) continue;
    const status = fr.valid === fr.total ? 'OK' : (fr.valid > 0 ? 'PARTIAL' : 'DEAD');
    lines.push(`[${status}] #${i + 1} ${f.name} (${fr.valid}/${fr.total})  family: ${f.family}`);
    for (const s of fr.sources) {
      const isValid = (s.isCss && s.validCss) || (s.isFont && s.validFont);
      const marker = isValid ? '✓' : '✗';
      const info = s.error || `HTTP ${s.status} ${s.contentType}`;
      lines.push(`    ${marker} [${s.type}] ${info}`);
      lines.push(`       ${s.url}`);
    }
    lines.push('');
  }

  lines.push('='.repeat(60));
  lines.push('Source 类型统计');
  lines.push('='.repeat(60));
  for (const [type, stats] of Object.entries(typeStats)) {
    lines.push(`  ${type}: ${stats.valid}/${stats.total} (${((stats.valid / stats.total) * 100).toFixed(1)}%)`);
  }

  lines.push('');
  lines.push('='.repeat(60));
  lines.push('完全失效的字体');
  lines.push('='.repeat(60));
  if (deadFonts.length === 0) lines.push('  无');
  else for (const n of deadFonts) lines.push(`  ✗ ${n}`);

  lines.push('');
  lines.push('='.repeat(60));
  lines.push('部分可用的字体');
  lines.push('='.repeat(60));
  if (partiallyValid.length === 0) lines.push('  无');
  else for (const n of partiallyValid) lines.push(`  ~ ${n}: ${fontResults.get(n).valid}/${fontResults.get(n).total}`);

  fs.writeFileSync(REPORT_PATH, lines.join('\n'));
  console.log(`\n报告已保存: ${REPORT_PATH}`);

  // 返回退出码
  if (deadFonts.length > 10) {
    console.log(`\n⚠ 警告: ${deadFonts.length} 个字体完全失效 (超过 10 个阈值)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });