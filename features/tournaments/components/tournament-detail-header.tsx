import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Badge } from '@/components/badge'
import type { Tournament } from '@/types/tournament'

type TournamentDetailHeaderProps = {
  tournament: Tournament
}

const statusConfig: Record<string, { label: string; variant: 'warning' | 'info' | 'success'; icon: keyof typeof Ionicons.glyphMap }> = {
  WAITING: { label: 'Aguardando', variant: 'warning', icon: 'time-outline' },
  STARTED: { label: 'Em andamento', variant: 'info', icon: 'play-circle-outline' },
  FINISHED: { label: 'Finalizado', variant: 'success', icon: 'checkmark-circle-outline' },
}

export function TournamentDetailHeader({ tournament }: TournamentDetailHeaderProps) {
  const statusInfo = statusConfig[tournament.status] ?? {
    label: tournament.status,
    variant: 'warning' as const,
    icon: 'help-outline' as const,
  }

  const formattedDate = new Date(tournament.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <View className="bg-white rounded-xl p-5 mb-4">
      <View className="flex-row justify-between items-start mb-3">
        <Text className="text-2xl font-bold text-gray-800 flex-1 mr-2">
          {tournament.name}
        </Text>
        <Badge variant={statusInfo.variant} label={statusInfo.label} />
      </View>

      {tournament.description && (
        <Text className="text-sm text-gray-500 mb-4 leading-5">
          {tournament.description}
        </Text>
      )}

      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="people-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600">
            {tournament._count.participants} / {tournament.maxPlayers} participantes
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="calendar-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600">
            Criado em {formattedDate}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="person-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600">
            Organizador: {tournament.owner.name}
          </Text>
        </View>
      </View>
    </View>
  )
}
