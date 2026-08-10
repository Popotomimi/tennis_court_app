import Constants from 'expo-constants'
import { Platform } from 'react-native'

const devHost = Constants.expoConfig?.hostUri?.split(':')[0]

export const API_BASE_URL = {
  android: devHost ? `http://${devHost}:3000/api` : 'http://10.0.2.2:3000/api',
  ios: devHost ? `http://${devHost}:3000/api` : 'http://localhost:3000/api',
  default: devHost ? `http://${devHost}:3000/api` : 'http://localhost:3000/api',
}

const activeBaseUrl = Platform.select({
  android: API_BASE_URL.android,
  ios: API_BASE_URL.ios,
  default: API_BASE_URL.default,
})

export function resolveAssetUrl(assetPath?: string | null): string | undefined {
  if (!assetPath) return undefined
  if (/^https?:\/\//.test(assetPath)) return assetPath
  const origin = activeBaseUrl?.replace(/\/api$/, '') ?? ''
  return `${origin}${assetPath}`
}

export const API_TIMEOUT = 10000

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  profile: {
    me: '/users/me',
    update: '/users/me',
    password: '/users/password',
    avatar: '/users/avatar',
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
    join: (tournamentId: string) => `/tournaments/${tournamentId}/join`,
    leave: (tournamentId: string) => `/tournaments/${tournamentId}/leave`,
  },
  matches: {
    list: (tournamentId: string) => `/tournaments/${tournamentId}/matches`,
    update: (matchId: string) => `/matches/${matchId}/result`,
  },
  history: {
    list: '/history',
    details: (id: string) => `/history/${id}`,
  },
  statistics: {
    me: '/statistics/me',
  },
}
