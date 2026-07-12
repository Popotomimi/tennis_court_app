import type { Tournament, CreateTournamentRequest, UpdateTournamentRequest } from '@/types/tournament'

export type { Tournament, CreateTournamentRequest, UpdateTournamentRequest }

export type TournamentListParams = {
  page?: number
  limit?: number
}

export type PaginatedTournamentsResponse = {
  data: Tournament[]
  total: number
  page: number
  limit: number
}
