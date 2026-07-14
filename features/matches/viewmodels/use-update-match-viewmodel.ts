import { useMutation, useQueryClient } from '@tanstack/react-query'
import { matchService } from '../services/match-service'
import type { UpdateMatchRequest } from '../types/match-types'

export function useUpdateMatchViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ matchId, data }: { matchId: string; data: UpdateMatchRequest }) =>
      matchService.update(matchId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tournament-matches'] })
    },
  })

  return {
    update: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    clearError: () => mutation.reset(),
  }
}
