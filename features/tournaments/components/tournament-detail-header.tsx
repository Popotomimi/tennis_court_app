import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Badge } from '@/components/badge'
import { SportBadge } from '@/components/sport-badge'
import { TOURNAMENT_STATUS_CONFIG } from '@/constants/status'
import type { Tournament } from '@/types/tournament'

type TournamentDetailHeaderProps = {
  tournament: Tournament
}

export function TournamentDetailHeader({ tournament }: TournamentDetailHeaderProps) {
  const statusInfo = TOURNAMENT_STATUS_CONFIG[tournament.status] ?? {
    label: tournament.status,
    variant: 'warning' as const,
  }

  const formattedDate = new Date(tournament.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-5 mb-4">
      <View className="flex-row justify-between items-start mb-3">
        <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex-1 mr-2">
          {tournament.name}
        </Text>
        <Badge variant={statusInfo.variant} label={statusInfo.label} />
      </View>

      {tournament.description && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-5">
          {tournament.description}
        </Text>
      )}

      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="people-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {tournament._count.participants} / {tournament.maxPlayers} participantes
          </Text>
          <SportBadge sport={tournament.sport} />
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="calendar-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Criado em {formattedDate}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="person-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Organizador: {tournament.owner.name}
          </Text>
        </View>
      </View>
    </View>
  )
}
