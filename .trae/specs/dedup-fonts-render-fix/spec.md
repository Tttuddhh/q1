# 字体去重与渲染修复 Spec

## Why
当前字体选择器存在两个严重问题：1) 大量同系列字体重复（如獅尾系列40+个，差异极小），导致列表冗长且风格同质化；2) 字体预览没有正确渲染，列表中大部分字体显示为系统默认字形，用户无法通过预览辨别字体风格。

## What Changes
- **精简字体列表**：将154个中文字体精简到约80-100个，同系列字体最多保留3个有明显风格差异的代表作
- **修复字体渲染**：FontPicker 中每个字体项必须在字体 CSS 加载完成后才以自身字形渲染预览
- **移除重复系列**：大量删减獅尾系列（保留3个）、霞鹜文楷系列（保留3个）、悠哉系列（保留1-2个）、思源系列（去重）
- **确保字体真实可加载**：所有保留字体必须有可访问的 cssUrl 或 googleFontName

## Impact
- Affected code: `src/data/fonts.ts`, `src/components/FontPicker.tsx`, `src/utils/fontLoader.ts`
- Affected UI: 字体选择器下拉列表

## ADDED Requirements
### Requirement: 字体去重精简
The system SHALL 将中文字体数量从154个精简到约80-100个，同系列字体最多保留3个有明显差异的代表。

#### Scenario: 獅尾系列精简
- **GIVEN** 当前有40+个獅尾系列字体
- **WHEN** 去重后
- **THEN** 只保留獅尾黑体（标准）、獅尾腿黑体（有衬线装饰）、獅尾糖黑体（圆角）3个差异明显的

#### Scenario: 霞鹜文楷系列精简
- **GIVEN** 当前有7个霞鹜文楷相关字体
- **WHEN** 去重后
- **THEN** 只保留霞鹜文楷 Regular、霞鹜文楷 Light（细体差异）、霞鹜文楷 Mono（等宽差异）

#### Scenario: 悠哉系列精简
- **GIVEN** 当前有4个悠哉变体
- **WHEN** 去重后
- **THEN** 只保留1个悠哉 Regular

### Requirement: 字体预览正确渲染
The system SHALL 确保 FontPicker 中每个字体项在字体加载完成后以自身字形渲染预览。

#### Scenario: 字体项进入视口
- **GIVEN** 字体选择器已打开
- **WHEN** 用户滚动到某字体项
- **THEN** 该项立即加载对应字体 CSS，加载完成后以该字体渲染 displayName

#### Scenario: 字体加载失败降级
- **GIVEN** 某字体 CDN 不可访问
- **WHEN** 加载失败
- **THEN** 该项仍显示 displayName 文本，但不强制使用 font-family（避免空白或系统 fallback 误导）

## MODIFIED Requirements
### Requirement: 字体数据结构
- FontData 接口保持不变
- family 字段必须与 CSS 中 @font-face 的 font-family 完全一致
- previewText 使用 displayName 内容（确保 &text= 参数加载所需字符）

## REMOVED Requirements
### Requirement: 150个字体数量目标
**Reason**: 用户明确要求去重，同系列只保留3个，数量自然下降到80-100个
**Migration**: 验收标准改为"约80-100个无重复、风格差异明显的中文字体"
