import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n';

interface ContainerItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  gradient: [string, string];
  color: string;
  hotRating: number;
  installs: string;
  scene: 'editor' | 'knowledge' | 'both';
  version: string;
  developer: string;
  updated: string;
  features: string[];
  screenshotDesc: string;
}

const CONTAINERS: ContainerItem[] = [
  {
    id: 'toc',
    name: '目录导航',
    description: '自动生成页面结构化目录，支持多级标题嵌套，一键跳转到对应章节',
    category: '排版',
    icon: '📑',
    gradient: ['#FF743D', '#FF5E1A'],
    color: '#FF743D',
    hotRating: 9.2,
    installs: '15.2k',
    scene: 'editor',
    version: '2.4.1',
    developer: 'KB Lab',
    updated: '2026-05-20',
    features: ['自动提取页面标题生成目录树', '支持多级标题嵌套（H1-H6）', '点击目录项平滑滚动到对应位置', '支持折叠/展开目录', '目录项悬浮高亮跟随滚动位置'],
    screenshotDesc: '目录导航侧边栏展示效果',
  },
  {
    id: 'code-highlighter',
    name: '代码高亮',
    description: '增强代码块语法高亮，支持 50+ 编程语言，多种主题配色方案',
    category: '工具',
    icon: '</>',
    gradient: ['#10B981', '#059669'],
    color: '#10B981',
    hotRating: 9.5,
    installs: '18.7k',
    scene: 'editor',
    version: '3.2.0',
    developer: 'SyntaxTeam',
    updated: '2026-06-01',
    features: ['支持 50+ 编程语言语法高亮', '10+ 种代码主题配色', '行号显示与高亮', '代码块一键复制', '自动识别语言类型'],
    screenshotDesc: '代码块语法高亮渲染效果',
  },
  {
    id: 'math-formula',
    name: '数学公式',
    description: 'LaTeX 数学公式实时渲染，支持行内公式与独立公式块，内置常用符号面板',
    category: '数据',
    icon: '∑',
    gradient: ['#3B82F6', '#2563EB'],
    color: '#3B82F6',
    hotRating: 8.9,
    installs: '11.3k',
    scene: 'editor',
    version: '1.8.3',
    developer: 'MathCore',
    updated: '2026-04-15',
    features: ['LaTeX 公式实时渲染', '行内公式与独立公式块', '内置常用数学符号面板', '公式编号与交叉引用', '支持导出为 MathML'],
    screenshotDesc: '数学公式渲染效果展示',
  },
  {
    id: 'callout',
    name: '提示框',
    description: '丰富的提示框样式组件，支持信息、警告、成功、错误等多种类型',
    category: '样式',
    icon: '💡',
    gradient: ['#6366F1', '#4F46E5'],
    color: '#6366F1',
    hotRating: 8.5,
    installs: '9.8k',
    scene: 'editor',
    version: '2.1.0',
    developer: 'UILab',
    updated: '2026-03-28',
    features: ['5 种预设提示类型（信息/警告/成功/错误/笔记）', '支持自定义颜色和图标', '可折叠提示框', 'Markdown 内容支持', '一键插入提示框模板'],
    screenshotDesc: '各类提示框样式预览',
  },
  {
    id: 'columns',
    name: '分栏布局',
    description: '灵活的多栏布局容器，自由拖拽调整列宽，支持 2-5 栏任意组合',
    category: '排版',
    icon: '⬜',
    gradient: ['#14B8A6', '#0D9488'],
    color: '#14B8A6',
    hotRating: 8.3,
    installs: '8.6k',
    scene: 'editor',
    version: '1.5.2',
    developer: 'LayoutPro',
    updated: '2026-02-10',
    features: ['支持 2-5 栏灵活布局', '拖拽调整列宽', '响应式自适应', '列内支持任意内容嵌套', '复制/移动整列内容'],
    screenshotDesc: '多栏布局编辑效果',
  },
  {
    id: 'spoiler',
    name: '折叠内容',
    description: '可折叠的内容区块组件，适合隐藏详细说明、常见问题解答等辅助信息',
    category: '交互',
    icon: '🔽',
    gradient: ['#84CC16', '#65A30D'],
    color: '#84CC16',
    hotRating: 7.9,
    installs: '6.4k',
    scene: 'editor',
    version: '1.3.0',
    developer: 'WidgetLab',
    updated: '2026-01-18',
    features: ['可折叠内容面板', '自定义折叠标题和图标', '支持默认展开/收起状态', '嵌套折叠支持', '动画展开/收起过渡效果'],
    screenshotDesc: '折叠内容组件交互效果',
  },
  {
    id: 'char-count',
    name: '字数统计',
    description: '实时统计文章字数、段落数、字符数和预估阅读时长，支持底部状态栏显示',
    category: '工具',
    icon: '📝',
    gradient: ['#6B7280', '#4B5563'],
    color: '#6B7280',
    hotRating: 7.6,
    installs: '5.2k',
    scene: 'editor',
    version: '1.2.1',
    developer: 'UtilStack',
    updated: '2025-12-05',
    features: ['实时统计字数/字符数/段落数', '预估阅读时长', '底部状态栏显示', '选中文本字数统计', '支持排除空格/标点选项'],
    screenshotDesc: '字数统计底部状态栏',
  },
  {
    id: 'mind-map',
    name: '思维导图',
    description: '将结构化内容自动转换为可编辑的思维导图，支持多种布局和导出格式',
    category: '工具',
    icon: '🧠',
    gradient: ['#F59E0B', '#D97706'],
    color: '#F59E0B',
    hotRating: 9.1,
    installs: '14.3k',
    scene: 'knowledge',
    version: '3.0.2',
    developer: 'MindFlow',
    updated: '2026-05-28',
    features: ['自动从标题层级生成思维导图', '自由拖拽节点调整结构', '多种布局模板（树形/鱼骨/组织结构）', '支持图片和链接节点', '导出为 PNG/SVG/PDF'],
    screenshotDesc: '思维导图可视化展示',
  },
  {
    id: 'flowchart',
    name: '流程图',
    description: 'Mermaid 语法绘制专业流程图、时序图和ER图，实时预览所见即所得',
    category: '嵌入',
    icon: '🔀',
    gradient: ['#EC4899', '#DB2777'],
    color: '#EC4899',
    hotRating: 8.8,
    installs: '12.6k',
    scene: 'knowledge',
    version: '2.7.0',
    developer: 'ChartStudio',
    updated: '2026-04-22',
    features: ['Mermaid 语法解析与渲染', '流程图/时序图/ER图/甘特图', '实时预览编辑器', '内置图形模板库', '导出为 SVG 和 PNG'],
    screenshotDesc: '流程图渲染效果展示',
  },
  {
    id: 'table-pro',
    name: '高级表格',
    description: '增强型表格组件，支持排序、筛选、公式计算和条件格式化',
    category: '数据',
    icon: '📊',
    gradient: ['#0891B2', '#0E7490'],
    color: '#0891B2',
    hotRating: 8.2,
    installs: '10.1k',
    scene: 'knowledge',
    version: '2.3.0',
    developer: 'DataGrid',
    updated: '2026-03-15',
    features: ['表格排序与多条件筛选', '单元格公式计算', '条件格式化（颜色标尺/数据条）', '列宽拖拽调整', '表格数据导入/导出 CSV'],
    screenshotDesc: '高级表格数据展示效果',
  },
  {
    id: 'pdf-preview',
    name: 'PDF预览',
    description: '直接在知识库页面中嵌入PDF文档预览，支持翻页、缩放和搜索',
    category: '嵌入',
    icon: '📄',
    gradient: ['#DC2626', '#B91C1C'],
    color: '#DC2626',
    hotRating: 8.1,
    installs: '9.5k',
    scene: 'knowledge',
    version: '1.9.1',
    developer: 'DocView',
    updated: '2026-02-28',
    features: ['PDF 文档内嵌预览', '翻页和页码跳转', '缩放与全屏查看', '文本搜索与高亮', 'PDF 页面缩略图导航'],
    screenshotDesc: 'PDF文档内嵌预览效果',
  },
  {
    id: 'image-gallery',
    name: '图片画廊',
    description: '以画廊模式优雅展示图片集，支持灯箱预览、懒加载和多种排列布局',
    category: '媒体',
    icon: '🖼️',
    gradient: ['#8B5CF6', '#7C3AED'],
    color: '#8B5CF6',
    hotRating: 8.7,
    installs: '11.8k',
    scene: 'knowledge',
    version: '2.5.0',
    developer: 'MediaKit',
    updated: '2026-05-10',
    features: ['多种画廊布局（网格/瀑布流/轮播）', '图片灯箱全屏预览', '懒加载与渐进式加载', '图片批量上传与拖拽排序', '支持 GIF 和 WebP 格式'],
    screenshotDesc: '图片画廊网格展示效果',
  },
  {
    id: 'tabs',
    name: '标签页',
    description: '标签式内容切换容器，有效组织相关内容，节省页面空间并提升可读性',
    category: '交互',
    icon: '📋',
    gradient: ['#F97316', '#EA580C'],
    color: '#F97316',
    hotRating: 8.6,
    installs: '10.9k',
    scene: 'knowledge',
    version: '1.7.2',
    developer: 'UILab',
    updated: '2026-03-08',
    features: ['多标签页内容切换', '标签页拖拽排序', '多种标签样式（顶部/侧边/胶囊）', '标签页内支持 Markdown', '标签页状态记忆'],
    screenshotDesc: '标签页组件切换效果',
  },
  {
    id: 'emoji-picker',
    name: '表情选择',
    description: '快速搜索和插入表情符号，支持分类浏览、皮肤色调和最近使用记录',
    category: '工具',
    icon: '😊',
    gradient: ['#D946EF', '#C026D3'],
    color: '#D946EF',
    hotRating: 9.0,
    installs: '13.4k',
    scene: 'both',
    version: '2.2.0',
    developer: 'EmojiStudio',
    updated: '2026-05-15',
    features: ['1000+ 表情符号分类浏览', '关键词快速搜索表情', '皮肤色调选择', '最近使用记录', '支持键盘快捷键快速调用'],
    screenshotDesc: '表情选择器面板界面',
  },
  {
    id: 'video-embed',
    name: '视频嵌入',
    description: '在文档中嵌入外部视频内容，支持主流视频平台链接自动识别与响应式播放',
    category: '媒体',
    icon: '🎬',
    gradient: ['#EF4444', '#DC2626'],
    color: '#EF4444',
    hotRating: 8.4,
    installs: '8.9k',
    scene: 'both',
    version: '1.6.3',
    developer: 'MediaKit',
    updated: '2026-04-05',
    features: ['YouTube/Bilibili 链接自动识别', '响应式视频播放器', '自定义播放器比例（16:9/4:3/1:1）', '自动封面缩略图', '播放列表支持'],
    screenshotDesc: '视频嵌入播放效果',
  },
];

const CATEGORIES = ['排版', '媒体', '工具', '数据', '交互', '样式', '嵌入'];
const PRIMARY_COLOR = '#FF743D';

export function ContainerPage() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [activeScene, setActiveScene] = useState<'all' | 'editor' | 'knowledge'>('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContainerItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Animation: use a short delay to trigger entry animation after mount
  useEffect(() => {
    if (selectedItem) {
      const timer = setTimeout(() => setModalVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setModalVisible(false);
    }
  }, [selectedItem]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 200);
  }, []);

  const filteredContainers = useMemo(() => {
    let list = CONTAINERS;

    if (activeScene !== 'all') {
      list = list.filter(c => c.scene === activeScene || c.scene === 'both');
    }

    if (activeCategory) {
      list = list.filter(c => c.category === activeCategory);
    }

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchText, activeScene, activeCategory]);

  const sceneTabs = [
    { key: 'all' as const, label: '全部' },
    { key: 'editor' as const, label: t('container.scene_editor') },
    { key: 'knowledge' as const, label: t('container.scene_knowledge') },
  ];

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#f8f9fb',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '40px 32px 64px',
          width: '100%',
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 8px 0',
            lineHeight: 1.3,
          }}
        >
          {t('container.title')}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: '#6b7280',
            margin: '0 0 28px 0',
            lineHeight: 1.5,
          }}
        >
          {t('container.subtitle')}
        </p>

        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 16,
              color: '#9ca3af',
              pointerEvents: 'none',
              lineHeight: 1,
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={t('container.search_placeholder')}
            style={{
              width: '100%',
              padding: '10px 16px 10px 42px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 14,
              color: '#1a1a1a',
              outline: 'none',
              background: '#f9fafb',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = PRIMARY_COLOR;
              e.currentTarget.style.boxShadow = `0 0 0 3px color-mix(in srgb, ${PRIMARY_COLOR} 15%, transparent)`;
              e.currentTarget.style.background = '#fff';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#f9fafb';
            }}
          />
        </div>

        {/* Scene Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 20,
          }}
        >
          {sceneTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveScene(tab.key)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                background: 'transparent',
                color: activeScene === tab.key ? PRIMARY_COLOR : '#6b7280',
                position: 'relative',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                if (activeScene !== tab.key) e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={e => {
                if (activeScene !== tab.key) e.currentTarget.style.color = '#6b7280';
              }}
            >
              {tab.label}
              {activeScene === tab.key && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '20%',
                    width: '60%',
                    height: 3,
                    borderRadius: 2,
                    background: PRIMARY_COLOR,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Category Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 32,
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                border: activeCategory === cat ? 'none' : '1px solid #e5e7eb',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                background: activeCategory === cat ? PRIMARY_COLOR : '#fff',
                color: activeCategory === cat ? '#fff' : '#6b7280',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = PRIMARY_COLOR;
                  e.currentTarget.style.color = PRIMARY_COLOR;
                  e.currentTarget.style.background = `color-mix(in srgb, ${PRIMARY_COLOR} 5%, transparent)`;
                }
              }}
              onMouseLeave={e => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#6b7280';
                  e.currentTarget.style.background = '#fff';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Container Grid */}
        {filteredContainers.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#9ca3af',
              fontSize: 15,
            }}
          >
            {t('container.empty_text')}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {filteredContainers.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Cover Area */}
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Content Area */}
                <div style={{ padding: 16, flex: 1 }}>
                  {/* Scene Badges */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      marginBottom: 10,
                    }}
                  >
                    {item.scene === 'both' ? (
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 500,
                            background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                            color: item.color,
                            border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)`,
                          }}
                        >
                          {t('container.scene_editor')}
                        </span>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 500,
                            background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                            color: item.color,
                            border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)`,
                          }}
                        >
                          {t('container.scene_knowledge')}
                        </span>
                      </>
                    ) : (
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 500,
                          background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                          color: item.color,
                          border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)`,
                        }}
                      >
                        {item.scene === 'editor'
                          ? t('container.scene_editor')
                          : t('container.scene_knowledge')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#1a1a1a',
                      margin: '0 0 6px 0',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 13,
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: 1.5,
                      minHeight: 39,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderTop: '1px solid #f3f4f6',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 12,
                      color: '#9ca3af',
                    }}
                  >
                    <span>{t('container.installs')} {item.installs}</span>
                    <span
                      style={{
                        color: item.hotRating >= 9 ? '#EF4444' : '#f59e0b',
                        fontWeight: 500,
                      }}
                    >
                      ⭐ {t('container.hot_rate')} {item.hotRating}
                    </span>
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 500,
                      background: `color-mix(in srgb, ${item.color} 10%, transparent)`,
                      color: item.color,
                    }}
                  >
                    {item.category}
                  </span>
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
              background: 'rgba(0,0,0,0.5)',
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
              width: '90%',
              maxHeight: '85vh',
              overflow: 'auto',
              background: '#fff',
              borderRadius: 16,
              zIndex: 1001,
              opacity: modalVisible ? 1 : 0,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            {/* Header Banner */}
            <div
              style={{
                background: `linear-gradient(135deg, ${selectedItem.gradient[0]}, ${selectedItem.gradient[1]})`,
                padding: 32,
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
              >
                ✕
              </button>

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {selectedItem.icon}
              </div>

              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 8px 0',
                  lineHeight: 1.3,
                }}
              >
                {selectedItem.name}
              </h2>

              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.9)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {selectedItem.description}
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: 24 }}>
              {/* Features Section */}
              <h4
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  margin: '0 0 12px 0',
                }}
              >
                {t('container.detail.features')}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px 0',
                }}
              >
                {selectedItem.features.map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '6px 0',
                      fontSize: 13,
                      color: '#374151',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: '#10B981',
                        fontSize: 14,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Screenshots Section */}
              <h4
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  margin: '0 0 12px 0',
                }}
              >
                {t('container.detail.screenshots')}
              </h4>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 100,
                      background: '#f9fafb',
                      border: '2px dashed #e5e7eb',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: '#9ca3af',
                      textAlign: 'center',
                      padding: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {selectedItem.screenshotDesc}
                  </div>
                ))}
              </div>

              {/* Meta Info Row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                  padding: '16px 0 20px 0',
                  borderTop: '1px solid #f3f4f6',
                }}
              >
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ color: '#6b7280' }}>{t('container.detail.version')}</span> {selectedItem.version}
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ color: '#6b7280' }}>{t('container.detail.developer')}</span> {selectedItem.developer}
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ color: '#6b7280' }}>{t('container.detail.updated')}</span> {selectedItem.updated}
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ color: '#6b7280' }}>{t('container.installs')}</span> {selectedItem.installs}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                style={{
                  width: '100%',
                  padding: '12px 0',
                  borderRadius: 8,
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${selectedItem.gradient[0]}, ${selectedItem.gradient[1]})`,
                  marginBottom: 12,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {t('container.install_btn')}
              </button>
              <button
                onClick={closeModal}
                style={{
                  width: '100%',
                  padding: '10px 0',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#6b7280',
                  background: '#fff',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                {t('settings.close')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}