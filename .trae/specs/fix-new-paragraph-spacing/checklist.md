# 修复新输入段落间距问题 - 检查清单

- [x] index.css 中包含新的样式规则：.ProseMirror p 默认 margin-bottom 为 0
- [x] index.css 中包含样式：.ProseMirror p.keep-original-margin { margin-bottom: 0.75em }
- [x] RichTextEditor.tsx 中有初始化后给已有段落添加 keep-original-margin 类的逻辑
- [x] npm run build 成功无错误

## 运行时验证检查（待验证）
- [ ] 进入编辑模式，检查已有段落有 keep-original-margin 类，margin-bottom 为 0.75em
- [ ] 按回车创建新段落，新段落没有 keep-original-margin 类，margin-bottom 为 0
- [ ] 新段落之间的视觉间距与段内文字换行间距一致
