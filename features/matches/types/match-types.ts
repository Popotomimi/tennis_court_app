export type MatchPlayer = {
  id: string
  name: string
  avatar: string | null
}

export type MatchStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

export type Match = {
  id: string
  tournamentId: string
  round: number
  position: number
  playerOne: MatchPlayer | null
  playerTwo: MatchPlayer | null
  winnerId: string | null
  status: MatchStatus
}

export type MatchesListResponse = {
  tournamentId: string
  tournamentName: string
  matches: Match[]
  total: number
}

export type UpdateMatchRequest = {
  winnerId: string
}

export type UpdateMatchResponse = {
  message: string
  match: Match
}
