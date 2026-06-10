# 修复字体选择器预览与分类 - Implementation Tasks

## [x] Task 1: 修复字体预览渲染
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 FontPicker.tsx，确保每个字体名称使用 `font.family` 渲染
  - 当前代码第255-267行虽然设置了 `fontFamily: font.family`，但需要确保 Google Font 在显示前已预加载
  - 在字体列表渲染时，为每个字体项预加载对应的 Google Font
  - 使用中文预览文本（如字体名本身）替代英文预览文本
- **Acceptance Criteria Addressed**: 字体预览正确渲染
- **Test Requirements**:
  - `human-judgement` TR-1.1: 打开字体选择器后，每个字体名称都应以该字体自身的样式显示，视觉差异明显
  - `programmatic` TR-1.2: 检查每个字体项的 style 中 fontFamily 是否正确设置为对应字体

## [x] Task 2: 精简并修复字体数据
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 重写 src/data/fonts.ts 中的 FONTS 数组
  - 中文字体（category: 'chinese'）：保留 8-12 个风格差异明显的中文字体
    - 无衬线：Noto Sans SC
    - 衬线：Noto Serif SC
    - 手写/书法：Ma Shan Zheng, Zhi Mang Xing, Long Cang, Liu Jian Mao Cao
    - 文艺：LXGW WenKai
    - 可爱：ZCOOL KuaiLe, ZCOOL QingKe HuangYou
    - 粗体/标题：ZCOOL GaoDuanHei
  - 英文字体（category: 'english'）：保留 10-15 个风格差异明显的字体
    - 无衬线：Roboto, Open Sans, Montserrat, Inter
    - 衬线：Playfair Display, Merriweather, Lora
    - 手写：Pacifico, Dancing Script, Caveat
    - 可爱/装饰：Lobster, Comfortaa, Quicksand
    - 等宽：JetBrains Mono
    - 展示：Bebas Neue, Abril Fatface
  - 其他语言字体（category: 'other'）：大幅减少，只保留 5-8 个有代表性的
    - 日文：Noto Sans JP
    - 韩文：Noto Sans KR
    - 阿拉伯：Noto Sans Arabic
    - 其他有特色的：Cinzel (哥特), Permanent Marker (手写), Press Start 2P (像素)
  - 删除所有重复的 ZCOOL XiaoWei 等重复项
  - 删除大量视觉差异极小的 Noto Sans XXX 系列字体（Lao, Georgian, Armenian, Ethiopic, Cherokee, Mongolian, Tibetan, Sinhala, Oriya, Gurmukhi 等）
- **Acceptance Criteria Addressed**: 字体数据精简, 字体分类正确
- **Test Requirements**:
  - `programmatic` TR-2.1: FONTS 数组长度应在 25-35 之间
  - `programmatic` TR-2.2: 所有 category 为 'chinese' 的字体都是真正支持中文的字体
  - `programmatic` TR-2.3: 没有重复 name 的字体
  - `human-judgement` TR-2.4: 字体列表中每个字体视觉上都有明显差异

## [x] Task 3: 优化 Google Fonts 加载
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 src/utils/fontLoader.ts
  - 更新加载 URL 格式为 `https://fonts.googleapis.com/css2?family=${name}:wght@400;700&display=swap`
  - 确保字体加载包含正确的 weight 参数
- **Acceptance Criteria Addressed**: Google Fonts 加载优化
- **Test Requirements**:
  - `programmatic` TR-3.1: 生成的 link href 包含 `:wght@400;700` 参数

## [x] Task 4: 预加载字体列表中的字体
- **Priority**: P1
- **Depends On**: Task 2, Task 3
- **Description**:
  - 在 FontPicker 组件打开时，批量预加载当前分类下的所有字体
  - 或者使用 Intersection Observer / 滚动时按需加载
  - 确保字体在显示到视口前已经加载完成
- **Acceptance Criteria Addressed**: 字体预览正确渲染
- **Test Requirements**:
  - `human-judgement` TR-4.1: 字体选择器打开后，所有字体预览都能正确显示对应样式，无闪烁或回退到默认字体

## [x] Task 5: 构建并验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3, Task 4
- **Description**:
  - 运行 npm run build 确保构建成功
  - 验证字体选择器功能：
    - 打开编辑器字体选择器
    - 确认"中文字体"分类下只有中文字体
    - 确认每个字体名称都用对应字体样式显示
    - 确认字体总数合理（25-35个）
    - 确认选择字体后编辑器文字正确变化
- **Acceptance Criteria Addressed**: All
- **Test Requirements**:
  - `programmatic` TR-5.1: 构建无错误
  - `human-judgement` TR-5.2: 字体选择器 UI 正常，分类正确，预览正确
