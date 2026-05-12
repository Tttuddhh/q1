import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowUp, ArrowDown, CornerDownLeft, FileText, Folder } from 'lucide-react';
import type { Page } from '../types';
import { useTranslation } from '../i18n';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: Page[];
  onNavigateToPage: (pageId: string) => void;
}

export function SearchModal({ isOpen, onClose, pages, onNavigateToPage }: SearchModalProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return pages;
    const q = query.toLowerCase();
    return pages.filter(
      (page) =>
        (page.isEdited === false ? t('page.untitled') : page.title).toLowerCase().includes(q) ||
        (page.isEdited === false ? t('page.default_content') : page.content).toLowerCase().includes(q) ||
        page.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query, pages]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          onNavigateToPage(selected.id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onNavigateToPage]);

  // Scroll selected into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
        className="bg-white dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderBottom: '1px solid #f3f4f6',
          }}
          className="dark:[border-bottom:1px_solid_#374151]"
        >
          <Search size={20} className="text-gray-400 dark:text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            style={{
              flex: 1,
              fontSize: 16,
              border: 'none',
              outline: 'none',
              background: 'transparent',
            }}
            className="text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
              }}
              className="dark:bg-gray-700"
            >
              <X size={14} />
            </button>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
            }}
            className="text-gray-400 dark:text-gray-500"
          >
            <kbd
              style={{
                padding: '2px 6px',
                borderRadius: 4,
                border: '1px solid',
                fontFamily: 'monospace',
              }}
              className="bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              ESC
            </kbd>
            <span>{t('search.close')}</span>
          </div>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{
            maxHeight: 400,
            overflow: 'auto',
            padding: '8px',
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: '40px 20px',
                textAlign: 'center',
              }}
              className="text-gray-400 dark:text-gray-500"
            >
              {t('search.no_results')}
            </div>
          ) : (
            results.map((page, index) => (
              <button
                key={page.id}
                onClick={() => {
                  onNavigateToPage(page.id);
                  onClose();
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: 'none',
                  background: index === selectedIndex ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  textAlign: 'left',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{page.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {page.isEdited === false ? t('page.untitled') : page.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    className="text-gray-400 dark:text-gray-500"
                  >
                    {(page.isEdited === false ? t('page.default_content') : page.content).replace(/<[^>]*>/g, '').slice(0, 60)}...
                  </div>
                </div>
                {index === selectedIndex && (
                  <CornerDownLeft size={14} className="text-gray-400 dark:text-gray-500" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '10px 20px',
            borderTop: '1px solid #f3f4f6',
            fontSize: 12,
          }}
          className="text-gray-400 dark:text-gray-500 dark:[border-top:1px_solid_#374151]"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowUp size={12} />
            <ArrowDown size={12} />
            {t('search.nav')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <CornerDownLeft size={12} />
            {t('search.select')}
          </span>
          <span style={{ marginLeft: 'auto' }}>
            {t('search.results_count').replace('{count}', String(results.length))}
          </span>
        </div>
      </div>
    </div>
  );
}
