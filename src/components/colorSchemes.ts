export type ThemeColorScheme = {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  desc: string;
  longDesc: string;
  hex: string;
  subDesc: string;
  variants: {
    bg: string;
    text: string;
    accent: string;
    hex: string;
    subDesc: string;
    variantDesc: string;
  }[];
};

export const colorSchemes: ThemeColorScheme[] = [
  {
    id: 'low-saturation',
    name: '低饱和',
    bg: '#3A506B',
    text: '#FFFFFF',
    accent: '#7BA3C0',
    desc: '超~舒服！',
    longDesc: '低对比灰蓝调，长时间阅读不易疲劳，适合专注写作',
    hex: '#3A506B',
    subDesc: '深灰蓝',
    variants: [
      { bg: '#3A506B', text: '#FFFFFF', accent: '#7BA3C0', hex: '#3A506B', subDesc: '深灰蓝', variantDesc: '深沉稳重的色调，适合需要专注和思考的写作场景' },
      { bg: '#5BC0BE', text: '#FFFFFF', accent: '#7BA3C0', hex: '#5BC0BE', subDesc: '柔青绿', variantDesc: '清新自然的色调，带来轻松愉悦的写作体验' },
      { bg: '#CDEDF6', text: '#2D3748', accent: '#7BA3C0', hex: '#CDEDF6', subDesc: '浅雾蓝', variantDesc: '轻盈通透的色调，让思绪更加清晰明朗' },
      { bg: '#BFA5A0', text: '#FFFFFF', accent: '#7BA3C0', hex: '#BFA5A0', subDesc: '灰粉', variantDesc: '温暖柔和的色调，营造舒适惬意的写作氛围' },
      { bg: '#F5F5F5', text: '#2D3748', accent: '#7BA3C0', hex: '#F5F5F5', subDesc: '奶白粉', variantDesc: '纯净简约的色调，回归本真，专注内容创作' },
      { bg: '#4A6FA5', text: '#FFFFFF', accent: '#7BA3C0', hex: '#4A6FA5', subDesc: '柔灰蓝', variantDesc: '宁静致远的色调，让心灵沉淀，思绪飞扬' },
      { bg: '#F2A65A', text: '#FFFFFF', accent: '#7BA3C0', hex: '#F2A65A', subDesc: '柔橙', variantDesc: '活力温暖的色调，激发创作灵感与热情' },
      { bg: '#6B705C', text: '#FFFFFF', accent: '#7BA3C0', hex: '#6B705C', subDesc: '橄榄灰绿', variantDesc: '质朴自然的色调，感受大地的呼吸与生命力' },
      { bg: '#A5A58D', text: '#FFFFFF', accent: '#7BA3C0', hex: '#A5A58D', subDesc: '浅橄榄', variantDesc: '淡雅素净的色调，简约而不简单，品味生活' },
      { bg: '#9A8C98', text: '#FFFFFF', accent: '#7BA3C0', hex: '#9A8C98', subDesc: '浅灰紫', variantDesc: '优雅沉静的色调，高贵而不张扬，从容淡定' },
    ],
  },
  {
    id: 'fresh',
    name: '清新',
    bg: '#44A08D',
    text: '#FFFFFF',
    accent: '#4ECDC4',
    desc: '超~清爽！',
    longDesc: '薄荷与青绿交织，像清晨的第一口空气，清爽提神',
    hex: '#44A08D',
    subDesc: '薄荷绿',
    variants: [
      { bg: '#44A08D', text: '#FFFFFF', accent: '#4ECDC4', hex: '#44A08D', subDesc: '薄荷绿', variantDesc: '清爽自然的薄荷绿色调，带来清晨般的清新体验' },
      { bg: '#4ECDC4', text: '#FFFFFF', accent: '#96E6A1', hex: '#4ECDC4', subDesc: '青绿', variantDesc: '明快活泼的青绿色调，充满生机与活力' },
      { bg: '#96E6A1', text: '#2D3748', accent: '#44A08D', hex: '#96E6A1', subDesc: '嫩绿', variantDesc: '柔和淡雅的嫩绿色调，营造轻松愉悦的氛围' },
      { bg: '#88D8B0', text: '#2D3748', accent: '#44A08D', hex: '#88D8B0', subDesc: '薄荷', variantDesc: '轻盈通透的薄荷色调，让思绪更加清晰明朗' },
    ],
  },
  {
    id: 'summer',
    name: '夏日',
    bg: '#FF6B6B',
    text: '#FFFFFF',
    accent: '#FFA07A',
    desc: '超~热情！',
    longDesc: '珊瑚红与柠檬黄的碰撞，热情活力，点亮整个夏天',
    hex: '#FF6B6B',
    subDesc: '珊瑚红',
    variants: [
      { bg: '#FF6B6B', text: '#FFFFFF', accent: '#FFA07A', hex: '#FF6B6B', subDesc: '珊瑚红', variantDesc: '热情奔放的珊瑚红色调，点亮夏日的无限活力' },
      { bg: '#FFA07A', text: '#FFFFFF', accent: '#FFD93D', hex: '#FFA07A', subDesc: '浅珊瑚', variantDesc: '温暖柔和的浅珊瑚色调，如夕阳般浪漫迷人' },
      { bg: '#FFD93D', text: '#2D3748', accent: '#FF6B6B', hex: '#FFD93D', subDesc: '柠檬黄', variantDesc: '明亮欢快的柠檬黄色调，带来阳光般的愉悦心情' },
      { bg: '#6BCB77', text: '#FFFFFF', accent: '#4D96FF', hex: '#6BCB77', subDesc: '草绿', variantDesc: '清新自然的草绿色调，感受夏日的生机盎然' },
    ],
  },
  {
    id: 'bauhaus',
    name: '包豪斯',
    bg: '#457B9D',
    text: '#FFFFFF',
    accent: '#E63946',
    desc: '超~艺术！',
    longDesc: '经典蓝红几何，现代主义设计语言的完美诠释',
    hex: '#457B9D',
    subDesc: '经典蓝',
    variants: [
      { bg: '#457B9D', text: '#FFFFFF', accent: '#E63946', hex: '#457B9D', subDesc: '经典蓝', variantDesc: '沉稳大气的经典蓝色调，诠释现代主义的设计美学' },
      { bg: '#E63946', text: '#FFFFFF', accent: '#F1FAEE', hex: '#E63946', subDesc: '包豪斯红', variantDesc: '鲜明有力的包豪斯红色调，几何与色彩的完美碰撞' },
      { bg: '#F1FAEE', text: '#1D3557', accent: '#457B9D', hex: '#F1FAEE', subDesc: '米白', variantDesc: '纯净简约的米白色调，留白之间尽显艺术格调' },
      { bg: '#A8DADC', text: '#1D3557', accent: '#457B9D', hex: '#A8DADC', subDesc: '浅蓝', variantDesc: '柔和雅致的浅蓝色调，如水墨般宁静悠远' },
    ],
  },
  {
    id: 'elegant',
    name: '优雅',
    bg: '#6B5B95',
    text: '#FFFFFF',
    accent: '#92A8D1',
    desc: '超~高级！',
    longDesc: '薰衣草与玫瑰粉，高贵而不张扬，商务场合首选',
    hex: '#6B5B95',
    subDesc: '薰衣草',
    variants: [
      { bg: '#6B5B95', text: '#FFFFFF', accent: '#92A8D1', hex: '#6B5B95', subDesc: '薰衣草', variantDesc: '高贵优雅的薰衣草色调，沉稳中透着浪漫气息' },
      { bg: '#92A8D1', text: '#FFFFFF', accent: '#F7CAC9', hex: '#92A8D1', subDesc: '淡紫', variantDesc: '柔和梦幻的淡紫色调，营造宁静优雅的氛围' },
      { bg: '#F7CAC9', text: '#2D3748', accent: '#6B5B95', hex: '#F7CAC9', subDesc: '玫瑰粉', variantDesc: '温婉柔美的玫瑰粉色调，甜美而不失高级感' },
      { bg: '#88B04B', text: '#FFFFFF', accent: '#92A8D1', hex: '#88B04B', subDesc: '橄榄绿', variantDesc: '自然沉稳的橄榄绿色调，平衡优雅与生机' },
    ],
  },
  {
    id: 'nature',
    name: '自然',
    bg: '#228B22',
    text: '#FFFFFF',
    accent: '#8FBC8F',
    desc: '超~自然！',
    longDesc: '森林绿与麦色，回归本真，感受大地的呼吸',
    hex: '#228B22',
    subDesc: '森林绿',
    variants: [
      { bg: '#228B22', text: '#FFFFFF', accent: '#8FBC8F', hex: '#228B22', subDesc: '森林绿', variantDesc: '深邃浓郁的森林绿色调，感受大自然的原始力量' },
      { bg: '#8FBC8F', text: '#2D3748', accent: '#228B22', hex: '#8FBC8F', subDesc: '浅绿', variantDesc: '清新淡雅的浅绿色调，如春风拂面般舒适' },
      { bg: '#DEB887', text: '#2D3748', accent: '#228B22', hex: '#DEB887', subDesc: '麦色', variantDesc: '温暖质朴的麦色调，回归田园般的宁静时光' },
      { bg: '#F4A460', text: '#FFFFFF', accent: '#DEB887', hex: '#F4A460', subDesc: '沙棕', variantDesc: '醇厚自然的沙棕色调，感受大地的温暖怀抱' },
    ],
  },
  {
    id: 'ocean',
    name: '海洋',
    bg: '#006994',
    text: '#FFFFFF',
    accent: '#4A90E2',
    desc: '超~深邃！',
    longDesc: '深海蓝层层递进，宁静致远，适合深度思考',
    hex: '#006994',
    subDesc: '深海蓝',
    variants: [
      { bg: '#006994', text: '#FFFFFF', accent: '#4A90E2', hex: '#006994', subDesc: '深海蓝', variantDesc: '深邃神秘的深海蓝色调，适合沉静思考与创作' },
      { bg: '#4A90E2', text: '#FFFFFF', accent: '#87CEEB', hex: '#4A90E2', subDesc: '天蓝', variantDesc: '明朗开阔的天蓝色调，让思维如天空般自由' },
      { bg: '#87CEEB', text: '#2D3748', accent: '#006994', hex: '#87CEEB', subDesc: '浅蓝', variantDesc: '清澈柔和的浅蓝色调，带来宁静平和的心境' },
      { bg: '#B0E0E6', text: '#2D3748', accent: '#4A90E2', hex: '#B0E0E6', subDesc: '粉蓝', variantDesc: '淡雅恬静的粉蓝色调，如水彩般温柔细腻' },
    ],
  },
];