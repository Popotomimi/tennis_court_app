import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT } from '@/constants/api'
import { Platform } from 'react-native'

const baseURL = Platform.select({
  android: API_BASE_URL.android,
  ios: API_BASE_URL.ios,
  default: API_BASE_URL.default,
})

export const api = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)
