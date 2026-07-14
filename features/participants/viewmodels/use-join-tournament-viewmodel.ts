import { useMutation, useQueryClient } from '@tanstack/react-query'
import { participantService } from '../services/participant-service'

export function useJoinTournamentViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (tournamentId: string) => participantService.join(tournamentId),
    onSuccess: (_data, tournamentId) => {
      queryClient.invalidateQueries({ queryKey: ['tournament-participants', tournamentId] })
      queryClient.invalidateQueries({ queryKey: ['tournament-details', tournamentId] })
      queryClient.invalidateQueries({ queryKey: ['tournaments'] })
    },
  })

  return {
    join: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    clearError: () => mutation.reset(),
  }
}
