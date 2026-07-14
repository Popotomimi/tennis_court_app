import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { JoinTournamentResponse, LeaveTournamentResponse } from '../types/participant-types'

export const participantService = {
  async join(tournamentId: string): Promise<JoinTournamentResponse> {
    const response = await api.post<JoinTournamentResponse>(ENDPOINTS.participants.join(tournamentId))
    return response.data
  },

  async leave(tournamentId: string): Promise<LeaveTournamentResponse> {
    const response = await api.post<LeaveTournamentResponse>(ENDPOINTS.participants.leave(tournamentId))
    return response.data
  },
}
