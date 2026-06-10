# 修复字体选择器 v2 Spec

## Why
用户在截图中反馈字体选择器仍存在三个问题：
1. 中文字体分类下的字体预览显示的是英文（如 "Noto Sans SC"），应该用中文预览（如 "思源黑体"）
2. 部分字体没有正确渲染（如 LXGW WenKai 显示为默认字体）
3. 需要重新选择字体，确保每个分类的字体都符合分类，渲染正常，不重复

## What Changes
- 所有中文字体的 preview 字段改为中文文本（如 "思源黑体"、"马善政毛笔"）
- 英文字体的 preview 字段改为英文文本
- 其他语言字体的 preview 字段改为对应语言的样本文本
- 验证所有 Google Fonts 名称正确，确保字体能正确加载
- 删除可能重复的字体
- 优化字体加载，使用 text 参数只加载需要的字符，加速显示

## Impact
- Affected specs: fix-font-picker-preview
- Affected code: src/data/fonts.ts, src/utils/fontLoader.ts

## ADDED Requirements
### Requirement: 中文字体使用中文预览
The system SHALL display Chinese font previews using Chinese characters.

#### Scenario: 中文字体预览
- **WHEN** 用户查看中文字体分类
- **THEN** 每个字体预览显示中文文本（如 "思源黑体"、"马善政毛笔"）

### Requirement: 字体正确渲染
The system SHALL ensure all fonts are correctly loaded from Google Fonts.

#### Scenario: 字体加载
- **WHEN** 字体选择器打开
- **THEN** 所有字体都能正确渲染，不出现回退到默认字体的情况

## MODIFIED Requirements
### Requirement: 字体数据
The system SHALL provide a curated, non-repeating list of fonts with correct previews.

## REMOVED Requirements
None.
