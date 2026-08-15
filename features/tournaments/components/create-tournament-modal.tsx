import { useEffect } from 'react'
import { View, Text, Modal, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { SportSelect } from './sport-select'
import { DEFAULT_SPORT, SPORTS } from '@/constants/sports'
import { useCreateTournamentViewModel } from '../viewmodels/use-create-tournament-viewmodel'
import { useToast } from '@/hooks/use-toast'

const createSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome deve ter no máximo 100 caracteres'),
  description: z.string().max(500, 'A descrição deve ter no máximo 500 caracteres').optional(),
  sport: z.enum(SPORTS),
  maxPlayers: z.number({ message: 'Deve ser um número' }).int('Deve ser um número inteiro').min(2, 'Mínimo de 2 participantes').max(128, 'Máximo de 128 participantes'),
})

type CreateFormData = z.infer<typeof createSchema>

type CreateTournamentModalProps = {
  visible: boolean
  onClose: () => void
}

export function CreateTournamentModal({ visible, onClose }: CreateTournamentModalProps) {
  const { create, isLoading, error, isSuccess, clearError } = useCreateTournamentViewModel()
  const { showSuccess } = useToast()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateFormData>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
      description: '',
      sport: DEFAULT_SPORT,
      maxPlayers: 2,
    },
  })

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Torneio criado com sucesso!')
      reset()
      onClose()
    }
  }, [isSuccess])

  const onSubmit = async (data: CreateFormData) => {
    clearError()
    await create(data)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
            Criar Torneio
          </Text>

          {error && (
            <Text className="text-red-500 dark:text-red-400 text-sm mb-4">
              {error instanceof Error ? error.message : 'Erro ao criar torneio'}
            </Text>
          )}

          <ScrollView showsVerticalScrollIndicator={false} className="max-h-80">
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
                name="sport"
                render={({ field: { onChange, value } }) => (
                  <SportSelect value={value} onChange={onChange} />
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
          </ScrollView>

          <View className="flex-row gap-3 mt-6">
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onClose}
              className="flex-1"
            />
            <Button
              title="Criar"
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
