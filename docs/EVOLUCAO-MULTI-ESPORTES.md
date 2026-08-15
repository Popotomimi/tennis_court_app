EVOLUÇÃO MULTI-ESPORTES — TENNIS COURT APP

1. Objetivo

Evoluir o aplicativo tennis_court_app de uma aplicação focada exclusivamente em tênis para uma plataforma capaz de trabalhar com múltiplas modalidades esportivas.

Nesta primeira etapa serão adicionadas:

Tênis (TENNIS)
Beach Tennis (BEACH_TENNIS)
Pickleball (PICKLEBALL)

A arquitetura deve continuar preparada para futuras modalidades sem necessidade de grandes alterações estruturais.

2. Princípio da Evolução

A modalidade esportiva deve ser tratada como uma propriedade do torneio.

Não devemos criar uma aplicação diferente para cada esporte.

O mesmo fluxo de:

criação de torneio;
edição;
inscrição;
participantes;
confrontos;
resultados;
histórico;
estatísticas;

deve continuar sendo reutilizado independentemente da modalidade.

A modalidade deve influenciar principalmente:

identificação visual;
informações apresentadas ao usuário;
ícones;
labels;
seleção durante criação/edição;
filtros ou agrupamentos futuros. 3. Modalidades Suportadas

O aplicativo deverá reconhecer exatamente os seguintes valores:
EVOLUÇÃO MULTI-ESPORTES — TENNIS COURT APP

1. Objetivo

Evoluir o aplicativo tennis_court_app de uma aplicação focada exclusivamente em tênis para uma plataforma capaz de trabalhar com múltiplas modalidades esportivas.

Nesta primeira etapa serão adicionadas:

Tênis (TENNIS)
Beach Tennis (BEACH_TENNIS)
Pickleball (PICKLEBALL)

A arquitetura deve continuar preparada para futuras modalidades sem necessidade de grandes alterações estruturais.

2. Princípio da Evolução

A modalidade esportiva deve ser tratada como uma propriedade do torneio.

Não devemos criar uma aplicação diferente para cada esporte.

O mesmo fluxo de:

criação de torneio;
edição;
inscrição;
participantes;
confrontos;
resultados;
histórico;
estatísticas;

deve continuar sendo reutilizado independentemente da modalidade.

A modalidade deve influenciar principalmente:

identificação visual;
informações apresentadas ao usuário;
ícones;
labels;
seleção durante criação/edição;
filtros ou agrupamentos futuros. 3. Modalidades Suportadas

O aplicativo deverá reconhecer exatamente os seguintes valores:
TENNIS
BEACH_TENNIS
PICKLEBALL

Esses valores devem ser compatíveis exatamente com o enum utilizado pela API.

Labels para apresentação

TENNIS → Tênis
BEACH_TENNIS → Beach Tennis
PICKLEBALL → Pickleball

Os valores internos devem permanecer em inglês/uppercase para manter compatibilidade com a API.

Os labels exibidos ao usuário devem estar em português.

4. Integração com a API

A API já possui suporte para a propriedade:

sport

Nos torneios.

O aplicativo deve consumir essa propriedade nos responses e enviá-la nos requests necessários.

Criação

O request de criação deve aceitar:

sport: 'TENNIS' | 'BEACH_TENNIS' | 'PICKLEBALL'

Quando apropriado, o frontend poderá utilizar TENNIS como valor inicial padrão para manter compatibilidade com o comportamento anterior.

Edição

O request de edição também deve aceitar sport.

A interface deverá permitir ao usuário alterar a modalidade apenas quando isso for permitido pelas regras atuais do torneio/API.

O frontend não deve criar regras de negócio que deveriam pertencer ao backend.

5. Tipagem

O aplicativo deve possuir uma definição centralizada para modalidade.

Exemplo conceitual:

export type TournamentSport =
| 'TENNIS'
| 'BEACH_TENNIS'
| 'PICKLEBALL';

A definição deve ser reutilizada em:

Tournament;
CreateTournamentRequest;
UpdateTournamentRequest;
histórico;
componentes;
ViewModels;
helpers;
configurações visuais.

Não devemos espalhar strings literais de modalidades pelo projeto.

6. Configuração Visual das Modalidades

A aplicação deve possuir uma configuração centralizada para cada modalidade.

Exemplo conceitual:

type SportConfig = {
label: string;
icon: string;
};

A configuração deve permitir futuramente adicionar:

ícone;
label;
cores;
descrição;
outros elementos visuais.

Exemplo conceitual:

TENNIS
label: Tênis
icon: ...

BEACH_TENNIS
label: Beach Tennis
icon: ...

PICKLEBALL
label: Pickleball
icon: ...

A implementação visual deve respeitar o Design System já existente no aplicativo.

Não criar estilos isolados e conflitantes apenas para a funcionalidade multi-esportes.

7. Telas Impactadas

A evolução deverá contemplar, no mínimo:

Criação de torneio

Adicionar seleção da modalidade.

O usuário deverá conseguir escolher entre:

Tênis;
Beach Tennis;
Pickleball.

O formulário deve enviar o valor correto para a API.

Edição de torneio

Adicionar seleção da modalidade.

O valor atual deve aparecer selecionado ao abrir o formulário.

Lista de torneios

Cada torneio deve apresentar visualmente sua modalidade.

Exemplo:

🏆 Torneio de Domingo
Beach Tennis

Detalhes do torneio

O detalhe deve apresentar claramente a modalidade do torneio.

Dashboard

Os torneios recentes devem apresentar a modalidade.

Histórico

A modalidade deve aparecer nos cards de histórico.

Detalhes do histórico

A modalidade também deve ser apresentada no detalhe do torneio finalizado.

8. Ícones

O aplicativo atualmente possui alguns ícones relacionados especificamente ao tênis.

Com a introdução de múltiplos esportes, componentes genéricos não devem assumir que todo torneio é de tênis.

Quando o contexto for um torneio específico, o ícone deve ser determinado pelo sport.

Quando não houver contexto de modalidade, deve ser utilizado um ícone genérico.

Não utilizar tennisball-outline como representação universal de todos os esportes.

9. Componentes Reutilizáveis

A funcionalidade deve evitar duplicação.

Sempre que possível, criar componentes/helpers reutilizáveis para:

badge da modalidade;
label da modalidade;
ícone da modalidade;
configuração da modalidade.

Esses elementos devem poder ser utilizados em:

TournamentCard;
TournamentDetailHeader;
TournamentListItem;
HistoryCard;
HistoryDetailHeader;
formulários;
demais componentes que precisarem apresentar a modalidade. 10. MVVM

A implementação deve respeitar a arquitetura MVVM existente.

Model

Responsável pelos tipos e estruturas de dados.

Exemplos:

TournamentSport
Tournament
CreateTournamentRequest
UpdateTournamentRequest
HistoryItem
HistoryDetail

ViewModel

Responsável pela lógica necessária para:

seleção da modalidade;
criação;
edição;
carregamento;
transformação de dados para apresentação.
View

Responsável apenas pela interface.

A View não deve conter regras complexas relacionadas à modalidade.

11. React Query

O React Query deve continuar sendo utilizado para:

busca de torneios;
detalhes;
histórico;
mutations de criação;
mutations de edição.

Não duplicar dados provenientes da API no Zustand sem necessidade.

O React Query continua sendo a fonte de verdade dos dados remotos.

12. Zustand

O Zustand não deve ser utilizado para armazenar a lista de torneios ou outros dados remotos apenas porque existe suporte a estado global.

Ele deve continuar sendo utilizado somente para estado global apropriado ao aplicativo, como:

autenticação;
tema;
preferências;
estados persistentes já existentes.

Estado temporário de formulário deve permanecer no próprio formulário/ViewModel.

13. Compatibilidade

A evolução não deve quebrar funcionalidades existentes.

Um torneio retornado pela API com:

sport = TENNIS

deve continuar funcionando exatamente como anteriormente.

O aplicativo deve continuar funcionando para:

login;
cadastro;
dashboard;
criação;
edição;
inscrição;
saída;
participantes;
partidas;
resultados;
estatísticas;
histórico;
perfil;
upload de avatar;
tema claro/escuro. 14. Regra do Dono do Torneio

A API possui uma regra importante:

O dono do torneio não pode participar do próprio torneio.

O aplicativo já possui lógica visual para esconder o botão de entrada quando o usuário é o dono.

Essa regra deve permanecer.

O frontend pode melhorar a experiência visual, mas a segurança/regra definitiva permanece no backend.

Caso a API retorne erro informando que o proprietário não pode participar, o aplicativo deve apresentar a mensagem adequadamente ao usuário.

15. Tema Claro e Escuro

A funcionalidade multi-esportes deve funcionar corretamente nos dois temas existentes:

Light Mode;
Dark Mode.

Não utilizar cores fixas que prejudiquem a leitura em um dos temas.

Ícones, badges, textos e backgrounds devem utilizar o sistema de tema já existente sempre que possível.

16. Rebranding

O projeto originalmente possui identidade visual relacionada a tênis.

Com a expansão para múltiplos esportes, deve-se evitar criar novas dependências da palavra "Tennis" em componentes genéricos.

Exemplos que podem ser avaliados futuramente:

Tennis Court

poderá evoluir para uma identidade mais abrangente.

Entretanto, renomear:

app.json;
slug;
scheme;
storage keys;
package;
branding;

não faz parte obrigatoriamente desta Sprint.

Essa decisão deve ser tratada separadamente para evitar problemas de compatibilidade.

17. Dados Legados

Torneios antigos retornados pela API possuem:

sport = TENNIS

O aplicativo deve tratar esses torneios normalmente.

Não deve existir nenhuma migração de dados no frontend.

O frontend apenas consome o valor fornecido pela API.

18. Futuras Modalidades

A arquitetura deve permitir adicionar posteriormente modalidades como:

BASKETBALL
SOCCER
TABLE_TENNIS
VOLLEYBALL

sem precisar alterar todos os componentes existentes.

Para adicionar uma nova modalidade no futuro, idealmente será necessário apenas:

adicionar o valor ao tipo;
adicionar sua configuração;
adicionar o label;
adicionar seu ícone;
adaptar eventuais regras específicas do esporte. 19. Fora do Escopo Atual

Não implementar nesta evolução:

regras específicas de pontuação de Beach Tennis;
regras específicas de pontuação de Pickleball;
regras específicas de basquete;
regras específicas de futebol;
formatos diferentes de chaveamento;
times/equipes;
posições de jogadores;
regras específicas de cada esporte;
ranking específico por modalidade;
filtros avançados por esporte;
estatísticas específicas por esporte.

A Sprint atual trata modalidade como uma propriedade do torneio e prepara o aplicativo para a expansão futura.

20. Critérios de Aceitação

A evolução será considerada concluída quando:

Tournament possuir sport;
requests de criação e edição suportarem sport;
histórico possuir sport;
existir tipo centralizado para modalidades;
existir configuração centralizada das modalidades;
usuário puder selecionar modalidade ao criar torneio;
usuário puder visualizar modalidade ao editar torneio;
cards de torneio exibirem modalidade;
detalhe do torneio exibir modalidade;
dashboard exibir modalidade;
histórico exibir modalidade;
ícones não forem fixos exclusivamente em tênis quando houver contexto de modalidade;
Light Mode continuar funcionando;
Dark Mode continuar funcionando;
regra do dono do torneio continuar respeitada;
nenhum fluxo existente for quebrado;
TypeScript continuar sem erros;
lint continuar funcionando conforme as regras existentes;
testes existentes continuarem passando;
novos testes necessários forem adicionados;
nenhuma regra específica de esporte seja implementada prematuramente. 21. Princípio Fundamental

O objetivo desta evolução não é transformar o aplicativo em três aplicativos diferentes.

O objetivo é criar uma única plataforma de torneios capaz de representar diferentes modalidades através de uma arquitetura extensível.

Um torneio possui uma modalidade.

O restante da aplicação deve reutilizar o máximo possível da infraestrutura existente.
