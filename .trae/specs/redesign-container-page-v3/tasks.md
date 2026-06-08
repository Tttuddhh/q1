# Tasks

- [x] Task 1: 新增 i18n 翻译键
  - [x] 在四种语言中添加 upload / my / filter / detail.description / detail.tutorial / detail.other_info / preview / author
  - **验证**: 四种语言翻译键完整

- [x] Task 2: 重写 ContainerPage 组件 - 页面横幅和分类栏
  - [x] 顶部深色渐变横幅（#1a1a2e → #16213e），高度120px
  - [x] 横幅左侧：橙色圆角方形图标 + "容器"白色大标题 + 简述
  - [x] 横幅右侧："上传容器"和"我的"黑色圆角按钮
  - [x] 分类筛选栏：4个黑色药片分类按钮 + 右侧"筛选"按钮
  - **验证**: 横幅和分类栏视觉效果正确

- [x] Task 3: 重写卡片设计（5列网格 + 大封面）
  - [x] 5列网格布局（repeat(5, 1fr)），gap 20px
  - [x] 卡片封面区：16:10比例，圆角12px，渐变背景，居中48px大图标
  - [x] 卡片信息区：名称(左) + 评分/安装量(右) + 分类标签行(底部黑色药片)
  - [x] 悬停：translateY(-4px) + 阴影
  - **验证**: 卡片网格正确，hover流畅

- [x] Task 4: 重写详情弹窗 - 头部和预览区
  - [x] 弹窗头部：48px渐变图标 + 名称/作者 + 安装按钮 + 关闭X
  - [x] 预览区："预览"标题 + 横向滚动截图卡片
  - **验证**: 头部和预览区布局正确

- [x] Task 5: 重写详情弹窗 - Tab切换和内容区
  - [x] 5个Tab按钮（说明/功能介绍/使用教程/更新日志/其他信息）
  - [x] Tab选中态黑色下划线指示器
  - [x] 说明Tab：detailedDescription
  - [x] 功能介绍Tab：features列表
  - [x] 使用教程Tab：usageGuide步骤
  - [x] 更新日志Tab：changelog时间线
  - [x] 其他信息Tab：信息面板网格
  - **验证**: Tab切换正常，各内容区完整

- [x] Task 6: 构建验证
  - [x] 运行 `npm run build` 确保无错误
  - **验证**: 构建成功

# Task Dependencies
- Task 2、3、4、5 可并行（都依赖 Task 1 的翻译键，但可先写组件再补翻译）
- Task 6 依赖所有前置任务