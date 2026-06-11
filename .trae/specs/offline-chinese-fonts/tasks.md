# 离线中文字体库 - Tasks

## [x] Task 1: 调研并整理多源中文字体清单
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 调研可用的中文字体源：Google Fonts、jsDelivr Fontsource、cdncjk、字体家、有字库等
  - 对每个字体的 URL 进行 HTTP 200 验证
  - 整理出至少 120 个真实可用的中文字体 URL 列表
- **Acceptance Criteria Addressed**: ADDED-多字体来源支持, ADDED-中文字体数量 ≥ 120
- **Test Requirements**:
  - `programmatic` TR-1.1: 整理出 ≥ 120 个真实可用的中文字体 URL
  - `programmatic` TR-1.2: 至少 3 个不同的字体来源

## [x] Task 2: 扩展 FontData 接口支持多源
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 修改 `src/data/fonts.ts` 中的 FontData 接口
  - 增加 `sources` 字段（数组），每个元素包含 type 和 url
  - 保持 `googleFontName` 字段向后兼容（标记为 deprecated 或保留用于兼容）
- **Acceptance Criteria Addressed**: MODIFIED-FontData 接口扩展
- **Test Requirements**:
  - `programmatic` TR-2.1: FontData.sources 字段存在且为数组
  - `programmatic` TR-2.2: fonts.ts 仍可编译

## [x] Task 3: 实现多源字体数据填充
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 为每个 FontData 条目填充 sources 字段
  - 优先使用 jsDelivr 源（速度快、稳定）
  - 备用 Google Fonts 源
  - 部分字体使用直链 URL（如 OPPO Sans、阿里巴巴普惠体）
- **Acceptance Criteria Addressed**: ADDED-中文字体数量 ≥ 120, ADDED-多字体来源支持
- **Test Requirements**:
  - `programmatic` TR-3.1: 中文字体条目数 ≥ 120
  - `programmatic` TR-3.2: 每个条目都有至少 1 个有效的 source URL
  - `programmatic` TR-3.3: 至少 3 个不同的 source.type

## [x] Task 4: 实现字体本地下载与缓存
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 在 `src/utils/fontLoader.ts` 中实现：
    - `downloadFont(url)`: 下载字体文件并存储到 IndexedDB
    - `loadLocalFont(name)`: 从 IndexedDB 加载字体
    - `getCachedFont(name)`: 检查字体是否已缓存
  - 使用 IndexedDB 存储字体 ArrayBuffer
  - 下载完成后通过 `@font-face` 注册到页面
- **Acceptance Criteria Addressed**: ADDED-字体本地下载与缓存
- **Test Requirements**:
  - `programmatic` TR-4.1: 首次下载后，IndexedDB 中存在字体记录
  - `programmatic` TR-4.2: 第二次加载时，不发起网络请求（从 IndexedDB 读取）
  - `human-judgement` TR-4.3: 离线状态下，已下载的字体能正常渲染

## [x] Task 5: 实现字体实时预览
- **Priority**: P1
- **Depends On**: Task 4
- **Description**:
  - 修改 FontSelector 组件
  - 每个字体选项使用该字体的 family 渲染样本文本（"天地玄黄，宇宙洪荒"）
  - 在悬停/聚焦时显示预览
  - 选中字体后编辑器立即应用
- **Acceptance Criteria Addressed**: ADDED-字体实时预览
- **Test Requirements**:
  - `programmatic` TR-5.1: 字体选择器中每个选项使用对应 font-family 渲染
  - `human-judgement` TR-5.2: 选中字体后编辑器立即应用该字体

## [x] Task 6: 验证项目构建和部署
- **Priority**: P1
- **Depends On**: Task 5
- **Description**:
  - 运行 npm run build 验证项目能正常构建
  - 启动开发服务器验证字体选择器功能正常
  - 验证离线功能（断开网络后字体仍能渲染）
- **Acceptance Criteria Addressed**: ADDED-字体本地下载与缓存
- **Test Requirements**:
  - `programmatic` TR-6.1: npm run build 无错误
  - `programmatic` TR-6.2: 开发服务器正常启动
  - `human-judgement` TR-6.3: 离线时已下载的字体能正常渲染

# Task Dependencies
- Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6
