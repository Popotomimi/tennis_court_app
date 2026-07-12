export type UserStatistics = {
  totalTournaments: number
  totalMatches: number
  wins: number
  losses: number
  winRate: number
}

export type DashboardData = {
  statistics: UserStatistics
  recentTournaments: import('@/types/tournament').Tournament[]
}
