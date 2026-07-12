import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { Tournament } from '@/types/tournament'
import type { ParticipantsListResponse, StartTournamentResponse } from '../types/tournament-detail-types'

export const tournamentDetailService = {
  async getDetails(id: string): Promise<Tournament> {
    const response = await api.get<Tournament>(ENDPOINTS.tournaments.details(id))
    return response.data
  },

  async getParticipants(id: string): Promise<ParticipantsListResponse> {
    const response = await api.get<ParticipantsListResponse>(ENDPOINTS.participants.list(id))
    return response.data
  },

  async startTournament(id: string): Promise<StartTournamentResponse> {
    const response = await api.post<StartTournamentResponse>(ENDPOINTS.tournaments.start(id))
    return response.data
  },
}
