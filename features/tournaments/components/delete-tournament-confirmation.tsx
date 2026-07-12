import { useEffect } from 'react'
import { View, Text, Modal } from 'react-native'
import { Button } from '@/components/button'
import { useDeleteTournamentViewModel } from '../viewmodels/use-delete-tournament-viewmodel'

type DeleteTournamentConfirmationProps = {
  visible: boolean
  tournamentName: string
  tournamentId: string
  onClose: () => void
}

export function DeleteTournamentConfirmation({
  visible,
  tournamentName,
  tournamentId,
  onClose,
}: DeleteTournamentConfirmationProps) {
  const { remove, isLoading, error, isSuccess, clearError } = useDeleteTournamentViewModel()

  const handleDelete = async () => {
    clearError()
    await remove(tournamentId)
  }

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess])

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Excluir Torneio
          </Text>
          <Text className="text-sm text-gray-500 mb-6">
            Tem certeza que deseja excluir o torneio "{tournamentName}"? Esta ação não pode ser desfeita.
          </Text>

          {error && (
            <Text className="text-red-500 text-sm mb-4">
              {error instanceof Error ? error.message : 'Erro ao excluir torneio'}
            </Text>
          )}

          <View className="flex-row gap-3">
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onClose}
              className="flex-1"
            />
            <Button
              title="Excluir"
              variant="danger"
              onPress={handleDelete}
              loading={isLoading}
              className="flex-1"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
