import { useMutation, useQueryClient } from '@tanstack/react-query'
import { participantService } from '../services/participant-service'

export function useLeaveTournamentViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (tournamentId: string) => participantService.leave(tournamentId),
    onSuccess: (_data, tournamentId) => {
      queryClient.invalidateQueries({ queryKey: ['tournament-participants', tournamentId] })
      queryClient.invalidateQueries({ queryKey: ['tournament-details', tournamentId] })
      queryClient.invalidateQueries({ queryKey: ['tournaments'] })
    },
  })

  return {
    leave: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    clearError: () => mutation.reset(),
  }
}
