# 容器页面重设计 Spec

## Why
当前"容器"页面存在多个问题：图标错误（用了ComponentIcon而非容器相关图标）、位置不当（在知识管理区域第一项而非标签下方）、内容定位偏差（叫"插件市场"而非"容器"，且只针对编辑器而非编辑器+知识库双场景）、卡片设计简陋无参考、缺少点击弹窗查看详情功能。

## What Changes
- **移动侧边栏容器导航项**：从当前知识管理区域第一位移到标签下方
- **更换容器图标**：从 `ComponentIcon` 更换为更合适的图标（如 `Package01Icon`）
- **重构 MarketPage → ContainerPage**：页面标题从"插件市场"改为"容器"，副标题反映编辑器+知识库双场景
- **重新设计卡片布局**：参考 VS Code 插件市场、Notion 模板画廊的卡片设计，包含封面预览图、更丰富的排版、footer 统计信息
- **新增详情弹窗**：点击卡片弹出模态框，展示完整介绍、功能列表、截图预览、版本信息等
- **容器数据重新设计**：内容覆盖编辑器组件和知识库组件两个维度
- **分类重新定义**：区分编辑器类（排版美化/富媒体/交互增强等）和知识库类（文档组织/数据可视化/知识连接等）
- **i18n 扩展**：新增容器页面相关翻译键

## Impact
- Affected specs: `add-container-market-page`（已有实现的增强）
- Affected code: `src/components/MarketPage.tsx`（重命名并重写为 ContainerPage）、`src/components/FuncSidebar.tsx`、`src/App.tsx`、`src/i18n/index.ts`、`src/types/index.ts`

## MODIFIED Requirements

### Requirement: 侧边栏容器导航位置
容器导航项 SHALL 位于知识管理区域中"标签"导航项的下方（而非当前的第一位）。

#### Scenario: 导航顺序
- **WHEN** 侧边栏知识管理区域展开
- **THEN** 导航项顺序为：时光记 → 收藏夹 → 标签 → 容器

### Requirement: 容器图标
侧边栏容器导航项 SHALL 使用 `Package01Icon`（包裹/盒子图标），而非当前的 `ComponentIcon`。

### Requirement: 容器页面定位
容器页面 SHALL 定位为"编辑器和知识库的扩展组件中心"，而非"插件市场"。
- 页面标题为"容器"
- 副标题体现双场景："为编辑器和知识库页面添加强大的扩展组件"

### Requirement: 容器卡片设计
每张容器卡片 SHALL 参考 VS Code 插件市场和 Notion 模板画廊的设计规范，包含：
- **封面预览区**：带渐变背景的图标展示区（120px高），取代纯色小图标
- **卡片内容区**：标题（15px，600字重）、简短描述（13px，灰色，最多2行）、适用场景标签（编辑器/知识库/通用）
- **卡片底部**：统计信息（安装量/热度星级）+ 分类标签
- **悬停效果**：卡片上浮4px + 柔和阴影，封面区亮度微变

#### Scenario: 卡片展示
- **WHEN** 容器页面加载
- **THEN** 每个容器以卡片形式展示，包含渐变色封面、图标、标题、描述、适用场景标签、底部统计

### Requirement: 容器详情弹窗
点击任意容器卡片 SHALL 弹出详情模态框，包含：
- **顶部横幅**：与卡片封面一致的渐变背景 + 大图标 + 容器名称 + 简短描述
- **功能特性区**：功能列表，每项带勾选图标
- **截图预览区**：模拟截图展示（带图标的占位卡片）
- **详细信息区**：版本号、开发者、最近更新、安装量
- **操作按钮**：安装/启用按钮 + 关闭按钮
- **遮罩层**：半透明黑色背景，点击遮罩可关闭弹窗
- **关闭动画**：淡入淡出效果

#### Scenario: 打开详情
- **WHEN** 用户点击某个容器卡片
- **THEN** 弹出模态框展示该容器的详细信息
- **WHEN** 用户点击遮罩层或关闭按钮
- **THEN** 模态框关闭

### Requirement: 容器数据覆盖双场景
容器数据 SHALL 覆盖编辑器场景和知识库场景两大类：
- **编辑器类**：目录导航、代码高亮、数学公式、提示框、分栏布局、折叠内容、字数统计
- **知识库类**：思维导图、流程图、高级表格、PDF预览、图片画廊、标签页
- **通用类**：表情选择、视频嵌入

每个容器项新增 `scene` 字段标识适用场景：`'editor' | 'knowledge' | 'both'`

### Requirement: 分类筛选
分类筛选 SHALL 支持按"全部/编辑器/知识库"维度以及具体的功能分类（排版、媒体、工具、数据、交互、样式、嵌入）进行筛选。

## ADDED Requirements

### Requirement: i18n 容器页面翻译
系统 SHALL 为以下键提供中/英/日/韩四种语言翻译：
- `container.title`：页面标题（如"容器"）
- `container.subtitle`：页面副标题
- `container.search_placeholder`：搜索框占位符
- `container.empty_text`：空结果提示
- `container.scene_editor`：编辑器标签
- `container.scene_knowledge`：知识库标签
- `container.scene_both`：通用标签
- `container.installs`：安装量
- `container.hot_rate`：热度
- `container.install_btn`：安装按钮
- `container.detail.features`：功能介绍
- `container.detail.screenshots`：截图预览
- `container.detail.version`：版本
- `container.detail.developer`：开发者
- `container.detail.updated`：更新日期