# 修复容器市场页面 UI Spec

## Why
容器市场页面存在多处 UI 问题需要修复：页面树不应显示、卡片大小不一致、评分和安装量显示格式错误、按钮未使用主题色、网格布局不够灵活、详情弹窗内容不符合需求。

## What Changes
- 容器页面隐藏左侧页面树（PageTree）
- 修复卡片大小不一致问题（统一使用固定最小宽度 + flex 布局）
- 评分显示改为单个五角星 + 数字格式
- 安装量显示改为数字 + "下载量"文字后缀
- 所有按钮使用主题色（--theme-primary）替代黑色
- 网格布局改为响应式（auto-fill + minmax），根据界面宽度自适应列数
- 详情弹窗"其他信息"Tab 显示版本、更新人、最近上传/更新等信息
- 详情弹窗"更新日杂"Tab 显示日期列表，日期使用大字号区分

## Impact
- Affected specs: add-container-marketplace
- Affected code: `src/components/ContainerMarketplace.tsx`, `src/components/ContainerCard.tsx`, `src/components/ContainerDetailModal.tsx`, `src/App.tsx`, `src/types/index.ts`, `src/data/containers.ts`

## ADDED Requirements

### Requirement: 响应式网格布局
The grid SHALL use CSS auto-fill with a minimum card width to adapt to screen width.

#### Scenario: 自适应列数
- **WHEN** 用户调整浏览器宽度
- **THEN** 卡片列数自动调整，保证卡片不被截断，左右有留白

### Requirement: 详情弹窗 Tab 内容
The "其他信息" and "更新日杂" tabs SHALL display structured metadata.

#### Scenario: 其他信息 Tab
- **WHEN** 用户切换到"其他信息"Tab
- **THEN** 显示：版本号、更新人、最近上传时间、最近更新时间等

#### Scenario: 更新日杂 Tab
- **WHEN** 用户切换到"更新日杂"Tab
- **THEN** 显示日期列表，日期使用大字号突出，下方列出更新内容

## MODIFIED Requirements

### Requirement: 页面树隐藏
The page tree SHALL be hidden when viewing the container marketplace.

#### Scenario: 容器页面布局
- **WHEN** 用户进入容器市场页面
- **THEN** 左侧页面树不显示，内容区域占满可用空间

### Requirement: 按钮主题色
All buttons on the container marketplace SHALL use the theme primary color.

#### Scenario: 按钮颜色
- **WHEN** 用户查看分类标签、筛选按钮、安装按钮
- **THEN** 按钮背景色为 --theme-primary 而非黑色

### Requirement: 评分和安装量显示
The card info row SHALL display rating and installs in the correct format.

#### Scenario: 评分显示
- **WHEN** 用户查看容器卡片
- **THEN** 评分显示为 "★ 4.8"（单个五角星 + 数字）

#### Scenario: 安装量显示
- **WHEN** 用户查看容器卡片
- **THEN** 安装量显示为 "1.3万 下载量"（数字 + "下载量"后缀）
