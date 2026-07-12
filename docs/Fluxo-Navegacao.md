# Fluxo de Navegação

## Objetivo

Este documento define toda a navegação do aplicativo utilizando Expo Router.

A estrutura deverá ser simples, organizada e escalável.

---

# Estrutura

app/

(auth)/

(tabs)/

tournament/

history/

profile/

---

# Grupo Auth

Responsável pelas telas públicas.

Telas

- Splash
- Login
- Cadastro

Enquanto o usuário não estiver autenticado, somente este grupo poderá ser acessado.

---

# Grupo Tabs

Responsável pelas telas privadas.

Abas

- Home
- Torneios
- Histórico
- Perfil

Todas exigem autenticação.

---

# Fluxo

Aplicação inicia

↓

Splash

↓

Existe Token?

↓

Sim

↓

Dashboard

↓

Não

↓

Login

---

# Fluxo após Login

Login

↓

Dashboard

↓

Tabs

↓

Demais telas

---

# Navegação para Torneio

Dashboard

↓

Lista de Torneios

↓

Detalhes

↓

Participantes

↓

Confrontos

---

# Navegação para Perfil

Dashboard

↓

Perfil

↓

Editar Nome

↓

Trocar Senha

↓

Alterar Avatar

---

# Navegação para Histórico

Dashboard

↓

Histórico

↓

Detalhes do Torneio

---

# Navegação por Deep Link

O projeto deverá estar preparado para futura implementação de Deep Linking utilizando Expo Router.

Não será implementado no MVP.

---

# Regras

Nenhuma tela privada poderá ser acessada sem autenticação.

Toda navegação protegida deverá validar o estado do usuário.

Caso o token expire

↓

Redirecionar automaticamente para Login.

---

# Organização

As rotas deverão permanecer simples.

A lógica de autenticação não deverá ficar nas telas.

A navegação deverá ser controlada pelo estado global da aplicação.
