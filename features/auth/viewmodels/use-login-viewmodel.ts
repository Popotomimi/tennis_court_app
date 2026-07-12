import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth-service'
import { useAuthStore } from '@/stores/auth-store'
import type { LoginRequest } from '../types/auth-types'

export function useLoginViewModel() {
  const saveSession = useAuthStore((state) => state.saveSession)

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async (data) => {
      await saveSession(data.token, data.user)
    },
  })

  const login = async (data: LoginRequest) => {
    await mutation.mutateAsync(data)
  }

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error,
    clearError: mutation.reset,
  }
}
