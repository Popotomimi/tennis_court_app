import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { UserStatistics } from '../types/dashboard-types'
import type { Tournament } from '@/types/tournament'
import type { PaginatedResponse } from '@/types/api'

export const dashboardService = {
  async getStatistics(): Promise<UserStatistics> {
    const response = await api.get<UserStatistics>(ENDPOINTS.statistics.me)
    return response.data
  },

  async getRecentTournaments(): Promise<Tournament[]> {
    const response = await api.get<PaginatedResponse<Tournament>>(ENDPOINTS.tournaments.list, {
      params: { page: 1, limit: 5 },
    })
    return response.data.data
  },
}
