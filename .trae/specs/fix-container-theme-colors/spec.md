# 修复容器页面主题色和布局 Spec

## Why
用户反馈当前容器页面使用了大量黑色（#1a1a1a/#000），而应用的主题色是橙色（#FF743D）。同时布局与提供的草稿图存在差异，需要修复。

## What Changes
- **替换所有黑色为白色/主题色**：分类药片、标签、按钮、弹窗Tab指示器等全部使用白色/橙色主题色，不再使用纯黑
- **横幅背景改为白色**：移除深色渐变横幅，改为白色背景 + 主题色装饰
- **分类按钮样式**：白色背景 + 主题色边框/文字，选中态填充主题色
- **卡片标签**：白色背景 + 主题色边框/文字
- **弹窗Tab指示器**：主题色（橙色）下划线
- **弹窗安装按钮**：主题色渐变
- **优化卡片间距和排版**：更紧凑的间距，更清晰的层次

## Impact
- Affected code: `src/components/ContainerPage.tsx`

## MODIFIED Requirements

### Requirement: 页面横幅
页面横幅 SHALL 使用白色背景：
- 背景：白色（#fff）
- 左侧：主题色（#FF743D）圆角方形图标 + "容器"深色标题 + 灰色副标题
- 右侧："上传容器"和"我的"按钮使用主题色边框/文字样式（白色背景 + 主题色边框 + 主题色文字）
- 底部边框：1px solid #f0f0f0

### Requirement: 分类筛选栏
分类按钮 SHALL 使用主题色风格：
- 默认态：白色背景，1px solid #FF743D 边框，#FF743D 文字
- 选中态：#FF743D 背景，白色文字
- 圆角：9999px（药片）
- "筛选"按钮同样样式

### Requirement: 卡片标签
卡片底部标签 SHALL 使用主题色风格：
- 白色背景，1px solid #FF743D 边框
- #FF743D 文字
- 圆角：9999px
- 字号：11px

### Requirement: 弹窗Tab指示器
Tab选中态指示器 SHALL 使用主题色：
- 底部 2px solid #FF743D
- 文字颜色：#FF743D

### Requirement: 弹窗安装按钮
安装按钮 SHALL 使用主题色渐变：
- background: linear-gradient(135deg, #FF743D, #FF5E1A)
- 白色文字

### Requirement: 弹窗关闭按钮
弹窗关闭X按钮 SHALL 使用灰色而非黑色：
- 颜色：#9ca3af
- hover：#6b7280