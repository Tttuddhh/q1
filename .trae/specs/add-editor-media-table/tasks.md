# 编辑器媒体与表格功能增强 - 任务列表

## [ ] Task 1: 安装 Tiptap 表格扩展
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 安装 `@tiptap/extension-table`、`@tiptap/extension-table-row`、`@tiptap/extension-table-cell`、`@tiptap/extension-table-header`
  - 安装 `@tiptap/extension-gapcursor`（用于图片/视频前后光标）
  - 验证安装成功
- **Acceptance Criteria Addressed**: [AC-3, AC-4, AC-6]
- **Test Requirements**:
  - `programmatic` TR-1.1: npm install 成功无错误
- **Notes**: gapcursor 扩展是 Tiptap 官方提供的，用于在 block 节点前后放置光标

## [ ] Task 2: 创建自定义图片节点扩展（支持前后光标）
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 基于 Tiptap Image 扩展创建自定义图片节点
  - 配置图片节点为 inline: false（block 级别），支持前后光标
  - 或使用 Gapcursor 扩展配合现有 Image 扩展
  - 确保图片可以被选中、删除、前后换行
  - 涉及文件：RichTextEditor.tsx 或新建扩展文件
- **Acceptance Criteria Addressed**: [AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 插入图片后光标可放置在图片前后
  - `human-judgement` TR-2.2: 按 Enter 可在图片前后换行
  - `human-judgement` TR-2.3: 按 Backspace/Delete 可删除图片
- **Notes**: 需要配置图片节点的 selectable 和 draggable 属性

## [ ] Task 3: 创建自定义视频节点扩展（支持前后光标）
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 使用 Tiptap 的 Node API 创建自定义视频节点扩展
  - 视频节点支持 iframe 嵌入（YouTube、Bilibili 等）
  - 配置视频节点为 block 级别，支持前后光标
  - 支持视频 URL 输入弹窗
  - 涉及文件：RichTextEditor.tsx 或新建扩展文件
- **Acceptance Criteria Addressed**: [AC-5, AC-6]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 输入视频 URL 后成功嵌入
  - `human-judgement` TR-3.2: 光标可放置在视频前后
  - `human-judgement` TR-3.3: 视频可删除和换行
- **Notes**: 视频节点渲染为 iframe，需要处理不同平台的嵌入链接

## [ ] Task 4: 创建文件节点扩展
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 使用 Tiptap 的 Node API 创建自定义文件节点扩展
  - 文件节点显示为带图标的文件名卡片/链接
  - 支持点击下载（使用 base64 数据）
  - 涉及文件：RichTextEditor.tsx 或新建扩展文件
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 选择文件后成功插入文件节点
  - `human-judgement` TR-4.2: 文件节点显示文件名和图标
  - `human-judgement` TR-4.3: 点击文件节点可下载
- **Notes**: 文件转为 base64 存储，限制 10MB

## [ ] Task 5: 配置表格扩展
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - 在编辑器 extensions 中配置 Table、TableRow、TableCell、TableHeader
  - 创建表格插入弹窗/选择器（选择行列数）
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-8]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 选择行列后成功插入表格
  - `human-judgement` TR-5.2: 表格可输入内容
- **Notes**: 表格基础功能，暂不支持合并单元格

## [ ] Task 6: 在工具栏添加四个功能图标按钮
- **Priority**: P0
- **Depends On**: Task 2, Task 3, Task 4, Task 5
- **Description**:
  - 从 @hugeicons/core-free-icons 导入图片、视频、文件、表格图标
  - 在工具栏合适位置添加四个 ToolbarButton
  - 图片按钮：点击打开文件选择器
  - 视频按钮：点击打开 URL 输入弹窗
  - 文件按钮：点击打开文件选择器
  - 表格按钮：点击打开行列选择弹窗
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgement` TR-6.1: 四个图标正确显示在工具栏
  - `human-judgement` TR-6.2: 点击图标触发对应功能
- **Notes**: 图标需要与现有工具栏风格一致

## [ ] Task 7: 添加国际化翻译
- **Priority**: P1
- **Depends On**: Task 6
- **Description**:
  - 在 i18n/index.ts 中添加图片、视频、文件、表格相关的翻译键
  - 支持 zh、en、ja、ko 四种语言
  - 涉及文件：src/i18n/index.ts
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic` TR-7.1: 所有新增翻译键在四种语言中都有定义
- **Notes**: 翻译键包括按钮标题、弹窗提示等

## [ ] Task 8: 验证和测试
- **Priority**: P1
- **Depends On**: Task 2, Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**:
  - 运行 npm run build 验证没有错误
  - 运行 npm run lint 验证没有警告
  - 在浏览器中测试所有功能
  - 验证图片/视频前后光标、删除、换行功能
  - 涉及文件：RichTextEditor.tsx, src/i18n/index.ts
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8]
- **Test Requirements**:
  - `programmatic` TR-8.1: npm run build 成功无错误
  - `programmatic` TR-8.2: npm run lint 无警告
  - `human-judgement` TR-8.3: 所有功能在浏览器中正常工作
- **Notes**: 确保没有 TypeScript 错误

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1
- Task 5 依赖 Task 1
- Task 6 依赖 Task 2, Task 3, Task 4, Task 5
- Task 7 依赖 Task 6
- Task 8 依赖 Task 2, Task 3, Task 4, Task 5, Task 6, Task 7
