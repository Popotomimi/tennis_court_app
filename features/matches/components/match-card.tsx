import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'
import { Badge } from '@/components/badge'
import type { Match, MatchPlayer } from '../types/match-types'

type MatchCardProps = {
  match: Match
  isOwner: boolean
  onSelectWinner: (matchId: string, playerOne: MatchPlayer, playerTwo: MatchPlayer) => void
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' }> = {
  PENDING: { label: 'Pendente', variant: 'warning' },
  IN_PROGRESS: { label: 'Em Andamento', variant: 'info' },
  COMPLETED: { label: 'Finalizado', variant: 'success' },
}

function PlayerColumn({ player, isWinner }: { player: MatchPlayer | null; isWinner: boolean }) {
  if (!player) {
    return (
      <View className="flex-1 items-center">
        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-1">
          <Ionicons name="close-outline" size={20} color="#9CA3AF" />
        </View>
        <Text className="text-xs text-gray-400 text-center">Aguardando</Text>
      </View>
    )
  }

  return (
    <View className={`flex-1 items-center ${isWinner ? 'opacity-100' : 'opacity-60'}`}>
      <View className={`w-10 h-10 rounded-full items-center justify-center mb-1 ${isWinner ? 'bg-green-100' : 'bg-gray-100'}`}>
        <Text className={`font-bold text-sm ${isWinner ? 'text-green-700' : 'text-gray-500'}`}>
          {player.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text className={`text-xs text-center font-medium ${isWinner ? 'text-green-700' : 'text-gray-600'}`} numberOfLines={1}>
        {player.name}
      </Text>
      {isWinner && (
        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="trophy" size={12} color="#16A34A" />
          <Text className="text-xs text-green-600 font-medium">Vencedor</Text>
        </View>
      )}
    </View>
  )
}

export function MatchCard({ match, isOwner, onSelectWinner }: MatchCardProps) {
  const config = statusConfig[match.status] ?? { label: 'Desconhecido', variant: 'warning' as const }
  const isCompleted = match.status === 'COMPLETED'
  const isBye = match.playerTwo === null

  const handlePress = () => {
    if (isOwner && !isCompleted && match.playerOne && match.playerTwo) {
      onSelectWinner(match.id, match.playerOne, match.playerTwo)
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!isOwner || isCompleted || isBye}
      activeOpacity={isOwner && !isCompleted && !isBye ? 0.7 : 1}
    >
      <Card className={`mb-3 ${isCompleted ? 'border border-green-200' : ''}`}>
        <View className="flex-row items-center justify-between mb-3">
          <Badge label={config.label} variant={config.variant} />
          {match.position !== undefined && (
            <Text className="text-xs text-gray-400">#P{String(match.position).padStart(2, '0')}</Text>
          )}
        </View>

        <View className="flex-row items-center justify-between">
          <PlayerColumn
            player={match.playerOne}
            isWinner={match.winnerId === match.playerOne?.id}
          />

          <View className="px-4 items-center">
            <Text className="text-sm font-bold text-gray-400">VS</Text>
          </View>

          <PlayerColumn
            player={match.playerTwo}
            isWinner={match.winnerId === match.playerTwo?.id}
          />
        </View>

        {isOwner && !isCompleted && match.playerOne && match.playerTwo && (
          <View className="mt-3 pt-3 border-t border-gray-100">
            <View className="flex-row items-center justify-center gap-1">
              <Ionicons name="hand-left-outline" size={14} color="#6B7280" />
              <Text className="text-xs text-gray-500">Toque para registrar vencedor</Text>
            </View>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  )
}
