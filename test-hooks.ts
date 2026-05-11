import { useAppState } from './src/hooks/useAppState.ts'
import { useSettings } from './src/hooks/useSettings.ts'

// Mock React hooks for testing
const mockUseState = (initial: any) => [initial, () => {}]
const mockUseCallback = (fn: any) => fn
const mockUseEffect = (fn: any) => { if (typeof fn === 'function') fn() }
const mockUseMemo = (fn: any) => fn()

// @ts-ignore
global.useState = mockUseState
// @ts-ignore
global.useCallback = mockUseCallback
// @ts-ignore
global.useEffect = mockUseEffect
// @ts-ignore
global.useMemo = mockUseMemo

try {
  const state = useAppState()
  console.log('useAppState OK:', Object.keys(state).slice(0, 5))
} catch (e: any) {
  console.error('useAppState FAILED:', e.message)
}

try {
  const settings = useSettings()
  console.log('useSettings OK:', Object.keys(settings).slice(0, 5))
} catch (e: any) {
  console.error('useSettings FAILED:', e.message)
}
