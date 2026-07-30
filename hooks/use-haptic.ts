import { useCallback } from 'react'
import { Platform } from 'react-native'

export function useHaptic() {
  const impact = useCallback(async () => {
    if (Platform.OS === 'web') return
    try {
      const Haptics = require('expo-haptics')
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } catch {
    }
  }, [])

  const success = useCallback(async () => {
    if (Platform.OS === 'web') return
    try {
      const Haptics = require('expo-haptics')
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch {
    }
  }, [])

  const error = useCallback(async () => {
    if (Platform.OS === 'web') return
    try {
      const Haptics = require('expo-haptics')
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    } catch {
    }
  }, [])

  return { impact, success, error }
}
