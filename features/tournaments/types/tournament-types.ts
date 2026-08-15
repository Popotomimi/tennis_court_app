import type { Tournament, TournamentSport, CreateTournamentRequest, UpdateTournamentRequest } from '@/types/tournament'

export type { Tournament, TournamentSport, CreateTournamentRequest, UpdateTournamentRequest }

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
