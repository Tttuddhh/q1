# 修复字体渲染和清理非中文字体 - Tasks

## [x] Task 1: 移除日韩字体，补充中文字体至 120 种
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 从 FONTS 数组中移除所有日文和韩文字体（Kosugi、M PLUS 1p、Sawarabi、Shippori、Nanum、Gaegu、Gowun 等）
  - 用真正的中文字体替代，确保总数仍为 120
  - 所有字体名称必须为中文
- **Acceptance Criteria**: 120 个中文字体，0 个日韩字体
- **Test Requirements**:
  - `programmatic`: 中文字体数 = 120，日韩字体数 = 0

## [x] Task 2: 修复 FontPicker 字体渲染
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 确保字体选择器下拉列表中每个字体选项使用 `fontFamily: font.family` 渲染
  - 移除预览小字（preview text），仅显示字体名
  - 字体名必须用该字体自身的样式渲染
- **Acceptance Criteria**: 字体名使用各自字体样式渲染，无预览小字
- **Test Requirements**:
  - `visual`: 字体选择器中每个字体名显示为不同样式

## [ ] Task 3: 端到端验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**:
  - 运行 `npm run build`
  - 启动本地服务器
  - 验证字体选择器显示 120 个中文字体
  - 验证字体名用各自样式渲染
  - 验证无日韩字体
- **Acceptance Criteria**: 120 个中文字体，字体名正确渲染，无日韩字体

# Task Dependencies
- Task 1 和 Task 2 可并行
- Task 3 依赖 Task 1 和 Task 2
