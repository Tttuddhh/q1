import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts'
import App from './App.tsx'
import { SettingsProvider } from './hooks/useSettings'

// Ensure default settings are correct (only set defaults if not already set)
try {
  const existing = localStorage.getItem('kb-appearance');
  if (!existing) {
    localStorage.setItem('kb-appearance', JSON.stringify({ themeColor: 'brand', themeColorValue: '#FF743D', sidebarWidth: 260, compactMode: false }));
  }
  const existingLang = localStorage.getItem('kb-language');
  if (!existingLang) {
    localStorage.setItem('kb-language', 'zh');
  }
} catch {
  // ignore
}

createRoot(document.getElementById('root')!).render(
  <SettingsProvider>
    <App />
  </SettingsProvider>
)
