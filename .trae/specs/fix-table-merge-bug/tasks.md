# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
  - 将所有 @tiptap/* 包统一升级到精确版本 3.26.0
  - 重新安装依赖，构建验证通过

- [x] Task 2: 实现自定义合并后空行修复逻辑（已废弃，引入新问题）

- [x] Task 3: 实现自定义 mergeCells 命令替代 TipTap 原生命令（基础版本）
  - 移除旧的 handleMergeCells 空行修复逻辑
  - 导入 CellSelection 和 TableMap 从 @tiptap/pm/tables
  - 使用 ProseMirror 的 table 模块实现自定义合并
  - 构建验证通过

- [x] Task 4: 修复自定义合并逻辑中的行数丢失问题
  - 修改表格重建逻辑，确保每一行至少有一个单元格
  - 对于完全被合并区域覆盖的行，保留合并单元格
  - 对于部分被覆盖的行，正确放置合并单元格和原单元格
  - 构建验证通过

# Task Dependencies
- Task 3 依赖 Task 1 完成
- Task 4 依赖 Task 3 完成

# Notes
- 根因：重建表格时，完全被合并区域覆盖的行会变成空行
- 修复方式：确保每行至少有一个单元格，合并单元格需要跨行显示