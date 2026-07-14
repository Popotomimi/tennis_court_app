export type HistoryChampion = {
  id: string
  name: string
  avatar: string | null
}

export type HistoryItem = {
  id: string
  tournamentId: string
  tournamentName: string
  champion: HistoryChampion | null
  finishedAt: string
  totalParticipants: number
}

export type HistoryListResponse = {
  tournaments: HistoryItem[]
  total: number
}

export type HistoryMatch = {
  id: string
  round: number
  position: number
  playerOne: {
    id: string
    name: string
    avatar: string | null
  }
  playerTwo: {
    id: string
    name: string
    avatar: string | null
  } | null
  winnerId: string | null
  status: 'PENDING' | 'COMPLETED'
}

export type HistoryDetail = {
  id: string
  tournamentId: string
  tournamentName: string
  description: string | null
  champion: HistoryChampion
  finishedAt: string
  participants: {
    id: string
    name: string
    avatar: string | null
  }[]
  matches: HistoryMatch[]
  totalParticipants: number
  totalMatches: number
}
