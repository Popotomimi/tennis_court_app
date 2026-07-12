# Arquitetura Mobile

## Objetivo

Este documento define toda a arquitetura utilizada no aplicativo.

Toda a aplicação deverá seguir rigorosamente este documento durante todo o desenvolvimento.

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

---

# Arquitetura

A aplicação utilizará a arquitetura:

Feature First + MVVM

Cada funcionalidade será isolada dentro da sua própria Feature.

Exemplo:

features/
auth/
profile/
tournaments/
participants/
matches/
statistics/
history/

Cada Feature será totalmente independente.

---

# Estrutura geral

app/

components/

features/

providers/

services/

stores/

hooks/

constants/

types/

utils/

theme/

assets/

docs/

---

# Responsabilidade das pastas

## app/

Contém apenas as rotas do Expo Router.

Não deve conter regras de negócio.

---

## features/

Contém toda a lógica da aplicação.

Cada feature possui seus próprios:

- Components
- Hooks
- ViewModels
- Services
- Types

---

## components/

Componentes reutilizáveis por toda aplicação.

Exemplo:

- Button
- Input
- Card
- Avatar
- Loading
- Modal

---

## providers/

Providers globais.

Exemplo:

- QueryClientProvider
- ThemeProvider

---

## services/

Serviços compartilhados.

Exemplo:

- api.ts
- storage.ts

---

## stores/

Estados globais utilizando Zustand.

---

## hooks/

Hooks compartilhados.

---

## utils/

Funções utilitárias.

---

## constants/

Constantes da aplicação.

---

## theme/

Cores, fontes, espaçamentos e estilos globais.

---

# Comunicação com a API

Todo acesso ao backend será realizado exclusivamente através do Axios.

Nenhum componente poderá acessar diretamente a API.

Toda comunicação deverá passar pelos Services.

Fluxo:

Tela

↓

ViewModel

↓

Service

↓

Axios

↓

API

---

# Gerenciamento de Estado

React Query

Responsável pelos estados do servidor.

Exemplos:

- Login
- Perfil
- Torneios
- Histórico

---

Zustand

Responsável pelos estados locais.

Exemplos:

- Usuário autenticado
- Tema
- Configurações
- Estados temporários

---

# Validação

Toda validação deverá utilizar:

React Hook Form

-

Zod

Não utilizar Yup.

---

# Organização

A arquitetura deverá priorizar:

- Baixo acoplamento;
- Alta reutilização;
- Componentização;
- Fácil manutenção;
- Escalabilidade.
