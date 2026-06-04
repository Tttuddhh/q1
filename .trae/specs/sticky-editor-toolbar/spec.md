# 编辑器工具栏吸附顶部 Spec

## Why
在父子页面中点击"更多操作"（三个点）菜单并选择"编辑"后，进入富文本编辑器模式。当页面内容较长、用户上下滑动时，编辑器工具栏会随内容一起滚动消失，导致用户需要频繁滚动回顶部才能使用格式工具。需要将工具栏固定在可视区域顶部，提升编辑体验。

## What Changes
- 修改 `RichTextEditor.tsx`：将工具栏改为 sticky 定位，使其在编辑器容器内滚动时始终吸附在顶部
- 调整工具栏和编辑器内容的布局结构，确保 sticky 生效

## Impact
- Affected specs: 富文本编辑器编辑体验
- Affected code: `src/components/RichTextEditor.tsx`

## ADDED Requirements
### Requirement: 编辑器工具栏吸附顶部
The system SHALL 在编辑模式下，当用户上下滑动页面内容时，始终将编辑器工具栏保持在可视区域顶部。

#### Scenario: 进入编辑模式并滚动
- **WHEN** 用户在父子页面点击"更多操作"菜单并选择"编辑"
- **THEN** 进入编辑模式，显示富文本编辑器
- **WHEN** 用户上下滑动页面内容
- **THEN** 编辑器工具栏始终保持在可视区域顶部，不随内容滚动而消失
