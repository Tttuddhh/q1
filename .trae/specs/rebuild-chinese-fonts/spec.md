# 重建中文字体库 Spec

## Why
当前字体列表经过多次迭代，存在历史遗留问题：部分字体虽然名义上来自 CDN 但实际渲染效果不佳，部分字体来源单一加载不稳定。用户要求彻底删除所有字体，重新从零开始选择 120 个高质量中文字体，确保全部能正常渲染。

## What Changes
- **删除所有现有字体**：清空 FONTS 数组，仅保留 SYSTEM_FONT
- **重新选择 120 个中文字体**：全部 category 为 'chinese'，不包含英文字体和其他语言字体
- **确保字体可正常渲染**：每个字体必须有至少 2 个经过验证的可用 source
- **确保字体格式正确**：CSS @font-face 注册正确，font-family 字符串格式正确
- **BREAKING**: FONTS 数组完全重建，移除所有 english 和 other 分类字体

## Impact
- Affected specs: `select-chinese-fonts`, `offline-chinese-fonts`, `fix-font-actual-rendering`, `fix-font-duplicates`, `fix-font-duplicates-v2`
- Affected code:
  - [fonts.ts](file:///workspace/src/data/fonts.ts)（完全重写 FONTS 数组）
  - [fontLoader.ts](file:///workspace/src/utils/fontLoader.ts)（保持不变）
  - [FontPicker.tsx](file:///workspace/src/components/FontPicker.tsx)（可能需要调整分类显示）

## ADDED Requirements

### Requirement: 120 个纯中文字体
The system SHALL provide exactly 120 Chinese font entries, all with category 'chinese'. No English or other category fonts shall remain.

#### Scenario: 中文字体数量
- **WHEN** 统计 FONTS 数组中 category='chinese' 的条目
- **THEN** 数量 = 120

#### Scenario: 无英文字体
- **WHEN** 统计 FONTS 数组中 category='english' 的条目
- **THEN** 数量 = 0

### Requirement: 每个字体至少 2 个可用源
The system SHALL ensure each font has at least 2 verified source URLs, with at least 1 from jsDelivr fontsource/CDN.

#### Scenario: 字体源验证
- **WHEN** 运行 verify-fonts.mjs 验证所有 source URL
- **THEN** 每个字体至少有 1 个 source 返回 HTTP 200
- **AND** 每个字体至少有 2 个 source 条目

### Requirement: 字体可正常渲染
The system SHALL ensure all 120 fonts can be loaded and registered to document.fonts successfully.

#### Scenario: 字体实际加载
- **WHEN** 在浏览器中打开字体选择器并触发字体加载
- **THEN** 至少 80 个 CJK 字体的 FontFace 实际注册到 document.fonts 且 status 为 'loaded'

### Requirement: 字体格式正确
The system SHALL ensure all font-family CSS strings are properly quoted and formatted.

#### Scenario: CSS 格式验证
- **WHEN** 检查所有 FontData.family 字符串
- **THEN** 所有 family 字符串使用正确的 CSS 引号格式
- **AND** 所有 family 字符串包含 fallback（如 sans-serif 或 serif）

## MODIFIED Requirements

### Requirement: FontPicker 分类调整
原 FontPicker 同时显示 chinese/english/other 三个分类，现仅保留 chinese 分类。标签筛选（sans, serif, handwriting, cute, gothic）保留。

## REMOVED Requirements

### Requirement: 英文字体
**Reason**: 用户要求全部为中文字体，不再需要英文分类
**Migration**: 删除所有 category='english' 的字体条目

### Requirement: 其他语言字体
**Reason**: 用户要求全部为中文字体
**Migration**: 删除所有 category='other' 的字体条目

## 字体来源策略

优先使用以下来源，按优先级排列：
1. **jsDelivr fontsource**（`@fontsource/*`）：最稳定，CSS 包含 unicode-range 子集优化
2. **jsDelivr cn-fontsource**（`cn-fontsource-*`）：国内中文字体专用 CDN
3. **Google Fonts API**：作为备用源
4. **cdnfonts.com**：第三方 CSS 镜像
5. **直链 URL**：直接下载 woff2/ttf 文件

## 字体选择原则

- 每个字体系列最多 4-5 个变体
- 优先选择思源（Noto）系列、霞鹜系列、站酷系列等成熟开源字体
- 覆盖 sans-serif、serif、handwriting、cursive、display 等风格
- 确保每个字体都有简体中文支持
