import { View, Text } from 'react-native'

type WinRateRingProps = {
  winRate: number
  size?: number
}

function getRingColor(percent: number): string {
  if (percent >= 70) return '#16a34a'
  if (percent >= 40) return '#eab308'
  return '#ef4444'
}

function getLabel(percent: number): string {
  if (percent >= 90) return 'Excelente'
  if (percent >= 70) return 'Muito Bom'
  if (percent >= 40) return 'Regular'
  if (percent >= 20) return 'Ruim'
  return 'Crítico'
}

export function WinRateRing({ winRate, size = 140 }: WinRateRingProps) {
  const clamped = Math.max(0, Math.min(100, winRate))
  const half = size / 2
  const innerSize = size - 20
  const ringColor = getRingColor(clamped)
  const label = getLabel(clamped)

  return (
    <View className="items-center">
      <View
        style={{
          width: size,
          height: size,
          borderRadius: half,
          backgroundColor: ringColor,
          padding: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text className="text-3xl font-bold text-gray-800">
            {Math.round(clamped)}%
          </Text>
          <Text className="text-xs text-gray-500 mt-1">Aproveitamento</Text>
        </View>
      </View>
      <Text className="text-base font-medium mt-3" style={{ color: ringColor }}>
        {label}
      </Text>
    </View>
  )
}
