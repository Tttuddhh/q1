# 表格单元格合并与光标修复 Spec

## Why
用户反馈表格有两个核心问题：
1. **合并单元格功能没有真正解决** — 拖拽选中了单元格，但点击合并按钮没有正确合并选中的单元格
2. **光标无法在单元格任意位置输入，且移动到另一个单元格时有很大延迟**

## What Changes
- **BREAKING**: 移除自定义的表格拖拽选中逻辑（`useTableCellSelection` Hook），改为依赖 ProseMirror 原生的 `tableEditing` 插件处理单元格选中
- 修复 CSS：移除 `pointer-events: auto` 和 `user-select: text`，这些属性干扰了 ProseMirror 原生光标定位
- 修复合并按钮：`mergeCells()` 命令需要 ProseMirror 的 `CellSelection` 才能工作，原生插件会自动创建它
- 添加 `.selectedCell` 样式，让原生选中的单元格有高亮效果
- 移除自定义 mousedown 事件中对 `e.preventDefault()` 的调用，避免阻止原生光标行为

## Impact
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`
- Affected capabilities: 表格插入、单元格选中、单元格合并、光标定位

## ADDED Requirements
### Requirement: 原生表格单元格选中
The system SHALL 使用 ProseMirror 原生的 `tableEditing` 插件处理表格单元格拖拽选中，而非自定义实现。

#### Scenario: 拖拽选中单元格
- **WHEN** 用户在表格单元格上按下鼠标并拖拽到另一个单元格
- **THEN** ProseMirror 自动创建 `CellSelection`
- **AND** 选中的单元格显示高亮背景（通过 `.selectedCell` CSS 类）

### Requirement: 合并单元格正常工作
The system SHALL 在用户通过原生方式选中多个单元格后，点击合并按钮成功合并单元格。

#### Scenario: 合并选中的单元格
- **WHEN** 用户拖拽选中多个单元格
- **AND** 点击工具栏上的合并图标
- **THEN** 选中的单元格合并为一个单元格

### Requirement: 光标定位正常
The system SHALL 允许用户在表格单元格的任意位置正常输入，光标移动无延迟。

#### Scenario: 在单元格内输入
- **WHEN** 用户点击表格单元格
- **THEN** 光标立即出现在点击位置
- **AND** 用户可以在单元格任意位置输入文字

#### Scenario: 在单元格间移动
- **WHEN** 用户使用方向键或鼠标移动到另一个单元格
- **THEN** 光标移动无延迟
