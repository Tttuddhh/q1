# 修复表情选择器空白方框 Spec

## Why
用户报告在表情选择器中看到长方形空白方框，通过浏览器自动化工具（agent-browser）调查后确认：
1. 之前的尾随逗号修复（移除 EMOJIS 和 KAOMOJIS 数组末尾逗号）已消除空元素
2. 发现了新的问题：EMOJIS 数组中 🧷 表情重复出现（第276行和第278行各出现一次）
3. KAOMOJIS 数组存在大量重复项需要清理
4. **根本原因**：EMOJIS 数组中包含大量 Unicode 码点 > 0x1F900 的较新 emoji（如 🥸 U+1F978、🥰 U+1F970 等），这些 emoji 在 2016 年后才添加，某些系统字体不支持，会显示为空白方框

## What Changes
- 移除 EMOJIS 数组第278行末尾的重复 🧷 表情
- 清理 KAOMOJIS 数组中的重复颜文字，保留唯一的颜文字列表
- **移除所有 Unicode 码点 > 0x1F900 的 emoji**，替换为兼容性更好的旧版 emoji
- 确保所有表情和颜文字正确显示，无空白方框

## Impact
- Affected specs: enhance-emoji-picker
- Affected code: RichTextEditor.tsx (EMOJIS 和 KAOMOJIS 数组)

## MODIFIED Requirements
### Requirement: 表情列表无重复和空白
EMOJIS 数组和 KAOMOJIS 数组中的每个元素都应是唯一的、有效的字符，不包含重复项和空元素，且所有 emoji 的 Unicode 码点应 ≤ 0x1F900 以确保字体兼容性。

#### Scenario: 默认表情显示完整
- **WHEN** 用户打开表情选择器的默认表情标签
- **THEN** 所有表情正确显示，无重复，无空白方框

#### Scenario: 颜文字显示完整
- **WHEN** 用户打开表情选择器的颜文字标签
- **THEN** 所有颜文字正确显示，无重复项，无空白方框