import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '@/components/card'

type StatCardProps = {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string | number
  color?: string
}

export function StatCard({ icon, label, value, color = '#16a34a' }: StatCardProps) {
  return (
    <Card className="flex-1 items-center py-4">
      <Ionicons name={icon} size={28} color={color} />
      <Text className="text-2xl font-bold text-gray-800 mt-2">{value}</Text>
      <Text className="text-sm text-gray-500 mt-1">{label}</Text>
    </Card>
  )
}
