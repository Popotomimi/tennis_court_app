import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button } from './button'

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Ocorreu um erro inesperado.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-12 px-6">
      <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
      <Text className="text-gray-700 text-lg font-medium mt-4 text-center">
        {message}
      </Text>
      {onRetry && (
        <Button
          title="Tentar novamente"
          variant="outline"
          onPress={onRetry}
          className="mt-6"
        />
      )}
    </View>
  )
}
