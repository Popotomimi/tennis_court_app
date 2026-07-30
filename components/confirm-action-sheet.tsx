import { useCallback, useRef, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CustomBottomSheet, type CustomBottomSheetRef } from './bottom-sheet'
import { Button } from './button'

type ConfirmActionSheetProps = {
  visible: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmActionSheet({
  visible,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'primary',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmActionSheetProps) {
  const sheetRef = useRef<CustomBottomSheetRef>(null)

  useEffect(() => {
    if (visible) {
      sheetRef.current?.open()
    } else {
      sheetRef.current?.close()
    }
  }, [visible])

  const handleCancel = useCallback(() => {
    sheetRef.current?.close()
    onCancel()
  }, [onCancel])

  const handleConfirm = useCallback(() => {
    onConfirm()
  }, [onConfirm])

  return (
    <CustomBottomSheet ref={sheetRef} snapPoints={['30%']} onClose={onCancel}>
      <View className="flex-1 px-6 pt-2 pb-8">
        <View className="items-center mb-4">
          <View className={`w-12 h-12 rounded-full items-center justify-center mb-3 ${variant === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
            <Ionicons
              name={variant === 'danger' ? 'alert-circle' : 'checkmark-circle'}
              size={28}
              color={variant === 'danger' ? '#dc2626' : '#16a34a'}
            />
          </View>
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
            {title}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {message}
          </Text>
        </View>

        <View className="flex-row gap-3 mt-auto">
          <View className="flex-1">
            <Button
              title={cancelLabel}
              variant="outline"
              onPress={handleCancel}
              disabled={loading}
            />
          </View>
          <View className="flex-1">
            <Button
              title={confirmLabel}
              variant={variant === 'danger' ? 'danger' : 'primary'}
              onPress={handleConfirm}
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </CustomBottomSheet>
  )
}
