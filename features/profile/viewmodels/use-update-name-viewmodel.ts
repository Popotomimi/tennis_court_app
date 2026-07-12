import { useMutation, useQueryClient } from '@tanstack/react-query'
import { profileService } from '../services/profile-service'
import { useAuthStore } from '@/stores/auth-store'
import type { UpdateNameRequest } from '../types/profile-types'

export function useUpdateNameViewModel() {
  const queryClient = useQueryClient()
  const updateUser = useAuthStore((state) => state.updateUser)

  const mutation = useMutation({
    mutationFn: (data: UpdateNameRequest) => profileService.updateName(data),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const updateName = async (data: UpdateNameRequest) => {
    await mutation.mutateAsync(data)
  }

  return {
    updateName,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    clearError: mutation.reset,
  }
}
