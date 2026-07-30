import '../global.css'
import { Stack } from 'expo-router'
import Toast from 'react-native-toast-message'
import { AppProviders } from '@/providers/app-providers'

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="tournaments/[id]" />
        <Stack.Screen name="matches/[id]" />
        <Stack.Screen name="history/[id]" />
        <Stack.Screen name="statistics/index" />
      </Stack>
      <Toast />
    </AppProviders>
  )
}
