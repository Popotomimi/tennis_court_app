import { type ComponentProps } from 'react'
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type ViewStyle,
} from 'react-native'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

type ButtonProps = {
  title: string
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  onPress: () => void
  className?: string
}

const variantStyles: Record<ButtonVariant, { button: string; text: string }> = {
  primary: {
    button: 'bg-green-600 active:bg-green-700',
    text: 'text-white',
  },
  secondary: {
    button: 'bg-blue-600 active:bg-blue-700',
    text: 'text-white',
  },
  outline: {
    button: 'border border-green-600 active:bg-green-50',
    text: 'text-green-600',
  },
  ghost: {
    button: 'active:bg-gray-100',
    text: 'text-green-600',
  },
  danger: {
    button: 'bg-red-600 active:bg-red-700',
    text: 'text-white',
  },
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  onPress,
  className = '',
}: ButtonProps) {
  const styles = variantStyles[variant]

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-lg py-3 px-4 items-center justify-center flex-row ${styles.button} ${disabled ? 'opacity-50' : ''} ${className}`}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text className={`font-medium text-base ${styles.text}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
