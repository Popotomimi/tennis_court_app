import { View, Text } from 'react-native'
import { Divider } from '@/components/divider'

type RoundSectionProps = {
  round: number
}

export function RoundSection({ round }: RoundSectionProps) {
  return (
    <View className="mb-4">
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
          <Text className="text-green-700 font-bold text-sm">{round}</Text>
        </View>
        <Text className="text-lg font-bold text-gray-800">
          {round === 1 ? 'Final' : `Rodada ${round}`}
        </Text>
      </View>
      <Divider />
    </View>
  )
}
