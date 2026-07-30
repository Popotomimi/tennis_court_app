import { useCallback, useRef, useImperativeHandle, forwardRef, type PropsWithChildren, type ReactNode } from 'react'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { useThemeStore } from '@/stores/theme-store'

export type CustomBottomSheetRef = {
  open: () => void
  close: () => void
}

type CustomBottomSheetProps = PropsWithChildren<{
  snapPoints?: (string | number)[]
  onClose?: () => void
}>

export const CustomBottomSheet = forwardRef<CustomBottomSheetRef, CustomBottomSheetProps>(
  function CustomBottomSheet({ children, snapPoints = ['40%'], onClose }, ref) {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const isDark = useThemeStore((state) => state.mode === 'dark')

    const handleClose = useCallback(() => {
      bottomSheetRef.current?.dismiss()
      onClose?.()
    }, [onClose])

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.present(),
      close: handleClose,
    }))

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      []
    )

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? '#64748b' : '#d1d5db',
        }}
        onDismiss={onClose}
      >
        {children}
      </BottomSheetModal>
    )
  }
)
