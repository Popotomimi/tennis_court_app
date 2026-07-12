import { api } from '@/services/api'
import { ENDPOINTS } from '@/constants/api'
import type { User } from '@/types/user'
import type { UpdateNameRequest, UpdatePasswordRequest } from '../types/profile-types'

export const profileService = {
  async getProfile(): Promise<User> {
    const response = await api.get<User>(ENDPOINTS.profile.me)
    return response.data
  },

  async updateName(data: UpdateNameRequest): Promise<User> {
    const response = await api.put<User>(ENDPOINTS.profile.update, data)
    return response.data
  },

  async updatePassword(data: UpdatePasswordRequest): Promise<void> {
    await api.put(ENDPOINTS.profile.password, data)
  },

  async updateAvatar(uri: string): Promise<User> {
    const formData = new FormData()
    const filename = uri.split('/').pop() ?? 'avatar.jpg'
    const ext = filename.split('.').pop() ?? 'jpg'

    formData.append('avatar', {
      uri,
      name: filename,
      type: `image/${ext}`,
    } as unknown as Blob)

    const response = await api.post<User>(ENDPOINTS.profile.avatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}
