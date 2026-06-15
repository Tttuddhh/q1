export interface FontData {
  name: string;
  family: string;
  fontId: string;
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
  { name: '马山正楷', family: '"Ma Shan Zheng", cursive', fontId: 'ma-shan-zheng', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '华夏文明' },
  { name: '志莽行书', family: '"Zhi Mang Xing", cursive', fontId: 'zhi-mang-xing', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '锦绣河山' },
  { name: '龙藏手写', family: '"Long Cang", cursive', fontId: 'long-cang', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '中华文字' },
  { name: '柳建毛草', family: '"Liu Jian Mao Cao", cursive', fontId: 'liu-jian-mao-cao', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '博大精深' },
  { name: '站酷小薇', family: '"ZCOOL XiaoWei", serif', fontId: 'zcool-xiaowei', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '书香门第' },
  { name: '站酷快乐', family: '"ZCOOL KuaiLe", cursive', fontId: 'zcool-kuaile', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '风华正茂' },
  { name: '站酷庆科黄油', family: '"ZCOOL QingKe HuangYou", cursive', fontId: 'zcool-qingke-huangyou', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '琴棋书画' },
  { name: '霞鹜文楷等宽', family: '"LXGW WenKai Mono TC", monospace', fontId: 'lxgw-wenkai-mono-tc', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '文房四宝' },
  { name: '霞鹜标记哥特', family: '"LXGW Marker Gothic", sans-serif', fontId: 'lxgw-marker-gothic', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '水墨丹青' },
  { name: '德拉黑体', family: '"Dela Gothic One", sans-serif', fontId: 'dela-gothic-one', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '梅兰竹菊' },
  { name: '黑韩体', family: '"Black Han Sans", sans-serif', fontId: 'black-han-sans', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '风花雪月' },
  { name: '禅角黑', family: '"Zen Kaku Gothic New", sans-serif', fontId: 'zen-kaku-gothic-new', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '春夏秋冬' },

  // ===== 宋体 / 衬线体 (12个) =====
  { name: '思源宋体', family: '"Noto Serif SC", serif', fontId: 'noto-serif-sc', category: 'chinese', tags: ['chinese', 'serif'], preview: '汉字之美' },
  { name: '悠宋体', family: '"UoqMunThenKhung", serif', fontId: 'uoqmunthenkhung', category: 'chinese', tags: ['chinese', 'serif'], preview: '诗词歌赋' },
  { name: '日文明朝', family: '"Noto Serif JP", serif', fontId: 'noto-serif-jp', category: 'chinese', tags: ['chinese', 'serif'], preview: '天地玄黄' },
  { name: '细明朝', family: '"Hina Mincho", serif', fontId: 'hina-mincho', category: 'chinese', tags: ['chinese', 'serif'], preview: '日月星辰' },
  { name: '石井明朝', family: '"Shippori Mincho", serif', fontId: 'shippori-mincho', category: 'chinese', tags: ['chinese', 'serif'], preview: '江河湖海' },
  { name: '泽泻明朝', family: '"Sawarabi Mincho", serif', fontId: 'sawarabi-mincho', category: 'chinese', tags: ['chinese', 'serif'], preview: '春夏秋冬' },
  { name: '商务明朝', family: '"BIZ UDMincho", serif', fontId: 'biz-udmincho', category: 'chinese', tags: ['chinese', 'serif'], preview: '金木水火' },
  { name: '几维圆宋', family: '"Kiwi Maru", serif', fontId: 'kiwi-maru', category: 'chinese', tags: ['chinese', 'serif'], preview: '东西南北' },
  { name: '祐字', family: '"Yuji Mai", serif', fontId: 'yuji-mai', category: 'chinese', tags: ['chinese', 'serif'], preview: '花鸟鱼虫' },
  { name: '青星体', family: '"Aoboshi One", serif', fontId: 'aoboshi-one', category: 'chinese', tags: ['chinese', 'serif'], preview: '风华正茂' },
  { name: '吉页草书', family: '"Klee One", cursive', fontId: 'klee-one', category: 'chinese', tags: ['chinese', 'serif'], preview: '琴棋书画' },
  { name: '刻石体', family: '"Chokokutai", display', fontId: 'chokokutai', category: 'chinese', tags: ['chinese', 'serif'], preview: '梅兰竹菊' },

  // ===== 黑体 / 无衬线体 (12个) =====
  { name: '思源黑体', family: '"Noto Sans SC", sans-serif', fontId: 'noto-sans-sc', category: 'chinese', tags: ['chinese', 'sans'], preview: '天地玄黄' },
  { name: '昭源黑体', family: '"Chiron Hei HK", sans-serif', fontId: 'chiron-hei-hk', category: 'chinese', tags: ['chinese', 'sans'], preview: '辰宿列张' },
  { name: '昭源圆体', family: '"Chiron GoRound TC", sans-serif', fontId: 'chiron-goround-tc', category: 'chinese', tags: ['chinese', 'sans'], preview: '寒来暑往' },
  { name: '润滑体简', family: '"WDXL Lubrifont SC", sans-serif', fontId: 'wdxl-lubrifont-sc', category: 'chinese', tags: ['chinese', 'sans'], preview: '秋收冬藏' },
  { name: '润滑体繁', family: '"WDXL Lubrifont TC", sans-serif', fontId: 'wdxl-lubrifont-tc', category: 'chinese', tags: ['chinese', 'sans'], preview: '闰余成岁' },
  { name: '很黏体', family: '"Huninn", sans-serif', fontId: 'huninn', category: 'chinese', tags: ['chinese', 'sans'], preview: '律吕调阳' },
  { name: '注音很黏', family: '"Bpmf Huninn", sans-serif', fontId: 'bpmf-huninn', category: 'chinese', tags: ['chinese', 'sans'], preview: '云腾致雨' },
  { name: '注音字嗨楷', family: '"Bpmf Zihi Kai Std", sans-serif', fontId: 'bpmf-zihi-kai-std', category: 'chinese', tags: ['chinese', 'sans'], preview: '露结为霜' },
  { name: '日文明朝黑', family: '"Noto Sans JP", sans-serif', fontId: 'noto-sans-jp', category: 'chinese', tags: ['chinese', 'sans'], preview: '玉出昆冈' },
  { name: '芫荽体', family: '"Iansui", cursive', fontId: 'iansui', category: 'chinese', tags: ['chinese', 'sans'], preview: '风花雪月' },
  { name: '注音芫荽', family: '"Bpmf Iansui", cursive', fontId: 'bpmf-iansui', category: 'chinese', tags: ['chinese', 'sans'], preview: '春夏秋冬' },
  { name: '霞鹜文楷', family: '"LXGW WenKai TC", cursive', fontId: 'lxgw-wenkai-tc', category: 'chinese', tags: ['chinese', 'sans'], preview: '水墨丹青' },

  // ===== 可爱风 / 圆体 (8个) =====
  { name: '禅圆黑', family: '"Zen Maru Gothic", sans-serif', fontId: 'zen-maru-gothic', category: 'chinese', tags: ['chinese', 'cute'], preview: '果珍李柰' },
  { name: '圆体黑', family: '"M PLUS Rounded 1c", sans-serif', fontId: 'm-plus-rounded-1c', category: 'chinese', tags: ['chinese', 'cute'], preview: '菜重芥姜' },
  { name: '小杉圆', family: '"Kosugi Maru", sans-serif', fontId: 'kosugi-maru', category: 'chinese', tags: ['chinese', 'cute'], preview: '海咸河淡' },
  { name: '有字库魔法', family: '"Yusei Magic", sans-serif', fontId: 'yusei-magic', category: 'chinese', tags: ['chinese', 'cute'], preview: '鳞潜羽翔' },
  { name: '樱桃炸弹', family: '"Cherry Bomb One", display', fontId: 'cherry-bomb-one', category: 'chinese', tags: ['chinese', 'cute'], preview: '龙师火帝' },
  { name: '不倒翁', family: '"Darumadrop One", display', fontId: 'darumadrop-one', category: 'chinese', tags: ['chinese', 'cute'], preview: '鸟官人皇' },
  { name: '吉页草书', family: '"Klee One", cursive', fontId: 'klee-one', category: 'chinese', tags: ['chinese', 'cute'], preview: '琴棋书画' },
  { name: '刻石体', family: '"Chokokutai", display', fontId: 'chokokutai', category: 'chinese', tags: ['chinese', 'cute'], preview: '梅兰竹菊' },

  // ===== 哥特风 / 粗犷风 (6个) =====
  { name: '霞鹜标记哥特', family: '"LXGW Marker Gothic", sans-serif', fontId: 'lxgw-marker-gothic', category: 'chinese', tags: ['chinese', 'gothic'], preview: '推位让国' },
  { name: '商务黑体', family: '"BIZ UDPGothic", sans-serif', fontId: 'biz-udpgothic', category: 'chinese', tags: ['chinese', 'gothic'], preview: '吊民伐罪' },
  { name: '泽泻黑', family: '"Sawarabi Gothic", sans-serif', fontId: 'sawarabi-gothic', category: 'chinese', tags: ['chinese', 'gothic'], preview: '周发殷汤' },
  { name: '青星体', family: '"Aoboshi One", serif', fontId: 'aoboshi-one', category: 'chinese', tags: ['chinese', 'gothic'], preview: '有虞陶唐' },
  { name: '祐字', family: '"Yuji Mai", serif', fontId: 'yuji-mai', category: 'chinese', tags: ['chinese', 'gothic'], preview: '乃服衣裳' },
  { name: '几维圆宋', family: '"Kiwi Maru", serif', fontId: 'kiwi-maru', category: 'chinese', tags: ['chinese', 'gothic'], preview: '始制文字' },
];

export const SYSTEM_FONT = {
  name: '系统默认',
  family: 'inherit',
  fontId: '',
  category: 'chinese' as const,
  tags: ['chinese'],
  preview: '天地玄黄',
};
