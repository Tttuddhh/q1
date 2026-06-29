# 修复容器市场页面间距 Spec

## Why
容器市场页面各组件之间的间距需要重新优化，使标题、简述、分类标签、卡片网格等元素的上下左右间距更加协调，避免过疏或过密。

## What Changes
- 调整页面容器整体内边距
- 调整标题区域与简述区域之间的间距
- 调整分类标签与卡片网格之间的间距
- 调整卡片内部元素之间的间距（标题、评分、下载量、分类标签）
- 调整卡片网格的列间距和行间距
- 不修改内容、封面、颜色、文字等

## Impact
- Affected specs: fix-container-marketplace-ui
- Affected code: `src/components/ContainerMarketplace.tsx`, `src/components/ContainerCard.tsx`

## MODIFIED Requirements

### Requirement: 页面整体间距
The container marketplace page SHALL have balanced outer and inner spacing.

#### Scenario: 页面布局
- **WHEN** 用户进入容器市场页面
- **THEN** 页面内容与边缘保持适中的内边距
- **THEN** 各区块（标题、简述、分类标签、卡片网格）之间的上下间距协调

### Requirement: 卡片内部间距
The container card SHALL have balanced spacing between its internal elements.

#### Scenario: 卡片展示
- **WHEN** 用户查看容器卡片
- **THEN** 封面、名称行、分类标签之间的间距协调
- **THEN** 名称与评分/下载量之间的间距合适

## REMOVED Requirements
无
