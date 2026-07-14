import { View, Text } from 'react-native'
import { Avatar } from '@/components/avatar'

type StatisticsHeaderProps = {
  name: string
  email: string
  avatarUri?: string | null
}

export function StatisticsHeader({ name, email, avatarUri }: StatisticsHeaderProps) {
  return (
    <View className="items-center py-6">
      <Avatar uri={avatarUri} name={name} size="lg" />
      <Text className="text-xl font-bold text-gray-800 mt-3">{name}</Text>
      <Text className="text-sm text-gray-500">{email}</Text>
    </View>
  )
}
