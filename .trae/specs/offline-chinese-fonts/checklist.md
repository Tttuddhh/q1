# 离线中文字体库 - Checklist

- [x] 整理出 ≥ 120 个真实可用的中文字体 URL（已通过 HTTP 200 验证）
- [x] 至少 3 个不同的字体来源（实际 6 个：Google Fonts、jsDelivr Fontsource、jsDelivr cn-fontsource、jsDelivr @wc1font、cdnfonts、直链下载）
- [x] FontData 接口扩展，包含 sources 字段
- [x] fonts.ts 仍可编译，无 TypeScript 错误
- [x] 中文字体条目数 ≥ 120（实际 175 个）
- [x] 每个条目都有至少 1 个有效的 source URL
- [x] 至少 3 个不同的 source.type（实际 6 个）
- [x] fontLoader.ts 实现 downloadFont 函数（下载到 IndexedDB）
- [x] fontLoader.ts 实现 loadLocalFont 函数（从 IndexedDB 加载）
- [x] fontLoader.ts 实现 getCachedFont 函数（检查缓存）
- [x] 首次下载后，IndexedDB 中存在字体记录
- [x] 第二次加载时，不发起网络请求
- [x] 字体选择器中每个选项使用对应 font-family 渲染
- [x] 选中字体后编辑器立即应用该字体
- [x] `npm run build` 成功
- [x] 开发服务器正常启动（HTTP 200）
