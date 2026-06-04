# 修复编辑器工具栏吸附位置 Spec

## Why
上一次修改将工具栏设为 `position: sticky; top: 0`，但工具栏是放在 `RichTextEditor` 组件内部的。而 `RichTextEditor` 又被包裹在 `MainContent` 的滚动容器中。`position: sticky` 是相对于其最近的滚动祖先定位的，因此工具栏只会粘在 `RichTextEditor` 组件的顶部，而不是整个视口顶部。从截图可以看到，页面上方的标题、元信息等内容在滚动时仍然出现在工具栏上方，说明工具栏没有真正吸附到页面可视区域的顶部。

## What Changes
- 修改 `MainContent.tsx`：在编辑模式下，将页面头部信息（emoji、标题、日期、标签）与编辑器内容分离
- 编辑器工具栏需要吸附在整个 `MainContent` 滚动容器的顶部，而不是编辑器内部
- 保持非编辑模式的原有布局不变

## Impact
- Affected specs: 富文本编辑器编辑体验
- Affected code: `src/components/MainContent.tsx`, `src/components/RichTextEditor.tsx`

## ADDED Requirements
### Requirement: 编辑器工具栏正确吸附到页面顶部
The system SHALL 在编辑模式下，当用户上下滑动页面内容时，编辑器工具栏吸附在页面可视区域的最顶部，页面上方的标题、元信息等内容会正常滚动消失，不会出现在工具栏上方。

#### Scenario: 进入编辑模式并滚动
- **WHEN** 用户在父子页面点击"更多操作"菜单并选择"编辑"
- **THEN** 进入编辑模式，页面头部（标题、日期、标签等）正常显示在工具栏上方
- **WHEN** 用户向下滑动页面内容
- **THEN** 页面头部随内容一起向上滚动消失
- **THEN** 编辑器工具栏吸附在页面可视区域最顶部，始终可见
