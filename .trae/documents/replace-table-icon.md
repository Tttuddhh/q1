# Plan: Replace table icon with another style

## Summary
用户对当前 `GridTableIcon` 不满意，需要替换为另一个更合适的表格图标。

## Current State
`/workspace/src/components/RichTextEditor.tsx` 中当前使用 `GridTableIcon` 作为表格按钮图标。此前已从 `Table01Icon`（餐桌图标）更换为 `GridTableIcon`（数据网格图标），但用户仍不满意。

## Proposed Changes

### Option A: Use `TableIcon`（推荐）
- **文件**: `/workspace/src/components/RichTextEditor.tsx`
- **改动**: 将 `GridTableIcon` 替换为 `TableIcon`
- **SVG 描述**: 圆角方形内，水平线 y=9,13,17 将区域分为4行，垂直线 x=12 分为2列
- **效果**: 标准电子表格样式，2列4行网格，简洁清晰

### Option B: Use `LayoutTable01Icon`
- **文件**: `/workspace/src/components/RichTextEditor.tsx`
- **改动**: 将 `GridTableIcon` 替换为 `LayoutTable01Icon`
- **SVG 描述**: 圆角方形内，顶部水平线 y=9（表头），垂直虚线 x=16 和 x=8 分为2列
- **效果**: 带表头的表格布局

### Option C: Use `LayoutTable02Icon`
- **文件**: `/workspace/src/components/RichTextEditor.tsx`
- **改动**: 将 `GridTableIcon` 替换为 `LayoutTable02Icon`
- **SVG 描述**: 圆角方形内，垂直线 x=8.998，水平线 y=8 和 y=16
- **效果**: 三行双列表格

### Option D: Use `Table03Icon`
- **文件**: `/workspace/src/components/RichTextEditor.tsx`
- **改动**: 将 `GridTableIcon` 替换为 `Table03Icon`
- **SVG 描述**: 顶部圆弧的3D立体感表格
- **效果**: 立体数据表样式，有顶部提手/圆弧

## Verification
- 修改后运行 `npm run build` 验证构建通过
- 预览确认图标正确显示