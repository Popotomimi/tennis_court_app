import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'
import { Badge } from '@/components/badge'
import type { Tournament } from '@/types/tournament'

type TournamentListItemProps = {
  tournament: Tournament
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'default' }> = {
  pending: { label: 'Pendente', variant: 'warning' },
  in_progress: { label: 'Em andamento', variant: 'info' },
  completed: { label: 'Concluído', variant: 'success' },
}

export function TournamentListItem({ tournament }: TournamentListItemProps) {
  const status = statusConfig[tournament.status] ?? { label: tournament.status, variant: 'default' as const }

  return (
    <Card className="flex-row items-center">
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{tournament.name}</Text>
        {tournament.description && (
          <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
            {tournament.description}
          </Text>
        )}
        <View className="flex-row items-center mt-2">
          <Ionicons name="people-outline" size={14} color="#6b7280" />
          <Text className="text-sm text-gray-500 ml-1">
            {tournament.currentParticipants}/{tournament.maxParticipants}
          </Text>
        </View>
      </View>
      <Badge label={status.label} variant={status.variant} />
    </Card>
  )
}
