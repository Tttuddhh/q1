# 修复字体渲染和清理非中文字体 - Checklist

## 字体数据验证
- [x] FONTS 数组中恰好有 120 个字体条目
- [x] 所有字体的 category 字段为 'chinese'
- [x] 所有字体名称为中文（无日文、韩文名称）
- [x] 无 Kosugi、M PLUS、Sawarabi、Shippori、Nanum、Gaegu、Gowun 等日韩字体

## FontPicker 组件验证
- [x] 字体选择器下拉列表中每个选项使用 `fontFamily: font.family` 渲染
- [x] 字体名使用各自字体的样式显示（非默认字体）
- [x] 移除了预览小字（preview text），仅显示字体名
- [x] 字体名文本溢出时显示省略号

## 构建和运行验证
- [x] `npm run build` 成功完成，无错误
- [x] 本地服务器可正常启动
- [x] 字体选择器界面显示 120 个中文字体
- [x] 字体名在列表中显示为不同的字体样式
- [x] 搜索功能正常工作

## 视觉验证
- [x] 字体选择器中无日韩文字
- [x] 所有字体名清晰可读
- [x] 字体样式差异明显可见
