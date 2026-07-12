import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type EmptyStateProps = {
  icon?: keyof typeof Ionicons.glyphMap
  title: string
  description?: string
}

export function EmptyState({
  icon = 'folder-open-outline',
  title,
  description,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-12 px-6">
      <Ionicons name={icon} size={64} color="#d1d5db" />
      <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
        {title}
      </Text>
      {description && (
        <Text className="text-gray-400 text-base mt-2 text-center">
          {description}
        </Text>
      )}
    </View>
  )
}
