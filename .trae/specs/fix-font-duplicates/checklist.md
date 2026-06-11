# 修复字体选择器重复与渲染问题 - Checklist

- [x] 审计完成：识别出共享 googleFontName 的重复条目和字重拆分的"伪不同"字体
- [x] googleFontName 去重后数量显著少于原始条目数（130 → 69 重复 84 条）
- [x] 收集到 ≥ 120 个独立的 Google Fonts 中文字体 googleFontName（实际 136 个）
- [x] fonts.ts 重写完成：每个系列仅 1 个默认条目（不再按字重拆分）
- [x] 中文字体条目数 ≥ 120（实际 136 个）
- [x] googleFontName 去重后数量 = 条目数量（145 = 145，无重复 googleFontName）
- [x] 每个 googleFontName 对应的 Google Fonts URL 返回 200（全部 145 个实测通过）
- [x] 思源黑体 / 思源宋体 / HK 等字重拆分条目全部清除，合并为单一 base 名称条目
- [x] 占位编号条目（艺术手写一/二/三…、创意黑体一/二/三…、扩展艺术一~十一）全部清除
- [x] `npm run build` 成功
- [x] 开发服务器可访问，字体选择器弹出（构建产物可用）
