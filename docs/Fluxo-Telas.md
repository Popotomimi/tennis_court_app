# Fluxo de Telas

## Objetivo

Este documento descreve todas as telas do aplicativo, suas responsabilidades e o fluxo de navegação entre elas.

Todas as telas deverão ser desenvolvidas utilizando Expo Router, seguindo a arquitetura MVVM definida no projeto.

---

# Fluxo Geral

Splash

↓

Login ou Cadastro

↓

Dashboard

↓

Torneios

↓

Detalhes do Torneio

↓

Participantes

↓

Confrontos

↓

Histórico

↓

Estatísticas

↓

Perfil

---

# Splash Screen

Objetivo

- Verificar se existe um usuário autenticado.
- Recuperar o token salvo no dispositivo.
- Validar a autenticação.
- Redirecionar automaticamente.

Fluxo

Se existir token válido:

Dashboard

Caso contrário:

Login

---

# Login

Objetivo

Permitir autenticação do usuário.

Funcionalidades

- Email
- Senha
- Login
- Link para Cadastro

Após login com sucesso:

Dashboard

---

# Cadastro

Objetivo

Permitir criação de uma nova conta.

Campos

- Nome
- Email
- Senha
- Confirmar senha

Após cadastro:

Login

---

# Dashboard

Objetivo

Ser a tela inicial da aplicação.

Exibir

- Saudação
- Próximos torneios
- Últimos torneios
- Estatísticas resumidas
- Acesso rápido às funcionalidades

---

# Lista de Torneios

Objetivo

Exibir todos os torneios disponíveis.

Funcionalidades

- Paginação
- Pull to Refresh
- Busca futura
- Navegação para detalhes

---

# Criar Torneio

Objetivo

Criar um novo torneio.

Campos

- Nome
- Descrição
- Máximo de participantes

Após criação

Detalhes do Torneio

---

# Detalhes do Torneio

Objetivo

Apresentar todas as informações do torneio.

Exibir

- Nome
- Descrição
- Status
- Dono
- Participantes
- Botões de ação

Ações

- Entrar
- Sair
- Editar
- Excluir
- Iniciar torneio

Dependendo do usuário autenticado.

---

# Participantes

Objetivo

Listar todos os participantes.

Exibir

- Avatar
- Nome

---

# Confrontos

Objetivo

Exibir todas as partidas.

Exibir

- Rodadas
- Jogadores
- Status
- Vencedor

Caso seja o organizador

Permitir registrar vencedor.

---

# Perfil

Objetivo

Gerenciar os dados do usuário.

Permitir

- Alterar nome
- Alterar senha
- Alterar avatar

---

# Estatísticas

Objetivo

Exibir estatísticas do usuário.

Mostrar

- Torneios jogados
- Torneios vencidos
- Partidas jogadas
- Partidas vencidas
- Win Rate

---

# Histórico

Objetivo

Exibir todos os torneios finalizados.

Cada item deverá abrir:

Detalhes do histórico.

---

# Configurações (Futuro)

Funcionalidades futuras

- Tema claro/escuro
- Idioma
- Notificações
- Sobre

---

# Estados das Telas

Toda tela deverá possuir:

- Loading
- Empty State
- Error State
- Success State

Nenhuma tela deverá ficar sem feedback visual para o usuário.
