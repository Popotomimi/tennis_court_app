import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar } from '@/components/avatar'
import type { User } from '@/types/user'

type ProfileHeaderProps = {
  user: User
  onEditAvatar?: () => void
}

export function ProfileHeader({ user, onEditAvatar }: ProfileHeaderProps) {
  return (
    <View className="items-center py-8">
      <TouchableOpacity onPress={onEditAvatar} className="relative">
        <Avatar uri={user.avatar} name={user.name} size="lg" />
        <View className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1.5">
          <Ionicons name="camera" size={14} color="white" />
        </View>
      </TouchableOpacity>
      <Text className="text-xl font-bold text-gray-800 mt-4">{user.name}</Text>
      <Text className="text-sm text-gray-500 mt-1">{user.email}</Text>
    </View>
  )
}
