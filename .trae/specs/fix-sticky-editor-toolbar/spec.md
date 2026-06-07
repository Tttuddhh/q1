# 编辑器工具栏吸附顶部 - Product Requirement Document

## Overview
- **Summary**: 当用户在编辑器中上下滑动页面时，编辑器工具栏始终吸附在顶部可见
- **Purpose**: 提升编辑体验，让用户在编辑长文档时始终可以访问工具栏
- **Target Users**: 所有使用富文本编辑器编辑长文档的用户

## Goals
- 编辑器工具栏在页面滚动时始终固定在顶部
- 工具栏吸附时不遮挡内容，内容自动下移
- 编辑模式和预览模式行为一致

## Non-Goals (Out of Scope)
- 不修改工具栏的功能和布局
- 不修改编辑器核心功能
- 不改变页面其他元素的滚动行为

## Background & Context
当前编辑器使用 Tiptap/ProseMirror，工具栏位于 `RichTextEditor.tsx` 中，是一个普通的 `div` 元素。当用户编辑长文档并向下滚动时，工具栏会随页面一起滚动消失，用户需要滚动回顶部才能使用工具栏按钮。

## Functional Requirements
- **FR-1**: 当页面滚动时，编辑器工具栏始终固定在视口顶部
- **FR-2**: 工具栏吸附时，编辑器内容自动下移，不被工具栏遮挡
- **FR-3**: 工具栏吸附时保持原有样式和交互功能

## Non-Functional Requirements
- **NFR-1**: 吸附效果平滑，不闪烁
- **NFR-2**: 不影响页面加载性能
- **NFR-3**: 所有修改向后兼容

## Constraints
- **Technical**: 必须继续使用现有的 Tiptap/ProseMirror 编辑器
- **Business**: 需要在当前开发阶段快速完成修复

## Assumptions
- 使用 CSS `position: sticky` 可以实现工具栏吸附效果
- 工具栏吸附时，编辑器内容区域需要留出足够空间

## Acceptance Criteria

### AC-1: 工具栏吸附顶部
- **Given**: 用户在编辑器中编辑长文档
- **When**: 用户向下滚动页面
- **Then**: 编辑器工具栏始终固定在视口顶部，保持可见
- **Verification**: `human-judgment`
- **Notes**: 需要在不同浏览器和设备上验证

### AC-2: 内容不被遮挡
- **Given**: 工具栏已吸附在顶部
- **When**: 用户继续编辑内容
- **Then**: 编辑器内容不被工具栏遮挡，可以正常输入和查看
- **Verification**: `human-judgment`

### AC-3: 工具栏功能正常
- **Given**: 工具栏已吸附在顶部
- **When**: 用户点击工具栏按钮
- **Then**: 所有按钮功能正常工作，包括格式设置、表情选择等
- **Verification**: `human-judgment`
