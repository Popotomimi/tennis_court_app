import { View } from 'react-native'
import { Skeleton, SkeletonText, SkeletonTitle } from './skeleton'

export function TournamentCardSkeleton() {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-4">
          <SkeletonTitle />
          <SkeletonText className="w-full mt-2" />
        </View>
        <Skeleton className="h-6 w-20 rounded-full" />
      </View>
      <View className="flex-row items-center gap-2 mt-3">
        <Skeleton className="h-4 w-4 rounded-full" />
        <SkeletonText className="w-32" />
      </View>
      <View className="flex-row items-center gap-2 mt-1">
        <Skeleton className="h-4 w-4 rounded-full" />
        <SkeletonText className="w-24" />
      </View>
      <View className="flex-row gap-2 mt-3">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
      </View>
    </View>
  )
}
