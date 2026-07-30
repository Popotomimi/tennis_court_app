import { type AxiosError } from 'axios'

interface ApiErrorResponse {
  message?: string
  error?: string
}

export function parseApiError(error: unknown): string {
  if (!error) return 'Ocorreu um erro inesperado.'

  const axiosError = error as AxiosError<ApiErrorResponse>

  if (axiosError.isAxiosError) {
    if (!axiosError.response) {
      if (axiosError.code === 'ECONNABORTED') {
        return 'A requisição excedeu o tempo limite. Verifique sua conexão.'
      }
      return 'Sem conexão com o servidor. Verifique sua internet.'
    }

    const status = axiosError.response.status
    const data = axiosError.response.data

    if (data?.message) return data.message
    if (data?.error) return data.error

    switch (status) {
      case 400:
        return 'Dados inválidos. Verifique as informações enviadas.'
      case 401:
        return 'Sessão expirada. Faça login novamente.'
      case 403:
        return 'Você não tem permissão para realizar esta ação.'
      case 404:
        return 'Recurso não encontrado.'
      case 409:
        return 'Conflito. Este recurso já existe ou não pode ser alterado.'
      case 422:
        return 'Dados inválidos. Verifique os campos.'
      case 429:
        return 'Muitas requisições. Aguarde um momento e tente novamente.'
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.'
      default:
        return `Erro inesperado (${status}). Tente novamente.`
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}
