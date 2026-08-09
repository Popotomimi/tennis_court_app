import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ScreenContainer } from '@/components/screen-container'
import { Input } from '@/components/input'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/button'
import { useLoginViewModel } from '@/features/auth/viewmodels/use-login-viewmodel'
import { useToast } from '@/hooks/use-toast'
import { parseApiError } from '@/utils/error-handler'
import type { LoginRequest } from '@/features/auth/types/auth-types'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (error.response?.status === 401) {
      return 'Usuário ou senha incorretos. Verifique os dados e tente novamente.'
    }
  }
  return parseApiError(error)
}

export default function LoginScreen() {
  const router = useRouter()
  const { login, isLoading, clearError } = useLoginViewModel()
  const { showError } = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    try {
      await login(data as LoginRequest)
      router.replace('/(tabs)')
    } catch (error) {
      showError(getLoginErrorMessage(error))
    }
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-4">
          <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
            Tennis Court
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center mb-8">
            Faça login para continuar
          </Text>

          <View className="gap-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="E-mail"
                  placeholder="Seu e-mail"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Senha"
                  placeholder="Sua senha"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              title="Entrar"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-500 dark:text-gray-400">Não tem conta? </Text>
            <Text
              className="text-green-600 dark:text-green-400 font-medium"
              onPress={() => router.push('/(auth)/register')}
            >
              Cadastre-se
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}