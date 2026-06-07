import { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SidebarLeftIcon, Home01Icon, ArrowRight01Icon, Search01Icon, Download01Icon, Share08Icon, Settings01Icon, UserIcon, Logout01Icon } from '@hugeicons/core-free-icons';
import type { Page } from '../types';
import { useTranslation } from '../i18n';

interface HeaderProps {
  onTogglePageTree: () => void;
  currentPageTitle: string;
  currentPageEmoji: string;
  onOpenSearch: () => void;
  onOpenDownload: () => void;
  onNavigateHome: () => void;
  onNavigateSettings: () => void;
  breadcrumbPath: Page[];
  onNavigateToPage: (pageId: string) => void;
}

export function Header({
  onTogglePageTree,
  currentPageTitle,
  currentPageEmoji,
  onOpenSearch,
  onOpenDownload,
  onNavigateHome,
  onNavigateSettings,
  breadcrumbPath,
  onNavigateToPage,
}: HeaderProps) {
  const { t } = useTranslation();
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      style={{
        height: 56,
        borderBottom: '1px solid #e5e7eb',
        zIndex: 10,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
      }}
      className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Page tree toggle */}
        <button
          onClick={onTogglePageTree}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <HugeiconsIcon icon={SidebarLeftIcon} size={20} strokeWidth={1.5} />
        </button>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={onNavigateHome}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <HugeiconsIcon icon={Home01Icon} size={20} strokeWidth={1.5} />
          </button>

          <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} className="text-gray-300 dark:text-gray-600" />

          {breadcrumbPath.length > 0 ? (
            breadcrumbPath.map((page, index) => {
              const isLast = index === breadcrumbPath.length - 1;
              return (
                <div key={page.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    onClick={isLast ? undefined : () => onNavigateToPage(page.id)}
                    style={{
                      height: 32,
                      padding: '0 10px',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: isLast ? 'color-mix(in srgb, var(--theme-primary) 6%, white)' : 'transparent',
                      border: 'none',
                      cursor: isLast ? 'default' : 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    className={`text-near-black dark:text-gray-100 ${!isLast ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'dark:[background:color-mix(in_srgb,var(--theme-primary)_8%,#1f2937)]'}`}
                  >
                    <span>{page.emoji}</span>
                    <span>{page.isEdited === false ? t('page.untitled') : page.title}</span>
                  </button>
                  {!isLast && <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} className="text-gray-300 dark:text-gray-600" />}
                </div>
              );
            })
          ) : (
            <button
              style={{
                height: 32,
                padding: '0 10px',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'color-mix(in srgb, var(--theme-primary) 6%, white)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
              }}
              className="text-near-black dark:text-gray-100 dark:[background:color-mix(in_srgb,var(--theme-primary)_8%,#1f2937)]"
            >
              <span>{currentPageEmoji}</span>
              <span>{currentPageTitle}</span>
            </button>
          )}
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Search */}
        <button
          onClick={onOpenSearch}
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            fontSize: 13,
          }}
          className="text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={1.5} />
          <span>{t('header.search')}</span>
          <kbd
            style={{
              fontSize: 11,
              padding: '1px 4px',
              borderRadius: 4,
              border: '1px solid',
              fontFamily: 'monospace',
            }}
            className="bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            ⌘K
          </kbd>
        </button>

        {/* Download */}
        <button
          onClick={onOpenDownload}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <HugeiconsIcon icon={Download01Icon} size={18} strokeWidth={1.5} />
        </button>

        {/* Share */}
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <HugeiconsIcon icon={Share08Icon} size={18} strokeWidth={1.5} />
        </button>

        {/* Settings */}
        <button
          onClick={onNavigateSettings}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <HugeiconsIcon icon={Settings01Icon} size={18} strokeWidth={1.5} />
        </button>

        {/* Avatar with dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setAvatarDropdownOpen(prev => !prev)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              overflow: 'hidden',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: '#f3f4f6',
            }}
          >
            <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#e0552a" />
                </linearGradient>
              </defs>
              <rect width="80" height="80" fill="url(#bg)" rx="16" />
              {/* Body */}
              <ellipse cx="40" cy="75" rx="26" ry="18" fill="#2d3436" />
              {/* Neck */}
              <rect x="34" y="38" width="12" height="10" fill="#f5d0a9" rx="3" />
              {/* Collar */}
              <polygon points="34,48 40,54 46,48" fill="#dfe6e9" />
              {/* Head */}
              <circle cx="40" cy="30" r="16" fill="#f5d0a9" />
              {/* Hair */}
              <path d="M24 30 Q24 12 40 12 Q56 12 56 30 Q56 22 40 22 Q24 22 24 30" fill="#2d3436" />
              <path d="M24 30 Q22 18 30 14" stroke="#2d3436" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M56 30 Q58 18 50 14" stroke="#2d3436" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Eyes */}
              <ellipse cx="35" cy="30" rx="2.5" ry="3" fill="#2d3436" />
              <ellipse cx="45" cy="30" rx="2.5" ry="3" fill="#2d3436" />
              <circle cx="35.5" cy="29" r="0.8" fill="#fff" />
              <circle cx="45.5" cy="29" r="0.8" fill="#fff" />
              {/* Nose */}
              <path d="M40 31 Q38 35 40 36" stroke="#d4a574" strokeWidth="1" fill="none" />
              {/* Mouth */}
              <path d="M37 39 Q40 42 43 39" stroke="#2d3436" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Blush */}
              <ellipse cx="31" cy="34" rx="3" ry="1.5" fill="#ff9e9e" opacity="0.4" />
              <ellipse cx="49" cy="34" rx="3" ry="1.5" fill="#ff9e9e" opacity="0.4" />
            </svg>
          </button>

          {avatarDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                minWidth: 160,
                borderRadius: 10,
                border: '1px solid',
                padding: '6px',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                zIndex: 100,
                background: 'color-mix(in srgb, var(--theme-primary) 8%, white)',
              }}
              className="border-gray-200 dark:border-gray-700 dark:!bg-[color-mix(in_srgb,var(--theme-primary)_10%,#1f2937)] animate-slide-down"
            >
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: 14,
                  fontWeight: 600,
                }}
                className="text-near-black dark:text-gray-100"
              >
                {t('header.user')}
              </div>
              <div style={{ height: 1, margin: '4px 0' }} className="bg-gray-200 dark:bg-gray-700" />
              <button
                onClick={() => {
                  setAvatarDropdownOpen(false);
                  onNavigateSettings();
                }}
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
                  color: 'var(--color-primary-dark)',
                }}
                className="hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              >
                <HugeiconsIcon icon={UserIcon} size={14} strokeWidth={1.5} className="text-primary" />
                <span className="text-primary-dark">{t('header.profile')}</span>
              </button>
              <button
                onClick={() => {
                  setAvatarDropdownOpen(false);
                }}
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
                  color: 'var(--color-primary-dark)',
                }}
                className="hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              >
                <HugeiconsIcon icon={Logout01Icon} size={14} strokeWidth={1.5} className="text-primary" />
                <span className="text-primary-dark">{t('header.logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
