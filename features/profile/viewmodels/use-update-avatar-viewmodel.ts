import { useMutation } from '@tanstack/react-query'
import { profileService } from '../services/profile-service'
import { useAuthStore } from '@/stores/auth-store'

export function useUpdateAvatarViewModel() {
  const updateUser = useAuthStore((state) => state.updateUser)

  const mutation = useMutation({
    mutationFn: (uri: string) => profileService.updateAvatar(uri),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser)
    },
  })

  const updateAvatar = async (uri: string) => {
    await mutation.mutateAsync(uri)
  }

  return {
    updateAvatar,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    clearError: mutation.reset,
  }
}
