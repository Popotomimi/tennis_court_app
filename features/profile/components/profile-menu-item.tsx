import { TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type ProfileMenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  onPress: () => void
  danger?: boolean
}

export function ProfileMenuItem({ icon, label, onPress, danger = false }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-lg"
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons
        name={icon}
        size={22}
        color={danger ? '#dc2626' : '#374151'}
      />
      <Text
        className={`flex-1 ml-3 text-base ${danger ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}
      >
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  )
}
