# 扩充兼容 Emoji 并清理重复 Spec

## Why
当前 EMOJIS 数组经过移除码点 > 0x1F900 的不兼容 emoji 后，数量从 632 减少到 462 个，用户反馈小黄脸数量太少。需要在保证所有 emoji 码点 ≤ 0x1F900 的前提下，补充更多兼容的 emoji，同时排查并删除现有数组中的重复项。

## What Changes
- 排查 EMOJIS 数组中的重复 emoji 并删除，确保每个 emoji 只出现一次
- 补充更多 Unicode 码点 ≤ 0x1F900 的兼容 emoji，覆盖更多分类（手势、人物、自然、物品、符号等）
- 确保新增 emoji 与现有 emoji 无重复
- 确保所有 emoji 的 Unicode 码点 ≤ 0x1F900，避免再次出现空白方框

## Impact
- Affected specs: fix-emoji-blank-boxes, enhance-emoji-picker
- Affected code: RichTextEditor.tsx (EMOJIS 数组)

## ADDED Requirements
### Requirement: 扩充兼容 Emoji 数量
系统 SHALL 在 EMOJIS 数组中补充更多 Unicode 码点 ≤ 0x1F900 的 emoji，使总数增加到 600 个以上，同时保证无重复、无空白方框。

#### Scenario: 默认表情数量充足
- **WHEN** 用户打开表情选择器的默认表情标签
- **THEN** 看到至少 600 个兼容的 emoji，覆盖表情、手势、动物、食物、活动、物品、符号等多个分类

#### Scenario: 无重复 emoji
- **WHEN** 用户浏览默认表情列表
- **THEN** 每个 emoji 只出现一次，无重复项

#### Scenario: 无空白方框
- **WHEN** 用户浏览默认表情列表
- **THEN** 所有 emoji 正确显示，无空白方框

## MODIFIED Requirements
### Requirement: 表情列表无重复和空白
EMOJIS 数组中的每个元素都应是唯一的、有效的字符，不包含重复项，且所有 emoji 的 Unicode 码点应 ≤ 0x1F900 以确保字体兼容性。

#### Scenario: 默认表情显示完整
- **WHEN** 用户打开表情选择器的默认表情标签
- **THEN** 所有表情正确显示，无重复，无空白方框
