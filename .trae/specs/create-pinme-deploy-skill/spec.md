# PinMe 部署技能包 Spec

## Why
用户需要将当前知识库项目部署到 PinMe 平台，并制作一个可在 AI 平台上传的技能包。PinMe 是一个零配置的静态网站部署 CLI，支持一键部署到 IPFS 网络。

## What Changes
- **创建 PinMe 部署技能包**：包含技能说明文档、部署脚本、配置模板
- **支持两种部署方式**：CLI 命令行部署 + 浏览器拖拽部署
- **自动检测构建输出**：自动识别 dist/build/out/public 目录
- **一键部署脚本**：封装 `pinme upload` 命令，支持自定义项目名和目录

## Impact
- Affected code: 新建技能包文件，不影响现有项目代码

## ADDED Requirements

### Requirement: 技能包结构
技能包 SHALL 包含以下文件：
- `skill.md`：技能说明文档（使用方式、命令参考、注意事项）
- `scripts/deploy.sh`：一键部署脚本（安装 pinme → 登录 → 上传）
- `scripts/pinme.toml`：PinMe 项目配置文件模板

### Requirement: 部署脚本功能
部署脚本 SHALL 支持：
- 自动检测并安装 `pinme` CLI（`npm install -g pinme`）
- 自动检测构建输出目录（dist/build/out/public，优先级依次）
- 执行 `pinme upload <dir>` 上传静态文件
- 返回部署后的访问 URL
- 支持自定义项目名（`--name` 参数）

### Requirement: 技能说明文档
`skill.md` SHALL 包含：
- PinMe 简介（零配置、IPFS 托管、免费）
- 快速开始（安装 → 登录 → 部署）
- 命令参考（pinme upload / pinme login / pinme create）
- 限制说明（单文件 200MB / 目录 1GB / 免费版无固定域名）

## MODIFIED Requirements

### Requirement: 构建前置步骤
部署前 SHALL 先执行构建：
- 检测 `package.json` 中的 build 脚本
- 自动运行 `npm run build`
- 构建完成后再执行上传
