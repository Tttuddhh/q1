# 容器市场页面 Spec

## Why
用户需要一个类似插件市场的"容器"页面，用于浏览、上传和管理容器。该页面需要与现有知识库应用的主题色和组件风格保持一致，同时提供完整的容器浏览、筛选、详情查看和安装功能。

## What Changes
- 新增容器市场页面（ContainerMarketplace），作为独立视图通过侧边栏导航进入
- 新增容器卡片组件（ContainerCard），展示容器封面、名称、评分、安装量、分类标签
- 新增容器详情弹窗（ContainerDetailModal），展示容器完整信息、预览图、Tab切换内容
- 在侧边栏（FuncSidebar）新增"容器"导航入口，使用合适的图标
- 新增容器数据类型和模拟数据
- 新增容器相关状态管理（useAppState扩展）
- 使用现有主题色（--theme-primary）和组件风格进行还原

## Impact
- Affected code: `src/App.tsx`, `src/components/FuncSidebar.tsx`, `src/hooks/useAppState.ts`, `src/types/index.ts`
- New files: `src/components/ContainerMarketplace.tsx`, `src/components/ContainerCard.tsx`, `src/components/ContainerDetailModal.tsx`, `src/data/containers.ts`

## ADDED Requirements

### Requirement: 容器市场页面布局
The system SHALL provide a container marketplace page matching the reference design.

#### Scenario: 页面头部区域
- **WHEN** 用户进入容器市场页面
- **THEN** 页面顶部显示：
  - 左侧：主题色圆角方形图标 + "容器"大标题
  - 标题下方："简述："标签 + 简述文本（多行）
  - 右侧："上传容器"和"我的"两个圆角按钮（黑色背景、白色文字、圆角pill形状）

#### Scenario: 分类筛选区域
- **WHEN** 用户浏览容器市场
- **THEN** 显示分类标签行：
  - 左侧：多个黑色pill形状的分类标签按钮（如"分类"）
  - 右侧："筛选"pill按钮
  - 分类标签可点击切换选中状态

#### Scenario: 容器卡片网格
- **WHEN** 用户浏览容器列表
- **THEN** 显示5列网格布局的容器卡片，每页显示10个卡片（2行x5列）

### Requirement: 容器卡片
The system SHALL display container cards matching the reference design.

#### Scenario: 卡片布局
- **WHEN** 用户查看容器卡片
- **THEN** 每张卡片包含：
  - 上方：圆角矩形封面图区域（16:10比例，浅灰色背景）
  - 下方：容器名（左侧）、评分（中间）、安装量（右侧）
  - 底部：1-3个黑色pill形状的分类标签

#### Scenario: 卡片交互
- **WHEN** 用户点击卡片
- **THEN** 打开容器详情弹窗

### Requirement: 容器详情弹窗
The system SHALL provide a container detail modal matching the reference design.

#### Scenario: 弹窗头部
- **WHEN** 详情弹窗打开
- **THEN** 显示：
  - 左侧：圆角方形图标 + 容器名 + "作者：xxx"
  - 右侧：黑色pill形状"安装"按钮

#### Scenario: 弹窗内容区域
- **WHEN** 用户查看详情弹窗
- **THEN** 显示：
  - "简述"标题 + 简述文本段落
  - "预览"标题 + 3个圆角矩形预览图（主题色背景）
  - 5个Tab标签：说明、功能介绍、使用教程、更新日杂、其他信息
  - Tab内容区域显示对应文本

#### Scenario: 弹窗关闭
- **WHEN** 用户点击弹窗外区域或关闭按钮
- **THEN** 弹窗关闭，返回市场页面

### Requirement: 侧边栏导航
The system SHALL add a container marketplace entry to the sidebar.

#### Scenario: 导航入口
- **WHEN** 用户查看侧边栏
- **THEN** "系统"分类下显示"容器"选项，使用合适的Hugeicons图标（如PackageIcon或GridIcon）
- **WHEN** 用户点击"容器"
- **THEN** 导航到容器市场页面

## MODIFIED Requirements

### Requirement: 应用状态管理
扩展 useAppState 以支持容器市场视图。

#### Scenario: 视图切换
- **WHEN** 用户点击侧边栏"容器"
- **THEN** currentView 切换为 'container_marketplace'
- **THEN** 主内容区域渲染 ContainerMarketplace 组件

## REMOVED Requirements
无
