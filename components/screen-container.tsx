import { type PropsWithChildren } from 'react'
import { View } from 'react-native'

type ScreenContainerProps = PropsWithChildren<{
  className?: string
}>

export function ScreenContainer({ children, className = '' }: ScreenContainerProps) {
  return (
    <View className={`flex-1 bg-gray-50 px-4 ${className}`}>
      {children}
    </View>
  )
}
