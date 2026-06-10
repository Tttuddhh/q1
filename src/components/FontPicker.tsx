import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { FONTS, SYSTEM_FONT, type FontData } from '../data/fonts';
import { loadGoogleFont, preloadFonts } from '../utils/fontLoader';
import { useTranslation } from '../i18n';

interface FontPickerProps {
  currentFont?: string;
  onSelect: (font: FontData) => void;
}

const CATEGORY_ORDER: Array<'chinese' | 'english' | 'other'> = [
  'chinese',
  'english',
  'other',
];

const CATEGORY_LABELS: Record<string, string> = {
  chinese: '中文字体',
  english: '英文字体',
  other: '其他字体',
};

export function FontPicker({ currentFont, onSelect }: FontPickerProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [preloadTick, setPreloadTick] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const preloadStartedRef = useRef(false);

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

  useEffect(() => {
    if (isOpen && !preloadStartedRef.current) {
      preloadStartedRef.current = true;
      setIsPreloading(true);

      const fontsToLoad = FONTS.filter(f => f.googleFontName).map(f => ({
        googleFontName: f.googleFontName,
        previewText: f.previewText,
      }));

      preloadFonts(fontsToLoad)
        .catch(() => {})
        .finally(() => {
          setPreloadTick(v => v + 1);
          setIsPreloading(false);
        });
    }
    if (!isOpen) {
      preloadStartedRef.current = false;
    }
  }, [isOpen]);

  const filteredFonts = useMemo(() => {
    let fonts = [...FONTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      fonts = fonts.filter(f => {
        if (f.name.toLowerCase().includes(q)) return true;
        if (f.displayName && f.displayName.toLowerCase().includes(q)) return true;
        if (f.previewText && f.previewText.toLowerCase().includes(q)) return true;
        if (f.tags && f.tags.some(tag => tag.toLowerCase().includes(q))) return true;
        return false;
      });
    }

    return fonts;
  }, [searchQuery]);

  const groupedFonts = useMemo(() => {
    const groups: Record<string, FontData[]> = {};
    for (const font of filteredFonts) {
      const cat = font.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(font);
    }
    return groups;
  }, [filteredFonts]);

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

  const buttonStyle: React.CSSProperties = {
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
  };

  const hoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isOpen) e.currentTarget.style.background = '#f3f4f6';
  };
  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isOpen) e.currentTarget.style.background = 'transparent';
  };

  const itemHoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#f3f4f6';
  };
  const makeItemHoverOut = (fontName: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.currentTarget.style.background =
      currentFont === fontName
        ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
        : 'transparent';
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(v => !v)}
        title={t('editor.font')}
        style={buttonStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <span style={{ fontSize: 16, fontFamily: 'serif' }}>T</span>
        <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
            width: 300,
            maxHeight: 420,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginTop: 4,
          }}
        >
          <div
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={2} color="#9ca3af" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('editor.font_search')}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 12,
                color: '#374151',
                background: 'transparent',
              }}
            />
            {isPreloading && (
              <span style={{ fontSize: 11, color: '#9ca3af' }}>…</span>
            )}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '4px 0',
              scrollbarWidth: 'thin',
            }}
          >
            <button
              type="button"
              onClick={() => handleSelect(SYSTEM_FONT)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                border: 'none',
                background:
                  currentFont === SYSTEM_FONT.name
                    ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                    : 'transparent',
                cursor: 'pointer',
                fontSize: 13,
                color: '#374151',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={itemHoverIn}
              onMouseLeave={makeItemHoverOut(SYSTEM_FONT.name)}
            >
              <span style={{ fontSize: 11, color: '#9ca3af', display: 'block' }}>
                {t('editor.font_system')}
              </span>
              <span style={{ fontSize: 16, color: '#111827', display: 'block', lineHeight: 1.2 }}>
                {SYSTEM_FONT.displayName || SYSTEM_FONT.name}
              </span>
            </button>

            {CATEGORY_ORDER.map(cat => {
              const fonts = groupedFonts[cat];
              if (!fonts || fonts.length === 0) return null;
              return (
                <div key={cat}>
                  <div
                    style={{
                      padding: '6px 12px 2px',
                      fontSize: 11,
                      color: '#9ca3af',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </div>
                  {fonts.map(font => {
                    const key = `${font.name}-${preloadTick}`;
                    const isSelected =
                      currentFont === font.name ||
                      currentFont === font.displayName;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelect(font)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          border: 'none',
                          background: isSelected
                            ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                            : 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={itemHoverIn}
                        onMouseLeave={makeItemHoverOut(font.name)}
                      >
                        <span
                          style={{
                            fontFamily: font.family,
                            fontSize: 16,
                            lineHeight: 1.2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#111827',
                            display: 'block',
                          }}
                        >
                          {font.displayName || font.name}
                        </span>
                        {font.displayName && font.displayName !== font.name && (
                          <span
                            style={{
                              fontSize: 11,
                              color: '#9ca3af',
                              display: 'block',
                              marginTop: 2,
                            }}
                          >
                            {font.name}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}

            {filteredFonts.length === 0 && (
              <div
                style={{
                  padding: 16,
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: 12,
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
