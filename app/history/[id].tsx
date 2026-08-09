import { useMemo } from 'react'
import { View, Text, SectionList, RefreshControl, TouchableOpacity, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { useHistoryDetailViewModel } from '@/features/history/viewmodels/use-history-detail-viewmodel'
import { HistoryDetailHeader } from '@/features/history/components/history-detail-header'
import { HistoryMatchItem } from '@/features/history/components/history-match-item'

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const backIconColor = colorScheme === 'dark' ? '#9ca3af' : '#374151'
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
      <Stack.Screen options={{ title: detail.name }} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
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
            <HistoryDetailHeader detail={detail} />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View className="py-2">
            <Text className="text-base font-bold text-gray-700 dark:text-gray-300">{section.title}</Text>
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
        contentContainerClassName="px-4 pb-8"
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}
