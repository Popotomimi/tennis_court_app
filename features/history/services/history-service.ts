import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { HistoryListResponse, HistoryDetail } from '../types/history-types'

export const historyService = {
  async list(): Promise<HistoryListResponse> {
    const response = await api.get<HistoryListResponse>(ENDPOINTS.history.list)
    return response.data
  },

  async getDetails(id: string): Promise<HistoryDetail> {
    const response = await api.get<HistoryDetail>(ENDPOINTS.history.details(id))
    return response.data
  },
}
