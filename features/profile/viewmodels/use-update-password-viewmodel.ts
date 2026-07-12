import { useMutation } from '@tanstack/react-query'
import { profileService } from '../services/profile-service'
import type { UpdatePasswordRequest } from '../types/profile-types'

export function useUpdatePasswordViewModel() {
  const mutation = useMutation({
    mutationFn: (data: UpdatePasswordRequest) => profileService.updatePassword(data),
  })

  const updatePassword = async (data: UpdatePasswordRequest) => {
    await mutation.mutateAsync(data)
  }

  return {
    updatePassword,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    clearError: mutation.reset,
  }
}
