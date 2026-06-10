# Tasks

- [x] Task 1: 创建 TableGridPicker 组件
  - [x] SubTask 1.1: 实现 7x7 九宫格 UI，每个格子可悬停和点击
  - [x] SubTask 1.2: 实现悬停高亮逻辑（从 0,0 到当前格子的区域高亮）
  - [x] SubTask 1.3: 显示当前悬停的行列数（如 "3 x 4"）
  - [x] SubTask 1.4: 点击外部关闭弹窗
  - **验证**: 弹窗正确显示，悬停高亮正确，行列数显示正确

- [x] Task 2: 修改 RichTextEditor 表格插入逻辑
  - [x] SubTask 2.1: 将 insertTable 改为打开 TableGridPicker
  - [x] SubTask 2.2: 从选择器获取行列数后调用 editor.insertTable
  - [x] SubTask 2.3: 添加表格显示样式（边框等）
  - **验证**: 点击表格图标弹出选择器，选择后正确插入表格

- [x] Task 3: 构建并验证
  - [x] SubTask 3.1: 运行 npm run build 检查无错误
  - [x] SubTask 3.2: 启动预览验证功能
  - **验证**: 构建成功，表格选择器工作正常
