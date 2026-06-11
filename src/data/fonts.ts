export interface FontSource {
  type: 'google-fonts' | 'jsdelivr-fontsource' | 'jsdelivr-cn-fontsource' | 'jsdelivr-wc1font' | 'cdnfonts' | 'direct';
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
  { key: 'english', labelKey: 'editor.font_category_english' },
  { key: 'other', labelKey: 'editor.font_category_other' },
  { key: 'cute', labelKey: 'editor.font_style_cute' },
  { key: 'gothic', labelKey: 'editor.font_style_gothic' },
  { key: 'handwriting', labelKey: 'editor.font_style_handwriting' },
  { key: 'serif', labelKey: 'editor.font_style_serif' },
  { key: 'sans', labelKey: 'editor.font_style_sans' },
] as const;

export const FONTS: FontData[] = [
  // ===== 思源黑体 (Noto Sans / Source Han Sans) =====
  {
    name: '思源黑体 SC',
    family: '"Noto Sans SC", sans-serif',
    googleFontName: 'Noto+Sans+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC', priority: 2 },
    ],
  },
  {
    name: '思源黑体 TC',
    family: '"Noto Sans TC", sans-serif',
    googleFontName: 'Noto+Sans+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC', priority: 2 },
    ],
  },
  {
    name: '思源黑体 HK',
    family: '"Noto Sans HK", sans-serif',
    googleFontName: 'Noto+Sans+HK',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体HK',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-hk/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+HK', priority: 2 },
    ],
  },
  {
    name: '思源黑体 SC VF',
    family: '"Source Han Sans SC VF", "Noto Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体SCVF',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-sans-sc-vf/font.css', priority: 1 },
    ],
  },
  {
    name: '思源黑体 JP',
    family: '"Noto Sans JP", sans-serif',
    googleFontName: 'Noto+Sans+JP',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体JP',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP', priority: 2 },
    ],
  },

  // ===== 思源宋体 (Noto Serif / Source Han Serif) =====
  {
    name: '思源宋体 SC',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC', priority: 2 },
    ],
  },
  {
    name: '思源宋体 TC',
    family: '"Noto Serif TC", serif',
    googleFontName: 'Noto+Serif+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC', priority: 2 },
    ],
  },
  {
    name: '思源宋体 HK',
    family: '"Noto Serif HK", serif',
    googleFontName: 'Noto+Serif+HK',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体HK',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-hk/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+HK', priority: 2 },
    ],
  },
  {
    name: '思源宋体 SC VF',
    family: '"Source Han Serif SC VF", "Noto Serif SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SCVF',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf/font.css', priority: 1 },
    ],
  },
  {
    name: '思源宋体 JP',
    family: '"Noto Serif JP", serif',
    googleFontName: 'Noto+Serif+JP',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体JP',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-jp/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP', priority: 2 },
    ],
  },

  // ===== 霞鹜文楷系列 (LXGW) =====
  {
    name: '霞鹜文楷 TC',
    family: '"LXGW WenKai TC", serif',
    googleFontName: 'LXGW+WenKai+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC', priority: 2 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版',
    family: '"LXGW WenKai Screen", "LXWenKaiScreen", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷屏',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen/font.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版 R',
    family: '"LXGW WenKai Screen R", "LXWenKaiScreenR", "LXGW WenKai Screen", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷屏R',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen-r/font.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜马克哥特',
    family: '"LXGW Marker Gothic", sans-serif',
    googleFontName: 'LXGW+Marker+Gothic',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '霞鹜马克哥特',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/lxgw-marker-gothic/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic', priority: 2 },
    ],
  },
  {
    name: '霞鹜文楷等宽 TC',
    family: '"LXGW WenKai Mono TC", "LXWenKaiMonoTC", monospace',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷等宽',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-mono-tc/index.css', priority: 1 },
    ],
  },

  // ===== 站酷系列 (ZCOOL) =====
  {
    name: '站酷小薇',
    family: '"ZCOOL XiaoWei", serif',
    googleFontName: 'ZCOOL+XiaoWei',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '站酷小薇',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zcool-xiaowei/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei', priority: 2 },
    ],
  },
  {
    name: '站酷快乐体',
    family: '"ZCOOL KuaiLe", cursive',
    googleFontName: 'ZCOOL+KuaiLe',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '站酷快乐',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zcool-kuaile/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe', priority: 2 },
    ],
  },
  {
    name: '站酷庆科黄油',
    family: '"ZCOOL QingKe HuangYou", cursive',
    googleFontName: 'ZCOOL+QingKe+HuangYou',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '站酷庆科黄油',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zcool-qingke-huangyou/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou', priority: 2 },
    ],
  },

  // ===== 手写/书法 =====
  {
    name: '马善政',
    family: '"Ma Shan Zheng", cursive',
    googleFontName: 'Ma+Shan+Zheng',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '马善政手写',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/ma-shan-zheng/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng', priority: 2 },
    ],
  },
  {
    name: '枝蔓行',
    family: '"Zhi Mang Xing", cursive',
    googleFontName: 'Zhi+Mang+Xing',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '枝蔓行草',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zhi-mang-xing/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing', priority: 2 },
    ],
  },
  {
    name: '龙苍',
    family: '"Long Cang", cursive',
    googleFontName: 'Long+Cang',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '龙苍书法',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/long-cang/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Long+Cang', priority: 2 },
    ],
  },
  {
    name: '刘剑毛笔',
    family: '"Liu Jian Mao Cao", cursive',
    googleFontName: 'Liu+Jian+Mao+Cao',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '刘剑毛笔',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao', priority: 1 },
    ],
  },

  // ===== 演示系列 =====
  {
    name: '演示秋鸿',
    family: '"SlideQiuHong", "演示秋鸿", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示秋鸿',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideqiuhong-regular/font.css', priority: 1 },
    ],
  },

  // ===== 小赖字体 =====
  {
    name: '小赖字体 SC',
    family: '"XiaoLai SC", "XiaoLai", "小赖字体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小赖字体SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-sc-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '小赖等宽 SC',
    family: '"XiaoLai Mono SC", monospace',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小赖等宽SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-mono-sc-regular/font.css', priority: 1 },
    ],
  },

  // ===== 悠哉系列 =====
  {
    name: '悠哉',
    family: '"Yozai", "YouZai", "悠哉", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '悠哉粗体',
    family: '"Yozai Bold", "YouZai Bold", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉粗体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-bold/font.css', priority: 1 },
    ],
  },
  {
    name: '悠哉细体',
    family: '"Yozai Light", "YouZai Light", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉细体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light/font.css', priority: 1 },
    ],
  },
  {
    name: '悠哉细体正体',
    family: '"Yozai Light Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉细体正',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '悠哉中等',
    family: '"Yozai Medium", "YouZai Medium", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉中等',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium-regular/font.css', priority: 1 },
    ],
  },

  // ===== 方正系列 =====
  {
    name: '方正楷体 Z-03',
    family: '"FZKai-Z03", "FZ Kai Z-03", "方正楷体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正楷体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-kai-z-03-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '方正书宋 Z-01',
    family: '"FZShuSong-Z01", "FZ Shu Song Z-01", "方正书宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正书宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-shu-song-z-01-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '方正仿宋 Z-02',
    family: '"FZFangSong-Z02", "FZ Fang Song Z-02", "方正仿宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正仿宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-fang-song-z-02-s-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '方正黑体 B-01',
    family: '"FZHei-B01", "FZ Hei B-01", "方正黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '方正黑体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-hei-b-01-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '方正甲骨文',
    family: '"FZJiaGuWen", "FZ Jia Gu Wen", "方正甲骨文", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正甲骨文',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-jia-gu-wen-regular/font.css', priority: 1 },
    ],
  },

  // ===== 975 圆体 =====
  {
    name: '975 圆体 SC 粗体',
    family: '"975 Maru SC Bold", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体粗',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold/font.css', priority: 1 },
    ],
  },
  {
    name: '975 圆体 SC 中等正体',
    family: '"975 Maru SC Medium Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体中正',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-medium-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '975 圆体 SC',
    family: '"975 Maru SC Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-regular/font.css', priority: 1 },
    ],
  },
  {
    name: 'X12Y16 圆体 Monica',
    family: '"X12Y16PxMaruMonica", "12-16 Maru Monica", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'X12Y16Monica',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-x-12-y-16-px-maru-monica-regular/font.css', priority: 1 },
    ],
  },

  // ===== 昭源系列 (Chiron) =====
  {
    name: '昭源圆体 TC',
    family: '"Chiron GoRound TC", "ChironGoRoundTC", sans-serif',
    googleFontName: 'Chiron+GoRound+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '昭源圆体TC',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC', priority: 1 },
    ],
  },
  {
    name: '昭源黑体 HK',
    family: '"Chiron Hei HK", "ChironHeiHK", sans-serif',
    googleFontName: 'Chiron+Hei+HK',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '昭源黑体HK',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/chiron-hei-hk/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+Hei+HK', priority: 2 },
    ],
  },
  {
    name: '昭源宋体 HK',
    family: '"Chiron Sung HK", "ChironSungHK", serif',
    googleFontName: 'Chiron+Sung+HK',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '昭源宋体HK',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+Sung+HK', priority: 1 },
    ],
  },

  // ===== WDXL 润滑 =====
  {
    name: 'WDXL 润滑 SC',
    family: '"WDXL Lubrifont SC", sans-serif',
    googleFontName: 'WDXL+Lubrifont+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'WDXL润滑SC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/wdxl-lubrifont-sc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+SC', priority: 2 },
    ],
  },
  {
    name: 'WDXL 润滑 TC',
    family: '"WDXL Lubrifont TC", sans-serif',
    googleFontName: 'WDXL+Lubrifont+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'WDXL润滑TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/wdxl-lubrifont-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC', priority: 2 },
    ],
  },

  // ===== Cactus/Chocolate =====
  {
    name: 'Cactus 古典宋',
    family: '"Cactus Classical Serif", serif',
    googleFontName: 'Cactus+Classical+Serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Cactus古典宋',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/cactus-classical-serif/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Cactus+Classical+Serif', priority: 2 },
    ],
  },
  {
    name: 'Chocolate 古典黑',
    family: '"Chocolate Classical Sans", sans-serif',
    googleFontName: 'Chocolate+Classical+Sans',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Chocolate古典黑',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/chocolate-classical-sans/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans', priority: 2 },
    ],
  },

  // ===== 注音系列 =====
  {
    name: '注音芫荽',
    family: '"Bpmf Huninn", "BpmfHuninn", "注音芫荽", sans-serif',
    googleFontName: 'Bpmf+Huninn',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '注音芫荽',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-huninn/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Huninn', priority: 2 },
    ],
  },
  {
    name: '注音 Iansui',
    family: '"Bpmf Iansui", "BpmfIansui", "注音Iansui", cursive',
    googleFontName: 'Bpmf+Iansui',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '注音Iansui',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-iansui/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Iansui', priority: 2 },
    ],
  },
  {
    name: '注音字嗨楷',
    family: '"Bpmf Zihi Kai Std", "BpmfZihiKaiStd", "注音字嗨楷", cursive',
    googleFontName: 'Bpmf+Zihi+Kai+Std',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '注音字嗨楷',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-zihi-kai-std/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Zihi+Kai+Std', priority: 2 },
    ],
  },

  // ===== 芫荽/Iansui 系列 =====
  {
    name: '芫荽',
    family: '"Huninn", "芫荽", sans-serif',
    googleFontName: 'Huninn',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '芫荽',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/huninn/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Huninn', priority: 2 },
    ],
  },
  {
    name: 'Iansui',
    family: '"Iansui", cursive',
    googleFontName: 'Iansui',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Iansui',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/iansui/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Iansui', priority: 2 },
    ],
  },
  {
    name: '芫荽粗黑',
    family: '"Uoq Mun Then Khung", "UoqMunThenKhung", "芫荽粗黑", sans-serif',
    googleFontName: 'UoqMunThenKhung',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '芫荽粗黑',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=UoqMunThenKhung', priority: 1 },
    ],
  },

  // ===== 鸿雷系列 =====
  {
    name: '鸿雷板书简体',
    family: '"HongLeiBanShuJianTi", "鸿雷板书简体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷板书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-sim-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '鸿雷行书',
    family: '"HongLeiXingShu", "鸿雷行书", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷行书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hongleixingshu-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '鸿雷拙书',
    family: '"HongLeiZhuoShu", "鸿雷拙书", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷拙书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hong-lei-zhuo-shu-regular/font.css', priority: 1 },
    ],
  },

  // ===== 花漾/日系 =====
  {
    name: '花染字体',
    family: '"HanazomeFont", "花染", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '花染字体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanazome-font-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '猫啃珠圆体',
    family: '"MaoKenZhuYuanTi", "猫啃珠圆体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '猫啃珠圆体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-maoken-zhuyuan-ti-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '阿米戈德无锋体',
    family: '"MDMDWuFengTi", "阿米戈德无锋体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '无锋体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mdmd-wu-feng-ti-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '阿里妈妈东方大楷',
    family: '"AliMamaDongFangDaKai", "阿里妈妈东方大楷", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '东方大楷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-dong-fang-da-kai-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '钉钉进步体',
    family: '"DingTalk JinBuTi", "钉钉进步体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '钉钉进步体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '得意黑 Smiley Sans',
    family: '"Smiley Sans Oblique", "SmileySans-Oblique", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '得意黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '演示悠然',
    family: '"SlideYouRan", "演示悠然", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示悠然',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideyouran-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '演示佛系体',
    family: '"SlideFu", "演示佛系体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示佛系体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slidefu-regular/font.css', priority: 1 },
    ],
  },

  // ===== 字魂 / 凤凰点阵 / 日系 (LXGW 系列扩展) =====
  {
    name: '霞鹜新晰黑',
    family: '"LXGW Neo XiHei", "LXGWNeoXiHei", "LXGW Marker Gothic", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '霞鹜新晰黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-neo-xi-hei-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜致宋',
    family: '"LXGW Neo ZhiSong", "LXGWNeoZhiSong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜致宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-neo-zhi-song-chs-regular-lxgw-neo-zhi-song/font.css', priority: 1 },
    ],
  },
  {
    name: '龙珠体',
    family: '"LongZhuTi", "龙珠体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '龙珠体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-long-zhu-ti-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '龙珠体 SC',
    family: '"LogoScLongZhuTi", "龙珠体SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '龙珠体SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-logo-sc-long-zhu-ti-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '龙珠体 ZHS',
    family: '"LogoScLongZhuTiZhs", "龙珠体ZHS", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '龙珠体ZHS',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-logo-sc-long-zhu-ti-zhs-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '锋刃黑体',
    family: '"Rii Popkaku R", "锋刃黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '锋刃黑体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-rii-popkaku-r-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '手写笔',
    family: '"Rii Tegaki Fude", "手写笔", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '手写笔',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-rii-tegaki-fude-regular/font.css', priority: 1 },
    ],
  },
  {
    name: '新忆季象宋',
    family: '"FontQuanXinYiJiXiangSong", "新忆季象宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '新忆季象宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fontquan-xin-yi-ji-xiang-song-regular/font.css', priority: 1 },
    ],
  },

  // ===== 日语 (Noto) - 包含中文 =====
  {
    name: '思源黑体 KR',
    family: '"Noto Sans KR", sans-serif',
    googleFontName: 'Noto+Sans+KR',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体KR',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR', priority: 2 },
    ],
  },
  {
    name: '思源宋体 KR',
    family: '"Noto Serif KR", serif',
    googleFontName: 'Noto+Serif+KR',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体KR',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-kr/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR', priority: 2 },
    ],
  },

  // ===== 日语 Klee / Sawarabi / Kosugi / M+ =====
  {
    name: 'Klee One',
    family: '"Klee One", cursive',
    googleFontName: 'Klee+One',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Klee One',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/klee-one/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Klee+One', priority: 2 },
    ],
  },
  {
    name: 'Kosugi',
    family: '"Kosugi", sans-serif',
    googleFontName: 'Kosugi',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Kosugi',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/kosugi/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Kosugi', priority: 2 },
    ],
  },
  {
    name: 'Kosugi Maru',
    family: '"Kosugi Maru", sans-serif',
    googleFontName: 'Kosugi+Maru',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Kosugi Maru',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/kosugi-maru/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru', priority: 2 },
    ],
  },
  {
    name: 'M PLUS 1p',
    family: '"M PLUS 1p", sans-serif',
    googleFontName: 'M+PLUS+1p',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'M PLUS 1p',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/m-plus-1p/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=M+PLUS+1p', priority: 2 },
    ],
  },
  {
    name: 'M PLUS Rounded 1c',
    family: '"M PLUS Rounded 1c", sans-serif',
    googleFontName: 'M+PLUS+Rounded+1c',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'M PLUS 圆 1c',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/m-plus-rounded-1c/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c', priority: 2 },
    ],
  },
  {
    name: 'Sawarabi Gothic',
    family: '"Sawarabi Gothic", sans-serif',
    googleFontName: 'Sawarabi+Gothic',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Sawarabi Gothic',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/sawarabi-gothic/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Sawarabi+Gothic', priority: 2 },
    ],
  },
  {
    name: 'Sawarabi Mincho',
    family: '"Sawarabi Mincho", serif',
    googleFontName: 'Sawarabi+Mincho',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Sawarabi Mincho',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/sawarabi-mincho/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Sawarabi+Mincho', priority: 2 },
    ],
  },
  {
    name: 'Shippori Mincho',
    family: '"Shippori Mincho", serif',
    googleFontName: 'Shippori+Mincho',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Shippori Mincho',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/shippori-mincho/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho', priority: 2 },
    ],
  },
  {
    name: 'Shippori Mincho B1',
    family: '"Shippori Mincho B1", serif',
    googleFontName: 'Shippori+Mincho+B1',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Shippori Mincho B1',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/shippori-mincho-b1/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1', priority: 2 },
    ],
  },
  {
    name: 'Shippori Antique',
    family: '"Shippori Antique", serif',
    googleFontName: 'Shippori+Antique',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Shippori Antique',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/shippori-antique/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Shippori+Antique', priority: 2 },
    ],
  },
  {
    name: 'Shippori Antique B1',
    family: '"Shippori Antique B1", serif',
    googleFontName: 'Shippori+Antique+B1',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Shippori Antique B1',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/shippori-antique-b1/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Shippori+Antique+B1', priority: 2 },
    ],
  },
  {
    name: 'Rampart One',
    family: '"Rampart One", sans-serif',
    googleFontName: 'Rampart+One',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: 'Rampart One',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/rampart-one/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Rampart+One', priority: 2 },
    ],
  },
  {
    name: 'Gothic A1',
    family: '"Gothic A1", sans-serif',
    googleFontName: 'Gothic+A1',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Gothic A1',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/gothic-a1/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Gothic+A1', priority: 2 },
    ],
  },

  // ===== 韩语 (Nanum / Gowun / Gugi / Black Han Sans / Sunflower) =====
  {
    name: 'Nanum Gothic',
    family: '"Nanum Gothic", sans-serif',
    googleFontName: 'Nanum+Gothic',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Nanum Gothic',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/nanum-gothic/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Nanum+Gothic', priority: 2 },
    ],
  },
  {
    name: 'Nanum Myeongjo',
    family: '"Nanum Myeongjo", serif',
    googleFontName: 'Nanum+Myeongjo',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Nanum Myeongjo',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/nanum-myeongjo/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Nanum+Myeongjo', priority: 2 },
    ],
  },
  {
    name: 'Nanum Pen Script',
    family: '"Nanum Pen Script", cursive',
    googleFontName: 'Nanum+Pen+Script',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Nanum Pen',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/nanum-pen-script/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Nanum+Pen+Script', priority: 2 },
    ],
  },
  {
    name: 'Nanum Brush Script',
    family: '"Nanum Brush Script", cursive',
    googleFontName: 'Nanum+Brush+Script',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Nanum Brush',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/nanum-brush-script/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Nanum+Brush+Script', priority: 2 },
    ],
  },
  {
    name: 'Nanum Gothic Coding',
    family: '"Nanum Gothic Coding", monospace',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Nanum Coding',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/nanum-gothic-coding/index.css', priority: 1 },
    ],
  },
  {
    name: 'Gowun Batang',
    family: '"Gowun Batang", serif',
    googleFontName: 'Gowun+Batang',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Gowun Batang',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/gowun-batang/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Gowun+Batang', priority: 2 },
    ],
  },
  {
    name: 'Gowun Dodum',
    family: '"Gowun Dodum", sans-serif',
    googleFontName: 'Gowun+Dodum',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Gowun Dodum',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/gowun-dodum/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Gowun+Dodum', priority: 2 },
    ],
  },
  {
    name: 'Gugi',
    family: '"Gugi", cursive',
    googleFontName: 'Gugi',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: 'Gugi',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/gugi/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Gugi', priority: 2 },
    ],
  },
  {
    name: 'Black Han Sans',
    family: '"Black Han Sans", sans-serif',
    googleFontName: 'Black+Han+Sans',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: 'Black Han',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/black-han-sans/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Black+Han+Sans', priority: 2 },
    ],
  },
  {
    name: 'Dokdo',
    family: '"Dokdo", cursive',
    googleFontName: 'Dokdo',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Dokdo',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/dokdo/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Dokdo', priority: 2 },
    ],
  },
  {
    name: 'Poor Story',
    family: '"Poor Story", cursive',
    googleFontName: 'Poor+Story',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Poor Story',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/poor-story/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Poor+Story', priority: 2 },
    ],
  },
  {
    name: 'Cute Font',
    family: '"Cute Font", cursive',
    googleFontName: 'Cute+Font',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: 'Cute Font',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/cute-font/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Cute+Font', priority: 2 },
    ],
  },
  {
    name: 'Single Day',
    family: '"Single Day", cursive',
    googleFontName: 'Single+Day',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Single Day',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/single-day/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Single+Day', priority: 2 },
    ],
  },
  {
    name: 'Gaegu',
    family: '"Gaegu", cursive',
    googleFontName: 'Gaegu',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Gaegu',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/gaegu/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Gaegu', priority: 2 },
    ],
  },
  {
    name: 'Sunflower',
    family: '"Sunflower", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Sunflower',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/sunflower/index.css', priority: 1 },
    ],
  },
  {
    name: 'Kirang Haerang',
    family: '"Kirang Haerang", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: 'Kirang',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/kirang-haerang/index.css', priority: 1 },
    ],
  },
  {
    name: 'IBM Plex Sans KR',
    family: '"IBM Plex Sans KR", sans-serif',
    googleFontName: 'IBM+Plex+Sans+KR',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'IBM Plex KR',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-kr/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR', priority: 2 },
    ],
  },
  {
    name: '思源蒙古文',
    family: '"Noto Sans Mongolian", sans-serif',
    googleFontName: 'Noto+Sans+Mongolian',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源蒙古文',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-mongolian/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Mongolian', priority: 2 },
    ],
  },

  // ===== 思源 SC 多个字重（变体）=====
  {
    name: '思源黑体 SC Light',
    family: '"Noto Sans SC", sans-serif',
    googleFontName: 'Noto+Sans+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体SC细',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/300.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300', priority: 2 },
    ],
  },
  {
    name: '思源黑体 SC Bold',
    family: '"Noto Sans SC", sans-serif',
    googleFontName: 'Noto+Sans+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体SC粗',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/700.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700', priority: 2 },
    ],
  },
  {
    name: '思源宋体 SC Light',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SC细',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/300.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300', priority: 2 },
    ],
  },
  {
    name: '思源宋体 SC Bold',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SC粗',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/700.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700', priority: 2 },
    ],
  },
  {
    name: '思源黑体 TC Bold',
    family: '"Noto Sans TC", sans-serif',
    googleFontName: 'Noto+Sans+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC粗',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc/700.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700', priority: 2 },
    ],
  },
  {
    name: '思源宋体 TC Bold',
    family: '"Noto Serif TC", serif',
    googleFontName: 'Noto+Serif+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体TC粗',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc/700.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700', priority: 2 },
    ],
  },
  {
    name: '思源黑体 JP Bold',
    family: '"Noto Sans JP", sans-serif',
    googleFontName: 'Noto+Sans+JP',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体JP粗',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/700.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700', priority: 2 },
    ],
  },
  {
    name: '思源黑体 KR Bold',
    family: '"Noto Sans KR", sans-serif',
    googleFontName: 'Noto+Sans+KR',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体KR粗',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr/700.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700', priority: 2 },
    ],
  },
  {
    name: '思源黑体 SC Regular',
    family: '"Noto Sans SC", sans-serif',
    googleFontName: 'Noto+Sans+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体SC中',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/400.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400', priority: 2 },
    ],
  },
  {
    name: '思源黑体 SC Medium',
    family: '"Noto Sans SC", sans-serif',
    googleFontName: 'Noto+Sans+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体SC中',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/500.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500', priority: 2 },
    ],
  },
  {
    name: '思源黑体 TC Light',
    family: '"Noto Sans TC", sans-serif',
    googleFontName: 'Noto+Sans+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC细',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc/300.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300', priority: 2 },
    ],
  },
  {
    name: '思源黑体 TC Regular',
    family: '"Noto Sans TC", sans-serif',
    googleFontName: 'Noto+Sans+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC常',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc/400.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400', priority: 2 },
    ],
  },
  {
    name: '思源黑体 TC Medium',
    family: '"Noto Sans TC", sans-serif',
    googleFontName: 'Noto+Sans+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC中',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc/500.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500', priority: 2 },
    ],
  },
  {
    name: '思源黑体 JP Light',
    family: '"Noto Sans JP", sans-serif',
    googleFontName: 'Noto+Sans+JP',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体JP细',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/300.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300', priority: 2 },
    ],
  },
  {
    name: '思源黑体 JP Regular',
    family: '"Noto Sans JP", sans-serif',
    googleFontName: 'Noto+Sans+JP',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体JP常',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/400.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400', priority: 2 },
    ],
  },
  {
    name: '思源黑体 JP Medium',
    family: '"Noto Sans JP", sans-serif',
    googleFontName: 'Noto+Sans+JP',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体JP中',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/500.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500', priority: 2 },
    ],
  },
  {
    name: '思源宋体 SC Regular',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SC常',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/400.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400', priority: 2 },
    ],
  },
  {
    name: '思源宋体 SC Medium',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SC中',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/500.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500', priority: 2 },
    ],
  },
  {
    name: '思源宋体 SC Black',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SC重',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/900.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@900', priority: 2 },
    ],
  },

  // ===== 英文字体（9 个，按要求保留） =====
  {
    name: 'Roboto',
    family: '"Roboto", sans-serif',
    googleFontName: 'Roboto',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Roboto',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Roboto', priority: 1 },
    ],
  },
  {
    name: 'Open Sans',
    family: '"Open Sans", sans-serif',
    googleFontName: 'Open+Sans',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Open Sans',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Open+Sans', priority: 1 },
    ],
  },
  {
    name: 'Lato',
    family: '"Lato", sans-serif',
    googleFontName: 'Lato',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Lato',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Lato', priority: 1 },
    ],
  },
  {
    name: 'Montserrat',
    family: '"Montserrat", sans-serif',
    googleFontName: 'Montserrat',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Montserrat',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Montserrat', priority: 1 },
    ],
  },
  {
    name: 'Poppins',
    family: '"Poppins", sans-serif',
    googleFontName: 'Poppins',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Poppins',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Poppins', priority: 1 },
    ],
  },
  {
    name: 'Inter',
    family: '"Inter", sans-serif',
    googleFontName: 'Inter',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Inter',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Inter', priority: 1 },
    ],
  },
  {
    name: 'Playfair Display',
    family: '"Playfair Display", serif',
    googleFontName: 'Playfair+Display',
    category: 'english',
    tags: ['english', 'serif'],
    preview: 'Playfair Display',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display', priority: 1 },
    ],
  },
  {
    name: 'Merriweather',
    family: '"Merriweather", serif',
    googleFontName: 'Merriweather',
    category: 'english',
    tags: ['english', 'serif'],
    preview: 'Merriweather',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Merriweather', priority: 1 },
    ],
  },
  {
    name: 'Lora',
    family: '"Lora", serif',
    googleFontName: 'Lora',
    category: 'english',
    tags: ['english', 'serif'],
    preview: 'Lora',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Lora', priority: 1 },
    ],
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
