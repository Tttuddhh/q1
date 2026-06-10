# Tasks

- [ ] Task 1: 验证当前 fonts.ts 中哪些字体真实存在于 Google Fonts
  - [ ] SubTask 1.1: 用脚本批量查询 Google Fonts API，验证每个 googleFontName 是否有效
  - [ ] SubTask 1.2: 记录所有 404/不存在的字体，标记为需删除
  - [ ] SubTask 1.3: 确认哪些字体支持中文字符（CJK）

- [ ] Task 2: 重写 fonts.ts - 150种真实中文字体
  - [ ] SubTask 2.1: 删除所有不存在的字体条目
  - [ ] SubTask 2.2: 将日文/韩文字体正确归类到 japanese/korean
  - [ ] SubTask 2.3: 从 Google Fonts 中筛选真实存在的 CJK 中文字体，确保 >= 150 种
  - [ ] SubTask 2.4: 为每个中文字体设置正确的中文 displayName
  - [ ] SubTask 2.5: 精简英文字体到 ~20 种，去除重复

- [ ] Task 3: 更新 fontLoader.ts 支持 &text= 参数
  - [ ] SubTask 3.1: 修改 loadFontAsync，自动追加 &text= 参数只加载预览字符
  - [ ] SubTask 3.2: 确保字体加载失败时有降级处理

- [ ] Task 4: 验证 FontPicker.tsx 正确显示中文分类
  - [ ] SubTask 4.1: 确认 chinese 分类只显示中文字体
  - [ ] SubTask 4.2: 确认 japanese/korean 分类正确分离

- [ ] Task 5: 构建和预览验证
  - [ ] SubTask 5.1: npm run build 通过
  - [ ] SubTask 5.2: 预览中打开字体选择器，确认中文字体 >= 150 种且都能渲染

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 2
- Task 5 depends on Task 3, Task 4
