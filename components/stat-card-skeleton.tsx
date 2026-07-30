import { View } from 'react-native'
import { Skeleton } from './skeleton'

export function StatCardSkeleton() {
  return (
    <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 items-center">
      <Skeleton className="w-10 h-10 rounded-full mb-2" />
      <Skeleton className="h-8 w-12 mb-1" />
      <Skeleton className="h-3 w-16" />
    </View>
  )
}
