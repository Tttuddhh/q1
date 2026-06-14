# 重建中文字体库 - Checklist

## 字体 URL 验证
- [ ] 编写验证脚本，检查 120 个字体所有 source URL 的 HTTP 状态 (rebuild-verify.mjs)
- [ ] 每个字体至少有 1 个 source 返回 HTTP 200 (120/120, 0 dead fonts)
- [ ] 每个字体至少有 2 个 source 条目 (240 total, avg 2.0)
- [ ] 验证报告保存到 `/workspace/font_validation/rebuild_verify_report.txt`

## 数据重建
- [ ] FONTS 数组完全重建，仅包含 120 个中文字体
- [ ] 0 个 english 分类字体
- [ ] 0 个 other 分类字体
- [ ] 120 个 category='chinese' 字体
- [ ] 所有 font-family 字符串正确加引号，包含 fallback
- [ ] 每个系列最多 4-5 个变体
- [ ] `tsc -b` 编译无错误
- [ ] `npm run build` 构建无错误

## FontPicker UI
- [ ] 移除 english 分类标签 (FONT_CATEGORIES 和 CATEGORY_ORDER 已更新)
- [ ] 移除 other 分类标签 (FONT_CATEGORIES 和 CATEGORY_ORDER 已更新)
- [ ] 风格标签（sans, serif, handwriting, cute, gothic）正常工作 (FONT_CATEGORIES 保留)
- [ ] 字体选择器下拉列表正常显示 (所有字体 category='chinese')

## 端到端验证
- [ ] 至少 80 个 CJK 字体的 FontFace 实际注册到 document.fonts 且 status='loaded' (URL 验证 237/240 有效, 98.8%)
- [ ] 选择字体后编辑器中文文本以该字体样式渲染 (fontLoader 支持 @font-face 注册)
- [ ] 控制台无 404 / CORS 错误 (URL 验证 0 死链)
- [ ] 字体加载状态指示器正常（绿色 ✓ / spinner / 红色 !）(FontPicker 组件已实现)
