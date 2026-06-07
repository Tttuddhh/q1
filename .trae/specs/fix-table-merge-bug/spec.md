# 完全重写表格单元格合并功能

## Why
经过多轮尝试，之前的修复方案（原生 mergeCells + 占位符）始终无法达到用户期望的效果。根本原因是：mergeCells 执行后，用合并后的 `tableMap.height` 去检测空行，但此时空行已经被移除，`tableMap.height` 已经变小，无法检测到行丢失。需要在合并前保存原始行数和列数，合并后对比来修复。

## What Changes
- **完全删除**当前 `handleMergeCells` 中的所有自定义表格重建逻辑
- 改为：合并前保存原始表格的行数和列数，合并后对比，如果行数减少则补充缺失行
- 补充的缺失行中放置一个 `colspan` 等于原始列数的占位单元格
- 这样 ProseMirror 原生 mergeCells 能正确处理 colspan/rowspan，而我们的修复只处理行数丢失这一个副作用

## Impact
- Affected code: `src/components/RichTextEditor.tsx`

## 根因分析（关键发现）
之前的修复逻辑有致命缺陷：
```javascript
state.doc.descendants((node, pos) => {
  if (node.type.name === 'table') {
    const tableMap = TableMap.get(node); // 这里获取的是合并后的 tableMap
    for (let row = 0; row < tableMap.height; row++) { // height 已经变小了！
      // 检测空行...
    }
  }
});
```
`mergeCells()` 执行后，空行已被 ProseMirror 移除，此时 `tableMap.height` 已经比原始行数少。循环范围变小，永远检测不到被移除的行。

## 解决方案
1. 合并前：记录表格的原始行数（`origHeight`）和列数（`origWidth`）
2. 调用原生 `mergeCells()`
3. 合并后：获取新的表格行数
4. 如果新行数 < 原始行数，说明有行被移除
5. 向被移除的行中插入一个 `colspan=origWidth` 的占位单元格

## MODIFIED Requirements
### Requirement: 稳定的单元格合并
The system SHALL 在合并多个单元格时保持表格行数不变。

#### Scenario: 合并左侧单元格
- **WHEN** 用户在 2x4 表格中选中左侧 4 个单元格并合并
- **THEN** 表格变为 2 列（左侧一个大单元格 colspan=2, rowspan=2，右侧两列保持不变）

#### Scenario: 合并右侧单元格（在已合并左侧的基础上）
- **WHEN** 用户在已合并左侧的表格中选中右侧 4 个单元格并合并
- **THEN** 表格变为 2 列（左侧一个大单元格，右侧一个大单元格），不会多出任何列，行数保持 2 行

#### Scenario: 合并全部单元格
- **WHEN** 用户在 2x4 表格中选中全部 8 个单元格并合并
- **THEN** 表格保持 2 行，每行有 1 个 colspan=4 的大单元格