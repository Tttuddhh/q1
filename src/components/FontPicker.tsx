import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FONTS, SYSTEM_FONT, FONT_CATEGORIES } from '../data/fonts';
import type { FontData } from '../data/fonts';
import { loadGoogleFont } from '../utils/fontLoader';
import { HugeiconsIcon } from '@hugeicons/react';
import { TextIcon } from '@hugeicons/core-free-icons';

interface FontPickerProps {
  currentFontName: string;
  onSelect: (font: FontData) => void;
}

export function FontPicker({ currentFontName, onSelect }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const filteredFonts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return FONTS;
    return FONTS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, FontData[]> = {};
    for (const font of filteredFonts) {
      if (!groups[font.category]) groups[font.category] = [];
      groups[font.category].push(font);
    }
    return groups;
  }, [filteredFonts]);

  // 组件挂载时预加载所有字体
  useEffect(() => {
    FONTS.forEach((font) => {
      if (font.googleFontName) {
        loadGoogleFont(font.googleFontName);
      }
    });
  }, []);

  const handleSelect = useCallback(
    (font: FontData) => {
      if (font.googleFontName) {
        loadGoogleFont(font.googleFontName);
      }
      onSelect(font);
      setOpen(false);
      setSearch('');
    },
    [onSelect]
  );

  const displayName = currentFontName || SYSTEM_FONT.name;

  const currentFont = useMemo(() => {
    if (!currentFontName) return SYSTEM_FONT;
    return FONTS.find((f) => f.name === currentFontName) || SYSTEM_FONT;
  }, [currentFontName]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={buttonRef}
        type="button"
        title="字体"
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: 'auto',
          minWidth: 140,
          height: 32,
          borderRadius: 6,
          border: open ? '1px solid var(--color-primary)' : '1px solid transparent',
          background: open ? 'var(--color-primary)' : 'transparent',
          color: open ? '#ffffff' : '#6b7280',
          cursor: 'pointer',
          transition: 'background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
          flexShrink: 0,
          boxShadow: open ? '0 1px 3px color-mix(in srgb, var(--color-primary) 30%, transparent)' : 'none',
          padding: '0 16px',
          fontSize: 14,
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.background = '#f3f4f6';
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <HugeiconsIcon icon={TextIcon} size={20} strokeWidth={2} />
        <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: currentFont.family }}>
          {displayName}
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: 140,
            maxHeight: 360,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 4,
          }}
        >
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, background: '#ffffff', zIndex: 1 }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索字体..."
              style={{
                width: '100%',
                height: 28,
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                padding: '0 8px',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>

          <div style={{ padding: '4px 0' }}>
            {/* 系统默认 */}
            <button
              type="button"
              onClick={() => handleSelect(SYSTEM_FONT)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '6px 12px',
                border: 'none',
                background: currentFontName === SYSTEM_FONT.name ? '#f3f4f6' : 'transparent',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'inherit',
                color: '#1f2937',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                if (currentFontName !== SYSTEM_FONT.name) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {SYSTEM_FONT.preview}
            </button>

            {/* 按分类分组 */}
            {FONT_CATEGORIES.map((cat) => {
              const list = grouped[cat.key];
              if (!list || list.length === 0) return null;
              return (
                <div key={cat.key}>
                  <div
                    style={{
                      padding: '4px 12px',
                      fontSize: 11,
                      color: '#9ca3af',
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    {cat.label}
                  </div>
                  {list.map((font) => (
                    <button
                      key={font.name}
                      type="button"
                      onClick={() => handleSelect(font)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '6px 12px',
                        border: 'none',
                        background: currentFontName === font.name ? '#f3f4f6' : 'transparent',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontFamily: font.family,
                        color: '#1f2937',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        if (currentFontName !== font.name) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {font.preview}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
