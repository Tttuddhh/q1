# 优化字体选择器 UI Spec

## Why
当前字体选择器的按钮显示为 "Aa"，与用户期望的样式不符。用户希望字体选择器显示为 "T 系统默认 ▽" 的样式（T 图标 + 当前字体名称 + 下拉箭头），点击后展开下拉对话框，选择后显示所选字体名称。

## What Changes
- 修改 `RichTextEditor.tsx` 中字体选择按钮的样式：从 "Aa" 改为 "T 字体名 ▽" 的文本下拉框样式
- 按钮宽度与下拉对话框宽度一致（约 200px），不要太小
- 下拉对话框宽度适当缩小（当前 280px 太宽）
- 下拉箭头使用与父页面旋转箭头相同的图标（ArrowRight01Icon 旋转）
- 默认状态显示 "系统默认"
- 选择字体后，按钮上显示所选字体的名称

## Impact
- Affected specs: 富文本编辑器字体选择器 UI
- Affected code: `src/components/RichTextEditor.tsx`

## ADDED Requirements
### Requirement: 字体选择按钮样式
The system SHALL 将字体选择按钮显示为文本下拉框样式，宽度与下拉对话框一致（约 200px）。

#### Scenario: 默认状态
- **WHEN** 编辑器进入编辑模式
- **THEN** 字体选择按钮显示 "T 系统默认 ▽"，宽度约 200px

#### Scenario: 选择字体后
- **WHEN** 用户从下拉框中选择了一个字体
- **THEN** 字体选择按钮显示 "T 所选字体名 ▽"
- **THEN** 按钮宽度保持约 200px

### Requirement: 下拉对话框宽度
The system SHALL 将下拉对话框宽度从 280px 缩小到约 200px，与按钮宽度一致。

### Requirement: 下拉箭头图标
The system SHALL 使用与父页面旋转箭头相同的图标（ArrowRight01Icon）作为下拉箭头，而不是 ▽ 符号。

#### Scenario: 箭头样式
- **WHEN** 用户查看字体选择按钮
- **THEN** 右侧箭头使用 ArrowRight01Icon
- **THEN** 展开时箭头旋转 90 度指向下方
- **THEN** 收起时箭头指向右方
