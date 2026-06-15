# 替换为50个纯中文字体 Spec

## Why
当前字体选择器包含100+混合字体（中文、英文、其他语言），用户需要精简为50个纯中文字体，且预览时每个字体名称必须使用其自身的字体样式渲染，以真实展示字体效果。

## What Changes
- 删除 `src/data/fonts.ts` 中所有现有字体数据
- 重新精选50个纯中文字体（全部来自 Google Fonts 免费商用）
- 每个字体的 `preview` 字段使用中文文本（如字体名称或"天地玄黄"）
- 字体选择器下拉列表中，每个字体名称使用其自身的 `font-family` 渲染预览
- 简化分类：只保留中文字体相关分类，移除英文/其他语言分类
- 更新 `FontPicker.tsx` 中分类标签和分组逻辑
- 更新 i18n 翻译，移除英文字体/其他语言相关分类键

## Impact
- Affected specs: add-editor-font-picker
- Affected code: `src/data/fonts.ts`, `src/components/FontPicker.tsx`, `src/i18n/index.ts`

## ADDED Requirements

### Requirement: 50个纯中文字体数据
The system SHALL provide exactly 50 Chinese fonts in the font picker.

#### Scenario: 字体数量
- **WHEN** 用户打开字体选择器
- **THEN** 字体列表中显示恰好50个中文字体（不含系统默认）

#### Scenario: 字体预览使用自身样式
- **WHEN** 用户浏览字体列表
- **THEN** 每个字体名称使用其自身的 `font-family` 渲染，真实展示字体效果

## MODIFIED Requirements

### Requirement: 字体分类
The font picker SHALL only display Chinese font categories.

#### Scenario: 分类简化
- **WHEN** 用户打开字体选择器
- **THEN** 只显示"中文字体"分类，不再显示"英文字体"和"其他语言"分类

### Requirement: 字体数据格式
每个字体数据 SHALL 包含正确的 `name`、`family`、`googleFontName`、`category`、`tags`、`preview` 字段。

#### Scenario: 字体数据结构
- **WHEN** 定义字体数据
- **THEN** `preview` 字段为中文文本，`category` 为 `'chinese'`，`tags` 包含 `'chinese'` 和风格标签

## REMOVED Requirements
### Requirement: 英文字体和其他语言字体
**Reason**: 用户要求只保留纯中文字体
**Migration**: 从 `FONTS` 数组中移除所有 `category: 'english'` 和 `category: 'other'` 的字体
