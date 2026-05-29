# 编辑器高级功能增强 - 任务列表

## [ ] Task 1: 表格行列操作功能
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 在工具栏添加表格行列操作按钮（仅在光标位于表格内时显示）：
    - 在上方添加行
    - 在下方添加行
    - 在左侧添加列
    - 在右侧添加列
    - 删除当前行
    - 删除当前列
  - 使用 Tiptap Table 扩展的命令：addRowBefore, addRowAfter, addColumnBefore, addColumnAfter, deleteRow, deleteColumn
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 可以添加行和列
  - `human-judgement` TR-1.2: 可以删除行和列

## [ ] Task 2: 修复表格合并单元格功能
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 确保合并单元格功能真正工作（选中多个单元格后合并为一个）
  - 确保拆分单元格功能正常
  - 检查 Tiptap Table 扩展的 mergeCells 和 splitCell 命令是否正确配置
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 选中多个单元格后可以合并
  - `human-judgement` TR-2.2: 合并后的单元格可以拆分

## [ ] Task 3: 图片自适应显示
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改图片CSS样式，限制最大宽度为100%
  - 高度自适应，保持原始宽高比
  - 添加圆角（border-radius: 8px）和轻微阴影
  - 确保竖屏图片不会显示过大
  - 涉及文件：RichTextEditor.tsx（添加图片样式）
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 竖屏图片显示正常，不超出编辑器宽度
  - `human-judgement` TR-3.2: 图片保持宽高比

## [ ] Task 4: 创建文件上传对话框组件
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 FileUploadDialog 组件：
    - 两个Tab：本地上传 / 链接上传
    - 对话框包含标题、Tab切换、内容区、底部操作按钮（确认/取消）
  - 本地上传Tab：
    - 拖拽区域或点击上传区域
    - 文件列表显示（缩略图/图标、文件名、大小、删除按钮）
    - 一键清除按钮
    - 最多5个文件限制提示
  - 链接上传Tab：
    - "添加链接"按钮
    - 点击后下方出现输入框（URL输入 + 确认/取消）
    - 链接列表显示（URL、删除按钮）
    - 支持纯链接和文字链接切换
    - 文字链接模式：额外输入显示文字
    - 一键清除按钮
    - 滚动条支持（多链接时）
  - 涉及文件：新建 FileUploadDialog.tsx，修改 RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-5, AC-6, AC-7]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 对话框正确显示两个Tab
  - `human-judgement` TR-4.2: 本地上传文件列表正常显示
  - `human-judgement` TR-4.3: 链接上传列表正常显示

## [ ] Task 5: 实现安全提示弹窗
- **Priority**: P0
- **Depends On**: Task 4
- **Description**:
  - 创建 SecurityConfirmDialog 组件：
    - 标题：安全提示
    - 内容："您试图在知识库中下载文件，内容由作者提供。我们无法得知内容安全性。谨慎下载。"
    - 两个按钮："我已知晓"（主按钮）/ "取消下载"（次要按钮）
  - 在文件节点点击时触发弹窗
  - 用户点击"我已知晓"后才执行下载
  - 涉及文件：新建 SecurityConfirmDialog.tsx，修改 editor-extensions.ts（FileNode渲染）
- **Acceptance Criteria Addressed**: [AC-8]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 点击文件弹出安全提示
  - `human-judgement` TR-5.2: 确认后才下载

## [ ] Task 6: 添加国际化翻译
- **Priority**: P1
- **Depends On**: Task 1, Task 4, Task 5
- **Description**:
  - 在 i18n/index.ts 中添加新增功能的翻译键：
    - 表格行列操作按钮文本
    - 文件上传对话框文本（Tab标题、按钮、提示等）
    - 安全提示弹窗文本
    - 链接上传相关文本（纯链接、文字链接、添加链接等）
  - 支持 zh、en、ja、ko 四种语言
  - 涉及文件：src/i18n/index.ts
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-6.1: 所有新增翻译键在四种语言中都有定义

## [ ] Task 7: 浏览器自动化验证
- **Priority**: P0
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 6
- **Description**:
  - 启动开发服务器
  - 使用浏览器自动化工具访问编辑器页面
  - 验证表格行列操作
  - 验证图片自适应显示
  - 验证文件上传对话框
  - 验证安全提示弹窗
  - 截图记录验证结果
  - 涉及文件：所有修改的文件
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `human-judgement` TR-7.1: 浏览器自动化测试通过
  - `human-judgement` TR-7.2: 表格功能重点排查通过

## [ ] Task 8: 构建和lint验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 6
- **Description**:
  - 运行 npm run build 验证没有错误
  - 运行 npm run lint 验证没有警告
  - 涉及文件：所有修改的文件
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-8.1: npm run build 成功无错误
  - `programmatic` TR-8.2: npm run lint 无警告

# Task Dependencies
- Task 5 依赖 Task 4
- Task 6 依赖 Task 1, Task 4, Task 5
- Task 7 依赖 Task 1, Task 2, Task 3, Task 4, Task 5, Task 6
- Task 8 依赖 Task 1, Task 2, Task 3, Task 4, Task 5, Task 6
