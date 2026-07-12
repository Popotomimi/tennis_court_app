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

Sprint 04

Status:

Concluída.

Documentação:

Concluída.

Próximo passo:

Sprint 05 — Detalhes do Torneio (Informações, Participantes, Status, Ações).

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

---

# Sprint 01 — Autenticação

## Status

Concluída.

## Dependências instaladas

Nenhuma. Todas as dependências foram instaladas na Sprint 00.

## Funcionalidades implementadas

- Splash Screen com verificação de token e redirecionamento automático
- Tela de Login com formulário validado (React Hook Form + Zod)
- Tela de Cadastro com formulário validado (React Hook Form + Zod)
- Logout com limpeza de sessão e redirecionamento
- Persistência do Token JWT via AsyncStorage
- Persistência do Usuário autenticado via AsyncStorage
- Auto Login ao abrir o aplicativo
- Axios Interceptor: request (Bearer Token automático) e response (401 → logout automático)
- Proteção de rotas privadas (redirect para login se não autenticado)

## Arquivos criados

### Features/auth/
- features/auth/types/auth-types.ts
- features/auth/services/auth-service.ts
- features/auth/viewmodels/use-auth-viewmodel.ts
- features/auth/viewmodels/use-login-viewmodel.ts
- features/auth/viewmodels/use-register-viewmodel.ts
- features/auth/hooks/use-auth-redirect.ts

## Arquivos modificados

- stores/auth-store.ts — adicionado persistência (saveSession, restoreSession, logout com AsyncStorage), tipo User concreto, isLoading
- services/api.ts — adicionado interceptor request (Bearer Token) e response (401 → logout)
- app/(auth)/splash.tsx — implementado auto-login com restoreSession e redirect
- app/(auth)/login.tsx — implementado formulário completo com React Hook Form + Zod
- app/(auth)/register.tsx — implementado formulário completo com React Hook Form + Zod
- app/(auth)/_layout.tsx — mantido simples (sem redirect, Splash gerencia)
- app/(tabs)/_layout.tsx — adicionado proteção de rota (redirect para login se não autenticado)

## Explicação dos arquivos

### stores/auth-store.ts
Store Zustand responsável por gerenciar o estado de autenticação:
- `token`: string do JWT
- `user`: dados do usuário autenticado (User)
- `isAuthenticated`: boolean derivado da existência do token
- `isLoading`: controle de carregamento na restauração da sessão
- `setToken(token)`: define o token e atualiza isAuthenticated
- `setUser(user)`: define os dados do usuário
- `saveSession(token, user)`: persiste token e user no AsyncStorage e atualiza o estado
- `restoreSession()`: recupera token e user do AsyncStorage e atualiza o estado
- `logout()`: remove token e user do AsyncStorage e limpa o estado

### services/api.ts
Instância Axios compartilhada:
- Interceptor request: adiciona header `Authorization: Bearer <token>` automaticamente quando existe token no store
- Interceptor response: detecta erro 401 e executa logout automático

### features/auth/types/auth-types.ts
Tipos específicos da feature de autenticação:
- `LoginRequest`: email e password
- `RegisterRequest`: name, email e password
- `AuthResponse`: token e user

### features/auth/services/auth-service.ts
Service de comunicação com a API de autenticação:
- `login(data)`: POST /auth/login
- `register(data)`: POST /auth/register
- `logout()`: POST /auth/logout

### features/auth/viewmodels/use-auth-viewmodel.ts
ViewModel global de autenticação:
- Fornece `isLoading`, `isAuthenticated`, `user` do store
- Fornece `restoreSession()` e `logout()` como ações

### features/auth/viewmodels/use-login-viewmodel.ts
ViewModel da tela de Login:
- Usa `useMutation` do React Query para chamar `authService.login()`
- On success: salva sessão via `saveSession()`
- Retorna: `login(data)`, `isLoading`, `error`, `clearError()`

### features/auth/viewmodels/use-register-viewmodel.ts
ViewModel da tela de Cadastro:
- Usa `useMutation` do React Query para chamar `authService.register()`
- On success: salva sessão via `saveSession()`
- Retorna: `register(data)`, `isLoading`, `error`, `clearError()`

### features/auth/hooks/use-auth-redirect.ts
Hook de navegação:
- Observa `isAuthenticated` e `isLoading` do store
- Redireciona para `(tabs)` se autenticado ou `(auth)/login` se não

### app/(auth)/splash.tsx
Tela de splash:
- Ao montar, chama `restoreSession()` para recuperar sessão do AsyncStorage
- Quando `isAuthenticated` muda para true, redireciona para `(tabs)`
- Exibe logo "Tennis Court" com ActivityIndicator

### app/(auth)/login.tsx
Tela de login:
- Formulário com campos de email e senha
- Validação com Zod (email válido, senha mínimo 6 caracteres)
- Consome `useLoginViewModel` para realizar o login
- Em caso de sucesso, redireciona para `(tabs)`
- Link para tela de cadastro

### app/(auth)/register.tsx
Tela de cadastro:
- Formulário com campos de nome, email, senha e confirmar senha
- Validação com Zod (nome mínimo 3, email válido, senha mínimo 6, senhas conferem)
- Consome `useRegisterViewModel` para realizar o cadastro
- Em caso de sucesso, redireciona para `(tabs)`
- Link para tela de login

### app/(tabs)/_layout.tsx
Layout das abas protegidas:
- Verifica se usuário está autenticado
- Se não estiver, redireciona para `(auth)/login`
- Mantém as 4 abas: Início, Torneios, Histórico, Perfil

---

# Sprint 02 — Dashboard

## Status

Concluída.

## Dependências instaladas

Nenhuma. Todas as dependências foram instaladas na Sprint 00.

## Funcionalidades implementadas

- Tela inicial (Dashboard) com layout completo
- Cards de estatísticas resumidas (Torneios, Partidas, Vitórias, Aproveitamento)
- Lista de torneios recentes
- Pull To Refresh na lista
- Loading state (full screen enquanto carrega)
- Empty State (quando não há torneios)
- Error State (quando a API falha)

## Arquivos criados

### Features/dashboard/
- features/dashboard/types/dashboard-types.ts
- features/dashboard/services/dashboard-service.ts
- features/dashboard/viewmodels/use-dashboard-viewmodel.ts
- features/dashboard/components/stat-card.tsx
- features/dashboard/components/tournament-list-item.tsx

## Arquivos modificados

- app/(tabs)/index.tsx — implementado dashboard completo com FlatList, RefreshControl, Loading, ErrorState, EmptyState, StatCards e TournamentListItem

## Explicação dos arquivos

### features/dashboard/types/dashboard-types.ts
Tipos específicos da feature de dashboard:
- `UserStatistics`: totalTournaments, totalMatches, wins, losses, winRate
- `DashboardData`: statistics + recentTournaments

### features/dashboard/services/dashboard-service.ts
Service de comunicação com a API de dashboard:
- `getStatistics()`: GET /statistics/me — retorna estatísticas do usuário
- `getRecentTournaments()`: GET /tournaments?page=1&limit=5 — retorna torneios recentes

### features/dashboard/viewmodels/use-dashboard-viewmodel.ts
ViewModel da tela de Dashboard:
- Usa `useQuery` para buscar estatísticas e torneios recentes
- Fornece `refresh()` para Pull To Refresh (refetch de ambas queries)
- Retorna: statistics, tournaments, isLoading, isRefreshing, error, refresh

### features/dashboard/components/stat-card.tsx
Componente de card de estatística:
- Ícone, label, valor e cor personalizável
- Utiliza o componente `Card` reutilizável

### features/dashboard/components/tournament-list-item.tsx
Componente de item da lista de torneios:
- Exibe nome, descrição, participantes e status
- Utiliza `Card` e `Badge` reutilizáveis
- Mapeia status para variantes visuais (pending → warning, in_progress → info, completed → success)

### app/(tabs)/index.tsx
Tela de Dashboard:
- Exibe Loading full screen enquanto carrega dados iniciais
- Exibe ErrorState com botão "Tentar novamente" se a API falhar
- Exibe FlatList com RefreshControl (Pull To Refresh)
- Header com cards de estatísticas (Torneios, Partidas, Vitórias, Aproveitamento)
- Lista de torneios recentes com TournamentListItem
- EmptyState quando não há torneios

---

# Sprint 03 — Perfil

## Status

Concluída.

## Dependências instaladas

Nenhuma. Todas as dependências foram instaladas na Sprint 00.

## Funcionalidades implementadas

- Visualizar perfil (avatar, nome, email)
- Alterar nome (modal com formulário validado)
- Alterar senha (modal com formulário validado, 3 campos: atual, nova, confirmar)
- Atualizar avatar (Image Picker + upload multipart/form-data)
- Logout com confirmação (Alert)
- Loading state (enquanto carrega perfil)
- Error state (feedback inline nos modais)
- Success state (feedback inline nos modais)
- Persistência do usuário atualizado no AsyncStorage via `updateUser()`

## Arquivos criados

### Features/profile/
- features/profile/types/profile-types.ts
- features/profile/services/profile-service.ts
- features/profile/viewmodels/use-profile-viewmodel.ts
- features/profile/viewmodels/use-update-name-viewmodel.ts
- features/profile/viewmodels/use-update-password-viewmodel.ts
- features/profile/viewmodels/use-update-avatar-viewmodel.ts
- features/profile/components/profile-header.tsx
- features/profile/components/profile-menu-item.tsx

## Arquivos modificados

- stores/auth-store.ts — adicionado método `updateUser(userData)` que persiste no AsyncStorage e atualiza o estado
- app/(tabs)/profile.tsx — implementado perfil completo com ProfileHeader, menu items, modais de edição, Image Picker, logout

## Explicação dos arquivos

### features/profile/types/profile-types.ts
Tipos específicos da feature de perfil:
- `UpdateNameRequest`: name
- `UpdatePasswordRequest`: currentPassword, newPassword

### features/profile/services/profile-service.ts
Service de comunicação com a API de perfil:
- `getProfile()`: GET /profile/me — retorna dados do usuário
- `updateName(data)`: PUT /profile/update — atualiza nome
- `updatePassword(data)`: PUT /profile/password — altera senha
- `updateAvatar(uri)`: PUT /profile/avatar — upload de avatar via multipart/form-data

### features/profile/viewmodels/use-profile-viewmodel.ts
ViewModel de visualização do perfil:
- Usa `useQuery` com `enabled: false` (dados já estão no store)
- Retorna: user, isLoading, error, refetch

### features/profile/viewmodels/use-update-name-viewmodel.ts
ViewModel de atualização de nome:
- Usa `useMutation` para chamar `profileService.updateName()`
- On success: atualiza o store via `updateUser()` e invalida query de perfil
- Retorna: updateName(data), isLoading, error, isSuccess, clearError

### features/profile/viewmodels/use-update-password-viewmodel.ts
ViewModel de alteração de senha:
- Usa `useMutation` para chamar `profileService.updatePassword()`
- Retorna: updatePassword(data), isLoading, error, isSuccess, clearError

### features/profile/viewmodels/use-update-avatar-viewmodel.ts
ViewModel de atualização de avatar:
- Usa `useMutation` para chamar `profileService.updateAvatar(uri)`
- On success: atualiza o store via `updateUser()`
- Retorna: updateAvatar(uri), isLoading, error, isSuccess, clearError

### features/profile/components/profile-header.tsx
Componente de cabeçalho do perfil:
- Exibe avatar (com botão de câmera sobreposto), nome e email
- Botão de editar avatar aciona callback onEditAvatar

### features/profile/components/profile-menu-item.tsx
Componente de item de menu do perfil:
- Ícone, label e seta de navegação
- Suporte a variante danger (cor vermelha)

### stores/auth-store.ts
Adicionado método `updateUser(userData)`:
- Persiste o usuário atualizado no AsyncStorage
- Atualiza o estado global

### app/(tabs)/profile.tsx
Tela de Perfil:
- Exibe ProfileHeader com avatar, nome e email
- Botão de editar avatar abre Image Picker (permissão, galeria, crop 1:1)
- Menu "Alterar Nome" abre modal com formulário validado (Zod: mínimo 3 caracteres)
- Menu "Alterar Senha" abre modal com 3 campos (atual, nova, confirmar) validados (Zod: mínimo 6, senhas coincidem)
- Menu "Sair" com Alert de confirmação
- Feedback inline de erro e sucesso nos modais
- Loading overlay durante upload de avatar

---

# Sprint 04 — Torneios

## Status

Concluída.

## Dependências instaladas

Nenhuma. Todas as dependências foram instaladas na Sprint 00.

## Funcionalidades implementadas

- Listagem de torneios com paginação (GET /tournaments?page=&limit=)
- Criação de torneio (POST /tournaments) com formulário validado
- Edição de torneio (PUT /tournaments/:id) — apenas owner, status WAITING
- Exclusão de torneio (DELETE /tournaments/:id) — apenas owner, status WAITING
- Botão FAB para criar torneio
- Pull to Refresh na listagem
- Botão "Carregar mais" para paginação
- Loading state (full screen enquanto carrega)
- Error state (com botão "Tentar novamente")
- Empty state (quando não há torneios)
- Feedback inline de erro e sucesso nos modais
- Ações de editar/excluir visíveis apenas para o owner e quando status é WAITING

## Arquivos criados

### Features/tournaments/
- features/tournaments/types/tournament-types.ts
- features/tournaments/services/tournament-service.ts
- features/tournaments/viewmodels/use-tournaments-list-viewmodel.ts
- features/tournaments/viewmodels/use-create-tournament-viewmodel.ts
- features/tournaments/viewmodels/use-update-tournament-viewmodel.ts
- features/tournaments/viewmodels/use-delete-tournament-viewmodel.ts
- features/tournaments/components/tournament-card.tsx
- features/tournaments/components/create-tournament-modal.tsx
- features/tournaments/components/edit-tournament-modal.tsx
- features/tournaments/components/delete-tournament-confirmation.tsx

## Arquivos modificados

- types/tournament.ts — atualizado para refletir a API real: `maxPlayers` (antes `maxParticipants`), status `WAITING | STARTED | FINISHED` (antes `pending | in_progress | completed`), adicionado `owner` e `_count.participants`
- features/dashboard/components/tournament-list-item.tsx — atualizado para usar novos campos (`_count.participants`, `maxPlayers`, status `WAITING | STARTED | FINISHED`)
- app/(tabs)/tournaments.tsx — implementado CRUD completo com FlatList, paginação, FAB, modais de criação/edição/exclusão, Loading/Error/Empty states

## Explicação dos arquivos

### types/tournament.ts
Tipos compartilhados de torneio atualizados para refletir a API real:
- `TournamentStatus`: `'WAITING' | 'STARTED' | 'FINISHED'` (antes `pending | in_progress | completed`)
- `TournamentOwner`: objeto aninhado com `id`, `name`, `email`
- `TournamentCount`: `{ participants: number }` via `_count`
- `Tournament`: adicionado `owner` e `_count`, `maxPlayers` (antes `maxParticipants`)
- `CreateTournamentRequest` e `UpdateTournamentRequest`: `maxPlayers` (antes `maxParticipants`)

### features/tournaments/types/tournament-types.ts
Tipos específicos da feature de torneios:
- Re-exporta `Tournament`, `CreateTournamentRequest`, `UpdateTournamentRequest` do types compartilhados
- `TournamentListParams`: page e limit opcionais
- `PaginatedTournamentsResponse`: data, total, page, limit

### features/tournaments/services/tournament-service.ts
Service de comunicação com a API de torneios:
- `list(page, limit)`: GET /tournaments?page=&limit= — retorna lista paginada
- `create(data)`: POST /tournaments — cria torneio, retorna 201
- `update(id, data)`: PUT /tournaments/:id — atualiza torneio (owner only, WAITING)
- `delete(id)`: DELETE /tournaments/:id — exclui torneio (owner only, WAITING)

### features/tournaments/viewmodels/use-tournaments-list-viewmodel.ts
ViewModel de listagem de torneios:
- `useQuery` com chave `['tournaments', page]` para paginação
- `refresh()`: volta para página 1 e refetch
- `loadMore()`: avança para próxima página se houver mais
- `hasMore`: booleano indicando se há mais páginas
- Retorna: tournaments, total, page, isLoading, isRefetching, error, refresh, loadMore, hasMore, resetPage

### features/tournaments/viewmodels/use-create-tournament-viewmodel.ts
ViewModel de criação de torneio:
- `useMutation` para chamar `tournamentService.create()`
- On success: invalida query `['tournaments']`
- Retorna: create(data), isLoading, error, isSuccess, clearError

### features/tournaments/viewmodels/use-update-tournament-viewmodel.ts
ViewModel de edição de torneio:
- `useMutation` para chamar `tournamentService.update(id, data)`
- On success: invalida query `['tournaments']`
- Retorna: update(id, data), isLoading, error, isSuccess, clearError

### features/tournaments/viewmodels/use-delete-tournament-viewmodel.ts
ViewModel de exclusão de torneio:
- `useMutation` para chamar `tournamentService.delete(id)`
- On success: invalida query `['tournaments']`
- Retorna: remove(id), isLoading, error, isSuccess, clearError

### features/tournaments/components/tournament-card.tsx
Componente de card de torneio na listagem:
- Exibe nome, descrição, owner, status (Badge), participantes (ícone + _count.participants/maxPlayers)
- Botões de Editar e Excluir visíveis apenas para o owner e quando status é WAITING
- Status mapeado: WAITING → warning, STARTED → info, FINISHED → success

### features/tournaments/components/create-tournament-modal.tsx
Modal de criação de torneio:
- Formulário com campos: nome, descrição (opcional), máximo de participantes
- Validação com Zod (nome 3-100, descrição max 500, maxPlayers 2-128)
- Botões Cancelar/Criar
- Feedback inline de erro e sucesso
- Fecha e reseta formulário após sucesso

### features/tournaments/components/edit-tournament-modal.tsx
Modal de edição de torneio:
- Mesmos campos do create, pré-preenchidos com dados atuais
- Validação com Zod (mesmas regras)
- Botões Cancelar/Salvar
- Feedback inline de erro

### features/tournaments/components/delete-tournament-confirmation.tsx
Modal de confirmação de exclusão:
- Exibe nome do torneio e mensagem de confirmação
- Botão Cancelar e Excluir (variant danger)
- Feedback inline de erro

### app/(tabs)/tournaments.tsx
Tela de Torneios:
- FlatList com TournamentCard para cada torneio
- Pull to Refresh via RefreshControl
- Botão "Carregar mais" para paginação
- FAB (botão flutuante) para criar torneio
- Modais de criação, edição e exclusão
- Loading state (full screen enquanto carrega)
- Error state (com botão "Tentar novamente")
- Empty state (quando não há torneios)
- Ações de editar/excluir visíveis apenas para owner e status WAITING

### features/dashboard/components/tournament-list-item.tsx
Atualizado para refletir os novos campos da API:
- Status: `WAITING | STARTED | FINISHED` (antes `pending | in_progress | completed`)
- Participantes: `_count.participants` e `maxPlayers` (antes `currentParticipants` e `maxParticipants`)
