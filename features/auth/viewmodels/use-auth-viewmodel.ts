import { useAuthStore } from '@/stores/auth-store'

export function useAuthViewModel() {
  const isLoading = useAuthStore((state) => state.isLoading)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const restoreSession = useAuthStore((state) => state.restoreSession)
  const logoutFn = useAuthStore((state) => state.logout)

  const logout = async () => {
    await logoutFn()
  }

  return {
    isLoading,
    isAuthenticated,
    user,
    restoreSession,
    logout,
  }
}
