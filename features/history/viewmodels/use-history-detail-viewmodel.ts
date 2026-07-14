import { useQuery } from '@tanstack/react-query'
import { historyService } from '../services/history-service'

export function useHistoryDetailViewModel(id: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['history-detail', id],
    queryFn: () => historyService.getDetails(id),
    enabled: !!id,
  })

  return {
    detail: data ?? null,
    isLoading,
    error,
    refresh: refetch,
  }
}
