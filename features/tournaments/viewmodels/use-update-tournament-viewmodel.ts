import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tournamentService } from '../services/tournament-service'
import type { UpdateTournamentRequest } from '../types/tournament-types'

export function useUpdateTournamentViewModel() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTournamentRequest }) =>
      tournamentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] })
    },
  })

  const update = async (id: string, data: UpdateTournamentRequest) => {
    await mutation.mutateAsync({ id, data })
  }

  return {
    update,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    clearError: mutation.reset,
  }
}
