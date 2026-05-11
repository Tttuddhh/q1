import { useState } from 'react';
import { Home, Clock, Bookmark, Tag, Trash2, Settings, ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n';

interface FuncSidebarProps {
  onNavigateHome: () => void;
  onNavigateSettings: () => void;
  currentView: string;
}

interface SectionState {
  knowledge: boolean;
  system: boolean;
}

export function FuncSidebar({
  onNavigateHome,
  onNavigateSettings,
  currentView,
}: FuncSidebarProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [sections, setSections] = useState<SectionState>({
    knowledge: true,
    system: true,
  });

  const toggleSection = (key: keyof SectionState) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`func-sidebar ${expanded ? 'expanded' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Home item */}
      <a
        className={`func-sidebar-item ${currentView === 'home' || currentView === 'page' ? 'active' : ''}`}
        onClick={onNavigateHome}
      >
        <span className="func-sidebar-icon">
          <Home />
        </span>
        <span className="func-sidebar-text">{t('sidebar.home')}</span>
      </a>

      <div className="func-sidebar-divider" />

      {/* Knowledge Management Section */}
      <div
        className="func-section-title"
        onClick={() => toggleSection('knowledge')}
      >
        <ChevronDown
          size={14}
          className={`func-chevron ${!sections.knowledge ? 'collapsed' : ''}`}
          style={{ marginRight: 6, flexShrink: 0 }}
        />
        <span>{t('sidebar.knowledge')}</span>
      </div>

      <div className={`func-section-items ${!sections.knowledge ? 'collapsed' : ''}`}>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <Clock />
          </span>
          <span className="func-sidebar-text">{t('sidebar.time_record')}</span>
        </a>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <Bookmark />
          </span>
          <span className="func-sidebar-text">{t('sidebar.favorites')}</span>
        </a>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <Tag />
          </span>
          <span className="func-sidebar-text">{t('sidebar.tags')}</span>
        </a>
      </div>

      <div className="func-sidebar-divider" />

      {/* System Section */}
      <div
        className="func-section-title"
        onClick={() => toggleSection('system')}
      >
        <ChevronDown
          size={14}
          className={`func-chevron ${!sections.system ? 'collapsed' : ''}`}
          style={{ marginRight: 6, flexShrink: 0 }}
        />
        <span>{t('sidebar.system')}</span>
      </div>

      <div className={`func-section-items ${!sections.system ? 'collapsed' : ''}`}>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <Trash2 />
          </span>
          <span className="func-sidebar-text">{t('sidebar.trash')}</span>
        </a>
        <a
          className={`func-sidebar-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={onNavigateSettings}
        >
          <span className="func-sidebar-icon">
            <Settings />
          </span>
          <span className="func-sidebar-text">{t('sidebar.settings')}</span>
        </a>
      </div>
    </aside>
  );
}
