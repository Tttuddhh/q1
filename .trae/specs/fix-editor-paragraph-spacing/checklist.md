# 修复编辑器段落换行间隔不一致 - Verification Checklist

- [x] Checkpoint 1: `.ProseMirror p` 的 margin-bottom 已调整为与 line-height 产生的间隔一致
- [x] Checkpoint 2: 编辑模式下新输入内容按 Enter 换行时，段落间隔与自动换行间隔视觉上保持一致
- [x] Checkpoint 3: 预览模式下段落间隔与编辑模式一致
- [x] Checkpoint 4: 现有内容的段落间隔未受影响
- [x] Checkpoint 5: compact-mode 下段落间隔保持一致（如果适用）
- [x] Checkpoint 6: 应用构建成功，没有错误
