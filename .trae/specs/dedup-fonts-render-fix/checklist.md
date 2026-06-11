# Checklist

- [x] 字体总数在80-100之间（含系统默认）
- [x] 同系列字体最多3个，且风格差异明显
- [x] 无重复 name 或 displayName
- [x] 所有字体都有有效的 googleFontName 或 cssUrl
- [x] 14个分类（黑体、宋体、楷体、行书、草书、篆书、明体、仿宋、圆体、像素、手写、卡通、艺术、复古）都有至少1个字体
- [x] FontPicker 字体项在字体加载完成后以自身字形渲染
- [x] 字体未加载时不强制应用 font-family（避免系统 fallback 误导）
- [x] 加载失败时有降级显示
- [x] npm run build 通过
- [x] 预览中字体选择器显示正确
