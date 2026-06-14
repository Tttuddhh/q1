# 删除字体选择器中的所有字体 - 产品需求文档

## Overview
- **Summary**: 将字体选择器（FontPicker）组件中的所有可选字体删除，仅保留系统默认字体选项
- **Purpose**: 简化字体选择功能，移除所有第三方字体选项
- **Target Users**: 知识库应用的用户

## Goals
- 删除 `FONTS` 数组中的所有字体定义
- 字体选择器仅保留系统默认字体选项

## Non-Goals (Out of Scope)
- 不修改字体选择器组件的 UI 结构
- 不删除 SYSTEM_FONT 常量
- 不影响其他功能模块

## Background & Context
- 字体数据存储在 `/workspace/src/data/fonts.ts` 文件中
- `FONTS` 数组包含约 100+ 个字体（中文字体、英文字体、其他语言字体）
- `SYSTEM_FONT` 是系统默认字体，应保留

## Functional Requirements
- **FR-1**: 删除 `FONTS` 数组中的所有字体定义，使其变为空数组
- **FR-2**: 字体选择器仍可正常显示，仅显示系统默认字体选项

## Constraints
- **Technical**: React + TypeScript 项目，需保持类型安全

## Assumptions
- 系统默认字体 `SYSTEM_FONT` 保持不变
- FontPicker 组件能正确处理空字体数组

## Acceptance Criteria

### AC-1: FONTS 数组为空
- **Given**: 查看 `/workspace/src/data/fonts.ts` 文件
- **When**: 检查 `FONTS` 变量
- **Then**: `FONTS` 应为空数组 `[]`
- **Verification**: `programmatic`

### AC-2: FontPicker 仅显示系统字体
- **Given**: 打开字体选择器
- **When**: 展开字体列表
- **Then**: 仅显示"系统默认"选项，无其他字体
- **Verification**: `human-judgment`

## Open Questions
- [ ] 无