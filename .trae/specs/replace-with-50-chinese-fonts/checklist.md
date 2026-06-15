# 替换为50个纯中文字体 - Verification Checklist

- [x] Checkpoint 1: `src/data/fonts.ts` 中 `FONTS` 数组恰好包含50个中文字体
- [x] Checkpoint 2: 所有字体 `category` 均为 `'chinese'`，无 `english` 或 `other`
- [x] Checkpoint 3: 每个字体的 `preview` 字段为中文文本
- [x] Checkpoint 4: 字体选择器下拉列表中每个字体名称使用其自身 `font-family` 渲染
- [x] Checkpoint 5: 字体选择器不再显示"英文字体"和"其他语言"分类
- [x] Checkpoint 6: i18n 翻译中已移除 `editor.font_category_english` 和 `editor.font_category_other`
- [x] Checkpoint 7: 应用构建成功，无错误
- [x] Checkpoint 8: 字体选择器交互正常，字体可正确应用
