import { View, Text } from 'react-native'

type StatIndicatorProps = {
  label: string
  value: number
  maxValue: number
  color: string
  bgColor: string
}

export function StatIndicator({ label, value, maxValue, color, bgColor }: StatIndicatorProps) {
  const total = Math.max(maxValue, 1)
  const percentage = (value / total) * 100

  return (
    <View className="flex-row items-center gap-3">
      <Text className="text-sm text-gray-600 w-20">{label}</Text>
      <View className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: bgColor }}>
        <View
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </View>
      <Text className="text-sm font-bold text-gray-800 w-10 text-right">{value}</Text>
    </View>
  )
}
