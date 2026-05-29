# 修复表情选择器空白方框 - 任务列表

## [x] Task 1: 移除 EMOJIS 数组中重复的 🧷 表情并清理 KAOMOJIS 重复项
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 移除 EMOJIS 数组第278行末尾的重复 '🧷'
  - 清理 KAOMOJIS 数组中的重复颜文字，保留唯一列表
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-1.1: npm run build 成功无错误
  - `human-judgement` TR-1.2: 浏览器中默认表情无重复、无空白方框
  - `human-judgement` TR-1.3: 颜文字标签无重复项

## [x] Task 2: 移除所有 Unicode 码点 > 0x1F900 的不兼容 emoji
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 识别 EMOJIS 数组中所有 Unicode 码点 > 0x1F900 的 emoji（约 170 个）
  - 将这些不兼容的 emoji 替换为 Unicode 码点 ≤ 0x1F900 的兼容性更好的旧版 emoji
  - 确保替换后的 emoji 在视觉和语义上相近
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic` TR-2.1: 所有 emoji 的 Unicode 码点 ≤ 0x1F900
  - `programmatic` TR-2.2: npm run build 成功无错误
  - `human-judgement` TR-2.3: 浏览器中默认表情无空白方框

## [x] Task 3: 使用 agent-browser 验证修复效果
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 使用 agent-browser 打开预览
  - 进入编辑模式打开表情选择器
  - 截图验证默认表情和颜文字标签无空白方框
  - 重点验证用户报告的位置（😎 旁边的 🥸 等）
  - 涉及文件：无（验证任务）
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 默认表情标签截图无空白方框
  - `human-judgement` TR-3.2: 颜文字标签截图无空白方框
  - `human-judgement` TR-3.3: 所有标签切换正常