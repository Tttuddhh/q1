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
  // ===== 手写体 / 书法 (12个) =====
  { name: '马山正楷', family: '"Ma Shan Zheng", cursive', googleFontName: 'Ma+Shan+Zheng', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '华夏文明' },
  { name: '志莽行书', family: '"Zhi Mang Xing", cursive', googleFontName: 'Zhi+Mang+Xing', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '锦绣河山' },
  { name: '龙藏手写', family: '"Long Cang", cursive', googleFontName: 'Long+Cang', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '中华文字' },
  { name: '柳建毛草', family: '"Liu Jian Mao Cao", cursive', googleFontName: 'Liu+Jian+Mao+Cao', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '博大精深' },
  { name: '霞鹜文楷', family: '"LXGW WenKai TC", cursive', googleFontName: 'LXGW+WenKai+TC', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '水墨丹青' },
  { name: '霞鹜文楷等宽', family: '"LXGW WenKai Mono TC", monospace', googleFontName: 'LXGW+WenKai+Mono+TC', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '文房四宝' },
  { name: '站酷小薇', family: '"ZCOOL XiaoWei", serif', googleFontName: 'ZCOOL+XiaoWei', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '书香门第' },
  { name: '站酷快乐', family: '"ZCOOL KuaiLe", cursive', googleFontName: 'ZCOOL+KuaiLe', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '风华正茂' },
  { name: '站酷庆科黄油', family: '"ZCOOL QingKe HuangYou", cursive', googleFontName: 'ZCOOL+QingKe+HuangYou', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '古今中外' },
  { name: '演示佛系体', family: '"Slidefu", cursive', googleFontName: 'Slidefu', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '琴棋书画' },
  { name: '演示悠然小楷', family: '"Yozai", cursive', googleFontName: 'Yozai', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '梅兰竹菊' },
  { name: '演示夏行楷', family: "'Xia Xing Kai', cursive", googleFontName: 'Xia+Xing+Kai', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '风花雪月' },

  // ===== 宋体 / 衬线体 (12个) =====
  { name: '思源宋体简', family: '"Noto Serif SC", serif', googleFontName: 'Noto+Serif+SC', category: 'chinese', tags: ['chinese', 'serif'], preview: '汉字之美' },
  { name: '思源宋体繁', family: '"Noto Serif TC", serif', googleFontName: 'Noto+Serif+TC', category: 'chinese', tags: ['chinese', 'serif'], preview: '笔墨纸砚' },
  { name: '思源宋体港', family: '"Noto Serif HK", serif', googleFontName: 'Noto+Serif+HK', category: 'chinese', tags: ['chinese', 'serif'], preview: '行云流水' },
  { name: '昭源宋体', family: '"Chiron Sung HK", serif', googleFontName: 'Chiron+Sung+HK', category: 'chinese', tags: ['chinese', 'serif'], preview: '龙飞凤舞' },
  { name: '演示春风楷', family: "'ChunFeng Kai', serif", googleFontName: 'ChunFeng+Kai', category: 'chinese', tags: ['chinese', 'serif'], preview: '诗词歌赋' },
  { name: '演示佛系体宋', family: '"Slidefu", serif', googleFontName: 'Slidefu', category: 'chinese', tags: ['chinese', 'serif'], preview: '天地玄黄' },
  { name: '演示悠然小楷宋', family: '"Yozai", serif', googleFontName: 'Yozai', category: 'chinese', tags: ['chinese', 'serif'], preview: '日月星辰' },
  { name: '演示夏行楷宋', family: "'Xia Xing Kai', serif", googleFontName: 'Xia+Xing+Kai', category: 'chinese', tags: ['chinese', 'serif'], preview: '江河湖海' },
  { name: '霞鹜文楷宋', family: '"LXGW WenKai TC", serif', googleFontName: 'LXGW+WenKai+TC', category: 'chinese', tags: ['chinese', 'serif'], preview: '春夏秋冬' },
  { name: '站酷小薇宋', family: '"ZCOOL XiaoWei", serif', googleFontName: 'ZCOOL+XiaoWei', category: 'chinese', tags: ['chinese', 'serif'], preview: '金木水火' },
  { name: '站酷快乐宋', family: '"ZCOOL KuaiLe", serif', googleFontName: 'ZCOOL+KuaiLe', category: 'chinese', tags: ['chinese', 'serif'], preview: '东西南北' },
  { name: '站酷庆科黄油宋', family: '"ZCOOL QingKe HuangYou", serif', googleFontName: 'ZCOOL+QingKe+HuangYou', category: 'chinese', tags: ['chinese', 'serif'], preview: '花鸟鱼虫' },

  // ===== 黑体 / 无衬线体 (12个) =====
  { name: '思源黑体简', family: '"Noto Sans SC", sans-serif', googleFontName: 'Noto+Sans+SC', category: 'chinese', tags: ['chinese', 'sans'], preview: '天地玄黄' },
  { name: '思源黑体繁', family: '"Noto Sans TC", sans-serif', googleFontName: 'Noto+Sans+TC', category: 'chinese', tags: ['chinese', 'sans'], preview: '宇宙洪荒' },
  { name: '思源黑体港', family: '"Noto Sans HK", sans-serif', googleFontName: 'Noto+Sans+HK', category: 'chinese', tags: ['chinese', 'sans'], preview: '日月盈昃' },
  { name: '昭源黑体', family: '"Chiron Hei HK", sans-serif', googleFontName: 'Chiron+Hei+HK', category: 'chinese', tags: ['chinese', 'sans'], preview: '辰宿列张' },
  { name: '昭源圆体', family: '"Chiron GoRound TC", sans-serif', googleFontName: 'Chiron+GoRound+TC', category: 'chinese', tags: ['chinese', 'sans'], preview: '寒来暑往' },
  { name: '润滑体简', family: '"WDXL Lubrifont SC", sans-serif', googleFontName: 'WDXL+Lubrifont+SC', category: 'chinese', tags: ['chinese', 'sans'], preview: '秋收冬藏' },
  { name: '润滑体繁', family: '"WDXL Lubrifont TC", sans-serif', googleFontName: 'WDXL+Lubrifont+TC', category: 'chinese', tags: ['chinese', 'sans'], preview: '闰余成岁' },
  { name: '很黏体', family: '"Huninn", sans-serif', googleFontName: 'Huninn', category: 'chinese', tags: ['chinese', 'sans'], preview: '律吕调阳' },
  { name: '注音很黏', family: '"Bpmf Huninn", sans-serif', googleFontName: 'Bpmf+Huninn', category: 'chinese', tags: ['chinese', 'sans'], preview: '云腾致雨' },
  { name: '注音字嗨楷', family: '"Bpmf Zihi Kai Std", sans-serif', googleFontName: 'Bpmf+Zihi+Kai+Std', category: 'chinese', tags: ['chinese', 'sans'], preview: '露结为霜' },
  { name: '巧克力古典黑', family: '"Chocolate Classical Sans", sans-serif', googleFontName: 'Chocolate+Classical+Sans', category: 'chinese', tags: ['chinese', 'sans'], preview: '金生丽水' },
  { name: '仙人掌古典黑', family: '"Cactus Classical Sans", sans-serif', googleFontName: 'Cactus+Classical+Sans', category: 'chinese', tags: ['chinese', 'sans'], preview: '玉出昆冈' },

  // ===== 可爱风 / 圆体 (8个) =====
  { name: '站酷快乐圆', family: '"ZCOOL KuaiLe", cursive', googleFontName: 'ZCOOL+KuaiLe', category: 'chinese', tags: ['chinese', 'cute'], preview: '剑号巨阙' },
  { name: '站酷庆科黄油圆', family: '"ZCOOL QingKe HuangYou", cursive', googleFontName: 'ZCOOL+QingKe+HuangYou', category: 'chinese', tags: ['chinese', 'cute'], preview: '珠称夜光' },
  { name: '马山正圆', family: '"Ma Shan Zheng", cursive', googleFontName: 'Ma+Shan+Zheng', category: 'chinese', tags: ['chinese', 'cute'], preview: '果珍李柰' },
  { name: '志莽行书圆', family: '"Zhi Mang Xing", cursive', googleFontName: 'Zhi+Mang+Xing', category: 'chinese', tags: ['chinese', 'cute'], preview: '菜重芥姜' },
  { name: '龙藏手写圆', family: '"Long Cang", cursive', googleFontName: 'Long+Cang', category: 'chinese', tags: ['chinese', 'cute'], preview: '海咸河淡' },
  { name: '柳建毛草圆', family: '"Liu Jian Mao Cao", cursive', googleFontName: 'Liu+Jian+Mao+Cao', category: 'chinese', tags: ['chinese', 'cute'], preview: '鳞潜羽翔' },
  { name: '霞鹜文楷圆', family: '"LXGW WenKai TC", cursive', googleFontName: 'LXGW+WenKai+TC', category: 'chinese', tags: ['chinese', 'cute'], preview: '龙师火帝' },
  { name: '站酷小薇圆', family: '"ZCOOL XiaoWei", serif', googleFontName: 'ZCOOL+XiaoWei', category: 'chinese', tags: ['chinese', 'cute'], preview: '鸟官人皇' },

  // ===== 哥特风 / 粗犷风 (6个) =====
  { name: '站酷高端黑', family: '"ZCOOL KuaiLe", sans-serif', googleFontName: 'ZCOOL+KuaiLe', category: 'chinese', tags: ['chinese', 'gothic'], preview: '始制文字' },
  { name: '站酷酷黑', family: '"ZCOOL QingKe HuangYou", sans-serif', googleFontName: 'ZCOOL+QingKe+HuangYou', category: 'chinese', tags: ['chinese', 'gothic'], preview: '乃服衣裳' },
  { name: '马山正黑', family: '"Ma Shan Zheng", sans-serif', googleFontName: 'Ma+Shan+Zheng', category: 'chinese', tags: ['chinese', 'gothic'], preview: '推位让国' },
  { name: '志莽行书黑', family: '"Zhi Mang Xing", sans-serif', googleFontName: 'Zhi+Mang+Xing', category: 'chinese', tags: ['chinese', 'gothic'], preview: '有虞陶唐' },
  { name: '龙藏手写黑', family: '"Long Cang", sans-serif', googleFontName: 'Long+Cang', category: 'chinese', tags: ['chinese', 'gothic'], preview: '吊民伐罪' },
  { name: '柳建毛草黑', family: '"Liu Jian Mao Cao", sans-serif', googleFontName: 'Liu+Jian+Mao+Cao', category: 'chinese', tags: ['chinese', 'gothic'], preview: '周发殷汤' },
];

export const SYSTEM_FONT = {
  name: '系统默认',
  family: 'inherit',
  googleFontName: '',
  category: 'chinese' as const,
  tags: ['chinese'],
  preview: '天地玄黄',
};
