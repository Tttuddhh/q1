# Tasks

- [x] Task 1: 从DiceBear API下载头像SVG到本地public目录
  - [x] 使用curl从 `https://api.dicebear.com/10.x/open-peeps/svg?seed=user` 下载SVG并保存为 `/workspace/public/avatar.svg`

- [x] Task 2: 修改Header组件引用本地头像文件
  - [x] 将 `<img>` 的 `src` 改为 `/avatar.svg`
  - [x] 移除内联SVG代码，恢复为 `<img>` 标签
  - [x] 保留现有样式（圆角、尺寸）

- [x] Task 3: 构建验证
  - [x] 运行 `npm run build` 确保构建成功

# Task Dependencies
- Task 2 依赖 Task 1（需先下载头像文件）
- Task 3 依赖 Task 2（需先修改组件）