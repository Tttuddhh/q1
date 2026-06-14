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
  // ===== 思源黑体/Noto Sans SC/TC/HK (3) =====
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

  // ===== 思源宋体/Noto Serif SC/TC/HK (3) =====
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

  // ===== 注音/芫荽 (5) =====
  {
    name: '注音芫荽',
    family: '"Bpmf Huninn", sans-serif',
    googleFontName: 'Bpmf+Huninn',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '注音芫',
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

  // ===== 新增中文字体替代日韩字体 (52) =====
  // Group A: 更多中文手写/书法 (12)
  {
    name: '寒蝉点阵体',
    family: '"Hanchan Dianzhen", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '寒蝉点阵',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanchan-dianzhen-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanchan-dianzhen-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '寒蝉宽黑体',
    family: '"Hanchan Kuanhei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '寒蝉宽黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanchan-kuanhei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanchan-kuanhei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '寒蝉全圆体',
    family: '"Hanchan Quanyuan", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '寒蝉全圆',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanchan-quanyuan-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanchan-quanyuan-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '沐瑶软笔手写体',
    family: '"Muyao Softbrush", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '沐瑶软笔',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-muyao-softbrush-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-muyao-softbrush-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '仓耳渔阳体',
    family: '"Canger Yuyang", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '仓耳渔阳',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-canger-yuyang-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-canger-yuyang-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '仓耳周珂正大榜书',
    family: '"Canger Zhouke", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '仓耳周珂',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-canger-zhouke-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-canger-zhouke-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '仓耳小丸子',
    family: '"Canger Xiaowanzi", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '仓耳小丸子',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-canger-xiaowanzi-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-canger-xiaowanzi-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '飞花宋体',
    family: '"Feihua Song", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '飞花宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-feihua-song-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-feihua-song-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '润植家如印奏章楷',
    family: '"Runzhijia Ruyin", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '润植如印',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-runzhijia-ruyin-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-runzhijia-ruyin-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '字制区喜脉体',
    family: '"Zizhiqu Ximai", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '喜脉体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zizhiqu-ximai-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zizhiqu-ximai-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '江西拙楷',
    family: '"Jiangxi Zhuokai", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '江西拙楷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jiangxi-zhuokai-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jiangxi-zhuokai-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '杨任东竹石体',
    family: '"Yang Rendong Zhushi", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '竹石体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yang-rendong-zhu-shi-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yang-rendong-zhu-shi-ti-regular@latest/font.css', priority: 2 },
    ],
  },

  // Group B: 阿里巴巴/钉钉系列 (8)
  {
    name: '阿里巴巴普惠体',
    family: '"Alibaba PuHuiTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '阿里普惠',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-pu-hui-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-pu-hui-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '阿里妈妈数黑体',
    family: '"AliMama ShuHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '阿里数黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-shu-hei-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-shu-hei-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '阿里妈妈刀隶体',
    family: '"AliMama DaoLi", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '阿里刀隶',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-dao-li-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-dao-li-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '阿里妈妈灵动体',
    family: '"AliMama LingDong", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '阿里灵动',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-ling-dong-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alimama-ling-dong-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '回音体',
    family: '"Huiwen Ti", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '回音体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-huiwen-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-huiwen-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '素材集市康康体',
    family: '"Sucai Kangkang", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '康康体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-sucai-kangkang-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-sucai-kangkang-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '余繁新语',
    family: '"Yufan Xinyu", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '余繁新语',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yufan-xinyu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yufan-xinyu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '三极素纤体',
    family: '"Sanji Suxian", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '三极素纤',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-sanji-suxian-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-sanji-suxian-regular@latest/font.css', priority: 2 },
    ],
  },

  // Group C: 濑户/其他日系中文支持 (5)
  {
    name: '濑户字体',
    family: '"Seto", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '濑户字体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-seto-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-seto-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '庞门正道标题体',
    family: '"PangMenZhengDao", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '庞门正道',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pang-men-zheng-dao-biao-ti-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pang-men-zheng-dao-biao-ti-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '优设标题黑',
    family: '"Youshe BiaotiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '优设标题黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-you-she-biao-ti-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-you-she-biao-ti-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '站酷高端黑',
    family: '"ZCOOL DuanHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '站酷高端黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-duan-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-duan-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '站酷文艺体',
    family: '"ZCOOL WenYi", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '站酷文艺',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-wen-yi-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-wen-yi-regular@latest/font.css', priority: 2 },
    ],
  },

  // Group D: 系统字体 (5)
  {
    name: '微软雅黑',
    family: '"Microsoft YaHei", "PingFang SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '微软雅黑',
    sources: [],
  },
  {
    name: '宋体',
    family: '"SimSun", "STSong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '宋体',
    sources: [],
  },
  {
    name: '黑体',
    family: '"SimHei", "STHeiti", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '黑体',
    sources: [],
  },
  {
    name: '华文仿宋',
    family: '"STFangsong", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '华文仿宋',
    sources: [],
  },
  {
    name: '华文楷体',
    family: '"STKaiti", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '华文楷体',
    sources: [],
  },

  // Group E: 更多cn-fontsource (10)
  {
    name: '汉仪尚巍手书',
    family: '"Hanyi ShangWei", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '尚巍手书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-han-yi-shang-wei-shou-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-han-yi-shang-wei-shou-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '汉仪润圆',
    family: '"Hanyi RunYuan", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '汉仪润圆',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-han-yi-run-yuan-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-han-yi-run-yuan-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '汉仪旗黑',
    family: '"Hanyi QiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '汉仪旗黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-han-yi-qi-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-han-yi-qi-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '造字工房力黑',
    family: '"MakeFont LiHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '造字力黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-make-font-li-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-make-font-li-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '造字工房朗倩',
    family: '"MakeFont LangQian", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '造字朗倩',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-make-font-lang-qian-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-make-font-lang-qian-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '叶根友刀锋黑草',
    family: '"YeGenYou DaoFeng", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '刀锋黑草',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ye-gen-you-dao-feng-hei-cao-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ye-gen-you-dao-feng-hei-cao-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '叶根友毛笔行书',
    family: '"YeGenYou MaoBi", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '毛笔行书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ye-gen-you-mao-bi-xing-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-ye-gen-you-mao-bi-xing-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '禹卫书法行书',
    family: '"YuWei Shufa", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '禹卫行书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yu-wei-shu-fa-xing-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yu-wei-shu-fa-xing-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '李旭科毛笔行书',
    family: '"LiXuKe MaoBi", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '李旭科毛笔',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-li-xu-ke-mao-bi-xing-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-li-xu-ke-mao-bi-xing-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '钟齐流江毛草',
    family: '"ZhongQi LiuJiang", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '钟齐流江',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zhong-qi-liu-jiang-mao-cao-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zhong-qi-liu-jiang-mao-cao-regular@latest/font.css', priority: 2 },
    ],
  },

  // Group F: 最后补充 (12)
  {
    name: '迷你简篆书',
    family: '"Mini Jian Zhuan", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '迷你篆书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mini-jian-zhuan-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mini-jian-zhuan-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '迷你简隶书',
    family: '"Mini Jian Li", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '迷你隶书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mini-jian-li-shu-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-mini-jian-li-shu-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '经典繁方篆',
    family: '"JingDian FangZhuan", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '经典方篆',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jing-dian-fan-fang-zhuan-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jing-dian-fan-fang-zhuan-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '经典繁空叠',
    family: '"JingDian KongDie", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '经典空叠',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jing-dian-fan-kong-die-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jing-dian-fan-kong-die-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '经典繁超黑',
    family: '"JingDian ChaoHei", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '经典超黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jing-dian-fan-chao-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jing-dian-fan-chao-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康海报体',
    family: '"HuaKang HaiBao", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '华康海报',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-hai-bao-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-hai-bao-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康少女文字',
    family: '"HuaKang ShaoNv", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '华康少女',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-shao-nv-wen-zi-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-shao-nv-wen-zi-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康俪金黑',
    family: '"HuaKang LiJin", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '华康俪金',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-li-jin-hei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-li-jin-hei-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康翩翩体',
    family: '"HuaKang PianPian", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '华康翩翩',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-pian-pian-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-pian-pian-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康布丁体',
    family: '"HuaKang BuDing", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '华康布丁',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-bu-ding-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-bu-ding-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康彩带体',
    family: '"HuaKang CaiDai", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '华康彩带',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-cai-dai-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-cai-dai-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康儿风体',
    family: '"HuaKang ErFeng", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '华康儿风',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-er-feng-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-er-feng-ti-regular@latest/font.css', priority: 2 },
    ],
  },
  {
    name: '华康娃娃体',
    family: '"HuaKang WaWa", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '华康娃娃',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-wa-wa-ti-regular/font.css', priority: 1 },
      { type: 'jsdelivr-cn-fontsource-latest', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hua-kang-wa-wa-ti-regular@latest/font.css', priority: 2 },
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
