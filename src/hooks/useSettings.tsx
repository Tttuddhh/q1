import { useState, useEffect, useCallback, useMemo, createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'zh' | 'en' | 'ja' | 'ko';
export type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD' | 'DD-MM-YYYY';
export type TimeFormat = '24h' | '12h';
export type ThemeColor = 'low-saturation' | 'fresh' | 'summer' | 'bauhaus' | 'brand' | 'elegant' | 'nature' | 'ocean';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type IndentSize = '2' | '4' | 'tab';
export type BackupFrequency = 'daily' | 'weekly' | 'monthly';

export interface Notifications {
  email: boolean;
  push: boolean;
  updates: boolean;
  emailPageUpdate: boolean;
  emailCommentReply: boolean;
  emailMention: boolean;
  emailSystem: boolean;
  pushPageUpdate: boolean;
  pushCommentReply: boolean;
  pushMention: boolean;
  pushSystem: boolean;
}

export interface EditorSettings {
  autoSave: boolean;
  autoSaveInterval: number;
  spellCheck: boolean;
  wordWrap: boolean;
  fontSize: FontSize;
  indentSize: IndentSize;
  defaultFont: string;
}

export interface AppearanceSettings {
  themeColor: ThemeColor;
  themeColorValue: string;
  themeColorVariantHex?: string;
  sidebarWidth: number;
  compactMode: boolean;
}

export interface SecuritySettings {
  twoFactor: boolean;
  phoneBound: boolean;
  emailVerified: boolean;
}

export interface DataSettings {
  autoBackup: boolean;
  backupFrequency: BackupFrequency;
}

export interface PluginSettings {
  tableOfContents: boolean;
  mindMap: boolean;
  codeHighlight: boolean;
  mathFormula: boolean;
  drawIO: boolean;
  mermaid: boolean;
}

export interface Settings {
  theme: Theme;
  language: Language;
  notifications: Notifications;
  timezone: string;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  appearance: AppearanceSettings;
  editor: EditorSettings;
  security: SecuritySettings;
  data: DataSettings;
  plugins: PluginSettings;
}

const THEME_KEY = 'kb-theme';
const LANGUAGE_KEY = 'kb-language';
const NOTIFICATIONS_KEY = 'kb-notifications';
const TIMEZONE_KEY = 'kb-timezone';
const DATE_FORMAT_KEY = 'kb-date-format';
const TIME_FORMAT_KEY = 'kb-time-format';
const APPEARANCE_KEY = 'kb-appearance';
const EDITOR_KEY = 'kb-editor';
const SECURITY_KEY = 'kb-security';
const DATA_KEY = 'kb-data';
const PLUGINS_KEY = 'kb-plugins';

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'light';
}

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored === 'zh' || stored === 'en' || stored === 'ja' || stored === 'ko') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'zh';
}

function getInitialNotifications(): Notifications {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) {
        return {
          email: parsed.email ?? true,
          push: parsed.push ?? false,
          updates: parsed.updates ?? true,
          emailPageUpdate: parsed.emailPageUpdate ?? true,
          emailCommentReply: parsed.emailCommentReply ?? true,
          emailMention: parsed.emailMention ?? true,
          emailSystem: parsed.emailSystem ?? true,
          pushPageUpdate: parsed.pushPageUpdate ?? true,
          pushCommentReply: parsed.pushCommentReply ?? true,
          pushMention: parsed.pushMention ?? true,
          pushSystem: parsed.pushSystem ?? true,
        };
      }
    }
  } catch {
    // ignore
  }
  return {
    email: true,
    push: false,
    updates: true,
    emailPageUpdate: true,
    emailCommentReply: true,
    emailMention: true,
    emailSystem: true,
    pushPageUpdate: true,
    pushCommentReply: true,
    pushMention: true,
    pushSystem: true,
  };
}

function getInitialTimezone(): string {
  try {
    const stored = localStorage.getItem(TIMEZONE_KEY);
    if (stored) return stored;
  } catch {
    // ignore
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Shanghai';
}

function getInitialDateFormat(): DateFormat {
  try {
    const stored = localStorage.getItem(DATE_FORMAT_KEY);
    if (stored === 'YYYY-MM-DD' || stored === 'MM/DD/YYYY' || stored === 'DD/MM/YYYY' || stored === 'YYYY/MM/DD' || stored === 'DD-MM-YYYY') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'YYYY-MM-DD';
}

function getInitialTimeFormat(): TimeFormat {
  try {
    const stored = localStorage.getItem(TIME_FORMAT_KEY);
    if (stored === '24h' || stored === '12h') {
      return stored;
    }
  } catch {
    // ignore
  }
  return '24h';
}

function getInitialAppearance(): AppearanceSettings {
  try {
    const stored = localStorage.getItem(APPEARANCE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        themeColor: parsed.themeColor ?? 'brand',
        themeColorValue: parsed.themeColorValue ?? '#FF743D',
        themeColorVariantHex: parsed.themeColorVariantHex ?? undefined,
        sidebarWidth: parsed.sidebarWidth ?? 260,
        compactMode: parsed.compactMode ?? false,
      };
    }
  } catch {
    // ignore
  }
  return {
    themeColor: 'brand',
    themeColorValue: '#FF743D',
    themeColorVariantHex: undefined,
    sidebarWidth: 260,
    compactMode: false,
  };
}

function getInitialEditor(): EditorSettings {
  try {
    const stored = localStorage.getItem(EDITOR_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        autoSave: parsed.autoSave ?? true,
        autoSaveInterval: parsed.autoSaveInterval ?? 30,
        spellCheck: parsed.spellCheck ?? true,
        wordWrap: parsed.wordWrap ?? true,
        fontSize: parsed.fontSize ?? 'medium',
        indentSize: parsed.indentSize ?? '2',
        defaultFont: parsed.defaultFont ?? 'system',
      };
    }
  } catch {
    // ignore
  }
  return {
    autoSave: true,
    autoSaveInterval: 30,
    spellCheck: true,
    wordWrap: true,
    fontSize: 'medium',
    indentSize: '2',
    defaultFont: 'system',
  };
}

function getInitialSecurity(): SecuritySettings {
  try {
    const stored = localStorage.getItem(SECURITY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        twoFactor: parsed.twoFactor ?? false,
        phoneBound: parsed.phoneBound ?? false,
        emailVerified: parsed.emailVerified ?? true,
      };
    }
  } catch {
    // ignore
  }
  return {
    twoFactor: false,
    phoneBound: false,
    emailVerified: true,
  };
}

function getInitialData(): DataSettings {
  try {
    const stored = localStorage.getItem(DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        autoBackup: parsed.autoBackup ?? true,
        backupFrequency: parsed.backupFrequency ?? 'daily',
      };
    }
  } catch {
    // ignore
  }
  return {
    autoBackup: true,
    backupFrequency: 'daily',
  };
}

function getInitialPlugins(): PluginSettings {
  try {
    const stored = localStorage.getItem(PLUGINS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        tableOfContents: parsed.tableOfContents ?? true,
        mindMap: parsed.mindMap ?? false,
        codeHighlight: parsed.codeHighlight ?? true,
        mathFormula: parsed.mathFormula ?? false,
        drawIO: parsed.drawIO ?? false,
        mermaid: parsed.mermaid ?? true,
      };
    }
  } catch {
    // ignore
  }
  return {
    tableOfContents: true,
    mindMap: false,
    codeHighlight: true,
    mathFormula: false,
    drawIO: false,
    mermaid: true,
  };
}

interface SettingsContextValue extends Settings {
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setNotifications: (updates: Partial<Notifications>) => void;
  setTimezone: (timezone: string) => void;
  setDateFormat: (dateFormat: DateFormat) => void;
  setTimeFormat: (timeFormat: TimeFormat) => void;
  setAppearance: (updates: Partial<AppearanceSettings>) => void;
  setEditor: (updates: Partial<EditorSettings>) => void;
  setSecurity: (updates: Partial<SecuritySettings>) => void;
  setData: (updates: Partial<DataSettings>) => void;
  setPlugins: (updates: Partial<PluginSettings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [notifications, setNotificationsState] = useState<Notifications>(getInitialNotifications);
  const [timezone, setTimezoneState] = useState<string>(getInitialTimezone);
  const [dateFormat, setDateFormatState] = useState<DateFormat>(getInitialDateFormat);
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>(getInitialTimeFormat);
  const [appearance, setAppearanceState] = useState<AppearanceSettings>(getInitialAppearance);
  const [editor, setEditorState] = useState<EditorSettings>(getInitialEditor);
  const [security, setSecurityState] = useState<SecuritySettings>(getInitialSecurity);
  const [data, setDataState] = useState<DataSettings>(getInitialData);
  const [plugins, setPluginsState] = useState<PluginSettings>(getInitialPlugins);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    try {
      localStorage.setItem(LANGUAGE_KEY, newLanguage);
    } catch {
      // ignore
    }
  }, []);

  const setNotifications = useCallback((updates: Partial<Notifications>) => {
    setNotificationsState(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setTimezone = useCallback((newTimezone: string) => {
    setTimezoneState(newTimezone);
    try {
      localStorage.setItem(TIMEZONE_KEY, newTimezone);
    } catch {
      // ignore
    }
  }, []);

  const setDateFormat = useCallback((newDateFormat: DateFormat) => {
    setDateFormatState(newDateFormat);
    try {
      localStorage.setItem(DATE_FORMAT_KEY, newDateFormat);
    } catch {
      // ignore
    }
  }, []);

  const setTimeFormat = useCallback((newTimeFormat: TimeFormat) => {
    setTimeFormatState(newTimeFormat);
    try {
      localStorage.setItem(TIME_FORMAT_KEY, newTimeFormat);
    } catch {
      // ignore
    }
  }, []);

  const setAppearance = useCallback((updates: Partial<AppearanceSettings>) => {
    setAppearanceState(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(APPEARANCE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setEditor = useCallback((updates: Partial<EditorSettings>) => {
    setEditorState(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(EDITOR_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setSecurity = useCallback((updates: Partial<SecuritySettings>) => {
    setSecurityState(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(SECURITY_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setData = useCallback((updates: Partial<DataSettings>) => {
    setDataState(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(DATA_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setPlugins = useCallback((updates: Partial<PluginSettings>) => {
    setPluginsState(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(PLUGINS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({
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
  }), [
    theme, language, notifications, timezone, dateFormat, timeFormat,
    appearance, editor, security, data, plugins,
    setTheme, setLanguage, setNotifications, setTimezone, setDateFormat,
    setTimeFormat, setAppearance, setEditor, setSecurity, setData, setPlugins,
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
