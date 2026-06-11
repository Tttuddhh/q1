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
  // ===== 思源系列（Noto / Source Han） =====
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Sans%20SC', priority: 3 },
    ],
  },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Serif%20SC', priority: 3 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Sans%20TC', priority: 3 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Serif%20TC', priority: 3 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Sans%20HK', priority: 3 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Serif%20HK', priority: 3 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/source-han-sans-sc-vf/font.css', priority: 2 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/source-han-serif-sc-vf/font.css', priority: 2 },
    ],
  },
  {
    name: '思源黑体 TC VF',
    family: '"Source Han Sans TC VF", "Noto Sans TC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TCVF',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-sans-tc-vf/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/source-han-sans-tc-vf/font.css', priority: 2 },
    ],
  },
  {
    name: '思源宋体 TC VF',
    family: '"Source Han Serif TC VF", "Noto Serif TC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体TCVF',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-tc-vf/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/source-han-serif-tc-vf/font.css', priority: 2 },
    ],
  },
  {
    name: '思源黑体 CN',
    family: '"Source Han Sans CN", "Noto Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体CN',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans%20CN', priority: 1 },
    ],
  },
  {
    name: '思源宋体 CN',
    family: '"Source Han Serif CN", "Noto Serif SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体CN',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif%20CN', priority: 1 },
    ],
  },
  {
    name: '思源黑体 TC (cn-fontsource)',
    family: '"Source Han Sans TC", "Noto Sans TC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC-CN',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans%20TC', priority: 1 },
    ],
  },
  {
    name: '思源宋体 TC (cn-fontsource)',
    family: '"Source Han Serif TC", "Noto Serif TC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体TC-CN',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif%20TC', priority: 1 },
    ],
  },
  {
    name: '思源黑体 HK (cn-fontsource)',
    family: '"Source Han Sans HK", "Noto Sans HK", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体HK-CN',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans%20HK', priority: 1 },
    ],
  },
  {
    name: '思源宋体 HK (cn-fontsource)',
    family: '"Source Han Serif HK", "Noto Serif HK", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体HK-CN',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif%20HK', priority: 1 },
    ],
  },
  {
    name: '思源黑体',
    family: '"Source Han Sans", "Noto Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans', priority: 1 },
    ],
  },
  {
    name: '思源宋体',
    family: '"Source Han Serif", "Noto Serif SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif', priority: 1 },
    ],
  },

  // ===== 霞鹜系列 =====
  {
    name: '霞鹜文楷 TC',
    family: '"LXGW WenKai", "LXGW WenKai TC", serif',
    googleFontName: 'LXGW+WenKai+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC', priority: 2 },
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wenkai-tc/font.css', priority: 3 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wenkai-tc/font.css', priority: 4 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=LXGW%20WenKai%20TC', priority: 5 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版 TC',
    family: '"LXGW WenKai Screen", "LXGW WenKai Screen TC", serif',
    googleFontName: 'LXGW+WenKai+Screen+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷屏TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-screen-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=LXGW+WenKai+Screen+TC', priority: 2 },
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wenkai-screen-tc/font.css', priority: 3 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wenkai-screen-tc/font.css', priority: 4 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=LXGW%20WenKai%20Screen%20TC', priority: 5 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wen-kai-screen/font.css', priority: 2 },
    ],
  },
  {
    name: '霞鹜文楷屏幕版 R',
    family: '"LXGW WenKai Screen R", "LXGW WenKai Screen", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷屏R',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen-r/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wen-kai-screen-r/font.css', priority: 2 },
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
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-marker-gothic/font.css', priority: 3 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lxgw-marker-gothic/font.css', priority: 4 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=LXGW%20Marker%20Gothic', priority: 5 },
    ],
  },
  {
    name: '霞鹜新晰黑',
    family: '"LXGW Neo XiHei", "LXGW Marker Gothic", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '霞鹜新晰黑',
    sources: [
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lxgw-neo-xihei/font.css', priority: 1 },
    ],
  },
  {
    name: '霞鹜希黑 TC',
    family: '"XiHei TC", "LXGW Marker Gothic", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '霞鹜希黑TC',
    sources: [
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/xihei-tc/font.css', priority: 1 },
    ],
  },

  // ===== 站酷系列 =====
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
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-xiaowei/font.css', priority: 3 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zcool-xiaowei/font.css', priority: 4 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=ZCOOL%20XiaoWei', priority: 5 },
    ],
  },
  {
    name: '站酷快乐体',
    family: '"ZCOOL KuaiLe", "ZCOOL KuaiLe SC", cursive',
    googleFontName: 'ZCOOL+KuaiLe',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '站酷快乐',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/zcool-kuaile/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe', priority: 2 },
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-kuaile/font.css', priority: 3 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zcool-kuaile/font.css', priority: 4 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=ZCOOL%20KuaiLe', priority: 5 },
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
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-qingke-huangyou/font.css', priority: 3 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zcool-qingke-huangyou/font.css', priority: 4 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=ZCOOL%20QingKe%20HuangYou', priority: 5 },
    ],
  },
  {
    name: '站酷高端黑',
    family: '"ZCOOL GaoDeHei", "ZCOOL GDH", "站酷高端黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '站酷高端黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-gdh/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zcool-gdh/font.css', priority: 2 },
    ],
  },

  // ===== 中文手写/书法 =====
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/mashan-zheng/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Ma%20Shan%20Zheng', priority: 4 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zhi-mang-xing/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Zhi%20Mang%20Xing', priority: 4 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/long-cang/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Long%20Cang', priority: 4 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Liu%20Jian%20Mao%20Cao', priority: 2 },
    ],
  },
  {
    name: '江西拙楷',
    family: '"JiangXiZhuoKai", "JXZhuoKai", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '江西拙楷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jiangxizhuokai/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/jiangxizhuokai/font.css', priority: 2 },
    ],
  },
  {
    name: '演示夏行楷',
    family: '"YanShiXiaXingKai", "演示夏行楷", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示夏行楷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slidexiaxing/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/slidexiaxing/font.css', priority: 2 },
    ],
  },
  {
    name: '演示佛系体',
    family: '"YanShiFoXi", "演示佛系体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示佛系体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slidefu/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/slidefu/font.css', priority: 2 },
    ],
  },
  {
    name: '演示春风',
    family: '"YanShiChunFeng", "演示春风", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示春风',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slidechunfeng/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/slidechunfeng/font.css', priority: 2 },
    ],
  },
  {
    name: '演示秋鸿',
    family: '"YanShiQiuHong", "演示秋鸿", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示秋鸿',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideqiuhong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/slideqiuhong/font.css', priority: 2 },
    ],
  },
  {
    name: '演示悠然',
    family: '"YanShiYouRan", "演示悠然", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '演示悠然',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-slideyouran/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/slideyouran/font.css', priority: 2 },
    ],
  },
  {
    name: '小赖字体 SC',
    family: '"XiaoLai SC", "XiaoLai", "小赖字体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小赖字体SC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-sc-regular/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/xiaolai-sc-regular/font.css', priority: 2 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/xiaolai-mono-sc-regular/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉',
    family: '"YouZai", "Yozai", "悠哉", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yozai/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉粗体',
    family: '"YouZai Bold", "Yozai Bold", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉粗体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-bold/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yozai-bold/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉细体',
    family: '"YouZai Light", "Yozai Light", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉细体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yozai-light/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉细体正体',
    family: '"YouZai Light Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉细体正',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light-regular/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yozai-light-regular/font.css', priority: 2 },
    ],
  },
  {
    name: '悠哉中等',
    family: '"YouZai Medium", "Yozai Medium", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠哉中等',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yozai-medium/font.css', priority: 2 },
    ],
  },
  {
    name: '方正楷体 Z-03',
    family: '"FZKai-Z03", "FZ Kai Z-03", "方正楷体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正楷体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fz-kai-z-03-regular/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/fz-kai-z-03-regular/font.css', priority: 2 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/fz-shu-song-z-01-regular/font.css', priority: 2 },
    ],
  },
  {
    name: '方正喵魂',
    family: '"FZMiaoHun", "FZ MiaoHun", "方正喵魂", cursive',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '方正喵魂',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fzmh/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/fzmh/font.css', priority: 2 },
    ],
  },

  // ===== 鸿雷系列 =====
  {
    name: '鸿雷板书简体',
    family: '"HongLeiShuBanJianTi", "HouLiBanShuJianTi", "HongLeiBanShuJianTi-1", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷板书',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/honglei/font.css', priority: 2 },
    ],
  },
  {
    name: '鸿雷板书 Regular',
    family: '"HongLei Regular", "HongLei-Regular", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷板书R',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-regular/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/honglei-regular/font.css', priority: 2 },
    ],
  },
  {
    name: '鸿雷板书',
    family: '"HongLeiBanShu", "鸿雷板书", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷板书粗',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-banshu/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/honglei-banshu/font.css', priority: 2 },
    ],
  },
  {
    name: '鸿雷体',
    family: '"HongLei", "鸿雷体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '鸿雷体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-shu/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/honglei-shu/font.css', priority: 2 },
    ],
  },

  // ===== 阿里巴巴 =====
  {
    name: '阿里巴巴普惠体',
    family: '"Alibaba PuHuiTi", "AlibabaSans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '阿里普惠体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Alibaba%20PuHuiTi', priority: 1 },
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti/font.css', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/alibaba-puhuiti/font.css', priority: 3 },
    ],
  },
  {
    name: '阿里巴巴普惠体 2.0',
    family: '"Alibaba PuHuiTi 2.0", "Alibaba PuHuiTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '阿里普惠体2',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti-2/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/alibaba-puhuiti-2/font.css', priority: 2 },
    ],
  },
  {
    name: '阿里巴巴普惠体 3.0',
    family: '"Alibaba PuHuiTi 3.0", "Alibaba PuHuiTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '阿里普惠体3',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti-3/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/alibaba-puhuiti-3/font.css', priority: 2 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Alibaba%20PuHuiTi%203.0', priority: 3 },
      { type: 'direct', url: 'https://gw.alipayobjects.com/os-download/alipay-font/AlibabaPuHuiTi-3-55-Regular.ttf', format: 'ttf', priority: 4 },
    ],
  },
  {
    name: '阿里妈妈方圆体',
    family: '"Alibaba Sans", "阿里妈妈方圆体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '阿里妈妈方圆体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Alibaba%20Sans', priority: 1 },
    ],
  },
  {
    name: '方圆体',
    family: '"FangYuanTi", "方圆体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '方圆体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fangyuanti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/fangyuanti/font.css', priority: 2 },
    ],
  },

  // ===== HarmonyOS / 鸿蒙 =====
  {
    name: 'HarmonyOS Sans SC',
    family: '"HarmonyOS Sans SC", "HarmonyOS_Sans_SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '鸿蒙SansSC',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-harmonyos-sans-sc/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/harmonyos-sans-sc/font.css', priority: 2 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=HarmonyOS%20Sans%20SC', priority: 3 },
      { type: 'direct', url: 'https://developer.huawei.com/images/202403/consumer/HarmonyOS-Sans/SC/HarmonyOS-Sans-SC-Regular.ttf', format: 'ttf', priority: 4 },
    ],
  },
  {
    name: 'HarmonyOS Sans',
    family: '"HarmonyOS Sans", "HarmonyOS-Sans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '鸿蒙Sans',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-harmonyos-sans/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/harmonyos-sans/font.css', priority: 2 },
      { type: 'direct', url: 'https://html-static.xiaomi.com/atom-fonts/HarmonyOS-Sans/HarmonyOS-Sans-Regular.ttf', format: 'ttf', priority: 3 },
    ],
  },
  {
    name: 'HarmonyOS Sans SC Bold',
    family: '"HarmonyOS Sans SC Bold", "HarmonyOS Sans SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '鸿蒙Sans粗',
    sources: [
      { type: 'direct', url: 'https://developer.huawei.com/images/202403/consumer/HarmonyOS-Sans/SC/HarmonyOS-Sans-SC-Bold.ttf', format: 'ttf', priority: 1 },
    ],
  },

  // ===== MiSans / 小米 =====
  {
    name: 'MiSans',
    family: '"MiSans", "MiSans-Latin", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小米MiSans',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-misans/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/misans/font.css', priority: 2 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=MiSans', priority: 3 },
      { type: 'direct', url: 'https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Regular.ttf', format: 'ttf', priority: 4 },
    ],
  },
  {
    name: 'MiSans Bold',
    family: '"MiSans Bold", "MiSans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '小米MiSans粗',
    sources: [
      { type: 'direct', url: 'https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Bold.ttf', format: 'ttf', priority: 1 },
    ],
  },
  {
    name: 'MiSans Latin',
    family: '"MiSans Latin", "MiSans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'MiSansLatin',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=MiSans%20Latin', priority: 1 },
    ],
  },
  {
    name: 'MiSansVF',
    family: '"MiSansVF", "MiSans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'MiSansVF',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=MiSansVF', priority: 1 },
    ],
  },

  // ===== OPPO =====
  {
    name: 'OPPO Sans',
    family: '"OPPOSans", "OPPOSans-H", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'OPPOSans',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-opposans/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/opposans/font.css', priority: 2 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=OPPO%20Sans', priority: 3 },
    ],
  },

  // ===== Smiley Sans / 得意黑 =====
  {
    name: '得意黑',
    family: '"DeYiHei", "Smiley Sans", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '得意黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Smiley%20Sans', priority: 1 },
    ],
  },
  {
    name: 'Smiley Sans Oblique',
    family: '"Smiley Sans", "SmileySans-Oblique", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: 'Smiley斜体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Smiley%20Sans%20Oblique', priority: 1 },
    ],
  },

  // ===== 钉钉 / 抖音 / 斗鱼 =====
  {
    name: '钉钉进步体',
    family: '"DingTalk JinBuTi", "DingTalk-JinBuTi", "DingTalkJinBuTi-Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '钉钉进步体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-dingjin-jinbuti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/dingjin-jinbuti/font.css', priority: 2 },
    ],
  },
  {
    name: '进步体',
    family: '"JinBuTi", "进步体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '进步体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jinbuti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/jinbuti/font.css', priority: 2 },
    ],
  },
  {
    name: '抖音美好体',
    family: '"Douyin MeiHaoTi", "抖音美好体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '抖音美好体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-douyin-meihaoti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/douyin-meihaoti/font.css', priority: 2 },
    ],
  },
  {
    name: '斗鱼追光体',
    family: '"Douyu ZhuiGuangTi", "斗鱼追光体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '斗鱼追光体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-douyu-zhuiguangti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/douyu-zhuiguangti/font.css', priority: 2 },
    ],
  },
  {
    name: '京东',
    family: '"JingDong", "京东", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '京东',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-jingdong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/jingdong/font.css', priority: 2 },
    ],
  },
  {
    name: '道里',
    family: '"DaoLi", "道里", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '道里',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-daoli/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/daoli/font.css', priority: 2 },
    ],
  },
  {
    name: '东方大楷',
    family: '"DongFang DaKai", "东方大楷", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '东方大楷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-dongfangdakai/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/dongfangdakai/font.css', priority: 2 },
    ],
  },

  // ===== 优设 / 庞门正道 =====
  {
    name: '优设标题黑',
    family: '"YouSheBiaoTiHei", "YouShe Title Black", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '优设标题黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-youshe-biaotihei/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/youshe-biaotihei/font.css', priority: 2 },
    ],
  },
  {
    name: '优设鲨鱼菲特',
    family: '"YouSheShayufeite", "优设鲨鱼菲特", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '优设鲨鱼菲特',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-youshe-shayufeite/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/youshe-shayufeite/font.css', priority: 2 },
    ],
  },
  {
    name: '庞门正道',
    family: '"PangMenZhengDao", "庞门正道", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '庞门正道',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao/font.css', priority: 2 },
    ],
  },
  {
    name: '庞门正道标题体',
    family: '"PangMenZhengDao BiaoTiTi", "PangMenZhengDao-BiaoTiTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '庞门正道标题',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-biaoti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-biaoti/font.css', priority: 2 },
    ],
  },
  {
    name: '庞门正道粗体',
    family: '"PangMenZhengDao CuTi", "PangMenZhengDao-CuTi", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '庞门正道粗体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-cushu/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-cushu/font.css', priority: 2 },
    ],
  },
  {
    name: '庞门正道轻松体',
    family: '"PangMenZhengDao Qingsong", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '庞门正道轻松',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-qingsong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-qingsong/font.css', priority: 2 },
    ],
  },
  {
    name: '庞门正道卡通体',
    family: '"PangMenZhengDao Katong", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '庞门正道卡通',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-katong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-katong/font.css', priority: 2 },
    ],
  },

  // ===== 沐瑶 / 包图 / 悠若 =====
  {
    name: '沐瑶软笔刷',
    family: '"MuYao SoftBrush", "沐瑶软笔刷", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '沐瑶软笔刷',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-muyao-softbrush/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/muyao-softbrush/font.css', priority: 2 },
    ],
  },
  {
    name: '沐瑶轻松体',
    family: '"MuYao Qingsong", "沐瑶轻松体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '沐瑶轻松体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-muyao-qingsong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/muyao-qingsong/font.css', priority: 2 },
    ],
  },
  {
    name: '包图小白体',
    family: '"BaoTu XiaoBaiTi", "包图小白体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '包图小白体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-baotu-xiaobaiti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/baotu-xiaobaiti/font.css', priority: 2 },
    ],
  },
  {
    name: '悠若大气宋',
    family: '"YRDZST", "YouRuoDaQiSong", "悠若大气宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '悠若大气宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yrdzst/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yrdzst/font.css', priority: 2 },
    ],
  },
  {
    name: '悠若字体',
    family: '"YRD", "YouRuo", "悠若字体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '悠若字体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yrd/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yrd/font.css', priority: 2 },
    ],
  },

  // ===== 致小波 / 英雄 / 书黑 / 联盟 =====
  {
    name: '致小波-骚包',
    family: '"ZhiXiaoBo Saobao", "致小波骚包", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '致小波骚包',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zhixiaobo-saobao/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zhixiaobo-saobao/font.css', priority: 2 },
    ],
  },
  {
    name: '致小波-真帅',
    family: '"ZhiXiaoBo Zhenshuai", "致小波真帅", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '致小波真帅',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zhixiaobo-zhenshuai/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zhixiaobo-zhenshuai/font.css', priority: 2 },
    ],
  },
  {
    name: '致小波-男神',
    family: '"ZhiXiaoBo Nanshen", "致小波男神", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '致小波男神',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zhixiaobo-nanshen/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zhixiaobo-nanshen/font.css', priority: 2 },
    ],
  },
  {
    name: '英雄骚包体',
    family: '"YingXiong SaobaoTi", "英雄骚包体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '英雄骚包体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-yingxiong-saobaoti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/yingxiong-saobaoti/font.css', priority: 2 },
    ],
  },
  {
    name: '书黑',
    family: '"ShuHei", "书黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '书黑',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-shuhei/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/shuhei/font.css', priority: 2 },
    ],
  },
  {
    name: '书黑体',
    family: '"ShuHeiTi", "书黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '书黑体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-shuheiti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/shuheiti/font.css', priority: 2 },
    ],
  },
  {
    name: '联盟奇迹陆帅正锐',
    family: '"LianMeng QiYi LuShuai Zhengrui", "联盟奇迹陆帅正锐", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '联盟奇迹',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-lianmengqiyi-lushuai-zhengrui/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/lianmengqiyi-lushuai-zhengrui/font.css', priority: 2 },
    ],
  },
  {
    name: '手书体',
    family: '"ShouShuTi", "手书体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '手书体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-shoushuti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/shoushuti/font.css', priority: 2 },
    ],
  },
  {
    name: 'acy 手写体',
    family: '"ACY ShouXieTi", "手写体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'acy手写体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-acy-shouxieti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/acy-shouxieti/font.css', priority: 2 },
    ],
  },
  {
    name: '汉字神字体',
    family: '"HCSZT", "HanZiShen", "汉字神字体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '汉字神字体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hcszt/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/hcszt/font.css', priority: 2 },
    ],
  },
  {
    name: 'AZPPT',
    family: '"AZPPT", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'AZPPT',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-azppt/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/azppt/font.css', priority: 2 },
    ],
  },
  {
    name: '拼音手写体',
    family: '"PinRu ShouXieTi", "拼音手写体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '拼音手写体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-pinru-shouxieti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/pinru-shouxieti/font.css', priority: 2 },
    ],
  },
  {
    name: '心叶念体',
    family: '"XinYe NianTi", "心叶念体", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '心叶念体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-xinye-nianti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/xinye-nianti/font.css', priority: 2 },
    ],
  },
  {
    name: '转化龙',
    family: '"ZhuanHuaLong", "转化龙", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '转化龙',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zhuanhualong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zhuanhualong/font.css', priority: 2 },
    ],
  },
  {
    name: '仓耳鱼',
    family: '"CangErYu", "仓耳鱼", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '仓耳鱼',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-cangeryu/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/cangeryu/font.css', priority: 2 },
    ],
  },
  {
    name: '字魂',
    family: '"ZiHun", "字魂", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '字魂',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-zihui/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/zihui/font.css', priority: 2 },
    ],
  },
  {
    name: '书宋',
    family: '"ShuSong", "书宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '书宋',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-shusong/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/shusong/font.css', priority: 2 },
    ],
  },
  {
    name: '汉仪软圆',
    family: '"HanYi RuanYuan", "汉仪软圆", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '汉仪软圆',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-hanyi-ruanyuan/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/hanyi-ruanyuan/font.css', priority: 2 },
    ],
  },
  {
    name: '齐伋体',
    family: '"QiJiTi", "齐伋体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '齐伋体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-qiyanti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/qiyanti/font.css', priority: 2 },
    ],
  },
  {
    name: '繁体',
    family: '"FanTi", "繁体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '繁体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-fanti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/fanti/font.css', priority: 2 },
    ],
  },
  {
    name: '标合体',
    family: '"BiaoHeTi", "标合体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '标合体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-biaoheti/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/biaoheti/font.css', priority: 2 },
    ],
  },
  {
    name: '美人',
    family: '"Beauty", "美人", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '美人',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-beauty/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/beauty/font.css', priority: 2 },
    ],
  },
  {
    name: '迪北',
    family: '"DinBei", "迪北", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '迪北',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-dinbei/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/dinbei/font.css', priority: 2 },
    ],
  },

  // ===== 975 圆体 SC =====
  {
    name: '975 圆体 SC 粗体',
    family: '"975 Maru SC Bold", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体粗',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-bold/font.css', priority: 2 },
    ],
  },
  {
    name: '975 圆体 SC 粗体正体',
    family: '"975 Maru SC Bold Regular", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体粗正',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold-regular/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-bold-regular/font.css', priority: 2 },
    ],
  },
  {
    name: '975 圆体 SC 中等',
    family: '"975 Maru SC Medium", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体中',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-medium/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-medium/font.css', priority: 2 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-medium-regular/font.css', priority: 2 },
    ],
  },
  {
    name: '975 圆体 SC',
    family: '"975 Maru SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '975圆体',
    sources: [
      { type: 'jsdelivr-cn-fontsource', url: 'https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc/font.css', priority: 1 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc/font.css', priority: 2 },
    ],
  },

  // ===== 原神 =====
  {
    name: '原神 SC',
    family: '"GenshinFontSC", "原神", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '原神SC',
    sources: [
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/genshin-font-sc/font.css', priority: 1 },
    ],
  },

  // ===== 港/台/澳 / 注音 / 繁体 =====
  {
    name: '昭源圆体 TC',
    family: '"Chiron GoRound TC", "ChironGoRoundTC", sans-serif',
    googleFontName: 'Chiron+GoRound+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '昭源圆体TC',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/chiron-go-round-tc/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/chiron-go-round-tc/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Chiron%20GoRound%20TC', priority: 4 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/chiron-hei-hk/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Chiron%20Hei%20HK', priority: 4 },
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
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/chiron-sung-hk/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Chiron+Sung+HK', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/chiron-sung-hk/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Chiron%20Sung%20HK', priority: 4 },
    ],
  },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/wdxl-lubrifont-sc/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=WDXL%20Lubrifont%20SC', priority: 4 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/wdxl-lubrifont-tc/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=WDXL%20Lubrifont%20TC', priority: 4 },
    ],
  },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/cactus-classical-serif/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Cactus%20Classical%20Serif', priority: 4 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/chocolate-classical-sans/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Chocolate%20Classical%20Sans', priority: 4 },
    ],
  },
  {
    name: '注音芫荽',
    family: '"BpmfHuninn", "Bpmf Huninn", "注音芫荽", sans-serif',
    googleFontName: 'Bpmf+Huninn',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '注音芫荽',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-huninn/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Huninn', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/bpmf-huninn/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Bpmf%20Huninn', priority: 4 },
    ],
  },
  {
    name: '注音 Iansui',
    family: '"BpmfIansui", "Bpmf Iansui", "注音Iansui", cursive',
    googleFontName: 'Bpmf+Iansui',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '注音Iansui',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-iansui/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Iansui', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/bpmf-iansui/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Bpmf%20Iansui', priority: 4 },
    ],
  },
  {
    name: '注音字嗨楷',
    family: '"BpmfZihiKaiStd", "Bpmf Zihi Kai Std", "注音字嗨楷", cursive',
    googleFontName: 'Bpmf+Zihi+Kai+Std',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '注音字嗨楷',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/bpmf-zihi-kai-std/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Bpmf+Zihi+Kai+Std', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/bpmf-zihi-kai-std/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Bpmf%20Zihi%20Kai%20Std', priority: 4 },
    ],
  },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/huninn/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Huninn', priority: 4 },
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
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/iansui/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Iansui', priority: 4 },
    ],
  },
  {
    name: '芫荽粗黑',
    family: '"UoqMunThenKhung", "芫荽粗黑", sans-serif',
    googleFontName: 'UoqMunThenKhung',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '芫荽粗黑',
    sources: [
      { type: 'jsdelivr-fontsource', url: 'https://cdn.jsdelivr.net/npm/@fontsource/uoq-mun-then-khung/index.css', priority: 1 },
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=UoqMunThenKhung', priority: 2 },
      { type: 'jsdelivr-wc1font', url: 'https://cdn.jsdelivr.net/npm/@wc1font/uoq-mun-then-khung/font.css', priority: 3 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=UoqMunThenKhung', priority: 4 },
    ],
  },
  {
    name: 'Noto Sans Mono TC',
    family: '"Noto Sans Mono TC", monospace',
    googleFontName: 'Noto+Sans+Mono+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Noto等宽TC',
    sources: [
      { type: 'google-fonts', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Mono+TC', priority: 1 },
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Noto%20Sans%20Mono%20TC', priority: 2 },
    ],
  },

  // ===== Han 系列（简体/繁体 黑体/宋体/楷体/行楷） =====
  {
    name: 'Han Heiti SC',
    family: '"Han Heiti SC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Han黑体SC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Heiti%20SC', priority: 1 },
    ],
  },
  {
    name: 'Han Heiti TC',
    family: '"Han Heiti TC", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Han黑体TC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Heiti%20TC', priority: 1 },
    ],
  },
  {
    name: 'Han Songti SC',
    family: '"Han Songti SC", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Han宋体SC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Songti%20SC', priority: 1 },
    ],
  },
  {
    name: 'Han Kaiti SC',
    family: '"Han Kaiti SC", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Han楷体SC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Kaiti%20SC', priority: 1 },
    ],
  },
  {
    name: 'Han Kaiti TC',
    family: '"Han Kaiti TC", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Han楷体TC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Kaiti%20TC', priority: 1 },
    ],
  },
  {
    name: 'Han Xingkai SC',
    family: '"Han Xingkai SC", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Han行楷SC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Xingkai%20SC', priority: 1 },
    ],
  },
  {
    name: 'Han Xingkai TC',
    family: '"Han Xingkai TC", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Han行楷TC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Han%20Xingkai%20TC', priority: 1 },
    ],
  },
  {
    name: 'BiauKai',
    family: '"BiauKai", "DFKai-SB", "标楷", cursive',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'BiauKai',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=BiauKai', priority: 1 },
    ],
  },
  {
    name: 'Hiragino Sans GB',
    family: '"Hiragino Sans GB", "冬青黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '冬青黑体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Hiragino%20Sans%20GB', priority: 1 },
    ],
  },
  {
    name: 'JhengHei',
    family: '"JhengHei", "正黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '正黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=JhengHei', priority: 1 },
    ],
  },
  {
    name: 'LiHei Pro',
    family: '"LiHei Pro", "粗黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'LiHei Pro',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=LiHei%20Pro', priority: 1 },
    ],
  },
  {
    name: 'LiSong Pro',
    family: '"LiSong Pro", "粗宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'LiSong Pro',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=LiSong%20Pro', priority: 1 },
    ],
  },
  {
    name: 'Microsoft JhengHei',
    family: '"Microsoft JhengHei", "微軟正黑體", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '微软正黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Microsoft%20JhengHei', priority: 1 },
    ],
  },
  {
    name: 'Microsoft YaHei',
    family: '"Microsoft YaHei", "微软雅黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '微软雅黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Microsoft%20YaHei', priority: 1 },
    ],
  },
  {
    name: 'SimHei',
    family: '"SimHei", "黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'SimHei',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=SimHei', priority: 1 },
    ],
  },
  {
    name: 'SimSun',
    family: '"SimSun", "宋体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'SimSun',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=SimSun', priority: 1 },
    ],
  },
  {
    name: 'SimSun-ExtB',
    family: '"SimSun-ExtB", "宋体扩展B", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'SimSun扩展',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=SimSun-ExtB', priority: 1 },
    ],
  },
  {
    name: 'SimKai',
    family: '"SimKai", "楷体", cursive',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'SimKai',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=SimKai', priority: 1 },
    ],
  },
  {
    name: 'Yuanti SC',
    family: '"Yuanti SC", "圆体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '圆体SC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Yuanti%20SC', priority: 1 },
    ],
  },
  {
    name: 'Yuanti TC',
    family: '"Yuanti TC", "圆体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '圆体TC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Yuanti%20TC', priority: 1 },
    ],
  },
  {
    name: 'Heiti SC',
    family: '"Heiti SC", "黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Heiti SC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Heiti%20SC', priority: 1 },
    ],
  },
  {
    name: 'Heiti TC',
    family: '"Heiti TC", "黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Heiti TC',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Heiti%20TC', priority: 1 },
    ],
  },
  {
    name: 'STHeiti',
    family: '"STHeiti", "华文黑体", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '华文黑体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STHeiti', priority: 1 },
    ],
  },
  {
    name: 'STSong',
    family: '"STSong", "华文宋体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '华文宋体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STSong', priority: 1 },
    ],
  },
  {
    name: 'STKaiti',
    family: '"STKaiti", "华文楷体", cursive',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '华文楷体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STKaiti', priority: 1 },
    ],
  },
  {
    name: 'STXingkai',
    family: '"STXingkai", "华文行楷", cursive',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '华文行楷',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STXingkai', priority: 1 },
    ],
  },
  {
    name: 'STFangsong',
    family: '"STFangsong", "华文仿宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '华文仿宋',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STFangsong', priority: 1 },
    ],
  },
  {
    name: 'STZhongsong',
    family: '"STZhongsong", "华文中宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '华文中宋',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STZhongsong', priority: 1 },
    ],
  },
  {
    name: 'STXihei',
    family: '"STXihei", "华文细黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '华文细黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=STXihei', priority: 1 },
    ],
  },
  {
    name: 'FangSong',
    family: '"FangSong", "仿宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '仿宋',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=FangSong', priority: 1 },
    ],
  },
  {
    name: 'FangSong_GB2312',
    family: '"FangSong_GB2312", "仿宋GB2312", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '仿宋GB',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=FangSong_GB2312', priority: 1 },
    ],
  },
  {
    name: 'KaiTi',
    family: '"KaiTi", "楷体", cursive',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '楷体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=KaiTi', priority: 1 },
    ],
  },
  {
    name: 'KaiTi_GB2312',
    family: '"KaiTi_GB2312", "楷体GB2312", cursive',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '楷体GB',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=KaiTi_GB2312', priority: 1 },
    ],
  },
  {
    name: 'FZYaoTi',
    family: '"FZYaoTi", "方正姚体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正姚体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=FZYaoTi', priority: 1 },
    ],
  },
  {
    name: 'FZShuTi',
    family: '"FZShuTi", "方正书宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正书宋',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=FZShuTi', priority: 1 },
    ],
  },
  {
    name: 'FZXiaoBiaoSong-B05S',
    family: '"FZXiaoBiaoSong-B05S", "方正小标宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '方正小标宋',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=FZXiaoBiaoSong-B05S', priority: 1 },
    ],
  },
  {
    name: 'FZXiHei',
    family: '"FZXiHei", "方正细黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '方正细黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=FZXiHei', priority: 1 },
    ],
  },
  {
    name: 'Apple LiGothic',
    family: '"Apple LiGothic", "苹果丽黑", sans-serif',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '苹果丽黑',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Apple%20LiGothic', priority: 1 },
    ],
  },
  {
    name: 'Apple LiSung',
    family: '"Apple LiSung", "苹果丽宋", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '苹果丽宋',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Apple%20LiSung', priority: 1 },
    ],
  },
  {
    name: 'DFKai-SB',
    family: '"DFKai-SB", "标楷体", cursive',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'DFKai',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=DFKai-SB', priority: 1 },
    ],
  },
  {
    name: 'PMingLiU',
    family: '"PMingLiU", "新细明体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '新细明',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=PMingLiU', priority: 1 },
    ],
  },
  {
    name: 'MingLiU',
    family: '"MingLiU", "细明体", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '细明体',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=MingLiU', priority: 1 },
    ],
  },
  {
    name: 'MingLiU_HKSCS',
    family: '"MingLiU_HKSCS", "细明香港增补", serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '细明HK',
    sources: [
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=MingLiU_HKSCS', priority: 1 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Roboto', priority: 2 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Open%20Sans', priority: 2 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Montserrat', priority: 2 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Poppins', priority: 2 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Inter', priority: 2 },
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
      { type: 'cdnfonts', url: 'https://fonts.cdnfonts.com/css?family=Playfair%20Display', priority: 2 },
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
