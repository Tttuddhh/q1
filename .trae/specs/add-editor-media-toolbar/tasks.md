# Tasks

- [x] Task 1: 安装表格相关 Tiptap 扩展
  - [x] 安装 `@tiptap/extension-table` `@tiptap/extension-table-row` `@tiptap/extension-table-cell` `@tiptap/extension-table-header`（v3.22.5 匹配现有 @tiptap/core）

- [x] Task 2: 在编辑器扩展中注册 Table 扩展
  - [x] 在 RichTextEditor 的 useEditor extensions 中添加 Table、TableRow、TableCell、TableHeader

- [x] Task 3: 在工具栏添加图片、视频、文件、表格按钮
  - [x] 引入图标：Image01Icon、Video01Icon、File01Icon、Table01Icon
  - [x] 图片按钮：弹出 URL 输入框，插入 `<p><img src="..." /></p>` 确保块级
  - [x] 视频按钮：弹出 URL 输入框，插入 `<p><iframe src="..." /></iframe>` 块级
  - [x] 文件按钮：触发文件选择，上传后插入为下载链接
  - [x] 表格按钮：直接插入 3x3 表格

- [x] Task 4: 添加 i18n 翻译
  - [x] 为四种语言（zh/en/ja/ko）添加 image、video、file、table 相关翻译键

- [x] Task 5: 构建验证
  - [x] 运行 `npm run build` 构建成功

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 可与 Task 3 并行
- Task 5 依赖 Task 3、Task 4