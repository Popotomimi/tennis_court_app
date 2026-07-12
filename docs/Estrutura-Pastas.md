# Estrutura de Pastas

## Objetivo

Este documento define a organização oficial do projeto.

Toda nova funcionalidade deverá respeitar esta estrutura.

---

# Estrutura Geral

```

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

```

---

# app/

Contém apenas as rotas do Expo Router.

Não deve conter lógica de negócio.

---

# assets/

Arquivos estáticos.

Exemplos

- imagens
- ícones
- fontes

---

# components/

Componentes reutilizáveis por toda aplicação.

Exemplos

Button

Input

Card

Modal

Avatar

---

# constants/

Constantes globais.

Exemplo

Routes

Storage Keys

API URLs

---

# docs/

Toda documentação do projeto.

Nenhum código deverá ficar aqui.

---

# features/

Cada funcionalidade da aplicação.

Estrutura

```

features/

auth/

components/

hooks/

services/

types/

viewmodels/

profile/

tournaments/

participants/

matches/

history/

statistics/

```

Cada Feature deverá ser independente.

---

# hooks/

Hooks compartilhados.

Exemplo

useDebounce

useKeyboard

useNetwork

---

# providers/

Providers globais.

Exemplo

Query Provider

Theme Provider

Gesture Handler

---

# services/

Serviços compartilhados.

Exemplo

api.ts

storage.ts

permissions.ts

---

# stores/

Estados globais utilizando Zustand.

---

# theme/

Tema da aplicação.

Cores

Fontes

Espaçamentos

Radius

---

# types/

Tipos compartilhados.

---

# utils/

Funções utilitárias.

Exemplo

formatDate

formatCurrency

validators

helpers

---

# Organização das Features

Cada Feature deverá possuir:

```

components/

hooks/

services/

types/

viewmodels/

```

Exemplo

```

features/

auth/

components/

hooks/

services/

types/

viewmodels/

```

---

# Regras

- Não criar código duplicado.
- Reutilizar componentes.
- Cada Feature deve ser independente.
- Nenhuma tela deve acessar a API diretamente.
- Toda chamada HTTP deve passar pelos Services.
- Toda regra de negócio deve ficar no ViewModel.
- A View deve ser responsável apenas pela interface.
