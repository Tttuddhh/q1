# 修复编辑器段落换行间隔不一致 - Product Requirement Document

## Overview
- **Summary**: 修复富文本编辑器中，用户主动换行（新输入内容换行）与段落自动换行时的视觉间隔不一致问题
- **Purpose**: 确保编辑模式下和预览模式下，新输入内容换行时的间隔与原有段落文字自动换行时的间隔保持一致
- **Target Users**: 所有使用富文本编辑器的用户

## Goals
- 新输入内容换行时的间隔与原有段落自动换行间隔一致
- 不改变现有段落的 margin-bottom（保持段落间原有间隔）
- 编辑模式和预览模式显示一致

## Non-Goals (Out of Scope)
- 不修改段落之间的 margin-bottom（现有段落间隔保持不变）
- 不修改 heading、list、blockquote 等其他元素的间距
- 不改变编辑器核心功能

## Background & Context
当前编辑器使用 Tiptap/ProseMirror，段落样式定义在 `index.css` 中：
- `.prose p` 有 `margin-bottom: 0.75em`
- `.ProseMirror p` 没有单独定义 margin-bottom

用户反馈：编辑模式中所看到的间隔和预览中所看到的间隔不一致。具体表现为：
1. 原有段落中文字自动换行时，行与行之间的间隔由 line-height 控制
2. 用户按 Enter 换行（新段落）时，间隔由 margin-bottom 控制
3. 这两种间隔视觉上不一致

## Functional Requirements
- **FR-1**: 新输入内容换行（按 Enter 产生的新段落）时，段落之间的间隔应与同一段落内文字自动换行的间隔一致
- **FR-2**: 现有内容的段落间隔保持不变（不破坏已有文档的视觉效果）
- **FR-3**: 编辑模式和预览模式显示一致

## Non-Functional Requirements
- **NFR-1**: 修改不影响页面加载性能
- **NFR-2**: 所有修改向后兼容

## Constraints
- **Technical**: 必须继续使用现有的 Tiptap/ProseMirror 编辑器
- **Business**: 需要在当前开发阶段快速完成修复

## Assumptions
- 通过调整 `.ProseMirror p` 的 margin-bottom 使其与 line-height 产生的间隔一致，可以解决视觉不一致问题
- 原有段落（已有内容）的间隔不需要改变，只影响新输入内容

## Acceptance Criteria

### AC-1: 新输入内容换行间隔一致
- **Given**: 用户在编辑器中输入文字
- **When**: 用户按 Enter 换行产生新段落
- **Then**: 新段落之间的间隔与同一段落内文字自动换行的间隔视觉上保持一致
- **Verification**: `human-judgment`
- **Notes**: 需要在编辑器和预览模式下都验证

### AC-2: 现有内容不受影响
- **Given**: 编辑器中已有内容
- **When**: 用户查看现有内容
- **Then**: 现有段落之间的间隔保持不变
- **Verification**: `human-judgment`

### AC-3: 编辑模式和预览模式一致
- **Given**: 用户在编辑器和预览模式之间切换
- **When**: 比较同一段落的间隔
- **Then**: 两种模式下的间隔显示一致
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要同时检查 compact-mode 下的间隔一致性？
