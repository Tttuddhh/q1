import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Page, ViewType } from '../types';
import { initialPages } from '../data/initialData';
import { t } from '../i18n';

const STORAGE_KEY = 'knowledge-base-data';

function loadPages(): Page[] {
  // Force reset to new initial data every time (for demo purposes)
  // In production, you would check version and migrate data properly
  return initialPages.map(p => ({ ...p, isEdited: true }));
}

function savePages(pages: Page[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch {
    // ignore
  }
}

export function useAppState() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [pageTreeVisible, setPageTreeVisible] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('page');
  const [currentPageId, setCurrentPageId] = useState<string | null>('1');
  const [searchOpen, setSearchOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [pages, setPages] = useState<Page[]>(loadPages);

  useEffect(() => {
    savePages(pages);
  }, [pages]);

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);

  const togglePageTree = useCallback(() => {
    setPageTreeVisible(prev => !prev);
  }, []);

  const navigateToPage = useCallback((pageId: string) => {
    setCurrentPageId(pageId);
    setCurrentView('page');
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentView('home');
    // Don't reset currentPageId to avoid tree re-render
  }, []);

  const navigateToSettings = useCallback(() => {
    setCurrentView('settings');
  }, []);

  const navigateToMarket = useCallback(() => {
    setCurrentView('market');
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const openDownload = useCallback(() => {
    setDownloadOpen(true);
  }, []);

  const closeDownload = useCallback(() => {
    setDownloadOpen(false);
  }, []);

  const startEditing = useCallback((pageId: string) => {
    setEditingPageId(pageId);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingPageId(null);
  }, []);

  const findPageById = useCallback((id: string, pageList: Page[] = pages): Page | null => {
    for (const page of pageList) {
      if (page.id === id) return page;
      if (page.children) {
        const found = findPageById(id, page.children);
        if (found) return found;
      }
    }
    return null;
  }, [pages]);

  const getCurrentPage = useCallback((): Page | null => {
    if (!currentPageId) return null;
    return findPageById(currentPageId);
  }, [currentPageId, findPageById]);

  const getPagePath = useCallback((pageId: string): Page[] => {
    const path: Page[] = [];
    const findPath = (list: Page[]): boolean => {
      for (const page of list) {
        if (page.id === pageId) {
          path.push(page);
          return true;
        }
        if (page.children) {
          if (findPath(page.children)) {
            path.unshift(page);
            return true;
          }
        }
      }
      return false;
    };
    findPath(pages);
    return path;
  }, [pages]);

  const togglePageExpanded = useCallback((pageId: string) => {
    setPages(prev => {
      const updatePage = (list: Page[]): Page[] => {
        return list.map(p => {
          if (p.id === pageId) {
            return { ...p, isExpanded: !p.isExpanded };
          }
          if (p.children) {
            return { ...p, children: updatePage(p.children) };
          }
          return p;
        });
      };
      return updatePage(prev);
    });
  }, []);

  const createPage = useCallback((parentId?: string) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: t('page.untitled'),
      emoji: '📄',
      content: t('page.default_content'),
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      parentId,
      isNewlyCreated: true,
      isEdited: false,
    };

    setPages(prev => {
      if (parentId) {
        const addChild = (list: Page[]): Page[] => {
          return list.map(p => {
            if (p.id === parentId) {
              return {
                ...p,
                isExpanded: true,
                children: [...(p.children || []), newPage]
              };
            }
            if (p.children) {
              return { ...p, children: addChild(p.children) };
            }
            return p;
          });
        };
        return addChild(prev);
      }
      return [...prev, newPage];
    });

    // Clear the isNewlyCreated flag after animation completes
    setTimeout(() => {
      setPages(prev => {
        const clearFlag = (list: Page[]): Page[] => {
          return list.map(p => {
            if (p.id === newPage.id) {
              const { isNewlyCreated, ...rest } = p;
              return rest;
            }
            if (p.children) {
              return { ...p, children: clearFlag(p.children) };
            }
            return p;
          });
        };
        return clearFlag(prev);
      });
    }, 1000);

    setCurrentPageId(newPage.id);
    setCurrentView('page');
    return newPage.id;
  }, []);

  const allPages = useCallback((): Page[] => {
    const result: Page[] = [];
    const flatten = (list: Page[]) => {
      for (const p of list) {
        result.push(p);
        if (p.children) flatten(p.children);
      }
    };
    flatten(pages);
    return result;
  }, [pages]);

  const updatePage = useCallback((pageId: string, updates: Partial<Page>) => {
    setPages(prev => {
      const updateInList = (list: Page[]): Page[] => {
        return list.map(p => {
          if (p.id === pageId) {
            return { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0], isEdited: true };
          }
          if (p.children) {
            return { ...p, children: updateInList(p.children) };
          }
          return p;
        });
      };
      return updateInList(prev);
    });
  }, []);

  const deletePage = useCallback((pageId: string) => {
    setPages(prev => {
      const deleteFromList = (list: Page[]): Page[] => {
        return list
          .filter(p => p.id !== pageId)
          .map(p => {
            if (p.children) {
              return { ...p, children: deleteFromList(p.children) };
            }
            return p;
          });
      };
      return deleteFromList(prev);
    });

    // If the deleted page is currently being viewed, navigate to home
    setCurrentPageId(currentId => {
      if (currentId === pageId) {
        setCurrentView('home');
        return null;
      }
      return currentId;
    });
  }, []);

  const state = useMemo(() => ({
    sidebarExpanded,
    toggleSidebar,
    pageTreeVisible,
    togglePageTree,
    currentView,
    setCurrentView,
    currentPageId,
    searchOpen,
    downloadOpen,
    pages,
    navigateToPage,
    navigateToHome,
    navigateToSettings,
    navigateToMarket,
    openSearch,
    closeSearch,
    openDownload,
    closeDownload,
    getCurrentPage,
    togglePageExpanded,
    createPage,
    allPages,
    getPagePath,
    updatePage,
    deletePage,
    editingPageId,
    startEditing,
    stopEditing,
  }), [
    sidebarExpanded,
    toggleSidebar,
    pageTreeVisible,
    togglePageTree,
    currentView,
    setCurrentView,
    currentPageId,
    searchOpen,
    downloadOpen,
    pages,
    navigateToPage,
    navigateToHome,
    navigateToSettings,
    navigateToMarket,
    openSearch,
    closeSearch,
    openDownload,
    closeDownload,
    getCurrentPage,
    togglePageExpanded,
    createPage,
    allPages,
    getPagePath,
    updatePage,
    deletePage,
    editingPageId,
    startEditing,
    stopEditing,
  ]);

  return state;
}
