export type ParticipantUser = {
  id: string
  name: string
  email: string
  avatar: string | null
}

export type ParticipantsListResponse = {
  tournamentId: string
  tournamentName: string
  participants: ParticipantUser[]
  total: number
}

export type StartTournamentResponse = {
  message: string
  matches: {
    playerOne: string
    playerTwo: string | 'bye'
    round: number
  }[]
}
