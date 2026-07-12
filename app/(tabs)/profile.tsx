import { View, Text } from 'react-native'
import { ScreenContainer } from '@/components/screen-container'

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-800">Perfil</Text>
      </View>
    </ScreenContainer>
  )
}
