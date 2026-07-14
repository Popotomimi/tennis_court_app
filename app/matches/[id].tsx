import { useState, useEffect } from 'react'
import { SectionList, RefreshControl } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
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
import type { MatchPlayer } from '@/features/matches/types/match-types'

export default function MatchesScreen() {
  const { id, ownerId } = useLocalSearchParams<{ id: string; ownerId: string }>()
  const user = useAuthStore((state) => state.user)

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
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      />

      <SelectWinnerModal
        visible={selectedMatchId !== null}
        playerOne={selectedPlayerOne}
        playerTwo={selectedPlayerTwo}
        isLoading={isUpdating}
        error={updateError}
        onSelect={handleConfirmWinner}
        onClose={handleCloseModal}
      />
    </ScreenContainer>
  )
}
