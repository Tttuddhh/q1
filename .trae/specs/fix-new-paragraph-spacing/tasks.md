# 修复新输入段落间距问题 - The Implementation Plan

## [x] Task 1: 扩展 Paragraph 节点支持 class 属性
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 在 [editor-extensions.ts](file:///workspace/src/components/editor-extensions.ts) 中导出扩展后的 `ParagraphWithClass`（基于 StarterKit 的 Paragraph）
  - 使用 `Paragraph.extend({ addAttributes() {...} })` 添加 `class` 属性定义
  - 确保 `class` 属性可以正确读写并渲染为 HTML `class`
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic`: TypeScript 编译通过

## [x] Task 2: 实现 ProseMirror 插件自动标记最后一个段落
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 创建一个 Tiptap Extension，命名为 `NewParagraphExtension`
  - 在 `addProseMirrorPlugins()` 中返回一个 `Plugin`
  - 插件的 `appendTransaction` 方法：
    - 检测是否有 `docChanged` 的 transaction
    - 找到文档中的最后一个段落节点
    - 如果该段落没有 `new-paragraph` class，则用 `tr.setNodeMarkup` 添加
    - 返回该 transaction（让 ProseMirror 链式处理）
- **Acceptance Criteria Addressed**: [AC-1], [AC-3]
- **Test Requirements**:
  - `programmatic`: TypeScript 编译通过
  - `human-judgement`: 按回车后新段落 class 正确

## [x] Task 3: 在编辑器中注册新扩展
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**:
  - 在 [RichTextEditor.tsx](file:///workspace/src/components/RichTextEditor.tsx) 中：
    - 导入 `ParagraphWithClass` 和 `NewParagraphExtension`
    - 配置 `StarterKit.configure({ paragraph: false })` 禁用默认 Paragraph
    - 添加 `ParagraphWithClass` 和 `NewParagraphExtension` 到 extensions 数组
    - **删除**之前失败的 `transaction` 事件监听器
- **Acceptance Criteria Addressed**: [AC-1], [AC-2]
- **Test Requirements**:
  - `programmatic`: npm run build 成功

## [x] Task 4: 构建验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2, Task 3
- **Description**:
  - 运行 `npm run build` 验证 TypeScript 编译通过
  - 修复任何编译错误
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `programmatic`: npm run build 成功无错误

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1, Task 2
- Task 4 依赖 Task 1, Task 2, Task 3
