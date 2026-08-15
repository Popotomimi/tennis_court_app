import type { TournamentSport } from '@/types/tournament'

export type HistoryChampion = {
  id: string
  name: string
  avatar?: string | null
}

export type HistoryItem = {
  id: string
  tournamentId: string
  name: string
  sport: TournamentSport
  champion: HistoryChampion | null
  finishedAt: string
  totalParticipants: number
}

export type HistoryListResponse = {
  data: HistoryItem[]
  total: number
  page: number
  limit: number
}

export type HistoryMatch = {
  id: string
  round: number
  position?: number
  playerOne: {
    id: string
    name: string
    avatar?: string | null
  }
  playerTwo: {
    id: string
    name: string
    avatar?: string | null
  } | null
  winnerId: string | null
  status: 'PENDING' | 'FINISHED'
}

export type HistoryDetail = {
  id: string
  tournamentId: string
  name: string
  sport: TournamentSport
  description: string | null
  champion: HistoryChampion
  finishedAt: string
  participants: {
    id: string
    name: string
    avatar?: string | null
  }[]
  matches: HistoryMatch[]
}
