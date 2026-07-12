import { View, Text } from 'react-native'
import { ScreenContainer } from '@/components/screen-container'

export default function LoginScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-800">Login</Text>
      </View>
    </ScreenContainer>
  )
}
