import { useState, useEffect } from 'react'
import { SectionList, RefreshControl, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { useMatchesListViewModel } from '@/features/matches/viewmodels/use-matches-list-viewmodel'
import { useUpdateMatchViewModel } from '@/features/matches/viewmodels/use-update-match-viewmodel'
import { RoundSection } from '@/features/matches/components/round-section'
import { MatchCard } from '@/features/matches/components/match-card'
import { SelectWinnerModal } from '@/features/matches/components/select-winner-modal'
import { useAuthStore } from '@/stores/auth-store'
import { useToast } from '@/hooks/use-toast'
import type { MatchPlayer } from '@/features/matches/types/match-types'

export default function MatchesScreen() {
  const { id, ownerId } = useLocalSearchParams<{ id: string; ownerId: string }>()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const colorScheme = useColorScheme()
  const backIconColor = colorScheme === 'dark' ? '#9ca3af' : '#374151'
  const { showError } = useToast()

  const tournamentId = id ?? ''
  const isOwner = user?.id === ownerId

  const {
    rounds,
    tournamentName,
    isLoading,
    isRefetching,
    error,
    refresh,
  } = useMatchesListViewModel(tournamentId)

  const {
    update,
    isLoading: isUpdating,
    error: updateError,
    isSuccess: updateSuccess,
    clearError: clearUpdateError,
  } = useUpdateMatchViewModel()

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null)
  const [selectedPlayerOne, setSelectedPlayerOne] = useState<MatchPlayer | null>(null)
  const [selectedPlayerTwo, setSelectedPlayerTwo] = useState<MatchPlayer | null>(null)

  useEffect(() => {
    if (updateSuccess) {
      setSelectedMatchId(null)
      setSelectedPlayerOne(null)
      setSelectedPlayerTwo(null)
    }
  }, [updateSuccess])

  useEffect(() => {
    if (updateError) {
      showError(updateError)
    }
  }, [updateError])

  const handleSelectWinner = (matchId: string, playerOne: MatchPlayer, playerTwo: MatchPlayer) => {
    clearUpdateError()
    setSelectedMatchId(matchId)
    setSelectedPlayerOne(playerOne)
    setSelectedPlayerTwo(playerTwo)
  }

  const handleConfirmWinner = (winnerId: string) => {
    if (selectedMatchId) {
      update({ matchId: selectedMatchId, data: { winnerId } })
    }
  }

  const handleCloseModal = () => {
    if (!isUpdating) {
      setSelectedMatchId(null)
      setSelectedPlayerOne(null)
      setSelectedPlayerTwo(null)
      clearUpdateError()
    }
  }

  const sections = rounds.map((round) => ({
    title: `Rodada ${round.round}`,
    data: round.matches,
  }))

  if (isLoading) {
    return (
      <ScreenContainer>
        <Loading message="Carregando confrontos..." />
      </ScreenContainer>
    )
  }

  if (error) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Não foi possível carregar os confrontos"
          onRetry={refresh}
        />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: tournamentName ?? 'Confrontos' }} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refresh} />
        }
        renderSectionHeader={({ section }) => {
          const round = rounds.find((r) => r.matches[0]?.round === section.data[0]?.round)
          if (!round) return null
          return <RoundSection round={round.round} />
        }}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            isOwner={isOwner}
            onSelectWinner={handleSelectWinner}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum confronto"
            description="Os confrontos serão gerados ao iniciar o torneio"
            icon="trophy-outline"
          />
        }
        contentContainerClassName="px-4 pb-8"
        ListHeaderComponent={
          <View className="pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center justify-center mb-3 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800"
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Ionicons name="arrow-back" size={24} color={backIconColor} />
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <SelectWinnerModal
        visible={selectedMatchId !== null}
        playerOne={selectedPlayerOne}
        playerTwo={selectedPlayerTwo}
        isLoading={isUpdating}
        onSelect={handleConfirmWinner}
        onClose={handleCloseModal}
      />
    </ScreenContainer>
  )
}
