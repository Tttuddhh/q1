# 修复字体选择器 v2 - Implementation Tasks

## [x] Task 1: 重写字体数据文件
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 重写 src/data/fonts.ts 中的 FONTS 数组
  - 中文字体（category: 'chinese'）：
    - preview 字段使用中文（如 "思源黑体"、"马善政毛笔"）
    - 选择 Google Fonts 上确实可用的中文字体
    - 验证每个字体的 googleFontName 在 Google Fonts 上存在
    - 保留：Noto Sans SC (思源黑体)、Noto Serif SC (思源宋体)
    - 手写体：Ma Shan Zheng (马善政毛笔)、Zhi Mang Xing (志莽行)、Long Cang (龙苍)、Liu Jian Mao Cao (柳公权草书)
    - 删除 LXGW WenKai（Google Fonts 上可能不可用或名称不对）
    - 删除所有 ZCOOL 字体（Google Fonts 上可能不可用）
    - 添加：ZCOOL XiaoWei (站酷小薇) -> 如果 Google Fonts 有的话保留，否则删除
  - 英文字体（category: 'english'）：
    - preview 字段使用英文（如 "Roboto"、"Playfair"）
    - 保留：Roboto, Open Sans, Montserrat, Inter, Playfair Display, Merriweather, Lora
    - 手写：Pacifico, Dancing Script, Caveat
    - 可爱：Lobster, Comfortaa, Quicksand
    - 等宽：JetBrains Mono
    - 展示：Bebas Neue, Abril Fatface
  - 其他语言字体（category: 'other'）：
    - preview 字段使用对应语言文本
    - 日文：Noto Sans JP (预览：日本語)
    - 韩文：Noto Sans KR (预览：한국어)
    - 阿拉伯：Noto Sans Arabic (预览：العربية)
    - 哥特：Cinzel (预览：Cinzel)
    - 手写：Permanent Marker (预览：Marker)
    - 像素：Press Start 2P (预览：PIXEL)
  - 确保没有重复字体
  - 总字体数控制在 20-25 个
- **Acceptance Criteria Addressed**: 中文字体使用中文预览, 字体正确渲染
- **Test Requirements**:
  - `programmatic` TR-1.1: 所有 chinese 分类字体的 preview 字段包含中文字符
  - `programmatic` TR-1.2: 没有重复 name 的字体
  - `programmatic` TR-1.3: FONTS 数组长度在 20-25 之间
  - `human-judgement` TR-1.4: 所有字体在 Google Fonts 上真实存在并能加载

## [x] Task 2: 优化字体加载工具
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 src/utils/fontLoader.ts
  - 添加 text 参数，只加载预览需要的字符，大幅减少加载时间
  - URL 格式：`https://fonts.googleapis.com/css2?family=${name}:wght@400;700&text=${encodedText}&display=swap`
  - 提供批量预加载函数，支持传入字体数组
- **Acceptance Criteria Addressed**: 字体正确渲染
- **Test Requirements**:
  - `programmatic` TR-2.1: 生成的 link href 包含 text 参数
  - `programmatic` TR-2.2: 批量预加载函数能正确生成多个 link 标签

## [x] Task 3: 更新字体选择器组件
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**:
  - 修改 FontPicker.tsx
  - 使用批量预加载函数替代单个加载
  - 确保字体项正确显示 preview 字段内容
- **Acceptance Criteria Addressed**: 字体正确渲染
- **Test Requirements**:
  - `human-judgement` TR-3.1: 字体选择器打开后，所有字体预览正确显示

## [x] Task 4: 构建并验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3
- **Description**:
  - 运行 npm run build 确保构建成功
  - 验证：
    - 中文字体分类显示中文预览
    - 英文字体分类显示英文预览
    - 没有重复字体
    - 所有字体都能正确渲染
- **Acceptance Criteria Addressed**: All
- **Test Requirements**:
  - `programmatic` TR-4.1: 构建无错误
  - `human-judgement` TR-4.2: UI 正常，预览正确
