# 编辑器工具栏粘性定位 - Product Requirement Document

## Overview
- **Summary**: 优化编辑器工具栏的滚动行为，使其在内容区域滚动时始终保持在可视区域内，并贴合视口顶部
- **Purpose**: 解决内容往上滑时工具栏消失的问题，并确保工具栏固定时与视口顶部无间隙
- **Target Users**: 使用富文本编辑器的所有用户

## Goals
- 当内容区域往上滚动时，工具栏在到达视口顶部时固定（sticky）不动，且与顶部无间隙
- 当内容区域往下滑动时，工具栏跟随内容回到原始位置
- 工具栏固定时保持原有样式和功能不变

## Non-Goals (Out of Scope)
- 不改变工具栏的按钮布局和功能
- 不修改编辑器内容区域的样式
- 不添加新的编辑功能

## Background & Context
当前编辑器工具栏使用了 `position: sticky`，但由于外层容器有 `padding: 40px 48px`，导致工具栏固定时仍然与视口顶部有 40px 的间隙。需要调整布局结构，让工具栏能够真正贴合顶部。

## Functional Requirements
- **FR-1**: 工具栏粘性定位贴合顶部
  - 工具栏在内容区域滚动时，到达视口顶部后固定不动，且与顶部无间隙
  - 使用 CSS `position: sticky` 实现
  - 固定时保持与内容区域的相对位置正确
  
- **FR-2**: 工具栏回弹
  - 当内容区域向下滑动时，工具栏跟随内容回到原始位置
  - 过渡效果平滑自然

- **FR-3**: 样式保持
  - 工具栏固定时保持原有背景色（避免内容从工具栏后方透出）
  - 保持底部边框显示
  - 保持所有按钮功能正常

## Non-Functional Requirements
- **NFR-1**: 保持编辑器整体性能不受影响
- **NFR-2**: 滚动体验流畅，无卡顿
- **NFR-3**: 所有现有功能继续正常工作

## Constraints
- **Technical**: 使用现有 React 和 CSS 样式系统
- **Business**: 保持功能的向后兼容性

## Assumptions
- 用户希望在编辑长文档时始终能够访问工具栏，且工具栏紧贴顶部

## Acceptance Criteria

### AC-1: 工具栏粘性定位贴合顶部
- **Given**: 用户在编辑一篇长文档
- **When**: 向上滚动内容区域
- **Then**: 工具栏在到达视口顶部后固定不动，与顶部无间隙（0px）
- **Verification**: `human-judgment`

### AC-2: 工具栏回弹
- **Given**: 工具栏处于固定状态
- **When**: 向下滚动内容区域
- **Then**: 工具栏跟随内容回到原始位置
- **Verification**: `human-judgment`

### AC-3: 样式保持
- **Given**: 工具栏处于固定状态
- **When**: 观察工具栏外观
- **Then**: 工具栏背景色正确，无边框穿透问题，按钮功能正常
- **Verification**: `human-judgment`
