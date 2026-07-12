import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/auth-service'
import { useAuthStore } from '@/stores/auth-store'
import type { RegisterRequest } from '../types/auth-types'

export function useRegisterViewModel() {
  const saveSession = useAuthStore((state) => state.saveSession)

  const mutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: async (data) => {
      await saveSession(data.token, data.user)
    },
  })

  const register = async (data: RegisterRequest) => {
    await mutation.mutateAsync(data)
  }

  return {
    register,
    isLoading: mutation.isPending,
    error: mutation.error,
    clearError: mutation.reset,
  }
}
