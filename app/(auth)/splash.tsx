import { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/stores/auth-store'

export default function SplashScreen() {
  const router = useRouter()
  const restoreSession = useAuthStore((state) => state.restoreSession)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    const init = async () => {
      await restoreSession()
    }
    init()
  }, [restoreSession])

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)')
    }
  }, [isAuthenticated, router])

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-green-600">Tennis Court</Text>
      <ActivityIndicator size="large" color="#16a34a" className="mt-6" />
    </View>
  )
}
