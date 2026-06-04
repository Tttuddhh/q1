# 修复新输入段落间距问题 - 检查清单

- [x] Paragraph 节点扩展了 `class` 属性
- [x] 创建了基于 `appendTransaction` 的 ProseMirror 插件
- [x] 插件只对初始内容加载执行一次（使用闭包变量 `isInitialized`）
- [x] 插件能正确识别所有已存在段落并添加 `existing-paragraph` class
- [x] RichTextEditor 中注册了新扩展（`ParagraphWithClass` + `NewParagraphExtension`）
- [x] 删除了之前失败的 `transaction` 事件监听器
- [x] CSS 规则更新：`.ProseMirror p:not(.existing-paragraph) { margin-bottom: 0 !important; }`
- [x] npm run build 成功无错误

## 运行时验证（需在浏览器中确认）
- [ ] 已存在段落的 DOM 中 `class` 包含 `existing-paragraph`
- [ ] 用户新增段落的 DOM 中 `class` 不包含 `existing-paragraph`
- [ ] 已存在段落的 `margin-bottom` 仍为 `0.75em`
- [ ] 新增段落的 `margin-bottom` 为 `0`
