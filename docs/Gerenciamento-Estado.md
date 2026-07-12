# Gerenciamento de Estado

## Objetivo

Este documento define como o estado da aplicação deverá ser organizado.

A aplicação utilizará dois tipos de estado:

React Query

e

Zustand

Cada um possui responsabilidades diferentes.

---

# React Query

Responsável pelos estados do servidor.

Exemplos

Usuário

Perfil

Torneios

Participantes

Confrontos

Histórico

Estatísticas

Toda informação proveniente da API deverá utilizar React Query.

---

# React Query será responsável por

Cache

Refetch

Retry

Loading

Error

Success

Invalidation

Background Fetch

---

# Zustand

Responsável pelos estados locais.

Exemplos

Usuário autenticado

Token

Tema

Configurações

Bottom Sheet

Modal

Estados temporários

Filtros

Preferências

---

# O que NÃO deve ir para o Zustand

Dados da API.

Listas.

Paginação.

Perfil.

Histórico.

Confrontos.

Essas informações pertencem ao React Query.

---

# Fluxo

View

↓

ViewModel

↓

React Query

↓

Service

↓

API

---

Estados Locais

View

↓

ViewModel

↓

Zustand

---

# Persistência

AsyncStorage

Responsável por persistir

Token

Usuário

Preferências

Tema

Caso exista.

---

# Atualização dos Dados

Após qualquer Mutation

Atualizar automaticamente o cache do React Query.

Evitar chamadas desnecessárias.

---

# Organização

stores/

auth.store.ts

theme.store.ts

settings.store.ts

Não criar stores específicas para dados vindos da API.

---

# Regras

React Query

Servidor.

Zustand

Cliente.

Nunca inverter essas responsabilidades.

---

# Benefícios

Código desacoplado.

Menor quantidade de estados duplicados.

Melhor performance.

Maior organização.

Facilidade de manutenção.

Escalabilidade.
