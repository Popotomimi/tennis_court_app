import { useEffect, type PropsWithChildren } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryProvider } from './query-provider'
import { useThemeStore } from '@/stores/theme-store'

export function AppProviders({ children }: PropsWithChildren) {
  const restoreTheme = useThemeStore((state) => state.restoreTheme)

  useEffect(() => {
    restoreTheme()
  }, [restoreTheme])

  return (
    <View className="flex-1">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          <BottomSheetModalProvider>
            {children}
          </BottomSheetModalProvider>
        </QueryProvider>
      </GestureHandlerRootView>
    </View>
  )
}
