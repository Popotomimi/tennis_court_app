import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { MatchesListResponse, UpdateMatchRequest, UpdateMatchResponse } from '../types/match-types'

export const matchService = {
  async list(tournamentId: string): Promise<MatchesListResponse> {
    const response = await api.get<MatchesListResponse>(ENDPOINTS.matches.list(tournamentId))
    return response.data
  },

  async update(matchId: string, data: UpdateMatchRequest): Promise<UpdateMatchResponse> {
    const response = await api.put<UpdateMatchResponse>(ENDPOINTS.matches.update(matchId), data)
    return response.data
  },
}
