export interface FontSource {
  type: 'google-fonts' | 'jsdelivr-fontsource' | 'jsdelivr-cn-fontsource' | 'jsdelivr-cn-fontsource-latest' | 'jsdelivr-wc1font' | 'cdnfonts' | 'direct' | 'unpkg-chinese-fonts';
  url: string;
  format?: 'woff2' | 'woff' | 'ttf';
  priority: number;
}

export interface FontData {
  name: string;
  family: string;
  category: 'chinese' | 'english' | 'other';
  tags: string[];
  preview: string;
  sources: FontSource[];
  googleFontName?: string;
}

export const FONT_CATEGORIES = [
  { key: 'all', labelKey: 'editor.font_category_all' },
  { key: 'chinese', labelKey: 'editor.font_category_chinese' },
  { key: 'cute', labelKey: 'editor.font_style_cute' },
  { key: 'gothic', labelKey: 'editor.font_style_gothic' },
  { key: 'handwriting', labelKey: 'editor.font_style_handwriting' },
  { key: 'serif', labelKey: 'editor.font_style_serif' },
  { key: 'sans', labelKey: 'editor.font_style_sans' },
] as const;

// ===== 120 个中文字体 =====
// 来源：@chinese-fonts (npm) + Google Fonts + cn-fontsource + 系统本地字体

export const FONTS: FontData[] = [
  // ===== @chinese-fonts 系列 (60个) =====
  {
    name: '白无常可可体',
    family: '"BWCKKT", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/bwckkt@3.0.0/dist/白无常可可体-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '标小智龙珠体',
    family: '"LogoSC LongZhuTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/bxzlzt@3.0.0/dist/标小智龙珠体/result.css', priority: 1 },
    ],
  },
  {
    name: '仓耳周珂正大榜书',
    family: '"TsangerZhoukeZhengdabangshu", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/cezkzdbs@3.0.0/dist/仓耳周珂正大榜书/result.css', priority: 1 },
    ],
  },
  {
    name: '得意黑',
    family: '"Smiley Sans Oblique", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyh@3.0.0/dist/SmileySans-Oblique/result.css', priority: 1 },
    ],
  },
  {
    name: '抖音美好体',
    family: '"Douyin Sans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dymh@3.0.0/dist/DouyinSansBold/result.css', priority: 1 },
    ],
  },
  {
    name: '斗鱼追光体',
    family: '"DOUYU Font", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/dyzgt@3.0.0/dist/斗鱼追光体/result.css', priority: 1 },
    ],
  },
  {
    name: '飞波正点体',
    family: '"Feibo Zheng Dots", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/fbdzt@3.0.0/dist/飞波正点体V2_1/result.css', priority: 1 },
    ],
  },
  {
    name: '飞花宋体',
    family: '"FlyFlowerSong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/fhst@3.0.0/dist/飞花宋体/result.css', priority: 1 },
    ],
  },
  {
    name: '黄令东齐伋体',
    family: '"QIJIFALLBACK", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hldqjt@3.0.0/dist/qiji-fallback/result.css', priority: 1 },
    ],
  },
  {
    name: '鸿雷行书简体',
    family: '"hongleixingshu", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/hlxsjt@3.0.0/dist/鸿雷行书简体/result.css', priority: 1 },
    ],
  },
  {
    name: '韩契在民体',
    family: '"Hangeuljaemin4.0", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hqzmt@3.0.0/dist/Hangeuljaemin4-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '汇文明朝体',
    family: '"Huiwen-mincho", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/hwmct@3.0.0/dist/汇文明朝体/result.css', priority: 1 },
    ],
  },
  {
    name: '黄引齐招牌体',
    family: '"huangyinqi zhaopai", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/hyqzp@3.0.0/dist/黄引齐招牌体/result.css', priority: 1 },
    ],
  },
  {
    name: '京華老宋体',
    family: '"KingHwa_OldSong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/jhlst@3.0.0/dist/京華老宋体v1_007/result.css', priority: 1 },
    ],
  },
  {
    name: '荆南俊俊体',
    family: '"荆南俊俊体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/jnjj@3.0.0/dist/JUNJUN/result.css', priority: 1 },
    ],
  },
  {
    name: '精品點陣體',
    family: '"BoutiqueBitmap9x9 1.6 R", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/jpdzt@3.0.0/dist/BoutiqueBitmap9x9_1_6/result.css', priority: 1 },
    ],
  },
  {
    name: '江西拙楷',
    family: '"jiangxizhuokai", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/jxzk@3.0.0/dist/江西拙楷/result.css', priority: 1 },
    ],
  },
  {
    name: '快看世界体',
    family: '"快看世界体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/kksjt@3.0.0/dist/kuaikanshijieti20231213/result.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜文楷',
    family: '"LXGW WenKai", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@3.0.0/dist/LXGWWenKai-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜漫黑',
    family: '"LXGW Marker Gothic", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwmanhei@3.0.0/dist/LXGWMarkerGothic/result.css', priority: 1 },
    ],
  },
  {
    name: '猫啃什锦黑',
    family: '"MaokenAssortedSans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mksjh@3.0.0/dist/MaokenAssortedSans/result.css', priority: 1 },
    ],
  },
  {
    name: '猫啃网糖圆体',
    family: '"MaoKenTangYuan (beta)", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mkwtyt@3.0.0/dist/MaoKenTangYuan/result.css', priority: 1 },
    ],
  },
  {
    name: '猫啃珠圆体',
    family: '"MaokenZhuyuanTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/mkzyt@3.0.0/dist/猫啃珠圆体/result.css', priority: 1 },
    ],
  },
  {
    name: '目哉像素体',
    family: '"MuzaiPixel", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mzxst@3.0.0/dist/MZPXorig/result.css', priority: 1 },
    ],
  },
  {
    name: '平方公子体',
    family: '"PING FANG GONG ZI TI", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/pfgzt@3.0.0/dist/平方公子体/result.css', priority: 1 },
    ],
  },
  {
    name: '平方赖江湖琅琊体',
    family: '"平方赖江湖琅琊体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/pfljhlyt@3.0.0/dist/平方赖江湖琅琊体/result.css', priority: 1 },
    ],
  },
  {
    name: '平方赖江湖飞扬体',
    family: '"平方赖江湖飞扬体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pfljhfyt@3.0.0/dist/PingFangLaiJiangHuFeiYangTi-2/result.css', priority: 1 },
    ],
  },
  {
    name: '平方萌萌哒',
    family: '"PING FANG MENG MNEG DA", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/pfmmd@3.0.0/dist/平方萌萌哒/result.css', priority: 1 },
    ],
  },
  {
    name: '旁门正道细线条',
    family: '"PangMenZhengDao-XiXian", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/pmzdxxt@3.0.0/dist/庞门正道细线体/result.css', priority: 1 },
    ],
  },
  {
    name: '千图笔锋手写体',
    family: '"qiantubifengshouxieti", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/qtbfsxt@3.0.0/dist/千图笔锋手写体/result.css', priority: 1 },
    ],
  },
  {
    name: '全小素',
    family: '"QuanPixel 8px", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qxs@3.0.0/dist/quan/result.css', priority: 1 },
    ],
  },
  {
    name: '瑞美加张清平硬笔行书',
    family: '"瑞美加张清平硬笔行书", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/rmjzqpybxs@3.0.0/dist/瑞美加张清平硬笔行书/result.css', priority: 1 },
    ],
  },
  {
    name: '润植家康熙字典美化体',
    family: '"nzgrKangxi", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjkxzdmh@3.0.0/dist/nzgrKangxi/result.css', priority: 1 },
    ],
  },
  {
    name: '润植家如印奏章楷',
    family: '"nzgrRuYinZouZhangKai", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjryzzk@3.0.0/dist/nzgrRuYinZouZhangKai/result.css', priority: 1 },
    ],
  },
  {
    name: '素材集市社会体',
    family: '"SuCaiJiShi-SheHuiTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/scjssh@3.0.0/dist/素材集市社会体/result.css', priority: 1 },
    ],
  },
  {
    name: '随峰体',
    family: '"The Peak Font 隨峰體 Beta", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/sft@3.0.0/dist/随峰体/result.css', priority: 1 },
    ],
  },
  {
    name: '摄图摩登小方体',
    family: '"shetumodengxiaofangti", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/stmdxf@3.0.0/dist/摄图摩登小方体/result.css', priority: 1 },
    ],
  },
  {
    name: '鲨鱼菲特健康体',
    family: '"YouSheShaYuFeiTeJianKangTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/syftjkt@3.0.0/dist/优设鲨鱼菲特健康体/result.css', priority: 1 },
    ],
  },
  {
    name: '思源屏显臻宋',
    family: '"Source Han Serif CN for Display", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/sypxzs@3.0.0/dist/思源屏显臻宋/result.css', priority: 1 },
    ],
  },
  {
    name: '思源宋体',
    family: '"Source Han Serif CN VF", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syst@3.0.0/dist/SourceHanSerifCN/result.css', priority: 1 },
    ],
  },
  {
    name: '铁蒺藜体',
    family: '"Tiejili", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/tjl@3.0.0/dist/Tiejili_Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '小赖体',
    family: '"Xiaolai SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@3.0.0/dist/Xiaolai/result.css', priority: 1 },
    ],
  },
  {
    name: '玄冬楷书',
    family: '"XuandongKaishu", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xuandongkaishu@3.0.0/dist/XuandongKaishu/result.css', priority: 1 },
    ],
  },
  {
    name: '余繁新语',
    family: '"YuFanXinYu", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yfxy@3.0.0/dist/YuFanXinYu-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '一点颜',
    family: '"I.Ngaan", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yidianyan@3.0.0/dist/yidianyan/result.css', priority: 1 },
    ],
  },
  {
    name: '悠哉',
    family: '"Yozai", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@3.0.0/dist/Yozai-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '优设标题黑',
    family: '"YouSheBiaoTiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/ysbth@3.0.0/dist/优设标题黑/result.css', priority: 1 },
    ],
  },
  {
    name: '峄山碑篆体',
    family: '"峄山碑篆体", serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/ysbzt@3.0.0/dist/峄山碑篆体/result.css', priority: 1 },
    ],
  },
  {
    name: '演示佛系体',
    family: '"Slidefu", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysfxt@3.0.0/dist/Slidefu-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '演示悠然小楷',
    family: '"slideyouran", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysyrxk@3.0.0/dist/slideyouran-Regular2_0/result.css', priority: 1 },
    ],
  },
  {
    name: '也字工厂小石头',
    family: '"YEFONTXiaoShiTou", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/yzgcxst@3.0.0/dist/也字工厂小石头/result.css', priority: 1 },
    ],
  },
  {
    name: '有字库龙藏体',
    family: '"Long Cang", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/yzklct@3.0.0/dist/有字库龙藏体/result.css', priority: 1 },
    ],
  },
  {
    name: '字魂扁桃体',
    family: '"zihunbiantaoti", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/zhbtt@3.0.0/dist/字魂扁桃体/result.css', priority: 1 },
    ],
  },
  {
    name: '装甲明朝体',
    family: '"SoukouMincho", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/zjmc@3.0.0/dist/装甲明朝体/result.css', priority: 1 },
    ],
  },
  {
    name: '站酷小薇',
    family: '"xiaowei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/zkxw@3.0.0/dist/站酷小薇LOGO体_猫啃网/result.css', priority: 1 },
    ],
  },
  {
    name: '逐浪萌芽字',
    family: '"ZoomlaMengyas-A080", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/zlmyz@3.0.0/dist/逐浪萌芽字/result.css', priority: 1 },
    ],
  },
  {
    name: '朱雀仿宋',
    family: '"Zhuque Fangsong (technical preview)", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqfs@3.0.0/dist/ZhuqueFangsong-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '钟齐志莽行书',
    family: '"Zhi Mang Xing", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/zqzmxs@3.0.0/dist/钟齐志莽行书/result.css', priority: 1 },
    ],
  },
  {
    name: '字制区喜脉喜欢体',
    family: '"FontQu Smile 常规", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'unpkg-chinese-fonts', url: 'https://unpkg.com/@chinese-fonts/zzqxmxht@3.0.0/dist/字制区喜脉喜欢体/result.css', priority: 1 },
    ],
  },
  {
    name: 'Cubic',
    family: '"Cubic 11", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cubic@3.0.0/dist/Cubic/result.css', priority: 1 },
    ],
  },
  {
    name: 'CEF Fonts CJK',
    family: '"CEF Fonts CJK Mono", monospace',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cef@3.0.0/dist/CEFFontsCJKMono-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜新致宋',
    family: '"LXGW Neo ZhiSong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgw-neo-zhi-song@2.0.0/dist/LXGWNeoZhiSong/result.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜文楷 Bright',
    family: '"LXGW WenKai Bright", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkaibright@2.0.0/dist/LXGWWenKaiBright-Regular/result.css', priority: 1 },
    ],
  },
  {
    name: '重庆山城棒棒体',
    family: '"YunFengZiKuZhongQingShanChengBangBangTi-2", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cqscbbt@2.0.0/dist/重庆山城棒棒体-Regular/result.css', priority: 1 },
    ],
  },

  // ===== Google Fonts 中文系列 (20个) =====
  {
    name: 'Noto Sans SC',
    family: '"Noto Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Noto+Sans+SC',
  },
  {
    name: 'Noto Serif SC',
    family: '"Noto Serif SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Noto+Serif+SC',
  },
  {
    name: 'Noto Sans TC',
    family: '"Noto Sans TC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黃',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Noto+Sans+TC',
  },
  {
    name: 'Noto Serif TC',
    family: '"Noto Serif TC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黃',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Noto+Serif+TC',
  },
  {
    name: 'Noto Sans HK',
    family: '"Noto Sans HK", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Noto+Sans+HK',
  },
  {
    name: 'Noto Serif HK',
    family: '"Noto Serif HK", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+HK:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Noto+Serif+HK',
  },
  {
    name: 'ZCOOL XiaoWei',
    family: '"ZCOOL XiaoWei", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap', priority: 1 },
    ],
    googleFontName: 'ZCOOL+XiaoWei',
  },
  {
    name: 'ZCOOL QingKe HuangYou',
    family: '"ZCOOL QingKe HuangYou", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap', priority: 1 },
    ],
    googleFontName: 'ZCOOL+QingKe+HuangYou',
  },
  {
    name: 'ZCOOL KuaiLe',
    family: '"ZCOOL KuaiLe", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap', priority: 1 },
    ],
    googleFontName: 'ZCOOL+KuaiLe',
  },
  {
    name: 'Ma Shan Zheng',
    family: '"Ma Shan Zheng", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap', priority: 1 },
    ],
    googleFontName: 'Ma+Shan+Zheng',
  },
  {
    name: 'Long Cang',
    family: '"Long Cang", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Long+Cang&display=swap', priority: 1 },
    ],
    googleFontName: 'Long+Cang',
  },
  {
    name: 'Liu Jian Mao Cao',
    family: '"Liu Jian Mao Cao", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&display=swap', priority: 1 },
    ],
    googleFontName: 'Liu+Jian+Mao+Cao',
  },
  {
    name: 'Zhi Mang Xing',
    family: '"Zhi Mang Xing", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap', priority: 1 },
    ],
    googleFontName: 'Zhi+Mang+Xing',
  },
  {
    name: 'LXGW WenKai TC',
    family: '"LXGW WenKai TC", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黃',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap', priority: 1 },
    ],
    googleFontName: 'LXGW+WenKai+TC',
  },
  {
    name: 'LXGW Marker Gothic',
    family: '"LXGW Marker Gothic", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic&display=swap', priority: 1 },
    ],
    googleFontName: 'LXGW+Marker+Gothic',
  },
  {
    name: 'Chiron Hei HK',
    family: '"Chiron Hei HK", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+Hei+HK:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Chiron+Hei+HK',
  },
  {
    name: 'Chiron Sung HK',
    family: '"Chiron Sung HK", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+Sung+HK:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Chiron+Sung+HK',
  },
  {
    name: 'Ysabeau SC',
    family: '"Ysabeau SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@400;700&display=swap', priority: 1 },
    ],
    googleFontName: 'Ysabeau+SC',
  },
  {
    name: 'LXGW Neo XiHei',
    family: '"LXGW Neo XiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+Neo+XiHei&display=swap', priority: 1 },
    ],
    googleFontName: 'LXGW+Neo+XiHei',
  },
  {
    name: 'LXGW WenKai',
    family: '"LXGW WenKai", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai&display=swap', priority: 1 },
    ],
    googleFontName: 'LXGW+WenKai',
  },

  // ===== cn-fontsource 独有 (10个) =====
  {
    name: '钉钉进步体',
    family: '"DingTalk JinBuTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '阿里妈妈东方大楷',
    family: '"Alimama DongFangDaKai", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-dong-fang-da-kai-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '鸿雷行书简体 CN',
    family: '"HongLeiXingShan", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hongleixingshu-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '猫啃珠圆体 CN',
    family: '"MaokenZhuYuan", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-maoken-zhuyuan-ti-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '演示悠然小楷 CN',
    family: '"Slidefu", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideyouran-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '得意黑 Oblique CN',
    family: '"Smiley Sans Oblique", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版 CN',
    family: '"LXGW WenKai Screen", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜新晰黑 CN',
    family: '"LXGW Neo XiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-neo-xi-hei-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '小赖体 CN',
    family: '"Xiaolai SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-sc-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '悠哉字体 CN',
    family: '"Yozai", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai@latest/font.css', priority: 1 },
    ],
  },

  // ===== 额外中文字体 (6个) =====
  {
    name: '站酷庆科黄油体',
    family: '"ZCOOL QingKe HuangYou", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-qingke-huang-you-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '站酷快乐体',
    family: '"ZCOOL KuaiLe", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-kuai-le-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '站酷小薇体',
    family: '"ZCOOL XiaoWei", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-xiao-wei-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '马善政毛笔楷体',
    family: '"Ma Shan Zheng", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ma-shan-zheng-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '站酷高端黑',
    family: '"ZCOOL GaoDuanHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-gao-duan-hei-regular@latest/font.css', priority: 1 },
    ],
  },
  {
    name: '站酷文艺体',
    family: '"ZCOOL WenYiTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-wen-yi-ti-regular@latest/font.css', priority: 1 },
    ],
  },

  // ===== 系统本地中文字体 (20个) =====
  {
    name: '微软雅黑',
    family: '"Microsoft YaHei", "PingFang SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '苹方',
    family: '"PingFang SC", "Microsoft YaHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '思源黑体',
    family: '"Source Han Sans SC", "Noto Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '思源宋体 Local',
    family: '"Source Han Serif SC", "Noto Serif SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '宋体',
    family: '"SimSun", "Songti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '黑体',
    family: '"SimHei", "Heiti SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '楷体',
    family: '"KaiTi", "Kaiti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '仿宋',
    family: '"FangSong", "Fangsong SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '华文细黑',
    family: '"STXihei", "Heiti SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '华文楷体',
    family: '"STKaiti", "Kaiti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '华文宋体',
    family: '"STSong", "Songti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '华文中宋',
    family: '"STZhongsong", "Songti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '华文仿宋',
    family: '"STFangsong", "Fangsong SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '方正舒体',
    family: '"FZShuTi", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '方正姚体',
    family: '"FZYaoti", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '幼圆',
    family: '"YouYuan", "Yuanti SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '新宋体',
    family: '"NSimSun", "Songti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: '细明体',
    family: '"MingLiU", "Songti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: 'Hiragino Sans GB',
    family: '"Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
  {
    name: 'WenQuanYi Micro Hei',
    family: '"WenQuanYi Micro Hei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '天地玄黄',
    sources: [],
  },
];

export const SYSTEM_FONT: FontData = {
  name: '系统默认',
  family: 'inherit',
  category: 'chinese' as const,
  tags: ['chinese'],
  preview: '天地玄黄',
  sources: [],
  googleFontName: '',
};
