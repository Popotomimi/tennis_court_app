# CONTEXT

## Projeto

Nome do projeto:

Tennis Court App

Aplicação mobile desenvolvida em React Native utilizando Expo.

O aplicativo será responsável por consumir a Tennis Court API, oferecendo uma interface moderna para gerenciamento de torneios amadores de tênis.

Todo processamento de regras de negócio acontece na API.

O aplicativo é responsável apenas pela interface, experiência do usuário e consumo dos endpoints.

---

# Objetivo

Permitir que usuários autenticados possam:

- Criar conta;
- Fazer login;
- Editar perfil;
- Criar torneios;
- Participar de torneios;
- Iniciar torneios;
- Registrar vencedores;
- Acompanhar partidas;
- Consultar estatísticas;
- Visualizar histórico.

---

# Stack

- React Native
- Expo SDK
- Expo Router
- TypeScript
- NativeWind
- React Query
- Axios
- Zustand
- React Hook Form
- Zod
- React Native Reanimated
- Expo Image Picker
- AsyncStorage

---

# Arquitetura

Feature First

-

MVVM

Fluxo obrigatório:

View

↓

ViewModel

↓

Service

↓

Axios

↓

API

Nenhuma tela poderá acessar diretamente a API.

---

# Estrutura

app/

assets/

components/

constants/

docs/

features/

hooks/

providers/

services/

stores/

theme/

types/

utils/

---

# Organização das Features

Cada Feature deverá possuir:

components/

hooks/

services/

types/

viewmodels/

Exemplo:

features/

auth/

components/

hooks/

services/

types/

viewmodels/

---

# Comunicação com a API

Toda comunicação deverá acontecer através do Axios.

A instância compartilhada deverá ficar em:

services/api.ts

Todos os Services deverão utilizar essa instância.

---

# Estado Global

React Query

Responsável por:

- Perfil
- Torneios
- Histórico
- Participantes
- Confrontos
- Estatísticas

Zustand

Responsável por:

- Usuário autenticado
- Token
- Configurações
- Preferências
- Estados locais

---

# Navegação

Expo Router

Separação obrigatória:

(auth)

(tabs)

Rotas privadas deverão validar autenticação.

---

# Validação

Toda validação deverá utilizar:

React Hook Form

-

Zod

Não utilizar Yup.

---

# Design

Toda estilização deverá utilizar NativeWind.

Evitar StyleSheet.

Utilizar componentes reutilizáveis.

---

# Componentização

Todo componente reutilizável deverá ficar em:

components/

Componentes específicos deverão ficar dentro da própria Feature.

---

# API

A Tennis Court API já está pronta.

Ela possui:

- Autenticação
- Perfil
- Torneios
- Participantes
- Confrontos
- Histórico
- Estatísticas

O aplicativo deverá consumir exclusivamente esses endpoints.

Não criar endpoints fictícios.

Não assumir comportamentos inexistentes.

---

# Qualidade

Todo código deverá ser:

- Tipado
- Componentizado
- Organizado
- Reutilizável
- Escalável
- Fácil manutenção

---

# Situação Atual

Sprint atual:

Sprint 00

Status:

Concluída.

Documentação:

Concluída.

Próximo passo:

Sprint 01 — Autenticação (Login, Cadastro, Splash, Logout, Persistência, Auto Login, Axios Interceptor).

---

# Atualização

Ao final de cada Sprint este documento deverá ser atualizado automaticamente contendo:

- Estrutura atual do projeto;
- Dependências instaladas;
- Funcionalidades implementadas;
- Arquivos criados;
- Arquivos modificados;
- Pendências;
- Próxima Sprint.

---

# Sprint 00 — Infraestrutura

## Status

Concluída.

## Dependências instaladas

- expo@~57.0.4
- expo-router@~57.0.4
- expo-status-bar@~57.0.0
- expo-constants@~57.0.3
- expo-linking@~57.0.2
- expo-image@~57.0.0
- expo-image-picker@~57.0.2
- react-native-reanimated@4.5.0
- react-native-gesture-handler@~2.32.0
- react-native-toast-message@^2.4.0
- @react-native-async-storage/async-storage@2.2.0
- @expo/vector-icons@^15.0.2
- @gorhom/bottom-sheet@^5.2.14
- nativewind@^4.2.6
- tailwindcss@^4.3.2
- @tanstack/react-query@^5.101.2
- zustand@^5.0.14
- axios@^1.18.1
- react-hook-form@^7.81.0
- @hookform/resolvers@^5.4.0
- zod@^4.4.3
- react-native-toast-message@^2.4.0

## Funcionalidades implementadas

- Projeto Expo criado com TypeScript
- Expo Router configurado com grupos (auth) e (tabs)
- NativeWind v4 + Tailwind CSS configurado
- TanStack React Query configurado com provider global
- Axios configurado com instância compartilhada e interceptors
- Zustand configurado (auth-store, theme-store)
- React Hook Form + Zod instalados
- Aliases de import @/ configurados
- Estrutura de pastas completa criada
- Tema centralizado (cores, fontes, espaçamentos, radius)
- Componentes base reutilizáveis criados
- Providers globais configurados
- Expo Router configurado com grupos (auth) e (tabs)
- AsyncStorage configurado para persistência

## Arquivos criados

### Configuração raiz
- package.json
- tsconfig.json
- app.json
- global.css
- nativewind-env.d.ts

### Rotas (app/)
- app/_layout.tsx
- app/(auth)/_layout.tsx
- app/(auth)/splash.tsx
- app/(auth)/login.tsx
- app/(auth)/register.tsx
- app/(tabs)/_layout.tsx
- app/(tabs)/index.tsx
- app/(tabs)/tournaments.tsx
- app/(tabs)/history.tsx
- app/(tabs)/profile.tsx

### Services
- services/api.ts
- services/storage.ts

### Providers
- providers/query-provider.tsx
- providers/app-providers.tsx

### Stores
- stores/auth-store.ts
- stores/theme-store.ts

### Theme
- theme/colors.ts
- theme/fonts.ts
- theme/spacing.ts
- theme/index.ts

### Types
- types/user.ts
- types/tournament.ts
- types/api.ts
- types/css.d.ts

### Constants
- constants/api.ts
- constants/storage-keys.ts

### Components
- components/button.tsx
- components/input.tsx
- components/password-input.tsx
- components/loading.tsx
- components/empty-state.tsx
- components/error-state.tsx
- components/screen-container.tsx
- components/avatar.tsx
- components/card.tsx
- components/badge.tsx
- components/divider.tsx

### Utils
- utils/index.ts

### Hooks
- hooks/index.ts

## Arquivos modificados

- package.json (adicionado main: expo-router/entry, scripts lint/tsc)
- tsconfig.json (adicionado baseUrl, paths, ignoreDeprecations)
- app.json (adicionado scheme, splash, plugins expo-router e expo-image)
- .gitignore (mantido o original)

## Dependências instaladas

- expo@~57.0.4
- expo-router@~57.0.4
- expo-status-bar@~57.0.0
- expo-constants@~57.0.3
- expo-linking@~57.0.2
- expo-image@~57.0.0
- expo-image-picker@~57.0.2
- react-native-reanimated@4.5.0
- react-native-gesture-handler@~2.32.0
- react-native-toast-message@^2.4.0
- @react-native-async-storage/async-storage@2.2.0
- @expo/vector-icons@^15.0.2
- @gorhom/bottom-sheet@^5.2.14
- nativewind@^4.2.6
- tailwindcss@^4.3.2
- @tanstack/react-query@^5.101.2
- zustand@^5.0.14
- axios@^1.18.1
- react-hook-form@^7.81.0
- @hookform/resolvers@^5.4.0
- zod@^4.4.3
- react-native-toast-message@^2.4.0

## Funcionalidades implementadas

- Projeto Expo criado com TypeScript
- Expo Router configurado com grupos (auth) e (tabs)
- NativeWind v4 + Tailwind CSS configurado
- TanStack React Query configurado com provider global
- Axios configurado com instância compartilhada e interceptors
- Zustand configurado (auth-store, theme-store)
- React Hook Form + Zod instalados
- Aliases de import @/ configurados
- Estrutura de pastas completa criada
- Tema centralizado (cores, fontes, espaçamentos, radius)
- Componentes base reutilizáveis criados
- Providers globais configurados
- Expo Router configurado com grupos (auth) e (tabs)
- AsyncStorage configurado para persistência

## Arquivos criados

### Configuração raiz
- package.json
- tsconfig.json
- app.json
- global.css
- nativewind-env.d.ts

### Rotas (app/)
- app/_layout.tsx
- app/(auth)/_layout.tsx
- app/(auth)/splash.tsx
- app/(auth)/login.tsx
- app/(auth)/register.tsx
- app/(tabs)/_layout.tsx
- app/(tabs)/index.tsx
- app/(tabs)/tournaments.tsx
- app/(tabs)/history.tsx
- app/(tabs)/profile.tsx

### Services
- services/api.ts
- services/storage.ts

### Providers
- providers/query-provider.tsx
- providers/app-providers.tsx

### Stores
- stores/auth-store.ts
- stores/theme-store.ts

### Theme
- theme/colors.ts
- theme/fonts.ts
- theme/spacing.ts
- theme/index.ts

### Types
- types/user.ts
- types/tournament.ts
- types/api.ts
- types/css.d.ts

### Constants
- constants/api.ts
- constants/storage-keys.ts

### Components
- components/button.tsx
- components/input.tsx
- components/password-input.tsx
- components/loading.tsx
- components/empty-state.tsx
- components/error-state.tsx
- components/screen-container.tsx
- components/avatar.tsx
- components/card.tsx
- components/badge.tsx
- components/divider.tsx

### Utils
- utils/index.ts

### Hooks
- hooks/index.ts

## Arquivos modificados

- package.json (main alterado para expo-router/entry, scripts adicionados)
- tsconfig.json (adicionado baseUrl, paths, ignoreDeprecations)
- app.json (adicionado scheme, splash, plugins)
- .gitignore (mantido o original)

## Pendências

Nenhuma.

## Próxima Sprint

Sprint 01 — Autenticação (Splash, Login, Cadastro, Logout, Persistência, Auto Login, Axios Interceptor).
