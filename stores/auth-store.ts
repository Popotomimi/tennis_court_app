import { create } from 'zustand'

interface AuthState {
  token: string | null
  user: unknown | null
  isAuthenticated: boolean
  setToken: (token: string | null) => void
  setUser: (user: unknown | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}))
