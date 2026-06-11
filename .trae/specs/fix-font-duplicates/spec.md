# 修复字体选择器重复与渲染问题 Spec

## Why
当前字体选择器存在两个核心问题：
1. 同一字体系列（如思源黑体）列出了过多字重变体（Thin/Light/Regular/Medium/Bold等），违反"每个系列仅4-5个字体"的要求。
2. 大量字体共享同一个 Google Fonts 名称（如"思源黑体 Thin"和"思源黑体 Light"的 googleFontName 实际是同一个 Noto+Sans+SC），导致选择不同字体却渲染出相同样式，违背"字体本来是什么样式就渲染什么样式"的原则。

## What Changes
- **重新设计字体系列分组**：每个真正的字体系列（如 Noto Sans SC、ZCOOL KuaiLe）只保留 1 个代表性字体条目，不再用字重拆分成多个。
- **每个字体对应一个独立 googleFontName**：确保每个选项加载的字体文件确实是不同的字体。
- **增加更多差异化的字体来源**：从 Google Fonts 真实存在的中文字体库中挑选，覆盖宋体、黑体、楷体、手写体、艺术体等不同风格。
- **保持中文字体总数 ≥ 120 个**：通过扩展字体系列数（而非字重）来满足数量要求。
- **BREAKING**: fonts.ts 文件结构被完全重写；现有字体条目大部分被替换。

## Impact
- Affected specs: `select-chinese-fonts`（原 spec 实际上未达成用户预期，需要重做）
- Affected code:
  - [fonts.ts](file:///workspace/src/data/fonts.ts)（字体数据源）
  - [fontLoader.ts](file:///workspace/src/utils/fontLoader.ts)（字体加载逻辑）
  - FontSelector 组件（消费 FONTS 常量）

## ADDED Requirements

### Requirement: 每个系列只保留 4-5 个差异明显的字体
The system SHALL ensure that for each font family (e.g. Noto Sans SC), at most 4-5 distinct variants are exposed in the font selector, and variants must have visually different font-family names (not just different weights of the same family).

#### Scenario: 查看思源黑体系列
- **WHEN** 用户在字体选择器中查看"思源黑体"相关条目
- **THEN** 该系列下至多出现 5 个字体，且每个字体对应一个独立的 googleFontName（指向不同的字体文件）

#### Scenario: 查看站酷系列
- **WHEN** 用户在字体选择器中查看"站酷"相关条目
- **THEN** 站酷小薇、站酷快乐、站酷庆科黄油、站酷高端黑等被视为不同系列，每个系列各保留 1 个代表字体

### Requirement: 字体必须真实加载并渲染对应样式
The system SHALL ensure that selecting a font in the editor renders text in that font's actual style, not a fallback default font. Each FontData entry's `googleFontName` MUST correspond to a real, available Google Font.

#### Scenario: 选择"霞鹜文楷"
- **WHEN** 用户在编辑器中选择"霞鹜文楷"字体并输入中文
- **THEN** 文字应使用霞鹜文楷（LXGW WenKai）的样式渲染，而不是默认字体

#### Scenario: 选择"思源宋体"
- **WHEN** 用户在编辑器中选择"思源宋体"字体并输入中文
- **THEN** 文字应使用 Noto Serif SC 的样式渲染

### Requirement: 中文字体总数 ≥ 120
The system SHALL expose at least 120 distinct Chinese fonts in the font selector. Quantity is achieved by adding more font families, not by splitting a single family into many weight variants.

#### Scenario: 统计中文字体数量
- **WHEN** 统计 category='chinese' 的字体条目
- **THEN** 数量 ≥ 120
- **AND** 所有 googleFontName 互不相同（去重后）

### Requirement: 字体来源多样化
The system SHALL source Chinese fonts from at least 3 different font foundries/series (e.g. Noto, LXGW, ZCOOL, Ma Shan Zheng, Long Cang, etc.) instead of relying on a single family.

#### Scenario: 检视字体来源
- **WHEN** 按 googleFontName 前缀/系列分组
- **THEN** 应至少存在 3 个不同系列的字体来源

## MODIFIED Requirements

### Requirement: 字体系列不再按字重拆分
原 `select-chinese-fonts/spec.md` 中的"每个系列 4-5 个字体"被误解为对同一字体按字重（Thin/Light/Regular/Medium/Bold）拆出多条目。现修改为：每个系列只保留 1 个代表字体（默认 Regular 字重），不再为同一字体的不同字重建立独立条目。

## REMOVED Requirements

### Requirement: 思源黑体五个字重变体
**Reason**: 同一字体的不同字重在字体选择器中作为独立条目出现，给用户造成"有 5 种不同字体"的错觉，实际渲染样式几乎相同。
**Migration**: 思源黑体（Noto Sans SC）仅保留 1 个默认条目；如需不同字重，应通过编辑器字号/字重工具栏切换。

### Requirement: 思源宋体五个字重变体
**Reason**: 同上，思源宋体（Noto Serif SC）不应按字重拆分成 5 个条目。
**Migration**: 思源宋体仅保留 1 个默认条目。

### Requirement: 思源黑体 HK / 思源宋体 HK 五个字重变体
**Reason**: 同上，HK 版本也不应按字重拆分。
**Migration**: 每个 HK 系列仅保留 1 个默认条目。

### Requirement: "艺术手写一/二/三"、"创意黑体一/二/三"等占位条目
**Reason**: 这些条目共享相同的 googleFontName，只是名称编号不同，没有实际的字体差异。
**Migration**: 删除所有占位/编号条目，替换为指向不同真实字体的条目。
