# 字体实际加载与渲染修复 - Tasks

## [ ] Task 1: 创建字体 URL 验证脚本
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `scripts/verify-fonts.mjs`，使用 fetch 检查 `fonts.ts` 中每个 source URL
  - 对 CSS URL 检查返回内容是否包含 `@font-face`
  - 对直链 URL 检查 Content-Type 是否为 font 格式
  - 输出报告：每个字体的所有 source URL 的 HTTP 状态码和验证结果
- **Acceptance Criteria Addressed**: ADDED-端到端验证
- **Test Requirements**:
  - `programmatic` TR-1.1: 脚本能成功运行
  - `programmatic` TR-1.2: 输出 175+ 字体 × 多个 source 的验证结果

## [ ] Task 2: 重写 fonts.ts - 删除假字体
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 根据 Task 1 的验证结果，删除所有 source 全部失败的字体
  - 删除"演示系列"、"庞门正道系列"、"优设标题黑"、"仓耳鱼"、"字魂"等公开 CDN 不存在的字体
  - 删除京东、道里、东方大楷、AZPPT 等伪造字体
- **Acceptance Criteria Addressed**: REMOVED-删除的"假"字体
- **Test Requirements**:
  - `programmatic` TR-2.1: 中文字体条目数 ≥ 100
  - `programmatic` TR-2.2: 每个条目的所有 source URL 都通过 HTTP 200 验证

## [ ] Task 3: 重写 fonts.ts - 限制系列变体数
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 思源黑体: 保留 5 个（SC、TC、HK、CN、JP）
  - 思源宋体: 保留 5 个
  - 鸿雷板书: 保留 2 个
  - 阿里普惠体: 保留 2 个
  - 鸿蒙 Sans: 保留 2 个
  - MiSans: 保留 2 个
  - 悠哉: 保留 3 个
  - 霞鹜文楷: 保留 5 个
  - 演示系列: 删除
  - 其他系列按 4-5 个上限
- **Acceptance Criteria Addressed**: ADDED-每个系列最多 4-5 个字体变体
- **Test Requirements**:
  - `programmatic` TR-3.1: 思源黑体 ≤ 5 个
  - `programmatic` TR-3.2: 思源宋体 ≤ 5 个

## [ ] Task 4: 修复 font-family CSS 字符串
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 检查所有 `FontData.family` 字符串
  - 修复缺引号问题（如 `JiangXiZhuoKai, JXZhuoKai, cursive` → `"JiangXiZhuoKai", "JXZhuoKai", cursive`）
  - 修复中文字体名引号问题（如 `HongLeiShuBanJianTi, HouLiBanShuJianTi` → `"HongLeiShuBanJianTi", "HouLiBanShuJianTi"`）
- **Acceptance Criteria Addressed**: ADDED-CSS font-family 字符串格式正确
- **Test Requirements**:
  - `programmatic` TR-4.1: 所有 family 字符串通过 CSS 解析验证
  - `programmatic` TR-4.2: fonts.ts 编译无错

## [ ] Task 5: 修复 fontLoader.loadAndRegisterFont 成功判定
- **Priority**: P0
- **Depends On**: Task 4
- **Description**:
  - 当前 `loadAndRegisterFont` 在 source 列表尝试后即返回 `true`，不验证实际注册
  - 修复：调用 `registerFontFace` 后，使用 `document.fonts.load()` API 验证字体可用
  - 验证失败返回 `false`
  - 验证通过才返回 `true`
- **Acceptance Criteria Addressed**: MODIFIED-loadAndRegisterFont 返回值语义
- **Test Requirements**:
  - `programmatic` TR-5.1: 失败的 source URL 不会让 `loadAndRegisterFont` 返回 `true`
  - `programmatic` TR-5.2: 成功的 source URL 才会返回 `true`

## [ ] Task 6: 修复 FontPicker UI 加载状态显示
- **Priority**: P0
- **Depends On**: Task 5
- **Description**:
  - 增加实际加载状态判定（通过 `document.fonts.check()`）
  - 失败字体显示红色感叹号 "!"（不是绿色对勾）
  - 加载中显示 spinner
  - 成功显示绿色对勾 ✓
- **Acceptance Criteria Addressed**: ADDED-准确的加载状态显示
- **Test Requirements**:
  - `programmatic` TR-6.1: 失败的字体在 UI 中显示 "!"
  - `programmatic` TR-6.2: 成功的字体在 UI 中显示绿色 ✓

## [ ] Task 7: 端到端 Playwright 浏览器验证
- **Priority**: P0
- **Depends On**: Task 6
- **Description**:
  - 创建 `scripts/e2e-font-render.mjs`
  - 进入编辑模式、打开字体选择器
  - 等待 10 秒
  - 统计 `document.fonts` 中实际加载的字体数
  - 至少 50 个中文字体真正可用
  - 截图前后对比
- **Acceptance Criteria Addressed**: ADDED-字体必须真正注册到 document.fonts
- **Test Requirements**:
  - `programmatic` TR-7.1: 至少 50 个中文字体的 FontFace 实际注册成功
  - `programmatic` TR-7.2: 选择某个字体后，编辑器中的中文文本以该字体样式渲染

# Task Dependencies
- Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6 → Task 7
