import { View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { Divider } from '@/components/divider'
import { StatCardSkeleton } from '@/components/stat-card-skeleton'
import { useStatisticsViewModel } from '@/features/statistics/viewmodels/use-statistics-viewmodel'
import { StatisticsHeader } from '@/features/statistics/components/statistics-header'
import { WinRateRing } from '@/features/statistics/components/win-rate-ring'
import { StatCard } from '@/features/statistics/components/stat-card'
import { StatIndicator } from '@/features/statistics/components/stat-indicator'
import { useAuthStore } from '@/stores/auth-store'

export default function StatisticsScreen() {
  const user = useAuthStore((state) => state.user)
  const { statistics, isLoading, error, refresh } = useStatisticsViewModel()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const backIconColor = colorScheme === 'dark' ? '#9ca3af' : '#374151'

  if (isLoading) {
    return (
      <ScreenContainer>
        <View className="items-center py-6">
          <View className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mb-3" />
          <View className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-1" />
          <View className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6" />
        </View>
        <Divider />
        <View className="flex-row gap-3 px-4 mt-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
        </View>
        <View className="flex-row gap-3 px-4 mt-3">
          <StatCardSkeleton />
          <StatCardSkeleton />
        </View>
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

  const hasData = statistics.matchesPlayed > 0

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: 'Estatísticas' }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-8"
        className="flex-1"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center justify-center mb-3 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color={backIconColor} />
        </TouchableOpacity>

        <StatisticsHeader
          name={user?.name ?? ''}
          email={user?.email ?? ''}
          avatarUri={user?.avatar}
        />

        <Divider className="mb-6" />

        <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Suas Estatísticas
        </Text>

        {!hasData ? (
          <View className="items-center py-8">
            <Text className="text-gray-400 dark:text-gray-500 text-base">
              Nenhum dado disponível
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-sm mt-2">
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
                value={statistics.tournamentsPlayed}
                color="#2563EB"
                bgColor="#DBEAFE"
              />
              <StatCard
                icon="flag-outline"
                label="Partidas"
                value={statistics.matchesPlayed}
                color="#9333EA"
                bgColor="#F3E8FF"
              />
            </View>

            <View className="flex-row gap-3 mb-6">
              <StatCard
                icon="checkmark-circle-outline"
                label="Vitórias"
                value={statistics.matchesWon}
                color="#16A34A"
                bgColor="#DCFCE7"
              />
              <StatCard
                icon="close-circle-outline"
                label="Derrotas"
                value={statistics.matchesPlayed - statistics.matchesWon}
                color="#EF4444"
                bgColor="#FEE2E2"
              />
            </View>

            <Divider className="mb-4" />

            <Text className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">
              Desempenho
            </Text>

            <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-8 shadow-sm">
              <StatIndicator
                label="Vitórias"
                value={statistics.matchesWon}
                maxValue={statistics.matchesPlayed}
                color="#16A34A"
                bgColor="#DCFCE7"
              />
              <View className="h-3" />
              <StatIndicator
                label="Derrotas"
                value={statistics.matchesPlayed - statistics.matchesWon}
                maxValue={statistics.matchesPlayed}
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
