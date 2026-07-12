# Visão Geral do Produto

## Objetivo

O Tennis Court App é um aplicativo mobile desenvolvido em React Native utilizando Expo, destinado ao gerenciamento de torneios amadores de tênis de quadra.

O aplicativo será o cliente oficial da Tennis Court API, consumindo todos os endpoints já implementados na API.

O objetivo é permitir que qualquer usuário autenticado possa criar torneios, administrar participantes, iniciar confrontos automaticamente, registrar resultados das partidas e acompanhar estatísticas pessoais e histórico de campeonatos.

Todo o gerenciamento dos dados será realizado pela API. O aplicativo será responsável apenas pela interface, experiência do usuário e consumo das informações.

---

# Público-alvo

O aplicativo é destinado para:

- Organizadores de torneios amadores;
- Jogadores de tênis;
- Pequenas ligas esportivas;
- Clubes de tênis;
- Academias.

---

# Funcionalidades

## Autenticação

- Cadastro de usuário
- Login
- Logout
- Persistência da sessão
- Renovação automática da autenticação enquanto o token for válido

---

## Perfil

- Visualizar perfil
- Alterar nome
- Alterar senha
- Atualizar foto de perfil

---

## Torneios

- Criar torneio
- Editar torneio
- Excluir torneio
- Visualizar detalhes
- Listar torneios

---

## Participantes

- Entrar em um torneio
- Sair de um torneio
- Listar participantes

---

## Confrontos

- Iniciar torneio
- Visualizar chaveamento
- Visualizar partidas
- Registrar vencedor

---

## Estatísticas

- Total de torneios
- Torneios vencidos
- Total de partidas
- Partidas vencidas
- Taxa de vitória

---

## Histórico

- Histórico de torneios
- Campeões
- Datas
- Resultados

---

# Tecnologias

- React Native
- Expo
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

# Objetivos do MVP

A primeira versão deverá permitir que um usuário consiga:

1. Criar uma conta.
2. Fazer login.
3. Editar seu perfil.
4. Criar um torneio.
5. Entrar em torneios.
6. Iniciar um torneio.
7. Registrar resultados.
8. Visualizar estatísticas.
9. Visualizar histórico.

---

# Objetivos futuros

Após o MVP poderão ser implementadas novas funcionalidades, como:

- Push Notifications;
- Chat entre participantes;
- Convites por QR Code;
- Ranking Global;
- Ranking por Liga;
- Compartilhamento de resultados;
- Integração com armazenamento em nuvem para avatares;
- Múltiplos formatos de torneio.
