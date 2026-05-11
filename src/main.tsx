import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SettingsProvider } from './hooks/useSettings'

// Ensure default settings are correct (reset to defaults)
try {
  // Reset theme color to orange
  localStorage.setItem('kb-appearance', JSON.stringify({ themeColor: 'orange', sidebarWidth: 260, compactMode: false }));
  // Reset language to Chinese
  localStorage.setItem('kb-language', 'zh');
} catch {
  // ignore
}

createRoot(document.getElementById('root')!).render(
  <SettingsProvider>
    <App />
  </SettingsProvider>
)
