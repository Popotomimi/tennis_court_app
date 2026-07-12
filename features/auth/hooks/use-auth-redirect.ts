import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/stores/auth-store'

export function useAuthRedirect() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated) {
      router.replace('/(tabs)')
    } else {
      router.replace('/(auth)/login')
    }
  }, [isAuthenticated, isLoading, router])

  return { isAuthenticated, isLoading }
}
