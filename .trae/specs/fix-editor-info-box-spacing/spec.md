# 编辑器样式修复 - Product Requirement Document

## Overview
- **Summary**: 修复编辑模式下两个问题：信息框不显示、新输入段落间距过大
- **Purpose**: 使编辑模式与预览模式表现完全一致

## Goals
- 编辑模式下信息框（info-box）正常显示绿色背景框
- 新输入段落间距与已有段落间距一致，不出现过大间隔

## Non-Goals
- 不改变预览模式样式
- 不改变编辑器功能

## Root Causes
1. **信息框不显示**: `<div class="info-box">` 在 Tiptap 中没有对应的节点类型，HTML 解析时被剥离
2. **段落间距过大**: `.prose p` 只设置 `margin-bottom`，浏览器默认 `margin-top: 1em` 仍然生效

## Acceptance Criteria

### AC-1: 信息框在编辑模式下正常显示
- **Given**: 页面包含 `<div class="info-box">` 内容
- **When**: 进入编辑模式
- **Then**: 信息框显示绿色背景、左侧绿色边框
- **Verification**: `human-judgment`

### AC-2: 新输入段落间距正常
- **Given**: 用户在编辑模式输入新段落
- **When**: 按下回车换行
- **Then**: 段落间距与已有段落一致，不会过大
- **Verification**: `human-judgment`