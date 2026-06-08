# Fix Font Selection Persistence Spec

## Why
用户选择字体后，当光标移动到没有设置字体样式的位置（如空行或新段落），字体选择器会立即恢复显示"系统默认"，而不是保持用户最后选择的字体。这导致用户无法直观地知道当前正在使用的字体，也不方便连续输入同一字体的内容。

## What Changes
- 修改 `RichTextEditor.tsx` 中的 `onSelectionUpdate` 逻辑：当光标所在位置没有设置 `fontFamily` 时，不再强制重置为"系统默认"，而是保持最后一次用户主动选择的字体
- 新增 `lastSelectedFontName` ref/state 来记录用户最后主动选择的字体
- 仅在光标位置**明确设置了**不同字体时，才更新字体选择器的显示

## Impact
- Affected code: `src/components/RichTextEditor.tsx`
- 无新增依赖

## MODIFIED Requirements
### Requirement: Font Selection Persistence
系统 SHALL 在用户选择字体后，保持该字体为"当前字体"状态，直到用户主动选择其他字体或光标移动到已设置不同字体的文本上。

#### Scenario: 选择字体后输入新内容
- **WHEN** 用户从字体选择器中选择了"思源宋体"
- **THEN** 字体选择器显示"思源宋体"
- **WHEN** 用户在新段落或空行输入内容
- **THEN** 字体选择器仍然显示"思源宋体"，输入内容使用该字体

#### Scenario: 光标移动到已设置不同字体的文本
- **WHEN** 用户将光标移动到已设置为"站酷快乐体"的文本上
- **THEN** 字体选择器更新显示为"站酷快乐体"

#### Scenario: 光标移动到未设置字体的文本
- **WHEN** 用户将光标移动到未设置任何字体的文本（如默认段落）
- **THEN** 字体选择器保持显示最后一次用户主动选择的字体