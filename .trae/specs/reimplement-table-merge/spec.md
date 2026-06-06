# 重新实现表格单元格合并功能

## Why
用户要求表格支持类似文本选中的多单元格选择，然后合并选中的单元格。需要正确利用 ProseMirror 的原生 tableEditing 插件来实现 cell selection 和 merge 功能。

## What Changes
- 添加 `canMergeCells` 和 `canSplitCell` 状态，用于控制合并/拆分按钮的显示
- 在 `onSelectionUpdate` 中检测当前选区是否是 `CellSelection`，以判断是否可以合并
- 添加工具栏合并/拆分按钮
- 确保 `.selectedCell` 样式在选中时提供视觉反馈

## Impact
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`
- 使用 TipTap 原生 `editor.can().mergeCells()` 和 `editor.can().splitCell()` 方法

## ADDED Requirements
### Requirement: 单元格选择
The system SHALL 支持鼠标在表格内拖拽选中多个单元格，类似文本选中效果。

#### Scenario: 拖拽选中多个单元格
- **WHEN** 用户在表格单元格上按下鼠标并拖拽到另一个单元格
- **THEN** 被选中的单元格显示高亮效果

### Requirement: 合并单元格按钮显示
The system SHALL 只在选中多个单元格时显示合并按钮。

#### Scenario: 选中多个单元格后显示合并按钮
- **WHEN** 用户选中 2 个或更多可以合并的单元格
- **THEN** 工具栏显示合并按钮
- **WHEN** 用户取消选择或选中单个单元格
- **THEN** 合并按钮消失

### Requirement: 合并单元格
The system SHALL 在点击合并按钮后，将选中的多个单元格合并为一个。

#### Scenario: 合并选中的单元格
- **WHEN** 用户选中多个单元格并点击合并按钮
- **THEN** 选中的单元格合并为一个单元格

### Requirement: 拆分单元格
The system SHALL 支持拆分已合并的单元格。

#### Scenario: 拆分单元格
- **WHEN** 用户选中已合并的单元格
- **THEN** 工具栏显示拆分按钮
- **WHEN** 用户点击拆分按钮
- **THEN** 单元格拆分为原来的多个单元格
