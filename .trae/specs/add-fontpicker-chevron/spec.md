# Font Picker Rotating Arrow Spec

## Why
字体选择器按钮缺少展开/收起的视觉指示。参考 FuncSidebar 中的 `func-chevron` 旋转箭头模式，在按钮右侧添加一个旋转箭头图标。

## What Changes
- 在 FontPicker 按钮右侧添加 `ArrowDown01Icon` 箭头图标
- 箭头在面板展开时向下，收起时旋转 -90deg（指向右），使用 `func-chevron` 样式

## Impact
- Affected specs: 无
- Affected code: `src/components/FontPicker.tsx`