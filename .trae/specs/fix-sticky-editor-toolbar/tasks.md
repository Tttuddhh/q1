# 编辑器工具栏吸附顶部 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 修改工具栏为 sticky 定位
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 `RichTextEditor.tsx` 中将工具栏容器改为 `position: sticky`
  - 设置 `top: 0` 使工具栏吸附在视口顶部
  - 设置 `zIndex` 确保工具栏在其他元素之上
  - 设置 `background` 为白色，避免内容透过工具栏显示
  - 涉及文件：`RichTextEditor.tsx`
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
  - 可能需要调整内容区域的 padding-top 或 margin-top
  - 涉及文件：`RichTextEditor.tsx`
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
  - 测试格式设置（粗体、斜体等）
  - 测试表情选择器弹出位置是否正确
  - 涉及文件：`RichTextEditor.tsx`
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 验证吸附状态下工具栏按钮点击正常
  - `human-judgement` TR-3.2: 验证表情选择器弹出位置正确
- **Notes**: 表情选择器使用 absolute 定位，需要确保在 sticky 工具栏下位置正确

## [x] Task 4: 修复工具栏后方内容透出问题（第一次尝试）
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 将工具栏 z-index 提高到 50
  - 为编辑器容器添加 position: relative + z-index: 1
- **结果**: 未完全修复，内容仍然透出

## [x] Task 5: 重新分析并修复内容透出问题
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 深入分析问题根本原因：
    1. MainContent 是 overflow: auto 的滚动容器
    2. Header 是 sticky 定位在 MainContent 之外
    3. 工具栏是 sticky 定位在 MainContent 之内
    4. 从截图看，透出的是页面标题文字（位于 Page Header 区域）
    5. 问题可能是：当 MainContent 滚动时，Page Header 向上滚动，工具栏 sticky 在 MainContent 顶部，但 Header（在 MainContent 外）也是 sticky 的，导致层级混乱
  - 正确解决方案：
    - 方案A：将工具栏改为 fixed 定位，相对于视口固定，而不是相对于 MainContent sticky
    - 方案B：给工具栏添加 `marginTop: -40px` 或类似值，使其向上延伸到 Header 区域
    - 方案C：将工具栏包裹在一个全宽的容器中，该容器 sticky 在 MainContent 顶部，并有实色背景
    - 方案D：使用 `position: fixed` + `top: 56px`（Header 高度），让工具栏固定在 Header 下方
  - 采用方案D：使用 fixed 定位，top 设置为 Header 的高度 56px，这样工具栏会固定在视口的 Header 下方，完全脱离 MainContent 的滚动上下文
  - 涉及文件：`RichTextEditor.tsx`
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 向下滚动页面，验证工具栏后方没有任何文字或内容透出
  - `human-judgement` TR-5.2: 工具栏始终固定在 Header 正下方
- **Notes**: 使用 fixed 定位可以彻底解决 sticky 上下文问题
