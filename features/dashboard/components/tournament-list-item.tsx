import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'
import { Badge } from '@/components/badge'
import { SportBadge } from '@/components/sport-badge'
import { TOURNAMENT_STATUS_CONFIG } from '@/constants/status'
import type { Tournament } from '@/types/tournament'

type TournamentListItemProps = {
  tournament: Tournament
}

export function TournamentListItem({ tournament }: TournamentListItemProps) {
  const status = TOURNAMENT_STATUS_CONFIG[tournament.status] ?? { label: tournament.status, variant: 'default' as const }

  return (
    <Card className="flex-row items-center">
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800 dark:text-gray-100">{tournament.name}</Text>
        {tournament.description && (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1" numberOfLines={1}>
            {tournament.description}
          </Text>
        )}
        <View className="flex-row items-center mt-2 gap-2">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={14} color="#6b7280" />
            <Text className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              {tournament._count.participants}/{tournament.maxPlayers}
            </Text>
          </View>
          <SportBadge sport={tournament.sport} />
        </View>
      </View>
      <Badge label={status.label} variant={status.variant} />
    </Card>
  )
}
