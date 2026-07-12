import { TextInput, Text, View } from 'react-native'
import { type ComponentProps } from 'react'

type InputProps = {
  label?: string
  error?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  className?: string
} & Omit<ComponentProps<typeof TextInput>, 'className' | 'value' | 'onChangeText'>

export function Input({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  className = '',
  ...rest
}: InputProps) {
  return (
    <View className="gap-1">
      {label && (
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className={`border rounded-lg px-4 py-3 text-base bg-white ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        accessibilityLabel={label || placeholder}
        {...rest}
      />
      {error && (
        <Text className="text-red-500 text-sm">{error}</Text>
      )}
    </View>
  )
}
