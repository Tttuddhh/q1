# 工具栏重组与表格悬浮菜单 - The Implementation Plan

## [x] Task 1: 添加撤销/重做按钮并导入图标
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 从 @hugeicons/core-free-icons 导入 UndoIcon 和 RedoIcon
  - 在工具栏加粗按钮前面添加撤销和重做按钮
  - 撤销按钮调用 editor.chain().focus().undo().run()
  - 重做按钮调用 editor.chain().focus().redo().run()
- **Acceptance Criteria Addressed**: [AC-1]

## [x] Task 2: 重新分组工具栏按钮
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 按照规格重新排列工具栏按钮顺序
  - 在每组之间添加分隔线（竖线）
  - 分组顺序：撤销/重做 | 基础格式 | 标题 | 列表/引用 | 颜色 | 链接/表情 | 媒体 | 表格 | 对齐
  - 将表情图标（SmileIcon）移动到链接图标后面
  - 确保图片、视频、文件在一个区域，用分隔线与表格分开
- **Acceptance Criteria Addressed**: [AC-2]

## [x] Task 3: 实现表格悬浮操作菜单
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 创建一个 TableFloatingMenu 组件
  - 当 editor.isActive('table') 时，在表格附近显示悬浮菜单
  - 悬浮菜单包含：合并单元格、拆分单元格、添加行（前后）、添加列（前后）、删除行、删除列
  - 鼠标离开表格区域后隐藏悬浮菜单
  - 移除工具栏中常驻的表格操作按钮
- **Acceptance Criteria Addressed**: [AC-3, AC-4]

## [x] Task 4: 构建和 lint 验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2, Task 3
- **Description**: 
  - 运行 npm run build 验证没有错误
  - 运行 npm run lint 验证没有警告
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic`: npm run build 成功无错误
  - `programmatic`: npm run lint 无警告

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 1, Task 2, Task 3
