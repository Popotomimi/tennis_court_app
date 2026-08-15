import type { TournamentSport } from '@/types/tournament'
import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export const DEFAULT_SPORT: TournamentSport = 'TENNIS'

export const SPORTS = ['TENNIS', 'BEACH_TENNIS', 'PICKLEBALL'] as const satisfies readonly TournamentSport[]

export type SportIcon = {
  family: 'material-community'
  name: keyof typeof MaterialCommunityIcons.glyphMap
}

export type SportConfig = {
  label: string
  icon: SportIcon
}

export const SPORT_CONFIG: Record<TournamentSport, SportConfig> = {
  TENNIS: {
    label: 'Tênis',
    icon: { family: 'material-community', name: 'tennis' },
  },
  BEACH_TENNIS: {
    label: 'Beach Tennis',
    icon: { family: 'material-community', name: 'umbrella-beach' },
  },
  PICKLEBALL: {
    label: 'Pickleball',
    icon: { family: 'material-community', name: 'table-tennis' },
  },
}

export const FALLBACK_SPORT_CONFIG: SportConfig = {
  label: 'Modalidade',
  icon: { family: 'material-community', name: 'trophy' },
}

export function getSportConfig(sport: TournamentSport): SportConfig {
  return SPORT_CONFIG[sport] ?? FALLBACK_SPORT_CONFIG
}