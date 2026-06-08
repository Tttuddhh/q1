# Tasks

- [x] Task 1: 扩展 ViewType 类型并添加导航方法
  - [x] 在 `src/types/index.ts` 中将 `'market'` 添加到 `ViewType`
  - [x] 在 `useAppState.ts` 中新增 `navigateToMarket` 方法

- [x] Task 2: 创建 MarketPage 组件
  - [x] 新建 `src/components/MarketPage.tsx`，实现卡片式插件市场页面
  - [x] 包含搜索栏、筛选标签（全部/热门 + 分类标签）
  - [x] 卡片包含图标、名称、描述、热度、分类标签
  - [x] 卡片悬停效果
  - [x] 预置15个编辑器插件/组件数据

- [x] Task 3: 修改 FuncSidebar 添加容器导航项
  - [x] 引入 `ComponentIcon`
  - [x] 在"知识管理"区域添加"容器"导航项，点击触发 `onNavigateMarket`
  - [x] 传递 `onNavigateMarket` prop

- [x] Task 4: 修改 App.tsx 整合 MarketPage
  - [x] 新增 `handleNavigateToMarket` 回调
  - [x] 在内容渲染区添加 `currentView === 'market'` 的条件渲染
  - [x] 传递必要的 props 给 FuncSidebar

- [x] Task 5: 添加 i18n 翻译
  - [x] 在 zh/en/ja/ko 四种语言中添加 `'sidebar.container': '容器'` 等

- [x] Task 6: 构建验证
  - [x] 运行 `npm run build` 构建成功

# Task Dependencies
- Task 1 是 Task 2/3/4 的前置
- Task 3、4 可并行
- Task 5 可并行
- Task 6 依赖所有前置任务