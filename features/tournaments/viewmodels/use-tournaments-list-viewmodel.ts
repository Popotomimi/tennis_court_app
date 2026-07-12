import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tournamentService } from '../services/tournament-service'

export function useTournamentsListViewModel() {
  const [page, setPage] = useState(1)
  const limit = 10

  const query = useQuery({
    queryKey: ['tournaments', page],
    queryFn: () => tournamentService.list(page, limit),
  })

  const totalPages = query.data ? Math.ceil(query.data.total / limit) : 0

  const refresh = useCallback(() => {
    setPage(1)
    query.refetch()
  }, [query])

  const loadMore = useCallback(() => {
    if (query.data && page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }, [query.data, page, totalPages])

  const resetPage = useCallback(() => {
    setPage(1)
  }, [])

  return {
    tournaments: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    error: query.error,
    refresh,
    loadMore,
    hasMore: page < totalPages,
    resetPage,
  }
}
