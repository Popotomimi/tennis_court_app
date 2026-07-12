import { View, Text, Image } from 'react-native'

type AvatarProps = {
  uri?: string | null
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { container: 'w-8 h-8', text: 'text-sm' },
  md: { container: 'w-12 h-12', text: 'text-lg' },
  lg: { container: 'w-20 h-20', text: 'text-2xl' },
}

export function Avatar({ uri, name, size = 'md' }: AvatarProps) {
  const dimensions = sizeMap[size]

  if (uri) {
    return (
      <Image
        source={{ uri }}
        className={`${dimensions.container} rounded-full bg-gray-200`}
        accessibilityLabel="Foto do perfil"
      />
    )
  }

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <View className={`${dimensions.container} rounded-full bg-green-100 items-center justify-center`}>
      <Text className={`${dimensions.text} font-bold text-green-600`}>
        {initials}
      </Text>
    </View>
  )
}
