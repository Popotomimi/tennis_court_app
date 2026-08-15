export type TournamentStatus = 'WAITING' | 'STARTED' | 'FINISHED'

export type TournamentSport = 'TENNIS' | 'BEACH_TENNIS' | 'PICKLEBALL'

export type TournamentOwner = {
  id: string
  name: string
  email: string
}

export type TournamentCount = {
  participants: number
}

export type Tournament = {
  id: string
  name: string
  description?: string | null
  sport: TournamentSport
  status: TournamentStatus
  ownerId: string
  maxPlayers: number
  createdAt: string
  updatedAt: string
  owner: TournamentOwner
  _count: TournamentCount
}

export type CreateTournamentRequest = {
  name: string
  description?: string
  sport?: TournamentSport
  maxPlayers: number
}

export type UpdateTournamentRequest = {
  name?: string
  description?: string | null
  sport?: TournamentSport
  maxPlayers?: number
}
