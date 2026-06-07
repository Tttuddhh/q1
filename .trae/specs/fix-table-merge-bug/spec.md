# 修复表格单元格合并导致表格结构错乱问题

## Why
用户期望的效果是：2x4 表格（2行4列）在合并左侧4个单元格和右侧4个单元格后，变成 2 行 2 列的表格，每行有 2 个大单元格（每个 colspan=2, rowspan=2）。但当前实现无法达到这个效果。

## What Changes
- 完全重写 `handleMergeCells` 函数
- 使用 ProseMirror 的 `mergeCells` 原生命令进行合并（它能正确处理 colspan/rowspan）
- 合并后，如果某行被 rowspan 完全覆盖导致没有单元格，则在该行添加一个与左侧合并单元格 colspan 相同的占位单元格
- 确保表格始终保持正确的行列结构

## Impact
- Affected code: `src/components/RichTextEditor.tsx`

## 根因分析
ProseMirror 的 `mergeCells` 命令在合并跨行单元格时，会创建一个 rowspan=2 的单元格。这会导致第二行的单元格被 rowspan 吸收，第二行变成空行，然后 ProseMirror 自动移除空行。

之前的修复尝试添加占位符，但占位符的 colspan=1，而合并单元格的 colspan=2，导致列数不对。

## 解决方案
正确的修复逻辑：
1. 调用 ProseMirror 原生 `mergeCells()`
2. 检查表格是否有行被完全移除（因为所有单元格都被 rowspan 吸收）
3. 如果有行被移除，需要在该行添加占位单元格
4. **关键**：占位单元格的 colspan 必须等于表格总列数（或等于合并单元格的 colspan），以保持表格结构正确

对于 2x4 表格合并左右两侧的场景：
- 第一次合并左侧：生成一个 colspan=2, rowspan=2 的单元格，第二行左侧被 rowspan 吸收
- 第二次合并右侧：生成另一个 colspan=2, rowspan=2 的单元格
- 最终表格：2 行，每行有 2 个 colspan=2 的单元格

## MODIFIED Requirements
### Requirement: 稳定的单元格合并
The system SHALL 在合并多个单元格时保持表格行列结构正确。

#### Scenario: 合并左侧单元格
- **WHEN** 用户在 2x4 表格中选中左侧 4 个单元格并合并
- **THEN** 表格变为 2 列（左侧一个大单元格 colspan=2, rowspan=2，右侧两列保持不变）

#### Scenario: 合并右侧单元格（在已合并左侧的基础上）
- **WHEN** 用户在已合并左侧的表格中选中右侧 4 个单元格并合并
- **THEN** 表格变为 2 列（左侧一个大单元格，右侧一个大单元格），不会多出任何列，行数保持 2 行

#### Scenario: 合并全部单元格
- **WHEN** 用户在 2x4 表格中选中全部 8 个单元格并合并
- **THEN** 表格保持 2 行，每行有 1 个 colspan=4 的大单元格
