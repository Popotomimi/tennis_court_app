import { useQuery } from '@tanstack/react-query'
import { profileService } from '../services/profile-service'
import { useAuthStore } from '@/stores/auth-store'

export function useProfileViewModel() {
  const user = useAuthStore((state) => state.user)

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
    enabled: false,
    initialData: user ?? undefined,
  })

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}
