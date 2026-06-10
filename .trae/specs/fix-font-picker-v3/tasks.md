# 修复字体选择器 v3 - Implementation Tasks

## [x] Task 1: 修复字体加载工具
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 src/utils/fontLoader.ts
  - 移除 `text` 参数，改为加载完整字体子集
  - 中文字体使用 `subset=chinese-simplified` 参数
  - 添加 `document.fonts.load()` 支持，可以等待字体加载完成
  - 返回 Promise，让调用者知道字体何时加载完成
  - URL 格式：
    - 中文：`https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&subset=chinese-simplified&display=swap`
    - 英文：`https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap`
- **Acceptance Criteria Addressed**: 字体正确渲染
- **Test Requirements**:
  - `programmatic` TR-1.1: 中文字体的 URL 包含 `subset=chinese-simplified`
  - `programmatic` TR-1.2: `loadGoogleFont` 返回 Promise
  - `programmatic` TR-1.3: 使用 `document.fonts.load()` 等待字体加载

## [x] Task 2: 修复字体选择器组件
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 修改 src/components/FontPicker.tsx
  - 字体选择器打开时，批量加载所有字体并等待加载完成
  - 使用 `document.fonts.load()` 确保字体已加载后再渲染列表
  - 或者使用 `FontFaceObserver` 模式：加载 link 后等待字体可用
  - 每个字体项在字体加载完成前显示默认样式，加载完成后切换为对应字体
  - 添加简单的加载状态（如淡入效果）
- **Acceptance Criteria Addressed**: 字体正确渲染
- **Test Requirements**:
  - `human-judgement` TR-2.1: 字体选择器打开后，所有字体预览都能正确显示对应字体样式
  - `human-judgement` TR-2.2: 字体加载过程中有适当的视觉反馈

## [x] Task 3: 构建并验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**:
  - 运行 npm run build 确保构建成功
  - 验证字体选择器中每个字体都能正确渲染
- **Acceptance Criteria Addressed**: All
- **Test Requirements**:
  - `programmatic` TR-3.1: 构建无错误
  - `human-judgement` TR-3.2: 所有字体预览正确渲染
