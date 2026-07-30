import { View, Text } from 'react-native'

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default'

type BadgeProps = {
  label: string
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, { container: string; text: string }> = {
  success: {
    container: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
  },
  error: {
    container: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
  },
  warning: {
    container: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
  },
  info: {
    container: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
  },
  default: {
    container: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-700 dark:text-gray-300',
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
