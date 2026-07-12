export type TournamentStatus = 'WAITING' | 'STARTED' | 'FINISHED'

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
  maxPlayers: number
}

export type UpdateTournamentRequest = {
  name?: string
  description?: string | null
  maxPlayers?: number
}
