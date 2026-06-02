## 57. v1.5 Theming

> **Status:** **Specified and implemented.** Decisions **T1–T6** approved (§43). Architecture open questions: **none**.

Flutter `ThemeData` / `MaterialApp(theme: …)` → `ThemeProvider` + `createThemeData()` + `useTheme()`.

### 57.1 Overview

| Piece | Purpose |
| ----- | ------- |
| `ThemeData` | Bundle: `colorScheme`, optional `textTheme`, `buttonTheme`, `inputDecorationTheme` |
| `createThemeData(partial?)` | Library baseline + optional deep-merge |
| `ThemeProvider` | CSS variables on wrapper + Qwik context |
| `useTheme()` | Read merged `ThemeData` (`Theme.of(context)` analogue) |

**Single architecture:** `ThemeProvider` always sets **CSS custom properties** and **context**. No `scope` prop.

### 57.2 `ThemeData`

```ts
interface ThemeData {
  colorScheme: ColorScheme;           // required on complete theme
  textTheme?: TextTheme;
  buttonTheme?: ButtonTheme;
  inputDecorationTheme?: InputDecorationTheme;
}
```

Exported from `_shared/types.ts`. Four top-level groups only in v1.5.

### 57.3 `ColorScheme`

```ts
interface ColorScheme {
  primary: string;
  onPrimary: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
  outline: string;   // required (T2)
}
```

Colors are CSS strings (§0.4). Consumers: `Button`, `Divider`, `TextField`, `Card` borders.

### 57.4 `TextStyle` / `TextTheme`

```ts
interface TextStyle {
  fontFamily?: string;
  fontSize?: Length;
  fontWeight?: FontWeight;
  lineHeight?: number | Length;
  letterSpacing?: Length;
  color?: string;
}

interface TextTheme {
  body?: TextStyle;
  title?: TextStyle;
  label?: TextStyle;
  caption?: TextStyle;
}
```

Reuses `FontWeight` (§1.15). `Text` keeps flat props; `TextTheme` supplies defaults when wired.

### 57.5 `ButtonTheme`

```ts
interface ButtonTheme {
  foregroundColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: BorderRadius;
  padding?: EdgeInsets;
}
```

Flat only — no per-`ButtonVariant` nested objects in v1.5.

### 57.6 `InputDecorationTheme`

```ts
interface InputDecorationTheme {
  labelColor?: string;
  helperColor?: string;
  errorColor?: string;
  placeholderColor?: string;
  outlineColor?: string;
  focusOutlineColor?: string;
  borderRadius?: BorderRadius;
  padding?: EdgeInsets;
  requiredIndicatorColor?: string;
}
```

### 57.7 `createThemeData`

```ts
function createThemeData(partial?: Partial<ThemeData>): ThemeData;
```

- Returns complete `ThemeData` with default `colorScheme` including `outline`.
- Pure — no `window` / `document` / `matchMedia`.
- No `ThemeData.light()` / `.dark()` until `ThemeMode` ships.

### 57.8 `ThemeProvider`

```ts
interface ThemeProviderProps extends BaseProps {
  theme: Partial<ThemeData>;   // required — use theme={{}} for no overrides
  inherit?: boolean;           // default true
  as?: ContainerTag;           // default "div" (T3)
}
```

| Prop | Required | Default | Behavior |
| ---- | -------- | ------- | -------- |
| `theme` | **Yes** | — | Partial overrides; `{}` is valid |
| `inherit` | No | `true` | Deep-merge over ancestor; `false` → baseline `createThemeData()` |
| `as` | No | `"div"` | Reuses `ContainerTag` |

**Empty theme:**

```tsx
<ThemeProvider inherit={false} theme={{}}>
```

Resolves to `createThemeData()`.

**Merge (T1):** field-level deep merge for `colorScheme`, `textTheme` (per key + per `TextStyle` field), `buttonTheme`, `inputDecorationTheme`.

### 57.9 CSS variables (T6)

| `ColorScheme` | CSS variable |
| ------------- | ------------ |
| `primary` | `--qfu-color-primary` |
| `onPrimary` | `--qfu-color-on-primary` |
| `surface` | `--qfu-color-surface` |
| `onSurface` | `--qfu-color-on-surface` |
| `error` | `--qfu-color-error` |
| `onError` | `--qfu-color-on-error` |
| `outline` | `--qfu-color-outline` |

Pattern: `--qfu-<category>-<token>`. Widget CSS modules use `var(--qfu-color-primary, #1976d2)` fallbacks when no provider.

### 57.10 `useTheme()`

```ts
function useTheme(): ThemeData;
```

| Context | Behavior |
| ------- | -------- |
| Inside `ThemeProvider` | Merged `ThemeData` |
| Outside provider (dev) | `createThemeData()` + **one** console warning |
| Outside provider (prod) | `createThemeData()` — no throw |

**Fallback scope:** programmatic `ThemeData` only. **CSS variables are not injected** without `<ThemeProvider>`. Themed widget styling requires an ancestor provider.

Cross-ref: §27 **M6** (`useMediaQuery` outside provider).

### 57.11 Shared types review (v1.5)

| Type | Decision |
| ---- | -------- |
| `ThemeData`, `ColorScheme`, `TextStyle`, `TextTheme` | **Ship** |
| `ButtonTheme`, `InputDecorationTheme` | **Ship** |
| `FocusTheme`, `ShapeTheme`, `FormTheme` | **Defer** |
| `ThemeData.tokens` | **Reject** |

### 57.12 Shared enums review (v1.5)

| Enum | Decision |
| ---- | -------- |
| `FontWeight` | **Ship** (existing §1.15) |
| `ThemeMode`, `Brightness` | **Defer** |

### 57.13 Accessibility

- Target WCAG 2.1 AA for bundled `createThemeData()` defaults on `on*` pairs.
- `outline` for borders/separators — not primary text.
- Focus rings remain in widget CSS modules (`:focus-visible`); no `FocusTheme` in v1.5.

### 57.14 SSR and resumability

- `ThemeProvider` renders wrapper `style` with CSS vars from merged theme on the server.
- Nested providers scope variables on their wrapper (DOM cascade).
- `useTheme()` without provider: same `createThemeData()` server/client.

### 57.15 Flutter parity — intentional differences

| Flutter | qwik-flutter-ui |
| ------- | ----------------- |
| `Theme.of(context)` | `useTheme()` |
| Large `ThemeData` | Four top-level groups |
| `ThemeMode` / `darkTheme` | Deferred |
| `Color` class | CSS strings |

### 57.16 Future roadmap

- `ThemeMode` + dark mode
- Material 3 color roles
- `ShapeTheme`, `FocusTheme`, per-variant `ButtonTheme`
- `--qfu-typography-*`, `--qfu-spacing-*`
- Typed design-token registry (not `Record<string, unknown>`)

### 57.17 Folder structure

```
src/lib/theme/
  create-theme-data.ts
  merge.ts
  css-vars.ts
  context.ts
  use-theme.ts
  theme-provider.tsx
  types.ts
  defaults.ts
  index.ts
```

---
