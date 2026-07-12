# Design System

## Objetivo

Este documento define todos os padrões visuais do aplicativo.

Todo componente desenvolvido deverá seguir este documento.

O objetivo é manter consistência visual, reutilização de componentes e facilidade de manutenção.

---

# Princípios

- Interface simples.
- Design limpo.
- Componentes reutilizáveis.
- Consistência visual.
- Acessibilidade.
- Boa experiência do usuário.

---

# Componentes Base

Todos os componentes deverão ser reutilizáveis.

Exemplo

- Button
- Input
- PasswordInput
- Avatar
- Card
- Badge
- Chip
- Divider
- Header
- Modal
- BottomSheet
- Toast
- Loading
- Skeleton
- EmptyState

Nunca criar componentes duplicados.

---

# Botões

Tipos

- Primary
- Secondary
- Outline
- Ghost
- Danger

Estados

- Normal
- Pressed
- Disabled
- Loading

---

# Inputs

Tipos

- Text
- Email
- Password
- Search

Estados

- Normal
- Focus
- Error
- Disabled

Todos deverão suportar React Hook Form.

---

# Cards

Serão utilizados para:

- Torneios
- Estatísticas
- Histórico
- Participantes

Todos devem possuir o mesmo padrão de bordas e espaçamentos.

---

# Feedback Visual

Toda ação deverá possuir feedback.

Exemplos

Loading

Skeleton

Toast

Error

Empty State

Success

Nenhuma ação poderá acontecer "silenciosamente".

---

# Espaçamentos

Utilizar múltiplos de 4.

Exemplo

4

8

12

16

20

24

32

40

48

64

---

# Bordas

Utilizar radius padronizado.

Pequeno

8

Médio

12

Grande

16

---

# Ícones

Utilizar exclusivamente:

@expo/vector-icons

Não misturar bibliotecas de ícones.

---

# Animações

Utilizar:

React Native Reanimated

As animações deverão ser leves.

Evitar animações exageradas.

---

# Bottom Sheet

Utilizar:

@gorhom/bottom-sheet

Sempre que fizer sentido para ações rápidas.

---

# Toast

Utilizar:

toastify-react-native

Toda ação importante deverá apresentar um feedback ao usuário.

---

# Responsividade

O aplicativo deverá funcionar corretamente em:

Android

iOS

Diferentes tamanhos de tela.

---

# Acessibilidade

Sempre utilizar:

accessibilityLabel

accessibilityRole

Contraste adequado.

Área mínima de toque.
