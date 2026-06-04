# 修复新输入段落间距问题 - Product Requirement Document

## Overview
- **Summary**: 编辑模式下，按回车创建新段落时，新段落的视觉间距应该等于原有段落中文字自动换行的行高间距（line-height），而不是 0.75em 的 margin-bottom 间距。同时要保证**已存在**的段落间距**不发生改变**。
- **Purpose**: 让编辑模式下的新输入段落与已有段落视觉上协调（行间距一致），不出现"看起来很大"的间隔
- **Target Users**: 使用富文本编辑器的所有用户

## Goals
- 新输入段落的 `margin-bottom` 为 0
- 已存在段落的 `margin-bottom` 保持 `0.75em` 不变
- 不修改预览模式的样式
- 不增加任何编辑按钮或 UI 元素

## Non-Goals (Out of Scope)
- 不修改其他元素（标题、列表、引用等）的样式
- 不重新设计工具栏
- 不添加任何新功能

## Background & Context
- 当前原有内容的段落有 `margin-bottom: 0.75em`（=12px），用于在段落之间提供视觉间隔
- 用户期望：新输入的段落间距 = 段内文字自动换行的行高（line-height: 1.75 * 16px = 28px）
- **关键约束**：已存在的段落间距必须保持不变（用户多次强调）

## Root Cause
- 之前的方案失败的原因：
  1. 尝试使用 ProseMirror 插件的 `appendTransaction` 机制
  2. StarterKit 的 Paragraph 节点没有定义 `class` attribute
  3. 在 ProseMirror 节点 schema 中添加属性复杂度高

## Functional Requirements
- **FR-1**: CSS 规则调整
  - 默认情况下，所有编辑器段落都没有 margin-bottom
  - 仅对初始加载时已有的段落，通过添加 CSS 类 `keep-original-margin` 来保留原来的 `margin-bottom: 0.75em`
- **FR-2**: 使用 DOM 操作标记初始段落
  - 在 RichTextEditor 初始化后，给所有已存在的段落添加 `keep-original-margin` CSS 类
  - 新输入的段落将不会有这个类

## Non-Functional Requirements
- **NFR-1**: 不影响编辑器其他功能
- **NFR-2**: 性能上不应有明显延迟
- **NFR-3**: 不引入新的依赖

## Constraints
- **Business**: 已有的样式、UI、功能全部保持不变

## Acceptance Criteria

### AC-1: 新段落无 margin-bottom
- **Given**: 编辑器中有多个已有段落
- **When**: 用户在最后一个段落末尾按回车，创建新段落
- **Then**: 新创建的最后一个段落的 `class` **不** 包含 `keep-original-margin`
- **And**: 该段落的 `margin-bottom` 为 0
- **Verification**: `human-judgment` + DOM 检查

### AC-2: 已有段落间距不变
- **Given**: 编辑器加载了已有的内容（多个段落）
- **When**: 用户开始编辑
- **Then**: 已有段落的 `margin-bottom` 仍为 `0.75em`
- **And**: 已有段落的 `class` 包含 `keep-original-margin`
- **Verification**: `human-judgment` + DOM 检查

### AC-3: 输入新内容后间距自然
- **Given**: 用户刚创建了一个新段落
- **When**: 用户在新段落中输入文字
- **Then**: 段落之间的视觉间距看起来与段内文字自动换行的间距一致
- **Verification**: `human-judgment`

### AC-4: 构建无错误
- **Given**: 所有代码修改完成
- **When**: 运行 `npm run build`
- **Then**: 构建成功，零错误
- **Verification**: `programmatic`

## Open Questions
- 无
