export interface FontData {
  name: string;
  family: string;
  googleFontName: string;
  category: 'chinese' | 'english' | 'other';
  tags: string[];
  preview: string;
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
  {
    name: '思源黑体 SC',
    family: '"Noto Sans SC", sans-serif',
    googleFontName: 'Noto+Sans+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体',
  },

  {
    name: '思源宋体 SC',
    family: '"Noto Serif SC", serif',
    googleFontName: 'Noto+Serif+SC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体',
  },

  {
    name: '思源黑体 HK',
    family: '"Noto Sans HK", sans-serif',
    googleFontName: 'Noto+Sans+HK',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体HK',
  },

  {
    name: '思源宋体 HK',
    family: '"Noto Serif HK", serif',
    googleFontName: 'Noto+Serif+HK',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '思源宋体HK',
  },

  {
    name: '思源黑体 TC',
    family: '"Noto Sans TC", sans-serif',
    googleFontName: 'Noto+Sans+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '思源黑体TC',
  },

  {
    name: '霞鹜文楷 TC',
    family: '"LXGW WenKai TC", serif',
    googleFontName: 'LXGW+WenKai+TC',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '霞鹜文楷TC',
  },

  {
    name: '霞鹜马克哥特',
    family: '"LXGW Marker Gothic", sans-serif',
    googleFontName: 'LXGW+Marker+Gothic',
    category: 'chinese',
    tags: ['chinese', 'gothic'],
    preview: '霞鹜马克哥特',
  },

  {
    name: '站酷小薇',
    family: '"ZCOOL XiaoWei", serif',
    googleFontName: 'ZCOOL+XiaoWei',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '站酷小薇',
  },

  {
    name: '站酷快乐体',
    family: '"ZCOOL KuaiLe", cursive',
    googleFontName: 'ZCOOL+KuaiLe',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '站酷快乐',
  },

  {
    name: '站酷庆科黄油',
    family: '"ZCOOL QingKe HuangYou", cursive',
    googleFontName: 'ZCOOL+QingKe+HuangYou',
    category: 'chinese',
    tags: ['chinese', 'cute'],
    preview: '站酷庆科黄油',
  },

  {
    name: '马善政',
    family: '"Ma Shan Zheng", cursive',
    googleFontName: 'Ma+Shan+Zheng',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '马善政手写',
  },

  {
    name: '枝蔓行',
    family: '"Zhi Mang Xing", cursive',
    googleFontName: 'Zhi+Mang+Xing',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '枝蔓行草',
  },

  {
    name: '龙苍',
    family: '"Long Cang", cursive',
    googleFontName: 'Long+Cang',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '龙苍书法',
  },

  {
    name: '刘剑毛笔',
    family: '"Liu Jian Mao Cao", cursive',
    googleFontName: 'Liu+Jian+Mao+Cao',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '刘剑毛笔',
  },

  {
    name: '昭源圆体 TC',
    family: '"Chiron GoRound TC", sans-serif',
    googleFontName: 'Chiron+GoRound+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '昭源圆体TC',
  },

  {
    name: '昭源黑体 HK',
    family: '"Chiron Hei HK", sans-serif',
    googleFontName: 'Chiron+Hei+HK',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '昭源黑体HK',
  },

  {
    name: '昭源宋体 HK',
    family: '"Chiron Sung HK", serif',
    googleFontName: 'Chiron+Sung+HK',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '昭源宋体HK',
  },

  {
    name: 'WDXL 润滑 SC',
    family: '"WDXL Lubrifont SC", sans-serif',
    googleFontName: 'WDXL+Lubrifont+SC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'WDXL润滑SC',
  },

  {
    name: 'WDXL 润滑 TC',
    family: '"WDXL Lubrifont TC", sans-serif',
    googleFontName: 'WDXL+Lubrifont+TC',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'WDXL润滑TC',
  },

  {
    name: 'WDXL 润滑 JP',
    family: '"WDXL Lubrifont JP N", sans-serif',
    googleFontName: 'WDXL+Lubrifont+JP+N',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'WDXL润滑JP',
  },

  {
    name: 'Cactus 古典宋',
    family: '"Cactus Classical Serif", serif',
    googleFontName: 'Cactus+Classical+Serif',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: 'Cactus古典宋',
  },

  {
    name: 'Chocolate 古典黑',
    family: '"Chocolate Classical Sans", sans-serif',
    googleFontName: 'Chocolate+Classical+Sans',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: 'Chocolate古典黑',
  },

  {
    name: '注音芫荽',
    family: '"Bpmf Huninn", sans-serif',
    googleFontName: 'Bpmf+Huninn',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '注音芫荽',
  },

  {
    name: '注音 Iansui',
    family: '"Bpmf Iansui", cursive',
    googleFontName: 'Bpmf+Iansui',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: '注音Iansui',
  },

  {
    name: '注音字嗨楷',
    family: '"Bpmf Zihi Kai Std", cursive',
    googleFontName: 'Bpmf+Zihi+Kai+Std',
    category: 'chinese',
    tags: ['chinese', 'serif'],
    preview: '注音字嗨楷',
  },

  {
    name: '芫荽',
    family: '"Huninn", sans-serif',
    googleFontName: 'Huninn',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '芫荽',
  },

  {
    name: 'Iansui',
    family: '"Iansui", cursive',
    googleFontName: 'Iansui',
    category: 'chinese',
    tags: ['chinese', 'handwriting'],
    preview: 'Iansui',
  },

  {
    name: '芫荽粗黑',
    family: '"UoqMunThenKhung", sans-serif',
    googleFontName: 'UoqMunThenKhung',
    category: 'chinese',
    tags: ['chinese', 'sans'],
    preview: '芫荽粗黑',
  },

  {
    name: 'Roboto',
    family: '"Roboto", sans-serif',
    googleFontName: 'Roboto',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Roboto',
  },

  {
    name: 'Open Sans',
    family: '"Open Sans", sans-serif',
    googleFontName: 'Open+Sans',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Open Sans',
  },

  {
    name: 'Lato',
    family: '"Lato", sans-serif',
    googleFontName: 'Lato',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Lato',
  },

  {
    name: 'Montserrat',
    family: '"Montserrat", sans-serif',
    googleFontName: 'Montserrat',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Montserrat',
  },

  {
    name: 'Poppins',
    family: '"Poppins", sans-serif',
    googleFontName: 'Poppins',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Poppins',
  },

  {
    name: 'Inter',
    family: '"Inter", sans-serif',
    googleFontName: 'Inter',
    category: 'english',
    tags: ['english', 'sans'],
    preview: 'Inter',
  },

  {
    name: 'Playfair Display',
    family: '"Playfair Display", serif',
    googleFontName: 'Playfair+Display',
    category: 'english',
    tags: ['english', 'serif'],
    preview: 'Playfair Display',
  },

  {
    name: 'Merriweather',
    family: '"Merriweather", serif',
    googleFontName: 'Merriweather',
    category: 'english',
    tags: ['english', 'serif'],
    preview: 'Merriweather',
  },

  {
    name: 'Lora',
    family: '"Lora", serif',
    googleFontName: 'Lora',
    category: 'english',
    tags: ['english', 'serif'],
    preview: 'Lora',
  },
];

export const SYSTEM_FONT = {
  name: '系统默认',
  family: 'inherit',
  googleFontName: '',
  category: 'chinese' as const,
  tags: ['chinese'],
  preview: '天地玄黄',
};
