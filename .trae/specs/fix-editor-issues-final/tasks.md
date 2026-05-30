# 修复编辑器工具栏图标和顶部间隙问题 - The Implementation Plan

## [x] Task 1: 替换箭头图标
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 用项目已引入的 ArrowLeft01Icon 和 ArrowRight01Icon 替换 UndoIcon 和 RedoIcon
  - 第1个按钮（重做）用 ArrowRight01Icon
  - 第2个按钮（撤销）用 ArrowLeft01Icon
- **Acceptance Criteria Addressed**: [AC-1]

## [x] Task 2: 修复工具栏顶部间隙
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 分析布局结构，找出真正导致间隙的原因
  - 调整 top 值或调整外层布局结构，使工具栏真正贴合视口顶部
- **Acceptance Criteria Addressed**: [AC-2]

## [x] Task 3: 构建验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 运行 npm run build 验证
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic`: npm run build 成功无错误
  - `human-judgement`: 图标方向正确，工具栏贴合顶部
