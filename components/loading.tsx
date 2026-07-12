import { ActivityIndicator, View, Text } from 'react-native'

type LoadingProps = {
  message?: string
  fullScreen?: boolean
}

export function Loading({ message, fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#16a34a" />
        {message && (
          <Text className="text-gray-500 text-base mt-4">{message}</Text>
        )}
      </View>
    )
  }

  return (
    <View className="items-center justify-center py-8">
      <ActivityIndicator size="large" color="#16a34a" />
      {message && (
        <Text className="text-gray-500 text-base mt-4">{message}</Text>
      )}
    </View>
  )
}
