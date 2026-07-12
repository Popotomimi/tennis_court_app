import type { User } from '@/types/user'

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user: User
}
