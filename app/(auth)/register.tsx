import { useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScreenContainer } from '@/components/screen-container'
import { Input } from '@/components/input'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/button'
import { useRegisterViewModel } from '@/features/auth/viewmodels/use-register-viewmodel'
import type { RegisterRequest } from '@/features/auth/types/auth-types'

const registerSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterScreen() {
  const router = useRouter()
  const { register, isLoading, error, clearError } = useRegisterViewModel()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    try {
      await register(data as RegisterRequest)
      router.replace('/(tabs)')
    } catch {
      // Error is handled by the ViewModel
    }
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-4">
          <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
            Criar Conta
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            Preencha os dados para se cadastrar
          </Text>

          <View className="gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Seu nome"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  error={errors.name?.message}
                />
              )}
            />

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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Confirmar Senha"
                  placeholder="Confirme sua senha"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            {error && (
              <Text className="text-red-500 text-sm text-center">
                {error instanceof Error ? error.message : 'Erro ao cadastrar'}
              </Text>
            )}

            <Button
              title="Cadastrar"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-500">Já tem conta? </Text>
            <Text
              className="text-green-600 font-medium"
              onPress={() => router.push('/(auth)/login')}
            >
              Faça login
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}
