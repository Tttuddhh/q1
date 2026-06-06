# 表格单元格合并与拆分 Spec

## Why
用户反馈表格合并单元格的效果不符合预期。用户期望的合并效果是：选中多个单元格后，内部边框线消失（视觉上连成一片），但表格整体大小保持不变。同时需要支持拆分已合并的单元格。

## What Changes
- 合并按钮改为基于 `editor.can().mergeCells()` 条件显示，只在可以合并时出现
- 添加拆分单元格按钮，基于 `editor.can().splitCell()` 条件显示
- 修复可能导致合并后出现"虚线"的 CSS 样式
- 确保 ProseMirror 原生 `CellSelection` 正常工作，拖拽选中多个单元格后 `mergeCells()` 能正确执行

## Impact
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`
- Affected capabilities: 表格单元格合并、表格单元格拆分

## ADDED Requirements
### Requirement: 合并单元格
The system SHALL 在用户通过 ProseMirror 原生方式选中多个单元格后，点击合并按钮将选中的单元格合并为一个单元格（使用 colspan/rowspan），内部边框消失，表格总尺寸保持不变。

#### Scenario: 合并选中的单元格
- **WHEN** 用户拖拽选中多个相邻单元格
- **AND** 点击工具栏上的合并图标
- **THEN** 选中的单元格合并为一个单元格
- **AND** 合并后的单元格跨越原先的所有行列
- **AND** 表格总宽度和总高度不变

### Requirement: 拆分单元格
The system SHALL 允许用户将已合并的单元格拆分为原先的多个单元格。

#### Scenario: 拆分已合并的单元格
- **WHEN** 用户选中一个已合并的单元格
- **AND** 点击工具栏上的拆分图标
- **THEN** 该单元格拆分为原先的多个单元格

## MODIFIED Requirements
### Requirement: 合并按钮显示条件
合并按钮 SHALL 只在当前选中了多个可以合并的单元格时显示，使用 `editor.can().mergeCells()` 判断。
