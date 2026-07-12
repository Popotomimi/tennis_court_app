import { View, Text, ActivityIndicator } from 'react-native'

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-green-600">Tennis Court</Text>
      <ActivityIndicator size="large" color="#16a34a" className="mt-6" />
    </View>
  )
}
