export type UserStatistics = {
  tournamentsPlayed: number
  tournamentsWon: number
  matchesPlayed: number
  matchesWon: number
  winRate: number
}

export type DashboardData = {
  statistics: UserStatistics
  recentTournaments: import('@/types/tournament').Tournament[]
}
