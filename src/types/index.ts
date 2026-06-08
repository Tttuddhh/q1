export interface Page {
  id: string;
  title: string;
  emoji: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  children?: Page[];
  isExpanded?: boolean;
  isNewlyCreated?: boolean;
  isEdited?: boolean;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
  isExpanded: boolean;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

export type ViewType = 'home' | 'settings' | 'page' | 'market';

export interface AppState {
  sidebarExpanded: boolean;
  currentView: ViewType;
  currentPageId: string | null;
  searchOpen: boolean;
  downloadOpen: boolean;
  pages: Page[];
}
