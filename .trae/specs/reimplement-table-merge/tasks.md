# Tasks

- [x] Task 1: 添加合并/拆分状态和检测逻辑
  - 添加 `canMergeCells` 和 `canSplitCell` 状态
  - 在 `onSelectionUpdate` 中使用 `editor.can().mergeCells()` 和 `editor.can().splitCell()` 检测
  - 在 `onUpdate` 中也添加检测以保持状态同步
- [x] Task 2: 添加合并/拆分按钮到工具栏
  - 导入 JoinRoundIcon 和 ScissorIcon
  - 当 `canMergeCells` 为 true 时显示合并按钮
  - 当 `canSplitCell` 为 true 时显示拆分按钮
  - 合并按钮调用 `editor.chain().focus().mergeCells().run()`
  - 拆分按钮调用 `editor.chain().focus().splitCell().run()`
- [x] Task 3: 添加单元格选中样式
  - 添加 `.selectedCell` 样式提供视觉反馈
  - 确保合并后的单元格样式正确
- [x] Task 4: 构建并验证
  - 运行 npm run build 确保无编译错误 ✓
  - 运行 npm run lint 确保无 lint 错误 ✓ (无新错误)
