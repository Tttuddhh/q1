# Tasks

- [x] Task 1: 修复 TipTap 表格包版本一致性
  - 将 @tiptap/extension-table 及其相关包版本固定为 3.22.5
  - 移除了 package.json 中的 ^ 符号，使用精确版本
  - 重新安装依赖
  - 构建验证通过

# Task Dependencies
- 无

# Notes
- 问题可能与 TipTap 3.26.0 版本的 mergeCells() 实现有关
- 已将表格包降级到 3.22.5，与其他 @tiptap 包保持兼容
- 用户需要测试合并功能是否正常工作
