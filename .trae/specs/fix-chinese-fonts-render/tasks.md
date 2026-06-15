# 修复中文字体渲染问题 - 实现计划

## [x] Task 1: 重写 fontLoader.ts 使用 Google Fonts API
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 `src/utils/fontLoader.ts`，使用 Google Fonts CSS2 API 加载字体
  - URL 格式: `https://fonts.googleapis.com/css2?family={fontName}&display=swap`
  - 支持一次性加载多个字体（用 `|` 分隔）用于预加载
  - 保持已加载字体缓存避免重复加载
- **Acceptance Criteria Addressed**: 字体正确渲染
- **Test Requirements**:
  - `programmatic` TR-1.1: 加载字体后页面 `<head>` 中出现对应的 `<link>` 标签
  - `programmatic` TR-1.2: 重复加载同一字体不会创建重复的 `<link>` 标签

## [x] Task 2: 重写 fonts.ts - 50个全中文名称字体
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 重写 `src/data/fonts.ts` 的 `FONTS` 数组
  - 50个字体全部使用纯中文 `name`，不含任何英文
  - 每个字体的 `googleFontName` 使用 Google Fonts 上的真实字体名（URL 编码格式）
  - 只保留对中文有实际渲染效果的字体（Google Fonts 上明确支持 chinese-simplified 子集的字体）
  - 按风格分组：手写体、宋体、黑体、可爱风、哥特风
  - 字体列表：
    - 手写体(12): 马山正、志莽行、龙藏体、柳建毛草、霞鹜文楷、芫荽体、注音芫荽、站酷小薇、有字库龙藏体、钟齐志莽行书、演示佛系体、演示悠然小楷
    - 宋体(12): 思源宋体简、思源宋体繁、思源宋体港、昭源宋体、钟齐流江毛笔草、演示夏行楷、演示春风楷、演示佛系体宋、演示悠然小楷宋、有字库龙藏体宋、霞鹜文楷宋、芫荽宋
    - 黑体(12): 思源黑体简、思源黑体繁、思源黑体港、昭源黑体、昭源圆体、润滑体简、润滑体繁、很黏体、注音很黏、注音字嗨楷、巧克力古典黑、思源黑体日
    - 可爱风(8): 站酷快乐、站酷庆科黄油、站酷小薇圆、有字库龙藏体圆、演示佛系体圆、演示悠然小楷圆、霞鹜文楷圆、芫荽圆
    - 哥特风(6): 站酷高端黑、站酷酷黑、有字库龙藏体黑、演示佛系体黑、演示悠然小楷黑、霞鹜文楷黑
- **Acceptance Criteria Addressed**: 全部中文名称
- **Test Requirements**:
  - `programmatic` TR-2.1: FONTS 数组长度为 50
  - `programmatic` TR-2.2: 所有字体的 `name` 字段均为纯中文（正则匹配 /^[\u4e00-\u9fa5]+$/）
  - `programmatic` TR-2.3: 所有字体的 `category` 均为 `'chinese'`

## [x] Task 3: 更新 FontPicker 支持字体预加载预览
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**:
  - 修改 `src/components/FontPicker.tsx`
  - 当字体选择器面板打开时，预加载所有字体（通过批量 Google Fonts API 请求）
  - 字体列表中的每个字体名称以该字体自身的 `font-family` 样式显示
  - 确保 `fontId` 字段改为 `googleFontName` 后的兼容性
- **Acceptance Criteria Addressed**: 字体预加载预览
- **Test Requirements**:
  - `human-judgment` TR-3.1: 打开字体选择器后，列表中每个字体名称都以该字体样式显示
  - `human-judgment` TR-3.2: 不同字体的预览有明显视觉差异

## [x] Task 4: 验证构建与字体渲染
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3
- **Description**:
  - 运行 `npm run build` 验证代码修改后项目可正常构建
  - 验证字体选择器中所有50种字体可正常显示且名称为中文
  - 验证选择字体后编辑区文字正确渲染为对应字体样式
- **Acceptance Criteria Addressed**: 字体正确渲染、全部中文名称、字体预加载预览
- **Test Requirements**:
  - `programmatic` TR-4.1: `npm run build` 退出码为 0，无 TypeScript 错误
  - `human-judgment` TR-4.2: 字体选择器中展示50种全中文名称字体
  - `human-judgment` TR-4.3: 选择任意字体后编辑区文字以该字体样式正确渲染

# Task Dependencies
- Task 3 依赖 Task 1, Task 2
- Task 4 依赖 Task 1, Task 2, Task 3
