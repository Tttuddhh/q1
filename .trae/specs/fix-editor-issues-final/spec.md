# 修复编辑器工具栏图标和顶部间隙问题 - Product Requirement Document

## Overview
- **Summary**: 修复编辑器工具栏的两个问题：箭头图标方向，以及工具栏固定时与顶部的间隙
- **Purpose**: 让图标方向正确朝外，让工具栏真正贴合视口顶部
- **Target Users**: 使用富文本编辑器的所有用户

## Goals
- 用简单的左右箭头图标代替 UndoIcon/RedoIcon，确保方向朝外
- 修复工具栏固定时与顶部的间隙问题

## Non-Goals (Out of Scope)
- 不修改其他按钮或功能

## Background & Context
- 当前 UndoIcon/RedoIcon 可能是带圆角的特殊"撤销/重做"图标，看起来像朝里
- Header 高度 56px，MainContent 有 padding，导致工具栏无法真正贴合视口顶部

## Functional Requirements
- **FR-1**: 替换箭头图标
  - 用 ArrowLeft01Icon（向左箭头）作为撤销按钮
  - 用 ArrowRight01Icon（向右箭头）作为重做按钮
  
- **FR-2**: 修复工具栏定位
  - 让工具栏在滚动时能真正贴合视口顶部，无间隙

## Non-Functional Requirements
- **NFR-1**: 保持所有现有功能正常

## Acceptance Criteria

### AC-1: 箭头图标方向朝外
- **Given**: 查看编辑器工具栏
- **When**: 观察撤销/重做按钮
- **Then**: 撤销按钮显示向左箭头，重做按钮显示向右箭头，方向朝外
- **Verification**: `human-judgment`

### AC-2: 工具栏贴合顶部
- **Given**: 编辑器滚动时
- **When**: 工具栏固定
- **Then**: 工具栏贴合视口顶部，无可见间隙
- **Verification**: `human-judgment`
