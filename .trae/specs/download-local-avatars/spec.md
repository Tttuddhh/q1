# Download Local Avatars Spec

## Why
用户头像一直无法通过外部API直接在浏览器中渲染显示（多次尝试DiceBear、RoboHash、Boring Avatars等均失败）。用户明确要求放弃内联SVG方案，改为从外部API下载头像文件到本地public目录，然后本地引用。

## What Changes
- 从DiceBear API下载头像SVG文件到 `/workspace/public/` 目录
- 修改Header组件中头像的 `<img>` src引用本地文件路径
- 保持头像样式（圆角、尺寸等）

## Impact
- Affected specs: 无
- Affected code: `src/components/Header.tsx`, `public/` 目录新增头像文件