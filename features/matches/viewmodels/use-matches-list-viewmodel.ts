import { useQuery } from '@tanstack/react-query'
import { matchService } from '../services/match-service'
import type { Match } from '../types/match-types'

type GroupedMatches = {
  round: number
  matches: Match[]
}

function groupByRound(matches: Match[]): GroupedMatches[] {
  const grouped: Record<number, Match[]> = {}

  for (const match of matches) {
    if (!grouped[match.round]) {
      grouped[match.round] = []
    }
    grouped[match.round].push(match)
  }

  return Object.entries(grouped)
    .map(([round, matches]) => ({
      round: Number(round),
      matches,
    }))
    .sort((a, b) => a.round - b.round)
}

export function useMatchesListViewModel(tournamentId: string) {
  const query = useQuery({
    queryKey: ['tournament-matches', tournamentId],
    queryFn: () => matchService.list(tournamentId),
    enabled: !!tournamentId,
  })

  const allMatches = query.data?.matches ?? []

  return {
    rounds: groupByRound(allMatches),
    total: query.data?.total ?? 0,
    tournamentName: query.data?.tournamentName,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    error: query.error,
    refresh: () => query.refetch(),
  }
}
