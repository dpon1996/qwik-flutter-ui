# qwik-flutter-ui

A Flutter-inspired UI component library for [Qwik](https://qwik.dev/). Widget names, props, and enums follow Flutter conventions so the API feels familiar, while output stays semantic HTML and Qwik-resumable.

## Install

```bash
npm install qwik-flutter-ui @builder.io/qwik
```

Peer dependency: `@builder.io/qwik` >= 1.20.0

## Quick start

Wrap your app in `ThemeProvider` and compose widgets like you would in Flutter:

```tsx
import { component$ } from "@builder.io/qwik";
import {
  ThemeProvider,
  Column,
  Text,
  Button,
  ButtonVariant,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Column gap={16} padding={24}>
      <Text as="h1">Hello, qwik-flutter-ui</Text>
      <Button variant={ButtonVariant.filled}>Get started</Button>
    </Column>
  </ThemeProvider>
));
```

For overlays (dialogs, snack bars, tooltips, etc.), mount an `OverlayContainer` once near the root of your app.

## Components

### Layout

| Widget | Flutter equivalent |
| --- | --- |
| `Row`, `Column` | `Row`, `Column` |
| `Container`, `SizedBox`, `Spacer` | `Container`, `SizedBox`, `Spacer` |
| `Expanded`, `Flexible` | `Expanded`, `Flexible` |
| `Center`, `Align`, `AspectRatio` | `Center`, `Align`, `AspectRatio` |
| `Wrap`, `Stack`, `Positioned` | `Wrap`, `Stack`, `Positioned` |
| `SingleChildScrollView`, `ListView`, `GridView` | Same |
| `MediaQuery` | `MediaQuery` |

### Display

| Widget | Flutter equivalent |
| --- | --- |
| `Text`, `Card`, `Divider`, `Image`, `Visibility` | Same |

### Input & forms

| Widget | Flutter equivalent |
| --- | --- |
| `Button` | `FilledButton` / `OutlinedButton` / `TextButton` |
| `TextField`, `TextFormField`, `Form` | Same |
| `Checkbox`, `CheckboxFormField` | Same |
| `Radio`, `RadioGroup`, `RadioGroupFormField` | Same |
| `Switch`, `Dropdown`, `DropdownFormField` | Same |

### Overlays

| Widget | Flutter equivalent |
| --- | --- |
| `OverlayContainer` | Overlay host |
| `Dialog`, `AlertDialog` | Same |
| `ModalBottomSheet`, `SnackBar` | Same |
| `Tooltip`, `Popover`, `Menu` | Same |

### App structure

| Widget | Flutter equivalent |
| --- | --- |
| `AppShell` | `Scaffold` |
| `AppBar` | `AppBar` |
| `Drawer` | `Drawer` |
| `SideSheet` | Companion panel |

Shared enums and types (`MainAxisAlignment`, `CrossAxisAlignment`, `EdgeInsets`, `ButtonVariant`, etc.) are exported from the package entry point.

## Playground

This repo includes a Qwik City playground at `src/routes/index.tsx` that demos every widget. Run it locally:

```bash
npm install
npm start        # dev server with SSR
npm run preview  # production preview
```

## Library build

Build the publishable library (ESM + CJS + types):

```bash
npm run build
```

Output lands in `lib/` and `lib-types/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start playground dev server |
| `npm run dev` | Dev server without auto-open |
| `npm run build` | Build library + type declarations |
| `npm run build.playground` | Build playground app |
| `npm test` | Run Vitest unit tests |
| `npm run lint` | ESLint |
| `npm run fmt` | Prettier write |
| `npm run release` | Publish via `np` |

## Project structure

```
├── src/
│   ├── lib/           # Public widgets (layout, forms, overlays, theme)
│   ├── components/    # App-structure widgets (AppShell, AppBar, Drawer, …)
│   ├── routes/        # Playground pages
│   └── index.ts       # Public package entry (semver surface)
├── docs/
│   └── API_DESIGN.md  # Full API specification
├── tests/             # Vitest component tests
└── lib/               # Built library output (after `npm run build`)
```

## API design

The full public API is documented in [`docs/API_DESIGN.md`](docs/API_DESIGN.md). Design goals include Flutter-first naming, semantic HTML, accessibility by default, SSR-friendly markup, and minimal client-side overhead.

## License

MIT — see [LICENSE](LICENSE).
