import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'

type StatCardProps = {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: number | string
  color: string
  bgColor: string
}

export function StatCard({ icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <Card className="flex-1 items-center py-4">
      <View className={`w-10 h-10 rounded-full items-center justify-center mb-2`} style={{ backgroundColor: bgColor }}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="text-2xl font-bold text-gray-800">{value}</Text>
      <Text className="text-xs text-gray-500 mt-1 text-center">{label}</Text>
    </Card>
  )
}
