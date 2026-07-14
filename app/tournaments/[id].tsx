import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
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
import { useAuthStore } from '@/stores/auth-store'

export default function TournamentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  const tournamentId = id ?? ''

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
      refresh()
    }
  }, [startSuccess])

  useEffect(() => {
    if (joinSuccess || leaveSuccess) {
      refresh()
    }
  }, [joinSuccess, leaveSuccess])

  const handleStartTournament = () => {
    Alert.alert(
      'Iniciar Torneio',
      'Tem certeza que deseja iniciar este torneio? Os confrontos serão gerados automaticamente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar',
          style: 'destructive',
          onPress: async () => {
            clearStartError()
            await start(tournamentId)
          },
        },
      ],
    )
  }

  const handleJoinTournament = async () => {
    clearJoinError()
    await join(tournamentId)
  }

  const handleLeaveTournament = () => {
    Alert.alert(
      'Sair do Torneio',
      'Tem certeza que deseja sair deste torneio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            clearLeaveError()
            await leave(tournamentId)
          },
        },
      ],
    )
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
  const canJoin = !isOwner && !isParticipant && tournament.status === 'WAITING'
  const canLeave = !isOwner && isParticipant && tournament.status === 'WAITING'

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: tournament.name }} />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <TournamentDetailHeader tournament={tournament} />

        {startError && (
          <View className="bg-red-50 rounded-lg p-3 mb-4">
            <Text className="text-red-600 text-sm">
              {startError instanceof Error ? startError.message : 'Erro ao iniciar torneio'}
            </Text>
          </View>
        )}

        {joinError && (
          <View className="bg-red-50 rounded-lg p-3 mb-4">
            <Text className="text-red-600 text-sm">
              {joinError instanceof Error ? joinError.message : 'Erro ao entrar no torneio'}
            </Text>
          </View>
        )}

        {leaveError && (
          <View className="bg-red-50 rounded-lg p-3 mb-4">
            <Text className="text-red-600 text-sm">
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
            <Text className="text-lg font-bold text-gray-800">
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
    </ScreenContainer>
  )
}
