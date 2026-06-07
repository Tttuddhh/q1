# 修复编辑器段落换行间隔不一致 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 调整编辑器段落样式使间隔一致
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 `index.css` 中为 `.ProseMirror p` 添加样式，使新段落之间的 margin-bottom 与同一段落内文字自动换行的 line-height 间隔一致
  - 当前 `.prose p` 的 line-height 为 1.75，font-size 为 16px（medium），所以行高约为 28px
  - 文字自动换行时，两行之间的额外间隔 = line-height * font-size - font-size = 1.75 * 16 - 16 = 12px
  - 需要将 `.ProseMirror p` 的 margin-bottom 调整为与这个额外间隔一致，即约 0.75em（12px/16px）
  - 实际上当前 `.prose p` 已经有 `margin-bottom: 0.75em`，但 `.ProseMirror p` 没有定义，可能继承了默认样式
  - 需要检查 `.ProseMirror p` 当前的实际 margin-bottom 值，并调整为与 line-height 产生的间隔一致
  - 涉及文件：`index.css`
- **Acceptance Criteria Addressed**: [AC-1, AC-3]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 在编辑器中输入多行文字，按 Enter 换行，观察新段落间隔是否与自动换行间隔一致
  - `human-judgement` TR-1.2: 在预览模式下查看同一段落，确认间隔一致
- **Notes**: 需要确保修改只影响新输入内容的换行间隔，不改变现有段落的整体布局

## [x] Task 2: 验证 compact-mode 下的间隔一致性
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 检查 compact-mode 下的 `.compact-mode .prose p` 样式（line-height: 1.6, margin-bottom: 0.5em）
  - 确保 compact-mode 下新输入内容的换行间隔也保持一致
  - 如果需要，为 `.compact-mode .ProseMirror p` 添加相应样式
- **Acceptance Criteria Addressed**: [AC-1, AC-3]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 在 compact-mode 下验证编辑器段落间隔一致性
- **Notes**: compact-mode 的 line-height 为 1.6，额外间隔 = 1.6 * 16 - 16 = 9.6px，约 0.6em

## [x] Task 3: 验证现有内容不受影响
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 打开已有内容的页面，检查现有段落间隔是否保持不变
  - 确保修改不会破坏已有文档的视觉效果
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 查看已有内容，确认段落间隔未改变
- **Notes**: 需要测试不同内容类型（纯文本、混合 heading/list 等）
