import { View, Text } from 'react-native'

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default'

type BadgeProps = {
  label: string
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, { container: string; text: string }> = {
  success: {
    container: 'bg-green-100',
    text: 'text-green-700',
  },
  error: {
    container: 'bg-red-100',
    text: 'text-red-700',
  },
  warning: {
    container: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  info: {
    container: 'bg-blue-100',
    text: 'text-blue-700',
  },
  default: {
    container: 'bg-gray-100',
    text: 'text-gray-700',
  },
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const styles = variantStyles[variant]

  return (
    <View className={`px-2 py-1 rounded-md ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{label}</Text>
    </View>
  )
}
