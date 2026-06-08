# Tasks

- [x] Task 1: 修改字体选择持久化逻辑
  - [x] 在 `RichTextEditor.tsx` 中引入 `lastSelectedFontName` ref 记录用户最后主动选择的字体
  - [x] 修改 `handleFontSelect`：选择字体时同时更新 `lastSelectedFontName`
  - [x] 修改 `onSelectionUpdate`：当 `attrs.fontFamily` 不存在时，使用 `lastSelectedFontName` 而非重置为系统默认
  - [x] 确保初始状态 `lastSelectedFontName` 为系统默认

- [x] Task 2: 构建验证
  - [x] 运行 `npm run build` 确保构建成功