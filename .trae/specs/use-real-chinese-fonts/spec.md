# 使用真实多样化的中文字体 Spec

## Why
当前50个字体中约40个是站酷系列，且大量站酷字体名称是虚构的（Google Fonts 上不存在），导致字体无法正常加载和渲染。用户需要替换为真实存在于 Google Fonts 上的、来源多样化的中文字体。

## What Changes
- 删除 `src/data/fonts.ts` 中所有虚构的站酷字体
- 重新精选50个真实存在于 Google Fonts 的中文字体
- 字体来源多样化：思源系列、站酷真实字体、手写体、书法体、霞鹜系列等
- 每个字体的 `googleFontName` 必须真实存在于 Google Fonts API
- 保留 `displayName` 中文字段用于显示

## Impact
- Affected specs: replace-with-50-chinese-fonts
- Affected code: `src/data/fonts.ts`

## ADDED Requirements

### Requirement: 真实多样化的50个中文字体
The system SHALL provide exactly 50 real Chinese fonts from Google Fonts.

#### Scenario: 字体来源多样化
- **WHEN** 用户打开字体选择器
- **THEN** 显示50个来自不同来源的中文字体，不集中于单一品牌

#### Scenario: 字体真实可加载
- **WHEN** 用户选择某个字体
- **THEN** 字体从 Google Fonts CDN 正确加载并渲染

## MODIFIED Requirements

### Requirement: 字体数据
字体数据 SHALL 只包含 Google Fonts 上真实存在的中文字体。

#### Scenario: 站酷字体验证
- **WHEN** 定义站酷系列字体
- **THEN** 只使用 Google Fonts 上真实存在的站酷字体（如 ZCOOL KuaiLe、ZCOOL XiaoWei、ZCOOL QingKe HuangYou 等）

## REMOVED Requirements
### Requirement: 虚构的站酷字体
**Reason**: 大量 ZCOOL QingKe XXX 字体在 Google Fonts 上不存在，无法加载
**Migration**: 替换为其他真实存在的中文字体
