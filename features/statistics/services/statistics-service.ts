import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { UserStatistics } from '../types/statistics-types'

export const statisticsService = {
  async getStatistics(): Promise<UserStatistics> {
    const response = await api.get<UserStatistics>(ENDPOINTS.statistics.me)
    return response.data
  },
}
