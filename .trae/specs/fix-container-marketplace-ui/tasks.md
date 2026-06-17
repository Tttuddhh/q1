# Tasks

- [ ] Task 1: 调整容器市场页面布局以充分利用宽度
  - [ ] SubTask 1.1: 移除 ContainerMarketplace 的 maxWidth: 1200 限制
  - [ ] SubTask 1.2: 调整 grid 的 minmax 为更小的值（如 160px）以支持每行 5-6 个卡片
  - [ ] SubTask 1.3: 调整 padding 使内容更紧凑
- [ ] Task 2: 修改分类标签按钮颜色
  - [ ] SubTask 2.1: 未选中状态改为浅色/灰色背景和文字（如 #e5e7eb 背景 + #6b7280 文字）
  - [ ] SubTask 2.2: 选中状态保持主题色
- [ ] Task 3: 修改下载量显示文字
  - [ ] SubTask 3.1: 将 ContainerCard 中的 "下载量" 改为 "下载"
- [ ] Task 4: 更新数据模型和说明内容
  - [ ] SubTask 4.1: 更新 Container 类型，使 tabs.features 为结构化数据（包含 name, implemented, planned 等字段）
  - [ ] SubTask 4.2: 重写 containers.ts 中每个插件的说明内容，根据实际插件描述编写
- [ ] Task 5: 重构功能介绍 Tab 为复选框形式
  - [ ] SubTask 5.1: 在 ContainerDetailModal 中实现复选框列表 UI
  - [ ] SubTask 5.2: 已实现功能显示对勾，计划更新功能无对勾
  - [ ] SubTask 5.3: 内容左右两列排布
- [ ] Task 6: 重构其他信息 Tab 为左右排布
  - [ ] SubTask 6.1: 将其他信息从竖向列表改为两列网格布局
  - [ ] SubTask 6.2: 标签和值成对显示

# Task Dependencies
- Task 4 需要在 Task 5 之前完成（数据模型变更）
- Task 5 和 Task 6 可以并行执行
