# 字体选择器重构 - Product Requirement Document

## Overview
- **Summary**: 重构当前字体选择器组件，实现真正的字体实时预览，精简并优化字体库，让中文字体在下拉列表中以中文名称和中文示例文本展示，并且文字确实以该字体渲染。
- **Purpose**: 解决用户反馈的三个核心问题：(1) 字体下拉列表中字体名没有用对应字体真正渲染；(2) 存在大量重复/相似度高的字体以及不相关的小语种字体；(3) 明明是中文字体却显示英文名称。
- **Target Users**: 中文用户使用知识库编辑器，希望通过字体选择器快速选择并预览不同字体的排版效果。

## Goals
1. 字体下拉列表打开时，每一项都以对应字体实际渲染，用户可以实时看到字体效果
2. 中文字体显示中文名称（如"思源黑体"而非"Noto Sans SC"）和中文预览文本
3. 精简字体库，移除重复、相似、不相关的小语种字体，保留 10-15 个精选字体
4. 选中字体后能立刻在编辑器中生效，无明显延迟

## Non-Goals (Out of Scope)
- 不新增自定义字体上传功能
- 不实现系统字体（本地已安装字体）的检测与集成
- 不新增字体大小、粗细等更多排版选项（独立功能）
- 不改编辑器核心内容存储格式（只改渲染层 CSS）

## Background & Context
- `src/data/fonts.ts`：约 1700 行，定义了 100+ 字体，分为 `chinese` / `english` / `other` 三类。每个条目包含 `name` / `family` / `googleFontName` / `category` / `tags` / `preview`，其中 `preview` 就是 `name` 的复制（英文）
- `src/components/FontPicker.tsx`：使用 Google Fonts 通过 `<link>` 动态加载，只有在用户点击选中某字体时才触发加载，下拉列表的预览文本虽然设置了 `fontFamily` 但未预先加载，因此显示系统默认字体
- `src/utils/fontLoader.ts`：仅往 `<head>` 插入 `<link>`，不调用 `document.fonts.load` 也不监听 `document.fonts.ready`

## Functional Requirements
- **FR-1**: 重构字体数据结构 — 新增 `displayName`（中文显示名）和 `previewText`（中文预览文本）字段；保留原有 `family` / `googleFontName` / `category` / `tags`
- **FR-2**: 精选中文字体列表 — 保留 6-8 个代表性中文字体（如思源黑体、思源宋体、LXGW 文楷、站酷快乐体、站酷庆科黄油体等），删除 ZCOOL 重复系列和其他与中文排版无关的小语种字体
- **FR-3**: 精选英文/其他字体 — 保留 4-6 个常用英文字体（Roboto、Inter、Playfair Display、Merriweather、JetBrains Mono 等）
- **FR-4**: 字体选择器下拉打开时，每一项用该字体实际渲染 — 使用中文预览文本（中文字体）或英文示例文本（英文字体），并且在渲染前完成字体加载
- **FR-5**: 字体懒加载机制 — 打开字体选择器下拉时，开始异步加载所有未加载过的字体，字体加载完成后通知 UI 重渲染
- **FR-6**: 选中字体后立即应用到编辑器区域，字体对文章内容生效

## Non-Functional Requirements
- **NFR-1 (性能)**: 字体加载总时长（打开下拉到所有字体可用）不超过 3 秒（在常规网络环境下）。单字体加载应使用 `display=swap`，避免文字不可见
- **NFR-2 (可维护性)**: 字体列表数据结构清晰，新增/删除字体只需修改一个文件
- **NFR-3 (可用性)**: 字体选择器 UI 保持一致，不增加操作步骤，不改变快捷键行为
- **NFR-4 (视觉)**: 每个字体项高度适中（32-48px），预览文本字号 ≥14px，足够用户分辨字体特征

## Constraints
- **技术栈**: React 19 + TypeScript + Vite，不引入额外依赖
- **字体来源**: 仅使用 Google Fonts，通过 `googleFontName` 拼接 CSS URL。注意 Google Fonts 中国大陆访问可能受限，但当前项目已有此依赖
- **字体文件大小**: 中文字体文件较大，优先选择 `&text=xxx` 方式只加载预览文本所需字符，或者使用 `display=swap` 避免阻塞
- **CSS 字体族**: 必须正确声明 `font-family`，与 Google Fonts 提供的 PostScript 名称一致

## Assumptions
- 用户浏览器环境支持 `CSS Font Loading API` (`document.fonts`)，现代主流浏览器均支持（Chrome 35+ / Safari 11.1+ / Firefox 41+）
- 应用在 HTTPS 或本地 file:// / localhost 环境下运行，Google Fonts CSS 资源可访问
- 用户使用的设备有中文字体支持（否则 system fallback 可能也没有中文字形）

## Acceptance Criteria

### AC-1: 字体选择器下拉项以对应字体实际渲染
- **Given**: 用户打开字体选择器下拉菜单
- **When**: 下拉菜单展开后 1-2 秒内
- **Then**: 每一项字体名称和预览文本都以该字体的字形显示，视觉上与其他项有明显差异
- **Verification**: `human-judgment` — 手动打开下拉列表，观察是否每个字体项都有独特字形
- **Notes**: 如果网络慢，允许先显示系统默认字体，加载完后自动刷新

### AC-2: 中文字体显示中文名称和中文预览
- **Given**: 用户查看字体选择器
- **When**: 浏览中文字体分类
- **Then**: 每一项显示中文名称（如"思源黑体"）和中文示例文本（如"天地玄黄 宇宙洪荒"），而非英文名称 "Noto Sans SC"
- **Verification**: `human-judgment` — 视觉检查
- **Notes**: 英文/等宽字体项仍显示英文名称和英文预览（如 "Roboto" + "The quick brown fox"）

### AC-3: 字体列表精简且无重复
- **Given**: 用户浏览完整的字体列表
- **When**: 逐个检查字体名称和视觉效果
- **Then**: 字体总数 ≤ 15；无重复字体名；无视觉高度相似的字体（如多个只有细微差别的 ZCOOL 变体）
- **Verification**: `human-judgment`（人工审查）+ `programmatic`（断言 `FONTS.length <= 15`）

### AC-4: 选中字体后编辑器文本立即生效
- **Given**: 用户在字体选择器中点击某字体
- **When**: 选择完成后查看编辑器正文
- **Then**: 编辑器中所有文本立刻以所选字体渲染（字体未缓存时可能有短暂的系统字体 fallback 阶段）
- **Verification**: `human-judgment`

### AC-5: 字体加载不阻塞 UI
- **Given**: 用户首次打开字体选择器下拉
- **When**: 字体正在后台加载
- **Then**: 下拉菜单立即显示，不冻结浏览器；在字体加载完成后自动刷新预览项的字形
- **Verification**: `human-judgment`

### AC-6: 类型安全
- **Given**: 开发者编译项目
- **When**: 运行 `tsc -b`（构建时类型检查）
- **Then**: 无类型错误
- **Verification**: `programmatic` — 运行 `npm run build` 无编译错误

### AC-7: 默认系统字体选项保留
- **Given**: 用户打开字体选择器
- **When**: 查看列表第一项
- **Then**: "系统默认" 选项始终存在，选中后恢复浏览器默认字体
- **Verification**: `human-judgment`

## Open Questions
- [ ] **Q1**: 字体预览文本用什么固定内容？（候选："天地玄黄 宇宙洪荒" / "永和九年 岁在癸丑" / 自定义简短示例）
  - **决策**: 每个中文字体固定使用"天地玄黄 宇宙洪荒"作为预览文本，简洁且涵盖多种笔画
- [ ] **Q2**: 字体选择器下拉宽度是否需要增大以容纳较长中文名称？
  - **决策**: 下拉宽度从当前 220px 增大到 280px，字体项高度从当前值增加到 40px，字号 16px
- [ ] **Q3**: 选择站酷系列（ZCOOL）的哪些字体？
  - **决策**: 保留 2 个风格差异最大的 ZCOOL 字体：ZCOOL KuaiLe（站酷快乐体，活泼可爱）和 ZCOOL QingKe HuangYou（站酷庆科黄油体，圆润），删除其余 ZCOOL 变体
- [ ] **Q4**: 是否需要按字符子集加载中文字体以减少流量？
  - **决策**: 在预览阶段使用 `&text=` 参数只请求预览文本涉及的字符；应用到编辑器时再加载完整字符集（或完整字重）
