# 重建150个中文字体选择器 - 验证清单

- [ ] Checkpoint 1: 字体列表包含恰好150个中文字体（FONTS.length === 150）
- [ ] Checkpoint 2: 所有字体都有有效的 cssUrl 或 googleFontName
- [ ] Checkpoint 3: 无重复的 name 或 displayName
- [ ] Checkpoint 4: 字体风格覆盖至少10个不同分类（黑体/宋体/楷体/行书/草书/隶书/篆书/手写/像素/艺术/圆体/仿宋/明体/卡通/复古）
- [ ] Checkpoint 5: 150个字体全部通过 Playwright Canvas 像素差异检测验证
- [ ] Checkpoint 6: 字体加载器支持并发分批加载（每批10个）
- [ ] Checkpoint 7: 150个字体预加载在3秒内完成
- [ ] Checkpoint 8: 字体选择器使用虚拟滚动，滚动流畅无卡顿
- [ ] Checkpoint 9: 字体项以自身字形渲染预览（非系统默认字体）
- [ ] Checkpoint 10: 搜索过滤响应时间 < 100ms
- [ ] Checkpoint 11: 选中状态正确显示（按钮和列表中高亮当前字体）
- [ ] Checkpoint 12: 选择字体后编辑器文本正确应用该字体
- [ ] Checkpoint 13: npm run build 成功，无 TypeScript 错误
- [ ] Checkpoint 14: 不混杂日文、韩文、英文等其他语言字体
