# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
  - 将所有 @tiptap/* 包统一升级到精确版本 3.26.0
  - 重新安装依赖，构建验证通过

- [x] Task 2: 实现自定义合并后空行修复逻辑
  - 在 `RichTextEditor.tsx` 中创建 `handleMergeCells` 函数
  - 调用 `mergeCells()` 后，遍历表格行检测空行（childCount === 0）
  - 向空行插入空 `<td>` 占位单元格以保持行数
  - 替换合并按钮的 onClick 为新的 handleMergeCells
  - 构建验证通过

# Task Dependencies
- Task 2 依赖 Task 1 完成

# Notes
- 根因：第二次合并时所有单元格 rowspan=2，末尾行被 ProseMirror 移除
- 修复方式：合并后检测空行并填充占位单元格