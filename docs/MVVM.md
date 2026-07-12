# Arquitetura MVVM

## Objetivo

A aplicação seguirá o padrão arquitetural MVVM (Model-View-ViewModel).

Esse padrão visa separar responsabilidades, facilitar manutenção, testes e reutilização de código.

---

# Estrutura

View

↓

ViewModel

↓

Service

↓

API

---

# View

Responsável apenas pela interface.

Não deve conter:

- Regras de negócio;
- Chamadas HTTP;
- Manipulação de dados.

A View apenas:

- Renderiza componentes;
- Dispara eventos;
- Consome o ViewModel.

---

# ViewModel

Responsável por toda regra da tela.

Pode:

- Consumir Services;
- Utilizar React Query;
- Utilizar Zustand;
- Manipular estados;
- Preparar dados para a View.

Não deve conhecer detalhes da API.

---

# Service

Responsável pela comunicação com o backend.

Toda chamada HTTP deverá acontecer aqui.

Exemplo:

AuthService

UserService

TournamentService

HistoryService

StatisticsService

---

# Model

O modelo é representado pelos Types da aplicação.

Exemplo:

User

Tournament

Match

History

Statistics

Todos os Models deverão refletir exatamente os contratos definidos pela API.

---

# Fluxo

Usuário

↓

View

↓

ViewModel

↓

Service

↓

Axios

↓

API

↓

Resposta

↓

React Query

↓

ViewModel

↓

View

---

# Benefícios

- Separação de responsabilidades;
- Código reutilizável;
- Facilidade para testes;
- Fácil manutenção;
- Escalabilidade;
- Componentização;
- Melhor organização do projeto.

---

# Responsabilidades

View

- Interface
- Eventos
- Navegação

ViewModel

- Regras da tela
- Estados
- Mutations
- Queries

Service

- HTTP
- Consumo da API

Model

- Tipos
- Interfaces
- Contratos

---

# Regra principal

Nenhuma View poderá acessar diretamente o Axios.

Toda comunicação deverá obrigatoriamente passar pelo ViewModel e pelos Services.

Isso garante desacoplamento, reutilização e facilita futuras alterações na API.
