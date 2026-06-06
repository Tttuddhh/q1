# Tasks

- [ ] Task 1: 移除自定义表格拖拽选中 Hook，恢复 ProseMirror 原生单元格选中
  - [ ] SubTask 1.1: 删除 `useTableCellSelection` Hook 及其所有引用
  - [ ] SubTask 1.2: 从 `RichTextEditor` 组件中移除 `containerRef`、`mergeSelectedCells`、`hasSelection` 的引用
  - [ ] SubTask 1.3: 合并按钮改为直接使用 `editor.chain().focus().mergeCells().run()`，不依赖自定义选中状态
  - [ ] SubTask 1.4: 移除 `containerRef` 对编辑器外层 div 的绑定

- [ ] Task 2: 修复表格 CSS，移除干扰光标定位的样式
  - [ ] SubTask 2.1: 从 `index.css` 中移除 `.ProseMirror table td, .ProseMirror table th` 中的 `pointer-events: auto` 和 `user-select: text`
  - [ ] SubTask 2.2: 添加 `.ProseMirror .selectedCell` 样式，让原生选中的单元格有高亮背景

- [ ] Task 3: 构建并验证
  - [ ] SubTask 3.1: 运行 `npm run build` 确保无编译错误
  - [ ] SubTask 3.2: 运行 `npm run lint` 确保无 lint 错误
