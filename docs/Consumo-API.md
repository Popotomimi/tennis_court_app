# Consumo da API

## Objetivo

Este documento define como toda comunicação entre o aplicativo e a Tennis Court API deverá acontecer.

Nenhum componente poderá realizar chamadas HTTP diretamente.

Toda comunicação deverá passar pelos Services.

---

# Biblioteca

Axios

Será utilizada uma única instância compartilhada.

api.ts

Responsável por:

- Base URL
- Timeout
- Headers
- Interceptors

---

# Base URL

Durante desenvolvimento

Android Emulator

http://10.0.2.2:3000/api

iOS Simulator

http://localhost:3000/api

Dispositivo físico

IP da máquina local.

Produção

Será alterada futuramente.

---

# Interceptors

Request

Adicionar automaticamente

Authorization

Bearer Token

Caso exista usuário autenticado.

---

Response

Interceptar erros.

Caso receba

401 Unauthorized

Executar Logout.

Remover Token.

Redirecionar para Login.

---

# Organização

services/

api.ts

services/

auth/

tournament/

profile/

history/

statistics/

Cada Service será responsável apenas pelo seu domínio.

---

# Tratamento de Erros

Todos os erros deverão ser tratados.

Exemplos

400

Mostrar mensagem da API.

401

Logout automático.

403

Sem permissão.

404

Recurso não encontrado.

500

Erro interno.

Timeout

Mensagem amigável.

Sem conexão

Mensagem amigável.

---

# React Query

Todas as consultas deverão utilizar React Query.

Utilizar

useQuery

useMutation

invalidateQueries

Optimistic Updates quando fizer sentido.

---

# Cache

O React Query será responsável pelo cache.

Evitar chamadas repetidas.

Atualizar cache após mutations.

---

# Upload

Upload de avatar

multipart/form-data

Utilizando FormData.

---

# Boas práticas

Nunca utilizar fetch diretamente.

Nunca acessar Axios diretamente nas telas.

Toda comunicação deverá acontecer através dos Services.

Todos os retornos deverão ser tipados utilizando TypeScript.
