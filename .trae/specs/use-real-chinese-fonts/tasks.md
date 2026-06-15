# Tasks

- [x] Task 1: 重写字体数据为50个真实中文字体
  - [x] 删除 `src/data/fonts.ts` 中所有虚构字体
  - [x] 精选50个真实存在于 Google Fonts 的中文字体
  - [x] 字体来源多样化：思源、站酷真实字体、手写体、霞鹜、其他
  - [x] 每个字体设置正确的 `name`、`displayName`（中文）、`family`、`googleFontName`、`category`、`tags`
  - [x] 确保所有 `googleFontName` 真实存在于 Google Fonts

- [x] Task 2: 构建验证
  - [x] 运行 `npm run build` 确保构建成功
  - [x] 验证字体数量为50个
  - [x] 验证字体来源多样化（站酷占比不超过30%）

# Task Dependencies
- Task 2 depends on Task 1
