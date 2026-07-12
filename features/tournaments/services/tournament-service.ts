import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { Tournament, CreateTournamentRequest, UpdateTournamentRequest } from '@/types/tournament'
import type { PaginatedTournamentsResponse } from '../types/tournament-types'

export const tournamentService = {
  async list(page = 1, limit = 10): Promise<PaginatedTournamentsResponse> {
    const response = await api.get<PaginatedTournamentsResponse>(ENDPOINTS.tournaments.list, {
      params: { page, limit },
    })
    return response.data
  },

  async create(data: CreateTournamentRequest): Promise<Tournament> {
    const response = await api.post<Tournament>(ENDPOINTS.tournaments.create, data)
    return response.data
  },

  async update(id: string, data: UpdateTournamentRequest): Promise<Tournament> {
    const response = await api.put<Tournament>(ENDPOINTS.tournaments.update(id), data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(ENDPOINTS.tournaments.delete(id))
  },
}
