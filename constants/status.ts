import type { TournamentStatus } from '@/types/tournament'
import type { MatchStatus } from '@/features/matches/types/match-types'

type BadgeVariant = 'success' | 'warning' | 'info' | 'default'

export type StatusConfig = {
  label: string
  variant: BadgeVariant
}

export const TOURNAMENT_STATUS_CONFIG: Record<TournamentStatus, StatusConfig> = {
  WAITING: { label: 'Aguardando', variant: 'warning' },
  STARTED: { label: 'Em andamento', variant: 'info' },
  FINISHED: { label: 'Finalizado', variant: 'success' },
}

export const MATCH_STATUS_CONFIG: Record<MatchStatus, StatusConfig> = {
  PENDING: { label: 'Pendente', variant: 'warning' },
  FINISHED: { label: 'Finalizado', variant: 'success' },
}