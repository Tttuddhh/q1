# 离线中文字体库 Spec

## Why
当前字体选择器只能从 Google Fonts 加载中文字体，但 Google Fonts 上的中文字体资源有限（仅约 28 个），无法满足 120 个中文字体的需求。同时，在线加载字体存在网络依赖，离线时无法使用。需要扩展字体来源并支持本地下载与离线使用。

## What Changes
- **扩展字体来源**：除 Google Fonts 外，增加对其他字体源的支持（如 jsDelivr CDN 上的字体文件、字体家 CDN、有字库 CDN、阿里巴巴字体等）
- **本地下载**：首次使用字体时自动下载字体文件到本地（`public/fonts/` 目录），并存入浏览器缓存
- **离线可用**：字体文件下载到本地后，离线时仍能正常使用
- **120 个中文字体**：通过多源整合确保达到 120 个
- **实时预览**：在字体选择器中，选中字体后立即在预览区域显示该字体的渲染效果
- **BREAKING**: `fontLoader.ts` 的实现需要重写；`fonts.ts` 数据结构需要扩展（增加 `localFile` 字段）

## Impact
- Affected specs: `fix-font-duplicates-v2`（基于其完成状态扩展）
- Affected code:
  - [fonts.ts](file:///workspace/src/data/fonts.ts)（字体数据源，需要扩展 FontData 接口）
  - [fontLoader.ts](file:///workspace/src/utils/fontLoader.ts)（字体加载逻辑，需要支持本地 + 多 CDN）
  - [FontSelector 组件](file:///workspace/src/components/editor/FontSelector.tsx)（字体选择器 UI，需要实时预览）
  - `public/fonts/` 目录（新增，存放下载的字体文件）

## ADDED Requirements

### Requirement: 多字体来源支持
The system SHALL support loading Chinese fonts from multiple sources, not limited to Google Fonts. Supported sources include: Google Fonts API, jsDelivr CDN (fontsource), cdnfonts, and any direct URL to a .ttf/.woff/.woff2 file.

#### Scenario: 从 jsDelivr 加载字体
- **WHEN** 用户选择一个 jsDelivr 来源的字体
- **THEN** 系统从 `https://cdn.jsdelivr.net/npm/@fontsource/{font-name}/files/{font-name}-chinese-simplified-400-normal.woff2` 加载字体文件

#### Scenario: 从直链加载字体
- **WHEN** 用户选择一个直链 URL 的字体
- **THEN** 系统直接从该 URL 下载并加载字体文件

### Requirement: 字体本地下载与缓存
The system SHALL automatically download font files to the browser cache (or `public/fonts/`) on first use, so that the font is available offline subsequently.

#### Scenario: 首次使用字体
- **WHEN** 用户首次选择一个未缓存的字体
- **THEN** 系统下载该字体文件到本地存储
- **AND** 使用 `@font-face` 规则将本地文件注册到页面

#### Scenario: 离线使用字体
- **WHEN** 用户已下载某个字体，且当前处于离线状态
- **THEN** 系统从本地存储加载该字体，不发起网络请求
- **AND** 字体能正常渲染

### Requirement: 中文字体数量 ≥ 120
The system SHALL expose at least 120 distinct Chinese fonts across all supported sources. Number is achieved by aggregating fonts from multiple CDNs and direct font URLs.

#### Scenario: 统计中文字体数量
- **WHEN** 统计 category='chinese' 的字体条目
- **THEN** 数量 ≥ 120

### Requirement: 字体实时预览
The system SHALL show a real-time preview of the selected font in the font selector dropdown, so users can see the font style before applying it.

#### Scenario: 在字体选择器中悬停字体
- **WHEN** 用户在字体选择器中悬停或聚焦某个字体选项
- **THEN** 预览区域使用该字体渲染一段样本文本（如"天地玄黄，宇宙洪荒"）

#### Scenario: 选择字体后预览
- **WHEN** 用户选中某个字体
- **THEN** 编辑器中选中的文本立即使用该字体渲染
- **AND** 字体选择器的预览区域显示该字体

## MODIFIED Requirements

### Requirement: FontData 接口扩展
原 FontData 接口需增加 `sources` 字段，支持多来源：
```ts
interface FontData {
  name: string;
  family: string;
  category: 'chinese' | 'english' | 'other';
  tags: string[];
  preview: string;
  sources: Array<{
    type: 'google-fonts' | 'jsdelivr' | 'direct';
    url: string;
    format?: 'woff2' | 'woff' | 'ttf';
  }>;
}
```

## REMOVED Requirements
无。

## 实现策略

### 多源字体清单（已知真实可用的中文字体）

#### 1. Google Fonts（约 28 个，已验证）
Noto SC/HK/TC、LXGW WenKai、ZCOOL 系列、Ma Shan Zheng、Long Cang 等

#### 2. jsDelivr Fontsource（约 80+ 个中文字体）
- @fontsource/noto-sans-sc
- @fontsource/noto-serif-sc
- @fontsource/noto-sans-tc
- @fontsource/noto-serif-tc
- @fontsource/lxgw-wenkai-tc
- @fontsource/zcool-xiaowei
- @fontsource/zcool-kuaile
- @fontsource/ma-shan-zheng
- @fontsource/long-cang
- @fontsource/zhi-mang-xing
- 等

#### 3. cdnfonts.com（约 20+ 个中文字体）
- 思源黑体
- 思源宋体
- 站酷高端黑
- 站酷酷黑
- 演示夏行楷
- 演示佛系体
- 等

#### 4. 字体家 / 有字库（约 10+ 个）
- 鸿雷板书简体
- 江西拙楷
- 杨任东竹石体
- 等

#### 5. 直链下载（约 10+ 个）
- 阿里巴巴普惠体
- 钉钉进步体
- 优设标题黑
- OPPO Sans
- MiSans
- HarmonyOS Sans
- 等

### 本地下载与缓存方案
- 使用 `localStorage` 存储字体文件的 base64 编码（小字体）或
- 使用 `IndexedDB` 存储字体文件的 ArrayBuffer（大字体，推荐）
- 首次加载时通过 fetch 下载，存入 IndexedDB
- 后续使用时优先从 IndexedDB 读取

### 实时预览方案
- 在 FontSelector 组件中，每个字体选项使用该字体的 family 渲染样本文本
- 选中字体时，编辑器的选区立即应用该字体
