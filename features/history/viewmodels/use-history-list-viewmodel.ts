import { useQuery } from '@tanstack/react-query'
import { historyService } from '../services/history-service'

const QUERY_KEY = ['history']

export function useHistoryListViewModel() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => historyService.list(),
  })

  return {
    tournaments: data?.tournaments ?? [],
    total: data?.total ?? 0,
    isLoading,
    isRefetching,
    error,
    refresh: refetch,
  }
}
