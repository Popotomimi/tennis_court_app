import { create } from 'zustand'
import { colorScheme } from 'nativewind'
import { storage } from '@/services/storage'
import { STORAGE_KEYS } from '@/constants/storage-keys'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  isLoading: boolean
  setMode: (mode: ThemeMode) => Promise<void>
  toggle: () => Promise<void>
  restoreTheme: () => Promise<void>
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  isLoading: true,

  setMode: async (mode) => {
    colorScheme.set(mode)
    await storage.set(STORAGE_KEYS.THEME, mode)
    set({ mode })
  },

  toggle: async () => {
    const next = get().mode === 'light' ? 'dark' : 'light'
    colorScheme.set(next)
    await storage.set(STORAGE_KEYS.THEME, next)
    set({ mode: next })
  },

  restoreTheme: async () => {
    try {
      const saved = await storage.get<ThemeMode>(STORAGE_KEYS.THEME)
      if (saved === 'light' || saved === 'dark') {
        colorScheme.set(saved)
        set({ mode: saved, isLoading: false })
        return
      }
    } catch {
    }
    set({ isLoading: false })
  },
}))
