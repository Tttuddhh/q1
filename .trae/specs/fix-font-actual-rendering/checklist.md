# 字体实际加载与渲染修复 - Checklist

## 自验收脚本
- [x] 创建 `scripts/e2e-font-render.mjs` 端到端验证脚本
- [x] 脚本能成功运行
- [x] 脚本能输出 `document.fonts.size` 和失败 URL 列表
- [x] 脚本能截图保存到 `/workspace/screenshots/e2e_*.png`
- [x] 每个 Task 完成后自动调用此脚本进行自验收

## URL 验证
- [x] 创建 `scripts/verify-fonts.mjs` 验证脚本
- [x] 脚本能成功运行并输出报告
- [x] fonts.ts 中每个 source URL 都被 HTTP 200 验证

## 数据清理
- [x] 删除所有 source URL 全部失败的字体（"假"字体）— 0 dead fonts
- [x] 删除演示系列假字体（演示夏行楷、演示春风）
- [x] 删除庞门正道系列（庞门正道、庞门正道标题体、庞门正道粗体、庞门正道轻松体、庞门正道卡通体）
- [x] 删除优设标题黑、优设鲨鱼菲特
- [x] 删除京东、道里、仓耳鱼、字魂等无公开 CDN 的字体
- [x] 删除 AZPPT、汉仪软圆、齐伋体、繁体、标合体、迪北、沐瑶、抖音美好体、斗鱼追光体等
- [x] 注: 演示秋鸿/悠然/佛系体通过 cn-fontsource 找到可用源，已保留

## 系列变体数限制
- [x] 思源黑体 ≤ 5 个 (SC, TC, HK, JP, KR)
- [x] 思源宋体 ≤ 5 个 (SC, TC, HK, JP, KR)
- [x] 霞鹜文楷 ≤ 5 个 (4 个: TC, 屏幕版, 屏幕版 R, 等宽 TC)
- [x] 悠哉 ≤ 5 个 (4 个: 常规, 粗体, 细体, 中等)
- [x] 方正 ≤ 5 个 (5 个: 楷体, 书宋, 仿宋, 黑体, 甲骨文)
- [x] 975 圆体 ≤ 5 个 (4 个: 粗体, 中等正体, 圆体, X12Y16 Monica)
- [x] 霞鹜系列其他子系列 (新晰黑, 致宋, 马克哥特) ≤ 5

## CSS 字符串修复
- [x] 所有 family 字符串用引号包裹（如 `"Noto Sans SC", sans-serif`）
- [x] 所有 family 字符串通过 CSS 解析验证

## 验证报告 (基于 verify-fonts.mjs)
- [x] 总字体: 132 个（123 中文 + 9 英文）
- [x] 总 URL: 207 个, 全部有效 (100%)
- [x] 无可用 source 的字体: 0
- [x] 中文字体 ≥ 100 个要求: 123 ✓
- [x] 中文字体 ≥ 120 个要求: 123 ✓
- [x] 每个系列变体数 ≤ 5
- [x] 验证报告保存到 /workspace/font_validation/verify_report.txt

## fontLoader 修复
- [x] `loadAndRegisterFont` 在 source 失败时返回 `false` (verify_font 验证)
- [x] `loadAndRegisterFont` 在 source 成功时返回 `true` (verify_font 验证)
- [x] 成功判定基于 `document.fonts.check()` 或 `document.fonts.load()` (`verifyFontRegistered` 函数实现)
- [x] 额外修复: `extractFontFromCss` 中相对 URL 基于 cssUrl 解析, 避免 fetch 回到 document base

## FontPicker UI 修复
- [x] 失败字体显示红色感叹号 "!"（不是绿色对勾）— 由 `loadAndRegisterFont` 实际返回值驱动
- [x] 加载中显示 spinner
- [x] 成功显示绿色对勾 ✓

## 端到端验证
- [x] `npm run build` 无错误
- [x] Playwright 自验收脚本能成功进入编辑模式
- [x] 字体选择器能打开
- [x] **至少 50 个 CJK 字体的 FontFace 实际注册成功**（自验收脚本验证: 57 个）
- [x] 选择某个字体后，编辑器中的中文文本以该字体样式渲染（verify-font-apply.mjs 截图对比: 思源黑体SC, 霞鹜文楷）
- [x] 截图前后对比正常
- [x] 控制台无 404 / CORS 错误 (0 失败请求, 0 控制台错误)

## 用户验收（agent 自验，不要求用户介入）
- [x] 字体选择器中所有字体都是真实可用的（verify-fonts.mjs 验证: 207/207 URL 有效）
- [x] 每个字体系列的变体数 ≤ 5（verify-fonts.mjs 验证）
- [x] 选择字体后，输入中文能以该字体的实际样式渲染（verify-font-apply.mjs 验证: document.fonts 包含 "Noto Sans SC" status:loaded, 编辑器 font-family 包含 "Noto Sans SC"）
- [x] 失败的字体显示 "!"，不显示绿色对勾（由 `loadAndRegisterFont` 实际返回值驱动）
