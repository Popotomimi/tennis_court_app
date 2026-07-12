import { create } from 'zustand'
import type { User } from '@/types/user'
import { storage } from '@/services/storage'
import { STORAGE_KEYS } from '@/constants/storage-keys'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  saveSession: (token: string, user: User) => Promise<void>
  restoreSession: () => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: User) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setToken: (token) => set({ token, isAuthenticated: !!token }),

  setUser: (user) => set({ user }),

  setLoading: (isLoading) => set({ isLoading }),

  saveSession: async (token, user) => {
    await storage.set(STORAGE_KEYS.AUTH_TOKEN, token)
    await storage.set(STORAGE_KEYS.AUTH_USER, user)
    set({ token, user, isAuthenticated: true })
  },

  restoreSession: async () => {
    try {
      const token = await storage.get<string>(STORAGE_KEYS.AUTH_TOKEN)
      const user = await storage.get<User>(STORAGE_KEYS.AUTH_USER)

      if (token && user) {
        set({ token, user, isAuthenticated: true, isLoading: false })
      } else {
        set({ token: null, user: null, isAuthenticated: false, isLoading: false })
      }
    } catch {
      set({ token: null, user: null, isAuthenticated: false, isLoading: false })
    }
  },

  logout: async () => {
    await storage.remove(STORAGE_KEYS.AUTH_TOKEN)
    await storage.remove(STORAGE_KEYS.AUTH_USER)
    set({ token: null, user: null, isAuthenticated: false })
  },

  updateUser: async (userData: User) => {
    await storage.set(STORAGE_KEYS.AUTH_USER, userData)
    set({ user: userData })
  },
}))
