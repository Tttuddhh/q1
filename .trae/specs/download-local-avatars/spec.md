# Download Local Avatars Spec

## Why
用户头像一直无法通过外部API直接在浏览器中渲染显示。用户要求从外部API下载头像文件到本地引用，并指定使用最初部署时的头像来源：DiceBear 7.x notionists。

## What Changes
- 从 `https://api.dicebear.com/7.x/notionists/svg?seed=user` 下载头像SVG到 `/workspace/public/avatar.svg`
- Header组件已引用本地 `/avatar.svg` 路径

## Impact
- Affected specs: 无
- Affected code: `public/avatar.svg`