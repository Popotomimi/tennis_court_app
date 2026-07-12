import { FlatList, RefreshControl, View, Text } from 'react-native'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { Divider } from '@/components/divider'
import { useDashboardViewModel } from '@/features/dashboard/viewmodels/use-dashboard-viewmodel'
import { StatCard } from '@/features/dashboard/components/stat-card'
import { TournamentListItem } from '@/features/dashboard/components/tournament-list-item'

export default function HomeScreen() {
  const {
    statistics,
    tournaments,
    isLoading,
    isRefreshing,
    error,
    refresh,
  } = useDashboardViewModel()

  if (isLoading && !statistics && !tournaments) {
    return <Loading fullScreen message="Carregando dashboard..." />
  }

  if (error && !statistics && !tournaments) {
    return <ErrorState message="Erro ao carregar dashboard" onRetry={refresh} />
  }

  return (
    <ScreenContainer className="px-0">
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TournamentListItem tournament={item} />}
        contentContainerClassName="px-4 pb-8"
        ListHeaderComponent={() => (
          <View>
            <Text className="text-2xl font-bold text-gray-800 mt-6 mb-6 px-4">
              Dashboard
            </Text>

            {statistics && (
              <View className="flex-row gap-3 px-4 mb-6">
                <StatCard
                  icon="trophy-outline"
                  label="Torneios"
                  value={statistics.totalTournaments}
                />
                <StatCard
                  icon="tennisball-outline"
                  label="Partidas"
                  value={statistics.totalMatches}
                />
                <StatCard
                  icon="checkmark-circle-outline"
                  label="Vitórias"
                  value={statistics.wins}
                  color="#2563eb"
                />
                <StatCard
                  icon="trending-up-outline"
                  label="Aproveitamento"
                  value={`${statistics.winRate}%`}
                  color="#eab308"
                />
              </View>
            )}

            <View className="flex-row items-center justify-between px-4 mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Torneios Recentes
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            icon="trophy-outline"
            title="Nenhum torneio encontrado"
            description="Você ainda não participa de nenhum torneio."
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor="#16a34a"
            colors={['#16a34a']}
          />
        }
      />
    </ScreenContainer>
  )
}
