import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, ArrowDown01Icon, CheckmarkCircle02Icon, Loading03Icon } from '@hugeicons/core-free-icons';
import { FONTS, SYSTEM_FONT, type FontData } from '../data/fonts';
import {
  loadAndRegisterFont,
  isFontLoaded,
  getCachedFont,
  loadGoogleFont,
} from '../utils/fontLoader';
import { useTranslation } from '../i18n';

interface FontPickerProps {
  currentFont?: string;
  onSelect: (font: FontData) => void;
}

const CATEGORY_ORDER: Array<'chinese' | 'english' | 'other'> = ['chinese', 'english', 'other'];

const CATEGORY_LABELS: Record<string, string> = {
  chinese: '中文字体',
  english: '英文字体',
  other: '其他字体',
};

const PRELOAD_CHINESE_COUNT = 20;

type FontLoadState = 'idle' | 'loading' | 'loaded' | 'error';

const scheduleIdleTask = (cb: () => void): void => {
  type IdleWindow = Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  const w = window as IdleWindow;
  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(cb, { timeout: 1500 });
  } else {
    setTimeout(cb, 200);
  }
};

export function FontPicker({ currentFont, onSelect }: FontPickerProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadStates, setLoadStates] = useState<Record<string, FontLoadState>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inFlightRef = useRef<Set<string>>(new Set());

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

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      fonts = fonts.filter(
        f =>
          f.name.toLowerCase().includes(q) ||
          f.tags.some(tag => tag.toLowerCase().includes(q))
      );
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

  const ensureFontLoaded = useCallback(
    async (font: FontData): Promise<void> => {
      if (!font || font.name === SYSTEM_FONT.name) return;
      if (isFontLoaded(font.name)) {
        setLoadStates(prev => (prev[font.name] === 'loaded' ? prev : { ...prev, [font.name]: 'loaded' }));
        return;
      }
      if (inFlightRef.current.has(font.name)) return;
      inFlightRef.current.add(font.name);

      // 命中 IndexedDB 缓存时跳过网络 loading 状态,直接尝试注册
      setLoadStates(prev => ({ ...prev, [font.name]: prev[font.name] || 'loading' }));
      try {
        // 先尝试读取缓存(快速路径),有缓存则同步预热加载状态
        const cached = await getCachedFont(font.name);
        if (cached && isFontLoaded(font.name)) {
          setLoadStates(prev => ({ ...prev, [font.name]: 'loaded' }));
          return;
        }
        const ok = await loadAndRegisterFont(font);
        setLoadStates(prev => ({ ...prev, [font.name]: ok ? 'loaded' : 'error' }));
      } catch {
        setLoadStates(prev => ({ ...prev, [font.name]: 'error' }));
      } finally {
        inFlightRef.current.delete(font.name);
      }
    },
    []
  );

  // 打开选择器时: 预加载前 20 个中文字体
  useEffect(() => {
    if (!isOpen) return;
    const chineseFonts = FONTS.filter(f => f.category === 'chinese').slice(0, PRELOAD_CHINESE_COUNT);
    if (chineseFonts.length === 0) return;

    // 标记初始状态
    setLoadStates(prev => {
      const next = { ...prev };
      for (const f of chineseFonts) {
        if (isFontLoaded(f.name)) {
          next[f.name] = 'loaded';
        } else if (!next[f.name]) {
          next[f.name] = 'loading';
        }
      }
      return next;
    });

    const runPreload = () => {
      chineseFonts.forEach((font, idx) => {
        // 错开请求,避免瞬时大量网络并发
        setTimeout(() => {
          void ensureFontLoaded(font);
        }, idx * 60);
      });
    };

    scheduleIdleTask(runPreload);
  }, [isOpen, ensureFontLoaded]);

  const handleSelect = useCallback(
    (font: FontData) => {
      if (font.name !== SYSTEM_FONT.name) {
        if (font.googleFontName) {
          loadGoogleFont(font.googleFontName);
        }
        void ensureFontLoaded(font);
      }
      onSelect(font);
      setIsOpen(false);
      setSearchQuery('');
    },
    [onSelect, ensureFontLoaded]
  );

  const handleHover = useCallback(
    (font: FontData) => {
      if (font.name === SYSTEM_FONT.name) return;
      void ensureFontLoaded(font);
    },
    [ensureFontLoaded]
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
        <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
            width: 260,
            maxHeight: 360,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginTop: 4,
          }}
        >
          {/* Search */}
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
          </div>

          {/* Font list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '4px 0',
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
                padding: '6px 10px',
                border: 'none',
                background: currentFont === SYSTEM_FONT.name ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)' : 'transparent',
                cursor: 'pointer',
                fontSize: 12,
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

            {CATEGORY_ORDER.map(cat => {
              const fonts = groupedFonts[cat];
              if (!fonts || fonts.length === 0) return null;
              return (
                <div key={cat}>
                  <div
                    style={{
                      padding: '4px 10px 2px',
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
                    const state = loadStates[font.name] ?? (isFontLoaded(font.name) ? 'loaded' : 'idle');
                    const isLoading = state === 'loading';
                    const isLoaded = state === 'loaded';
                    const isError = state === 'error';
                    return (
                      <button
                        key={font.name}
                        type="button"
                        onClick={() => handleSelect(font)}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#f3f4f6';
                          handleHover(font);
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background =
                            currentFont === font.name
                              ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                              : 'transparent';
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '6px 10px',
                          border: 'none',
                          background: currentFont === font.name ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                          opacity: isError ? 0.7 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily: font.family,
                              fontSize: 15,
                              lineHeight: 1.3,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              color: isLoading ? '#9ca3af' : '#111827',
                            }}
                          >
                            {font.preview || font.name}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: '#9ca3af',
                              lineHeight: 1.2,
                              marginTop: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {font.name}
                          </div>
                        </div>
                        {isLoading && (
                          <HugeiconsIcon
                            icon={Loading03Icon}
                            size={12}
                            strokeWidth={2}
                            color="#9ca3af"
                            style={{ animation: 'fontpicker-spin 1s linear infinite', flexShrink: 0 }}
                          />
                        )}
                        {isLoaded && (
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            size={12}
                            strokeWidth={2}
                            color="#10b981"
                            style={{ flexShrink: 0 }}
                          />
                        )}
                        {isError && (
                          <span
                            title="加载失败"
                            style={{
                              fontSize: 10,
                              color: '#ef4444',
                              flexShrink: 0,
                            }}
                          >
                            !
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

      <style>{`@keyframes fontpicker-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
