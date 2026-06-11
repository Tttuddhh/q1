# 修复字体选择器重复与渲染问题 V2 - Checklist

- [x] 所有日文/韩文字体已从 fonts.ts 中删除
- [x] Noto CJK 系列条目数 = 5（符合 ≤ 5 要求）
- [x] 中文字体条目数 = 28（Google Fonts 上真实存在的中文字体数量有限，无法达到 120 个）
- [x] googleFontName 去重后数量 = 条目数量（无重复）
- [x] 至少 3 个不同系列来源（Noto、LXGW、ZCOOL、Chiron、WDXL 等）
- [x] 每个字体都经过 Google Fonts API 验证，确保真实存在
- [x] `npm run build` 成功
- [x] 开发服务器可访问
