import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { HistoryDetail } from '../types/history-types'

type HistoryDetailHeaderProps = {
  detail: HistoryDetail
}

export function HistoryDetailHeader({ detail }: HistoryDetailHeaderProps) {
  const finishedDate = new Date(detail.finishedAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <View>
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-800">{detail.tournamentName}</Text>
        {detail.description && (
          <Text className="text-sm text-gray-500 mt-1">{detail.description}</Text>
        )}
        <Text className="text-xs text-gray-400 mt-2">Finalizado em {finishedDate}</Text>
      </View>

      <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
        <View className="flex-row items-center gap-2">
          <Ionicons name="trophy" size={24} color="#EAB308" />
          <Text className="text-base font-bold text-yellow-800">Campeão</Text>
        </View>
        <View className="flex-row items-center mt-2">
          <View className="w-12 h-12 rounded-full bg-yellow-200 items-center justify-center">
            <Text className="text-lg font-bold text-yellow-700">
              {detail.champion.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View className="ml-3">
            <Text className="text-lg font-bold text-yellow-800">{detail.champion.name}</Text>
            <Text className="text-sm text-yellow-600">
              {detail.totalParticipants} participantes | {detail.totalMatches} partidas
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row gap-3 mb-4">
        <View className="flex-1 bg-blue-50 rounded-lg p-3 items-center">
          <Ionicons name="people-outline" size={20} color="#2563EB" />
          <Text className="text-lg font-bold text-blue-700 mt-1">{detail.totalParticipants}</Text>
          <Text className="text-xs text-blue-600">Participantes</Text>
        </View>
        <View className="flex-1 bg-purple-50 rounded-lg p-3 items-center">
          <Ionicons name="tennisball-outline" size={20} color="#9333EA" />
          <Text className="text-lg font-bold text-purple-700 mt-1">{detail.totalMatches}</Text>
          <Text className="text-xs text-purple-600">Partidas</Text>
        </View>
      </View>
    </View>
  )
}
