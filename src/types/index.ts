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

export type ViewType = 'home' | 'settings' | 'page' | 'container_marketplace';

export interface Container {
  id: string;
  name: string;
  author: string;
  description: string;
  rating: number;
  installs: number;
  categories: string[];
  cover: string;
  previews: string[];
  tabs: {
    description: string;
    features: { name: string; implemented: boolean }[];
    tutorial: string;
    updates: { date: string; version: string; content: string }[];
    other: { label: string; value: string }[];
  };
  iconColor: string;
}

export interface AppState {
  sidebarExpanded: boolean;
  currentView: ViewType;
  currentPageId: string | null;
  searchOpen: boolean;
  downloadOpen: boolean;
  pages: Page[];
}
