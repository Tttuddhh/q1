# 修复中文字体渲染问题 - 产品需求文档

## Overview
- **Summary**: 彻底修复字体选择器中50种中文字体的渲染问题，确保每种字体都能正确显示自身的字形样式，所有字体名称均为中文，无英文混杂
- **Purpose**: 解决当前字体列表中字体无法渲染、名称含英文、字体效果不明显的问题

## Why
当前字体系统存在三个严重问题：
1. **字体无法渲染**：fontsource CDN 的 CSS 中使用相对路径 `./files/xxx.woff2`，通过 `<link>` 跨域加载时路径解析失败，导致浏览器无法下载字体文件
2. **名称含英文**：50个字体中有大量使用英文原名（如 "Klee One", "Sawarabi Mincho", "Cherry Bomb One" 等），用户要求全部中文名称
3. **字体效果不明显**：很多日系 CJK 字体对中文字符使用系统 fallback，实际显示的是默认字形，看不到字体自身的特色

## What Changes
- **BREAKING**: 更换字体加载方案，从 fontsource `<link>` 加载改为 Google Fonts CSS2 API 直接加载
- 重写 `src/data/fonts.ts`，50个字体全部使用中文名称，移除所有英文名称
- 重写 `src/utils/fontLoader.ts`，使用 Google Fonts CSS2 API (`fonts.googleapis.com`) 加载字体
- 精简字体列表，只保留对中文有实际渲染效果的字体（移除纯日系无中文字形的字体）
- 更新 `src/components/FontPicker.tsx`，字体列表项使用 `font-family` 预览时确保字体已预加载

## Impact
- Affected code: `src/data/fonts.ts`, `src/utils/fontLoader.ts`, `src/components/FontPicker.tsx`
- Affected specs: add-50-chinese-fonts（完全替代）

## ADDED Requirements
### Requirement: 字体正确渲染
The system SHALL 确保每种中文字体都能正确加载并渲染自身的字形样式。

#### Scenario: 选择字体后文字正确显示
- **WHEN** 用户在字体选择器中点击一种字体
- **THEN** 编辑器中的文字立即以该字体的字形样式显示
- **AND** 字体名称在列表中也以该字体样式预览显示

### Requirement: 全部中文名称
The system SHALL 提供50种中文字体，所有字体的 `name` 字段均为纯中文名称，不含任何英文。

#### Scenario: 浏览字体列表
- **WHEN** 用户打开字体选择器
- **THEN** 看到的所有字体名称都是中文
- **AND** 没有任何英文名称混杂其中

### Requirement: 字体预加载预览
The system SHALL 在字体选择器面板打开时预加载所有字体，确保字体名称在列表中以自身字体样式显示。

#### Scenario: 打开字体选择器
- **WHEN** 用户点击字体选择器按钮
- **THEN** 字体列表中的每个字体名称都以该字体自身的样式渲染
- **AND** 用户能直观看到每种字体的视觉效果差异

## REMOVED Requirements
### Requirement: fontsource CDN 加载
**Reason**: fontsource 的 CSS 使用相对路径 `./files/xxx.woff2`，通过 `<link>` 跨域加载时路径解析失败，浏览器无法下载字体文件
**Migration**: 改用 Google Fonts CSS2 API 直接加载
