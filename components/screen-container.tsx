import { type PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ScreenContainerProps = PropsWithChildren<{
  className?: string
}>

export function ScreenContainer({ children, className = '' }: ScreenContainerProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      className={`flex-1 bg-gray-50 dark:bg-gray-900 ${className}`}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}
    >
      {children}
    </View>
  )
}
