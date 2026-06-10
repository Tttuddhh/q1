# 重建150个中文字体选择器 - 产品需求文档

## Overview
- **Summary**: 完全重建知识库编辑器中的字体选择器，提供150个真实可渲染的中文字体，确保每个字体都能正确加载和渲染，且字体之间风格差异明显。
- **Purpose**: 解决当前字体选择器中字体数量不足、部分字体无法真实渲染、混杂其他语言字体的问题。
- **Target Users**: 使用知识库编辑器的用户，需要丰富的中文字体选择。

## Goals
- 提供恰好150个中文字体（不混杂日文、韩文、英文等其他语言字体）
- 所有字体必须真实可渲染（通过浏览器自动化验证）
- 字体风格差异要大（包含黑体、宋体、楷体、行书、草书、篆书、隶书、手写体、像素体、艺术体等多种风格）
- 字体选择器打开时预加载所有字体，确保第一时间渲染
- 选择字体后编辑器正确应用该字体格式

## Non-Goals (Out of Scope)
- 不实现字体子集化或按需加载（首次加载全部150个字体CSS）
- 不实现字体自定义上传

## Background & Context
- 当前系统使用 Google Fonts API 和 @chinese-fonts CDN 加载字体
- 字体通过 `<link>` 标签注入 CSS，使用 `document.fonts.load()` 和 `document.fonts.check()` 验证
- 字体选择器组件为 `FontPicker.tsx`，编辑器为 `RichTextEditor.tsx`
- 字体数据存储在 `src/data/fonts.ts`，加载逻辑在 `src/utils/fontLoader.ts`

## Functional Requirements
- **FR-1**: 系统 SHALL 提供恰好150个中文字体选项
- **FR-2**: 每个字体 SHALL 通过真实浏览器渲染验证（Canvas 像素差异检测）
- **FR-3**: 字体选择器打开时 SHALL 预加载所有字体CSS，确保列表中每个字体以自身字形显示
- **FR-4**: 选择字体后 SHALL 等待字体加载完成再应用到编辑器
- **FR-7**: 系统 SHALL 将字体文件下载到本地 public/fonts/ 目录，实现离线使用
- **FR-8**: 系统 SHALL 在构建时自动下载所有字体CSS和字体文件到本地
- **FR-5**: 字体选择器 SHALL 正确显示当前选中的字体名称
- **FR-6**: 字体 SHALL 按风格分类（黑体/宋体/楷体/手写/艺术/像素/书法等）

## Non-Functional Requirements
- **NFR-1**: 字体选择器打开后3秒内完成全部字体预加载
- **NFR-2**: 字体选择器UI SHALL 流畅滚动，不卡顿
- **NFR-3**: 构建产物 SHALL 无TypeScript错误

## Constraints
- **Technical**: 
  - 使用 Google Fonts CSS API v2 和 @chinese-fonts jsDelivr CDN 作为字体源
  - 同时调研其他可用字体源（如 100font.com、字由、站酷、阿里妈妈字体等）
  - 字体文件下载到本地 public/fonts/ 目录实现离线使用
- **Business**: 只能使用免费商用字体
- **Dependencies**: 构建时需要网络下载字体，运行时无需外网依赖

## Assumptions
- 用户浏览器支持 `document.fonts` API
- jsDelivr CDN 和 Google Fonts CDN 在中国大陆可访问
- 150个字体同时加载不会造成浏览器崩溃

## Acceptance Criteria

### AC-1: 字体数量验证
- **Given**: 字体选择器打开
- **When**: 查看字体列表
- **Then**: 显示恰好150个中文字体（不含系统默认）
- **Verification**: `programmatic` - 检查 `FONTS.length === 150`

### AC-2: 字体真实渲染验证
- **Given**: 字体选择器打开
- **When**: 查看字体列表中的任意字体
- **Then**: 该字体项以自身字形渲染（而非系统默认字体）
- **Verification**: `programmatic` - Playwright Canvas 像素差异检测

### AC-3: 字体应用验证
- **Given**: 编辑器中有文本内容
- **When**: 选择任意字体
- **Then**: 编辑器中的文本以该字体渲染
- **Verification**: `human-judgment` - 人工确认字体效果

### AC-4: 字体风格差异
- **Given**: 150个字体列表
- **When**: 浏览字体列表
- **Then**: 可见明显不同的风格（黑体/宋体/楷体/手写/艺术/像素/书法等）
- **Verification**: `human-judgment`

### AC-5: 选中状态显示
- **Given**: 已选择某个字体
- **When**: 重新打开字体选择器
- **Then**: 选择器按钮和列表中正确显示该字体名称
- **Verification**: `programmatic` - 检查UI状态

## Open Questions
- [ ] 150个字体同时加载CSS是否会造成性能问题？
- [ ] 是否需要分页或虚拟滚动来优化大量字体的渲染性能？
