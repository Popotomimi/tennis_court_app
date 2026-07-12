import { useState } from 'react'
import { TextInput, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type PasswordInputProps = {
  label?: string
  error?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  className?: string
}

export function PasswordInput({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  className = '',
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View className="gap-1">
      {label && (
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
      )}
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={!visible}
          className={`border rounded-lg px-4 py-3 text-base bg-white pr-12 ${error ? 'border-red-500' : 'border-gray-300'}`}
          accessibilityLabel={label || placeholder}
        />
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          className="absolute right-3 top-0 bottom-0 justify-center"
          accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          <Ionicons
            name={visible ? 'eye-off' : 'eye'}
            size={20}
            color="#6b7280"
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text className="text-red-500 text-sm">{error}</Text>
      )}
    </View>
  )
}
