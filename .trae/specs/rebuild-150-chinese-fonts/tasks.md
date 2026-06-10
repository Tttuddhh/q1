# 重建150个中文字体选择器 - 实施计划

## Task 1: 调研并收集150个中文字体源
- **Priority**: P0
- **Depends On**: None
- **Description**:
  从多个渠道收集150个真实可用的中文字体，不局限于单一字体库：
  
  **渠道1: @chinese-fonts npm 包**（已验证68个包可用）
  - 使用 jsDelivr CDN: https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{variant}/result.css
  
  **渠道2: Google Fonts 中文字体**（约15个）
  - Noto Sans SC/TC/HK, Noto Serif SC/TC/HK
  - ZCOOL 系列: KuaiLe, XiaoWei, QingKe HuangYou
  - Ma Shan Zheng, Zhi Mang Xing, Liu Jian Mao Cao, Long Cang
  - LXGW Marker Gothic, LXGW WenKai TC
  
  **渠道3: @chinese-fonts 多字重变体**
  - 从有多个字重的包中提取不同字重作为独立字体
  - 如 LXGW WenKai Regular/Light/Medium 算3个不同字体
  
  **渠道4: 其他开源中文字体库**（如不可用则跳过，不硬磕）
  - 阿里妈妈字体: https://www.alibabafonts.com/
  - 站酷字体: https://www.zcool.com.cn/special/zcoolfonts/
  - 100font: https://www.100font.com/
  - 字由: https://www.hellofont.cn/
  - 华为字体: HarmonyOS Sans
  - OPPO 字体: OPPO Sans
  - MiSans 等
  
  每个字体需要：name, family, cssUrl/googleFontName, displayName, previewText, category(风格分类)
  
  风格分类包括：黑体(sans-serif)、宋体(serif)、楷体(kai)、行书(running)、草书(cursive)、隶书(clerical)、篆书(seal)、手写(handwriting)、像素(pixel)、艺术(artistic)、圆体(rounded)、仿宋(fangsong)、明体(mincho)、卡通(cartoon)、复古(vintage)
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - `programmatic` TR-1.1: 字体列表长度 === 150
  - `programmatic` TR-1.2: 所有字体都有有效的 cssUrl 或 googleFontName
  - `human-judgment` TR-1.3: 字体风格覆盖至少10个不同分类
- **Notes**: 从 font_details.json 中提取可用字体，每个包取一个主要变体，多字重包取不同字重作为独立字体。如果某个字体库不可用，立即跳过寻找其他来源。

## Task 2: 批量验证150个字体可渲染性
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  使用 Playwright 编写自动化测试脚本，对150个字体逐一验证：
  1. 注入字体CSS
  2. 等待CSS加载完成
  3. 使用 document.fonts.load() 触发字体下载
  4. 使用 Canvas 绘制文本，对比系统字体和该字体的像素差异
  5. 记录通过/失败的字体
  
  失败的字体需要从列表中移除并替换为备选字体，直到凑齐150个通过验证的字体。
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-2.1: 每个字体通过 Canvas 像素差异检测（diff > 50像素）
  - `programmatic` TR-2.2: 每个字体通过 document.fonts.check() 验证
  - `programmatic` TR-2.3: 最终列表中150个字体全部通过验证
- **Notes**: 测试脚本保存为 verify-150-fonts.mjs

## Task 3: 重写 fonts.ts 字体数据文件
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  基于验证通过的150个字体，重写 src/data/fonts.ts：
  1. 删除所有现有字体定义
  2. 添加150个验证通过的中文字体
  3. 每个字体包含：name, family, cssUrl/googleFontName, displayName, previewText, category, tags
  4. 确保 family 字段与 CSS 中 @font-face 定义的 font-family 完全一致
  5. 添加风格分类标签，便于按分类展示
  6. 保留 SYSTEM_FONT 作为默认选项
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - `programmatic` TR-3.1: FONTS.length === 150
  - `programmatic` TR-3.2: 所有字体都有有效的 cssUrl 或 googleFontName
  - `programmatic` TR-3.3: 无重复的 name 或 displayName
- **Notes**: 使用 jsDelivr CDN 格式： https://cdn.jsdelivr.net/npm/@chinese-fonts/{pkg}@latest/dist/{variant}/result.css

## Task 4: 优化 fontLoader.ts 字体加载器
- **Priority**: P0
- **Depends On**: None
- **Description**:
  优化字体加载逻辑以支持150个字体：
  1. 预加载改为并发+分批策略（每批10个并发，避免浏览器连接限制）
  2. 添加字体加载超时处理（单个字体10秒超时）
  3. 添加加载失败重试机制（最多2次重试）
  4. 优化 waitForFontReady 使用 document.fonts.load() 主动触发下载
  5. 添加加载进度回调，供UI显示加载状态
- **Acceptance Criteria Addressed**: AC-2, NFR-1
- **Test Requirements**:
  - `programmatic` TR-4.1: 150个字体在3秒内完成预加载
  - `programmatic` TR-4.2: 加载失败率 < 5%
- **Notes**: 浏览器通常限制同域名并发连接数为6，需要控制并发数

## Task 5: 优化 FontPicker.tsx 字体选择器UI
- **Priority**: P0
- **Depends On**: Task 3, Task 4
- **Description**:
  优化字体选择器以支持150个字体：
  1. 添加虚拟滚动（react-window 或自定义实现），避免150个DOM节点同时渲染
  2. 字体项使用 font-family 渲染预览，字号18px
  3. 添加风格分类筛选标签（黑体/宋体/楷体/手写等）
  4. 搜索框支持按名称、拼音、风格搜索
  5. 选中状态正确显示（currentFont 匹配 name 或 displayName）
  6. 添加加载进度指示器（预加载时显示"加载中..."）
  7. 打开选择器时自动聚焦搜索框
- **Acceptance Criteria Addressed**: AC-3, AC-5, NFR-2
- **Test Requirements**:
  - `programmatic` TR-5.1: 选择器打开后滚动流畅（60fps）
  - `programmatic` TR-5.2: 搜索过滤响应时间 < 100ms
  - `human-judgment` TR-5.3: 字体预览清晰可辨
- **Notes**: 虚拟滚动是关键，150个字体项同时渲染会导致卡顿

## Task 6: 修复 RichTextEditor.tsx 字体应用逻辑
- **Priority**: P0
- **Depends On**: Task 4
- **Description**:
  修复编辑器中字体应用逻辑：
  1. 选择字体时先调用 loadFontAsync 等待字体加载完成
  2. 字体加载完成后执行 editor.chain().setFontFamily(font.family).run()
  3. 更新 currentFontName 状态
  4. 使用 editorRef 确保异步回调中拿到最新 editor 实例
  5. 处理系统默认字体（unsetFontFamily）
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-6.1: 选择字体后编辑器文本正确应用该字体
  - `human-judgment` TR-6.2: 字体切换流畅，无明显延迟

## Task 7: 实现字体下载和离线使用
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  实现字体文件下载到本地，支持离线使用：
  1. 创建 scripts/download-fonts.mjs 脚本
  2. 脚本读取 fonts.ts 中的字体列表
  3. 对每个字体的 cssUrl：
     - 下载 result.css 到 public/fonts/{pkg}/result.css
     - 解析 CSS 中的 @font-face src url()
     - 下载所有字体文件（woff2/ttf）到 public/fonts/{pkg}/
     - 重写 CSS 中的路径为相对路径
  4. 对 Google Fonts：
     - 下载 CSS 文件
     - 解析并下载所有字体文件
  5. 修改 fonts.ts 中的 cssUrl 指向本地路径
  6. 在 package.json 中添加 "download-fonts" 脚本
  7. 构建前自动执行字体下载
- **Acceptance Criteria Addressed**: FR-7, FR-8
- **Test Requirements**:
  - `programmatic` TR-7.1: public/fonts/ 目录包含所有字体CSS和字体文件
  - `programmatic` TR-7.2: 断开网络后字体仍能正常渲染
  - `programmatic` TR-7.3: 本地CSS路径正确，无404错误

## Task 8: 构建并验证
- **Priority**: P0
- **Depends On**: Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**:
  1. 运行 npm run download-fonts 下载所有字体
  2. 运行 npm run build 确保无 TypeScript 错误
  3. 启动开发服务器
  4. 手动验证字体选择器功能
  5. 验证150个字体全部显示且可渲染
  6. 验证字体应用功能正常
  7. 验证离线模式下字体正常渲染
- **Acceptance Criteria Addressed**: NFR-3
- **Test Requirements**:
  - `programmatic` TR-8.1: npm run build 成功，无错误
  - `human-judgment` TR-8.2: 字体选择器UI正常，所有字体可渲染
  - `programmatic` TR-8.3: 离线模式下字体正常渲染
