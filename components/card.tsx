import { type PropsWithChildren } from 'react'
import { View } from 'react-native'

type CardProps = PropsWithChildren<{
  className?: string
}>

export function Card({ children, className = '' }: CardProps) {
  return (
    <View className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm ${className}`}>
      {children}
    </View>
  )
}
