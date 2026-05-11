import { useState, useRef, useEffect } from 'react';
import { PanelLeft, Home, ChevronRight, Search, Download, Share2, Settings, User, LogOut } from 'lucide-react';
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
          <PanelLeft size={20} />
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
            <Home size={16} />
          </button>

          <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />

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
                      background: isLast ? '#f3f4f6' : 'transparent',
                      border: 'none',
                      cursor: isLast ? 'default' : 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    className={`text-near-black dark:text-gray-100 ${!isLast ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : ''}`}
                  >
                    <span>{page.emoji}</span>
                    <span>{page.isEdited === false ? t('page.untitled') : page.title}</span>
                  </button>
                  {!isLast && <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />}
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
                background: '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
              }}
              className="text-near-black dark:bg-gray-800 dark:text-gray-100"
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
          <Search size={14} />
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
          <Download size={18} />
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
          <Share2 size={18} />
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
          <Settings size={18} />
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
              background: 'transparent',
            }}
          >
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=user"
              alt="User"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
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
              }}
              className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 animate-slide-down"
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
                }}
                className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <User size={14} />
                {t('header.profile')}
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
                }}
                className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <LogOut size={14} />
                {t('header.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
