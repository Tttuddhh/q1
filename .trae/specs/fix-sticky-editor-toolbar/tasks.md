# 编辑器工具栏吸附顶部 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 修改工具栏为 sticky 定位
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 `RichTextEditor.tsx` 中将工具栏容器改为 `position: sticky`
  - 设置 `top: 0` 使工具栏吸附在视口顶部
  - 设置 `zIndex` 确保工具栏在其他元素之上
  - 设置 `background` 为白色，避免内容透过工具栏显示
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 向下滚动页面，验证工具栏始终可见
  - `human-judgement` TR-1.2: 向上滚动页面，验证工具栏正常回到原位
- **Notes**: 需要确保 sticky 定位的父元素有正确的滚动上下文

## [x] Task 2: 确保内容不被遮挡
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 检查编辑器内容区域在工具栏吸附时是否被遮挡
  - 确保 `EditorContent` 组件在工具栏下方有足够空间
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 在工具栏吸附状态下，验证内容区域不被遮挡
  - `human-judgement` TR-2.2: 在编辑器顶部输入内容，验证可见性
- **Notes**: sticky 定位通常不会遮挡内容，但需要验证

## [x] Task 3: 验证工具栏功能正常
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 在工具栏吸附状态下，测试所有按钮功能
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 验证吸附状态下工具栏按钮点击正常
- **Notes**: 表情选择器使用 absolute 定位，需要确保在 sticky 工具栏下位置正确

## [x] Task 4: 修复工具栏后方内容透出问题（第一次尝试）
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 将工具栏 z-index 提高到 50
- **结果**: 未完全修复，内容仍然透出

## [x] Task 5: 重新分析并修复内容透出问题
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 使用 fixed 定位尝试
- **结果**: 工具栏一开始就固定在顶部，不符合要求

## [x] Task 6: 重新规划并实现正确的 sticky 解决方案
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 分析问题：MainContent 是 overflow: auto 的滚动容器
  - 工具栏需要在这个滚动容器内正确使用 sticky
  - 修复对齐问题：移除工具栏的 padding 要匹配 MainContent 的 padding
  - 确保工具栏有实色背景，z-index 足够高
- **结果**: 工具栏吸附位置不正确，仍有空隙

## [x] Task 7: 修复工具栏吸附位置（紧贴顶部）
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 问题分析：
    - MainContent 有 padding-top: 40px
    - 工具栏当前 top: -8，导致吸附位置不正确
    - 从截图看，工具栏和 Header 之间有空隙，文字从空隙中透出
  - 解决方案：
    - 将工具栏的 top 改为 0（或考虑 padding 的负值）
    - 由于 MainContent 有 padding-top: 40px，sticky 元素 top: 0 会吸附到 padding 边界
    - 但我们需要工具栏紧贴 Header 下方，所以需要处理这个 padding
    - 正确做法：给工具栏添加负 margin-top: -40px，抵消 MainContent 的 padding-top
    - 或者：将工具栏移到 MainContent 的 padding 区域之外
    - 最佳方案：将工具栏包裹在一个负 margin 的容器中，使工具栏能够向上延伸到 padding 区域
  - 修改：
    - 在 RichTextEditor 中添加一个包裹层，使用负 margin 抵消 padding
    - 工具栏设置 top: 0
    - 确保工具栏有实色背景和足够高的 z-index
  - 涉及文件：`RichTextEditor.tsx`
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `human-judgement` TR-7.1: 向下滚动 MainContent，验证工具栏紧贴 Header 下方，没有空隙
  - `human-judgement` TR-7.2: 验证工具栏后面没有任何文字或内容透出
- **Notes**: 关键是处理 MainContent 的 padding 对 sticky 定位的影响
