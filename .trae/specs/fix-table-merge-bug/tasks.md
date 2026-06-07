# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
  - 将所有 @tiptap/* 包统一升级到精确版本 3.26.0
  - 重新安装依赖，构建验证通过

- [x] Task 2: 实现自定义合并后空行修复逻辑（已废弃，引入新问题）

- [x] Task 3: 实现自定义 mergeCells 命令替代 TipTap 原生命令
  - 移除旧的 handleMergeCells 空行修复逻辑
  - 导入 CellSelection 和 TableMap 从 @tiptap/pm/tables
  - 使用 ProseMirror 的 table 模块实现自定义合并
  - 获取选区矩形边界（rect）
  - 创建新单元格并设置正确的 colspan/rowspan
  - 重建表格行，删除选区内其他单元格，将新单元格插入左上角
  - 更新合并按钮调用新的自定义命令
  - 构建验证通过

# Task Dependencies
- Task 3 依赖 Task 1 完成

# Notes
- 根因：TipTap 原生 mergeCells() 在跨行合并时 colspan/rowspan 计算错误
- 修复方式：使用 ProseMirror table 模块的底层 API 自行实现合并逻辑