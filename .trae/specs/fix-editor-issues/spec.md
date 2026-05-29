# 编辑器问题修复与增强 - Product Requirement Document

## Overview
- **Summary**: 修复编辑器中存在的4个问题：工具栏分组分隔线、表格显示与合并单元格、文件多上传限制、视频本地文件支持
- **Purpose**: 提升编辑器用户体验，修复已知问题，增强功能
- **Target Users**: 所有使用富文本编辑器的用户

## Goals
- 工具栏图标按功能区域分组，用分隔线清晰划分
- 修复表格创建后无法显示的问题，支持合并单元格
- 文件上传支持多文件（最多5个），超限提示
- 视频支持本地文件上传（不仅限于URL）

## Non-Goals (Out of Scope)
- 不实现表格样式主题切换
- 不实现视频编辑功能
- 不实现文件在线预览

## Background & Context
当前编辑器已实现图片、视频、文件、表格四个功能，但存在以下问题：
1. 工具栏图标没有按功能区域分组，视觉上混乱
2. 表格创建后无法正常显示
3. 文件只能单文件上传
4. 视频仅支持URL嵌入，不支持本地视频

## Functional Requirements
- **FR-1**: 工具栏图标按三个区域分组：
  - 区域1：字体颜色 + 背景颜色（ColorsIcon + HighlighterIcon）
  - 区域2：链接（Link01Icon）
  - 区域3：图片、视频、文件、表格（ImageIcon + VideoIcon + File01Icon + TableIcon）
  - 每个区域之间用分隔线分开
- **FR-2**: 表格修复与增强：
  - 修复表格创建后无法显示的问题
  - 支持合并单元格（mergeCells、splitCell）
  - 支持多种表格样式（边框、背景色等）
- **FR-3**: 文件上传支持多文件：
  - 支持一次性上传最多5个文件
  - 超过5个时提示"最多上传5个文件"
  - 链接形式的文件不限制数量
- **FR-4**: 视频支持本地文件：
  - 视频按钮支持两种模式：本地视频文件 和 视频链接
  - 本地视频通过文件选择器上传（精确到视频选项）
  - 视频链接通过弹窗输入URL

## Non-Functional Requirements
- **NFR-1**: 文件上传总大小限制在 50MB 以内（5个文件×10MB）
- **NFR-2**: 本地视频文件大小限制在 50MB
- **NFR-3**: 界面响应式，表格样式适配不同主题

## Constraints
- **Technical**: 使用 React、Tiptap 和现有组件结构
- **Business**: 媒体文件本地存储为 base64，不依赖外部存储服务

## Assumptions
- 用户上传的视频格式为 MP4/WebM/OGV
- 表格合并单元格使用 Tiptap 官方扩展
- 多文件上传使用同一个文件选择器

## Acceptance Criteria

### AC-1: 工具栏分组
- **Given**: 用户打开编辑器
- **When**: 查看工具栏
- **Then**: 看到三个清晰分组的区域，用分隔线分开
- **Verification**: `human-judgment`

### AC-2: 表格显示修复
- **Given**: 用户点击表格图标选择行列
- **When**: 表格插入到编辑器
- **Then**: 表格正常显示，可以输入内容
- **Verification**: `human-judgment`

### AC-3: 表格合并单元格
- **Given**: 用户选中多个单元格
- **When**: 点击合并单元格
- **Then**: 单元格成功合并
- **Verification**: `human-judgment`

### AC-4: 文件多上传
- **Given**: 用户点击文件图标
- **When**: 选择5个以内文件
- **Then**: 所有文件成功插入
- **Verification**: `human-judgment`

### AC-5: 文件上传超限提示
- **Given**: 用户点击文件图标
- **When**: 选择超过5个文件
- **Then**: 提示"最多上传5个文件"，只插入前5个
- **Verification**: `human-judgment`

### AC-6: 视频本地文件
- **Given**: 用户点击视频图标
- **When**: 选择本地视频文件
- **Then**: 视频成功插入并可以播放
- **Verification**: `human-judgment`

### AC-7: 视频链接
- **Given**: 用户点击视频图标
- **When**: 输入视频URL
- **Then**: 视频成功嵌入
- **Verification**: `human-judgment`

## Open Questions
- [ ] 表格样式是否需要支持自定义CSS？
- [ ] 视频本地文件是否需要支持预览？
