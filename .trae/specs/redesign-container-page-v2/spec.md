# 容器页面重设计 v2 Spec

## Why
当前容器页面在第一版重设计后仍存在以下问题：卡片采用覆盖图式设计偏向图片社区风格而非专业工具市场风格；弹窗内容顺序不符合用户预期（应该是图标→名称→介绍→展示图→功能→更新历史→上架信息→使用方法）；缺少更新日志、使用指南、视频预览等专业详情页标配内容。需要参考 VS Code 扩展市场、App Store 产品页等成熟设计重新打造。

## What Changes
- **卡片样式重构**：从渐变色封面大片改为简约列表式卡片（参考 VS Code 扩展视图），左图标 + 右信息区的紧凑布局
- **弹窗内容重排序**：严格按 图标 → 名称 → 介绍 → 截图/视频预览 → 功能列表 → 更新日志 → 上架信息 → 使用方法 的顺序
- **新增弹窗内容区块**：
  - **更新日志区**：版本时间线，展示每次更新的版本号、日期和变更内容
  - **使用指南区**：步骤化的使用说明
  - **视频预览区**：支持视频占位/上传的预览区域
  - **详细描述区**：区别于卡片简述的完整介绍文案
- **数据模型扩展**：新增 `changelog`、`usageGuide`、`detailedDescription`、`videoUrl`、`published` 字段
- **卡片按场景分tab展示**：全部/编辑器/知识库 三个tab，每个tab下展示对应卡片
- **移除封面渐变区域**：卡片不再使用大块渐变封面，改用简洁的图标+文字布局

## Impact
- Affected specs: `redesign-container-page`（替代该 spec 的实现）
- Affected code: `src/components/ContainerPage.tsx`（全部重写）、`src/i18n/index.ts`（新增翻译键）

## MODIFIED Requirements

### Requirement: 容器卡片样式（参考 VS Code 扩展视图）
每张容器卡片 SHALL 采用左图标 + 右侧信息布局：
- **左侧**：36px 圆角方形图标区，渐变背景色，内放 emoji 图标（16px）
- **右侧信息区**：
  - 第1行：容器名称（14px，600字重）+ 场景标签（小徽章，inline）
  - 第2行：简短描述（13px，灰色，单行截断）
  - 第3行：热度星级 + 安装量 + 分类药片
- **悬停**：背景变灰 + 轻微阴影，无位移
- **间距**：卡片间距8px，列表式排列
- **Tab控制**：页面上方三个tab按钮（全部/编辑器/知识库），点击切换显示对应场景的卡片

#### Scenario: 卡片展示
- **WHEN** 容器页面加载
- **THEN** 每个容器以列表式卡片展示，左侧渐变图标 + 右侧信息区，分为全部/编辑器/知识库三个tab

### Requirement: 详情弹窗内容顺序
弹窗内容 SHALL 按以下顺序排列：
1. **头部信息区**：图标 + 名称 + 开发者 + 安装按钮
2. **截图/视频预览区**：横向滚动的截图占位卡片 + 视频预览卡片
3. **详细介绍区**：完整的容器描述文案（3-5行）
4. **功能列表区**：带绿色对勾的功能项
5. **更新日志区**：版本时间线，每次更新的版本号+日期+变更说明
6. **信息面板区**：版本、开发者、上架时间、最近更新、安装量、场景标签
7. **使用指南区**：步骤化的使用说明（1-2-3步骤）

#### Scenario: 打开详情弹窗
- **WHEN** 用户点击容器卡片
- **THEN** 弹窗按上述顺序展示所有内容区块

### Requirement: 更新日志区块
弹窗 SHALL 包含更新日志区块，展示版本更新历史：
- "更新日志" 标题
- 时间线形式展示每次更新：圆点+线条连接
- 每条记录包含：版本号（蓝色标签）、更新日期、变更内容列表

#### Scenario: 查看更新历史
- **WHEN** 展开弹窗到更新日志区
- **THEN** 看到按时间倒序的版本更新记录

### Requirement: 使用指南区块
弹窗 SHALL 包含使用指南区块：
- "如何使用" 标题
- 步骤化说明，每步带编号（01, 02, 03...），包含步骤标题和简要说明

### Requirement: 视频预览支持
弹窗的截图预览区 SHALL 支持视频预览占位：
- 横向滚动区域包含截图占位卡片和视频占位卡片
- 视频占位卡片带播放按钮图标（▶），区别于截图卡片
- 视频数据来自容器的 `videoUrl` 字段（可选）

### Requirement: 容器数据扩展
ContainerItem 接口 SHALL 新增以下字段：
- `detailedDescription: string`：详细描述（弹窗中使用，3-5行）
- `changelog: { version: string; date: string; changes: string[] }[]`：更新日志
- `usageGuide: { step: number; title: string; description: string }[]`：使用步骤
- `videoUrl?: string`：视频预览地址（可选）
- `published: string`：上架日期
- `screenshots: { label: string; bgColor: string }[]`：截图描述数组

## ADDED Requirements

### Requirement: Tab式场景展示
页面主体 SHALL 使用三个tab按钮切换展示：
- 全部（默认）：展示所有容器
- 编辑器：仅展示 scene='editor' 或 'both' 的容器
- 知识库：仅展示 scene='knowledge' 或 'both' 的容器

Tab按钮样式：底色透明，选中态有底部下划线指示器（2px，主色），选中态文字加粗

### Requirement: 新增 i18n 翻译键
- `container.detail.overview`：概述
- `container.detail.usage_guide`：使用指南
- `container.detail.changelog`：更新日志
- `container.detail.published`：上架时间
- `container.detail.video_preview`：视频预览
- `container.detail.step`：步骤
- `container.detail.all`：全部