import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { MatchPlayer } from '../types/match-types'

type SelectWinnerModalProps = {
  visible: boolean
  playerOne: MatchPlayer | null
  playerTwo: MatchPlayer | null
  isLoading: boolean
  error: Error | null
  onSelect: (winnerId: string) => void
  onClose: () => void
}

export function SelectWinnerModal({
  visible,
  playerOne,
  playerTwo,
  isLoading,
  error,
  onSelect,
  onClose,
}: SelectWinnerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-center items-center"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          className="bg-white rounded-xl w-80 p-6"
          activeOpacity={1}
          onPress={() => {}}
        >
          <Text className="text-lg font-bold text-gray-800 text-center mb-1">
            Registrar Vencedor
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-5">
            Selecione o vencedor desta partida
          </Text>

          {error && (
            <View className="bg-red-50 rounded-lg p-3 mb-4">
              <Text className="text-red-600 text-sm text-center">
                {error instanceof Error ? error.message : 'Erro ao registrar vencedor'}
              </Text>
            </View>
          )}

          <View className="flex-row gap-3">
            {playerOne && (
              <TouchableOpacity
                className={`flex-1 items-center p-4 rounded-xl border-2 ${isLoading ? 'opacity-50 border-gray-200' : 'border-green-200 active:bg-green-50'}`}
                onPress={() => onSelect(playerOne.id)}
                disabled={isLoading}
              >
                <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mb-2">
                  <Text className="text-green-700 font-bold text-lg">
                    {playerOne.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text className="text-sm font-medium text-gray-800 text-center" numberOfLines={2}>
                  {playerOne.name}
                </Text>
              </TouchableOpacity>
            )}

            {playerTwo && (
              <TouchableOpacity
                className={`flex-1 items-center p-4 rounded-xl border-2 ${isLoading ? 'opacity-50 border-gray-200' : 'border-blue-200 active:bg-blue-50'}`}
                onPress={() => onSelect(playerTwo.id)}
                disabled={isLoading}
              >
                <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2">
                  <Text className="text-blue-700 font-bold text-lg">
                    {playerTwo.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text className="text-sm font-medium text-gray-800 text-center" numberOfLines={2}>
                  {playerTwo.name}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoading && (
            <View className="mt-4 items-center">
              <ActivityIndicator size="small" color="#16A34A" />
            </View>
          )}

          <TouchableOpacity
            className="mt-4 py-3 items-center"
            onPress={onClose}
            disabled={isLoading}
          >
            <Text className="text-gray-500 font-medium">Cancelar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}
