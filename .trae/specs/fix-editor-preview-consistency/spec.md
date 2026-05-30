# 编辑器和预览模式样式一致性 - Product Requirement Document

## Overview
- **Summary**: 确保编辑器（编辑模式）和预览模式的内容样式、排版、布局完全一致
- **Purpose**: 解决编辑模式下内容样式与预览模式不一致的问题，包括：标题大小、信息框样式、内容宽度、间距等
- **Target Users**: 使用富文本编辑器的所有用户

## Goals
- 编辑模式下内容的**视觉样式**与预览模式100%一致
- 编辑模式下内容的**排版布局**与预览模式100%一致
- 编辑模式下内容的**特殊元素样式**（如信息框）与预览模式一致
- 只添加工具栏，不改变其他任何内容

## Non-Goals (Out of Scope)
- 不改变编辑器功能
- 不改变预览模式样式
- 不修改内容渲染逻辑

## Background & Context
问题根源：
1. 预览模式使用 `className="prose"` 来渲染内容样式
2. 编辑模式（Tiptap Editor）没有应用 `prose` 类，导致样式丢失
3. 预览模式和编辑模式的 DOM 容器结构略有差异，导致宽度不一致

## Functional Requirements
- **FR-1**: 编辑模式下内容样式与预览模式完全一致
- **FR-2**: 编辑模式下信息框（如绿色"快速开始"框）样式与预览模式一致
- **FR-3**: 编辑模式下内容宽度与预览模式完全一致
- **FR-4**: 编辑模式下只添加工具栏，不改变其他任何视觉效果

## Non-Functional Requirements
- **NFR-1**: 保持编辑器功能不受影响
- **NFR-2**: 保持工具栏 sticky 功能正常

## Constraints
- **Technical**: 必须保持现有 Tiptap 编辑器功能
- **Business**: 必须与现有代码兼容

## Assumptions
- Tiptap 编辑器可以正确处理 `prose` 类样式
- `prose` 类的样式可以正确应用到编辑器内容上

## Acceptance Criteria

### AC-1: 编辑模式与预览模式样式完全一致
- **Given**: 用户在预览模式查看文档
- **When**: 切换到编辑模式
- **Then**: 内容的视觉样式（标题、段落、列表、颜色等）与预览模式完全一致
- **Verification**: `human-judgment`

### AC-2: 编辑模式与预览模式布局完全一致
- **Given**: 用户在预览模式查看文档
- **When**: 切换到编辑模式
- **Then**: 内容宽度、间距、排版与预览模式完全一致
- **Verification**: `human-judgment`

### AC-3: 编辑模式信息框样式一致
- **Given**: 文档中有信息框（如绿色"快速开始"框）
- **When**: 切换到编辑模式
- **Then**: 信息框样式与预览模式完全一致
- **Verification**: `human-judgment`

## Open Questions
- 无
