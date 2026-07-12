import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tournamentService } from '../services/tournament-service'
import type { CreateTournamentRequest } from '../types/tournament-types'

export function useCreateTournamentViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: CreateTournamentRequest) => tournamentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] })
    },
  })

  const create = async (data: CreateTournamentRequest) => {
    await mutation.mutateAsync(data)
  }

  return {
    create,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    clearError: mutation.reset,
  }
}
