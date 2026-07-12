import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboard-service'

export function useDashboardViewModel() {
  const statisticsQuery = useQuery({
    queryKey: ['statistics'],
    queryFn: () => dashboardService.getStatistics(),
  })

  const tournamentsQuery = useQuery({
    queryKey: ['tournaments', 'recent'],
    queryFn: () => dashboardService.getRecentTournaments(),
  })

  const refresh = async () => {
    await Promise.all([
      statisticsQuery.refetch(),
      tournamentsQuery.refetch(),
    ])
  }

  return {
    statistics: statisticsQuery.data,
    statisticsLoading: statisticsQuery.isLoading,
    statisticsError: statisticsQuery.error,
    tournaments: tournamentsQuery.data,
    tournamentsLoading: tournamentsQuery.isLoading,
    tournamentsError: tournamentsQuery.error,
    isLoading: statisticsQuery.isLoading || tournamentsQuery.isLoading,
    isRefreshing: statisticsQuery.isRefetching || tournamentsQuery.isRefetching,
    error: statisticsQuery.error || tournamentsQuery.error,
    refresh,
  }
}
