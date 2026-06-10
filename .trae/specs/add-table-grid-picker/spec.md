# 表格九宫格选择器 Spec

## Why
当前编辑器点击表格图标直接插入固定 3x3 表格，用户无法选择行列数。需要改为点击后弹出九宫格选择器，鼠标悬停预览，点击确认插入。

## What Changes
- **新增 TableGridPicker 组件**：点击表格图标时弹出 7x7 九宫格选择器
- **鼠标悬停高亮**：悬停时高亮对应的行列区域，显示 "行 x 列"
- **点击确认插入**：点击后关闭弹窗并插入对应行列的表格
- **表格样式修复**：确保插入的表格在编辑器中正确显示

## Impact
- Affected code: [RichTextEditor.tsx](file:///workspace/src/components/RichTextEditor.tsx)

## ADDED Requirements

### Requirement: 九宫格选择器
The system SHALL provide a 7x7 grid picker when user clicks the table icon.

#### Scenario: 悬停预览
- **WHEN** 鼠标悬停在格子 (row, col) 上
- **THEN** 高亮从 (0,0) 到 (row,col) 的所有格子，并显示 "{row+1} x {col+1}"

#### Scenario: 点击插入
- **WHEN** 用户点击某个格子
- **THEN** 插入对应行列数的表格并关闭弹窗

#### Scenario: 点击外部关闭
- **WHEN** 用户点击弹窗外部
- **THEN** 关闭弹窗不插入表格

## MODIFIED Requirements

### Requirement: 表格插入逻辑
将 `insertTable` 从固定 3x3 改为根据选择器结果动态插入。

### Requirement: 表格显示样式
确保 Tiptap Table 扩展在编辑器中正确渲染表格边框和样式。
