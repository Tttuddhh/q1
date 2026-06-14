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

export const FONTS: FontData[] = [];

export const SYSTEM_FONT = {
  name: '系统默认',
  family: 'inherit',
  googleFontName: '',
  category: 'chinese' as const,
  tags: ['chinese'],
  preview: '天地玄黄',
};
