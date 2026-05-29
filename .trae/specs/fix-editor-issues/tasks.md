# 编辑器问题修复与增强 - 任务列表

## [x] Task 1: 工具栏图标分组与分隔线
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 将工具栏图标按功能区域重新分组：
    - 区域1：字体颜色(ColorsIcon) + 背景颜色(HighlighterIcon)
    - 区域2：链接(Link01Icon)
    - 区域3：图片(ImageIcon) + 视频(VideoIcon) + 文件(File01Icon) + 表格(TableIcon)
  - 在每个区域之间添加分隔线（`<div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />`）
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 工具栏显示三个清晰分组的区域
  - `human-judgement` TR-1.2: 分隔线正确分隔各区域

## [x] Task 2: 修复表格显示问题并支持合并单元格
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 排查表格创建后无法显示的问题（可能是CSS样式缺失或扩展配置问题）
  - 安装 `@tiptap/extension-gapcursor` 确保表格前后光标正常
  - 添加表格CSS样式（边框、内边距等）
  - 安装 `@tiptap-pro/extension-table-cell-operations` 或自定义实现合并单元格功能
  - 在工具栏添加合并单元格/拆分单元格按钮
  - 涉及文件：RichTextEditor.tsx, editor-extensions.ts, 可能需要全局CSS
- **Acceptance Criteria Addressed**: [AC-2, AC-3]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 表格创建后正常显示
  - `human-judgement` TR-2.2: 表格可以输入内容
  - `human-judgement` TR-2.3: 合并单元格功能正常
- **Notes**: 需要检查表格的CSS样式是否正确加载

## [x] Task 3: 文件上传支持多文件（最多5个）
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改文件input添加 `multiple` 属性
  - 修改 handleFileUpload 函数支持多文件处理
  - 添加文件数量检查：超过5个时提示"最多上传5个文件"
  - 只处理前5个文件，忽略多余文件
  - 链接形式的文件不限制数量（通过URL插入）
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-4, AC-5]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 可以选择多个文件
  - `human-judgement` TR-3.2: 5个以内文件全部插入
  - `human-judgement` TR-3.3: 超过5个时提示并只插入前5个
- **Notes**: 需要添加多语言提示文本

## [x] Task 4: 视频支持本地文件上传
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改视频按钮逻辑：点击后显示选择菜单（本地视频 / 视频链接）
  - 本地视频：通过文件选择器上传（accept="video/*"），转为base64，使用HTML5 video标签渲染
  - 视频链接：通过prompt输入URL，使用iframe嵌入
  - 创建新的视频节点扩展或修改现有扩展支持本地视频
  - 涉及文件：RichTextEditor.tsx, editor-extensions.ts
- **Acceptance Criteria Addressed**: [AC-6, AC-7]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 可以选择本地视频文件
  - `human-judgement` TR-4.2: 本地视频成功插入并显示播放器
  - `human-judgement` TR-4.3: 视频链接成功嵌入
- **Notes**: 本地视频使用HTML5 video标签，限制50MB

## [x] Task 5: 添加国际化翻译
- **Priority**: P1
- **Depends On**: Task 3, Task 4
- **Description**:
  - 在 i18n/index.ts 中添加新增功能的翻译键：
    - 文件上传超限提示
    - 视频选择菜单文本（本地视频/视频链接）
    - 合并单元格/拆分单元格按钮文本
  - 支持 zh、en、ja、ko 四种语言
  - 涉及文件：src/i18n/index.ts
- **Acceptance Criteria Addressed**: [AC-5, AC-6, AC-7]
- **Test Requirements**:
  - `programmatic` TR-5.1: 所有新增翻译键在四种语言中都有定义

## [x] Task 6: 浏览器自动化验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5
- **Description**:
  - 启动开发服务器
  - 使用浏览器自动化工具访问编辑器页面
  - 验证表格创建和显示
  - 验证工具栏分组
  - 验证文件多上传
  - 验证视频本地文件上传
  - 截图记录验证结果
  - 涉及文件：所有修改的文件
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7]
- **Test Requirements**:
  - `human-judgement` TR-6.1: 浏览器自动化测试通过
  - `human-judgement` TR-6.2: 表格重点排查通过

## [x] Task 7: 构建和lint验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5
- **Description**:
  - 运行 npm run build 验证没有错误
  - 运行 npm run lint 验证没有警告
  - 涉及文件：所有修改的文件
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-7.1: npm run build 成功无错误
  - `programmatic` TR-7.2: npm run lint 无警告

# Task Dependencies
- Task 5 依赖 Task 3, Task 4
- Task 6 依赖 Task 1, Task 2, Task 3, Task 4, Task 5
- Task 7 依赖 Task 1, Task 2, Task 3, Task 4, Task 5
