# 修复容器详情弹窗间距 Spec

## Why
容器详情弹窗（ContainerDetailModal）内部各区块（标题、简述、预览、Tab 栏、Tab 内容）之间的间距需要重新优化，使整体布局更加协调，避免过疏或过密。

## What Changes
- 调整弹窗 Header 区域内边距和元素间距
- 调整内容区域内边距
- 调整简述、预览、Tab 栏、Tab 内容之间的间距
- 调整 Tab 按钮之间的间距
- 调整功能介绍、更新日志、其他信息等内容内部间距
- 不修改内容、颜色、文字、封面等

## Impact
- Affected specs: fix-container-marketplace-ui
- Affected code: `src/components/ContainerDetailModal.tsx`

## MODIFIED Requirements

### Requirement: 弹窗整体间距
The container detail modal SHALL have balanced outer and inner spacing.

#### Scenario: 弹窗布局
- **WHEN** 用户打开容器详情弹窗
- **THEN** Header、内容区域、各区块之间的间距协调
- **THEN** 弹窗内边距适中，不拥挤也不过宽

### Requirement: Tab 内容间距
The tab content area SHALL have balanced spacing between its elements.

#### Scenario: Tab 内容展示
- **WHEN** 用户切换不同 Tab
- **THEN** 功能列表、更新日志、其他信息等内容内部间距协调

## REMOVED Requirements
无
