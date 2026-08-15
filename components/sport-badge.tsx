import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getSportConfig } from '@/constants/sports'
import type { TournamentSport } from '@/types/tournament'

type SportBadgeProps = {
  sport: TournamentSport
}

export function SportBadge({ sport }: SportBadgeProps) {
  const config = getSportConfig(sport)

  return (
    <View className="flex-row items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
      <MaterialCommunityIcons name={config.icon.name} size={12} color="#6b7280" />
      <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {config.label}
      </Text>
    </View>
  )
}