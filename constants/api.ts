export const API_BASE_URL = {
  android: 'http://10.0.2.2:3000/api',
  ios: 'http://localhost:3000/api',
  default: 'http://localhost:3000/api',
}

export const API_TIMEOUT = 10000

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  profile: {
    me: '/profile/me',
    update: '/profile',
    password: '/profile/password',
    avatar: '/profile/avatar',
  },
  tournaments: {
    list: '/tournaments',
    create: '/tournaments',
    details: (id: string) => `/tournaments/${id}`,
    update: (id: string) => `/tournaments/${id}`,
    delete: (id: string) => `/tournaments/${id}`,
    start: (id: string) => `/tournaments/${id}/start`,
  },
  participants: {
    list: (tournamentId: string) => `/tournaments/${tournamentId}/participants`,
    join: (tournamentId: string) => `/tournaments/${tournamentId}/participants`,
    leave: (tournamentId: string) => `/tournaments/${tournamentId}/participants`,
  },
  matches: {
    list: (tournamentId: string) => `/tournaments/${tournamentId}/matches`,
    update: (matchId: string) => `/matches/${matchId}`,
  },
  history: {
    list: '/history',
    details: (id: string) => `/history/${id}`,
  },
  statistics: {
    me: '/statistics/me',
  },
}
