# 修复容器市场页面 UI Spec

## Why
容器市场页面存在多处 UI 问题需要修复：页面两侧空白过多未充分利用、分类标签按钮颜色过深、下载量文字过长、说明内容未根据插件描述、其他信息和功能介绍布局不合理。

## What Changes
- 容器页面布局调整：移除 maxWidth 限制，让内容充分利用可用宽度，增加每行卡片数量至 5-6 个
- 分类标签按钮颜色改浅：未选中状态使用浅色/灰色效果，而非主题色
- 下载量显示改为仅"下载"两个字，去掉"量"字
- 说明 Tab 内容改为根据插件实际描述来写（功能介绍 + 使用教程）
- 其他信息 Tab 内容改为左右两列排布，而非竖向列表
- 功能介绍 Tab 改为复选框形式展示功能列表，包含已具备功能和计划更新的功能（未实现的无对勾），左右排布

## Impact
- Affected specs: add-container-marketplace
- Affected code: `src/components/ContainerMarketplace.tsx`, `src/components/ContainerCard.tsx`, `src/components/ContainerDetailModal.tsx`, `src/data/containers.ts`, `src/types/index.ts`

## ADDED Requirements

### Requirement: 充分利用页面宽度
The container marketplace SHALL use full available width without maxWidth constraint, showing 5-6 cards per row.

#### Scenario: 宽屏布局
- **WHEN** 用户进入容器市场页面
- **THEN** 内容区域占满可用宽度，没有两侧大留白
- **THEN** 每行显示 5-6 个卡片（通过调整 minmax 和 gap）

### Requirement: 分类标签按钮颜色
The category filter buttons SHALL use light/gray color for unselected state.

#### Scenario: 未选中标签
- **WHEN** 用户查看分类标签
- **THEN** 未选中的标签按钮显示浅色/灰色背景和文字
- **THEN** 选中的标签按钮显示主题色背景

### Requirement: 功能介绍复选框形式
The "功能介绍" tab SHALL display features as a checkbox list with implemented and planned features.

#### Scenario: 功能列表展示
- **WHEN** 用户切换到"功能介绍"Tab
- **THEN** 显示功能列表，每项左侧有复选框
- **THEN** 已实现的功能显示对勾
- **THEN** 计划更新的功能无对勾
- **THEN** 内容左右排布，而非竖向

### Requirement: 其他信息左右排布
The "其他信息" tab SHALL display metadata in a two-column layout.

#### Scenario: 其他信息展示
- **WHEN** 用户切换到"其他信息"Tab
- **THEN** 内容以左右两列排布
- **THEN** 标签和值成对显示

## MODIFIED Requirements

### Requirement: 下载量显示
The install count display SHALL show only "下载" suffix.

#### Scenario: 卡片信息行
- **WHEN** 用户查看容器卡片
- **THEN** 安装量显示为 "1.3万 下载"（仅"下载"两字，无"量"字）

### Requirement: 说明 Tab 内容
The "说明" tab SHALL contain actual plugin description combining features and tutorial.

#### Scenario: 说明内容
- **WHEN** 用户查看"说明"Tab
- **THEN** 内容根据该插件的实际功能描述编写
- **THEN** 包含功能介绍和使用教程

## REMOVED Requirements
无
