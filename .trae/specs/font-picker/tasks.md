# 字体选择器重构 - 实施计划（tasks.md）

## [x] Task 1: 审查现有字体系统代码，明确问题根源
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 阅读 `src/data/fonts.ts` 了解字体数据结构、字段含义和所有字体条目
  - 阅读 `src/components/FontPicker.tsx` 了解字体选择器的渲染逻辑和交互行为
  - 阅读 `src/utils/fontLoader.ts` 了解字体加载实现
  - 阅读 `src/App.tsx`、`src/components/MainContent.tsx`、`src/components/RichTextEditor.tsx` 了解选中字体后如何应用到编辑器
  - 明确四个问题：(a) 预览未用目标字体渲染；(b) 字体名称为英文；(c) 大量重复/无关字体；(d) 缺少中文预览文本
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `programmatic` 验证 fonts.ts 中 FONTS 数组当前 > 100 条（确认问题规模）
  - `human-judgment` 打开字体选择器下拉，确认当前没有用目标字体渲染预览
- **Notes**: 已完成 — 当前 fonts.ts 约 1700 行，100+ 字体；FontPicker 仅在点击时才加载字体；fontLoader 仅插入 link 不监听就绪

## [ ] Task 2: 重写 fonts.ts — 精选字体并扩展数据结构
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 新增 FontData 字段：`displayName`（中文显示名，如 "思源黑体"）和 `previewText`（预览文本，如 "天地玄黄 宇宙洪荒"）
  - 中文字体精选（保留 6-8 个）：
    - Noto Sans SC → 思源黑体（无衬线，正文首选）
    - Noto Serif SC → 思源宋体（衬线，排版/标题）
    - LXGW WenKai → LXGW 文楷（手写/正文兼具）
    - Ma Shan Zheng → 马善政毛笔楷书（毛笔楷书，标题/装饰）
    - Zhi Mang Xing → 志莽行书（行书，装饰）
    - Long Cang → 龙藏草书（草书，装饰）
    - ZCOOL KuaiLe → 站酷快乐体（活泼，标题/标题装饰）
    - ZCOOL QingKe HuangYou → 站酷庆科黄油体（圆润，可爱风格）
  - 英文/其他字体精选（保留 4-6 个）：
    - Inter（无衬线，现代化 UI 首选）
    - Roboto（无衬线，经典）
    - Playfair Display（衬线，标题）
    - Merriweather（衬线，正文）
    - JetBrains Mono（等宽，代码块）
    - Pacifico（手写/装饰）
  - 彻底删除 `other` 分类下的小语种字体（Noto Sans Lao, Armenian, Georgian 等 50+ 个不相关字体）
  - 保留 SYSTEM_FONT 条目，设置 `displayName: "系统默认"` 和 `previewText: "天地玄黄"`
  - FONT_CATEGORIES 保留现有结构（chinese/english/other 分类在新实现中仅有 chinese/english 两项，other 可以保留为空或移除）
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-7
- **Test Requirements**:
  - `programmatic` FONTS.length <= 15
  - `programmatic` 每个字体都有 non-empty `displayName` 和 `previewText`
  - `human-judgment` 手动检查字体名称和预览文本是否符合中文用户习惯
- **Notes**: Google Fonts 对中文字体需使用正确的 PostScript 名。Noto Sans SC 在 Google Fonts 的 CSS 中 `font-family` 就是 `"Noto Sans SC"`，LXGW WenKai 是 `"LXGW WenKai"` 等。确认 ZCOOL KuaiLe 和 ZCOOL QingKe HuangYou 的 googleFontName 为 `ZCOOL+KuaiLe` 和 `ZCOOL+QingKe+HuangYou`

## [ ] Task 3: 增强 fontLoader.ts — 支持字体加载完成的 Promise 回调
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 保留现有 `loadGoogleFont(googleFontName)` 的核心逻辑（插入 `<link>` 到 `<head>`）
  - 新增 `async loadGoogleFontAwait(googleFontName, sampleText?): Promise<void>` 方法：
    1. 若已加载直接 resolve
    2. 否则插入 `<link>`（如尚未插入）
    3. 调用 `document.fonts.load('16px "' + fontFamilyName + '"', sampleText || "")` 来强制加载指定字重/字符
    4. 使用 `document.fonts.ready` 或 `document.fonts.load().then()` 等待字体实际可用
    5. 标记已加载并 resolve
  - 保留现有 `isFontLoaded()` 辅助函数
  - 新增 `async preloadAllFonts(fonts[]): Promise<void>`，循环调用上一步的方法
- **Acceptance Criteria Addressed**: AC-1, AC-5
- **Test Requirements**:
  - `programmatic` 类型检查通过
  - `human-judgment` 在浏览器 DevTools Network 面板确认字体文件确实被请求并加载完成
- **Notes**: `document.fonts.load` 在调用前需要 CSS 中已有 `@font-face` 声明（即 `<link>` 的 Google Fonts CSS 已解析完成）。可能需要 await `document.fonts.ready` 或者使用 `fontfaceobserver` 轻量库（但约束中不新增依赖）。简化策略：先插入 `<link>`，在 `setTimeout(100ms)` 后调用 `document.fonts.load`，再等待 `document.fonts.ready`。另一种更稳健的方式：使用内联 `@font-face` + `new FontFace()` API 手动加载

## [ ] Task 4: 修改 FontPicker.tsx — 打开下拉时预加载字体并以目标字体渲染
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 修改 FontData 类型使用（从 `font.name` 改为显示 `font.displayName`，预览文本改为 `font.previewText`）
  - 在 `isOpen` 从 false → true 时（即用户点击按钮打开下拉时），触发 `preloadAllFonts(filteredFonts)` 异步预加载
  - 预加载过程中维护一个 `loadedFontFamilies: Set<string>` state，字体可用后通过 setState 触发 re-render
  - 每一项的渲染：
    - 行高：40px
    - 字号：16px（足以分辨字体特征）
    - 字体族：`fontFamily: font.family`
    - 内容：显示 `displayName` 和 `previewText`，可以是 `displayName` 在上、`previewText` 在下的双行布局，或者单行加括号显示预览
    - 选中状态：当前选中字体项加高亮（已有的逻辑保留）
  - 下拉宽度从 220px 增加到 280px，容纳较长中文名称
  - 系统默认字体项保留特殊样式（使用系统字体、加 "A/字" 标记说明不会变更字体）
  - Search 搜索关键字支持中英文匹配（搜索同时匹配 `name` 和 `displayName`）
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-4, AC-5, AC-7
- **Test Requirements**:
  - `programmatic` npm run build 无类型错误
  - `human-judgment` 打开下拉列表，目测每一项字形不同，且中文字体显示中文
  - `human-judgment` 点击选中字体后，编辑器文本立即变更为该字体
  - `human-judgment` 搜索功能正常，中英文关键字都能命中
- **Notes**: 预览文本字符数多，Google Fonts 中文字体文件大。为了快速预览效果，预加载时可以用 `&text=` subset 参数只请求预览文本字符 + 常用字符（如在 `fontLoader` 中实现 `loadGoogleFontAwait(family, text)`，用 `https://fonts.googleapis.com/css2?family=...&text=<encodedText>&display=swap`）

## [ ] Task 5: 类型定义与集成检查
- **Priority**: P1
- **Depends On**: Task 2, Task 4
- **Description**:
  - 确认 `FontData` interface 新字段的类型定义完备
  - 检查所有使用 `FONTS` 数组的地方是否兼容新字段（目前只有 FontPicker.tsx 使用，不需要额外修改）
  - 检查 `SYSTEM_FONT` 常量是否有 `displayName` 和 `previewText`（需要同步添加）
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` `npx tsc -b` 或 `npm run build` 无 TypeScript 错误
- **Notes**: SYSTEM_FONT 目前没有 googleFontName，不需要加载字体

## [ ] Task 6: 本地构建 + 预览验证
- **Priority**: P0
- **Depends On**: Task 2, Task 3, Task 4, Task 5
- **Description**:
  - `npm run build` 确认构建通过
  - `npm run preview` 本地预览，或 `npm run dev` 调试
  - 手动测试以下场景：
    1. 打开字体选择器 → 每项字体不同 → 等待 2-3 秒后字体字形刷新 → 每一项独特
    2. 选中"思源黑体" → 编辑器正文变为思源黑体
    3. 选中"站酷快乐体" → 编辑器正文变为快乐体
    4. 切换到"系统默认" → 恢复浏览器默认字体
    5. 在搜索框输入"宋体"或"serif" → 正确命中
    6. 多次开关下拉 → 第二次及以后打开立即有字体渲染（已缓存）
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7
- **Test Requirements**:
  - `programmatic` `npm run build` exit code 0
  - `human-judgment` 上述 6 个场景目测通过
- **Notes**: 如果浏览器中 Google Fonts 被网络限制，可能需要科学上网或使用本地字体 fallback 测试
