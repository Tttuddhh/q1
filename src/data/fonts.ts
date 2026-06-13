export interface FontSource {
  type: 'google-fonts' | 'jsdelivr-fontsource' | 'jsdelivr-cn-fontsource' | 'jsdelivr-cn-fontsource-latest' | 'jsdelivr-wc1font' | 'cdnfonts' | 'direct';
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

export const FONTS: FontData[] = [
  // ===== 思源黑体/Noto Sans (5) =====
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

  // ===== 思源宋体/Noto Serif (5) =====
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

  // ===== 霞鹜/LXGW (5) =====
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
    name: '霞鹜文楷等宽 TC',
    family: '"LXGW WenKai Mono TC", monospace',
    googleFontName: 'LXGW+WenKai+Mono+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷等宽',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-mono-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC', priority: 2 },
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
    name: '霞鹜新晰黑',
    family: '"LXGW Neo XiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '霞鹜新晰黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-neo-xi-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-neo-xi-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版',
    family: '"LXGW WenKai Screen", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷屏',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen@latest/font.css', priority: 2 },
    ],
  },

  // ===== 站酷/ZCOOL (3) =====
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
    preview: '站酷快乐体',
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

  // ===== 手写/书法 (4) =====
  {
    name: '马善政',
    family: '"Ma Shan Zheng", cursive',
    googleFontName: 'Ma+Shan+Zheng',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '马善政',
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
    preview: '枝蔓行',
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
    preview: '龙苍',
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
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/liu-jian-mao-cao/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao', priority: 2 },
    ],
  },

  // ===== 演示/手写 (3) =====
  {
    name: '演示秋鸿',
    family: '"SlideQiuHong", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示秋鸿',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideqiuhong/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideqiuhong@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '演示悠然',
    family: '"SlideYouRan", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示悠然',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideyouran-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideyouran-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '演示佛系体',
    family: '"SlideFu", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示佛系体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slidefu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slidefu-regular@latest/font.css', priority: 2 },
    ],
  },

  // ===== 悠哉/Yozai (5) =====
  {
    name: '悠哉',
    family: '"Yozai", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉粗体',
    family: '"Yozai Bold", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉粗体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-bold/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-bold@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉细体',
    family: '"Yozai Light", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉细体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉中等',
    family: '"Yozai Medium", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉中等',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium@latest/font.css', priority: 2 },
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
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light-regular@latest/font.css', priority: 2 },
    ],
  },

  // ===== 方正/FZ (5) =====
  {
    name: '方正楷体',
    family: '"FZKai-Z03", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正楷体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-kai-z-03-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-kai-z-03-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '方正书宋',
    family: '"FZShuSong-Z01", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正书宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-shu-song-z-01-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-shu-song-z-01-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '方正仿宋',
    family: '"FZFangSong-Z02", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正仿宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-fang-song-z-02-s-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-fang-song-z-02-s-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '方正黑体',
    family: '"FZHei-B01", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '方正黑体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-hei-b-01-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-hei-b-01-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '方正甲骨文',
    family: '"FZJiaGuWen", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正甲骨文',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-jia-gu-wen-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-jia-gu-wen-regular@latest/font.css', priority: 2 },
    ],
  },

  // ===== 975圆体 (4) =====
  {
    name: '975圆体粗体',
    family: '"975 Maru SC Bold", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体粗',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '975圆体中等正体',
    family: '"975 Maru SC Medium Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体中正',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-medium-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-medium-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '975圆体',
    family: '"975 Maru SC Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: 'X12Y16圆体Monica',
    family: '"X12Y16PxMaruMonica", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'X12Y16Monica',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-x-12-y-16-px-maru-monica-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-x-12-y-16-px-maru-monica-regular@latest/font.css', priority: 2 },
    ],
  },

  // ===== 日系/韩系 CJK (15) =====
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
    preview: 'M PLUS 圆1c',
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

  // ===== 韩系手写 (5) =====
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

  // ===== 注音/芫荽 (5) =====
  {
    name: '注音芫荽',
    family: '"Bpmf Huninn", sans-serif',
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
    name: '注音Iansui',
    family: '"Bpmf Iansui", cursive',
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
    family: '"Bpmf Zihi Kai Std", cursive',
    googleFontName: 'Bpmf+Zihi+Kai+Std',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '注音字嗨楷',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-zihi-kai-std/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Zihi+Kai+Std', priority: 2 },
    ],
  },
  {
    name: '芫荽',
    family: '"Huninn", sans-serif',
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

  // ===== 昭源/Chiron (3) =====
  {
    name: '昭源黑体HK',
    family: '"Chiron Hei HK", sans-serif',
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
    name: '昭源宋体HK',
    family: '"Chiron Sung HK", serif',
    googleFontName: 'Chiron+Sung+HK',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '昭源宋体HK',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/chiron-sung-hk/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+Sung+HK', priority: 2 },
    ],
  },
  {
    name: '昭源圆体TC',
    family: '"Chiron GoRound TC", sans-serif',
    googleFontName: 'Chiron+GoRound+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '昭源圆体TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/chiron-go-round-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC', priority: 2 },
    ],
  },

  // ===== WDXL/Cactus/Chocolate (4) =====
  {
    name: 'WDXL润滑SC',
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
    name: 'WDXL润滑TC',
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
  {
    name: 'Cactus古典宋',
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
    name: 'Chocolate古典黑',
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

  // ===== cn-fontsource 独有 (21) =====
  {
    name: '小赖字体SC',
    family: '"XiaoLai SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小赖字体SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-sc-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-sc-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '小赖等宽SC',
    family: '"XiaoLai Mono SC", monospace',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小赖等宽SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-mono-sc-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-mono-sc-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '思源黑体SC VF',
    family: '"Source Han Sans SC VF", "Noto Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体SCVF',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-sans-sc-vf/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-sans-sc-vf@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '思源宋体SC VF',
    family: '"Source Han Serif SC VF", "Noto Serif SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体SCVF',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版R',
    family: '"LXGW WenKai Screen R", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷屏R',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen-r/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen-r@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '鸿雷板书简体',
    family: '"HongLeiBanShuJianTi", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷板书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-sim/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-sim@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '鸿雷行书',
    family: '"HongLeiXingShu", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷行书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hongleixingshu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hongleixingshu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '鸿雷拙书',
    family: '"HongLeiZhuoShu", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷拙书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hong-lei-zhuo-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hong-lei-zhuo-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '猫啃珠圆体',
    family: '"MaoKenZhuYuanTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '猫啃珠圆体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-maoken-zhuyuan-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-maoken-zhuyuan-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '阿米戈德无锋体',
    family: '"MDMDWuFengTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '无锋体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mdmd-wu-feng-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mdmd-wu-feng-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '阿里妈妈东方大楷',
    family: '"AliMamaDongFangDaKai", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '东方大楷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-dong-fang-da-kai-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-dong-fang-da-kai-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '钉钉进步体',
    family: '"DingTalk JinBuTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '钉钉进步体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ding-talk-jin-bu-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '得意黑',
    family: '"Smiley Sans Oblique", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '得意黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '龙珠体',
    family: '"LongZhuTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '龙珠体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-long-zhu-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-long-zhu-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '龙珠体SC',
    family: '"LogoScLongZhuTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '龙珠体SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-logo-sc-long-zhu-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-logo-sc-long-zhu-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '龙珠体ZHS',
    family: '"LogoScLongZhuTiZhs", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '龙珠体ZHS',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-logo-sc-long-zhu-ti-zhs-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-logo-sc-long-zhu-ti-zhs-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '锋刃黑体',
    family: '"Rii Popkaku R", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '锋刃黑体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-rii-popkaku-r-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-rii-popkaku-r-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '手写笔',
    family: '"Rii Tegaki Fude", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '手写笔',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-rii-tegaki-fude-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-rii-tegaki-fude-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '新忆季象宋',
    family: '"FontQuanXinYiJiXiangSong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '新忆季象宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fontquan-xin-yi-ji-xiang-song-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fontquan-xin-yi-ji-xiang-song-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '花染字体',
    family: '"HanazomeFont", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '花染字体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanazome-font-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanazome-font-regular@latest/font.css', priority: 2 },
    ],
  },

  // ===== 日系/韩系 CJK 补充 (22) =====
  {
    name: 'DotGothic16',
    family: '"DotGothic16", sans-serif',
    googleFontName: 'DotGothic16',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: 'DotGothic16',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/dotgothic16/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=DotGothic16', priority: 2 },
    ],
  },
  {
    name: 'Hina Mincho',
    family: '"Hina Mincho", serif',
    googleFontName: 'Hina+Mincho',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Hina Mincho',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/hina-mincho/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Hina+Mincho', priority: 2 },
    ],
  },
  {
    name: 'Kiwi Maru',
    family: '"Kiwi Maru", serif',
    googleFontName: 'Kiwi+Maru',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Kiwi Maru',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/kiwi-maru/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Kiwi+Maru', priority: 2 },
    ],
  },
  {
    name: 'New Tegomin',
    family: '"New Tegomin", serif',
    googleFontName: 'New+Tegomin',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'New Tegomin',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/new-tegomin/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=New+Tegomin', priority: 2 },
    ],
  },
  {
    name: 'Dongle',
    family: '"Dongle", sans-serif',
    googleFontName: 'Dongle',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Dongle',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/dongle/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Dongle', priority: 2 },
    ],
  },
  {
    name: 'Hi Melody',
    family: '"Hi Melody", cursive',
    googleFontName: 'Hi+Melody',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Hi Melody',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/hi-melody/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Hi+Melody', priority: 2 },
    ],
  },
  {
    name: 'Jua',
    family: '"Jua", sans-serif',
    googleFontName: 'Jua',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Jua',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/jua/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Jua', priority: 2 },
    ],
  },
  {
    name: 'Yeon Sung',
    family: '"Yeon Sung", cursive',
    googleFontName: 'Yeon+Sung',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Yeon Sung',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/yeon-sung/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Yeon+Sung', priority: 2 },
    ],
  },
  {
    name: 'Do Hyeon',
    family: '"Do Hyeon", sans-serif',
    googleFontName: 'Do+Hyeon',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Do Hyeon',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/do-hyeon/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Do+Hyeon', priority: 2 },
    ],
  },
  {
    name: 'Stylish',
    family: '"Stylish", serif',
    googleFontName: 'Stylish',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Stylish',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/stylish/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Stylish', priority: 2 },
    ],
  },
  {
    name: 'Yuji Mai',
    family: '"Yuji Mai", serif',
    googleFontName: 'Yuji+Mai',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Yuji Mai',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/yuji-mai/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Yuji+Mai', priority: 2 },
    ],
  },
  {
    name: 'Yuji Syuku',
    family: '"Yuji Syuku", serif',
    googleFontName: 'Yuji+Syuku',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Yuji Syuku',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/yuji-syuku/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Yuji+Syuku', priority: 2 },
    ],
  },
  {
    name: 'Zen Kaku Gothic New',
    family: '"Zen Kaku Gothic New", sans-serif',
    googleFontName: 'Zen+Kaku+Gothic+New',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: 'Zen Gothic',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zen-kaku-gothic-new/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New', priority: 2 },
    ],
  },
  {
    name: 'Zen Old Mincho',
    family: '"Zen Old Mincho", serif',
    googleFontName: 'Zen+Old+Mincho',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Zen Mincho',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zen-old-mincho/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Zen+Old+Mincho', priority: 2 },
    ],
  },
  {
    name: 'Zen Kurenaido',
    family: '"Zen Kurenaido", sans-serif',
    googleFontName: 'Zen+Kurenaido',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Zen Kurenaido',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zen-kurenaido/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Zen+Kurenaido', priority: 2 },
    ],
  },
  {
    name: 'Zen Maru Gothic',
    family: '"Zen Maru Gothic", sans-serif',
    googleFontName: 'Zen+Maru+Gothic',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Zen Maru',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zen-maru-gothic/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic', priority: 2 },
    ],
  },
  {
    name: 'Yusei Magic',
    family: '"Yusei Magic", sans-serif',
    googleFontName: 'Yusei+Magic',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Yusei Magic',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/yusei-magic/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Yusei+Magic', priority: 2 },
    ],
  },
  {
    name: 'Potta One',
    family: '"Potta One", cursive',
    googleFontName: 'Potta+One',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: 'Potta One',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/potta-one/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Potta+One', priority: 2 },
    ],
  },
  {
    name: 'Reggae One',
    family: '"Reggae One", cursive',
    googleFontName: 'Reggae+One',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Reggae One',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/reggae-one/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Reggae+One', priority: 2 },
    ],
  },
  {
    name: 'RocknRoll One',
    family: '"RocknRoll One", sans-serif',
    googleFontName: 'RocknRoll+One',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'RocknRoll One',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/rocknroll-one/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=RocknRoll+One', priority: 2 },
    ],
  },
  {
    name: 'Train One',
    family: '"Train One", cursive',
    googleFontName: 'Train+One',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Train One',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/train-one/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Train+One', priority: 2 },
    ],
  },
  {
    name: 'Kaisei Decol',
    family: '"Kaisei Decol", serif',
    googleFontName: 'Kaisei+Decol',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Kaisei Decol',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/kaisei-decol/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Kaisei+Decol', priority: 2 },
    ],
  },

  // ===== 韩系更多 (7) =====
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
    googleFontName: 'Sunflower',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Sunflower',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/sunflower/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Sunflower', priority: 2 },
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