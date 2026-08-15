import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SPORTS, SPORT_CONFIG } from '@/constants/sports'
import type { TournamentSport } from '@/types/tournament'

type SportSelectProps = {
  value: TournamentSport
  onChange: (sport: TournamentSport) => void
}

export function SportSelect({ value, onChange }: SportSelectProps) {
  return (
    <View>
      <Text className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
        Modalidade
      </Text>
      <View className="flex-row gap-2">
        {SPORTS.map((sport) => {
          const { label, icon } = SPORT_CONFIG[sport]
          const isSelected = sport === value

          return (
            <TouchableOpacity
              key={sport}
              onPress={() => onChange(sport)}
              accessibilityRole="button"
              accessibilityLabel={`Modalidade ${label}`}
              accessibilityState={{ selected: isSelected }}
              className={`flex-1 flex-row items-center justify-center gap-1 px-2 py-2.5 rounded-lg border ${
                isSelected
                  ? 'bg-green-600 border-green-600'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <MaterialCommunityIcons
                name={icon.name}
                size={16}
                color={isSelected ? '#ffffff' : '#6b7280'}
              />
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-200'}`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}