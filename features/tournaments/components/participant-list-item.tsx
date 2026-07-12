import { View, Text } from 'react-native'
import { Avatar } from '@/components/avatar'
import type { ParticipantUser } from '../types/tournament-detail-types'

type ParticipantListItemProps = {
  participant: ParticipantUser
}

export function ParticipantListItem({ participant }: ParticipantListItemProps) {
  return (
    <View className="flex-row items-center py-3 px-4 bg-white rounded-lg mb-2">
      <Avatar uri={participant.avatar} name={participant.name} size="sm" />
      <View className="ml-3 flex-1">
        <Text className="text-sm font-medium text-gray-800">
          {participant.name}
        </Text>
        <Text className="text-xs text-gray-400">
          {participant.email}
        </Text>
      </View>
    </View>
  )
}
