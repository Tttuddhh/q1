# 编辑器工具栏吸附顶部 - Product Requirement Document

## Overview
- **Summary**: 当用户在编辑器中上下滑动页面时，编辑器工具栏始终吸附在顶部可见，且不能有内容从工具栏后方透出
- **Purpose**: 提升编辑体验，让用户在编辑长文档时始终可以访问工具栏，且工具栏必须有实色背景完全遮挡后方内容
- **Target Users**: 所有使用富文本编辑器编辑长文档的用户

## Goals
- 编辑器工具栏在页面滚动时始终固定在顶部
- 工具栏必须有实色背景，完全遮挡后方内容，不能透出任何文字
- 编辑模式和预览模式行为一致

## Non-Goals (Out of Scope)
- 不修改工具栏的功能和布局
- 不修改编辑器核心功能
- 不改变页面其他元素的滚动行为

## Background & Context
当前编辑器使用 Tiptap/ProseMirror，工具栏位于 `RichTextEditor.tsx` 中。之前已为工具栏添加了 `position: sticky` 和 `background: '#ffffff'`，但从截图可以看到，工具栏后方仍然透出了页面标题等文字内容（红色圈起来的部分）。

问题原因分析：
1. Header 组件使用了 `position: sticky` + `backdrop-blur-sm` + `bg-white/80`（半透明背景）
2. 工具栏虽然设置了 `background: '#ffffff'`，但可能因为 z-index 不够高，或者其他元素也有 sticky 定位导致层级问题
3. 从截图看，工具栏吸附时，页面标题文字从工具栏后方透出

## Functional Requirements
- **FR-1**: 当页面滚动时，编辑器工具栏始终固定在视口顶部，保持可见
- **FR-2**: 工具栏必须有实色背景（不透明白色），完全遮挡后方内容，不能透出任何文字
- **FR-3**: 工具栏吸附时保持原有样式和交互功能

## Non-Functional Requirements
- **NFR-1**: 吸附效果平滑，不闪烁
- **NFR-2**: 不影响页面加载性能
- **NFR-3**: 所有修改向后兼容

## Constraints
- **Technical**: 必须继续使用现有的 Tiptap/ProseMirror 编辑器
- **Business**: 需要在当前开发阶段快速完成修复

## Assumptions
- 增加工具栏的 z-index 并确保背景为实色（非半透明）可以解决内容透出问题
- 可能需要调整工具栏的父元素样式以确保 sticky 定位正常工作

## Acceptance Criteria

### AC-1: 工具栏吸附顶部
- **Given**: 用户在编辑器中编辑长文档
- **When**: 用户向下滚动页面
- **Then**: 编辑器工具栏始终固定在视口顶部，保持可见
- **Verification**: `human-judgment`
- **Notes**: 需要在不同浏览器和设备上验证

### AC-2: 工具栏完全遮挡后方内容
- **Given**: 工具栏已吸附在顶部
- **When**: 用户查看工具栏区域
- **Then**: 工具栏后方不能透出任何文字或内容，必须有实色背景完全遮挡
- **Verification**: `human-judgment`
- **Notes**: 这是本次修复的重点，必须确保不透出任何内容

### AC-3: 工具栏功能正常
- **Given**: 工具栏已吸附在顶部
- **When**: 用户点击工具栏按钮
- **Then**: 所有按钮功能正常工作，包括格式设置、表情选择等
- **Verification**: `human-judgment`
