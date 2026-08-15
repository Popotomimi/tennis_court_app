SPRINT 1 — MULTI-ESPORTES

1. Objetivo

Adaptar o aplicativo tennis_court_app para reconhecer e trabalhar visualmente com múltiplas modalidades de torneio.

Nesta Sprint serão suportadas:

Tênis (TENNIS)
Beach Tennis (BEACH_TENNIS)
Pickleball (PICKLEBALL)

A Sprint deve integrar o aplicativo mobile com o suporte multi-esportes já implementado na API.

O objetivo é permitir que o usuário:

visualize a modalidade de cada torneio;
selecione a modalidade ao criar um torneio;
edite a modalidade quando permitido pela API;
visualize a modalidade no detalhe;
visualize a modalidade no histórico;
tenha uma identificação visual adequada para cada esporte. 2. Pré-requisitos

Antes de iniciar a implementação, a IA deve obrigatoriamente ler:

docs/Visao-geral-produto.md
docs/Arquitetura-Mobile.md
docs/ROADMAP.md
docs/MVVM.md
docs/Fluxo-Telas.md
docs/Fluxo-Navegacao.md
docs/Consumo-API.md
docs/Gerenciamento-Estado.md
docs/Design-System.md
docs/Componentes.md
docs/Tema.md
docs/Convencoes.md
docs/Estrutura-Pastas.md
docs/CONTEXT.md
docs/REGRAS-IA.md
docs/EVOLUCAO-MULTI-ESPORTES.md
docs/MODELAGEM-MULTI-ESPORTES.md
docs/SPRINT-1-MULTI-ESPORTES.md

Também deve analisar o código atual do aplicativo antes de modificar qualquer arquivo.

A implementação deve respeitar a arquitetura já existente.

3. Estado da API

A API já suporta:

TENNIS
BEACH_TENNIS
PICKLEBALL

O campo está disponível em Tournament.sport.

A API também aceita sport em:

POST /api/tournaments
PUT /api/tournaments/:id

E retorna sport em:
GET /api/tournaments
GET /api/tournaments/:id
GET /api/history
GET /api/history/:id

O aplicativo deve apenas consumir e enviar esses dados.

Não alterar o backend nesta Sprint.

4. Tipagem

Criar ou adaptar os tipos existentes para representar a modalidade.

Deve existir um tipo centralizado equivalente a:

export type TournamentSport =
| 'TENNIS'
| 'BEACH_TENNIS'
| 'PICKLEBALL';

Esse tipo deve ser reutilizado em todo o aplicativo.

4.1 Tournament

Adicionar:

sport: TournamentSport;

ao tipo Tournament.

4.2 CreateTournamentRequest

Adicionar:

sport?: TournamentSport;

ou a definição equivalente compatível com o padrão atual do projeto.

O comportamento padrão deve ser:

TENNIS

quando o usuário não selecionar explicitamente outra modalidade, mantendo compatibilidade com o comportamento anterior.

4.3 UpdateTournamentRequest

Adicionar:

sport?: TournamentSport;

4.4 Histórico

Atualizar:

HistoryItem
HistoryDetail

para suportarem sport.

Não utilizar any para contornar incompatibilidades de tipos.

5. Configuração Centralizada de Modalidades

Criar uma configuração centralizada para as modalidades.

A implementação deve seguir o padrão de organização já existente no projeto.

A configuração deve permitir obter pelo menos:

label
icon

Exemplo conceitual:

TENNIS:
label: 'Tênis'

BEACH_TENNIS:
label: 'Beach Tennis'

PICKLEBALL:
label: 'Pickleball'

O ícone deve ser compatível com a biblioteca de ícones já utilizada pelo aplicativo.

Não adicionar uma nova biblioteca apenas para resolver essa funcionalidade.

6. Helper / Componente de Modalidade

Criar uma solução reutilizável para exibir a modalidade.

Pode ser:

SportBadge

ou outra nomenclatura coerente com os padrões existentes.

O componente deve permitir:

mostrar ícone;
mostrar nome da modalidade;
respeitar Light Mode;
respeitar Dark Mode;
reutilizar o Design System;
evitar duplicação.

Exemplo visual conceitual:

[ 🎾 Tênis ]

[ 🏖️ Beach Tennis ]

[ 🏓 Pickleball ]

Os ícones utilizados são apenas exemplos conceituais.

A implementação deve utilizar os ícones disponíveis no projeto.

7. Criação de Torneio

Alterar o formulário/modal de criação de torneio.

Atualmente o formulário possui:

name
description
maxPlayers

Adicionar:

sport

7.1 Seleção

O usuário deverá conseguir escolher:

Tênis
Beach Tennis
Pickleball

A interface deve deixar claro qual modalidade está selecionada.

7.2 Valor inicial

O valor inicial deve ser:

TENNIS

para preservar o comportamento anterior.

7.3 Validação

A validação deve utilizar o mecanismo já adotado pelo projeto.

Não duplicar regras desnecessariamente.

O valor enviado para a API deve ser exatamente:

TENNIS
BEACH_TENNIS
PICKLEBALL

8. Edição de Torneio

Alterar o formulário/modal de edição.

O formulário deve:

receber o sport atual;
apresentar a modalidade atual selecionada;
permitir alterar a modalidade quando permitido;
enviar o novo valor para a API.

Não implementar regras de negócio no frontend para decidir quando a alteração é permitida.

O backend continua sendo a autoridade.

9. Tournament Card

Atualizar:

TournamentCard

para apresentar a modalidade.

Exemplo:

Torneio de Domingo

Beach Tennis

8 / 16 participantes

A apresentação deve ser discreta e seguir o Design System atual.

Não transformar o card em uma interface excessivamente carregada.

10. Tournament Detail

Atualizar:

TournamentDetailHeader

para exibir a modalidade.

Exemplo:

Torneio de Domingo

🏖️ Beach Tennis

Organizado por Roberto
8 / 16 participantes

O ícone deve ser determinado pelo sport.

Não utilizar um ícone fixo de tênis para todos os torneios.

11. Dashboard

Atualizar:

dashboard/tournament-list-item.tsx

para exibir a modalidade.

Os torneios recentes devem permitir identificar rapidamente se são:

Tênis
Beach Tennis
Pickleball

Não alterar desnecessariamente a estrutura geral do Dashboard.

12. Histórico

Atualizar:

HistoryCard
HistoryDetailHeader

para apresentar a modalidade.

O usuário deve conseguir identificar a modalidade mesmo ao consultar torneios antigos.

13. Ícones Fixos de Tênis

Revisar os seguintes pontos identificados no diagnóstico:

app/(tabs)/index.tsx
app/statistics/index.tsx
history-detail-header.tsx

Não substituir automaticamente todos os ícones de tênis.

A regra deve ser:

Quando o componente estiver representando um torneio específico:

Usar o ícone da modalidade.

Quando o componente representar uma métrica genérica:

Utilizar um ícone genérico apropriado.

Por exemplo, uma estatística de "Partidas" não precisa necessariamente usar uma bola de tênis.

14. Status Configuration

Foi identificado que a configuração de status está duplicada em vários componentes.

Durante esta Sprint, avaliar a possibilidade de centralizar:

statusConfig
sportConfig

em uma configuração/helper reutilizável.

A centralização deve ser feita somente se estiver alinhada com a arquitetura atual.

Não realizar uma grande refatoração fora do escopo.

Objetivo:

evitar duplicação
evitar inconsistências
facilitar futuras modalidades

evitar duplicação
evitar inconsistências
facilitar futuras modalidades

15. Match Status

Durante a análise foi identificado que o frontend possui:

PENDING
IN_PROGRESS
COMPLETED

enquanto a API utiliza:

PENDING
FINISHED

Essa inconsistência deve ser corrigida nesta Sprint caso ainda exista no código.

O frontend deve refletir exatamente o contrato atual da API.

Não utilizar aliases ou any apenas para esconder o problema.

Adicionar ou ajustar os testes necessários.

16. Regra do Dono

A API possui a regra:

O dono do torneio não pode participar do próprio torneio.

O aplicativo já possui uma lógica para esconder o botão de entrada quando o usuário é o dono.

Essa lógica deve continuar funcionando.

Além disso:

não remover a proteção existente;
não permitir que a nova implementação reintroduza o botão;
tratar corretamente o erro retornado pela API caso aconteça uma tentativa inválida.

A regra de segurança pertence ao backend.

17. React Query

Continuar utilizando React Query para os dados remotos.

Não criar um novo estado global para Tournament.sport.

A modalidade deve fazer parte dos dados retornados pelo React Query.

As mutations existentes devem ser adaptadas para enviar sport.

Após criação ou edição:

invalidar/refazer as queries necessárias;
garantir que a nova modalidade apareça imediatamente nas telas relevantes.

Seguir os padrões já existentes no projeto.

18. Zustand

Não adicionar sport ao Zustand.

A modalidade pertence ao estado remoto do torneio.

Zustand deve continuar reservado para os estados globais já definidos pelo projeto.

19. MVVM

A implementação deve respeitar o MVVM existente.

Model

Responsável por:

TournamentSport
Tournament
CreateTournamentRequest
UpdateTournamentRequest
HistoryItem
HistoryDetail

ViewModel

Responsável por:

preparar dados do formulário;
seleção da modalidade;
criação;
edição;
transformação dos dados para apresentação.
View

Responsável por:

renderização;
interação do usuário;
apresentação visual.

Evitar colocar regras de negócio complexas diretamente nos componentes.

20. Dark Mode

Todas as novas interfaces devem funcionar corretamente em:

Light Mode
Dark Mode

Verificar:

modal de seleção;
badges;
textos;
ícones;
backgrounds;
estados selecionado/não selecionado;
cards;
headers.

Não utilizar cores fixas que prejudiquem acessibilidade ou contraste.

21. Compatibilidade

Não quebrar os fluxos existentes.

Devem continuar funcionando:

Login
Cadastro
Dashboard
Torneios
Criação
Edição
Inscrição
Saída
Participantes
Partidas
Resultados
Estatísticas
Histórico
Perfil
Avatar
Tema

Torneios antigos devem aparecer como:

Tênis

porque a API já realizou o backfill para TENNIS.

22. Rebranding

Não alterar nesta Sprint:

app.json
name
slug
scheme
storage keys
branding global

a menos que seja estritamente necessário para a implementação.

A expansão da marca para multi-esportes será tratada separadamente.

23. Testes

Adicionar ou atualizar testes seguindo o padrão já existente.

Devem existir testes para:

Tipos

Garantir que TournamentSport seja utilizado corretamente.

Criação

Testar:

criação com TENNIS
criação com BEACH_TENNIS
criação com PICKLEBALL
criação sem sport → TENNIS

Edição

Testar alteração da modalidade.

Componentes

Testar a renderização correta da modalidade quando houver testes de componentes no projeto.

Histórico

Testar que sport recebido da API é apresentado corretamente.

Compatibilidade

Garantir que torneios antigos com:

sport: TENNIS

continuem funcionando.

24. Validação Técnica

Após implementação executar:

yarn tsc --noEmit

Caso exista script equivalente no projeto, executar também:

yarn lint

Executar os testes existentes:

yarn test

ou o comando de testes definido no package.json.

Caso existam testes específicos:

yarn test --coverage

utilizando o script real existente no projeto.

25. Critérios de Aceitação

A Sprint será considerada concluída quando:

TournamentSport estiver centralizado;
Tournament possuir sport;
CreateTournamentRequest suportar sport;
UpdateTournamentRequest suportar sport;
HistoryItem suportar sport;
HistoryDetail suportar sport;
existir configuração centralizada das modalidades;
criação permitir selecionar modalidade;
criação enviar modalidade para API;
criação usar TENNIS como padrão;
edição permitir visualizar a modalidade atual;
edição enviar alteração de modalidade;
TournamentCard exibir modalidade;
TournamentDetailHeader exibir modalidade;
Dashboard exibir modalidade;
HistoryCard exibir modalidade;
HistoryDetailHeader exibir modalidade;
ícones respeitarem a modalidade quando houver contexto;
MatchStatus estiver compatível com a API;
regra do owner continuar funcionando;
Light Mode funcionar;
Dark Mode funcionar;
React Query continuar sendo utilizado para dados remotos;
Zustand não seja utilizado desnecessariamente para sport;
arquitetura MVVM seja respeitada;
nenhum fluxo existente seja quebrado;
TypeScript passe sem erros;
lint passe conforme as regras atuais;
testes existentes continuem passando;
novos testes relevantes sejam adicionados. 26. Fora do Escopo

Não implementar nesta Sprint:

regras específicas de Beach Tennis;
regras específicas de Pickleball;
pontuação específica por esporte;
formatos diferentes de chaveamento;
equipes;
ranking por modalidade;
estatísticas específicas por modalidade;
novos endpoints;
alterações no backend;
filtros avançados;
rebranding completo do aplicativo.

Essas funcionalidades poderão ser tratadas em Sprints futuras.

27. Regra Fundamental da Implementação

Antes de criar qualquer código, analisar a implementação atual.

Não substituir arquitetura existente sem necessidade.

Não criar arquivos duplicados.

Não criar soluções paralelas quando já existir uma estrutura adequada.

Não utilizar any para contornar problemas de tipagem.

Não modificar o backend.

Não alterar regras de negócio do servidor.

A implementação deve ser incremental, reutilizável e compatível com a arquitetura atual.

28. Resultado Esperado

Ao final desta Sprint, o aplicativo deverá deixar de parecer exclusivamente um aplicativo de tênis.

O usuário deverá conseguir trabalhar com torneios de:

🎾 Tênis
🏖️ Beach Tennis
🏓 Pickleball

utilizando o mesmo fluxo existente de torneios.

A diferença principal deverá estar na modalidade associada ao torneio e na sua representação visual.

A arquitetura deve ficar preparada para que novas modalidades possam ser adicionadas futuramente sem necessidade de reescrever os principais fluxos da aplicação.
