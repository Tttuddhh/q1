# 修复新输入段落间距问题 - The Implementation Plan (Decomposed and Prioritized Task List

## [x] Task 1: CSS 规则调整
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 调整 `.ProseMirror p` 的默认样式，margin-bottom: 0
  - 添加 `.ProseMirror p.keep-original-margin { margin-bottom: 0.75em !important; }
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]
- **Test Requirements**:
  - `programmatic` TR-1.1: index.css 中包含新的样式规则
  - `human-judgement` TR-1.2: 没有 keep-original-margin 类的段落视觉效果

## [x] Task 2: DOM 操作标记初始段落
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 在 RichTextEditor 的 useEffect 中，给所有初始存在的段落添加 keep-original-margin 类
  - 使用多个 requestAnimationFrame 确保 DOM 完全渲染后再添加类
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-2.1: RichTextEditor.tsx 中包含类添加逻辑存在
  - `human-judgement` TR-2.2: 初始化后已有段落包含正确标记

## [x] Task 3: 构建验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 运行 npm run build 验证 TypeScript 编译通过
  - 确保无类型错误
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `programmatic` TR-3.1: npm run build 成功无错误
