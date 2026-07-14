import { useMemo } from 'react'
import { View, Text, SectionList, RefreshControl } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { useHistoryDetailViewModel } from '@/features/history/viewmodels/use-history-detail-viewmodel'
import { HistoryDetailHeader } from '@/features/history/components/history-detail-header'
import { HistoryMatchItem } from '@/features/history/components/history-match-item'

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const historyId = id ?? ''
  const { detail, isLoading, error, refresh } = useHistoryDetailViewModel(historyId)

  const sections = useMemo(() => {
    if (!detail) return []
    const rounds = new Map<number, typeof detail.matches>()
    detail.matches.forEach((match) => {
      const existing = rounds.get(match.round) ?? []
      existing.push(match)
      rounds.set(match.round, existing)
    })
    return Array.from(rounds.entries())
      .sort(([a], [b]) => a - b)
      .map(([round, matches]) => ({
        title: `Rodada ${round}`,
        data: matches,
      }))
  }, [detail])

  if (isLoading) {
    return (
      <ScreenContainer>
        <Loading message="Carregando detalhes..." />
      </ScreenContainer>
    )
  }

  if (error || !detail) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Não foi possível carregar os detalhes"
          onRetry={refresh}
        />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: detail.tournamentName }} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        ListHeaderComponent={<HistoryDetailHeader detail={detail} />}
        renderSectionHeader={({ section }) => (
          <View className="py-2">
            <Text className="text-base font-bold text-gray-700">{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => <HistoryMatchItem match={item} />}
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma partida"
            description="Este torneio não possui partidas registradas"
            icon="trophy-outline"
          />
        }
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}
