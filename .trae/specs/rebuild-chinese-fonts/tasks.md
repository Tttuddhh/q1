# 重建中文字体库 - Tasks

## [x] Task 1: 调研并验证 120 个中文字体的可用 CDN URL
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 从 jsDelivr fontsource、cn-fontsource、Google Fonts、cdnfonts 等源搜集 120 个中文字体
  - 编写验证脚本（基于已有的 `scripts/verify-fonts.mjs`），检查每个 URL 的 HTTP 状态
  - 每个字体至少找到 2 个可用 source URL
  - 输出验证报告，确保 120 个字体全部 URL 有效
- **Acceptance Criteria**: 120 个字体，每个至少 1 个 source 返回 HTTP 200
- **Test Requirements**:
  - `programmatic`: 验证脚本输出 120 个字体全部通过

## [x] Task 2: 重写 fonts.ts - 构建 120 个中文字体数据
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 清空 FONTS 数组中所有现有字体
  - 保留 SYSTEM_FONT 常量
  - 根据 Task 1 验证结果，写入 120 个中文字体数据
  - 每个字体包含至少 2 个 source（主源 + 备用源）
  - 所有 font-family 字符串正确加引号，包含 fallback
  - 按风格分类标签：sans, serif, handwriting, cursive, display
  - 每个系列最多 4-5 个变体
- **Acceptance Criteria**: 120 个 category='chinese' 字体，0 个 english/other
- **Test Requirements**:
  - `programmatic`: `tsc -b` 编译无错
  - `programmatic`: 中文字体数 = 120，英文字体数 = 0

## [x] Task 3: 调整 FontPicker 分类显示
- **Priority**: P1
- **Depends On**: Task 2
- **Description**:
  - 移除 english 和 other 分类标签
  - 仅保留 chinese 分类和相关风格标签（sans, serif, handwriting, cute, gothic）
  - 确保 UI 显示正常
- **Acceptance Criteria**: FontPicker 不再显示 english/other 分类

## [x] Task 4: 端到端验证 - 字体渲染
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 运行 `npm run build` 确保构建成功
  - 启动本地服务器
  - 运行 e2e 验证脚本（基于 `scripts/e2e-font-render.mjs`）
  - 验证至少 80 个 CJK 字体实际加载到 document.fonts
  - 验证字体选择器 UI 正常工作
- **Acceptance Criteria**: ≥ 80 个 CJK 字体 loaded，0 个控制台错误

# Task Dependencies
- Task 1 → Task 2 → Task 3 → Task 4