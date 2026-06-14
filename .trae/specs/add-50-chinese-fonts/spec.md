# 添加50种中文字体 - 产品需求文档

## Overview
- **Summary**: 为字体选择器（FontPicker）添加50种中文字体，全部来自 Google Fonts CDN，确保字体可正常渲染显示
- **Purpose**: 恢复字体选择器功能，提供丰富的中文字体选择，满足用户文档排版需求
- **Target Users**: 知识库应用的用户

## Why
字体选择器当前为空（之前已清空），用户需要重新选择字体时无法看到任何字体选项。需要补充50种高质量中文字体，全部来自 Google Fonts，确保每种字体都能正常加载和渲染。

## What Changes
- 在 `FONTS` 数组中添加50种中文字体定义
- 所有字体 category 统一为 `'chinese'`
- 使用 tags 字段区分字体风格（手写体、衬线体、无衬线体、可爱风、哥特风）
- 字体来源均为 Google Fonts CDN，通过 `fontLoader.ts` 动态加载
- 更新 FontPicker 组件中的分类显示逻辑，优化全中文场景下的字体分组展示

## Impact
- Affected specs: 编辑器字体选择器
- Affected code: `src/data/fonts.ts`, `src/components/FontPicker.tsx`

## Goals
- 添加50种可正常渲染的中文字体
- 所有字体来自 Google Fonts，确保加载可靠
- 字体按风格分类展示（手写体、衬线体、无衬线体、可爱风、哥特风）

## Non-Goals (Out of Scope)
- 不添加英文或其他语言字体
- 不修改字体加载机制（保持使用 Google Fonts CDN）
- 不修改 FontPicker 的核心交互逻辑

## Background & Context
- 字体数据存储在 `/workspace/src/data/fonts.ts` 的 `FONTS` 数组中
- 字体加载通过 `/workspace/src/utils/fontLoader.ts` 从 Google Fonts CDN 动态加载
- FontPicker 组件 (`/workspace/src/components/FontPicker.tsx`) 按 category 分组显示字体
- Google Fonts 上可用的中文字体有限，需精选50种确保全部可用

## Functional Requirements
- **FR-1**: FONTS 数组包含50个中文字体定义，每个字体包含 name、family、googleFontName、category、tags、preview 字段
- **FR-2**: 所有字体的 category 字段统一为 `'chinese'`
- **FR-3**: 每个字体通过 tags 字段标注风格（serif/sans/handwriting/cute/gothic）
- **FR-4**: 字体选择器能正确分组显示所有字体

## Constraints
- **Technical**: React + TypeScript 项目，需保持类型安全
- **Dependencies**: Google Fonts CDN 可用性

## Assumptions
- Google Fonts CDN 可正常访问
- 原 `FontData` 接口和 `SYSTEM_FONT` 常量保持不变

## Acceptance Criteria

### AC-1: FONTS 数组包含50个字体
- **Given**: 查看 `/workspace/src/data/fonts.ts` 文件
- **When**: 检查 `FONTS` 变量
- **Then**: `FONTS` 数组包含恰好50个字体定义，每个字体包含完整字段
- **Verification**: `programmatic`

### AC-2: 所有字体均为中文字体
- **Given**: 检查 FONTS 数组中的所有字体
- **When**: 验证每个字体的 category 字段
- **Then**: 所有字体的 category 字段均为 `'chinese'`
- **Verification**: `programmatic`

### AC-3: 字体按风格分类
- **Given**: 字体选择器面板打开
- **When**: 浏览字体列表
- **Then**: 字体按风格分组显示（手写体、衬线体、无衬线体、可爱风、哥特风）
- **Verification**: `human-judgment`

### AC-4: 项目构建成功
- **Given**: 修改后的代码
- **When**: 运行 `npm run build`
- **Then**: 构建成功，无 TypeScript 错误
- **Verification**: `programmatic`

### AC-5: 字体可正常渲染
- **Given**: 字体选择器中选择任意一个字体
- **When**: 选中字体后应用到编辑区文字
- **Then**: 文字以所选字体样式正确渲染
- **Verification**: `human-judgment`

## Open Questions
- [ ] 无