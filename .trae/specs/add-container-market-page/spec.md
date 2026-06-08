# Add Container (Plugin Market) Page Spec

## Why
左侧栏缺少一个插件/容器市场入口，无法让用户浏览和安装扩展编辑器功能的小组件。需要一个类似插件市场的页面，以卡片形式展示各种编辑器插件/组件，支持分类筛选、热门推荐等功能。

## What Changes
- **新增 `ViewType`**：添加 `'market'` 到 `ViewType` 联合类型
- **新增 `MarketPage` 组件**：卡片式布局的插件市场页面，包含搜索、筛选（全部/热门/分类）、卡片展示
- **修改 `FuncSidebar`**：在"知识管理"区域新增"容器"导航项，使用 `ComponentIcon` 图标
- **修改 `useAppState`**：新增 `navigateToMarket` 方法
- **修改 `App.tsx`**：新增 `handleNavigateToMarket`，在内容区渲染 `MarketPage`
- **修改 i18n**：四种语言新增 `sidebar.container` 翻译键

## Impact
- Affected code: `src/types/index.ts`, `src/components/FuncSidebar.tsx`, `src/hooks/useAppState.ts`, `src/App.tsx`, `src/i18n/index.ts`
- New files: `src/components/MarketPage.tsx`

## ADDED Requirements
### Requirement: Container Market Page
系统 SHALL 提供一个类似插件市场的"容器"页面，以卡片形式展示编辑器相关的小组件和插件。

#### Scenario: 从侧边栏进入容器页面
- **WHEN** 用户点击左侧栏"知识管理"下的"容器"导航项
- **THEN** 主内容区域显示容器市场页面，包含搜索栏、筛选标签页和插件卡片网格

#### Scenario: 筛选功能
- **WHEN** 用户点击"全部"筛选标签
- **THEN** 显示所有可用插件卡片
- **WHEN** 用户点击"热门"筛选标签
- **THEN** 按热度排序显示插件卡片
- **WHEN** 用户点击分类标签（如"排版"、"媒体"、"工具"、"数据"）
- **THEN** 仅显示该分类下的插件

#### Scenario: 插件卡片展示
- **WHEN** 市场页面已加载
- **THEN** 每个插件以卡片形式展示，包含图标、名称、简短描述、热度标签、分类标签
- **THEN** 卡片支持鼠标悬停效果（阴影、上浮）

## MODIFIED Requirements
### Requirement: Left Sidebar Navigation
侧边栏 SHALL 在"知识管理"区域新增"容器"导航项，使用 ComponentIcon 图标。

### Requirement: View Management
系统 SHALL 支持 'market' 视图状态，与 'home'、'page'、'settings' 并列。