import Toast from 'react-native-toast-message'
import { parseApiError } from '@/utils/error-handler'

export function useToast() {
  function showSuccess(message: string) {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    })
  }

  function showError(messageOrError: unknown) {
    const message = typeof messageOrError === 'string'
      ? messageOrError
      : parseApiError(messageOrError)

    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: message,
      position: 'top',
      visibilityTime: 4000,
    })
  }

  function showWarning(message: string) {
    Toast.show({
      type: 'info',
      text1: 'Aviso',
      text2: message,
      position: 'top',
      visibilityTime: 3500,
    })
  }

  function showInfo(message: string) {
    Toast.show({
      type: 'info',
      text1: 'Informação',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    })
  }

  return { showSuccess, showError, showWarning, showInfo }
}
