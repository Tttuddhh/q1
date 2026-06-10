# 修复字体选择器 v3 Spec

## Why
用户在截图中反馈字体选择器中的字体没有正确渲染出各自的字体效果。根本原因是：
1. Google Fonts API v2 的 `text` 参数虽然只加载指定字符，但中文字符（如"思源黑体"）在Google Fonts的CSS响应中可能只返回一个 `@font-face` 规则，且某些字体对中文字符的支持有限
2. 字体加载是异步的，当字体选择器打开时立即渲染列表，此时字体可能还没加载完成
3. 部分字体（如手写体、展示字体）对中文预览字符的支持可能不完整

## What Changes
- 字体加载不再使用 `text` 参数，改为加载完整字体子集（使用 `subset=chinese-simplified` 等参数）
- 字体选择器使用 `document.fonts.load()` API 等待字体加载完成后再渲染
- 为每个字体项添加加载状态指示，加载完成后再应用字体样式
- 使用 `font-display: swap` 配合回退字体，确保文字始终可见

## Impact
- Affected specs: fix-font-picker-preview, fix-font-picker-v2
- Affected code: src/utils/fontLoader.ts, src/components/FontPicker.tsx

## ADDED Requirements
### Requirement: 字体正确渲染
The system SHALL ensure each font in the picker renders with its own typeface.

#### Scenario: 字体列表渲染
- **WHEN** 用户打开字体选择器
- **THEN** 每个字体名称/预览都显示为该字体自身的样式

## MODIFIED Requirements
### Requirement: 字体加载策略
The system SHALL load complete font subsets instead of per-character subsets.

## REMOVED Requirements
None.
