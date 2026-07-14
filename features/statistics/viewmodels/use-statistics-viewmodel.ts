import { useQuery } from '@tanstack/react-query'
import { statisticsService } from '../services/statistics-service'

export function useStatisticsViewModel() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => statisticsService.getStatistics(),
  })

  return {
    statistics: data ?? null,
    isLoading,
    error,
    refresh: refetch,
  }
}
