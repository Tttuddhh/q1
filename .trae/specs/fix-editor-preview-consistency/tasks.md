# 编辑器和预览模式样式一致性 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 给编辑模式外层容器添加 prose 类
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 [MainContent.tsx](file:///workspace/src/components/MainContent.tsx#L319-L320) 中，给编辑模式的外层容器添加 `className="prose"`，让它和预览模式保持一致
  - 这样可以确保编辑模式下内容的排版样式（标题、段落、列表等）与预览模式一致
- **Acceptance Criteria Addressed**: [AC-1, AC-3]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 编辑模式下标题大小与预览模式一致
  - `human-judgement` TR-1.2: 编辑模式下信息框样式与预览模式一致
  - `human-judgement` TR-1.3: 编辑模式下列表样式与预览模式一致

## [x] Task 2: 确保编辑模式和预览模式容器结构一致
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 确保编辑模式和预览模式的容器结构完全一致，避免宽度差异
  - 检查是否有额外的嵌套 div 导致宽度变化
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 编辑模式下内容宽度与预览模式完全一致

## [x] Task 3: 构建和验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 运行 npm run build 验证没有错误
  - 启动开发服务器验证编辑模式和预览模式一致性
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]
- **Test Requirements**:
  - `programmatic` TR-3.1: npm run build 成功无错误
  - `human-judgement` TR-3.2: 编辑模式和预览模式内容样式、布局、信息框都完全一致

## [x] Task 4: 删除重复的 ProseMirror 内容样式
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 参考网站只用 `.prose` 统一控制编辑和预览模式样式，没有单独的 ProseMirror 内容规则
  - 删除 [index.css](file:///workspace/src/index.css#L871-L965) 所有 ProseMirror 内容样式（h1/h2/h3/p/ul/ol/li/blockquote/code/pre）
  - 仅保留编辑器专用样式（outline移除、placeholder、格式化标记、对齐等）
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1, Task 2
- Task 4 依赖 Task 1
