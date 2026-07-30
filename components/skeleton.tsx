import { useEffect } from 'react'
import { View, type ViewProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'

type SkeletonProps = ViewProps & {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  const opacity = useSharedValue(0.3)

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    )
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={animatedStyle}
      className={`bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
    />
  )
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />
}

export function SkeletonTitle({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-6 w-3/4 ${className}`} />
}

export function SkeletonAvatar({ className = '' }: SkeletonProps) {
  return <Skeleton className={`w-12 h-12 rounded-full ${className}`} />
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <View className={`bg-white dark:bg-gray-800 rounded-xl p-4 ${className}`}>
      <SkeletonTitle className="mb-3" />
      <SkeletonText className="w-full mb-2" />
      <SkeletonText className="w-2/3 mb-4" />
      <View className="flex-row gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </View>
    </View>
  )
}
