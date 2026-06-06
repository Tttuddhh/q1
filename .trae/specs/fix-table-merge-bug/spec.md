# 修复表格单元格合并导致行数丢失问题

## Why
版本统一（全部升级到 3.26.0）后问题仍未解决。根因分析：当合并 2x4 表格的右侧 4 个单元格时，所有单元格都变成 rowspan=2，导致第二行没有独立单元格，ProseMirror 自动移除空行，表格从 2 行变成 1 行。

## What Changes
- 实现自定义 `handleMergeCells` 函数，在调用 `mergeCells()` 后检测并修复空行
- 编辑 `src/components/RichTextEditor.tsx` 中的合并按钮点击处理逻辑

## Impact
- Affected code: `src/components/RichTextEditor.tsx`

## 根因分析
用户场景：
1. 插入 2x4 表格（两行四列，第一行为表头 th）
2. 选中左上 4 个单元格（th1, th2, td1, td2）合并 → rowspan=2, colspan=2
3. 选中右上 4 个单元格（th3, th4, td3, td4）合并 → rowspan=2, colspan=2

第 3 步后，第二行所有 td 都被 rowspan=2 吸收，导致该行变空，ProseMirror 将其移除。

## 解决方案
在 `mergeCells()` 调用后，遍历表格的所有行，检测是否有行没有任何子单元格（全部被 rowspan 吸收），如有则向该行插入一个空的 `<td>` 占位单元格。

## MODIFIED Requirements
### Requirement: 稳定的单元格合并
The system SHALL 在合并多个单元格时保持表格行数不变。

#### Scenario: 连续合并不破坏表格结构
- **WHEN** 用户先合并表格左侧单元格
- **AND** 再合并表格右侧单元格
- **THEN** 表格保持原有的行数不变