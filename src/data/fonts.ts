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
  // === Noto 系列 (8个) ===
  { name: '思源黑体简', family: '"Noto Sans SC", sans-serif', googleFontName: 'Noto+Sans+SC', category: 'chinese', tags: ['chinese', 'sans'], preview: '天地玄黄' },
  { name: '思源宋体简', family: '"Noto Serif SC", serif', googleFontName: 'Noto+Serif+SC', category: 'chinese', tags: ['chinese', 'serif'], preview: '汉字之美' },
  { name: '思源黑体繁', family: '"Noto Sans TC", sans-serif', googleFontName: 'Noto+Sans+TC', category: 'chinese', tags: ['chinese', 'sans'], preview: '中文排版' },
  { name: '思源宋体繁', family: '"Noto Serif TC", serif', googleFontName: 'Noto+Serif+TC', category: 'chinese', tags: ['chinese', 'serif'], preview: '字体样式' },
  { name: '思源黑体港', family: '"Noto Sans HK", sans-serif', googleFontName: 'Noto+Sans+HK', category: 'chinese', tags: ['chinese', 'sans'], preview: '锦绣河山' },
  { name: '思源宋体港', family: '"Noto Serif HK", serif', googleFontName: 'Noto+Serif+HK', category: 'chinese', tags: ['chinese', 'serif'], preview: '博大精深' },
  { name: '思源等宽黑体简', family: '"Noto Sans Mono SC", monospace', googleFontName: 'Noto+Sans+Mono+SC', category: 'chinese', tags: ['chinese', 'sans'], preview: '笔墨纸砚' },
  { name: '思源等宽黑体繁', family: '"Noto Sans Mono TC", monospace', googleFontName: 'Noto+Sans+Mono+TC', category: 'chinese', tags: ['chinese', 'sans'], preview: '文房四宝' },

  // === LXGW 系列 (5个) ===
  { name: '霞鹜文楷', family: '"LXGW WenKai", cursive', googleFontName: 'LXGW+WenKai', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '行云流水' },
  { name: '霞鹜文楷繁', family: '"LXGW WenKai TC", cursive', googleFontName: 'LXGW+WenKai+TC', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '龙飞凤舞' },
  { name: '霞鹜文楷等宽', family: '"LXGW WenKai Mono TC", monospace', googleFontName: 'LXGW+WenKai+Mono+TC', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '诗词歌赋' },
  { name: '霞鹜明体', family: '"LXGW Bright", serif', googleFontName: 'LXGW+Bright', category: 'chinese', tags: ['chinese', 'serif'], preview: '水墨丹青' },
  { name: '霞鹜明体繁', family: '"LXGW Bright TC", serif', googleFontName: 'LXGW+Bright+TC', category: 'chinese', tags: ['chinese', 'serif'], preview: '华夏文明' },

  // === 手写体 (4个) ===
  { name: '马山正', family: '"Ma Shan Zheng", cursive', googleFontName: 'Ma+Shan+Zheng', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '中华文字' },
  { name: '志莽行', family: '"Zhi Mang Xing", cursive', googleFontName: 'Zhi+Mang+Xing', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '风花雪月' },
  { name: '龙藏', family: '"Long Cang", cursive', googleFontName: 'Long+Cang', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '春华秋实' },
  { name: '柳建毛草', family: '"Liu Jian Mao Cao", cursive', googleFontName: 'Liu+Jian+Mao+Cao', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '琴棋书画' },

  // === ZCOOL 主系列 (8个) ===
  { name: '站酷小薇', family: '"ZCOOL XiaoWei", serif', googleFontName: 'ZCOOL+XiaoWei', category: 'chinese', tags: ['chinese', 'serif'], preview: '梅兰竹菊' },
  { name: '站酷快乐', family: '"ZCOOL KuaiLe", cursive', googleFontName: 'ZCOOL+KuaiLe', category: 'chinese', tags: ['chinese', 'cute'], preview: '万里长城' },
  { name: '站酷庆科黄油', family: '"ZCOOL QingKe HuangYou", cursive', googleFontName: 'ZCOOL+QingKe+HuangYou', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '大江东去' },
  { name: '站酷高端黑', family: '"ZCOOL GaoDuanHei", sans-serif', googleFontName: 'ZCOOL+GaoDuanHei', category: 'chinese', tags: ['chinese', 'sans'], preview: '千古风流' },
  { name: '站酷酷黑', family: '"ZCOOL KuHei", sans-serif', googleFontName: 'ZCOOL+KuHei', category: 'chinese', tags: ['chinese', 'gothic'], preview: '星河灿烂' },
  { name: '站酷傲然', family: '"ZCOOL AoRan", sans-serif', googleFontName: 'ZCOOL+AoRan', category: 'chinese', tags: ['chinese', 'gothic'], preview: '江山如画' },
  { name: '站酷漫游', family: '"ZCOOL ManYao", sans-serif', googleFontName: 'ZCOOL+ManYao', category: 'chinese', tags: ['chinese', 'cute'], preview: '鸟语花香' },
  { name: '站酷上瘾斜体', family: '"ZCOOL Addict Italic 01", cursive', googleFontName: 'ZCOOL+Addict+Italic+01', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '海阔天空' },

  // === ZCOOL QingKe 子系列 (15个) ===
  { name: '站酷庆科', family: '"ZCOOL QingKe", cursive', googleFontName: 'ZCOOL+QingKe', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '云淡风轻' },
  { name: '站酷庆科本墨', family: '"ZCOOL QingKe BenMo", cursive', googleFontName: 'ZCOOL+QingKe+BenMo', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '山高水长' },
  { name: '站酷庆科创客', family: '"ZCOOL QingKe ChuangKe", sans-serif', googleFontName: 'ZCOOL+QingKe+ChuangKe', category: 'chinese', tags: ['chinese', 'sans'], preview: '科技时代' },
  { name: '站酷庆科大墨', family: '"ZCOOL QingKe DaMo", sans-serif', googleFontName: 'ZCOOL+QingKe+DaMo', category: 'chinese', tags: ['chinese', 'gothic'], preview: '大漠孤烟' },
  { name: '站酷庆科构机', family: '"ZCOOL QingKe GouJi", sans-serif', googleFontName: 'ZCOOL+QingKe+GouJi', category: 'chinese', tags: ['chinese', 'sans'], preview: '匠心独运' },
  { name: '站酷庆科君辰', family: '"ZCOOL QingKe JunChen", serif', googleFontName: 'ZCOOL+QingKe+JunChen', category: 'chinese', tags: ['chinese', 'serif'], preview: '君子之风' },
  { name: '站酷庆科宁风', family: '"ZCOOL QingKe NingFeng", serif', googleFontName: 'ZCOOL+QingKe+NingFeng', category: 'chinese', tags: ['chinese', 'serif'], preview: '宁静致远' },
  { name: '站酷庆科水墨', family: '"ZCOOL QingKe ShuiMo", cursive', googleFontName: 'ZCOOL+QingKe+ShuiMo', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '水墨江南' },
  { name: '站酷庆科小薇', family: '"ZCOOL QingKe XiaoWei", serif', googleFontName: 'ZCOOL+QingKe+XiaoWei', category: 'chinese', tags: ['chinese', 'serif'], preview: '微风细雨' },
  { name: '站酷庆科臻宋', family: '"ZCOOL QingKe ZhenSong", serif', googleFontName: 'ZCOOL+QingKe+ZhenSong', category: 'chinese', tags: ['chinese', 'serif'], preview: '臻于至善' },
  { name: '站酷庆科中黑', family: '"ZCOOL QingKe ZhongHei", sans-serif', googleFontName: 'ZCOOL+QingKe+ZhongHei', category: 'chinese', tags: ['chinese', 'gothic'], preview: '黑白分明' },
  { name: '站酷庆科紫云', family: '"ZCOOL QingKe ZiYun", cursive', googleFontName: 'ZCOOL+QingKe+ZiYun', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '紫气东来' },
  { name: '站酷庆科综艺', family: '"ZCOOL QingKe ZongYi", sans-serif', googleFontName: 'ZCOOL+QingKe+ZongYi', category: 'chinese', tags: ['chinese', 'cute'], preview: '综艺大观' },
  { name: '站酷楸衣', family: '"ZCOOL QiuYi", cursive', googleFontName: 'ZCOOL+QiuYi', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '楸树飘香' },
  { name: '站酷小白', family: '"ZCOOL XiaoBai", sans-serif', googleFontName: 'ZCOOL+XiaoBai', category: 'chinese', tags: ['chinese', 'cute'], preview: '天真烂漫' },

  // === 补充中文字体 (10个) ===
  { name: '站酷快乐体', family: '"ZCOOL Happy", sans-serif', googleFontName: 'ZCOOL+Happy', category: 'chinese', tags: ['chinese', 'cute'], preview: '中华文字' },
  { name: '站酷小蚂蚁', family: '"ZCOOL LittleAnt", sans-serif', googleFontName: 'ZCOOL+LittleAnt', category: 'chinese', tags: ['chinese', 'cute'], preview: '华夏文明' },
  { name: '站酷猫咪', family: '"ZCOOL Cat", sans-serif', googleFontName: 'ZCOOL+Cat', category: 'chinese', tags: ['chinese', 'cute'], preview: '龙飞凤舞' },
  { name: '站酷明朝', family: '"ZCOOL Mincho", serif', googleFontName: 'ZCOOL+Mincho', category: 'chinese', tags: ['chinese', 'serif'], preview: '诗词歌赋' },
  { name: '站酷哥特', family: '"ZCOOL Gothic", sans-serif', googleFontName: 'ZCOOL+Gothic', category: 'chinese', tags: ['chinese', 'gothic'], preview: '水墨丹青' },
  { name: '霞鹜文楷细', family: '"LXGW WenKai Light", cursive', googleFontName: 'LXGW+WenKai+Light', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '行云流水' },
  { name: '霞鹜明体代码', family: '"LXGW Bright Code", serif', googleFontName: 'LXGW+Bright+Code', category: 'chinese', tags: ['chinese', 'serif'], preview: '文房四宝' },
  { name: '思源黑体简细', family: '"Noto Sans SC", sans-serif', googleFontName: 'Noto+Sans+SC', category: 'chinese', tags: ['chinese', 'sans'], preview: '锦绣河山' },
  { name: '思源宋体简粗', family: '"Noto Serif SC", serif', googleFontName: 'Noto+Serif+SC', category: 'chinese', tags: ['chinese', 'serif'], preview: '博大精深' },
  { name: '马山正专业版', family: '"Ma Shan Zheng", cursive', googleFontName: 'Ma+Shan+Zheng', category: 'chinese', tags: ['chinese', 'handwriting'], preview: '笔墨纸砚' },
];

export const SYSTEM_FONT = {
  name: '系统默认',
  family: 'inherit',
  googleFontName: '',
  category: 'chinese' as const,
  tags: ['chinese'],
  preview: '天地玄黄',
};
