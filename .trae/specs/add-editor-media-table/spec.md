# 编辑器增加图片、视频、文件、表格功能 Spec

## Why
当前富文本编辑器缺少图片、视频、文件和表格的插入功能。用户需要在知识库内容中插入多媒体和结构化数据，并且要求插入后的元素可以方便地删除、移动和换行。

## What Changes
- 在编辑器工具栏增加图片、视频、文件、表格四个功能图标
- 图片插入支持上传和 URL 输入，插入后前后可放置光标
- 视频插入支持 URL 输入（如 YouTube、Bilibili 等），插入后前后可放置光标
- 文件插入支持上传，以链接形式展示
- 表格插入支持选择行列数，基础表格编辑
- 使用 TipTap 扩展实现：Image、Video（或 Iframe）、Table、TableRow、TableCell、TableHeader

## Impact
- Affected specs: 富文本编辑器工具栏
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`, `package.json`

## ADDED Requirements
### Requirement: 图片插入功能
The system SHALL 提供图片插入功能，支持本地上传和 URL 输入两种方式。插入的图片前后必须可以放置光标，方便删除、移动和换行。

#### Scenario: 插入图片
- **WHEN** 用户点击工具栏图片图标
- **THEN** 弹出图片插入对话框（上传或 URL）
- **WHEN** 用户选择图片或输入 URL 并确认
- **THEN** 图片插入到编辑器当前光标位置
- **THEN** 图片前后可以放置光标，按 Enter 可在图片前后换行

### Requirement: 视频插入功能
The system SHALL 提供视频插入功能，支持输入视频 URL（YouTube、Bilibili 等）。插入的视频前后必须可以放置光标。

#### Scenario: 插入视频
- **WHEN** 用户点击工具栏视频图标
- **THEN** 弹出视频 URL 输入对话框
- **WHEN** 用户输入视频 URL 并确认
- **THEN** 视频以嵌入形式插入到编辑器
- **THEN** 视频前后可以放置光标，按 Enter 可在视频前后换行

### Requirement: 文件插入功能
The system SHALL 提供文件插入功能，支持本地上传。插入的文件以可点击链接形式展示。

#### Scenario: 插入文件
- **WHEN** 用户点击工具栏文件图标
- **THEN** 弹出文件选择对话框
- **WHEN** 用户选择文件并确认
- **THEN** 文件以链接形式插入到编辑器

### Requirement: 表格插入功能
The system SHALL 提供表格插入功能，支持选择行列数插入基础表格。

#### Scenario: 插入表格
- **WHEN** 用户点击工具栏表格图标
- **THEN** 弹出行列选择器
- **WHEN** 用户选择行列数并确认
- **THEN** 表格插入到编辑器当前光标位置
