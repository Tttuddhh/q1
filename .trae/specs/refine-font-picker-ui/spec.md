# 优化字体选择器 UI Spec

## Why
当前字体选择器的按钮显示为 "Aa"，与用户期望的样式不符。用户希望字体选择器显示为 "T 系统默认 ▽" 的样式（T 图标 + 当前字体名称 + 下拉箭头），点击后展开下拉对话框，选择后显示所选字体名称。

## What Changes
- 修改 `RichTextEditor.tsx` 中字体选择按钮的样式：从 "Aa" 改为 "T 字体名 ▽" 的文本下拉框样式
- 按钮宽度自适应内容，显示当前选中的字体名称
- 下拉箭头使用 ▽ 符号
- 默认状态显示 "系统默认"（或对应语言翻译）
- 选择字体后，按钮上显示所选字体的名称

## Impact
- Affected specs: 富文本编辑器字体选择器 UI
- Affected code: `src/components/RichTextEditor.tsx`

## ADDED Requirements
### Requirement: 字体选择按钮样式
The system SHALL 将字体选择按钮显示为文本下拉框样式，包含 T 图标、当前字体名称和下拉箭头。

#### Scenario: 默认状态
- **WHEN** 编辑器进入编辑模式
- **THEN** 字体选择按钮显示 "T 系统默认 ▽"

#### Scenario: 选择字体后
- **WHEN** 用户从下拉框中选择了一个字体
- **THEN** 字体选择按钮显示 "T 所选字体名 ▽"
- **THEN** 按钮上的字体名称使用系统默认字体显示（不使用所选字体，避免可读性问题）

### Requirement: 下拉面板交互
The system SHALL 点击字体选择按钮后展开下拉面板，选择字体后关闭面板并更新按钮显示。

#### Scenario: 点击展开
- **WHEN** 用户点击字体选择按钮
- **THEN** 下拉面板在按钮下方展开

#### Scenario: 选择后关闭
- **WHEN** 用户点击某个字体
- **THEN** 下拉面板关闭
- **THEN** 按钮文字更新为所选字体名称
