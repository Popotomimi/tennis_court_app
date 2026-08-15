# Modelagem Multi-Esportes — Aplicativo Mobile

## 1. Objetivo

O aplicativo atualmente foi desenvolvido inicialmente para torneios de tênis de quadra.

A evolução do produto permitirá trabalhar com múltiplas modalidades esportivas dentro da mesma estrutura de torneios.

Nesta primeira evolução serão suportadas:

- TENNIS
- BEACH_TENNIS
- PICKLEBALL

A arquitetura deve ser preparada para permitir a inclusão de novas modalidades no futuro sem necessidade de criar uma arquitetura diferente para cada esporte.

---

# 2. Princípio arquitetural

O aplicativo NÃO deve criar estruturas separadas para cada modalidade.

Não criar:

- TennisTournament
- BeachTennisTournament
- PickleballTournament
- TennisMatch
- BeachTennisMatch
- PickleballMatch

O modelo deve continuar genérico.

A modalidade será uma propriedade do torneio:

```ts
sport: TournamentSport;
```
