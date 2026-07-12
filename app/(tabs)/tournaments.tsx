import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/button'
import { TournamentCard } from '@/features/tournaments/components/tournament-card'
import { CreateTournamentModal } from '@/features/tournaments/components/create-tournament-modal'
import { EditTournamentModal } from '@/features/tournaments/components/edit-tournament-modal'
import { DeleteTournamentConfirmation } from '@/features/tournaments/components/delete-tournament-confirmation'
import { useTournamentsListViewModel } from '@/features/tournaments/viewmodels/use-tournaments-list-viewmodel'
import { useAuthStore } from '@/stores/auth-store'
import type { Tournament } from '@/types/tournament'

export default function TournamentsScreen() {
  const user = useAuthStore((state) => state.user)
  const {
    tournaments,
    total,
    isLoading,
    isRefetching,
    error,
    refresh,
    loadMore,
    hasMore,
  } = useTournamentsListViewModel()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null)
  const [deletingTournament, setDeletingTournament] = useState<Tournament | null>(null)

  const isOwner = (tournament: Tournament) => user?.id === tournament.ownerId

  if (isLoading && tournaments.length === 0) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center">
          <Loading message="Carregando torneios..." />
        </View>
      </ScreenContainer>
    )
  }

  if (error && tournaments.length === 0) {
    return (
      <ScreenContainer>
        <ErrorState
          message="Não foi possível carregar os torneios"
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
          <TournamentCard
            tournament={item}
            isOwner={isOwner(item)}
            onEdit={() => setEditingTournament(item)}
            onDelete={() => setDeletingTournament(item)}
          />
        )}
        contentContainerStyle={tournaments.length === 0 ? { flex: 1 } : { paddingBottom: 80 }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">Torneios</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {total > 0 ? `${total} torneio(s) encontrado(s)` : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState title="Nenhum torneio encontrado" />
        }
        ListFooterComponent={
          hasMore ? (
            <View className="py-4">
              <Button
                title="Carregar mais"
                variant="outline"
                onPress={loadMore}
              />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refresh} />
        }
      />

      <TouchableOpacity
        onPress={() => setShowCreateModal(true)}
        className="absolute bottom-6 right-6 bg-green-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        accessibilityRole="button"
        accessibilityLabel="Criar torneio"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      <CreateTournamentModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {editingTournament && (
        <EditTournamentModal
          visible={!!editingTournament}
          tournament={editingTournament}
          onClose={() => setEditingTournament(null)}
        />
      )}

      {deletingTournament && (
        <DeleteTournamentConfirmation
          visible={!!deletingTournament}
          tournamentName={deletingTournament.name}
          tournamentId={deletingTournament.id}
          onClose={() => setDeletingTournament(null)}
        />
      )}
    </ScreenContainer>
  )
}
