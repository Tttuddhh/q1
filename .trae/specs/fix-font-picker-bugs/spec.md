# 修复字体选择器问题 Spec

## Why
当前字体选择器存在三个严重问题：
1. **选择字体后按钮文字未更新**：点击字体选择器中的字体后，按钮上仍然显示 "系统默认"，没有替换为所选字体名称
2. **下拉对话框不流畅**：点击字体选择器按钮后，弹出的对话框有迟钝感，需要优化渲染性能
3. **中文字体数量不足**：当前中文字体只有 2 个（Noto Serif SC、Noto Sans SC），远未达到用户要求的 30 个中文字体

## What Changes
- 修复 `RichTextEditor.tsx` 中字体选择后的状态更新逻辑，确保按钮文字正确显示所选字体名
- 优化 `FontPicker` 下拉组件的渲染性能，减少卡顿
- 扩充 `fonts.ts` 中的中文字体到 30 个以上，同时保证总字体数超过 100 个
- 更新 `index.html` 中的 Google Fonts 链接，确保新增字体被正确加载

## Impact
- Affected specs: 富文本编辑器字体选择器
- Affected code: `src/components/RichTextEditor.tsx`, `src/data/fonts.ts`, `index.html`

## ADDED Requirements
### Requirement: 选择字体后按钮文字正确更新
The system SHALL 在用户从字体选择器中选择字体后，立即将按钮上的 "系统默认" 替换为所选字体的名称。

#### Scenario: 选择字体
- **WHEN** 用户点击字体选择器按钮
- **THEN** 下拉对话框展开
- **WHEN** 用户点击某个字体
- **THEN** 下拉对话框关闭
- **THEN** 按钮上的文字从 "系统默认" 变为所选字体名称

### Requirement: 下拉对话框流畅展开
The system SHALL 优化字体选择器下拉对话框的渲染性能，确保点击后流畅展开无卡顿。

#### Scenario: 点击展开
- **WHEN** 用户点击字体选择器按钮
- **THEN** 下拉对话框立即流畅展开，无明显延迟

### Requirement: 中文字体不少于 30 个
The system SHALL 提供至少 30 个中文字体，同时总字体数超过 100 个，涵盖多种语言和风格。

#### Scenario: 浏览中文字体
- **WHEN** 用户打开字体选择器
- **THEN** 中文字体分类下至少有 30 个字体可选
- **THEN** 所有字体分类总计超过 100 个
