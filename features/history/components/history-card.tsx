import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'
import type { HistoryItem } from '../types/history-types'

type HistoryCardProps = {
  item: HistoryItem
  onPress: () => void
}

export function HistoryCard({ item, onPress }: HistoryCardProps) {
  const finishedDate = new Date(item.finishedAt).toLocaleDateString('pt-BR')

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${item.tournamentName}`}
    >
      <Card className="mb-3">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-lg font-bold text-gray-800">{item.tournamentName}</Text>
            <Text className="text-xs text-gray-400 mt-1">Finalizado em {finishedDate}</Text>
          </View>
          <View className="bg-green-100 px-2 py-1 rounded-md">
            <Text className="text-xs font-medium text-green-700">Finalizado</Text>
          </View>
        </View>

        {item.champion ? (
          <View className="flex-row items-center mt-3 bg-yellow-50 rounded-lg p-3">
            <Ionicons name="trophy" size={20} color="#EAB308" />
            <View className="ml-2 flex-1">
              <Text className="text-xs text-yellow-600 font-medium">Campeão</Text>
              <Text className="text-sm font-bold text-yellow-800">{item.champion.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </View>
        ) : (
          <View className="flex-row items-center mt-3 bg-gray-50 rounded-lg p-3">
            <Ionicons name="close-circle-outline" size={20} color="#9CA3AF" />
            <Text className="ml-2 text-sm text-gray-500">Sem campeão definido</Text>
          </View>
        )}

        <View className="flex-row items-center mt-3 gap-4">
          <View className="flex-row items-center gap-1">
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-500">{item.totalParticipants} participantes</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}
