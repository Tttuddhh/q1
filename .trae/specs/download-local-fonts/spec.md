# 下载字体文件实现离线加载 - 产品需求文档

## Overview
- **Summary**: 将50种中文字体的 woff2 文件下载到项目本地，通过本地 `@font-face` 规则加载，实现离线可用、秒级渲染
- **Purpose**: 解决 Google Fonts CDN 加载慢、部分字体不存在、网络不稳定时无法使用的问题

## Why
当前字体系统仍存在严重问题：
1. **部分字体不存在于 Google Fonts**："巧克力古典黑"(Chocolate Classical Sans)、"仙人掌古典黑"(Cactus Classical Sans)、"演示佛系体"(Slidefu)、"演示悠然小楷"(Yozai)、"演示夏行楷"(Xia Xing Kai)、"演示春风楷"(ChunFeng Kai) 等字体在 Google Fonts 上不存在，导致无法加载
2. **思源系列看起来一样**：思源黑体简/繁/港、思源宋体简/繁/港 虽然字体文件不同，但视觉差异极小，用户看不出区别
3. **加载太慢**：Google Fonts CDN 需要从国外服务器下载，中文字体文件大（数 MB），首次加载需要数秒
4. **离线不可用**：没有网络时字体完全无法加载

## What Changes
- **BREAKING**: 完全移除 Google Fonts CDN 依赖，改为本地字体文件加载
- 使用 `fontsource` npm 包安装字体，构建时打包到产物中
- 重写 `src/data/fonts.ts`，只保留 fontsource 上真实存在的、对中文有渲染效果的字体
- 重写 `src/utils/fontLoader.ts`，改为 import fontsource CSS 文件的方式加载
- 移除 FontPicker 中的预加载逻辑（本地字体无需预加载）

## Impact
- Affected code: `src/data/fonts.ts`, `src/utils/fontLoader.ts`, `src/components/FontPicker.tsx`, `package.json`
- Affected specs: fix-chinese-fonts-render（完全替代）

## ADDED Requirements
### Requirement: 本地字体文件加载
The system SHALL 通过本地字体文件（woff2）加载所有字体，不依赖外部 CDN。

#### Scenario: 无网络环境下使用
- **WHEN** 用户在无网络环境下打开应用
- **THEN** 所有字体仍能正常加载和渲染

### Requirement: 字体真实存在且可渲染
The system SHALL 只使用 fontsource/npm 上真实存在的字体包，确保每种字体都能正确渲染中文字符。

#### Scenario: 选择任意字体
- **WHEN** 用户在字体选择器中选择任意一种字体
- **THEN** 文字以该字体自身的字形样式正确渲染
- **AND** 不会出现 fallback 到系统默认字体的情况

### Requirement: 字体加载速度快
The system SHALL 通过本地加载实现秒级字体渲染，无需等待 CDN 下载。

#### Scenario: 首次打开字体选择器
- **WHEN** 用户首次点击字体选择器
- **THEN** 字体列表立即显示，无需等待加载

## REMOVED Requirements
### Requirement: Google Fonts CDN 加载
**Reason**: 部分字体在 Google Fonts 上不存在；CDN 加载慢；离线不可用
**Migration**: 改用 fontsource npm 包本地加载
