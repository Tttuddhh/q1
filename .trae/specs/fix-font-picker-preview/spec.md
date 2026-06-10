# 修复字体选择器预览与分类 Spec

## Why
用户在截图中反馈字体选择器存在三个问题：
1. 字体列表中每个字体名称没有使用对应字体渲染预览，导致所有字体看起来都一样
2. 字体列表中大量字体视觉差异不明显，很多看起来相似
3. "中文字体"分类下出现了 Noto Sans Lao、Noto Sans Georgian 等非中文字体

## What Changes
- 修复字体选择器中字体名称使用对应字体 family 渲染预览
- 精简字体列表，去除视觉差异极小的重复/相似字体，保留风格鲜明、有代表性的字体
- 修复字体分类逻辑，确保"中文字体"分类只显示真正的中文字体
- 优化 Google Fonts 加载，使用正确的 weights 参数确保字体正确加载

## Impact
- Affected specs: add-editor-font-picker
- Affected code: src/data/fonts.ts, src/components/FontPicker.tsx, src/utils/fontLoader.ts

## ADDED Requirements
### Requirement: 字体预览正确渲染
The system SHALL render each font name in the picker using its own font-family.

#### Scenario: 字体列表预览
- **WHEN** 用户打开字体选择器
- **THEN** 每个字体名称都用该字体自身的样式显示

### Requirement: 字体分类正确
The system SHALL ensure the "中文字体" category only contains Chinese fonts.

#### Scenario: 中文字体分类
- **WHEN** 用户查看"中文字体"分类
- **THEN** 只显示真正支持中文的字体，不出现 Lao、Georgian、Armenian 等非中文字体

## MODIFIED Requirements

### Requirement: 字体数据精简
The system SHALL provide a curated list of visually distinct fonts instead of 100+ similar ones.

#### Scenario: 精简字体列表
- **WHEN** 用户浏览字体列表
- **THEN** 每个字体都有明显的视觉差异，避免大量相似的 sans-serif 字体堆砌

### Requirement: Google Fonts 加载优化
The system SHALL load Google Fonts with proper weight parameters.

#### Scenario: 字体加载
- **WHEN** 选择字体时
- **THEN** 使用 `https://fonts.googleapis.com/css2?family=Name:wght@400;700&display=swap` 格式加载

## REMOVED Requirements
None.
