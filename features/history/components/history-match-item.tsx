import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'
import type { HistoryMatch } from '../types/history-types'

type HistoryMatchItemProps = {
  match: HistoryMatch
}

export function HistoryMatchItem({ match }: HistoryMatchItemProps) {
  const isCompleted = match.status === 'COMPLETED'
  const isBye = match.playerTwo === null

  const playerOneIsWinner = isCompleted && match.winnerId === match.playerOne.id
  const playerTwoIsWinner = isCompleted && match.winnerId === match.playerTwo?.id

  return (
    <Card className="mb-2">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs font-medium text-gray-400">
          Rodada {match.round}
        </Text>
        {isCompleted && (
          <View className="bg-green-100 px-2 py-0.5 rounded">
            <Text className="text-xs font-medium text-green-700">Finalizada</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between">
        <View className={`flex-1 items-center ${playerOneIsWinner ? '' : 'opacity-60'}`}>
          <View className={`w-10 h-10 rounded-full items-center justify-center mb-1 ${playerOneIsWinner ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Text className={`font-bold text-sm ${playerOneIsWinner ? 'text-green-700' : 'text-gray-500'}`}>
              {match.playerOne.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className={`text-xs text-center font-medium ${playerOneIsWinner ? 'text-green-700' : 'text-gray-600'}`} numberOfLines={1}>
            {match.playerOne.name}
          </Text>
          {playerOneIsWinner && (
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="trophy" size={12} color="#16A34A" />
              <Text className="text-xs text-green-600 font-medium">Vencedor</Text>
            </View>
          )}
        </View>

        <View className="px-4 items-center">
          {isBye ? (
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-xs font-bold text-gray-400">BYE</Text>
            </View>
          ) : (
            <Text className="text-sm font-bold text-gray-400">VS</Text>
          )}
        </View>

        {isBye ? (
          <View className="flex-1 items-center">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-1">
              <Ionicons name="close-outline" size={20} color="#9CA3AF" />
            </View>
            <Text className="text-xs text-gray-400 text-center">Aguardando</Text>
          </View>
        ) : (
          <View className={`flex-1 items-center ${playerTwoIsWinner ? '' : 'opacity-60'}`}>
            <View className={`w-10 h-10 rounded-full items-center justify-center mb-1 ${playerTwoIsWinner ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Text className={`font-bold text-sm ${playerTwoIsWinner ? 'text-green-700' : 'text-gray-500'}`}>
                {match.playerTwo!.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className={`text-xs text-center font-medium ${playerTwoIsWinner ? 'text-green-700' : 'text-gray-600'}`} numberOfLines={1}>
              {match.playerTwo!.name}
            </Text>
            {playerTwoIsWinner && (
              <View className="flex-row items-center gap-1 mt-1">
                <Ionicons name="trophy" size={12} color="#16A34A" />
                <Text className="text-xs text-green-600 font-medium">Vencedor</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </Card>
  )
}
