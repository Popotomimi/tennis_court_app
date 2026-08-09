import { View, Text, FlatList, RefreshControl } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { ListSkeleton } from '@/components/list-skeleton'
import { HistoryCard } from '@/features/history/components/history-card'
import { useHistoryListViewModel } from '@/features/history/viewmodels/use-history-list-viewmodel'

export default function HistoryScreen() {
  const router = useRouter()
  const { tournaments, total, isLoading, isRefetching, error, refresh } = useHistoryListViewModel()

  if (isLoading && tournaments.length === 0) {
    return (
      <ScreenContainer>
        <View className="px-4 pt-4">
          <View className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
          <View className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
          <ListSkeleton count={4} />
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
            onPress={() => router.push(`/history/${item.id}`)}
          />
        )}
        contentContainerStyle={tournaments.length === 0 ? { flex: 1 } : {}}
        contentContainerClassName="px-4 pb-20"
        ListHeaderComponent={
          <View className="mb-4 pt-2">
            <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">Histórico</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
