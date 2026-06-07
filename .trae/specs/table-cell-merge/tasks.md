# Tasks

- [ ] Task 1: 合并按钮改为条件显示，添加拆分按钮
  - [ ] SubTask 1.1: 在 `RichTextEditor` 组件中添加 `canMergeCells` 和 `canSplitCell` 状态
  - [ ] SubTask 1.2: 在 `onSelectionUpdate` 回调中更新 `canMergeCells` 和 `canSplitCell` 状态（使用 `editor.can().mergeCells()` 和 `editor.can().splitCell()`）
  - [ ] SubTask 1.3: 合并按钮改为只在 `canMergeCells` 为 true 时显示
  - [ ] SubTask 1.4: 添加拆分单元格按钮，使用 `ScissorIcon` 图标，只在 `canSplitCell` 为 true 时显示
  - [ ] SubTask 1.5: 拆分按钮点击时调用 `editor.chain().focus().splitCell().run()`

- [ ] Task 2: 修复表格 CSS 防止合并后出现虚线
  - [ ] SubTask 2.1: 检查并确保 `.ProseMirror .selectedCell:after` 样式不会导致虚线
  - [ ] SubTask 2.2: 为合并后的单元格（`[colspan]`、`[rowspan]`）添加合适的 CSS，确保内部边框正确消失

- [ ] Task 3: 构建并验证
  - [ ] SubTask 3.1: 运行 `npm run build` 确保无编译错误
  - [ ] SubTask 3.2: 运行 `npm run lint` 确保无 lint 错误
