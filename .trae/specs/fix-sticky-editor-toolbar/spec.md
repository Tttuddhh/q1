# 编辑器工具栏吸附顶部 - Product Requirement Document

## Overview
- **Summary**: 修复编辑器工具栏的吸附问题，确保工具栏在滚动时正确吸附到顶部，完全遮挡后面的内容，并且对齐正确。
- **Purpose**: 解决用户在编辑长文档时，工具栏应该始终能够看到工具栏，并且工具栏需要清晰可见，没有内容透出，对齐正确。
- **Target Users**: 所有使用富文本编辑器编辑长文档的用户

## Goals
- 工具栏在滚动时正确吸附到 MainContent 顶部
- 工具栏完全遮挡后面的内容，没有透出
- 工具栏与编辑器内容对齐正确

## Non-Goals (Out of Scope)
- 不修改工具栏的功能和布局
- 不修改编辑器核心功能

## Background & Context
当前问题：
1. 工具栏没有正确吸附到顶部（截图显示工具栏和顶部之间仍有空隙，文字从后面透出）
2. 文字会出现在工具栏后面
3. 对齐有问题

问题分析：
- MainContent 是 overflow: auto 的滚动容器，padding: '40px 48px'
- Header 是 sticky 定位在 MainContent 之外
- 工具栏在 RichTextEditor 内部，RichTextEditor 在 MainContent 内部
- 当前工具栏使用 `position: sticky; top: -8`，这导致工具栏吸附位置不正确
- 从截图看，工具栏和 Header 之间有空隙，文字从空隙中透出

正确方案：
- 工具栏应该吸附到 MainContent 的顶部（即 Header 的下方）
- 由于 MainContent 有 padding-top: 40px，工具栏 sticky 的 top 应该考虑这个 padding
- 实际上，sticky 元素在 overflow 容器内，top: 0 就会吸附到容器的 padding 边界
- 但问题是 Header 在 MainContent 外面，也是 sticky 的，所以工具栏应该吸附到 Header 下方
- 正确的做法：让工具栏的 sticky top 值等于 MainContent 的 padding-top 的负值，或者使用其他方式

## Functional Requirements
- **FR-1**: 工具栏在页面滚动时正确吸附到 MainContent 顶部（紧贴 Header 下方）
- **FR-2**: 工具栏有实色白色背景，完全遮挡后面的内容
- **FR-3**: 工具栏与编辑器内容对齐正确

## Non-Functional Requirements
- **NFR-1**: 吸附效果平滑
- **NFR-2**: 不影响页面加载性能

## Constraints
- **Technical**: 必须继续使用现有的 Tiptap/ProseMirror 编辑器

## Assumptions
- 工具栏需要在 MainContent 滚动容器内正确使用 sticky
- 需要处理 MainContent 的 padding 对 sticky 定位的影响

## Acceptance Criteria

### AC-1: 工具栏正确吸附到顶部
- **Given**: 用户在编辑器中编辑长文档
- **When**: 用户向下滚动 MainContent
- **Then**: 工具栏正确吸附到 MainContent 顶部，紧贴 Header 下方，没有空隙
- **Verification**: `human-judgment`

### AC-2: 工具栏完全遮挡后面内容
- **Given**: 工具栏已吸附到顶部
- **When**: 用户查看工具栏区域
- **Then**: 工具栏后面没有任何文字或内容透出
- **Verification**: `human-judgment`

### AC-3: 工具栏对齐正确
- **Given**: 工具栏在正常位置或已吸附
- **When**: 用户查看工具栏和编辑器内容
- **Then**: 工具栏与编辑器内容对齐正确
- **Verification**: `human-judgment`
