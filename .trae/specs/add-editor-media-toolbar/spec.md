# Add Image, Video, File, Table to Editor Toolbar Spec

## Why
编辑器当前缺少图片、视频、文件、表格等富媒体功能。用户需要在内容中插入图片、视频、文件附件和表格，且图片/视频需要支持光标在其前后放置，方便删除、移动和换行。

## What Changes
- 工具栏新增图片、视频、文件、表格四个按钮
- 图片：支持 URL 输入插入，插入后包裹在 `<p>` 标签中使其成为块级元素，确保光标可前后放置
- 视频：支持 URL 输入插入（iframe 嵌入），与图片同样的块级处理
- 文件：支持上传本地文件，插入为可点击下载链接
- 表格：插入 3x3 默认表格，支持基础编辑
- 安装 `@tiptap/extension-table`、`@tiptap/extension-table-row`、`@tiptap/extension-table-cell`、`@tiptap/extension-table-header`
- 新增 i18n 翻译键

## Impact
- Affected specs: 无
- Affected code: `src/components/RichTextEditor.tsx`, `src/i18n/index.ts`, `package.json`
- Dependencies: 需安装 `@tiptap/extension-table` `@tiptap/extension-table-row` `@tiptap/extension-table-cell` `@tiptap/extension-table-header`

## ADDED Requirements
### Requirement: Insert Image
系统 SHALL 提供图片插入功能，支持通过 URL 插入图片，图片以块级元素呈现，光标可在图片前后自由放置。

#### Scenario: 插入图片
- **WHEN** 用户点击图片按钮并输入图片 URL
- **THEN** 图片插入到编辑器中，且为块级元素，光标可放置在图片前后

### Requirement: Insert Video
系统 SHALL 提供视频插入功能，支持通过 URL 插入视频（iframe 嵌入），视频以块级元素呈现。

#### Scenario: 插入视频
- **WHEN** 用户点击视频按钮并输入视频 URL
- **THEN** 视频嵌入到编辑器中，光标可放置在视频前后

### Requirement: Insert File
系统 SHALL 提供文件上传功能，支持选择本地文件并插入为可点击下载链接。

#### Scenario: 插入文件
- **WHEN** 用户点击文件按钮并选择本地文件
- **THEN** 文件作为可点击链接插入到编辑器中

### Requirement: Insert Table
系统 SHALL 提供表格插入功能，默认插入 3x3 表格。

#### Scenario: 插入表格
- **WHEN** 用户点击表格按钮
- **THEN** 3x3 表格插入到编辑器中，支持编辑