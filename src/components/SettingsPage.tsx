import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Settings,
  Palette,
  PenLine,
  Bell,
  UserCircle,
  ShieldCheck,
  Database,
  X,
  Sun,
  Moon,
  Monitor,
  Type,
  Clock,
  Calendar,
  Globe,
  AArrowDown,
  AArrowUp,
  Indent,
  WrapText,
  Save,
  Check,
  Smartphone,
  Mail,
  KeyRound,
  Laptop,
  LogOut,
  AlertTriangle,
  Download,
  FileText,
  FileCode,
  FileJson,
  FileType,
  Puzzle,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useTranslation } from '../i18n';
import type { ThemeColor, FontSize, IndentSize, BackupFrequency, Language, DateFormat, TimeFormat } from '../hooks/useSettings';
import { ThemeColorCarousel, colorSchemes } from './ThemeColorCarousel';


type TabId = 'general' | 'appearance' | 'editor' | 'notifications' | 'account' | 'security' | 'data';

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}



const timezones = [
  { value: 'Asia/Shanghai', label: '中国 (UTC+8)' },
  { value: 'Asia/Tokyo', label: '日本 (UTC+9)' },
  { value: 'Asia/Seoul', label: '韩国 (UTC+9)' },
  { value: 'Asia/Singapore', label: '新加坡 (UTC+8)' },
  { value: 'Europe/London', label: '英国 (UTC+0)' },
  { value: 'Europe/Paris', label: '法国 (UTC+1)' },
  { value: 'Europe/Berlin', label: '德国 (UTC+1)' },
  { value: 'America/New_York', label: '美国东部 (UTC-5)' },
  { value: 'America/Los_Angeles', label: '美国西部 (UTC-8)' },
  { value: 'Australia/Sydney', label: '澳大利亚 (UTC+10)' },
  { value: 'Asia/Dubai', label: '阿联酋 (UTC+4)' },
  { value: 'Asia/Kolkata', label: '印度 (UTC+5:30)' },
  { value: 'Europe/Moscow', label: '俄罗斯 (UTC+3)' },
  { value: 'UTC', label: 'UTC (UTC+0)' },
];

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
      className={checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: 2,
          left: checked ? 22 : 2,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '14px 0',
        borderBottom: '1px solid #f3f4f6',
      }}
      className="last:border-0 dark:[border-bottom:1px_solid_#374151]"
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }} className="text-gray-700 dark:text-gray-200">
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 12, marginTop: 2 }} className="text-gray-400 dark:text-gray-500">
            {description}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function SectionCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 20,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="bg-bg-sidebar dark:bg-gray-800/60 section-card"
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 4,
            marginTop: 0,
          }}
          className="text-gray-900 dark:text-gray-100"
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

function SelectDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        outline: 'none',
        minWidth: 160,
      }}
      className="border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function ButtonGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; icon?: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.15s',
          }}
          className={
            value === opt.value
              ? 'border-primary bg-active-bg text-primary-dark dark:bg-gray-700 dark:text-orange-400 dark:border-orange-400'
              : 'border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600'
          }
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Slider({
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 200 }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          flex: 1,
          height: 4,
          borderRadius: 2,
          outline: 'none',
          cursor: 'pointer',
          accentColor: 'var(--color-primary)',
        }}
      />
      <span
        style={{ fontSize: 13, fontWeight: 500, minWidth: 40, textAlign: 'right' }}
        className="text-gray-600 dark:text-gray-400"
      >
        {value}
        {suffix}
      </span>
    </div>
  );
}

interface SettingsPageProps {
  onClose?: () => void;
}

export function SettingsPage({ onClose }: SettingsPageProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [editingProfile, setEditingProfile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 10, top: 8, width: 180, height: 40 });

  // 更新指示器位置
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    const activeBtn = tabRefs.current[activeIndex];
    if (activeBtn && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        top: btnRect.top - navRect.top,
        width: btnRect.width,
        height: btnRect.height,
      });
    }
  }, [activeTab]);

  const {
    theme,
    language,
    notifications,
    timezone,
    dateFormat,
    timeFormat,
    appearance,
    editor,
    security,
    data,
    plugins,
    setTheme,
    setLanguage,
    setNotifications,
    setTimezone,
    setDateFormat,
    setTimeFormat,
    setAppearance,
    setEditor,
    setSecurity,
    setData,
    setPlugins,
  } = useSettings();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      window.history.back();
    }
  }, [onClose]);

  const tabs: TabItem[] = [
    { id: 'general', label: t('settings.tab.general'), icon: <Settings size={18} /> },
    { id: 'appearance', label: t('settings.tab.appearance'), icon: <Palette size={18} /> },
    { id: 'editor', label: t('settings.tab.editor'), icon: <PenLine size={18} /> },
    { id: 'notifications', label: t('settings.tab.notifications'), icon: <Bell size={18} /> },
    { id: 'account', label: t('settings.tab.account'), icon: <UserCircle size={18} /> },
    { id: 'security', label: t('settings.tab.security'), icon: <ShieldCheck size={18} /> },
    { id: 'data', label: t('settings.tab.data'), icon: <Database size={18} /> },
  ];



  const fonts = [
    { value: 'system', label: t('settings.font_system') },
    { value: 'serif', label: t('settings.font_serif') },
    { value: 'mono', label: t('settings.font_mono') },
  ];

  const renderGeneralTab = () => (
    <div className="animate-fade-in">
      <SectionCard>
        <SettingRow label={t('settings.language')} description={t('settings.language_desc')}>
          <SelectDropdown
            value={language}
            options={[
              { value: 'zh', label: '简体中文' },
              { value: 'en', label: 'English' },
              { value: 'ja', label: '日本語' },
              { value: 'ko', label: '한국어' },
            ]}
            onChange={(v) => setLanguage(v as Language)}
          />
        </SettingRow>
        <SettingRow label={t('settings.timezone')} description={t('settings.timezone_desc')}>
          <SelectDropdown
            value={timezone}
            options={timezones}
            onChange={setTimezone}
          />
        </SettingRow>
        <SettingRow label={t('settings.date_format')} description={t('settings.date_format_desc')}>
          <SelectDropdown
            value={dateFormat}
            options={[
              { value: 'YYYY-MM-DD', label: '2024-01-15' },
              { value: 'MM/DD/YYYY', label: '01/15/2024' },
              { value: 'DD/MM/YYYY', label: '15/01/2024' },
              { value: 'YYYY/MM/DD', label: '2024/01/15' },
              { value: 'DD-MM-YYYY', label: '15-01-2024' },
            ]}
            onChange={(v) => setDateFormat(v as DateFormat)}
          />
        </SettingRow>
        <SettingRow label={t('settings.time_format')} description={t('settings.time_format_desc')}>
          <ButtonGroup<TimeFormat>
            value={timeFormat}
            onChange={setTimeFormat}
            options={[
              { value: '24h', label: '24小时制' },
              { value: '12h', label: '12小时制' },
            ]}
          />
        </SettingRow>
      </SectionCard>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="animate-fade-in">
      <SectionCard>
        <SettingRow label={t('settings.theme')} description={t('settings.theme_desc')}>
          <ButtonGroup
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'light', label: t('settings.theme_light'), icon: <Sun size={16} /> },
              { value: 'dark', label: t('settings.theme_dark'), icon: <Moon size={16} /> },
              { value: 'system', label: t('settings.theme_system'), icon: <Monitor size={16} /> },
            ]}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="主题配色">
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
            选择你喜欢的配色方案，每个方案包含一组协调的颜色
          </div>
          <ThemeColorCarousel
            selectedScheme={appearance.themeColor || 'brand'}
            onSelect={(schemeId) => {
              const scheme = colorSchemes.find(s => s.id === schemeId);
              if (scheme) {
                setAppearance({ themeColor: scheme.id as ThemeColor });
              }
            }}
          />
        </div>
      </SectionCard>

      <SectionCard>
        <SettingRow label={t('settings.sidebar_width')} description={t('settings.sidebar_width_desc')}>
          <Slider
            value={appearance.sidebarWidth}
            min={200}
            max={320}
            step={10}
            onChange={(v) => setAppearance({ sidebarWidth: v })}
            suffix="px"
          />
        </SettingRow>
        <SettingRow label={t('settings.compact_mode')} description={t('settings.compact_mode_desc')}>
          <ToggleSwitch
            checked={appearance.compactMode}
            onChange={() => setAppearance({ compactMode: !appearance.compactMode })}
          />
        </SettingRow>
      </SectionCard>
    </div>
  );

  const renderEditorTab = () => (
    <div className="animate-fade-in">
      <SectionCard>
        <SettingRow label={t('settings.auto_save')} description={t('settings.auto_save_desc')}>
          <ToggleSwitch
            checked={editor.autoSave}
            onChange={() => setEditor({ autoSave: !editor.autoSave })}
          />
        </SettingRow>
        {editor.autoSave && (
          <SettingRow label={t('settings.auto_save_interval')} description={t('settings.auto_save_interval_desc')}>
            <Slider
              value={editor.autoSaveInterval}
              min={10}
              max={120}
              step={5}
              onChange={(v) => setEditor({ autoSaveInterval: v })}
              suffix="秒"
            />
          </SettingRow>
        )}
        <SettingRow label={t('settings.spell_check')} description={t('settings.spell_check_desc')}>
          <ToggleSwitch
            checked={editor.spellCheck}
            onChange={() => setEditor({ spellCheck: !editor.spellCheck })}
          />
        </SettingRow>
        <SettingRow label={t('settings.word_wrap')} description={t('settings.word_wrap_desc')}>
          <ToggleSwitch
            checked={editor.wordWrap}
            onChange={() => setEditor({ wordWrap: !editor.wordWrap })}
          />
        </SettingRow>
        <SettingRow label={t('settings.font_size')} description={t('settings.font_size_desc')}>
          <ButtonGroup<FontSize>
            value={editor.fontSize}
            onChange={(v) => setEditor({ fontSize: v })}
            options={[
              { value: 'small', label: 'Aa小', icon: <AArrowDown size={14} /> },
              { value: 'medium', label: 'Aa中', icon: <Type size={14} /> },
              { value: 'large', label: 'Aa大', icon: <AArrowUp size={14} /> },
              { value: 'xlarge', label: 'Aa特大', icon: <AArrowUp size={16} /> },
            ]}
          />
        </SettingRow>
        <SettingRow label={t('settings.indent_size')} description={t('settings.indent_size_desc')}>
          <SelectDropdown
            value={editor.indentSize}
            options={[
              { value: '2', label: '2空格' },
              { value: '4', label: '4空格' },
              { value: 'tab', label: 'Tab' },
            ]}
            onChange={(v) => setEditor({ indentSize: v as IndentSize })}
          />
        </SettingRow>
        <SettingRow label={t('settings.default_font')} description={t('settings.default_font_desc')}>
          <SelectDropdown
            value={editor.defaultFont}
            options={fonts}
            onChange={(v) => setEditor({ defaultFont: v })}
          />
        </SettingRow>
      </SectionCard>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="animate-fade-in">
      <SectionCard title="邮件通知">
        <SettingRow label={t('settings.email_page_update')} description={t('settings.email_page_update_desc')}>
          <ToggleSwitch
            checked={notifications.emailPageUpdate}
            onChange={() => setNotifications({ emailPageUpdate: !notifications.emailPageUpdate })}
          />
        </SettingRow>
        <SettingRow label={t('settings.email_comment_reply')} description={t('settings.email_comment_reply_desc')}>
          <ToggleSwitch
            checked={notifications.emailCommentReply}
            onChange={() => setNotifications({ emailCommentReply: !notifications.emailCommentReply })}
          />
        </SettingRow>
        <SettingRow label={t('settings.email_mention')} description={t('settings.email_mention_desc')}>
          <ToggleSwitch
            checked={notifications.emailMention}
            onChange={() => setNotifications({ emailMention: !notifications.emailMention })}
          />
        </SettingRow>
        <SettingRow label={t('settings.email_system')} description={t('settings.email_system_desc')}>
          <ToggleSwitch
            checked={notifications.emailSystem}
            onChange={() => setNotifications({ emailSystem: !notifications.emailSystem })}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="推送通知">
        <SettingRow label={t('settings.push_page_update')} description={t('settings.push_page_update_desc')}>
          <ToggleSwitch
            checked={notifications.pushPageUpdate}
            onChange={() => setNotifications({ pushPageUpdate: !notifications.pushPageUpdate })}
          />
        </SettingRow>
        <SettingRow label={t('settings.push_comment_reply')} description={t('settings.push_comment_reply_desc')}>
          <ToggleSwitch
            checked={notifications.pushCommentReply}
            onChange={() => setNotifications({ pushCommentReply: !notifications.pushCommentReply })}
          />
        </SettingRow>
        <SettingRow label={t('settings.push_mention')} description={t('settings.push_mention_desc')}>
          <ToggleSwitch
            checked={notifications.pushMention}
            onChange={() => setNotifications({ pushMention: !notifications.pushMention })}
          />
        </SettingRow>
        <SettingRow label={t('settings.push_system')} description={t('settings.push_system_desc')}>
          <ToggleSwitch
            checked={notifications.pushSystem}
            onChange={() => setNotifications({ pushSystem: !notifications.pushSystem })}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <SettingRow label={t('settings.dnd')} description={t('settings.dnd_desc')}>
          <ToggleSwitch
            checked={!notifications.updates}
            onChange={() => setNotifications({ updates: !notifications.updates })}
          />
        </SettingRow>
      </SectionCard>
    </div>
  );

  const renderAccountTab = () => (
    <div className="animate-fade-in">
      <SectionCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #f3f4f6',
              flexShrink: 0,
            }}
            className="dark:[border:2px_solid_#374151]"
          >
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=user"
              alt="Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }} className="text-gray-900 dark:text-gray-100">
              知识库用户
            </div>
            <div style={{ fontSize: 13, marginTop: 4 }} className="text-gray-400 dark:text-gray-500">
              免费版用户
            </div>
          </div>
        </div>

        <SettingRow label={t('settings.username')} description={t('settings.username_desc')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="text"
              defaultValue="knowledge_user"
              disabled={!editingProfile}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid',
                fontSize: 14,
                width: 180,
                outline: 'none',
              }}
              className="border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 disabled:opacity-50"
            />
            <button
              onClick={() => setEditingProfile(!editingProfile)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              className="border-primary text-primary-dark bg-active-bg dark:bg-gray-700 dark:text-orange-400 dark:border-orange-400"
            >
              {editingProfile ? t('settings.save') : t('settings.edit_profile')}
            </button>
          </div>
        </SettingRow>
        <SettingRow label={t('settings.email')} description={t('settings.email_desc')}>
          <input
            type="email"
            defaultValue="user@example.com"
            disabled={!editingProfile}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid',
              fontSize: 14,
              width: 220,
              outline: 'none',
            }}
            className="border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
        </SettingRow>
        <SettingRow label={t('settings.bio')} description={t('settings.bio_desc')}>
          <textarea
            defaultValue="热爱知识管理，喜欢整理和分享。"
            disabled={!editingProfile}
            rows={2}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid',
              fontSize: 14,
              width: 260,
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
            className="border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="账号统计">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '8px 0' }}>
          {[
            { label: t('settings.stats_pages'), value: '128', icon: <FileText size={20} className="text-primary" /> },
            { label: t('settings.stats_words'), value: '45.2K', icon: <Type size={20} className="text-primary" /> },
            { label: t('settings.stats_days'), value: '365', icon: <Calendar size={20} className="text-primary" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '16px 12px',
                borderRadius: 10,
              }}
              className="bg-white dark:bg-gray-900"
            >
              {stat.icon}
              <div style={{ fontSize: 20, fontWeight: 700 }} className="text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div style={{ fontSize: 12 }} className="text-gray-400 dark:text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="animate-fade-in">
      <SectionCard>
        <SettingRow label={t('settings.2fa')} description={t('settings.2fa_desc')}>
          <ToggleSwitch
            checked={security.twoFactor}
            onChange={() => setSecurity({ twoFactor: !security.twoFactor })}
          />
        </SettingRow>
        <SettingRow label={t('settings.password')} description={t('settings.password_desc')}>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
            className="border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
          >
            {t('settings.change_password')}
          </button>
        </SettingRow>
        <SettingRow label={t('settings.phone')} description={security.phoneBound ? t('settings.phone_bound') : t('settings.phone_bind')}>
          <button
            onClick={() => setSecurity({ phoneBound: !security.phoneBound })}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            className={
              security.phoneBound
                ? 'border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                : 'border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600'
            }
          >
            {security.phoneBound ? <Check size={14} /> : <Smartphone size={14} />}
            {security.phoneBound ? t('settings.phone_bound_btn') : t('settings.phone_bind_btn')}
          </button>
        </SettingRow>
        <SettingRow label={t('settings.email_verify')} description={security.emailVerified ? t('settings.email_verified') : t('settings.email_unverified')}>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            className={
              security.emailVerified
                ? 'border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                : 'border-gray-200 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600'
            }
          >
            {security.emailVerified ? <Check size={14} /> : <Mail size={14} />}
            {security.emailVerified ? t('settings.email_verified_btn') : t('settings.email_verify_btn')}
          </button>
        </SettingRow>
      </SectionCard>

      <SectionCard title={t('settings.devices')}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'MacBook Pro', location: '上海', time: '当前在线', current: true },
            { name: 'iPhone 15', location: '上海', time: '2小时前', current: false },
            { name: 'Windows PC', location: '北京', time: '3天前', current: false },
          ].map((device) => (
            <div
              key={device.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid',
              }}
              className="border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Laptop size={18} className="text-gray-400 dark:text-gray-500" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }} className="text-gray-700 dark:text-gray-200">
                    {device.name}
                    {device.current && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontWeight: 600,
                        }}
                        className="bg-primary/10 text-primary-dark"
                      >
                        {t('settings.current')}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, marginTop: 2 }} className="text-gray-400 dark:text-gray-500">
                    {device.location} · {device.time}
                  </div>
                </div>
              </div>
              {!device.current && (
                <button
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  {t('settings.logout_device')}
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="危险操作">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #fca5a5',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
            }}
            className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            onClick={() => {
              if (confirm('确定要退出所有其他设备吗？')) {
                alert('已退出所有其他设备');
              }
            }}
          >
            <LogOut size={16} />
            {t('settings.logout_all')}
          </button>
          <button
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #fca5a5',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
            }}
            className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            onClick={() => {
              if (confirm('确定要注销账号吗？此操作不可恢复，所有数据将被永久删除。')) {
                alert('账号注销申请已提交');
              }
            }}
          >
            <AlertTriangle size={16} />
            {t('settings.delete_account')}
          </button>
        </div>
      </SectionCard>
    </div>
  );

  const renderDataTab = () => (
    <div className="animate-fade-in">
      <SectionCard>
        <SettingRow label={t('settings.auto_backup')} description={t('settings.auto_backup_desc')}>
          <ToggleSwitch
            checked={data.autoBackup}
            onChange={() => setData({ autoBackup: !data.autoBackup })}
          />
        </SettingRow>
        {data.autoBackup && (
          <SettingRow label={t('settings.backup_freq')} description={t('settings.backup_freq_desc')}>
            <SelectDropdown
              value={data.backupFrequency}
              options={[
                { value: 'daily', label: t('settings.backup_daily') },
                { value: 'weekly', label: t('settings.backup_weekly') },
                { value: 'monthly', label: t('settings.backup_monthly') },
              ]}
              onChange={(v) => setData({ backupFrequency: v as BackupFrequency })}
            />
          </SettingRow>
        )}
      </SectionCard>

      <SectionCard title={t('settings.storage')}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }} className="text-gray-600 dark:text-gray-400">
              已使用 2.4 GB / 5 GB
            </span>
            <span style={{ fontSize: 13, fontWeight: 500 }} className="text-primary">
              48%
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 4,
              background: '#e5e7eb',
              overflow: 'hidden',
            }}
            className="dark:bg-gray-700"
          >
            <div
              style={{
                height: '100%',
                width: '48%',
                borderRadius: 4,
                background: 'var(--color-primary)',
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title={t('settings.export')}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {[
            { label: 'Markdown', icon: <FileText size={16} /> },
            { label: 'HTML', icon: <FileCode size={16} /> },
            { label: 'JSON', icon: <FileJson size={16} /> },
            { label: 'PDF', icon: <FileType size={16} /> },
          ].map((fmt) => (
            <button
              key={fmt.label}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                justifyContent: 'center',
              }}
              className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              {fmt.icon}
              {fmt.label}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t('settings.plugins')}>
        <SettingRow label={t('settings.plugin_toc')} description={t('settings.plugin_toc_desc')}>
          <ToggleSwitch
            checked={plugins.tableOfContents}
            onChange={() => setPlugins({ tableOfContents: !plugins.tableOfContents })}
          />
        </SettingRow>
        <SettingRow label={t('settings.plugin_mindmap')} description={t('settings.plugin_mindmap_desc')}>
          <ToggleSwitch
            checked={plugins.mindMap}
            onChange={() => setPlugins({ mindMap: !plugins.mindMap })}
          />
        </SettingRow>
        <SettingRow label={t('settings.plugin_code')} description={t('settings.plugin_code_desc')}>
          <ToggleSwitch
            checked={plugins.codeHighlight}
            onChange={() => setPlugins({ codeHighlight: !plugins.codeHighlight })}
          />
        </SettingRow>
        <SettingRow label={t('settings.plugin_math')} description={t('settings.plugin_math_desc')}>
          <ToggleSwitch
            checked={plugins.mathFormula}
            onChange={() => setPlugins({ mathFormula: !plugins.mathFormula })}
          />
        </SettingRow>
        <SettingRow label={t('settings.plugin_drawio')} description={t('settings.plugin_drawio_desc')}>
          <ToggleSwitch
            checked={plugins.drawIO}
            onChange={() => setPlugins({ drawIO: !plugins.drawIO })}
          />
        </SettingRow>
        <SettingRow label={t('settings.plugin_mermaid')} description={t('settings.plugin_mermaid_desc')}>
          <ToggleSwitch
            checked={plugins.mermaid}
            onChange={() => setPlugins({ mermaid: !plugins.mermaid })}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <button
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: '1px solid #fca5a5',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            justifyContent: 'center',
          }}
          className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
          onClick={() => {
            if (confirm('确定要删除所有数据吗？此操作不可恢复。')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          <Trash2 size={16} />
          {t('settings.delete_all')}
        </button>
      </SectionCard>
    </div>
  );

  const tabContentMap: Record<TabId, () => React.ReactNode> = {
    general: renderGeneralTab,
    appearance: renderAppearanceTab,
    editor: renderEditorTab,
    notifications: renderNotificationsTab,
    account: renderAccountTab,
    security: renderSecurityTab,
    data: renderDataTab,
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      className="modal-overlay"
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          height: '90vh',
          maxHeight: 800,
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
        className="bg-white dark:bg-gray-900"
      >
        {/* Left Sidebar */}
        <div
          style={{
            width: 200,
            minWidth: 200,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #f3f4f6',
          }}
          className="dark:[border-right:1px_solid_#374151] bg-gray-50/50 dark:bg-gray-900/50"
        >
          <div
            style={{
              padding: '20px 16px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                margin: 0,
              }}
              className="text-gray-900 dark:text-gray-100"
            >
              {t('settings.title')}
            </h2>
            <button
              onClick={handleClose}
              className="settings-close-btn text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {/* 左侧边缘淡出 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 24,
                zIndex: 2,
                pointerEvents: 'none',
              }}
              className="settings-fade-left"
            />
            {/* 右侧边缘淡出 */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 24,
                zIndex: 2,
                pointerEvents: 'none',
              }}
              className="settings-fade-right"
            />
            <nav
              ref={navRef}
              style={{
                flex: 1,
                overflow: 'hidden',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* 活动指示器方框 - 绝对定位，平滑移动 */}
              <div
                className="settings-indicator"
                style={{
                  position: 'absolute',
                  left: indicatorStyle.left,
                  top: indicatorStyle.top,
                  width: indicatorStyle.width,
                  height: indicatorStyle.height,
                  borderRadius: 8,
                  background: 'var(--color-active-bg)',
                  zIndex: 0,
                }}
              />
              {/* 静态标签列表 */}
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 2,
                    transition: 'color 0.2s ease',
                    textAlign: 'left',
                    color: activeTab === tab.id ? 'var(--color-primary-dark)' : 'inherit',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                    }}
                    className={activeTab === tab.id ? 'text-primary dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <ChevronRight size={14} style={{ marginLeft: 'auto' }} className="text-primary dark:text-orange-400" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '28px 32px',
          }}
          className="page-tree-scroll"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span className="text-primary dark:text-orange-400">
              {tabs.find((t) => t.id === activeTab)?.icon}
            </span>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
              }}
              className="text-gray-900 dark:text-gray-100"
            >
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          <div key={activeTab} className="settings-tab-content">
            {tabContentMap[activeTab]()}
          </div>
        </div>
      </div>
    </div>
  );
}
