import { View, Text, FlatList, RefreshControl } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { HistoryCard } from '@/features/history/components/history-card'
import { useHistoryListViewModel } from '@/features/history/viewmodels/use-history-list-viewmodel'

export default function HistoryScreen() {
  const router = useRouter()
  const { tournaments, total, isLoading, isRefetching, error, refresh } = useHistoryListViewModel()

  if (isLoading && tournaments.length === 0) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center">
          <Loading message="Carregando histórico..." />
        </View>
      </ScreenContainer>
    )
  }

  if (error && tournaments.length === 0) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Não foi possível carregar o histórico"
          onRetry={refresh}
        />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard
            item={item}
            onPress={() => router.push(`/history/${item.tournamentId}`)}
          />
        )}
        contentContainerStyle={tournaments.length === 0 ? { flex: 1 } : { paddingBottom: 80 }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">Histórico</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {total > 0 ? `${total} torneio(s) finalizado(s)` : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Nenhum torneio finalizado"
            description="Os torneios finalizados aparecerão aqui"
            icon="time-outline"
          />
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refresh} />
        }
      />
    </ScreenContainer>
  )
}
