import { View } from 'react-native'
import { TournamentCardSkeleton } from './tournament-card-skeleton'

type ListSkeletonProps = {
  count?: number
}

export function ListSkeleton({ count = 4 }: ListSkeletonProps) {
  return (
    <View className="px-4">
      {Array.from({ length: count }).map((_, index) => (
        <TournamentCardSkeleton key={String(index)} />
      ))}
    </View>
  )
}
