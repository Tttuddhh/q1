# 修复编辑器工具提示缺失 - The Implementation Plan

## [x] Task 1: 添加缺失的 i18n 翻译键值
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 /workspace/src/i18n/index.ts 的 zh、en、ja、ko 四个语言对象中
  - 添加 `editor.undo`、`editor.redo`、`editor.emoji` 的翻译
  - 中文：撤销、重做、表情
  - 英文：Undo、Redo、Emoji
  - 日文：元に戻す、やり直す、絵文字
  - 韩文：실행 취소、다시 실행、이모티콘
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]

## [x] Task 2: 构建验证
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 运行 npm run build 验证没有错误
- **Acceptance Criteria Addressed**: 所有

# Task Dependencies
- Task 2 依赖 Task 1
