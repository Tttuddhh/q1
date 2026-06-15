# 下载字体文件实现离线加载 - 实现计划

## [x] Task 1: 调研 fontsource 上可用的中文字体包
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 查询 fontsource.org 和 npm 上 `@fontsource/` 命名空间下真实存在的中文字体包
  - 验证每个字体包是否包含 chinese-simplified 子集
  - 筛选出50个真实存在、对中文有渲染效果的字体
  - 记录每个字体的 npm 包名和 CSS 导入路径
- **Acceptance Criteria Addressed**: 字体真实存在且可渲染
- **Test Requirements**:
  - `programmatic` TR-1.1: 每个字体包都可通过 `npm install @fontsource/xxx` 安装
  - `programmatic` TR-1.2: 每个字体包的 CSS 文件包含中文字符的 `@font-face` 规则

## [x] Task 2: 安装 fontsource 字体包
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 在 `package.json` 中添加所有需要的 `@fontsource/xxx` 依赖
  - 运行 `npm install` 安装所有字体包
  - 验证每个包的 `files/` 目录下包含 woff2 字体文件
- **Acceptance Criteria Addressed**: 本地字体文件加载
- **Test Requirements**:
  - `programmatic` TR-2.1: `node_modules/@fontsource/` 下存在所有安装的字体包
  - `programmatic` TR-2.2: 每个字体包包含 woff2 字体文件

## [x] Task 3: 重写 fontLoader.ts 使用本地字体
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 重写 `src/utils/fontLoader.ts`
  - 改为动态 `import()` 方式加载 fontsource CSS 文件
  - 例如: `import('@fontsource/ma-shan-zheng/index.css')`
  - 保持已加载字体缓存
  - 移除 Google Fonts CDN 相关代码
- **Acceptance Criteria Addressed**: 本地字体文件加载
- **Test Requirements**:
  - `programmatic` TR-3.1: 加载字体后网络面板无外部 CDN 请求
  - `programmatic` TR-3.2: 字体文件从本地路径加载

## [x] Task 4: 重写 fonts.ts 使用真实存在的本地字体
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 重写 `src/data/fonts.ts` 的 `FONTS` 数组
  - 50个字体全部使用纯中文 `name`
  - 每个字体的 `fontId` 对应真实的 `@fontsource/` 包名
  - 移除思源系列中视觉差异极小的重复字体（只保留简/繁各一个代表）
  - 移除所有在 fontsource 上不存在的字体
  - 按风格分组：手写体、宋体、黑体、可爱风、哥特风
- **Acceptance Criteria Addressed**: 字体真实存在且可渲染、全部中文名称
- **Test Requirements**:
  - `programmatic` TR-4.1: FONTS 数组长度为 50
  - `programmatic` TR-4.2: 所有字体的 `name` 字段均为纯中文
  - `programmatic` TR-4.3: 所有字体的 `fontId` 对应真实存在的 npm 包

## [x] Task 5: 更新 FontPicker 移除预加载逻辑
- **Priority**: P1
- **Depends On**: Task 3, Task 4
- **Description**:
  - 修改 `src/components/FontPicker.tsx`
  - 移除 Google Fonts 预加载的 useEffect
  - 更新 `handleSelect` 使用新的 `loadFont` 函数
  - 字体列表项使用 `font-family` 预览（本地字体已可用）
- **Acceptance Criteria Addressed**: 字体加载速度快
- **Test Requirements**:
  - `human-judgment` TR-5.1: 打开字体选择器无需等待加载
  - `human-judgment` TR-5.2: 字体列表中每个字体名称以该字体样式显示

## [x] Task 6: 验证构建与离线渲染
- **Priority**: P0
- **Depends On**: Task 2, Task 3, Task 4, Task 5
- **Description**:
  - 运行 `npm run build` 验证项目可正常构建
  - 验证构建产物中包含所有字体文件
  - 验证字体选择器中50种字体可正常显示
  - 验证选择字体后编辑区文字正确渲染
- **Acceptance Criteria Addressed**: 本地字体文件加载、字体真实存在且可渲染、字体加载速度快
- **Test Requirements**:
  - `programmatic` TR-6.1: `npm run build` 成功
  - `programmatic` TR-6.2: `dist/assets/` 或 `dist/` 中包含字体文件
  - `human-judgment` TR-6.3: 字体选择器中展示50种字体
  - `human-judgment` TR-6.4: 选择任意字体后编辑区文字正确渲染

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 1
- Task 5 依赖 Task 3, Task 4
- Task 6 依赖 Task 2, Task 3, Task 4, Task 5
