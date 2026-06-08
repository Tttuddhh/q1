import { useState, useMemo } from 'react';
import { useTranslation } from '../i18n';

interface PluginItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  hotRating: number;
  isHot: boolean;
}

const ALL_PLUGINS: PluginItem[] = [
  { id: 'toc', name: '目录导航', description: '自动生成页面目录，快速跳转章节', category: '排版', icon: '📑', color: '#FF743D', hotRating: 9.2, isHot: true },
  { id: 'image-gallery', name: '图片画廊', description: '以画廊模式展示图片，支持灯箱预览', category: '媒体', icon: '🖼️', color: '#8B5CF6', hotRating: 8.7, isHot: true },
  { id: 'code-highlighter', name: '代码高亮', description: '增强代码语法高亮，支持50+语言', category: '工具', icon: '</>', color: '#10B981', hotRating: 9.5, isHot: true },
  { id: 'math-formula', name: '数学公式', description: 'LaTeX 数学公式实时渲染与编辑', category: '数据', icon: '∑', color: '#3B82F6', hotRating: 8.9, isHot: true },
  { id: 'mind-map', name: '思维导图', description: '将内容可视化，一键生成思维导图', category: '工具', icon: '🧠', color: '#F59E0B', hotRating: 9.1, isHot: true },
  { id: 'mermaid', name: '流程图', description: 'Mermaid 语法绘制流程图与时序图', category: '嵌入', icon: '🔀', color: '#EC4899', hotRating: 8.8, isHot: true },
  { id: 'callout', name: '提示框', description: '丰富的提示框样式，支持信息/警告/成功', category: '样式', icon: '💡', color: '#6366F1', hotRating: 8.5, isHot: false },
  { id: 'columns', name: '分栏布局', description: '灵活的多栏布局，自由组合内容区域', category: '排版', icon: '⬜', color: '#14B8A6', hotRating: 8.3, isHot: false },
  { id: 'tabs', name: '标签页', description: '标签式内容切换，节省页面空间', category: '交互', icon: '📋', color: '#F97316', hotRating: 8.6, isHot: true },
  { id: 'spoiler', name: '折叠内容', description: '可折叠的内容区块，适合隐藏详细信息', category: '交互', icon: '🔽', color: '#84CC16', hotRating: 7.9, isHot: false },
  { id: 'video-embed', name: '视频嵌入', description: '嵌入外部视频，支持主流视频平台', category: '媒体', icon: '🎬', color: '#EF4444', hotRating: 8.4, isHot: false },
  { id: 'pdf-preview', name: 'PDF预览', description: '直接在页面中预览PDF文档内容', category: '嵌入', icon: '📄', color: '#DC2626', hotRating: 8.1, isHot: false },
  { id: 'table-pro', name: '高级表格', description: '增强型表格，支持排序/筛选/公式计算', category: '数据', icon: '📊', color: '#0891B2', hotRating: 8.2, isHot: false },
  { id: 'emoji-picker', name: '表情选择', description: '快速插入表情符号，支持分类搜索', category: '工具', icon: '😊', color: '#D946EF', hotRating: 9.0, isHot: true },
  { id: 'char-count', name: '字数统计', description: '实时统计文章字数、段落和阅读时长', category: '工具', icon: '📝', color: '#6B7280', hotRating: 7.6, isHot: false },
];

const CATEGORIES = ['排版', '媒体', '工具', '数据', '交互', '样式', '嵌入'];
const PRIMARY_COLOR = '#FF743D';

export function MarketPage() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'hot'>('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPlugins = useMemo(() => {
    let list = ALL_PLUGINS;

    if (activeTab === 'hot') {
      list = list.filter(p => p.isHot);
    }

    if (activeCategory) {
      list = list.filter(p => p.category === activeCategory);
    }

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchText, activeTab, activeCategory]);

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#fff',
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
        {/* Page Title */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 8px 0',
            lineHeight: 1.3,
          }}
        >
          插件市场
        </h1>
        <p
          style={{
            fontSize: 15,
            color: '#6b7280',
            margin: '0 0 28px 0',
            lineHeight: 1.5,
          }}
        >
          发现和安装强大的插件，扩展你的编辑器功能
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
            placeholder="搜索插件..."
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

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 20,
          }}
        >
          {[
            { key: 'all', label: '全部' },
            { key: 'hot', label: '热门' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'all' | 'hot')}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                background: activeTab === tab.key ? 'transparent' : 'transparent',
                color: activeTab === tab.key ? PRIMARY_COLOR : '#6b7280',
                position: 'relative',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.key) e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.key) e.currentTarget.style.color = '#6b7280';
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
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
                  e.currentTarget.style.background = 'color-mix(in srgb, #FF743D 5%, transparent)';
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

        {/* Plugin Grid */}
        {filteredPlugins.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#9ca3af',
              fontSize: 15,
            }}
          >
            未找到匹配的插件
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
          >
            {filteredPlugins.map(plugin => (
              <div
                key={plugin.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid #f0f0f0',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Left Color Bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: plugin.color,
                  }}
                />

                <div
                  style={{
                    padding: '20px 20px 0 24px',
                    flex: 1,
                  }}
                >
                  {/* Icon Area */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: `color-mix(in srgb, ${plugin.color} 12%, transparent)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      fontWeight: 600,
                      color: plugin.color,
                      marginBottom: 14,
                      lineHeight: 1,
                    }}
                  >
                    {plugin.icon}
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#1a1a1a',
                      margin: '0 0 6px 0',
                      lineHeight: 1.4,
                    }}
                  >
                    {plugin.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 13,
                      color: '#9ca3af',
                      margin: '0 0 14px 0',
                      lineHeight: 1.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {plugin.description}
                  </p>
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 20px 12px 24px',
                    borderTop: '1px solid #f3f4f6',
                  }}
                >
                  {/* Hotness Badge */}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 500,
                      color: plugin.hotRating >= 9 ? '#EF4444' : '#f59e0b',
                    }}
                  >
                    🔥 热度 {plugin.hotRating}
                  </span>

                  {/* Category Chip */}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '2px 10px',
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 500,
                      background: `color-mix(in srgb, ${plugin.color} 10%, transparent)`,
                      color: plugin.color,
                    }}
                  >
                    {plugin.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}