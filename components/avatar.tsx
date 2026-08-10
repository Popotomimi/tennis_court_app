import { View, Text, Image } from 'react-native'
import { resolveAssetUrl } from '@/constants/api'

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
  const resolvedUri = resolveAssetUrl(uri)

  if (resolvedUri) {
    return (
      <Image
        source={{ uri: resolvedUri }}
        className={`${dimensions.container} rounded-full bg-gray-200`}
        accessibilityLabel="Foto do perfil"
      />
    )
  }

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <View className={`${dimensions.container} rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center`}>
      <Text className={`${dimensions.text} font-bold text-green-600 dark:text-green-400`}>
        {initials}
      </Text>
    </View>
  )
}
