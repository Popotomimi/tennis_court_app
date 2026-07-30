# Tennis Court App

Mobile app for managing tennis tournaments, matches, and player statistics. Built with Expo and React Native.

## Features

- **Authentication** — Register, login, and token-based auth with auto-logout on 401
- **Dashboard** — Overview of recent tournaments and personal statistics
- **Tournaments** — Create, edit, delete, and start tournaments with participant management
- **Matches** — View and update match results within tournaments
- **History** — Browse past tournaments and matches
- **Statistics** — Personal performance stats and historical data
- **Profile** — Avatar upload, name/password update, dark mode toggle
- **Dark Mode** — Full dark theme with system-independent manual toggle (persisted)

## Tech Stack

- **Framework** — Expo SDK 57 + React Native 0.86
- **Navigation** — Expo Router v3 (file-based routing)
- **Styling** — NativeWind v4 (Tailwind CSS for React Native)
- **Backend** — REST API (default: `localhost:3000/api`)
- **HTTP Client** — Axios with interceptors for auth tokens
- **State Management** — Zustand for auth and theme
- **Forms** — React Hook Form + Zod validation
- **Data Fetching** — TanStack React Query
- **Storage** — AsyncStorage for auth token and theme preference
- **UI** — Ionicons, gesture handler, bottom sheets, toast notifications

## Project Structure

```
├── app/                  # Expo Router pages (file-based routing)
│   ├── (auth)/           # Login, register, splash
│   ├── (tabs)/           # Dashboard, tournaments, history, profile
│   ├── history/          # History detail screens
│   ├── matches/          # Match detail screens
│   ├── statistics/       # Statistics screens
│   └── tournaments/      # Tournament detail screens
├── components/           # Shared UI components
├── constants/            # API endpoints, storage keys
├── features/             # Feature modules
│   ├── auth/             # Auth feature (viewmodels, components)
│   ├── dashboard/        # Dashboard feature
│   ├── history/          # History feature
│   ├── matches/          # Matches feature
│   ├── participants/     # Participants feature
│   ├── profile/          # Profile feature
│   ├── statistics/       # Statistics feature
│   └── tournaments/      # Tournaments feature
├── providers/            # App-wide providers (query, theme)
├── services/             # API client, storage wrapper
└── stores/               # Zustand stores (auth, theme)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS emulator or physical device with Expo Go

### Install

```bash
npm install
```

### Run

```bash
npm start
```

Press `a` for Android, `i` for iOS, or `w` for web.

### Lint / Type Check

```bash
npm run lint
```

## Configuration

Set the API base URL in `constants/api.ts`. Defaults:

| Platform | URL                       |
| -------- | ------------------------- |
| Android  | `http://10.0.2.2:3000/api` |
| iOS      | `http://localhost:3000/api` |
| Web      | `http://localhost:3000/api` |

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `refactor:` code change without feature/fix
- `chore:` build, deps, tooling
