import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Modal, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { ScreenContainer } from '@/components/screen-container'
import { Loading } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PasswordInput } from '@/components/password-input'
import { Divider } from '@/components/divider'
import { LoadingOverlay } from '@/components/loading-overlay'
import { useToast } from '@/hooks/use-toast'
import { ProfileHeader } from '@/features/profile/components/profile-header'
import { ProfileMenuItem } from '@/features/profile/components/profile-menu-item'
import { useAuthStore } from '@/stores/auth-store'
import { useThemeStore } from '@/stores/theme-store'
import { useUpdateNameViewModel } from '@/features/profile/viewmodels/use-update-name-viewmodel'
import { useUpdatePasswordViewModel } from '@/features/profile/viewmodels/use-update-password-viewmodel'
import { useUpdateAvatarViewModel } from '@/features/profile/viewmodels/use-update-avatar-viewmodel'

const nameSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'A senha atual deve ter no mínimo 6 caracteres'),
    newPassword: z.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type NameFormData = z.infer<typeof nameSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export default function ProfileScreen() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [showNameModal, setShowNameModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showLogoutSheet, setShowLogoutSheet] = useState(false)
  const { showSuccess, showError } = useToast()

  const {
    updateName,
    isLoading: isUpdatingName,
    error: nameError,
    isSuccess: nameSuccess,
    clearError: clearNameError,
  } = useUpdateNameViewModel()

  const {
    updatePassword,
    isLoading: isUpdatingPassword,
    error: passwordError,
    isSuccess: passwordSuccess,
    clearError: clearPasswordError,
  } = useUpdatePasswordViewModel()

  const {
    updateAvatar,
    isLoading: isUpdatingAvatar,
  } = useUpdateAvatarViewModel()

  const themeMode = useThemeStore((state) => state.mode)
  const toggleTheme = useThemeStore((state) => state.toggle)
  const isDark = themeMode === 'dark'

  const nameForm = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user?.name ?? '' },
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (nameSuccess) {
      setShowNameModal(false)
      nameForm.reset()
      clearNameError()
    }
  }, [nameSuccess])

  useEffect(() => {
    if (passwordSuccess) {
      setShowPasswordModal(false)
      passwordForm.reset()
      clearPasswordError()
    }
  }, [passwordSuccess])

  const handleUpdateName = async (data: NameFormData) => {
    clearNameError()
    await updateName(data)
  }

  const handleUpdatePassword = async (data: PasswordFormData) => {
    clearPasswordError()
    await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
  }

  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para trocar a foto.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      try {
        await updateAvatar(result.assets[0].uri)
        showSuccess('Foto atualizada com sucesso. Aqui está você!')
      } catch (error) {
        showError(error)
      }
    }
  }

  const handleLogout = () => {
    setShowLogoutSheet(true)
  }

  const handleConfirmLogout = async () => {
    setShowLogoutSheet(false)
    await logout()
    showSuccess('Você saiu da sua conta com sucesso.')
    router.replace('/(auth)/login')
  }

  if (!user) {
    return <Loading fullScreen message="Carregando perfil..." />
  }

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2 ml-4">
          Perfil
        </Text>

        <ProfileHeader user={user} onEditAvatar={handlePickAvatar} />

        <View className="gap-3 mt-2">
          <ProfileMenuItem
            icon="person-outline"
            label="Alterar Nome"
            onPress={() => {
              nameForm.setValue('name', user.name)
              clearNameError()
              setShowNameModal(true)
            }}
          />

          <ProfileMenuItem
            icon="lock-closed-outline"
            label="Alterar Senha"
            onPress={() => {
              passwordForm.reset()
              clearPasswordError()
              setShowPasswordModal(true)
            }}
          />

          <ProfileMenuItem
            icon="bar-chart-outline"
            label="Estatísticas"
            onPress={() => router.push('/statistics')}
          />

          <ProfileMenuItem
            icon={isDark ? 'sunny-outline' : 'moon-outline'}
            label={isDark ? 'Tema Claro' : 'Tema Escuro'}
            onPress={toggleTheme}
          />
        </View>

        <Divider className="my-6" />

        <ProfileMenuItem
          icon="log-out-outline"
          label="Sair"
          danger
          onPress={handleLogout}
        />

        <View className="h-8" />
      </ScrollView>

      <Modal visible={showNameModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
              Alterar Nome
            </Text>

            {nameError && (
              <Text className="text-red-500 dark:text-red-400 text-sm mb-4">
                {nameError instanceof Error ? nameError.message : 'Erro ao atualizar nome'}
              </Text>
            )}

            {nameSuccess && (
              <Text className="text-green-600 dark:text-green-400 text-sm mb-4">
                Nome atualizado com sucesso!
              </Text>
            )}

            <Controller
              control={nameForm.control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  placeholder="Seu nome"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  error={nameForm.formState.errors.name?.message}
                />
              )}
            />

            <View className="flex-row gap-3 mt-6">
              <Button
                title="Cancelar"
                variant="outline"
                onPress={() => setShowNameModal(false)}
                className="flex-1"
              />
              <Button
                title="Salvar"
                onPress={nameForm.handleSubmit(handleUpdateName)}
                loading={isUpdatingName}
                className="flex-1"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showPasswordModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
              Alterar Senha
            </Text>

            {passwordError && (
              <Text className="text-red-500 dark:text-red-400 text-sm mb-4">
                {passwordError instanceof Error ? passwordError.message : 'Erro ao alterar senha'}
              </Text>
            )}

            {passwordSuccess && (
              <Text className="text-green-600 dark:text-green-400 text-sm mb-4">
                Senha alterada com sucesso!
              </Text>
            )}

            <View className="gap-4">
              <Controller
                control={passwordForm.control}
                name="currentPassword"
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    label="Senha Atual"
                    placeholder="Sua senha atual"
                    value={value}
                    onChangeText={onChange}
                    error={passwordForm.formState.errors.currentPassword?.message}
                  />
                )}
              />

              <Controller
                control={passwordForm.control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    label="Nova Senha"
                    placeholder="Sua nova senha"
                    value={value}
                    onChangeText={onChange}
                    error={passwordForm.formState.errors.newPassword?.message}
                  />
                )}
              />

              <Controller
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    label="Confirmar Nova Senha"
                    placeholder="Confirme a nova senha"
                    value={value}
                    onChangeText={onChange}
                    error={passwordForm.formState.errors.confirmPassword?.message}
                  />
                )}
              />
            </View>

            <View className="flex-row gap-3 mt-6">
              <Button
                title="Cancelar"
                variant="outline"
                onPress={() => setShowPasswordModal(false)}
                className="flex-1"
              />
              <Button
                title="Alterar"
                onPress={passwordForm.handleSubmit(handleUpdatePassword)}
                loading={isUpdatingPassword}
                className="flex-1"
              />
            </View>
          </View>
        </View>
      </Modal>

      <LoadingOverlay visible={isUpdatingAvatar} message="Atualizando foto..." />

      <Modal visible={showLogoutSheet} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <View className="items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center mb-3">
                <Ionicons name="alert-circle" size={28} color="#dc2626" />
              </View>
              <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                Sair da conta
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                Tem certeza que deseja sair?
              </Text>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={() => setShowLogoutSheet(false)}
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Sair"
                  variant="danger"
                  onPress={handleConfirmLogout}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  )
}
