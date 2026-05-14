import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, MoreHorizontal, FileText, Plus, Folder, Search } from 'lucide-react';
import type { Page } from '../types';
import { useTranslation } from '../i18n';

interface PageTreeProps {
  pages: Page[];
  currentPageId: string | null;
  onNavigateToPage: (pageId: string) => void;
  onToggleExpanded: (pageId: string) => void;
  onCreatePage?: (parentId?: string) => void;
  onEditPage?: (pageId: string) => void;
  onDeletePage?: (pageId: string) => void;
  onRenamePage?: (pageId: string, newTitle: string) => void;
}

function isChildPage(pageId: string, pageList: Page[]): boolean {
  for (const page of pageList) {
    if (page.children) {
      for (const child of page.children) {
        if (child.id === pageId) return true;
      }
      const found = isChildPage(pageId, page.children);
      if (found) return true;
    }
  }
  return false;
}

function findPageById(pageId: string, pageList: Page[]): Page | null {
  for (const page of pageList) {
    if (page.id === pageId) return page;
    if (page.children) {
      const found = findPageById(pageId, page.children);
      if (found) return found;
    }
  }
  return null;
}

export function PageTree({
  pages,
  currentPageId,
  onNavigateToPage,
  onToggleExpanded,
  onCreatePage,
  onEditPage,
  onDeletePage,
  onRenamePage,
}: PageTreeProps) {
  const { t } = useTranslation();
  const [contextMenu, setContextMenu] = useState<{ pageId: string; x: number; y: number } | null>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef2 = useRef(contextMenu);
  const dragStartY = useRef(0);
  const scrollStartTop = useRef(0);

  useEffect(() => {
    contextMenuRef2.current = contextMenu;
  }, [contextMenu]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.func-sidebar')) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    const el = scrollContainerRef.current;
    if (!el) return;
    const hasScrollableContent = el.scrollHeight > el.clientHeight;
    setShowScrollbar(hasScrollableContent);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) return;
    setIsHovering(false);
    setShowScrollbar(false);
  }, [isDragging]);

  const handleScrollbarMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsHovering(true);
    dragStartY.current = e.clientY;
    const el = scrollContainerRef.current;
    if (el) {
      scrollStartTop.current = el.scrollTop;
    }
  }, []);

  // Sync scrollbar thumb position with scroll
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollableHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

      const trackHeight = el.clientHeight - 40;
      const newThumbTop = progress * trackHeight;
      setThumbTop(newThumbTop);

      // Close context menu on scroll
      if (contextMenuRef2.current) {
        setContextMenu(null);
      }
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const deltaY = e.clientY - dragStartY.current;
      const trackHeight = el.clientHeight - 40;
      const scrollableHeight = el.scrollHeight - el.clientHeight;
      const scrollDelta = (deltaY / trackHeight) * scrollableHeight;

      const newScrollTop = Math.max(0, Math.min(scrollableHeight, scrollStartTop.current + scrollDelta));
      el.scrollTop = newScrollTop;

      const progress = scrollableHeight > 0 ? newScrollTop / scrollableHeight : 0;
      const newThumbTop = progress * trackHeight;
      setThumbTop(newThumbTop);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleContextMenu = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setContextMenu({ pageId, x: rect.left, y: rect.bottom + 4 });
  };

  const handleAction = (action: string, pageId: string) => {
    setContextMenu(null);
    switch (action) {
      case 'create_child':
        onCreatePage?.(pageId);
        break;
      case 'edit':
        onNavigateToPage(pageId);
        setTimeout(() => onEditPage?.(pageId), 50);
        break;
      case 'rename': {
        const page = findPageById(pageId, pages);
        if (page) {
          const newTitle = prompt(t('tree.rename'), page.title);
          if (newTitle && newTitle.trim() !== '') {
            onRenamePage?.(pageId, newTitle.trim());
          }
        }
        break;
      }
      case 'properties':
        alert(t('tree.properties_wip'));
        break;
      case 'move':
        alert(t('tree.move_wip'));
        break;
      case 'copy':
        alert(t('tree.copy_wip'));
        break;
      case 'batch':
        alert(t('tree.batch_wip'));
        break;
      case 'delete':
        if (confirm(t('tree.delete_confirm'))) {
          onDeletePage?.(pageId);
        }
        break;
    }
  };

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple-effect';
    
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const renderPage = (page: Page, depth: number = 0) => {
    const isActive = page.id === currentPageId;
    const hasChildren = page.children && page.children.length > 0;
    const isExpanded = page.isExpanded !== false;

    return (
      <div key={page.id}>
        <div
          className={`group flex items-center gap-0.5 rounded-lg cursor-pointer tree-item-animated tree-item-ripple ${page.isNewlyCreated ? 'page-create-animation' : ''}`}
          style={{
            padding: '6px 8px',
            paddingLeft: 6 + depth * 16,
            backgroundColor: isActive ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)' : 'transparent',
            color: isActive ? 'var(--color-primary)' : 'rgb(55, 65, 81)',
            opacity: 1,
          }}
          onClick={(e) => {
            createRipple(e);
            onNavigateToPage(page.id);
          }}
        >
          {/* Expand/collapse chevron */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpanded(page.id);
              }}
              className="chevron-btn w-5 h-5 flex items-center justify-center rounded-md relative overflow-visible"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <ChevronRight
                size={14}
                className="tree-chevron"
                style={{
                  color: isActive ? 'var(--color-primary)' : 'rgb(156, 163, 175)',
                }}
              />
            </button>
          ) : (
            <div style={{ width: 20, flexShrink: 0 }} />
          )}

          {/* Emoji icon */}
          <span className="text-base flex-shrink-0 ml-0.5" style={{ cursor: 'pointer' }}>
            {page.emoji || '📄'}
          </span>

          {/* Title */}
          <span
            className="flex-1 text-sm truncate ml-1.5"
            style={{
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {page.isEdited === false ? t('page.untitled') : page.title}
          </span>

          {/* More button */}
          <button
            onClick={(e) => handleContextMenu(e, page.id)}
            className="w-5 h-5 flex items-center justify-center rounded"
            style={{
              opacity: contextMenu?.pageId === page.id ? 1 : 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            title="更多操作"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>

        {/* Children */}
        {hasChildren && (
          <div className={`tree-children ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div>
              {page.children!.map((child) => renderPage(child, depth + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: 'rgba(249, 250, 251, 0.8)', minWidth: 0 }}
    >
      {/* Header - 知识库标题区域 */}
      <div className="px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* 知识库图标和文字 */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 87%, transparent))',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="text-white">
                <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144Z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800">{t('app.title')}</span>
          </div>

          {/* 右侧按钮：搜索 + 箭头 */}
          <div className="flex items-center gap-1 py-1">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(107, 114, 128)' }}
            >
              <Search size={16} />
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(107, 114, 128)' }}
            >
              <ChevronRight size={16} className="rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="mx-4 border-b border-gray-200 flex-shrink-0" />

      {/* 新建页面按钮 */}
      <div className="px-4 py-2 flex-shrink-0">
        <button
          onClick={() => onCreatePage?.()}
          className="new-page-btn w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-medium"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 87%, transparent))',
            boxShadow: 'color-mix(in srgb, var(--color-primary) 25%, transparent) 0px 4px 15px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          <span>{t('tree.new_page')}</span>
        </button>
      </div>

      {/* Page list with custom scrollbar */}
      <div
        className="flex-1 relative min-h-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollContainerRef}
          className="w-full h-full overflow-y-auto px-2 pb-4 page-tree-scroll"
        >
          <div className="space-y-0.5" style={{ paddingBottom: 160 }}>
            {pages.map((page) => renderPage(page))}
          </div>

          {/* Custom scrollbar - inside scroll container */}
          {(showScrollbar || isDragging) && (
            <div className="custom-scrollbar-track">
              <div
                className="custom-scrollbar-thumb"
                style={{ top: `${thumbTop}px` }}
                onMouseDown={handleScrollbarMouseDown}
              />
            </div>
          )}
        </div>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            minWidth: 160,
            borderRadius: 10,
            border: '1px solid #e5e7eb',
            padding: '6px',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
          className="bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {(() => {
            const isChild = isChildPage(contextMenu.pageId, pages);
            const allItems = [
              { action: 'create_child', label: t('tree.create_child'), icon: <Plus size={14} />, hidden: isChild },
              { action: 'edit', label: t('tree.edit'), icon: <FileText size={14} /> },
              { action: 'rename', label: t('tree.rename'), icon: <FileText size={14} /> },
              { action: 'properties', label: t('tree.properties'), icon: <Folder size={14} /> },
              { action: 'move', label: t('tree.move'), icon: <FileText size={14} /> },
              { action: 'copy', label: t('tree.copy'), icon: <FileText size={14} /> },
              { action: 'batch', label: t('tree.batch'), icon: <FileText size={14} />, hidden: isChild },
              { action: 'delete', label: t('tree.delete'), icon: <FileText size={14} />, danger: true },
            ];
            return allItems.filter(item => !item.hidden).map((item) => (
            <button
              key={item.action}
              onClick={() => handleAction(item.action, contextMenu.pageId)}
              className={`menu-item hover:bg-gray-100 dark:hover:bg-gray-700 ${item.danger ? 'dark:text-red-400' : 'dark:text-gray-300'}`}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textAlign: 'left',
                color: item.danger ? '#ef4444' : '#374151',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ));})()}
        </div>
      )}
    </div>
  );
}
