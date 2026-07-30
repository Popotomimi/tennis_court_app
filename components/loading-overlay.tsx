import { View, ActivityIndicator, Text } from 'react-native'

type LoadingOverlayProps = {
  message?: string
  visible: boolean
}

export function LoadingOverlay({ message, visible }: LoadingOverlayProps) {
  if (!visible) return null

  return (
    <View className="absolute inset-0 bg-black/40 items-center justify-center z-50">
      <View className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 items-center shadow-lg">
        <ActivityIndicator size="large" color="#16a34a" />
        {message && (
          <Text className="text-gray-700 dark:text-gray-200 text-base mt-4">
            {message}
          </Text>
        )}
      </View>
    </View>
  )
}
