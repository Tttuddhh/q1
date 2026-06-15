# Tasks

- [x] Task 1: 替换字体数据为50个纯中文字体
  - [x] 删除 `src/data/fonts.ts` 中所有现有字体数据
  - [x] 精选50个 Google Fonts 上的纯中文字体
  - [x] 每个字体设置正确的 `name`、`family`、`googleFontName`、`category: 'chinese'`、`tags`、`preview`（中文预览文本）
  - [x] 确保字体覆盖多种风格：无衬线、衬线、手写、卡通/可爱、书法等
  - [x] 保留 `SYSTEM_FONT` 和 `FONT_CATEGORIES` 常量定义，但精简分类

- [x] Task 2: 更新字体选择器组件分类逻辑
  - [x] 修改 `src/components/FontPicker.tsx`
  - [x] 移除 `english` 和 `other` 分类的分组显示
  - [x] 只保留 `chinese` 分类的字体列表
  - [x] 确保字体预览使用字体自身的 `font-family` 渲染（当前已实现，需确认保留）
  - [x] 更新分类标签映射

- [x] Task 3: 更新 i18n 翻译
  - [x] 从 `src/i18n/index.ts` 中移除 `editor.font_category_english` 和 `editor.font_category_other` 翻译键
  - [x] 保留并更新中文字体相关翻译

- [x] Task 4: 构建验证
  - [x] 运行 `npm run build` 确保构建成功
  - [x] 验证字体选择器只显示中文字体
  - [x] 验证字体数量为50个

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 1, Task 2, Task 3
