# 修复编辑器工具提示缺失 - Product Requirement Document

## Overview
- **Summary**: 为编辑器中缺失 tooltip 的按钮添加正确的国际化翻译键值
- **Purpose**: 修复撤销、重做、表情三个按钮的 tooltip 显示问题
- **Target Users**: 使用富文本编辑器的所有用户

## Goals
- 为 `editor.undo`、`editor.redo`、`editor.emoji` 添加中文、英文、日文、韩文翻译
- 确保鼠标悬停时正确显示按钮名称

## Non-Goals (Out of Scope)
- 不修改按钮功能
- 不修改 tooltip 显示样式

## Background & Context
当前撤销、重做、表情三个按钮使用了 `t('editor.undo')`、`t('editor.redo')`、`t('editor.emoji')` 作为 tooltip，但 i18n 翻译文件中没有这些键值，导致 tooltip 显示为默认值（"撤销"/"重做"/"表情"）或为空。

## Functional Requirements
- **FR-1**: 添加翻译键值
  - 在 zh、en、ja、ko 四种语言的翻译中添加 `editor.undo`、`editor.redo`、`editor.emoji`

## Acceptance Criteria

### AC-1: 撤销按钮 tooltip
- **Given**: 鼠标悬停在撤销按钮上
- **Then**: 显示对应语言的"撤销"文字

### AC-2: 重做按钮 tooltip
- **Given**: 鼠标悬停在重做按钮上
- **Then**: 显示对应语言的"重做"文字

### AC-3: 表情按钮 tooltip
- **Given**: 鼠标悬停在表情按钮上
- **Then**: 显示对应语言的"表情"文字
