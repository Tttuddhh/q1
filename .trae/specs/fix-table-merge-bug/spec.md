# 修复表格单元格合并导致表格变形问题

## Why
当前表格单元格合并功能存在问题：用户插入 2x4 的表格后，先合并左边 4 个单元格，再合并右边 4 个单元格，结果表格从两行变成了一行。问题在于 TipTap 的 `mergeCells()` 在连续合并时可能破坏表格结构。

## What Changes
- 检查 `@tiptap/extension-table` 版本是否有已知的合并 bug
- 如果版本问题：降级或升级到稳定版本
- 如果是原生 bug：实现自定义合并逻辑作为 workaround

## Impact
- Affected code: `src/components/RichTextEditor.tsx`, `package.json`
- 可能需要更换或调整 TipTap 表格扩展版本

## 分析
用户场景：
1. 插入 2x4 表格（两行四列）
2. 选中左上 4 个单元格（A, B, E, F）合并 → 期望 rowspan=2, colspan=2
3. 选中右上 4 个单元格（C, D, G, H）合并 → 期望 rowspan=2, colspan=2

期望结果：
```
[ A+B+E+F (2x2) ] [ C+D+G+H (2x2) ]
```

实际结果：变成了一行

## 可能原因
1. TipTap 3.26.0 的 `mergeCells()` 在处理非连续/跨行选区时有 bug
2. 第一次合并后表格 DOM 结构变化，导致第二次合并时选区识别错误
3. 版本兼容性问题（之前修复过 @tiptap/extension-table 从 3.26.0 降级到 3.22.5）

## 解决方案
1. 方案 A：检查并修复 TipTap 版本一致性
2. 方案 B：实现自定义合并逻辑，确保每次合并都是独立的矩形选区
3. 方案 C：使用 prosemirror-tables 的低级 API 直接操作表格节点

## ADDED Requirements
### Requirement: 稳定的单元格合并
The system SHALL 在合并多个单元格时保持表格结构不变。

#### Scenario: 连续合并不破坏表格结构
- **WHEN** 用户先合并表格左侧单元格
- **AND** 再合并表格右侧单元格
- **THEN** 表格保持原有的行数，只是每行变成了更少的列
