# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
- [x] Task 2: 实现自定义合并后空行修复逻辑（已废弃，引入新问题）
- [x] Task 3: 实现自定义 mergeCells 命令替代 TipTap 原生命令（基础版本）
- [x] Task 4: 修复自定义合并逻辑中的行数丢失问题
- [x] Task 5: 重写表格重建逻辑，正确处理已有合并单元格（当前版本仍有bug）
- [x] Task 6: 使用 ProseMirror 原生 mergeCells 命令并修复其副作用
  - 分析：ProseMirror 的 mergeCells 本身能正确处理 colspan/rowspan，但会在第二行全被 rowspan 吸收时移除空行
  - 方案：调用原生 mergeCells 后，检测并修复被移除的行
  - 与之前的空行修复不同，这次只在行被完全吸收时才添加占位符
  - 确保添加的占位符不会导致列数异常
  - 构建验证通过

# Task Dependencies
- Task 6 依赖 Task 5 的经验

# Notes
- 根因：自定义重建逻辑无法正确处理已有合并单元格的复杂情况
- 修复方式：回归使用 ProseMirror 原生 mergeCells，只修复其行移除的副作用