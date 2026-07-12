import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth-types'

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(ENDPOINTS.auth.login, data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(ENDPOINTS.auth.register, data)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post(ENDPOINTS.auth.logout)
  },
}
