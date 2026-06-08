import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '../i18n';

interface ContainerItem {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  category: string;
  icon: string;
  gradient: [string, string];
  color: string;
  hotRating: number;
  installs: string;
  scene: 'editor' | 'knowledge' | 'both';
  version: string;
  developer: string;
  published: string;
  updated: string;
  features: string[];
  screenshots: { label: string; bgColor: string }[];
  changelog: { version: string; date: string; changes: string[] }[];
  usageGuide: { step: number; title: string; description: string }[];
  videoUrl?: string;
}

const CONTAINERS: ContainerItem[] = [
  {
    id: 'toc',
    name: '目录导航',
    description: '自动生成页面结构化目录，支持多级标题嵌套，一键跳转到对应章节',
    detailedDescription: '目录导航容器能够自动扫描页面中的所有标题元素，实时生成结构化的文档目录树。支持 H1 至 H6 多级标题嵌套展示，点击目录项可平滑滚动至对应章节位置。用户可自由折叠或展开目录层级，并跟随页面滚动自动高亮当前所在章节。',
    category: '排版',
    icon: '📑',
    gradient: ['#FF743D', '#FF5E1A'],
    color: '#FF743D',
    hotRating: 9.2,
    installs: '15.2k',
    scene: 'editor',
    version: '2.4.1',
    developer: 'KB Lab',
    published: '2025-11-15',
    updated: '2026-05-20',
    features: ['自动提取页面标题生成目录树', '支持多级标题嵌套（H1-H6）', '点击目录项平滑滚动到对应位置', '支持折叠/展开目录', '目录项悬浮高亮跟随滚动位置'],
    screenshots: [
      { label: '侧边栏目录展示', bgColor: '#fff3ed' },
      { label: '多级标题嵌套', bgColor: '#ffe8dd' },
      { label: '高亮跟随效果', bgColor: '#fef0e8' },
    ],
    changelog: [
      { version: '2.4.1', date: '2026-05-20', changes: ['修复特定场景下目录项高亮偏移问题', '优化移动端触摸滚动体验'] },
      { version: '2.3.0', date: '2026-03-12', changes: ['新增目录折叠/展开记忆功能', '支持自定义目录标题样式', '性能优化：大型文档目录生成速度提升 40%'] },
      { version: '2.1.0', date: '2026-01-08', changes: ['支持 H5-H6 深层标题', '新增目录搜索过滤功能'] },
    ],
    usageGuide: [
      { step: 1, title: '添加目录容器', description: '在编辑器工具栏中选择"目录导航"容器，将其插入到页面中需要显示目录的位置。' },
      { step: 2, title: '编写结构化内容', description: '使用 H1-H6 标题格式编写您的文档内容，容器会自动识别并生成对应的目录结构。' },
      { step: 3, title: '自定义目录样式', description: '在容器设置面板中调整目录深度、折叠状态和显示样式，满足不同场景需求。' },
    ],
  },
  {
    id: 'code-highlighter',
    name: '代码高亮',
    description: '增强代码块语法高亮，支持 50+ 编程语言，多种主题配色方案',
    detailedDescription: '代码高亮容器为您的知识库和文档提供专业的代码展示体验。支持超过 50 种主流编程语言的语法高亮，内置 10 余种精心设计的代码主题配色方案。提供行号显示、代码块一键复制、自动语言识别等实用功能，让技术文档更加清晰易读。',
    category: '工具',
    icon: '</>',
    gradient: ['#10B981', '#059669'],
    color: '#10B981',
    hotRating: 9.5,
    installs: '18.7k',
    scene: 'editor',
    version: '3.2.0',
    developer: 'SyntaxTeam',
    published: '2025-10-20',
    updated: '2026-06-01',
    features: ['支持 50+ 编程语言语法高亮', '10+ 种代码主题配色', '行号显示与高亮', '代码块一键复制', '自动识别语言类型'],
    screenshots: [
      { label: '语法高亮效果', bgColor: '#ecfdf5' },
      { label: '主题配色切换', bgColor: '#d1fae5' },
      { label: '行号与复制', bgColor: '#a7f3d0' },
    ],
    changelog: [
      { version: '3.2.0', date: '2026-06-01', changes: ['新增 Rust、Zig 语言支持', '优化暗色主题在移动端的显示效果', '修复代码块内 Markdown 解析冲突'] },
      { version: '3.0.0', date: '2026-03-20', changes: ['重构语法解析引擎，性能提升 60%', '新增 4 款专业代码主题'] },
      { version: '2.5.0', date: '2026-01-15', changes: ['新增自动语言识别功能', '支持代码块内搜索替换'] },
    ],
    usageGuide: [
      { step: 1, title: '插入代码块', description: '在编辑器中点击"代码高亮"容器按钮，或直接使用 Markdown 代码块语法（三个反引号）创建代码区域。' },
      { step: 2, title: '指定编程语言', description: '在代码块开头标注语言名称（如 python、javascript），容器将自动应用对应的语法高亮规则。' },
      { step: 3, title: '切换主题与复制', description: '通过代码块右上角的工具栏切换显示主题，或点击复制按钮将代码一键复制到剪贴板。' },
    ],
  },
  {
    id: 'math-formula',
    name: '数学公式',
    description: 'LaTeX 数学公式实时渲染，支持行内公式与独立公式块，内置常用符号面板',
    detailedDescription: '数学公式容器基于 LaTeX 渲染引擎，为您提供专业级的数学公式编辑与展示能力。支持行内公式（$...$）和独立公式块（$$...$$）两种模式，实时渲染效果所见即所得。内置常用数学符号快速插入面板，并支持公式编号、交叉引用以及导出为 MathML 格式，完美适配学术写作场景。',
    category: '数据',
    icon: '∑',
    gradient: ['#3B82F6', '#2563EB'],
    color: '#3B82F6',
    hotRating: 8.9,
    installs: '11.3k',
    scene: 'editor',
    version: '1.8.3',
    developer: 'MathCore',
    published: '2025-12-01',
    updated: '2026-04-15',
    features: ['LaTeX 公式实时渲染', '行内公式与独立公式块', '内置常用数学符号面板', '公式编号与交叉引用', '支持导出为 MathML'],
    screenshots: [
      { label: '公式渲染效果', bgColor: '#eff6ff' },
      { label: '符号面板界面', bgColor: '#dbeafe' },
      { label: '公式编号引用', bgColor: '#bfdbfe' },
    ],
    changelog: [
      { version: '1.8.3', date: '2026-04-15', changes: ['修复复杂矩阵公式渲染偏移问题', '新增 \\text{} 中文支持优化'] },
      { version: '1.7.0', date: '2026-02-20', changes: ['新增公式编号与交叉引用功能', '符号面板新增 200+ 常用符号'] },
      { version: '1.5.0', date: '2025-12-20', changes: ['支持 MathML 导出', '优化大型公式渲染性能'] },
    ],
    usageGuide: [
      { step: 1, title: '插入数学公式', description: '使用 $...$ 插入行内公式（如 $E=mc^2$），或使用 $$...$$ 插入独立公式块。也可以通过工具栏中的公式按钮快速插入。' },
      { step: 2, title: '使用符号面板', description: '点击编辑器中的公式符号面板按钮，浏览和搜索常用数学符号、希腊字母和运算符号，点击即可插入。' },
      { step: 3, title: '添加公式编号', description: '在独立公式块末尾添加 \\tag{1} 标记为公式添加编号，使用 \\label 和 \\ref 实现公式间的交叉引用。' },
    ],
  },
  {
    id: 'callout',
    name: '提示框',
    description: '丰富的提示框样式组件，支持信息、警告、成功、错误等多种类型',
    detailedDescription: '提示框容器（Callout）为文档提供了丰富的上下文信息展示方式。预设五种提示类型——信息、警告、成功、错误和笔记，每种类型都有独特的图标和配色方案。支持自定义颜色和图标、可折叠面板以及 Markdown 富文本内容，帮助您更有效地组织和传达文档中的关键信息。',
    category: '样式',
    icon: '💡',
    gradient: ['#6366F1', '#4F46E5'],
    color: '#6366F1',
    hotRating: 8.5,
    installs: '9.8k',
    scene: 'editor',
    version: '2.1.0',
    developer: 'UILab',
    published: '2025-09-10',
    updated: '2026-03-28',
    features: ['5 种预设提示类型（信息/警告/成功/错误/笔记）', '支持自定义颜色和图标', '可折叠提示框', 'Markdown 内容支持', '一键插入提示框模板'],
    screenshots: [
      { label: '信息提示框', bgColor: '#eef2ff' },
      { label: '警告提示框', bgColor: '#e0e7ff' },
      { label: '成功提示框', bgColor: '#c7d2fe' },
    ],
    changelog: [
      { version: '2.1.0', date: '2026-03-28', changes: ['新增自定义图标功能，支持 Emoji 和 SVG', '优化折叠动画流畅度'] },
      { version: '2.0.0', date: '2026-01-10', changes: ['重构配色系统，支持深色模式', '新增"笔记"类型提示框'] },
      { version: '1.6.0', date: '2025-11-05', changes: ['支持 Markdown 富文本内容', '新增一键插入模板功能'] },
    ],
    usageGuide: [
      { step: 1, title: '插入提示框', description: '在编辑器工具栏中选择"提示框"容器，或输入 /callout 快速指令插入，选择需要的提示类型。' },
      { step: 2, title: '编辑提示内容', description: '在提示框内部编写 Markdown 格式内容，支持列表、链接、代码等富文本元素。' },
      { step: 3, title: '自定义外观', description: '在提示框设置中调整颜色主题、图标样式和默认折叠状态，满足个性化展示需求。' },
    ],
  },
  {
    id: 'columns',
    name: '分栏布局',
    description: '灵活的多栏布局容器，自由拖拽调整列宽，支持 2-5 栏任意组合',
    detailedDescription: '分栏布局容器让您的页面内容组织更加灵活高效。支持 2 至 5 栏任意组合的栅格布局，每栏可独立嵌套任意内容（文本、图片、表格等）。提供拖拽调整列宽、响应式自适应和整列内容复制/移动等高级功能，是创建复杂页面布局的理想工具。',
    category: '排版',
    icon: '⬜',
    gradient: ['#14B8A6', '#0D9488'],
    color: '#14B8A6',
    hotRating: 8.3,
    installs: '8.6k',
    scene: 'editor',
    version: '1.5.2',
    developer: 'LayoutPro',
    published: '2025-10-05',
    updated: '2026-02-10',
    features: ['支持 2-5 栏灵活布局', '拖拽调整列宽', '响应式自适应', '列内支持任意内容嵌套', '复制/移动整列内容'],
    screenshots: [
      { label: '两栏布局效果', bgColor: '#f0fdfa' },
      { label: '三栏拖拽调整', bgColor: '#ccfbf1' },
      { label: '响应式自适应', bgColor: '#99f6e4' },
    ],
    changelog: [
      { version: '1.5.2', date: '2026-02-10', changes: ['修复拖拽调整列宽时的边界溢出问题', '优化移动端响应式折叠行为'] },
      { version: '1.4.0', date: '2025-12-15', changes: ['新增列宽比例预设（1:1, 1:2, 2:1 等）', '支持列间最小宽度限制'] },
      { version: '1.2.0', date: '2025-10-20', changes: ['支持整列内容复制和移动', '新增 5 栏布局支持'] },
    ],
    usageGuide: [
      { step: 1, title: '插入分栏容器', description: '在编辑器中选择"分栏布局"容器，选择需要的栏数（2-5栏）和初始列宽比例。' },
      { step: 2, title: '填充各栏内容', description: '在每一栏中自由添加文本、图片、表格或其他容器组件，各栏内容完全独立编辑。' },
      { step: 3, title: '调整布局参数', description: '拖拽栏间分隔线实时调整列宽，或在设置面板中精确设置各栏宽度比例。' },
    ],
  },
  {
    id: 'accordion',
    name: '折叠内容',
    description: '可折叠的内容区块组件，适合隐藏详细说明、常见问题解答等辅助信息',
    detailedDescription: '折叠内容容器（Accordion）为您提供优雅的内容收纳方案。适用于常见问题解答（FAQ）、详细说明、配置参数和长内容的分段展示。支持自定义折叠标题与图标、默认展开/收起状态设置、嵌套折叠面板以及平滑的展开动画效果，有效提升页面的信息密度和阅读体验。',
    category: '交互',
    icon: '🔽',
    gradient: ['#84CC16', '#65A30D'],
    color: '#84CC16',
    hotRating: 7.9,
    installs: '6.4k',
    scene: 'editor',
    version: '1.3.0',
    developer: 'WidgetLab',
    published: '2025-08-20',
    updated: '2026-01-18',
    features: ['可折叠内容面板', '自定义折叠标题和图标', '支持默认展开/收起状态', '嵌套折叠支持', '动画展开/收起过渡效果'],
    screenshots: [
      { label: '折叠状态展示', bgColor: '#f7fee7' },
      { label: '展开内容面板', bgColor: '#ecfccb' },
      { label: '嵌套折叠效果', bgColor: '#d9f99d' },
    ],
    changelog: [
      { version: '1.3.0', date: '2026-01-18', changes: ['新增嵌套折叠支持（最多 3 层）', '优化动画性能，使用 CSS transform 替代 height 动画'] },
      { version: '1.1.0', date: '2025-10-10', changes: ['新增自定义图标功能', '支持全部展开/全部收起快捷操作'] },
    ],
    usageGuide: [
      { step: 1, title: '插入折叠容器', description: '在编辑器中点击"折叠内容"容器按钮，输入折叠标题和初始内容。' },
      { step: 2, title: '编辑折叠内容', description: '展开折叠面板后，在内容区域编写 Markdown 格式的详细内容，支持所有富文本元素。' },
      { step: 3, title: '配置高级选项', description: '在设置面板中调整默认展开状态、自定义展开/收起图标，以及是否允许同时展开多个面板。' },
    ],
  },
  {
    id: 'word-count',
    name: '字数统计',
    description: '实时统计文章字数、段落数、字符数和预估阅读时长，支持底部状态栏显示',
    detailedDescription: '字数统计容器为您的写作提供实时的数据反馈，帮助您精准把控文章篇幅。自动统计中文字数、英文字词数、字符数、段落数和预估阅读时长，并在编辑器底部状态栏中优雅展示。支持选中文本的字数统计和排除空格/标点等自定义统计选项，是内容创作者的得力助手。',
    category: '工具',
    icon: '📝',
    gradient: ['#6B7280', '#4B5563'],
    color: '#6B7280',
    hotRating: 7.6,
    installs: '5.2k',
    scene: 'editor',
    version: '1.2.1',
    developer: 'UtilStack',
    published: '2025-09-25',
    updated: '2025-12-05',
    features: ['实时统计字数/字符数/段落数', '预估阅读时长', '底部状态栏显示', '选中文本字数统计', '支持排除空格/标点选项'],
    screenshots: [
      { label: '底部状态栏', bgColor: '#f9fafb' },
      { label: '选中文本统计', bgColor: '#f3f4f6' },
      { label: '统计详情面板', bgColor: '#e5e7eb' },
    ],
    changelog: [
      { version: '1.2.1', date: '2025-12-05', changes: ['修复中英文混排时字符数统计偏差', '优化状态栏在窄屏下的显示布局'] },
      { version: '1.1.0', date: '2025-10-20', changes: ['新增选中文本字数统计', '新增预估阅读时长功能', '支持排除空格/标点选项'] },
    ],
    usageGuide: [
      { step: 1, title: '启用字数统计', description: '在编辑器底部状态栏中点击"字数统计"图标启用该功能，统计数据将实时显示在状态栏右侧。' },
      { step: 2, title: '查看详细统计', description: '点击状态栏中的统计数字可展开详细面板，查看字数、字符数、段落数和阅读时长的完整数据。' },
      { step: 3, title: '自定义统计规则', description: '在设置中调整统计选项，如是否包含标点符号、空格字符以及中英文统计方式。' },
    ],
  },
  {
    id: 'mindmap',
    name: '思维导图',
    description: '将结构化内容自动转换为可编辑的思维导图，支持多种布局和导出格式',
    detailedDescription: '思维导图容器能够将您的结构化文档内容自动转换为可视化思维导图。基于标题层级快速生成节点树，支持自由拖拽调整节点结构和层级关系。内置树形图、鱼骨图、组织结构图等多种布局模板，支持在节点中嵌入图片和链接，并可将导图导出为 PNG、SVG 和 PDF 等多种格式。',
    category: '数据',
    icon: '🧠',
    gradient: ['#F59E0B', '#D97706'],
    color: '#F59E0B',
    hotRating: 9.1,
    installs: '14.3k',
    scene: 'knowledge',
    version: '3.0.2',
    developer: 'MindFlow',
    published: '2025-11-01',
    updated: '2026-05-28',
    features: ['自动从标题层级生成思维导图', '自由拖拽节点调整结构', '多种布局模板（树形/鱼骨/组织结构）', '支持图片和链接节点', '导出为 PNG/SVG/PDF'],
    screenshots: [
      { label: '树形导图展示', bgColor: '#fffbeb' },
      { label: '鱼骨图布局', bgColor: '#fef3c7' },
      { label: '导出设置面板', bgColor: '#fde68a' },
    ],
    changelog: [
      { version: '3.0.2', date: '2026-05-28', changes: ['修复大规模节点（500+）拖拽卡顿问题', '优化导出 PNG 分辨率设置'] },
      { version: '3.0.0', date: '2026-04-01', changes: ['全新渲染引擎，支持 1000+ 节点流畅交互', '新增组织结构图布局模板', '新增节点搜索和定位功能'] },
      { version: '2.5.0', date: '2026-02-10', changes: ['新增鱼骨图布局', '支持节点内嵌图片和链接'] },
    ],
    usageGuide: [
      { step: 1, title: '创建思维导图', description: '在知识库页面中插入"思维导图"容器，容器将自动根据当前页面的标题层级结构生成初始导图。' },
      { step: 2, title: '编辑导图结构', description: '拖拽节点调整层级关系，双击节点编辑文字内容，使用右键菜单添加、删除或复制节点。' },
      { step: 3, title: '切换布局与导出', description: '在顶部工具栏中切换不同的布局模板，完成编辑后通过导出菜单将导图保存为 PNG、SVG 或 PDF。' },
    ],
    videoUrl: 'https://example.com/mindmap-demo.mp4',
  },
  {
    id: 'flowchart',
    name: '流程图',
    description: 'Mermaid 语法绘制专业流程图、时序图和ER图，实时预览所见即所得',
    detailedDescription: '流程图容器基于 Mermaid 图表引擎，帮助您在知识库中创建专业的流程图、时序图、ER 图、甘特图等多种图表类型。使用简洁的文本语法描述图表结构，实时预览所见即所得。内置丰富的图形模板库和快捷插入功能，即使是图表绘制新手也能快速上手，并支持导出为高质量 SVG 和 PNG 格式。',
    category: '嵌入',
    icon: '🔀',
    gradient: ['#EC4899', '#DB2777'],
    color: '#EC4899',
    hotRating: 8.8,
    installs: '12.6k',
    scene: 'knowledge',
    version: '2.7.0',
    developer: 'ChartStudio',
    published: '2025-10-15',
    updated: '2026-04-22',
    features: ['Mermaid 语法解析与渲染', '流程图/时序图/ER图/甘特图', '实时预览编辑器', '内置图形模板库', '导出为 SVG 和 PNG'],
    screenshots: [
      { label: '流程图渲染', bgColor: '#fdf2f8' },
      { label: '时序图展示', bgColor: '#fce7f3' },
      { label: '模板库面板', bgColor: '#fbcfe8' },
    ],
    changelog: [
      { version: '2.7.0', date: '2026-04-22', changes: ['新增甘特图类型支持', '新增 50+ 内置图形模板', '优化实时预览渲染速度'] },
      { version: '2.5.0', date: '2026-02-15', changes: ['新增 ER 图支持', '支持图表内 Markdown 文本渲染'] },
      { version: '2.2.0', date: '2025-12-10', changes: ['重构实时预览引擎', '支持导出时自定义尺寸和背景色'] },
    ],
    usageGuide: [
      { step: 1, title: '插入流程图容器', description: '在知识库页面中选择"流程图"容器，从内置模板库中选择一个模板快速开始，或从空白图表开始创建。' },
      { step: 2, title: '编写 Mermaid 语法', description: '在左侧代码编辑区使用 Mermaid 语法描述图表结构，右侧预览区将实时显示渲染结果。' },
      { step: 3, title: '导出与分享', description: '完成图表设计后，通过导出按钮将图表保存为 SVG 或 PNG 格式，用于文档嵌入或对外分享。' },
    ],
    videoUrl: 'https://example.com/flowchart-demo.mp4',
  },
  {
    id: 'advanced-table',
    name: '高级表格',
    description: '增强型表格组件，支持排序、筛选、公式计算和条件格式化',
    detailedDescription: '高级表格容器为您的知识库提供超越普通 Markdown 表格的增强功能。支持多条件排序与筛选、单元格公式计算（类似电子表格）、条件格式化（颜色标尺、数据条、图标集）以及列宽拖拽调整。支持 CSV 数据的导入导出，是数据分析、项目管理和报表展示的理想工具。',
    category: '数据',
    icon: '📊',
    gradient: ['#0891B2', '#0E7490'],
    color: '#0891B2',
    hotRating: 8.2,
    installs: '10.1k',
    scene: 'knowledge',
    version: '2.3.0',
    developer: 'DataGrid',
    published: '2025-09-05',
    updated: '2026-03-15',
    features: ['表格排序与多条件筛选', '单元格公式计算', '条件格式化（颜色标尺/数据条）', '列宽拖拽调整', '表格数据导入/导出 CSV'],
    screenshots: [
      { label: '排序筛选功能', bgColor: '#ecfeff' },
      { label: '条件格式化', bgColor: '#cffafe' },
      { label: '公式计算栏', bgColor: '#a5f3fc' },
    ],
    changelog: [
      { version: '2.3.0', date: '2026-03-15', changes: ['新增条件格式化功能（颜色标尺、数据条、图标集）', '优化大数据量（10000+ 行）渲染性能'] },
      { version: '2.1.0', date: '2026-01-20', changes: ['新增单元格公式计算（SUM/AVG/COUNT 等）', '支持列宽拖拽调整'] },
      { version: '1.8.0', date: '2025-11-10', changes: ['新增多条件筛选功能', '支持 CSV 导入/导出'] },
    ],
    usageGuide: [
      { step: 1, title: '创建高级表格', description: '在知识库页面中插入"高级表格"容器，设置初始行列数，或从 CSV 文件导入数据快速填充表格。' },
      { step: 2, title: '配置表格功能', description: '在表头右键菜单中启用排序、筛选功能，在单元格中输入以 = 开头的公式进行计算。' },
      { step: 3, title: '应用条件格式', description: '选中单元格区域后，在格式面板中设置条件格式化规则，如根据数值范围自动改变背景颜色。' },
    ],
  },
  {
    id: 'pdf-preview',
    name: 'PDF预览',
    description: '直接在知识库页面中嵌入PDF文档预览，支持翻页、缩放和搜索',
    detailedDescription: 'PDF预览容器让您无需离开知识库页面即可查看和阅读 PDF 文档。支持内嵌式全功能预览，提供翻页导航、页码跳转、缩放查看和全屏模式。内置文本搜索与高亮功能，可快速定位文档中的关键信息。侧边栏提供页面缩略图导航，方便在大篇幅 PDF 中快速跳转。',
    category: '嵌入',
    icon: '📄',
    gradient: ['#DC2626', '#B91C1C'],
    color: '#DC2626',
    hotRating: 8.1,
    installs: '9.5k',
    scene: 'knowledge',
    version: '1.9.1',
    developer: 'DocView',
    published: '2025-08-15',
    updated: '2026-02-28',
    features: ['PDF 文档内嵌预览', '翻页和页码跳转', '缩放与全屏查看', '文本搜索与高亮', 'PDF 页面缩略图导航'],
    screenshots: [
      { label: '内嵌预览效果', bgColor: '#fef2f2' },
      { label: '文本搜索高亮', bgColor: '#fee2e2' },
      { label: '缩略图导航', bgColor: '#fecaca' },
    ],
    changelog: [
      { version: '1.9.1', date: '2026-02-28', changes: ['修复加密 PDF 加载异常问题', '优化大文件（100MB+）加载速度'] },
      { version: '1.8.0', date: '2026-01-05', changes: ['新增文本搜索与高亮功能', '新增全屏查看模式'] },
      { version: '1.5.0', date: '2025-10-25', changes: ['新增页面缩略图侧边栏导航', '支持页码直接跳转'] },
    ],
    usageGuide: [
      { step: 1, title: '上传或链接 PDF', description: '在知识库页面中插入"PDF预览"容器，上传本地 PDF 文件或粘贴外部 PDF 链接地址。' },
      { step: 2, title: '浏览和阅读', description: '使用页面底部的翻页控件浏览文档，或在缩略图侧边栏中快速跳转到指定页面。' },
      { step: 3, title: '搜索与标注', description: '点击搜索图标打开文本搜索面板，输入关键词快速定位。使用缩放控件调整视图大小以获得最佳阅读体验。' },
    ],
  },
  {
    id: 'gallery',
    name: '图片画廊',
    description: '以画廊模式优雅展示图片集，支持灯箱预览、懒加载和多种排列布局',
    detailedDescription: '图片画廊容器为您的知识库提供专业的图片集展示方案。支持网格、瀑布流和轮播三种画廊布局模式，点击图片可进入灯箱全屏预览。内置懒加载和渐进式加载技术，确保大量图片时也能流畅浏览。支持图片批量上传与拖拽排序，完美兼容 GIF 和 WebP 等现代图片格式。',
    category: '媒体',
    icon: '🖼️',
    gradient: ['#8B5CF6', '#7C3AED'],
    color: '#8B5CF6',
    hotRating: 8.7,
    installs: '11.8k',
    scene: 'knowledge',
    version: '2.5.0',
    developer: 'MediaKit',
    published: '2025-11-20',
    updated: '2026-05-10',
    features: ['多种画廊布局（网格/瀑布流/轮播）', '图片灯箱全屏预览', '懒加载与渐进式加载', '图片批量上传与拖拽排序', '支持 GIF 和 WebP 格式'],
    screenshots: [
      { label: '网格布局展示', bgColor: '#f5f3ff' },
      { label: '灯箱预览模式', bgColor: '#ede9fe' },
      { label: '瀑布流排列', bgColor: '#ddd6fe' },
    ],
    changelog: [
      { version: '2.5.0', date: '2026-05-10', changes: ['新增轮播布局模式', '支持 GIF 动图自动播放控制', '优化瀑布流布局计算精度'] },
      { version: '2.2.0', date: '2026-03-01', changes: ['新增灯箱全屏预览模式', '支持键盘左右键切换图片'] },
      { version: '2.0.0', date: '2026-01-10', changes: ['重构加载系统，支持渐进式加载', '新增图片批量上传和拖拽排序'] },
    ],
    usageGuide: [
      { step: 1, title: '创建图片画廊', description: '在知识库页面中插入"图片画廊"容器，批量上传您的图片文件或粘贴图片链接地址。' },
      { step: 2, title: '选择布局模式', description: '在画廊设置中切换网格、瀑布流或轮播布局，选择最适合您图片内容的展示方式。' },
      { step: 3, title: '管理与预览', description: '拖拽图片调整排列顺序，点击任意图片进入灯箱模式进行全屏预览和幻灯片播放。' },
    ],
  },
  {
    id: 'tabs',
    name: '标签页',
    description: '标签式内容切换容器，有效组织相关内容，节省页面空间并提升可读性',
    detailedDescription: '标签页容器（Tabs）帮助您在有限页面空间内高效组织多组相关内容。用户点击标签即可无缝切换查看不同面板的内容，支持顶部、侧边和胶囊三种标签样式。提供标签页拖拽排序、状态记忆等高级功能，每个标签页内均完整支持 Markdown 富文本编辑。',
    category: '交互',
    icon: '📋',
    gradient: ['#F97316', '#EA580C'],
    color: '#F97316',
    hotRating: 8.6,
    installs: '10.9k',
    scene: 'knowledge',
    version: '1.7.2',
    developer: 'UILab',
    published: '2025-10-10',
    updated: '2026-03-08',
    features: ['多标签页内容切换', '标签页拖拽排序', '多种标签样式（顶部/侧边/胶囊）', '标签页内支持 Markdown', '标签页状态记忆'],
    screenshots: [
      { label: '顶部标签样式', bgColor: '#fff7ed' },
      { label: '侧边标签布局', bgColor: '#ffedd5' },
      { label: '胶囊标签样式', bgColor: '#fed7aa' },
    ],
    changelog: [
      { version: '1.7.2', date: '2026-03-08', changes: ['修复移动端标签页切换手势冲突', '优化标签页切换动画流畅度'] },
      { version: '1.6.0', date: '2026-01-25', changes: ['新增侧边标签样式', '新增标签页拖拽排序功能'] },
      { version: '1.4.0', date: '2025-11-20', changes: ['新增胶囊标签样式', '支持标签页状态记忆（刷新后保持选中状态）'] },
    ],
    usageGuide: [
      { step: 1, title: '插入标签页容器', description: '在编辑器中点击"标签页"容器按钮，系统会创建带有默认两个标签页的面板结构。' },
      { step: 2, title: '管理标签页', description: '点击 + 按钮添加新标签页，双击标签名称进行重命名，拖拽标签调整排列顺序。' },
      { step: 3, title: '切换样式与设置', description: '在容器设置中选择标签样式（顶部/侧边/胶囊），配置默认选中标签页和状态记忆选项。' },
    ],
  },
  {
    id: 'emoji-picker',
    name: '表情选择',
    description: '快速搜索和插入表情符号，支持分类浏览、皮肤色调和最近使用记录',
    detailedDescription: '表情选择容器提供了一个功能齐全的表情符号选择器，内置超过 1000 个精心分类的表情符号。支持关键词快速搜索、按类别浏览、多种皮肤色调选择和最近使用记录，可通过快捷键快速调出面板，让您的文档表达更加生动有趣。适用于编辑器和知识库两种页面场景。',
    category: '嵌入',
    icon: '😊',
    gradient: ['#D946EF', '#C026D3'],
    color: '#D946EF',
    hotRating: 9.0,
    installs: '13.4k',
    scene: 'both',
    version: '2.2.0',
    developer: 'EmojiStudio',
    published: '2025-12-10',
    updated: '2026-05-15',
    features: ['1000+ 表情符号分类浏览', '关键词快速搜索表情', '皮肤色调选择', '最近使用记录', '支持键盘快捷键快速调用'],
    screenshots: [
      { label: '分类浏览面板', bgColor: '#fdf4ff' },
      { label: '搜索筛选功能', bgColor: '#fae8ff' },
      { label: '皮肤色调选择', bgColor: '#f5d0fe' },
    ],
    changelog: [
      { version: '2.2.0', date: '2026-05-15', changes: ['新增 2026 Emoji 标准表情（50+）', '优化搜索算法，支持拼音模糊匹配'] },
      { version: '2.0.0', date: '2026-03-10', changes: ['全新 UI 设计，更大的表情预览', '新增皮肤色调选择功能', '新增最近使用记录'] },
      { version: '1.5.0', date: '2026-01-05', changes: ['新增键盘快捷键 Ctrl+E 快速调用', '支持表情添加到收藏夹'] },
    ],
    usageGuide: [
      { step: 1, title: '打开表情面板', description: '在编辑器中按 Ctrl+E（Mac: ⌘+E）快捷键，或点击工具栏中的表情图标按钮打开表情选择面板。' },
      { step: 2, title: '搜索与浏览', description: '在搜索框中输入关键词（如"笑"、"心"）快速查找表情，或切换分类标签按类别浏览。' },
      { step: 3, title: '调整皮肤色调', description: '点击面板底部的肤色选择器切换表情的皮肤色调，选中的表情将自动插入到光标位置。' },
    ],
  },
  {
    id: 'video-embed',
    name: '视频嵌入',
    description: '在文档中嵌入外部视频内容，支持主流视频平台链接自动识别与响应式播放',
    detailedDescription: '视频嵌入容器让您可以轻松在知识库文档中集成外部视频内容。支持 YouTube 和 Bilibili 等主流视频平台的链接自动识别，粘贴链接即可生成响应式视频播放器。提供 16:9、4:3 和 1:1 三种播放器比例选项，自动提取视频封面缩略图，并支持播放列表功能，适配编辑器和知识库两种场景。',
    category: '媒体',
    icon: '🎬',
    gradient: ['#EF4444', '#DC2626'],
    color: '#EF4444',
    hotRating: 8.4,
    installs: '8.9k',
    scene: 'both',
    version: '1.6.3',
    developer: 'MediaKit',
    published: '2025-11-10',
    updated: '2026-04-05',
    features: ['YouTube/Bilibili 链接自动识别', '响应式视频播放器', '自定义播放器比例（16:9/4:3/1:1）', '自动封面缩略图', '播放列表支持'],
    screenshots: [
      { label: '视频嵌入播放', bgColor: '#fef2f2' },
      { label: '链接识别界面', bgColor: '#fee2e2' },
      { label: '播放列表管理', bgColor: '#fecaca' },
    ],
    changelog: [
      { version: '1.6.3', date: '2026-04-05', changes: ['修复 Bilibili 短链接识别失败问题', '优化移动端播放器响应式布局'] },
      { version: '1.5.0', date: '2026-02-15', changes: ['新增播放列表功能', '支持自定义播放器比例'] },
      { version: '1.3.0', date: '2025-12-20', changes: ['新增自动封面缩略图提取', '支持 Vimeo 平台链接'] },
    ],
    usageGuide: [
      { step: 1, title: '插入视频链接', description: '在编辑器或知识库页面中插入"视频嵌入"容器，粘贴 YouTube 或 Bilibili 的视频链接地址。' },
      { step: 2, title: '配置播放器', description: '在容器设置中选择播放器比例（16:9/4:3/1:1），设置是否自动播放和显示控制栏。' },
      { step: 3, title: '管理播放列表', description: '在播放列表模式下，可添加多个视频链接，用户可在嵌入的播放器中连续切换观看。' },
    ],
  },
];

const CATEGORIES = ['全部', '排版', '工具', '数据', '媒体', '交互', '嵌入'];

export function ContainerPage() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedItem, setSelectedItem] = useState<ContainerItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'description' | 'features' | 'tutorial' | 'changelog' | 'info'>('description');

  useEffect(() => {
    if (selectedItem) {
      const timer = setTimeout(() => setModalVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setModalVisible(false);
    }
  }, [selectedItem]);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedItem(null);
      setActiveModalTab('description');
    }, 200);
  };

  const filtered = useMemo(() => {
    let list = CONTAINERS;
    if (activeCategory !== '全部') {
      list = list.filter(c => c.category === activeCategory);
    }
    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchText, activeCategory]);

  const modalTabs: { key: typeof activeModalTab; label: string }[] = [
    { key: 'description', label: t('container.detail.description') },
    { key: 'features', label: t('container.detail.features') },
    { key: 'tutorial', label: t('container.detail.tutorial') },
    { key: 'changelog', label: t('container.detail.changelog') },
    { key: 'info', label: t('container.detail.other_info') },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: '#f5f5f5' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', padding: '32px 40px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left: icon + title + subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FF743D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📦</div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>{t('container.title')}</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '4px 0 0 0' }}>{t('container.subtitle')}</p>
            </div>
          </div>
          {/* Right: action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ padding: '8px 20px', borderRadius: 9999, border: 'none', background: '#000', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{t('container.upload')}</button>
            <button style={{ padding: '8px 20px', borderRadius: 9999, border: 'none', background: '#000', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{t('container.my')}</button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 40px 0' }}>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#9ca3af', pointerEvents: 'none', lineHeight: 1 }}>🔍</span>
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={t('container.search_placeholder')}
            style={{ width: '100%', padding: '10px 16px 10px 42px', borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 14, color: '#1a1a1a', outline: 'none', background: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#FF743D'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,116,61,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 18px',
                borderRadius: 9999,
                border: 'none',
                background: activeCategory === cat ? '#FF743D' : '#1a1a1a',
                color: '#fff',
                fontSize: 13,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <button style={{ padding: '6px 18px', borderRadius: 9999, border: 'none', background: '#1a1a1a', color: '#fff', fontSize: 13, cursor: 'pointer' }}>{t('container.filter')}</button>
      </div>

      {/* Card Grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px 40px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af', fontSize: 15 }}>
            {t('container.empty_text')}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Cover */}
                <div style={{ aspectRatio: '16/10', borderRadius: 12, background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 10 }}>
                  {item.icon}
                </div>
                {/* Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{item.name}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>⭐ {item.hotRating} · {item.installs}</span>
                </div>
                {/* Tags */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 9999, background: '#1a1a1a', color: '#fff', fontSize: 11 }}>{item.category}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 9999, background: '#1a1a1a', color: '#fff', fontSize: 11 }}>{item.scene === 'editor' ? t('container.scene_editor') : item.scene === 'knowledge' ? t('container.scene_knowledge') : t('container.scene_both')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              zIndex: 1000,
              opacity: modalVisible ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Modal Card */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: modalVisible
                ? 'translate(-50%, -50%) scale(1)'
                : 'translate(-50%, -50%) scale(0.95)',
              maxWidth: 640,
              width: '92%',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#fff',
              borderRadius: 16,
              zIndex: 1001,
              opacity: modalVisible ? 1 : 0,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px 24px 0 24px', position: 'relative' }}>
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0,0,0,0.06)',
                  color: '#374151',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
              >
                ✕
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${selectedItem.gradient[0]}, ${selectedItem.gradient[1]})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  {selectedItem.icon}
                </div>

                {/* Name + Author */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                    {selectedItem.name}
                  </h2>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    {t('container.author')}: {selectedItem.developer}
                  </div>
                </div>

                {/* Install button */}
                <button
                  style={{
                    padding: '8px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#000',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  {t('container.install_btn')}
                </button>
              </div>
            </div>

            {/* Preview section */}
            <div style={{ margin: '20px 0' }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', margin: '0 0 10px 24px' }}>{t('container.preview')}</h4>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '0 24px',
                  overflowX: 'auto',
                }}
              >
                {selectedItem.screenshots.map((ss, idx) => (
                  <div
                    key={idx}
                    style={{
                      minWidth: 160,
                      height: 100,
                      borderRadius: 10,
                      background: ss.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: '#6b7280',
                      textAlign: 'center',
                      padding: 8,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      flexShrink: 0,
                    }}
                  >
                    {ss.label}
                  </div>
                ))}
                {selectedItem.videoUrl && (
                  <div
                    style={{
                      minWidth: 160,
                      height: 100,
                      borderRadius: 10,
                      background: '#1a1a1a',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: '#fff',
                      gap: 6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: 24, lineHeight: 1 }}>▶</span>
                    <span style={{ fontSize: 11, opacity: 0.8 }}>{t('container.detail.video_preview')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tab bar */}
            <div style={{ padding: '0 24px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {modalTabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveModalTab(tab.key)}
                    style={{
                      padding: '10px 14px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: 13,
                      fontWeight: activeModalTab === tab.key ? 600 : 400,
                      color: activeModalTab === tab.key ? '#1a1a1a' : '#9ca3af',
                      cursor: 'pointer',
                      borderBottom: activeModalTab === tab.key ? '2px solid #1a1a1a' : '2px solid transparent',
                      transition: 'color 0.15s ease, border-color 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ padding: '20px 24px 24px' }}>
              {activeModalTab === 'description' && (
                <div>
                  <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                    {selectedItem.detailedDescription}
                  </p>
                </div>
              )}

              {activeModalTab === 'features' && (
                <div>
                  {selectedItem.features.map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: 10,
                        padding: '6px 0',
                        fontSize: 13,
                        color: '#374151',
                        lineHeight: 1.5,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ color: '#10B981', flexShrink: 0, fontSize: 14, marginTop: 1 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'tutorial' && (
                <div>
                  {selectedItem.usageGuide.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: 12,
                        padding: '10px 0',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: '#1a1a1a',
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                      >
                        {step.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'changelog' && (
                <div>
                  {selectedItem.changelog.map((entry, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: idx < selectedItem.changelog.length - 1 ? 10 : 0 }}>
                      {/* Timeline left */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: selectedItem.color,
                            flexShrink: 0,
                          }}
                        />
                        {idx < selectedItem.changelog.length - 1 && (
                          <div style={{ width: 1, flex: 1, background: '#e5e7eb', marginTop: 4 }} />
                        )}
                      </div>
                      {/* Timeline right */}
                      <div style={{ flex: 1, paddingBottom: idx < selectedItem.changelog.length - 1 ? 8 : 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              background: '#eff6ff',
                              color: '#3B82F6',
                            }}
                          >
                            v{entry.version}
                          </span>
                          <span style={{ fontSize: 12, color: '#9ca3af' }}>{entry.date}</span>
                        </div>
                        {entry.changes.map((change, ci) => (
                          <div key={ci} style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, paddingLeft: 0 }}>
                            - {change}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'info' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{t('container.detail.version')}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>v{selectedItem.version}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{t('container.detail.developer')}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{selectedItem.developer}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{t('container.detail.published')}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{selectedItem.published}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{t('container.detail.updated')}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{selectedItem.updated}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{t('container.installs')}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{selectedItem.installs}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{t('container.scene_both')}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>
                      {selectedItem.scene === 'both'
                        ? `${t('container.scene_editor')} · ${t('container.scene_knowledge')}`
                        : selectedItem.scene === 'editor'
                          ? t('container.scene_editor')
                          : t('container.scene_knowledge')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
