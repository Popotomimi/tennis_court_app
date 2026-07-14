import { View, Text, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { Divider } from '@/components/divider'
import { useStatisticsViewModel } from '@/features/statistics/viewmodels/use-statistics-viewmodel'
import { StatisticsHeader } from '@/features/statistics/components/statistics-header'
import { WinRateRing } from '@/features/statistics/components/win-rate-ring'
import { StatCard } from '@/features/statistics/components/stat-card'
import { StatIndicator } from '@/features/statistics/components/stat-indicator'
import { useAuthStore } from '@/stores/auth-store'

export default function StatisticsScreen() {
  const user = useAuthStore((state) => state.user)
  const { statistics, isLoading, error, refresh } = useStatisticsViewModel()

  if (isLoading) {
    return (
      <ScreenContainer>
        <Loading message="Carregando estatísticas..." />
      </ScreenContainer>
    )
  }

  if (error || !statistics) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Não foi possível carregar as estatísticas"
          onRetry={refresh}
        />
      </ScreenContainer>
    )
  }

  const hasData = statistics.totalMatches > 0

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'Estatísticas' }} />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <StatisticsHeader
          name={user?.name ?? ''}
          email={user?.email ?? ''}
          avatarUri={user?.avatar}
        />

        <Divider className="mb-6" />

        <Text className="text-lg font-bold text-gray-800 mb-4 text-center">
          Suas Estatísticas
        </Text>

        {!hasData ? (
          <View className="items-center py-8">
            <Text className="text-gray-400 text-base">
              Nenhum dado disponível
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              Participe de torneios para gerar estatísticas
            </Text>
          </View>
        ) : (
          <>
            <View className="mb-6">
              <WinRateRing winRate={statistics.winRate} />
            </View>

            <View className="flex-row gap-3 mb-4">
              <StatCard
                icon="trophy-outline"
                label="Torneios"
                value={statistics.totalTournaments}
                color="#2563EB"
                bgColor="#DBEAFE"
              />
              <StatCard
                icon="tennisball-outline"
                label="Partidas"
                value={statistics.totalMatches}
                color="#9333EA"
                bgColor="#F3E8FF"
              />
            </View>

            <View className="flex-row gap-3 mb-6">
              <StatCard
                icon="checkmark-circle-outline"
                label="Vitórias"
                value={statistics.wins}
                color="#16A34A"
                bgColor="#DCFCE7"
              />
              <StatCard
                icon="close-circle-outline"
                label="Derrotas"
                value={statistics.losses}
                color="#EF4444"
                bgColor="#FEE2E2"
              />
            </View>

            <Divider className="mb-4" />

            <Text className="text-base font-bold text-gray-800 mb-3">
              Desempenho
            </Text>

            <View className="bg-white rounded-lg p-4 mb-8 shadow-sm">
              <StatIndicator
                label="Vitórias"
                value={statistics.wins}
                maxValue={statistics.totalMatches}
                color="#16A34A"
                bgColor="#DCFCE7"
              />
              <View className="h-3" />
              <StatIndicator
                label="Derrotas"
                value={statistics.losses}
                maxValue={statistics.totalMatches}
                color="#EF4444"
                bgColor="#FEE2E2"
              />
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  )
}
