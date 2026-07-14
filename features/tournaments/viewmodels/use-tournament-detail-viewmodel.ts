import { useQuery } from '@tanstack/react-query'
import { tournamentDetailService } from '../services/tournament-detail-service'

export function useTournamentDetailViewModel(id: string, userId?: string) {
  const detailsQuery = useQuery({
    queryKey: ['tournament-details', id],
    queryFn: () => tournamentDetailService.getDetails(id),
    enabled: !!id,
  })

  const participantsQuery = useQuery({
    queryKey: ['tournament-participants', id],
    queryFn: () => tournamentDetailService.getParticipants(id),
    enabled: !!id,
  })

  const participants = participantsQuery.data?.participants ?? []

  const isParticipant = userId
    ? participants.some((p) => p.id === userId)
    : false

  const refresh = () => {
    detailsQuery.refetch()
    participantsQuery.refetch()
  }

  return {
    tournament: detailsQuery.data,
    participants,
    participantsTotal: participantsQuery.data?.total ?? 0,
    isParticipant,
    isLoading: detailsQuery.isLoading || participantsQuery.isLoading,
    isRefetching: detailsQuery.isRefetching || participantsQuery.isRefetching,
    error: detailsQuery.error || participantsQuery.error,
    refresh,
  }
}
