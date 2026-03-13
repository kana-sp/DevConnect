# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start                  # Start Metro bundler
npm run android            # Build & run on Android emulator/device
npm run ios                # Build & run on iOS simulator/device
npm run studio             # Open Android Studio
npm run xcode              # Open Xcode

# Quality
npm run lint               # ESLint
npm test                   # Jest (react-native preset)

# iOS native modules (after adding/changing native deps)
cd ios && pod install
```

## Architecture Overview

### Boot sequence
`index.js` → `boot/index.tsx` → `boot/setup.store.tsx` (class component, root providers) → `app/routes/index.tsx`

Root providers (in order): `SafeAreaProvider` → `GestureHandlerRootView` → lazy-loaded `Routes`.

`boot/middleware.ts` initialises the MMKV storage adapter and `QueryClient` — import these singletons wherever needed.

### Navigation
Two-level navigator:
1. **Root native-stack** (`app/routes/index.tsx`): `Tabs`, `Login`, `Register`
2. **Bottom tabs** (`app/routes/AppTab.tsx`): `Home`, `Login` (sign-in gate), `Profile`

Uses `@react-navigation/native-stack` + `createNativeBottomTabNavigator` (unstable). Screen type definitions live in `app/interfaces/route.interface.tsx`.

### State & data
- **Zustand** stores go in `app/stores/` (only stub `auth.store.ts` exists today)
- **React Query** + MMKV persister — query/mutation files go in `app/query/`
- **Firebase** service references go in `app/services/firebase.service.ts`
- Firebase credentials must be populated in `environments/environment.tsx`; native config files (`google-services.json`, `GoogleService-Info.plist`) must be added before building

### Styling system
- `app/modules/colors.tsx` — full colour palette; `PRIMARY` is `#1d3351`, `PRIMARY_TAB` is `#002343`
- `app/modules/layout.tsx` — spacing, font sizes (H1–H7), shadow helpers, viewport dims
- `app/modules/index.tsx` — re-exports both as default `modules` object (use this everywhere)
- `app/_styles/index.tsx` — 200+ shared `StyleSheet` classes (layout, cards, modals, shadows); import as `styles` and compose with screen-level sheets

### Path aliases (configured in both `tsconfig.json` and `babel.config.js`)
| Alias | Resolves to |
|---|---|
| `@styles` | `./app/_styles` |
| `@customs` | `./customs` |
| `@environments` | `./environments` |
| `@images` | `./assets/images` |
| `@boot` | `./boot` |

### Screen pattern
Each screen follows: `ScreenContainer.tsx` (logic/data) → `Screen/index.tsx` (JSX) + `Screen/Styles.tsx` (local styles).

### Components
47 reusable components in `app/components/`. Notable:
- `PressableScale` — pressable with scale animation (platform variants)
- `FastImageFire` — Firebase Storage image with caching
- `SlideModal`, `DateModal`, `ModalWheelPicker` — bottom-sheet modals
- `HeaderAnimated` — collapsible animated header
- `PlaceholderLoading` — skeleton shimmer
- `LiquidGlassBackground` — blurred glass effect

### Fonts
Custom font configurations are in `customs/customFont.tsx`. Supported families: OpenSans, GoogleSans, Georgia, SFProText, and Khmer fonts (Hanuman, KohSantepheap, Moul, Battambang).
