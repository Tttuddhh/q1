import { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FuncSidebar } from './components/FuncSidebar';
import { PageTree } from './components/PageTree';
import { MainContent } from './components/MainContent';
import { EmptyState } from './components/EmptyState';
import { SearchModal } from './components/SearchModal';
import { DownloadModal } from './components/DownloadModal';
import { SettingsPage } from './components/SettingsPage';
import { SecurityConfirmDialog } from './components/SecurityConfirmDialog';
import { useAppState } from './hooks/useAppState';
import { useSettings } from './hooks/useSettings';
import { useTranslation } from './i18n';
function App() {
  const state = useAppState();
  const settings = useSettings();
  const { t } = useTranslation();
  const currentPage = state.getCurrentPage();
  const breadcrumbPath = state.currentPageId ? state.getPagePath(state.currentPageId) : [];

  // Lifted edit state for auto-save on navigation
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  
  // Security confirm dialog state
  const [securityConfirmOpen, setSecurityConfirmOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{ url: string; filename: string } | null>(null);

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

  // Apply theme color settings
  useEffect(() => {
    const color = settings.appearance.themeColorValue || '#FF743D';
    document.documentElement.style.setProperty('--theme-primary', color);
    document.documentElement.style.setProperty('--theme-primary-dark', color);
  }, [settings.appearance.themeColorValue, settings.appearance.themeColor]);

  // Ensure default theme color is set on mount
  useEffect(() => {
    const current = document.documentElement.style.getPropertyValue('--theme-primary');
    const storedValue = settings.appearance.themeColorValue;
    if (!current || current === '' || !storedValue || storedValue === '') {
      document.documentElement.style.setProperty('--theme-primary', '#FF743D');
      document.documentElement.style.setProperty('--theme-primary-dark', '#FF743D');
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
  
  // Handle file download with security confirmation
  const handleConfirmDownload = useCallback(() => {
    if (pendingDownload) {
      const link = document.createElement('a');
      link.href = pendingDownload.url;
      link.download = pendingDownload.filename;
      link.click();
    }
    setSecurityConfirmOpen(false);
    setPendingDownload(null);
  }, [pendingDownload]);
  
  const handleCancelDownload = useCallback(() => {
    setSecurityConfirmOpen(false);
    setPendingDownload(null);
  }, []);
  
  // Listen for custom file download events from FileNode
  useEffect(() => {
    const handleFileDownloadRequest = (e: CustomEvent<{ url: string; filename: string }>) => {
      setPendingDownload(e.detail);
      setSecurityConfirmOpen(true);
    };
    
    window.addEventListener('file-download-request', handleFileDownloadRequest as EventListener);
    
    return () => {
      window.removeEventListener('file-download-request', handleFileDownloadRequest as EventListener);
    };
  }, []);

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
              onStartEditing={() => state.currentPageId && state.startEditing(state.currentPageId)}
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
      
      <SecurityConfirmDialog
        isOpen={securityConfirmOpen}
        onConfirm={handleConfirmDownload}
        onClose={handleCancelDownload}
      />
    </div>
  );
}

export default App;
