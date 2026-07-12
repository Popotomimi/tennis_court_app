# Componentes

## Objetivo

Este documento lista todos os componentes reutilizáveis da aplicação.

Antes de criar um novo componente, verificar se já existe outro que possa ser reutilizado.

---

# Botões

PrimaryButton

Botão principal.

---

SecondaryButton

Botão secundário.

---

OutlineButton

Botão com borda.

---

DangerButton

Botão para ações destrutivas.

---

# Inputs

TextInput

EmailInput

PasswordInput

SearchInput

TextArea

---

# Avatar

ProfileAvatar

Responsável por exibir a foto do usuário.

Suporta imagem padrão caso não exista avatar.

---

# Cards

TournamentCard

HistoryCard

StatisticCard

ParticipantCard

MatchCard

---

# Layout

ScreenContainer

PageHeader

SectionTitle

Divider

SafeArea

---

# Feedback

Loading

LoadingOverlay

Skeleton

EmptyState

ErrorState

---

# Toast

ToastSuccess

ToastError

ToastWarning

ToastInfo

---

# Modal

ConfirmationModal

AlertModal

BottomSheetModal

---

# Lista

InfiniteList

Pagination

PullToRefresh

---

# Outros

Badge

Chip

Tag

StatusIndicator

---

# Organização

Todos os componentes deverão ficar em:

components/

Caso sejam exclusivos de uma Feature

features/

nome-da-feature/

components/

---

# Regras

Componentes devem ser pequenos.

Componentes devem ser reutilizáveis.

Evitar lógica de negócio.

Receber dados via Props.

Nunca acessar a API diretamente.
