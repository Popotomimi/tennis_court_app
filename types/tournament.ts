export type Tournament = {
  id: string
  name: string
  description?: string
  status: TournamentStatus
  ownerId: string
  maxParticipants: number
  currentParticipants: number
  createdAt: string
  updatedAt: string
}

export type TournamentStatus = 'pending' | 'in_progress' | 'completed'

export type CreateTournamentRequest = {
  name: string
  description?: string
  maxParticipants: number
}

export type UpdateTournamentRequest = {
  name?: string
  description?: string
  maxParticipants?: number
}
