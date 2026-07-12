import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'
import { Badge } from '@/components/badge'
import type { Tournament } from '@/types/tournament'

type TournamentCardProps = {
  tournament: Tournament
  isOwner: boolean
  onPress?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const statusConfig: Record<string, { label: string; variant: 'warning' | 'info' | 'success' }> = {
  WAITING: { label: 'Aguardando', variant: 'warning' },
  STARTED: { label: 'Em andamento', variant: 'info' },
  FINISHED: { label: 'Finalizado', variant: 'success' },
}

export function TournamentCard({ tournament, isOwner, onPress, onEdit, onDelete }: TournamentCardProps) {
  const statusInfo = statusConfig[tournament.status] ?? { label: tournament.status, variant: 'warning' as const }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${tournament.name}`}
    >
      <Card className="mb-3">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-lg font-bold text-gray-800">{tournament.name}</Text>
            {tournament.description && (
              <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
                {tournament.description}
              </Text>
            )}
            <Text className="text-xs text-gray-400 mt-2">
              Criado por {tournament.owner.name}
            </Text>
          </View>
          <Badge variant={statusInfo.variant} label={statusInfo.label} />
        </View>

        <View className="flex-row items-center mt-3 gap-4">
          <View className="flex-row items-center gap-1">
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-500">
              {tournament._count.participants}/{tournament.maxPlayers}
            </Text>
          </View>
        </View>

        {isOwner && tournament.status === 'WAITING' && (
          <View className="flex-row gap-2 mt-3">
            <TouchableOpacity
              onPress={(e) => { e.stopPropagation(); onEdit?.(); }}
              className="flex-row items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg"
              accessibilityRole="button"
              accessibilityLabel="Editar torneio"
            >
              <Ionicons name="pencil-outline" size={16} color="#2563eb" />
              <Text className="text-blue-600 text-sm font-medium">Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="flex-row items-center gap-1 bg-red-50 px-3 py-2 rounded-lg"
              accessibilityRole="button"
              accessibilityLabel="Excluir torneio"
            >
              <Ionicons name="trash-outline" size={16} color="#dc2626" />
              <Text className="text-red-600 text-sm font-medium">Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  )
}
