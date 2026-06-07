# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
- [x] Task 2: 实现自定义合并后空行修复逻辑（已废弃，引入新问题）
- [x] Task 3: 实现自定义 mergeCells 命令替代 TipTap 原生命令（基础版本）
- [x] Task 4: 修复自定义合并逻辑中的行数丢失问题
- [x] Task 5: 重写表格重建逻辑，正确处理已有合并单元格（当前版本仍有bug）
- [x] Task 6: 使用 ProseMirror 原生 mergeCells 命令并修复其副作用
- [x] Task 7: 修复占位符单元格的 colspan 使其与表格宽度一致
  - 分析：当前添加的占位符 colspan=1，但合并单元格 colspan=2，导致列数不对
  - 方案：将占位符的 colspan 设置为 tableMap.width（表格总列数）
  - 这样占位符会横跨所有列，保持表格结构正确
  - 构建验证通过

# Task Dependencies
- Task 7 依赖 Task 6 的经验

# Notes
- 根因：占位符单元格的 colspan 不正确
- 修复方式：将占位符的 colspan 设置为表格总列数