# Convenções

## Objetivo

Definir padrões de desenvolvimento para todo o projeto.

Todas as novas funcionalidades deverão seguir estas convenções.

---

# Arquivos

Utilizar kebab-case.

Exemplo

login-screen.tsx

user-service.ts

auth-store.ts

---

# Componentes

Utilizar PascalCase.

Exemplo

PrimaryButton

TournamentCard

ProfileAvatar

---

# Hooks

Sempre iniciar com use.

Exemplo

useLogin

useProfile

useTournament

---

# Stores

Finalizar com Store.

Exemplo

authStore

themeStore

settingsStore

---

# Services

Finalizar com Service.

Exemplo

AuthService

TournamentService

HistoryService

---

# Types

Utilizar PascalCase.

Exemplo

User

Tournament

History

---

# Interfaces

Sempre iniciar com I apenas quando necessário.

Preferir utilizar Type.

---

# Imports

Utilizar aliases.

Evitar caminhos relativos longos.

Exemplo

@/components

@/services

@/hooks

---

# Commits

Seguir Conventional Commits.

Exemplos

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

# Organização

Uma responsabilidade por arquivo.

Evitar arquivos muito grandes.

Preferir componentização.

---

# Comentários

Evitar comentários desnecessários.

O código deve ser autoexplicativo.

---

# TypeScript

Nunca utilizar:

any

Preferir tipagem forte.

---

# React

Preferir componentes funcionais.

Utilizar Hooks.

Evitar Classes.

---

# Boas práticas

Não duplicar código.

Reutilizar componentes.

Separar responsabilidades.

Manter baixo acoplamento.

Alta coesão.
