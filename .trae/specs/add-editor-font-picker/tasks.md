# 编辑器字体选择器 - Implementation Tasks

## [ ] Task 1: 安装 Tiptap FontFamily 扩展
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 安装 `@tiptap/extension-font-family` 和 `@tiptap/extension-text-style`（如果未安装）
  - 在 RichTextEditor.tsx 中引入并配置 FontFamily 扩展
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - 构建成功，无错误

## [ ] Task 2: 创建字体数据文件
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `src/data/fonts.ts` 文件
  - 定义字体数据结构：name（显示名）、family（CSS font-family）、category（分类）、tags（标签）、googleFontName（Google Fonts 名称）
  - 添加30+中文字体：阿里巴巴普惠体、站酷系列、思源黑体/宋体、霞鹜文楷、优设标题黑等
  - 添加70+其他语言字体：按风格分类（可爱风、哥特风、手写体、衬线体、无衬线体等）
  - 确保所有字体都是 Google Fonts 上免费商用的
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - 字体数据文件编译通过
  - 字体总数 >= 100

## [ ] Task 3: 创建 Google Fonts 加载工具
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 创建 `src/utils/fontLoader.ts`
  - 实现动态加载 Google Fonts 的函数 `loadGoogleFont(fontFamily: string)`
  - 通过创建 `<link>` 标签动态加载 Google Fonts CSS
  - 实现字体缓存机制，避免重复加载
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - 字体能够正确加载
  - 重复加载同一字体不会创建多个 link 标签

## [ ] Task 4: 创建字体选择器下拉面板组件
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 创建 `src/components/FontPicker.tsx`
  - 实现下拉面板布局：
    - 顶部：搜索框
    - 中部：分类标签栏（中文字体、英文字体、其他语言、可爱风、哥特风、手写体、衬线体、无衬线体等）
    - 底部：字体列表（网格或列表布局）
  - 每个字体项显示字体名称（用该字体样式预览）
  - 支持点击分类标签切换
  - 支持搜索框实时过滤
  - 面板宽度约 320px，高度约 400px，支持滚动
  - 点击外部关闭面板
- **Acceptance Criteria Addressed**: [AC-4, AC-5]
- **Test Requirements**:
  - 面板能正确打开和关闭
  - 分类切换正常
  - 搜索过滤正常
  - 字体预览正确显示

## [ ] Task 5: 在工具栏集成字体选择器
- **Priority**: P0
- **Depends On**: Task 1, Task 3, Task 4
- **Description**:
  - 在 RichTextEditor.tsx 中加粗按钮前面添加字体选择器
  - 默认显示"系统默认"或当前选中文字的字体
  - 点击打开 FontPicker 面板
  - 选择字体后：
    - 调用 `editor.chain().focus().setFontFamily(fontFamily).run()`
    - 加载对应的 Google Font
    - 关闭面板
  - 显示当前选中文字的字体状态（如果有）
- **Acceptance Criteria Addressed**: [AC-1, AC-6]
- **Test Requirements**:
  - 字体选择器显示在正确位置
  - 选择字体后选中文字字体改变
  - 字体状态正确显示

## [ ] Task 6: 添加 i18n 翻译
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 在 `src/i18n/index.ts` 中添加字体相关翻译键：
    - `editor.font`: 字体
    - `editor.font_system`: 系统默认
    - `editor.font_search`: 搜索字体
    - `editor.font_category_chinese`: 中文字体
    - `editor.font_category_english`: 英文字体
    - `editor.font_category_other`: 其他语言
    - `editor.font_style_cute`: 可爱风
    - `editor.font_style_gothic`: 哥特风
    - `editor.font_style_handwriting`: 手写体
    - `editor.font_style_serif`: 衬线体
    - `editor.font_style_sans`: 无衬线体
  - 支持 zh/en/ja/ko 四种语言
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - 所有语言翻译完整

## [ ] Task 7: 添加编辑器字体样式支持
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - 在 `src/index.css` 中添加 `.ProseMirror` 下不同 font-family 的样式支持
  - 确保编辑器内容能正确显示各种字体
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - 编辑器内容正确显示所选字体

## [ ] Task 8: 验证构建和功能
- **Priority**: P0
- **Depends On**: All above
- **Description**:
  - 运行 `npm run build` 确保构建成功
  - 验证字体选择器功能：
    - 打开编辑器
    - 选中文字
    - 打开字体选择器
    - 选择不同分类的字体
    - 搜索字体
    - 确认文字字体改变
- **Acceptance Criteria Addressed**: All
- **Test Requirements**:
  - 构建无错误
  - 功能验证通过

# Task Dependencies
- Task 3 depends on Task 2
- Task 4 depends on Task 2
- Task 5 depends on Task 1, Task 3, Task 4
- Task 7 depends on Task 1
- Task 8 depends on All above
