# 字体选择器实际加载与渲染修复 Spec

## Why
之前的 specs（`fix-font-duplicates-v2`、`offline-chinese-fonts`）声称"175 个中文字体、6 个来源、IndexedDB 缓存"等已实现，但通过 Playwright 自动化实测发现：

- 字体选择器共显示 **183 个选项**，但 `document.fonts` 实际注册成功仅 **3 个**（Noto Serif TC、Noto Serif SC、Noto Sans HK）
- IndexedDB 缓存里只有 **7 个**字体文件
- 183 个选项中绝大部分**全部加载失败**（404 / CORS / 假 URL）
- 失败的字体**依然显示绿色对勾 ✓**（误导用户）
- 思源黑体系列有 **12 个变体**（违反"每系列 4-5 个"的要求）
- 多个字体的 `font-family` CSS 字符串格式错误（缺引号）
- 演示系列、优设标题黑、庞门正道等字体在公开 CDN 上**根本不存在**
- 控制台大量 404 错误和 CORS 阻塞

用户实际看到的是：选择任何中文字体，渲染出的文字和默认字体**没有任何区别**。

本次 spec 的核心目标是：**通过端到端的浏览器验证，确保字体选择器中的每一个字体都能真正加载、注册到 `document.fonts`、并以正确样式渲染**。

## What Changes
- **逐个验证所有字体 URL**（HTTP 200 + 实际能返回 font 文件）
- **每个字体系列最多 5 个变体**（删除多余的 SC VF / CN / cn-fontsource 等重复条目）
- **修复 CSS `font-family` 字符串**（正确加引号）
- **删除不存在的字体**（演示系列、优设标题黑、庞门正道、京东、字魂等无公开 CDN 资源的字体）
- **UI 准确显示加载状态**（未加载的字体显示灰色 id 状态，不是绿色 ✓）
- **保留系统字体列表**（SimSun、SimHei 等），但它们不需要下载
- **BREAKING**: `fonts.ts` 文件被完全重写；`FontPicker.tsx` 加载状态逻辑需要修复
- **BREAKING**: `fontLoader.ts` 的 `loadAndRegisterFont` 必须在字体真正注册成功后才返回 `true`

## Impact
- Affected specs:
  - `fix-font-duplicates-v2`（被本次彻底重做）
  - `offline-chinese-fonts`（被本次彻底重做）
- Affected code:
  - [fonts.ts](file:///workspace/src/data/fonts.ts)（重写，删假字体、加真 URL、修 family 字符串）
  - [fontLoader.ts](file:///workspace/src/utils/fontLoader.ts)（修复 loadAndRegisterFont 的成功判定）
  - [FontPicker.tsx](file:///workspace/src/components/FontPicker.tsx)（修复 loadStates 状态显示）

## ADDED Requirements

### Requirement: 每次修改后自动浏览器自验收
The system SHALL have the agent itself open the browser (via Playwright) and verify the result after every modification, without requiring the user to manually check.

#### Scenario: 修改 fonts.ts 后自验收
- **WHEN** 完成 Task 2/3/4 的修改
- **THEN** Agent 自动执行 `scripts/e2e-font-render.mjs` 验证
- **AND** 截图保存到 `/workspace/screenshots/`
- **AND** 输出实际加载的字体数（`document.fonts.size`）
- **AND** 检查控制台是否有 404 错误

#### Scenario: 修改 fontLoader.ts 后自验收
- **WHEN** 完成 Task 5 的修改
- **THEN** Agent 自动执行 `scripts/e2e-font-render.mjs`
- **AND** 验证 `loadAndRegisterFont` 返回值符合预期
- **AND** 验证失败字体显示 "!" 而不是绿色 ✓

#### Scenario: 修改 FontPicker.tsx 后自验收
- **WHEN** 完成 Task 6 的修改
- **THEN** Agent 自动截图字体选择器
- **AND** 验证 UI 状态显示正确
- **AND** 验证 `document.fonts` 中实际加载的字体数 ≥ 50

### Requirement: 端到端验证 - 每个字体 URL 都必须真正可用
The system SHALL verify every font source URL with HTTP 200 and a valid font file response. Fonts with no working source SHALL be removed from the selector.

#### Scenario: 验证 Google Fonts 链接
- **WHEN** 验证 `https://fonts.googleapis.com/css2?family=Noto+Sans+SC`
- **THEN** 返回 HTTP 200，且 CSS 内容包含 `@font-face` 块

#### Scenario: 验证 jsDelivr 链接
- **WHEN** 验证 `https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/index.css`
- **THEN** 返回 HTTP 200，且 CSS 内容包含 `@font-face` 块

#### Scenario: 验证 cdnfonts 链接
- **WHEN** 验证 `https://fonts.cdnfonts.com/css?family=...`
- **THEN** 返回 HTTP 200

#### Scenario: 验证直链下载链接
- **WHEN** 验证一个 `.ttf` / `.woff2` 直链
- **THEN** 返回 HTTP 200，且 Content-Type 是 font 格式

### Requirement: 每个系列最多 4-5 个字体变体
The system SHALL limit the number of font variants per family to at most 5.

#### Scenario: 思源系列
- **WHEN** 查看思源黑体/宋体相关条目
- **THEN** 思源黑体 ≤ 5 个，思源宋体 ≤ 5 个（不能有 SC VF / CN / cn-fontsource 等重复）

#### Scenario: 霞鹜系列
- **WHEN** 查看霞鹜系列
- **THEN** 霞鹜文楷 ≤ 5 个，霞鹜马克哥特 ≤ 2 个

### Requirement: 字体必须真正注册到 document.fonts
The system SHALL ensure that selecting a font in the editor causes `document.fonts` to contain a `FontFace` with the corresponding family name, and the text renders in that font's actual style.

#### Scenario: 选择"思源黑体 SC"后渲染
- **WHEN** 用户选择"思源黑体 SC"并输入中文
- **THEN** `document.fonts` 包含 family 为 "Noto Sans SC" 的 FontFace
- **AND** 渲染的中文使用 Noto Sans SC 的样式（不是默认 sans-serif）

#### Scenario: 浏览器实测 ≥ 50 个中文字体真正可用
- **WHEN** 打开字体选择器，悬停前 20 个中文字体，等待 10 秒
- **THEN** 至少 50 个中文字体的 `document.fonts` 中存在对应的 FontFace

### Requirement: 准确的加载状态显示
The system SHALL accurately reflect the actual font loading state in the UI. A font that fails to load MUST NOT show a green checkmark.

#### Scenario: 字体加载失败
- **WHEN** 某个字体的所有 source URL 都返回 404
- **THEN** UI 显示感叹号 "!"（不是绿色对勾）
- **AND** 字体不会进入已加载集合 `loadedFonts`

#### Scenario: 字体加载成功
- **WHEN** 某个字体的 source URL 成功下载并注册
- **THEN** UI 显示绿色对勾 ✓

### Requirement: CSS font-family 字符串格式正确
The system SHALL ensure that every `FontData.family` string is a valid CSS font-family list (with all family names properly quoted).

#### Scenario: 检查江西拙楷的 family
- **WHEN** 检查 `江西拙楷` 的 family 字符串
- **THEN** 格式为 `"JiangXiZhuoKai", "JXZhuoKai", cursive`（引号正确）

## MODIFIED Requirements

### Requirement: loadAndRegisterFont 返回值语义
原实现：只要尝试过 source 列表（哪怕全部失败）就返回 `true`，导致 UI 显示绿色 ✓。

修改后：必须等到字体真正通过 `document.fonts.add()` 注册成功，或已在 `loadedFonts` 集合中，才返回 `true`。返回 `false` 时 UI 显示 "!" 状态。

## REMOVED Requirements

### Requirement: 删除的"假"字体
**Reason**: 这些字体在公开 CDN 上**根本不存在**（HTTP 404 / 域名不存在），无法下载。

**Migration**: 改为系统字体回退（如 SimSun, SimHei, KaiTi）。

- 演示夏行楷、演示佛系体、演示春风、演示秋鸿、演示悠然
- 优设标题黑、优设鲨鱼菲特
- 庞门正道系列（庞门正道、庞门正道标题体、庞门正道粗体、庞门正道轻松体、庞门正道卡通体）
- 京东、道里、东方大楷
- 仓耳鱼、字魂、书宋、汉仪软圆、齐伋体、繁体、标合体、迪北
- 975 圆体系列、原神 SC、WDXL 润滑系列
- 沐瑶系列、包图小白体、悠若系列、致小波系列、英雄骚包体
- 书黑、书黑体、联盟奇迹、汉字神字体、AZPPT
- 拼音手写体、心叶念体、转化龙、迪北、沐瑶
- 抖音美好体、斗鱼追光体
- Smiley Sans / 得意黑（部分 URL 404）
- 拉丁/泰语/日文等非中文字体

### Requirement: 删除的重复系列条目
**Reason**: 同一字体系列有 5+ 个变体（SC/TC/HK/CN/VF/cn-fontsource），实际指向相同的字体文件。

**Migration**: 每个系列保留 1-2 个最具代表性的变体（通常是 SC 和 TC）。

- 思源黑体 12 个 → 保留 5 个（SC、TC、HK、CN、JP）
- 思源宋体 9 个 → 保留 5 个（SC、TC、HK、CN、JP）
- 鸿雷板书 4 个 → 保留 2 个
- 阿里普惠体 3 个 → 保留 2 个
- 鸿蒙 Sans 3 个 → 保留 2 个
- MiSans 4 个 → 保留 2 个
- 悠哉 5 个 → 保留 3 个

## 实现策略

### 阶段 1: 字体 URL 验证脚本
- 创建 `scripts/verify-fonts.mjs`
- 对 `fonts.ts` 中每个 URL 执行 `fetch` + 检查 Content-Type
- 输出：每个字体的所有 source URL 的 HTTP 状态码
- 失败 URL 标记为"待删除"

### 阶段 2: 重写 fonts.ts
- 仅保留至少 1 个可用 source 的字体
- 每个系列最多 5 个变体
- 修复所有 `font-family` 字符串
- 删除所有"假"字体

### 阶段 3: 修复 fontLoader.ts
- `loadAndRegisterFont` 在调用 `registerFontFace` 后等待 50-200ms
- 通过 `document.fonts.check()` 或 `document.fonts.load()` 验证字体真正可用
- 验证通过后才返回 `true`

### 阶段 4: 修复 FontPicker.tsx UI 状态
- 增加 `loadedFonts` 检测
- UI 颜色：未加载（灰）、加载中（灰 + spinner）、已加载（绿 ✓）、失败（红 !）

### 阶段 5: 端到端浏览器验证
- Playwright 脚本进入字体选择器
- 等待 10 秒
- 统计 `document.fonts` 中实际加载的字体数
- 截图前后对比

## 验证标准

**Definition of Done**:
1. ✅ `npm run build` 无错误
2. ✅ Playwright 进入编辑模式、打开字体选择器
3. ✅ 至少 **50 个**中文字体的 `document.fonts` 中存在对应的 FontFace
4. ✅ 每个字体系列的变体数 ≤ 5
5. ✅ 所有 `font-family` 字符串格式正确（CSS 验证通过）
6. ✅ 失败的字体显示感叹号 "!"，不显示绿色 ✓
7. ✅ 用户选择某个字体后，输入中文能以该字体的实际样式渲染
