import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { FuncSidebar } from './components/FuncSidebar';
import { PageTree } from './components/PageTree';
import { MainContent } from './components/MainContent';
import { EmptyState } from './components/EmptyState';
import { SearchModal } from './components/SearchModal';
import { DownloadModal } from './components/DownloadModal';
import { SettingsPage } from './components/SettingsPage';
import { useAppState } from './hooks/useAppState';
import { useSettings } from './hooks/useSettings';
import { useTranslation } from './i18n';

const themeColorMap: Record<string, string> = {
  orange: '#ff6a3d',
  blue: '#3b82f6',
  green: '#22c55e',
  purple: '#a855f7',
  pink: '#ec4899',
  amber: '#f59e0b',
};

function App() {
  const state = useAppState();
  const settings = useSettings();
  const { t } = useTranslation();
  const currentPage = state.getCurrentPage();
  const breadcrumbPath = state.currentPageId ? state.getPagePath(state.currentPageId) : [];

  // Lifted edit state for auto-save on navigation
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);

  const isEditing = state.editingPageId === state.currentPageId;

  // Auto-save helper
  const autoSave = () => {
    if (isEditing && state.currentPageId) {
      state.updatePage(state.currentPageId, { content: editContent, tags: editTags });
      state.stopEditing();
    }
  };

  const handleNavigateToPage = (pageId: string) => {
    autoSave();
    state.navigateToPage(pageId);
  };

  const handleNavigateToHome = () => {
    autoSave();
    state.navigateToHome();
  };

  const handleNavigateToSettings = () => {
    autoSave();
    state.navigateToSettings();
  };

  // Apply settings
  useEffect(() => {
    const color = themeColorMap[settings.appearance.themeColor] || '#ff6a3d';
    document.documentElement.style.setProperty('--color-primary', color);
    document.documentElement.style.setProperty('--color-primary-dark', color);
  }, [settings.appearance.themeColor]);

  // Ensure default theme color is set on mount
  useEffect(() => {
    const current = document.documentElement.style.getPropertyValue('--color-primary');
    if (!current || current === '') {
      document.documentElement.style.setProperty('--color-primary', '#ff6a3d');
      document.documentElement.style.setProperty('--color-primary-dark', '#ea580c');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = settings.language === 'zh' ? 'zh-CN' : settings.language;
  }, [settings.language]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        state.openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.openSearch]);

  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}
      className={`bg-white dark:bg-gray-900 ${settings.appearance.compactMode ? 'compact-mode' : ''}`}
    >
      {/* Left Sidebar */}
      <FuncSidebar
        onNavigateHome={handleNavigateToHome}
        onNavigateSettings={handleNavigateToSettings}
        currentView={state.currentView}
      />

      {/* Main area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Header
          onTogglePageTree={state.togglePageTree}
          currentPageTitle={currentPage ? (currentPage.isEdited === false ? t('page.untitled') : currentPage.title) : t('sidebar.home')}
          currentPageEmoji={currentPage?.emoji || '🏠'}
          onOpenSearch={state.openSearch}
          onOpenDownload={state.openDownload}
          onNavigateHome={handleNavigateToHome}
          onNavigateSettings={handleNavigateToSettings}
          breadcrumbPath={breadcrumbPath}
          onNavigateToPage={handleNavigateToPage}
        />

        {/* Content area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Page Tree - always rendered but hidden on settings page */}
          <div
            className={`page-tree-wrapper ${state.pageTreeVisible && state.currentView !== 'settings' ? '' : 'collapsed'}`}
            style={{
              width: state.pageTreeVisible ? settings.appearance.sidebarWidth : 0,
              minWidth: state.pageTreeVisible ? settings.appearance.sidebarWidth : 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="page-tree-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <PageTree
                pages={state.pages}
                currentPageId={state.currentPageId}
                onNavigateToPage={handleNavigateToPage}
                onToggleExpanded={state.togglePageExpanded}
                onCreatePage={state.createPage}
                onEditPage={state.startEditing}
                onDeletePage={state.deletePage}
                onRenamePage={(pageId, newTitle) => state.updatePage(pageId, { title: newTitle })}
              />
            </div>
          </div>

          {/* Main Content */}
          {state.currentView === 'settings' ? (
            <SettingsPage onClose={() => {
              if (state.currentPageId) {
                state.setCurrentView('page');
              } else {
                state.setCurrentView('home');
              }
            }} />
          ) : state.currentPageId === null ? (
            <EmptyState onCreatePage={state.createPage} />
          ) : (
            <MainContent
              page={currentPage}
              onCreatePage={state.createPage}
              onUpdatePage={state.updatePage}
              isEditing={isEditing}
              onStopEditing={state.stopEditing}
              editContent={editContent}
              onEditContentChange={setEditContent}
              editTags={editTags}
              onEditTagsChange={setEditTags}
              dateFormat={settings.dateFormat}
              timezone={settings.timezone}
              editorFontSize={settings.editor.fontSize}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={state.searchOpen}
        onClose={state.closeSearch}
        pages={state.pages}
        onNavigateToPage={handleNavigateToPage}
      />

      <DownloadModal
        isOpen={state.downloadOpen}
        onClose={state.closeDownload}
      />
    </div>
  );
}

export default App;
