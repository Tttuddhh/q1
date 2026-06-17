# Tasks

- [x] Task 1: 创建容器数据类型和模拟数据
  - [x] 在 `src/types/index.ts` 中定义 Container 接口
  - [x] 在 `src/data/containers.ts` 中创建模拟容器数据（10个）

- [x] Task 2: 创建容器卡片组件
  - [x] 创建 `src/components/ContainerCard.tsx`
  - [x] 实现卡片布局：封面图区域、容器名/评分/安装量行、分类标签行

- [x] Task 3: 创建容器详情弹窗组件
  - [x] 创建 `src/components/ContainerDetailModal.tsx`
  - [x] 实现弹窗头部、简述、预览图、5个固定Tab

- [x] Task 4: 创建容器市场页面
  - [x] 创建 `src/components/ContainerMarketplace.tsx`
  - [x] 实现页面头部、分类筛选栏、5列网格布局

- [x] Task 5: 扩展应用状态管理
  - [x] 修改 `src/hooks/useAppState.ts`，添加 container_marketplace 视图

- [x] Task 6: 更新侧边栏导航
  - [x] 修改 `src/components/FuncSidebar.tsx`，添加"容器"导航项

- [x] Task 7: 更新 App.tsx 路由
  - [x] 修改 `src/App.tsx`，添加容器市场视图渲染

- [x] Task 8: 构建验证
  - [x] 运行 `npm run build` 确保构建成功

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 1, Task 2, Task 3
- Task 5 可独立进行
- Task 6 depends on Task 5
- Task 7 depends on Task 4, Task 5, Task 6
- Task 8 depends on Task 7
