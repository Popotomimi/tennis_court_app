import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tournamentService } from '../services/tournament-service'

export function useDeleteTournamentViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => tournamentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] })
    },
  })

  const remove = async (id: string) => {
    await mutation.mutateAsync(id)
  }

  return {
    remove,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    clearError: mutation.reset,
  }
}
