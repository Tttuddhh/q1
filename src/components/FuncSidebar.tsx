import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, Clock01Icon, Bookmark01Icon, Tag01Icon, ArchiveIcon, Settings01Icon, ArrowDown01Icon, PackageIcon } from '@hugeicons/core-free-icons';
import { useTranslation } from '../i18n';

interface FuncSidebarProps {
  onNavigateHome: () => void;
  onNavigateSettings: () => void;
  onNavigateContainerMarketplace: () => void;
  currentView: string;
}

interface SectionState {
  knowledge: boolean;
  system: boolean;
}

export function FuncSidebar({
  onNavigateHome,
  onNavigateSettings,
  onNavigateContainerMarketplace,
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
          <HugeiconsIcon icon={Home01Icon} size={20} strokeWidth={1.5} />
        </span>
        <span className="func-sidebar-text">{t('sidebar.home')}</span>
      </a>

      <div className="func-sidebar-divider" />

      {/* Knowledge Management Section */}
      <div
        className="func-section-title"
        onClick={() => toggleSection('knowledge')}
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          strokeWidth={1.5}
          className={`func-chevron ${!sections.knowledge ? 'collapsed' : ''}`}
          style={{ marginRight: 6, flexShrink: 0 }}
        />
        <span>{t('sidebar.knowledge')}</span>
      </div>

      <div className={`func-section-items ${!sections.knowledge ? 'collapsed' : ''}`}>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <HugeiconsIcon icon={Clock01Icon} size={20} strokeWidth={1.5} />
          </span>
          <span className="func-sidebar-text">{t('sidebar.time_record')}</span>
        </a>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <HugeiconsIcon icon={Bookmark01Icon} size={20} strokeWidth={1.5} />
          </span>
          <span className="func-sidebar-text">{t('sidebar.favorites')}</span>
        </a>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <HugeiconsIcon icon={Tag01Icon} size={20} strokeWidth={1.5} />
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
    <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          strokeWidth={1.5}
          className={`func-chevron ${!sections.system ? 'collapsed' : ''}`}
          style={{ marginRight: 6, flexShrink: 0 }}
        />
        <span>{t('sidebar.system')}</span>
      </div>

      <div className={`func-section-items ${!sections.system ? 'collapsed' : ''}`}>
        <a
          className={`func-sidebar-item ${currentView === 'container_marketplace' ? 'active' : ''}`}
          onClick={onNavigateContainerMarketplace}
        >
          <span className="func-sidebar-icon">
            <HugeiconsIcon icon={PackageIcon} size={20} strokeWidth={1.5} />
          </span>
          <span className="func-sidebar-text">容器</span>
        </a>
        <a className="func-sidebar-item">
          <span className="func-sidebar-icon">
            <HugeiconsIcon icon={ArchiveIcon} size={20} strokeWidth={1.5} />
          </span>
          <span className="func-sidebar-text">{t('sidebar.trash')}</span>
        </a>
        <a
          className={`func-sidebar-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={onNavigateSettings}
        >
          <span className="func-sidebar-icon">
            <HugeiconsIcon icon={Settings01Icon} size={20} strokeWidth={1.5} />
          </span>
          <span className="func-sidebar-text">{t('sidebar.settings')}</span>
        </a>
      </div>
    </aside>
  );
}
