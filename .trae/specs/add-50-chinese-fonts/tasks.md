# 添加50种中文字体 - 实现计划

## [x] Task 1: 添加50种中文字体到 FONTS 数组
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 `/workspace/src/data/fonts.ts` 的 `FONTS` 数组中添加50个中文字体定义
  - 所有字体 category 设置为 `'chinese'`
  - 使用 tags 标注字体风格：`serif`(衬线体)、`sans`(无衬线体)、`handwriting`(手写体)、`cute`(可爱风)、`gothic`(哥特风)
  - 字体来源全部为 Google Fonts CDN（通过 googleFontName 字段指定）
  - 确保每个字体包含完整的 name、family、googleFontName、category、tags、preview 字段
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-1.1: FONTS 数组长度为 50
  - `programmatic` TR-1.2: 所有字体 category 均为 `'chinese'`
  - `programmatic` TR-1.3: 每个字体对象包含 name、family、googleFontName、category、tags、preview 字段
- **Notes**: 可参考原 fonts.ts 中已有的中文字体定义格式，需验证每个 googleFontName 在 Google Fonts 上真实存在

## [x] Task 2: 优化 FontPicker 全中文分组展示
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 修改 FontPicker 中的分类显示逻辑
  - 当所有字体均为同一 category 时，按 tags 中的风格分类展示（手写体、衬线体、无衬线体、可爱风、哥特风）
  - 保持系统默认字体置顶
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `human-judgment` TR-2.1: 字体选择器面板中字体按风格分组显示
  - `human-judgment` TR-2.2: 系统默认字体位于列表顶部
- **Notes**: 修改 `CATEGORY_ORDER`、`CATEGORY_LABELS` 或新增风格分组逻辑

## [x] Task 3: 验证构建与字体渲染
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 运行 `npm run build` 验证代码修改后项目可正常构建
  - 验证字体选择器中所有50种字体可正常显示
- **Acceptance Criteria Addressed**: [AC-4, AC-5]
- **Test Requirements**:
  - `programmatic` TR-3.1: `npm run build` 退出码为 0，无 TypeScript 错误
  - `human-judgment` TR-3.2: 字体选择器中展示50种字体
  - `human-judgment` TR-3.3: 选择字体后编辑区文字正确渲染

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2