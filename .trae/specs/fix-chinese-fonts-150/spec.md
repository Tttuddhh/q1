# 修复中文字体库 - 150种真实可渲染中文字体

## Why
当前字体选择器的"中文字体"分类存在严重问题：
1. **分类错误**：大量日文、韩文字体被错误标记为 `category: 'chinese'`，导致用户看到"佑二藏书"、"禅角黑体"等日文名称
2. **字体不存在**：很多字体（如 ZCOOL QingKe ChongYue、ZCOOL KuaiLeZhi、LXGW Marker Gothic 等）在 Google Fonts 上并不存在，导致无法加载和渲染
3. **重复冗余**：Noto Sans SC/TC/HK、思源宋体简繁港等本质上是同一字体的不同地区变体，视觉上几乎无差异
4. **数量不足**：真正可渲染的中文字体远不足150种

## What Changes
- **BREAKING**: 完全重写 `src/data/fonts.ts`，只保留真实存在于 Google Fonts 或可靠 CDN 的中文字体
- **BREAKING**: 日文/韩文字体正确归类到 `japanese`/`korean` 分类，不再混入 `chinese`
- 使用 Google Fonts 官方 API 验证每个字体的真实存在性
- 通过 `&text=` 参数只加载预览所需字符，确保字体文件能被正确请求
- 保留 `cssUrl` 机制支持 @chinese-fonts CDN 作为补充来源
- 英文字体精简到 ~20 种，去除重复和相似字体

## Impact
- Affected specs: font-picker
- Affected code: `src/data/fonts.ts`, `src/utils/fontLoader.ts`, `src/components/FontPicker.tsx`

## ADDED Requirements

### Requirement: 中文字体必须真实可渲染
The system SHALL only include Chinese fonts that are confirmed to exist on Google Fonts or reliable CDN sources.

#### Scenario: 字体验证
- **WHEN** 字体数据被定义时
- **THEN** 每个字体的 `googleFontName` 必须对应 Google Fonts 上真实存在的字体
- **AND** 如果通过 `cssUrl` 加载，CDN 链接必须可访问

### Requirement: 分类严格区分语言
The system SHALL strictly categorize fonts by their primary language support.

#### Scenario: 分类正确性
- **WHEN** 用户查看"中文字体"分类
- **THEN** 只显示真正支持中文（CJK）的字体
- **AND** 日文字体显示在"日文字体"分类
- **AND** 韩文字体显示在"韩文字体"分类

### Requirement: 150种中文字体
The system SHALL provide at least 150 unique Chinese fonts.

#### Scenario: 数量验证
- **WHEN** 统计 `category: 'chinese'` 的字体数量
- **THEN** 数量 >= 150
- **AND** 所有字体 `name` 唯一

## MODIFIED Requirements

### Requirement: 字体加载机制
**修改**: `fontLoader.ts` 的 `loadFontAsync` 需要正确处理 Google Fonts 的 `&text=` 参数，只加载预览字符。

**原因**: 中文字体文件很大，只加载预览字符可以大幅减少加载时间和流量。

## REMOVED Requirements

### Requirement: 虚假字体条目
**Reason**: 大量字体在 Google Fonts 上不存在，导致 404 错误和渲染失败。
**Migration**: 删除所有无法验证的字体条目，替换为真实存在的字体。
