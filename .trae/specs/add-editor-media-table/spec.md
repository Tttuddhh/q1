# 编辑器媒体与表格功能增强 - Product Requirement Document

## Overview
- **Summary**: 在富文本编辑器工具栏中增加图片、视频、文件、表格功能图标，并优化图片和视频的插入体验，支持前后光标放置
- **Purpose**: 提升编辑器的内容丰富度，支持更多媒体类型和结构化数据
- **Target Users**: 所有使用富文本编辑器的用户

## Goals
- 在工具栏增加图片、视频、文件、表格四个功能图标
- 图片插入后支持前后放置光标，方便删除、移动和换行
- 视频插入后支持前后放置光标，方便删除、移动和换行
- 文件以上传方式插入，显示为可点击的链接/卡片
- 表格支持基础插入功能

## Non-Goals (Out of Scope)
- 不实现图片的拖拽调整大小
- 不实现视频的自定义播放器
- 不实现表格的合并单元格等复杂操作
- 不实现文件预览功能

## Background & Context
当前编辑器已有基础的 Image 扩展，但工具栏缺少直观的图片、视频、文件、表格插入按钮。用户反馈：
1. 插入图片后光标无法放在图片前后，难以删除和换行
2. 需要支持视频和文件插入
3. 需要表格功能

## Functional Requirements
- **FR-1**: 工具栏增加图片、视频、文件、表格四个图标按钮
- **FR-2**: 图片插入使用文件选择器，支持本地图片上传（base64）
- **FR-3**: 图片节点前后可放置光标，支持 Enter 换行、Backspace/Delete 删除
- **FR-4**: 视频插入支持 URL 输入（嵌入视频链接）
- **FR-5**: 视频节点前后可放置光标，支持 Enter 换行、Backspace/Delete 删除
- **FR-6**: 文件插入使用文件选择器，显示为带图标的文件名链接
- **FR-7**: 表格插入支持选择行列数，生成基础表格

## Non-Functional Requirements
- **NFR-1**: 图片文件大小限制在 5MB 以内
- **NFR-2**: 文件上传大小限制在 10MB 以内
- **NFR-3**: 界面响应式，在不同屏幕尺寸下正常显示

## Constraints
- **Technical**: 使用 React、Tiptap 和现有组件结构
- **Business**: 媒体文件本地存储为 base64，不依赖外部存储服务

## Assumptions
- 用户上传的图片格式为 PNG/JPG/GIF/WebP
- 视频通过外部链接嵌入（如 YouTube、Bilibili 等）
- 表格为简单结构，不需要复杂操作

## Acceptance Criteria

### AC-1: 工具栏图标显示
- **Given**: 用户打开编辑器
- **When**: 查看工具栏
- **Then**: 看到图片、视频、文件、表格四个新图标按钮
- **Verification**: `human-judgment`

### AC-2: 图片插入
- **Given**: 用户点击工具栏图片图标
- **When**: 选择本地图片文件
- **Then**: 图片成功插入到编辑器中
- **Verification**: `human-judgment`

### AC-3: 图片前后光标
- **Given**: 编辑器中已插入图片
- **When**: 点击图片前方或后方
- **Then**: 光标成功放置在图片前后，可以输入文字
- **Verification**: `human-judgment`

### AC-4: 图片删除和换行
- **Given**: 编辑器中已插入图片
- **When**: 按 Backspace/Delete 或 Enter
- **Then**: 图片可以被删除，或在图片前后换行
- **Verification**: `human-judgment`

### AC-5: 视频插入
- **Given**: 用户点击工具栏视频图标
- **When**: 输入视频 URL
- **Then**: 视频成功嵌入到编辑器中
- **Verification**: `human-judgment`

### AC-6: 视频前后光标
- **Given**: 编辑器中已插入视频
- **When**: 点击视频前方或后方
- **Then**: 光标成功放置在视频前后，可以输入文字
- **Verification**: `human-judgment`

### AC-7: 文件插入
- **Given**: 用户点击工具栏文件图标
- **When**: 选择本地文件
- **Then**: 文件以链接/卡片形式显示在编辑器中
- **Verification**: `human-judgment`

### AC-8: 表格插入
- **Given**: 用户点击工具栏表格图标
- **When**: 选择行列数
- **Then**: 表格成功插入到编辑器中
- **Verification**: `human-judgment`

## Open Questions
- [ ] 表格是否需要支持合并单元格？
- [ ] 文件上传是否需要支持多文件？
- [ ] 视频是否支持直接上传而非仅 URL 嵌入？
