import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tournamentDetailService } from '../services/tournament-detail-service'

export function useStartTournamentViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => tournamentDetailService.startTournament(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['tournament-details', id] })
      queryClient.invalidateQueries({ queryKey: ['tournament-participants', id] })
      queryClient.invalidateQueries({ queryKey: ['tournaments'] })
    },
  })

  const start = async (id: string) => {
    await mutation.mutateAsync(id)
  }

  return {
    start,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    clearError: mutation.reset,
  }
}
