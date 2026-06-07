# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
- [x] Task 2-7: 多轮尝试修复（均失败，根因已定位）

- [x] Task 8: 完全重写 handleMergeCells 函数
  - 合并前：保存原始表格的行数（origHeight）和列数（origWidth）
  - 调用原生 editor.chain().focus().mergeCells().run()
  - 合并后：获取新表格行数（postHeight），与 origHeight 对比
  - 如果 postHeight < origHeight，补充缺失行，每行放置 colspan=origWidth 的占位单元格
  - 构建验证通过

# Task Dependencies
- Task 8 依赖之前所有尝试的经验

# 关键发现
- 致命 bug：之前的 fixTr 在 mergeCells 之后用 tableMap.height 遍历，但此时空行已被移除，height 已变小，永远检测不到被移除的行
- 修复：在 mergeCells 之前保存原始行数，合并后对比