import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { FONTS, FONT_CATEGORIES, SYSTEM_FONT, type FontData } from '../data/fonts';
import { loadGoogleFont } from '../utils/fontLoader';
import { useTranslation } from '../i18n';

interface FontPickerProps {
  currentFont?: string;
  onSelect: (font: FontData) => void;
}

export function FontPicker({ currentFont, onSelect }: FontPickerProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
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
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const filteredFonts = useMemo(() => {
    let fonts = [...FONTS];

    if (activeCategory !== 'all') {
      fonts = fonts.filter(f => f.tags.includes(activeCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      fonts = fonts.filter(
        f =>
          f.name.toLowerCase().includes(q) ||
          f.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return fonts;
  }, [activeCategory, searchQuery]);

  const handleSelect = useCallback(
    (font: FontData) => {
      if (font.googleFontName) {
        loadGoogleFont(font.googleFontName);
      }
      onSelect(font);
      setIsOpen(false);
      setSearchQuery('');
    },
    [onSelect]
  );

  const displayLabel = currentFont || t('editor.font_system');

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(v => !v)}
        title={t('editor.font')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          height: 32,
          padding: '0 8px',
          borderRadius: 6,
          border: '1px solid transparent',
          background: isOpen ? '#f3f4f6' : 'transparent',
          color: '#374151',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          transition: 'background-color 0.15s ease, border-color 0.15s ease',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          if (!isOpen) e.currentTarget.style.background = '#f3f4f6';
        }}
        onMouseLeave={e => {
          if (!isOpen) e.currentTarget.style.background = 'transparent';
        }}
      >
        <span style={{ fontSize: 16, fontFamily: 'serif' }}>T</span>
        <span style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayLabel}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          strokeWidth={2}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {isOpen && (
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
            width: 320,
            maxHeight: 420,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginTop: 4,
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: '10px 12px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2} color="#9ca3af" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('editor.font_search')}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 13,
                color: '#374151',
                background: 'transparent',
              }}
            />
          </div>

          {/* Category tabs */}
          <div
            style={{
              display: 'flex',
              gap: 4,
              padding: '8px 12px',
              borderBottom: '1px solid #e5e7eb',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {FONT_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 9999,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  background: activeCategory === cat.key ? 'var(--color-primary)' : '#f3f4f6',
                  color: activeCategory === cat.key ? '#ffffff' : '#6b7280',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                }}
              >
                {t(cat.labelKey as any)}
              </button>
            ))}
          </div>

          {/* Font list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '8px 0',
              scrollbarWidth: 'thin',
            }}
          >
            {/* System default */}
            <button
              type="button"
              onClick={() => handleSelect(SYSTEM_FONT)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                border: 'none',
                background: currentFont === SYSTEM_FONT.name ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)' : 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                color: '#374151',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background =
                  currentFont === SYSTEM_FONT.name
                    ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                    : 'transparent';
              }}
            >
              {t('editor.font_system')}
            </button>

            {filteredFonts.map(font => (
              <button
                key={font.name}
                type="button"
                onClick={() => handleSelect(font)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 16px',
                  border: 'none',
                  background: currentFont === font.name ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: '#374151',
                  transition: 'background-color 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background =
                    currentFont === font.name
                      ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                      : 'transparent';
                }}
              >
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: 15,
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {font.name}
                </span>
              </button>
            ))}

            {filteredFonts.length === 0 && (
              <div
                style={{
                  padding: 24,
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: 13,
                }}
              >
                {t('editor.font_no_results')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
