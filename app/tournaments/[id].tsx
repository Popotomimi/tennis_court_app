import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Modal, TouchableOpacity, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { TournamentDetailHeader } from '@/features/tournaments/components/tournament-detail-header'
import { ParticipantListItem } from '@/features/tournaments/components/participant-list-item'
import { useTournamentDetailViewModel } from '@/features/tournaments/viewmodels/use-tournament-detail-viewmodel'
import { useStartTournamentViewModel } from '@/features/tournaments/viewmodels/use-start-tournament-viewmodel'
import { useJoinTournamentViewModel } from '@/features/participants/viewmodels/use-join-tournament-viewmodel'
import { useLeaveTournamentViewModel } from '@/features/participants/viewmodels/use-leave-tournament-viewmodel'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/stores/auth-store'

export default function TournamentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const colorScheme = useColorScheme()
  const backIconColor = colorScheme === 'dark' ? '#9ca3af' : '#374151'
  const { showSuccess } = useToast()

  const tournamentId = id ?? ''

  const [showStartSheet, setShowStartSheet] = useState(false)
  const [showLeaveSheet, setShowLeaveSheet] = useState(false)

  const {
    tournament,
    participants,
    participantsTotal,
    isParticipant,
    isLoading,
    error,
    refresh,
  } = useTournamentDetailViewModel(tournamentId, user?.id)

  const {
    start,
    isLoading: isStarting,
    error: startError,
    isSuccess: startSuccess,
    clearError: clearStartError,
  } = useStartTournamentViewModel()

  const {
    join,
    isLoading: isJoining,
    error: joinError,
    isSuccess: joinSuccess,
    clearError: clearJoinError,
  } = useJoinTournamentViewModel()

  const {
    leave,
    isLoading: isLeaving,
    error: leaveError,
    isSuccess: leaveSuccess,
    clearError: clearLeaveError,
  } = useLeaveTournamentViewModel()

  useEffect(() => {
    if (startSuccess) {
      showSuccess('Torneio iniciado! Confrontos gerados.')
      refresh()
    }
  }, [startSuccess])

  useEffect(() => {
    if (joinSuccess) {
      showSuccess('Você entrou no torneio!')
      refresh()
    }
  }, [joinSuccess])

  useEffect(() => {
    if (leaveSuccess) {
      showSuccess('Você saiu do torneio.')
      refresh()
    }
  }, [leaveSuccess])

  const handleStartTournament = () => {
    setShowStartSheet(true)
  }

  const handleConfirmStart = async () => {
    setShowStartSheet(false)
    clearStartError()
    await start(tournamentId)
  }

  const handleJoinTournament = async () => {
    clearJoinError()
    await join(tournamentId)
  }

  const handleLeaveTournament = () => {
    setShowLeaveSheet(true)
  }

  const handleConfirmLeave = async () => {
    setShowLeaveSheet(false)
    clearLeaveError()
    await leave(tournamentId)
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <Loading message="Carregando detalhes..." />
      </ScreenContainer>
    )
  }

  if (error || !tournament) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Não foi possível carregar os detalhes do torneio"
          onRetry={refresh}
        />
      </ScreenContainer>
    )
  }

  const isOwner = user?.id === tournament.ownerId
  const canEdit = isOwner && tournament.status === 'WAITING'
  const canStart = isOwner && tournament.status === 'WAITING' && tournament._count.participants >= 2
  const canJoin = !isParticipant && tournament.status === 'WAITING'
  const canLeave = isParticipant && tournament.status === 'WAITING'

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: tournament.name }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-4 pb-8" className="flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center justify-center mb-3 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color={backIconColor} />
        </TouchableOpacity>

        <TournamentDetailHeader tournament={tournament} />

        {startError && (
          <View className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
            <Text className="text-red-600 dark:text-red-400 text-sm">
              {startError instanceof Error ? startError.message : 'Erro ao iniciar torneio'}
            </Text>
          </View>
        )}

        {joinError && (
          <View className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
            <Text className="text-red-600 dark:text-red-400 text-sm">
              {joinError instanceof Error ? joinError.message : 'Erro ao entrar no torneio'}
            </Text>
          </View>
        )}

        {leaveError && (
          <View className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
            <Text className="text-red-600 dark:text-red-400 text-sm">
              {leaveError instanceof Error ? leaveError.message : 'Erro ao sair do torneio'}
            </Text>
          </View>
        )}

        {canJoin && (
          <View className="mb-4">
            <Button
              title="Entrar no Torneio"
              onPress={handleJoinTournament}
              loading={isJoining}
            />
          </View>
        )}

        {canLeave && (
          <View className="mb-4">
            <Button
              title="Sair do Torneio"
              variant="danger"
              onPress={handleLeaveTournament}
              loading={isLeaving}
            />
          </View>
        )}

        {canStart && (
          <View className="mb-4">
            <Button
              title="Iniciar Torneio"
              onPress={handleStartTournament}
              loading={isStarting}
            />
          </View>
        )}

        {tournament.status !== 'WAITING' && (
          <View className="mb-4">
            <Button
              title="Ver Confrontos"
              variant="secondary"
              onPress={() => router.push(`/matches/${tournament.id}?ownerId=${tournament.ownerId}`)}
            />
          </View>
        )}

        <View className="flex-row gap-2 mb-4">
          {canEdit && (
            <>
              <Button
                title="Editar"
                variant="outline"
                onPress={() => router.push({ pathname: '/(tabs)/tournaments', params: { editId: tournament.id } })}
                className="flex-1"
              />
              <Button
                title="Excluir"
                variant="danger"
                onPress={() => router.push({ pathname: '/(tabs)/tournaments', params: { deleteId: tournament.id } })}
                className="flex-1"
              />
            </>
          )}
        </View>

        <Divider className="mb-4" />

        <View className="mb-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="people-outline" size={20} color="#374151" />
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Participantes ({participantsTotal})
            </Text>
          </View>

          {participants.length === 0 ? (
            <EmptyState
              title="Nenhum participante"
              icon="person-outline"
            />
          ) : (
            participants.map((participant) => (
              <ParticipantListItem key={participant.id} participant={participant} />
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showStartSheet} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <View className="items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center mb-3">
                <Ionicons name="play-circle" size={28} color="#16a34a" />
              </View>
              <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                Iniciar Torneio
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                Tem certeza que deseja iniciar este torneio? Os confrontos serão gerados automaticamente.
              </Text>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={() => setShowStartSheet(false)}
                  disabled={isStarting}
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Iniciar"
                  onPress={handleConfirmStart}
                  loading={isStarting}
                  disabled={isStarting}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showLeaveSheet} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <View className="items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center mb-3">
                <Ionicons name="log-out-outline" size={28} color="#dc2626" />
              </View>
              <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                Sair do Torneio
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                Tem certeza que deseja sair deste torneio?
              </Text>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={() => setShowLeaveSheet(false)}
                  disabled={isLeaving}
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Sair"
                  variant="danger"
                  onPress={handleConfirmLeave}
                  loading={isLeaving}
                  disabled={isLeaving}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  )
}
