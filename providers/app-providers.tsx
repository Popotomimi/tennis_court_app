import { type PropsWithChildren } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryProvider } from './query-provider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </GestureHandlerRootView>
  )
}
