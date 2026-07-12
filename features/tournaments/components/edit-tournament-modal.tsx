import { useEffect } from 'react'
import { View, Text, Modal } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useUpdateTournamentViewModel } from '../viewmodels/use-update-tournament-viewmodel'
import type { Tournament } from '@/types/tournament'

const updateSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres'),
  description: z.string().max(500, 'A descrição deve ter no máximo 500 caracteres').optional(),
  maxPlayers: z.number({ message: 'Deve ser um número' }).int('Deve ser um número inteiro').min(2, 'Mínimo de 2 participantes').max(128, 'Máximo de 128 participantes'),
})

type UpdateFormData = z.infer<typeof updateSchema>

type EditTournamentModalProps = {
  visible: boolean
  tournament: Tournament
  onClose: () => void
}

export function EditTournamentModal({ visible, tournament, onClose }: EditTournamentModalProps) {
  const { update, isLoading, error, isSuccess, clearError } = useUpdateTournamentViewModel()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: tournament.name,
      description: tournament.description ?? '',
      maxPlayers: tournament.maxPlayers,
    },
  })

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess])

  const onSubmit = async (data: UpdateFormData) => {
    clearError()
    await update(tournament.id, data)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-2xl p-6">
          <Text className="text-lg font-bold text-gray-800 mb-6">
            Editar Torneio
          </Text>

          {error && (
            <Text className="text-red-500 text-sm mb-4">
              {error instanceof Error ? error.message : 'Erro ao editar torneio'}
            </Text>
          )}

          <View className="gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Nome do torneio"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Descrição (opcional)"
                  placeholder="Descrição do torneio"
                  value={value ?? ''}
                  onChangeText={onChange}
                  error={errors.description?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="maxPlayers"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Máximo de participantes"
                  placeholder="2 a 128"
                  value={String(value)}
                  onChangeText={(text) => onChange(Number(text))}
                  keyboardType="numeric"
                  error={errors.maxPlayers?.message}
                />
              )}
            />
          </View>

          <View className="flex-row gap-3 mt-6">
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onClose}
              className="flex-1"
            />
            <Button
              title="Salvar"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              className="flex-1"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
