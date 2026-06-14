# 修复字体渲染和清理非中文字体 Spec

## Why
用户反馈四个问题：(1) 字体选择器中所有字体都显示为默认字体效果，未实际渲染各自样式；(2) 列表中包含英文和日文字体（如 Kosugi、M PLUS 1p 等），用户只要中文；(3) 数量需达到 120 种；(4) 预览文字太小，只显示字体名，且字体名必须用该字体自身样式渲染。

## What Changes
- **移除所有非中文字体**：删除日文（Kosugi、M PLUS、Sawarabi、Shippori 等）、韩文（Nanum、Gowun、Gaegu 等）字体，仅保留真正支持中文的字体
- **修复字体渲染**：确保字体选择器下拉列表中每个字体选项使用 `font-family: font.family` 渲染，而不是默认字体
- **调整预览显示**：移除预览小字，仅显示字体名，字体名用该字体自身样式渲染
- **补充中文字体至 120 种**：用更多真正的中文字体替代被移除的日韩字体

## Impact
- Affected specs: `rebuild-chinese-fonts`, `fix-font-actual-rendering`
- Affected code:
  - [fonts.ts](file:///workspace/src/data/fonts.ts)（移除日韩字体，补充中文字体）
  - [FontPicker.tsx](file:///workspace/src/components/FontPicker.tsx)（修复渲染 + 移除预览小字）

## ADDED Requirements

### Requirement: 仅中文字体
The system SHALL only include fonts that support Chinese characters. Japanese-only and Korean-only fonts SHALL be removed.

#### Scenario: 字体列表仅中文
- **WHEN** 用户打开字体选择器
- **THEN** 列表中不出现日文名（如 Kosugi、M PLUS 1p、Sawarabi）或韩文名（如 Nanum、Gaegu）字体
- **AND** 所有字体名称为中文

### Requirement: 字体名用自身样式渲染
The system SHALL render each font option's name using that font's own font-family CSS style.

#### Scenario: 字体名渲染
- **WHEN** 字体选择器下拉列表显示
- **THEN** 每个选项的字体名（如"霞鹜文楷"）使用该字体自身的样式渲染
- **AND** 不使用默认字体

### Requirement: 仅显示字体名
The system SHALL display only the font name in each option, without a separate small preview text below.

#### Scenario: 选项显示
- **WHEN** 字体选择器下拉列表显示
- **THEN** 每个选项只显示字体名称（如"霞鹜文楷"）
- **AND** 不显示额外的预览小字

### Requirement: 120 种中文字体
The system SHALL provide exactly 120 Chinese font entries.

#### Scenario: 数量验证
- **WHEN** 统计 FONTS 数组
- **THEN** category='chinese' 的条目数 = 120

## MODIFIED Requirements

### Requirement: FontPicker 选项渲染
原 FontPicker 显示字体名 + 预览小字，现改为仅显示字体名，且字体名用该字体自身样式渲染。

## REMOVED Requirements

### Requirement: 日韩字体
**Reason**: 用户明确只要中文字体
**Migration**: 从 FONTS 数组中移除所有日文和韩文字体，用中文字体替代
