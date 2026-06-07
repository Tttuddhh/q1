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
1. 工具栏没有正确吸附到顶部
2. 文字会出现在工具栏后面
3. 对齐有问题

问题分析：
- MainContent 是 overflow: auto 的滚动容器
- 工具栏需要在这个滚动容器内正确使用 sticky
- 需要确保工具栏有正确的层级和实色背景

## Functional Requirements
- **FR-1**: 工具栏在页面滚动时正确吸附到 MainContent 顶部
- **FR-2**: 工具栏有实色白色背景，完全遮挡后面的内容
- **FR-3**: 工具栏与编辑器内容对齐正确

## Non-Functional Requirements
- **NFR-1**: 吸附效果平滑
- **NFR-2**: 不影响页面加载性能

## Constraints
- **Technical**: 必须继续使用现有的 Tiptap/ProseMirror 编辑器

## Assumptions
- 把工具栏放在 MainContent 滚动容器内，sticky 到 MainContent 顶部

## Acceptance Criteria

### AC-1: 工具栏正确吸附到顶部
- **Given**: 用户在编辑器中编辑长文档
- **When**: 用户向下滚动 MainContent
- **Then**: 工具栏正确吸附到 MainContent 顶部，保持可见
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
