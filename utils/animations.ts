import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  type WithTimingConfig,
} from 'react-native-reanimated'

const defaultConfig: WithTimingConfig = {
  duration: 400,
  easing: Easing.out(Easing.cubic),
}

export function useFadeIn(delay = 0) {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, defaultConfig)
    )
  }, [delay, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return animatedStyle
}

export function useSlideIn(delay = 0, direction: 'up' | 'down' = 'up') {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(direction === 'up' ? 20 : -20)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, defaultConfig)
    )
    translateY.value = withDelay(
      delay,
      withTiming(0, defaultConfig)
    )
  }, [delay, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return animatedStyle
}
