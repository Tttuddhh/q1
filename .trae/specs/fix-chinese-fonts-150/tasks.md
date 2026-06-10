# Tasks

- [ ] Task 1: 调研多个中文字体库的可用字体列表
  - [ ] SubTask 1.1: 查询 Google Fonts 上真实存在的 CJK 中文字体（Noto Sans SC/TC/HK/JP/KR, LXGW WenKai, ZCOOL KuaiLe 等）
  - [ ] SubTask 1.2: 查询 @chinese-fonts (jsDelivr) 上可用的中文字体包列表
  - [ ] SubTask 1.3: 查询 Fontsource CDN 上支持 chinese-simplified 的字体
  - [ ] SubTask 1.4: 研究每个字体库的加载格式和渲染逻辑

- [ ] Task 2: 验证当前 fonts.ts 中哪些字体真实存在
  - [ ] SubTask 2.1: 用脚本批量查询 Google Fonts API，验证每个 googleFontName 是否有效
  - [ ] SubTask 2.2: 记录所有 404/不存在的字体，标记为需删除
  - [ ] SubTask 2.3: 确认哪些字体支持中文字符（CJK）

- [ ] Task 3: 重写 fonts.ts - 整合多来源150种真实中文字体
  - [ ] SubTask 3.1: 删除所有不存在的字体条目
  - [ ] SubTask 3.2: 将日文/韩文字体正确归类到 japanese/korean
  - [ ] SubTask 3.3: 从 Google Fonts 添加真实存在的 CJK 字体
  - [ ] SubTask 3.4: 从 @chinese-fonts CDN 添加中文字体（使用 cssUrl）
  - [ ] SubTask 3.5: 从 Fontsource 添加支持中文的字体
  - [ ] SubTask 3.6: 为每个中文字体设置正确的中文 displayName
  - [ ] SubTask 3.7: 精简英文字体到 ~20 种，去除重复

- [ ] Task 4: 更新 fontLoader.ts 支持多来源加载和 &text= 参数
  - [ ] SubTask 4.1: 修改 loadFontAsync，支持 Google Fonts 的 &text= 参数
  - [ ] SubTask 4.2: 支持 @chinese-fonts 的 CSS 加载方式
  - [ ] SubTask 4.3: 支持 Fontsource 的 @font-face 加载方式
  - [ ] SubTask 4.4: 确保字体加载失败时有降级处理

- [ ] Task 5: 验证 FontPicker.tsx 正确显示中文分类
  - [ ] SubTask 5.1: 确认 chinese 分类只显示中文字体
  - [ ] SubTask 5.2: 确认 japanese/korean 分类正确分离

- [ ] Task 6: 构建和预览验证
  - [ ] SubTask 6.1: npm run build 通过
  - [ ] SubTask 6.2: 预览中打开字体选择器，确认中文字体 >= 150 种且都能渲染

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 3
- Task 6 depends on Task 4, Task 5
