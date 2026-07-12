# REGRAS PARA A IA

## Objetivo

Este documento define todas as regras que deverão ser respeitadas durante o desenvolvimento do projeto.

Todas as respostas deverão seguir rigorosamente estas instruções.

---

# Regra 1

Nunca alterar a arquitetura do projeto sem autorização explícita.

A arquitetura oficial é:

Feature First

-

MVVM

---

# Regra 2

Nunca instalar novas bibliotecas sem justificar tecnicamente a necessidade.

Sempre reutilizar as dependências existentes.

---

# Regra 3

Antes de criar um componente novo, verificar se já existe um componente reutilizável.

Evitar duplicação.

---

# Regra 4

Nunca acessar Axios diretamente em uma View.

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

---

# Regra 5

Nunca colocar regra de negócio na View.

A View apenas:

- Renderiza
- Dispara eventos
- Consome ViewModels

---

# Regra 6

Toda comunicação com a API deverá acontecer exclusivamente pelos Services.

---

# Regra 7

Toda consulta à API deverá utilizar React Query.

Utilizar:

- useQuery
- useMutation
- invalidateQueries

Sempre que apropriado.

---

# Regra 8

Zustand deverá armazenar apenas estados locais.

Nunca utilizar Zustand para armazenar listas provenientes da API.

---

# Regra 9

Toda validação deverá utilizar:

React Hook Form

-

Zod

Não utilizar Yup.

---

# Regra 10

Todo código deverá ser escrito em TypeScript.

Nunca utilizar any.

Preferir tipagem forte.

---

# Regra 11

Utilizar componentes pequenos e reutilizáveis.

Evitar componentes gigantes.

---

# Regra 12

Uma responsabilidade por arquivo.

---

# Regra 13

Utilizar aliases.

Evitar imports relativos longos.

---

# Regra 14

Toda tela deverá possuir:

- Loading
- Empty State
- Error State
- Success State

---

# Regra 15

Toda ação do usuário deverá possuir feedback visual.

Exemplo:

- Toast
- Loading
- Skeleton
- Bottom Sheet
- Alert

---

# Regra 16

Toda nova funcionalidade deverá respeitar a documentação existente.

Ler antes de implementar:

- CONTEXT.md
- Arquitetura-Mobile.md
- MVVM.md
- ROADMAP.md
- Estrutura-Pastas.md

---

# Regra 17

Não implementar funcionalidades de Sprints futuras.

Implementar apenas a Sprint solicitada.

---

# Regra 18

Ao finalizar qualquer Sprint executar obrigatoriamente:

- yarn tsc --noEmit
- yarn lint
- yarn test (quando existirem testes)

A Sprint somente poderá ser considerada concluída se todos os comandos executarem sem erros.

---

# Regra 19

Após finalizar qualquer Sprint atualizar automaticamente:

- CONTEXT.md
- DEVELOPMENT.md (quando existir)

Informando:

- Arquivos criados;
- Arquivos modificados;
- Dependências instaladas;
- Funcionalidades implementadas;
- Estrutura atual.

---

# Regra 20

Sempre explicar:

- Arquivos criados;
- Arquivos modificados;
- Dependências instaladas;
- Estrutura criada;
- Como testar;
- Como executar;
- Próximos passos.

---

# Regra 21

Nunca remover código existente sem justificar tecnicamente.

Sempre preservar compatibilidade.

---

# Regra 22

Sempre utilizar boas práticas de desenvolvimento.

Priorizar:

- Clean Code;
- SOLID (quando aplicável);
- DRY;
- KISS;
- Baixo acoplamento;
- Alta coesão.

---

# Regra 23

Todo código gerado deverá estar pronto para produção.

Evitar soluções temporárias ou gambiarras.

---

# Regra 24

Sempre reutilizar a arquitetura existente antes de propor mudanças estruturais.

---

# Regra 25

Em caso de dúvida sobre alguma regra de negócio, consultar primeiro a documentação da Tennis Court API.

Nunca inventar endpoints, contratos ou comportamentos.

---

# Fluxo obrigatório para cada Sprint

1. Ler toda a documentação relevante.

2. Planejar a implementação.

3. Implementar apenas a Sprint solicitada.

4. Atualizar a documentação.

5. Executar TypeScript.

6. Executar Linter.

7. Executar Testes (quando existirem).

8. Corrigir problemas encontrados.

9. Explicar detalhadamente o que foi desenvolvido.

10. Atualizar o CONTEXT.md.

Somente após essas etapas a Sprint poderá ser considerada concluída.
