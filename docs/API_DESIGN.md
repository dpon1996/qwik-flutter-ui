# qwik-flutter-ui — Public API Design

> **Status:** v1 layout + typography finalized. **v1.1** (§15–§21) specified — resolve open questions in §22 before implementation. **v1.2** scrolling (§26.2) and future forms/theming (§26.3–§26.4) are roadmap-level only.
> **Goal:** A Flutter-inspired UI framework for Qwik. The API should feel as close to Flutter as possible while remaining idiomatic JSX.

---

## Design Principles

Every API decision in this document is justified against these ten principles. When two principles conflict, the higher-numbered one yields.

1. **Flutter-first developer experience.** Component names, prop names, enum names, and defaults match Flutter wherever it doesn't fight the web. A Flutter dev should be able to read this API and start writing code without docs.
2. **Semantic HTML output.** Layout widgets render meaningful tags (`<div>` for layout boxes, `<span>` or appropriate heading for `Text`, etc.) and never lean on `<div>` for everything. Where a single default isn't right, an `as` escape hatch is provided.
3. **Accessibility by default.** ARIA passthrough is built into `BaseProps`. `Text` is selectable by default. Focusable/interactive primitives (post-v1) will inherit keyboard handling. Nothing the library does silently breaks a screen reader.
4. **SSR friendly.** Every widget renders to static markup with no client JS needed for the initial paint. Hydration is opt-in and minimal.
5. **Qwik resumability first.** No widget runs eager client-side code. Hooks live behind `useTask$`/`useVisibleTask$` only where unavoidable. No global state, no module-level side effects.
6. **Strong TypeScript support.** Every prop is typed. Enums are exported with companion types. No `any`. No `string` where an enum exists. No `unknown` leaking into public surface.
7. **Minimal runtime overhead.** Widgets compile to plain CSS classes and inline styles. No CSS-in-JS runtime. No theme provider context. Const-object enums tree-shake cleanly.
8. **Production-ready API design.** Public surface is intentional — what we ship in v1 is what we'll maintain. Breaking changes after v1 follow semver.
9. **Responsive design support.** Length values accept strings (`"50%"`, `"clamp(...)"`, `var(--w)`), enabling fluid layouts via CSS. v1 ships no breakpoint system; users compose with their own CSS. A breakpoint-aware prop shape is reserved for v2.
10. **Consistent widget behavior.** Same prop name = same meaning across widgets. Same defaults across analogous widgets. Same overflow, sizing, and naming conventions everywhere unless Flutter explicitly differs.

---

## Table of contents

- §0 — Cross-cutting conventions
- §1 — Shared enums
- §2 — Shared types
- §3 — `Row`
- §4 — `Column`
- §5 — `Container`
- §6 — `SizedBox`
- §7 — `Spacer`
- §8 — `Expanded`
- §9 — `Flexible`
- §10 — `Center`
- §11 — `Wrap`
- §12 — `Stack`
- §13 — `Positioned`
- §14 — `Text`
- §15 — `Card`
- §16 — `Divider`
- §17 — `Button`
- §18 — `Image`
- §19 — `Visibility`
- §20 — `Align`
- §21 — `AspectRatio`
- §22 — Open questions (approval required)
- §23 — API consistency review
- §24 — Summary table
- §25 — Decisions log
- §26 — Roadmap (incl. version summary, scrolling, forms, theming)
- §27 — Final implementation checklist

---

## 0. Cross-cutting conventions

These apply to **every** widget. Defining them once keeps each widget API small.

### 0.1 Children

We use **JSX nesting (slots)**, not a `child` / `children` prop.

```tsx
<Center>
  <Text>hello</Text>
</Center>
```

For "single-child" widgets (`Center`, `Expanded`, `Flexible`, `Container`, `Positioned`, `SizedBox`), we accept any number of slotted children and let the user wrap. Flutter's "one child" rule is documented as a convention, not enforced.

### 0.2 Length values

```ts
export type Length = number | string;
// number  -> treated as `px`
// string  -> passed through ("1rem", "50%", "100vh", "auto", "clamp(...)")
```

Numbers are interpreted as px.
Strings are passed directly to CSS.

Used by: `width`, `height`, `padding`, `margin`, `gap`, `top`, `left`, `borderRadius`, etc. String values enable responsive sizing without a separate breakpoint API (Principle #9).

### 0.3 EdgeInsets

Union type — no helper class, no imports needed.

```ts
export type EdgeInsets =
  | Length                                          // all sides
  | [Length, Length]                                // [vertical, horizontal]
  | [Length, Length, Length, Length]                // [top, right, bottom, left]
  | { top?: Length; right?: Length; bottom?: Length; left?: Length;
      x?: Length; y?: Length };                     // x = left+right, y = top+bottom
```

Examples:

```tsx
<Container padding={16} />
<Container padding={[8, 16]} />
<Container padding={{ x: 16, top: 8 }} />
```

### 0.4 Colors

CSS color strings (`"#fff"`, `"rgb(...)"`, `"var(--accent)"`). No `Color` class.

### 0.5 Alignment

See `Alignment` enum in §1.9, including the full CSS mapping table.

### 0.6 Shared base props

Every widget extends `BaseProps` (§2). It includes:

- `class` / `style` — merged with internal classes/styles (user wins).
- `id` — passthrough.
- `role` — accessibility role (Principle #3).
- Open `aria-*` index — any ARIA attribute (`aria-label`, `aria-hidden`, etc.).
- Open `data-*` index — any data attribute (including `data-testid`).

We do **not** spread `...rest` onto the DOM beyond the above; arbitrary unknown props are rejected by TypeScript. This keeps the API tight while still allowing accessibility and test instrumentation.

### 0.7 Interactive widgets (v1.1+)

Layout widgets (§3–§14) stay **non-interactive** — no `onClick$` (see §23.6). **`Button`** (§17) is the first widget that accepts Qwik event handlers.

Conventions for all interactive widgets:

- Handlers use Qwik's `on*Event$` naming (`onClick$`, `onKeyDown$`, …).
- Prefer native elements (`<button>`, `<a>`) over `<div onClick$>`.
- `disabled` maps to the native `disabled` attribute (buttons) or `aria-disabled` + `pointer-events: none` where native disable doesn't exist.
- Focus ring styles live in the widget's CSS module (`:focus-visible`), not removed by default.

### 0.8 Naming

- Components: `PascalCase` (matches Flutter).
- Props: `camelCase` (matches Flutter + JS).
- Enums: `PascalCase` type name + `PascalCase` import; member keys are `camelCase` (e.g. `MainAxisAlignment.spaceBetween`) to match Flutter style.
- We keep Flutter prop names (`mainAxisAlignment`) rather than CSS names (`justifyContent`) so Flutter docs translate 1:1.

### 0.9 Overflow

Default `overflow: visible` everywhere except `Stack`, which defaults to `Clip.hardEdge` for Flutter parity. Users opt in to clipping via `Container({ style: { overflow: "hidden" } })` (v1) or future `Container.clip` (v1.1).

### 0.10 Folder structure

**One widget per folder.** Each widget owns its component, prop types, and barrel:

```
src/
├── index.ts                       // package barrel — re-exports everything below
└── lib/
    ├── _shared/
    │   ├── enums.ts               // all const-object enums (§1)
    │   ├── types.ts               // Length, EdgeInsets, BaseProps, FlexProps (§2)
    │   └── index.ts
    │
    ├── row/
    │   ├── row.tsx
    │   ├── types.ts               // RowProps
    │   └── index.ts
    ├── column/
    │   ├── column.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── container/
    │   ├── container.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── sized-box/
    │   ├── sized-box.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── spacer/
    │   ├── spacer.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── expanded/
    │   ├── expanded.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── flexible/
    │   ├── flexible.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── center/
    │   ├── center.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── wrap/
    │   ├── wrap.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── stack/
    │   ├── stack.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── positioned/
    │   ├── positioned.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── text/
    │   ├── text.tsx
    │   ├── types.ts
    │   └── index.ts
    ├── card/
    ├── divider/
    ├── button/
    ├── image/
    ├── visibility/
    ├── align/
    └── aspect-ratio/
```

Package entry (`src/index.ts`) re-exports:

```ts
// Components
export { Row } from "./lib/row";
export { Column } from "./lib/column";
export { Container } from "./lib/container";
export { SizedBox } from "./lib/sized-box";
export { Spacer } from "./lib/spacer";
export { Expanded } from "./lib/expanded";
export { Flexible } from "./lib/flexible";
export { Center } from "./lib/center";
export { Wrap } from "./lib/wrap";
export { Stack } from "./lib/stack";
export { Positioned } from "./lib/positioned";
export { Text } from "./lib/text";
export { Card } from "./lib/card";
export { Divider } from "./lib/divider";
export { Button } from "./lib/button";
export { Image } from "./lib/image";
export { Visibility } from "./lib/visibility";
export { Align } from "./lib/align";
export { AspectRatio } from "./lib/aspect-ratio";

// Prop types
export type { RowProps } from "./lib/row";
export type { ColumnProps } from "./lib/column";
// ...etc

// Shared enums + types
export * from "./lib/_shared";
```

### 0.11 Enums vs string literals

Flutter uses real enums. Strings are not allowed. We mirror this for parity and IDE autocomplete.

**Pattern: `const` object + companion type.** Not TypeScript `enum`.

```ts
// src/lib/_shared/enums.ts
export const MainAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
} as const;
export type MainAxisAlignment =
  (typeof MainAxisAlignment)[keyof typeof MainAxisAlignment];
```

Why not `enum`?

| Concern                              | `enum`         | `const` object        |
| ------------------------------------ | -------------- | --------------------- |
| Tree-shakeable                       | partial        | yes                   |
| Works with `isolatedModules: true`   | const enum no  | yes                   |
| Underlying values are inspectable    | numbers (ugly) | strings (debuggable)  |
| Identical at the call site           | yes            | yes                   |
| Flutter-style usage                  | yes            | yes                   |

Call site is identical for the user:

```tsx
<Row mainAxisAlignment={MainAxisAlignment.spaceBetween} />
```

**String literal values are not exposed publicly.** Always type a prop as the type, never as `string`. If a user really wants to bypass the enum they can `as MainAxisAlignment` cast.

---

## 1. Shared enums

All enums live in `src/lib/_shared/enums.ts` and are re-exported from the package root. Member values shown for implementation reference; consumers only ever use the named keys.

### 1.1 `MainAxisAlignment` — `Row` / `Column`

```ts
export const MainAxisAlignment = {
  start:        "start",
  end:          "end",
  center:       "center",
  spaceBetween: "space-between",
  spaceAround:  "space-around",
  spaceEvenly:  "space-evenly",
} as const;
```

### 1.2 `CrossAxisAlignment` — `Row` / `Column`

```ts
export const CrossAxisAlignment = {
  start:    "start",
  end:      "end",
  center:   "center",
  stretch:  "stretch",
  baseline: "baseline",
} as const;
```

### 1.3 `MainAxisSize` — `Row` / `Column`

Controls how much space the flex container takes along its main axis.

```ts
export const MainAxisSize = {
  min: "min",   // shrink to fit children
  max: "max",   // fill parent along the main axis
} as const;
```

**Behavior & CSS mapping**

| Value             | `Row` (main = horizontal)     | `Column` (main = vertical)    | Behavior                                                              |
| ----------------- | ----------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| `MainAxisSize.max` | `width: 100%`                | `height: 100%`                | **Default.** Flex container fills the available space on the main axis. `mainAxisAlignment` is meaningful (there is extra space to distribute). |
| `MainAxisSize.min` | `width: fit-content`         | `height: fit-content`         | Container shrinks to wrap its children. `mainAxisAlignment` has no visible effect (no extra space). Useful for chips, badges, inline groups. |

**Note:** if the flex container's parent imposes its own width/height (e.g. via `Container({ width })`), that wins. `mainAxisSize` only governs the container's intrinsic preference.

### 1.4 `Axis` — `Wrap`

```ts
export const Axis = {
  horizontal: "horizontal",
  vertical:   "vertical",
} as const;
```

### 1.5 `WrapAlignment` — `Wrap`

```ts
export const WrapAlignment = {
  start:        "start",
  end:          "end",
  center:       "center",
  spaceBetween: "space-between",
  spaceAround:  "space-around",
  spaceEvenly:  "space-evenly",
} as const;
```

### 1.6 `WrapCrossAlignment` — `Wrap`

```ts
export const WrapCrossAlignment = {
  start:  "start",
  end:    "end",
  center: "center",
} as const;
```

### 1.7 `TextDirection` — `Row` / `Column` / `Wrap` / `Stack`

```ts
export const TextDirection = {
  ltr: "ltr",
  rtl: "rtl",
} as const;
```

### 1.8 `VerticalDirection` — `Row` / `Column` / `Wrap`

```ts
export const VerticalDirection = {
  down: "down",
  up:   "up",
} as const;
```

### 1.9 `Alignment` — `Container` / `Stack` / `Center` / `Align`

Full 9-point alignment grid, mirroring Flutter's `Alignment` constants.

```ts
export const Alignment = {
  topLeft:      "top-left",
  topCenter:    "top-center",
  topRight:     "top-right",
  centerLeft:   "center-left",
  center:       "center",
  centerRight:  "center-right",
  bottomLeft:   "bottom-left",
  bottomCenter: "bottom-center",
  bottomRight:  "bottom-right",
} as const;
```

**Mapping to CSS** — `Alignment` is used in two distinct contexts. The implementation picks the right CSS based on the consuming widget:

| `Alignment` value | Flex context (`Container`, `Center`, `Align`) | Stack context (`Stack`) |
| ----------------- | ------------------------------------ | ----------------------- |
|                   | `justify-content` / `align-items` on a flex parent | Absolute positioning of non-positioned children |
| `topLeft`         | `justify-content: flex-start; align-items: flex-start` | `top: 0; left: 0` |
| `topCenter`       | `justify-content: center; align-items: flex-start` | `top: 0; left: 50%; transform: translateX(-50%)` |
| `topRight`        | `justify-content: flex-end; align-items: flex-start` | `top: 0; right: 0` |
| `centerLeft`      | `justify-content: flex-start; align-items: center` | `top: 50%; left: 0; transform: translateY(-50%)` |
| `center`          | `justify-content: center; align-items: center` | `top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| `centerRight`     | `justify-content: flex-end; align-items: center` | `top: 50%; right: 0; transform: translateY(-50%)` |
| `bottomLeft`      | `justify-content: flex-start; align-items: flex-end` | `bottom: 0; left: 0` |
| `bottomCenter`    | `justify-content: center; align-items: flex-end` | `bottom: 0; left: 50%; transform: translateX(-50%)` |
| `bottomRight`     | `justify-content: flex-end; align-items: flex-end` | `bottom: 0; right: 0` |

> When `textDirection={TextDirection.rtl}` is in effect on a `Stack`, `left` and `right` swap to follow the writing direction.

### 1.10 `StackFit` — `Stack`

```ts
export const StackFit = {
  loose:       "loose",       // children sized to their content
  expand:      "expand",      // non-positioned children fill the stack
  passthrough: "passthrough", // stack sized by non-positioned children
} as const;
```

### 1.11 `Clip` — `Container` (v1.1) / `Stack` / `Wrap`

```ts
export const Clip = {
  none:      "none",       // overflow: visible
  hardEdge:  "hard-edge",  // overflow: hidden
  antiAlias: "anti-alias", // overflow: hidden (no separate CSS equivalent; treated as hardEdge in browsers, kept for parity)
} as const;
```

> Note: in the browser, `hardEdge` and `antiAlias` behave identically. We keep both for Flutter parity and to allow future divergence.

### 1.12 `FlexFit` — `Flexible`

```ts
export const FlexFit = {
  loose: "loose",   // child may be smaller than its allocated main-axis space
  tight: "tight",   // child must fill its allocated main-axis space (same as Expanded)
} as const;
```

> `Flexible({ fit: FlexFit.tight })` is **semantically equivalent to `Expanded`**. We ship both for Flutter parity.

### 1.13 `TextAlign` — `Text`

```ts
export const TextAlign = {
  left:    "left",
  right:   "right",
  center:  "center",
  justify: "justify",
  start:   "start",
  end:     "end",
} as const;
```

### 1.14 `TextOverflow` — `Text`

```ts
export const TextOverflow = {
  clip:     "clip",
  ellipsis: "ellipsis",
  fade:     "fade",       // approximation via mask-image
  visible:  "visible",
} as const;
```

### 1.15 `FontWeight` — `Text`

```ts
export const FontWeight = {
  w100:   "100",
  w200:   "200",
  w300:   "300",
  w400:   "400",
  w500:   "500",
  w600:   "600",
  w700:   "700",
  w800:   "800",
  w900:   "900",
  normal: "400",
  bold:   "700",
} as const;
```

### 1.16 `FontStyle` — `Text`

```ts
export const FontStyle = {
  normal: "normal",
  italic: "italic",
} as const;
```

### 1.17 `TextDecoration` — `Text`

```ts
export const TextDecoration = {
  none:        "none",
  underline:   "underline",
  overline:    "overline",
  lineThrough: "line-through",
} as const;
```

### 1.18 `TextDecorationStyle` — `Text`

```ts
export const TextDecorationStyle = {
  solid:  "solid",
  double: "double",
  dotted: "dotted",
  dashed: "dashed",
  wavy:   "wavy",
} as const;
```

### 1.19 `TextTransform` — `Text`

```ts
export const TextTransform = {
  none:       "none",
  uppercase:  "uppercase",
  lowercase:  "lowercase",
  capitalize: "capitalize",
} as const;
```

> Not a Flutter concept (Flutter handles case at the string level). Included for parity with CSS, which web users expect.

### 1.20 `BorderStyle` — `Container`

```ts
export const BorderStyle = {
  none:   "none",
  solid:  "solid",
  dashed: "dashed",
  dotted: "dotted",
} as const;
```

> Flutter only has `none` and `solid`. We expose `dashed` / `dotted` since CSS supports them for free; users from Flutter ignore them.

### 1.21 `BoxFit` — `Image`

Maps to CSS `object-fit`. Mirrors Flutter's [`BoxFit`](https://api.flutter.dev/flutter/painting/BoxFit.html).

```ts
export const BoxFit = {
  fill:      "fill",
  contain:   "contain",
  cover:     "cover",
  fitWidth:  "fit-width",   // CSS: object-fit: none + width constraint (see §18)
  fitHeight: "fit-height",
  none:      "none",
  scaleDown: "scale-down",
} as const;
```

| `BoxFit`      | CSS `object-fit` | Notes                                                                 |
| ------------- | ---------------- | --------------------------------------------------------------------- |
| `fill`        | `fill`           | Stretch to fill; may distort aspect ratio.                            |
| `contain`     | `contain`        | Letterbox inside bounds.                                              |
| `cover`       | `cover`          | Crop to fill bounds.                                                  |
| `fitWidth`    | `none` + sizing  | Scale down so width fits; height may clip. **Deferred in v1.1 impl (§22.5).** |
| `fitHeight`   | `none` + sizing  | Scale down so height fits; width may clip. **Deferred in v1.1 impl (§22.5).** |
| `none`        | `none`           | Intrinsic size; may overflow.                                         |
| `scaleDown`   | `scale-down`     | Like `contain` but never upscale. **Default for `Image`.**            |

> `fitWidth` / `fitHeight` have no single `object-fit` keyword; implementation uses `object-fit: none` plus `width`/`height`/`max-*` rules documented in §18.

### 1.22 `ButtonVariant` — `Button`

Material-style button appearances. Mirrors Flutter 3's [`FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html), [`OutlinedButton`](https://api.flutter.dev/flutter/material/OutlinedButton-class.html), and [`TextButton`](https://api.flutter.dev/flutter/material/TextButton-class.html).

```ts
export const ButtonVariant = {
  filled:    "filled",     // solid background (M3 FilledButton / legacy ElevatedButton body)
  outlined:  "outlined",   // border, transparent fill
  text:      "text",       // no border, transparent fill
  elevated:  "elevated",   // filled + shadow (legacy ElevatedButton; extension for parity)
} as const;
```

| Variant    | Typical surface                                      | Flutter analogue        |
| ---------- | ---------------------------------------------------- | ----------------------- |
| `filled`   | Solid `backgroundColor`, no shadow                     | `FilledButton`          |
| `outlined` | Transparent fill + `border`                          | `OutlinedButton`        |
| `text`     | Transparent fill, no border                            | `TextButton`            |
| `elevated` | Solid fill + `box-shadow` (uses Card-like elevation) | `ElevatedButton` (M2) |

**Default:** `ButtonVariant.filled`.

### 1.23 `ImageLoading` — `Image` (v1.1)

Native lazy-loading hint. Not a Flutter concept; web-standard.

```ts
export const ImageLoading = {
  eager: "eager",
  lazy:  "lazy",
} as const;
```

**Default:** `ImageLoading.lazy`.

### 1.24 `ImagePlaceholder` — `Image`

Built-in placeholder surface shown until the `<img>` fires `load`. Not a Flutter concept; web/SSR pattern.

```ts
export const ImagePlaceholder = {
  none:     "none",
  skeleton: "skeleton",
  shimmer:  "shimmer",
} as const;
```

| Value      | Behavior                                              |
| ---------- | ----------------------------------------------------- |
| `none`     | No placeholder layer (plain `<img>` only).            |
| `skeleton` | Neutral solid fill in the image box.                  |
| `shimmer`  | Animated gradient placeholder (loading affordance).   |

**Default:** `ImagePlaceholder.none`.

### 1.25 `ImageError` — `Image`

Built-in UI when the `<img>` fires `error`. Mirrors Flutter's `errorBuilder` as enum presets (not a custom slot).

```ts
export const ImageError = {
  none: "none",
  icon: "icon",
  text: "text",
} as const;
```

| Value  | Behavior                                                                 |
| ------ | ------------------------------------------------------------------------ |
| `none` | Browser default broken-image affordance; `<img>` stays visible.          |
| `icon` | Built-in icon glyph + `role="alert"` (decorative icon, announced label). |
| `text` | Short visible message + `role="alert"`. **Default.**                     |

**Default:** `ImageError.text`.

### 1.26 `ButtonSize` — `Button` (planned, not v1.1)

Density presets for `Button`. **Specified for roadmap consistency; not exported until v1.2+** (see §17 future extensibility).

```ts
export const ButtonSize = {
  small:  "small",
  medium: "medium",
  large:  "large",
} as const;
```

| Size     | Intended use                                      |
| -------- | ------------------------------------------------- |
| `small`  | Dense toolbars, tables, inline actions.           |
| `medium` | Default app density (matches v1.1 hard-coded pad). |
| `large`  | Primary CTAs, touch-first layouts.                |

---

## 2. Shared types

```ts
// src/lib/_shared/types.ts
import type { CSSProperties } from "@builder.io/qwik";

export type Length = number | string;

export type EdgeInsets =
  | Length
  | [Length, Length]
  | [Length, Length, Length, Length]
  | { top?: Length; right?: Length; bottom?: Length; left?: Length;
      x?: Length; y?: Length };

// Open-ended passthrough for accessibility and instrumentation.
// Principle #3: ARIA passthrough is built in.
type AriaAttributes = { [K in `aria-${string}`]?: string | number | boolean };
type DataAttributes = { [K in `data-${string}`]?: string | number | boolean };

export interface BaseProps extends AriaAttributes, DataAttributes {
  class?: string;          // merged with internal classes
  style?: CSSProperties;   // merged with internal styles (user wins)
  id?: string;
  role?: string;           // ARIA role
}

export interface BoxShadow {
  offsetX?: Length;
  offsetY?: Length;
  blur?: Length;
  spread?: Length;
  color?: string;
  inset?: boolean;
}

export interface Gradient {
  type: "linear" | "radial";
  angle?: number;          // linear only, degrees
  stops: Array<{ color: string; at?: Length }>;
}

export interface BorderSide {
  width?: Length;
  color?: string;
  style?: BorderStyle;
}

// Per-corner border radius. Single Length applies to all corners.
// Object form matches Flutter's BorderRadius.only(...).
export type BorderRadius =
  | Length
  | {
      topLeft?: Length;
      topRight?: Length;
      bottomRight?: Length;
      bottomLeft?: Length;
    };

// Shared by Row & Column. Each widget re-exports as RowProps / ColumnProps.
export interface FlexProps extends BaseProps {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: Length;
  textDirection?: TextDirection;
  verticalDirection?: VerticalDirection;
}

// §5 Container, §15 Card — semantic layout/surface tags.
export type ContainerTag =
  | "div" | "section" | "article" | "header" | "footer"
  | "nav" | "aside" | "main";

// §17 Button — native interactive element.
export type ButtonTag = "button" | "a";

// §17 — optional base for interactive widgets (not used by layout widgets).
import type { QRL } from "@builder.io/qwik";

export interface InteractiveProps {
  onClick$?: QRL<(event: MouseEvent, element: HTMLElement) => void>;
  disabled?: boolean;
}
```

**Notes:**

- `CSSProperties` is imported from `@builder.io/qwik`, not React (Qwik's type is structurally compatible but uses kebab-case-aware keys).
- `AriaAttributes` / `DataAttributes` use template-literal-key index signatures so any `aria-*` or `data-*` attribute typechecks without us having to enumerate them. `data-testid` is no longer a special-cased prop — it's covered by the `data-*` index.
- All widget prop interfaces (`RowProps`, `ColumnProps`, `ContainerProps`, …) extend `BaseProps` either directly or via `FlexProps`, so every widget gets accessibility passthrough for free.
- `ContainerTag` is shared by `Container` and `Card`. `InteractiveProps` is extended only by `Button` in v1.1.

---

## 3. `Row`

Horizontal flex layout. Flutter's [`Row`](https://api.flutter.dev/flutter/widgets/Row-class.html).

### Props

```ts
export interface RowProps extends FlexProps {}
// Distinct alias of FlexProps for nicer editor hovers and future divergence.
```

| Prop                 | Type                  | Default                       | Notes                                                                              |
| -------------------- | --------------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `mainAxisAlignment`  | `MainAxisAlignment`   | `MainAxisAlignment.start`     | Horizontal alignment of children. Maps to `justify-content`.                       |
| `crossAxisAlignment` | `CrossAxisAlignment`  | `CrossAxisAlignment.center`   | Vertical alignment of children. Maps to `align-items`. Flutter default.            |
| `mainAxisSize`       | `MainAxisSize`        | `MainAxisSize.max`            | `max` → `width: 100%`; `min` → `width: fit-content`. See §1.3.                     |
| `gap`                | `Length`              | `0`                           | **Extension over Flutter.** Avoids manual `SizedBox`. Maps to CSS `gap`.           |
| `textDirection`      | `TextDirection`       | inherit                       | Reverses main axis when `rtl`.                                                     |
| `verticalDirection`  | `VerticalDirection`   | `VerticalDirection.down`      | `up` reverses children top-to-bottom (affects baseline alignment).                 |
| _base props_         | `BaseProps`           | —                             | See §0.6.                                                                          |

### Usage

```tsx
<Row
  mainAxisAlignment={MainAxisAlignment.spaceBetween}
  crossAxisAlignment={CrossAxisAlignment.center}
  gap={8}
>
  <Icon name="back" />
  <Text>Title</Text>
  <Icon name="more" />
</Row>

{/* Shrink-to-fit row (e.g. chip) */}
<Row mainAxisSize={MainAxisSize.min} gap={4}>
  <Icon name="check" />
  <Text>Done</Text>
</Row>
```

### Flutter equivalent

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Icon(Icons.back),
    SizedBox(width: 8),
    Text('Title'),
    SizedBox(width: 8),
    Icon(Icons.more),
  ],
)
```

### Notes

- **Default `crossAxisAlignment` is `center`** for Flutter parity (CSS flex defaults to `stretch`).
- **`gap` is a deliberate extension** — Flutter has no `gap`; idiomatic Flutter uses `SizedBox`.
- **No `wrap` prop.** Wrapping behavior lives in §11 `Wrap`.
- **`mainAxisSize`** controls the row's own width — see §1.3 for the behavior table.
- **Overflow defaults to `visible`** (see §0.9).

---

## 4. `Column`

Vertical flex layout. Flutter's [`Column`](https://api.flutter.dev/flutter/widgets/Column-class.html).

API is **identical to `Row`** with axis semantics swapped.

### Props

```ts
export interface ColumnProps extends FlexProps {}
```

Same table as `Row`. Differences:

- `mainAxisAlignment` maps to vertical alignment.
- `crossAxisAlignment` maps to horizontal alignment.
- `mainAxisSize` `max` → `height: 100%`, `min` → `height: fit-content` (see §1.3).

### Usage

```tsx
<Column crossAxisAlignment={CrossAxisAlignment.start} gap={12}>
  <Text fontSize={20}>Settings</Text>
  <Text>Manage your account</Text>
</Column>

{/* Full-height column that fills the parent */}
<Column mainAxisSize={MainAxisSize.max} mainAxisAlignment={MainAxisAlignment.spaceBetween}>
  <Header />
  <Footer />
</Column>
```

### Flutter equivalent

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Settings', style: TextStyle(fontSize: 20)),
    SizedBox(height: 12),
    Text('Manage your account'),
  ],
)
```

### Notes

- `Row` and `Column` are **structurally identical** — same props, different component. Same internal `FlexProps` (§2).

---

## 5. `Container`

A box with sizing, padding, margin, alignment, and flat decoration. Flutter's [`Container`](https://api.flutter.dev/flutter/widgets/Container-class.html).

**Decoration is flat-only.** No nested `decoration={{...}}` prop.

### Props

```ts
export type ContainerTag =
  | "div" | "section" | "article" | "header" | "footer"
  | "nav" | "aside" | "main";

export interface ContainerProps extends BaseProps {
  // semantic tag (Principle #2)
  as?: ContainerTag;        // default "div"

  // sizing
  width?: Length;
  height?: Length;
  minWidth?: Length;
  maxWidth?: Length;
  minHeight?: Length;
  maxHeight?: Length;

  // spacing
  padding?: EdgeInsets;
  margin?: EdgeInsets;

  // alignment of the child inside the container
  alignment?: Alignment;

  // decoration (flat, no nested object)
  backgroundColor?: string;
  borderRadius?: BorderRadius;
  border?: string | BorderSide;
  boxShadow?: string | BoxShadow | BoxShadow[];
  gradient?: string | Gradient;
  opacity?: number;
  transform?: string;
}
```

| Prop              | Notes                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `as`              | HTML tag the container renders. Default `"div"`. Use `"section"`, `"article"`, `"header"`, `"footer"`, `"nav"`, `"aside"`, `"main"` for semantic markup (Principle #2). |
| `width` / `height`| `Length`. Numbers are `px`.                                                                    |
| `minWidth`, …     | Flat replacements for Flutter's `BoxConstraints`.                                              |
| `padding`         | `EdgeInsets` (see §0.3).                                                                       |
| `margin`          | `EdgeInsets`.                                                                                  |
| `alignment`       | Aligns the **child** inside the container (§1.9).                                              |
| `backgroundColor` | CSS color string. If `gradient` is also set, `gradient` wins.                                  |
| `borderRadius`    | Single `Length` → all corners; object → per-corner (matches Flutter `BorderRadius.only(...)`). |
| `border`          | Raw CSS string (`"1px solid #ccc"`) or structured `BorderSide`.                                |
| `boxShadow`       | CSS string, single `BoxShadow`, or array of `BoxShadow`s.                                      |
| `gradient`        | CSS gradient string or structured `Gradient`.                                                  |
| `opacity`         | `0..1`.                                                                                        |
| `transform`       | Raw CSS transform.                                                                             |

### Usage

```tsx
<Container
  width={240}
  padding={16}
  margin={{ y: 8 }}
  borderRadius={12}
  backgroundColor="#fff"
  boxShadow={{ offsetY: 2, blur: 8, color: "rgba(0,0,0,0.1)" }}
>
  <Text>Card</Text>
</Container>

<Container
  width="100%"
  height={200}
  alignment={Alignment.center}
  backgroundColor="#111"
>
  <Text color="#fff">Centered</Text>
</Container>

<Container
  padding={[12, 16]}
  borderRadius={{ topLeft: 8, topRight: 8, bottomRight: 16, bottomLeft: 16 }}
  border={{ width: 1, color: "#ddd", style: BorderStyle.solid }}
  gradient={{
    type: "linear",
    angle: 135,
    stops: [{ color: "#7c3aed" }, { color: "#3b82f6" }],
  }}
>
  <Text color="#fff">Per-corner radius + structured border + gradient</Text>
</Container>

{/* Semantic HTML: renders <header> instead of <div> */}
<Container as="header" padding={16} backgroundColor="#fafafa">
  <Text as="h1" fontSize={24} fontWeight={FontWeight.bold}>Dashboard</Text>
</Container>
```

### Flutter equivalent

```dart
Container(
  width: 240,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [BoxShadow(offset: Offset(0, 2), blurRadius: 8, color: Colors.black12)],
  ),
  child: Text('Card'),
)
```

### Notes

- For Material-style elevated panels, prefer **`Card`** (§15) over `Container` + manual `boxShadow`.
- **`as` prop** keeps `Container` as a layout primitive while still emitting semantic HTML. The internal styling/classes are identical regardless of tag.
- `backgroundColor` + `gradient`: Flutter forbids both. We let CSS resolve and document that `gradient` wins (it paints on top).
- **Deferred to v1.1:**
  - `clip` — kept Container minimal in v1; use `style={{ overflow: "hidden" }}` as an escape hatch.
  - `transformOrigin`.
  - Structured per-side `border` (`borderTop`, `borderRight`, `borderBottom`, `borderLeft`).

---

## 6. `SizedBox`

A box with a fixed width and/or height. Flutter's [`SizedBox`](https://api.flutter.dev/flutter/widgets/SizedBox-class.html).

### Props

```ts
export interface SizedBoxProps extends BaseProps {
  width?: Length;
  height?: Length;
}
```

| Prop     | Default | Notes                                            |
| -------- | ------- | ------------------------------------------------ |
| `width`  | omit    | If omitted, child's intrinsic width is used.     |
| `height` | omit    | If omitted, child's intrinsic height is used.    |

> Optional child (slotted). Most uses are childless (as a spacer).

### Usage

```tsx
<Column>
  <Header />
  <SizedBox height={16} />
  <Body />
</Column>

<SizedBox width={48} height={48}>
  <Avatar src="/me.png" />
</SizedBox>
```

### Flutter equivalent

```dart
Column(children: [Header(), SizedBox(height: 16), Body()])

SizedBox(width: 48, height: 48, child: Avatar(src: '/me.png'))
```

### Notes

- For inter-child spacing in `Row` / `Column`, **prefer `gap`**. Use `SizedBox` outside flex containers or as a fixed-size wrapper.
- **`SizedBox.expand` / `SizedBox.shrink`** (Flutter named constructors) are not part of v1. Equivalents: `width="100%" height="100%"` and `width={0} height={0}`.

---

## 7. `Spacer`

Empty flexible spacer inside `Row` / `Column`. Flutter's [`Spacer`](https://api.flutter.dev/flutter/widgets/Spacer-class.html).

### Props

```ts
export interface SpacerProps extends BaseProps {
  flex?: number;   // default 1
}
```

> No children.

### Usage

```tsx
<Row>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Row>

<Row>
  <Text>A</Text>
  <Spacer flex={2} />
  <Text>B</Text>
  <Spacer flex={1} />
  <Text>C</Text>
</Row>
```

### Flutter equivalent

```dart
Row(children: [Text('Left'), Spacer(), Text('Right')])
```

### Notes

- Internally: `flex-grow: <flex>; flex-shrink: 1; flex-basis: 0`.
- **Outside a flex parent:** silent no-op. No dev-time warning in v1.

---

## 8. `Expanded`

Forces a child to fill remaining space along the main axis of a `Row` / `Column`. Flutter's [`Expanded`](https://api.flutter.dev/flutter/widgets/Expanded-class.html).

### Props

```ts
export interface ExpandedProps extends BaseProps {
  flex?: number;   // default 1
}
```

> Single child (slotted).

### Usage

```tsx
<Row gap={8}>
  <Icon name="search" />
  <Expanded>
    <Input placeholder="Search..." />
  </Expanded>
  <Button>Go</Button>
</Row>

<Column>
  <Header />
  <Expanded flex={1}>
    <Content />
  </Expanded>
  <Footer />
</Column>
```

### Flutter equivalent

```dart
Row(children: [
  Icon(Icons.search),
  Expanded(child: TextField(decoration: InputDecoration(hintText: 'Search...'))),
  ElevatedButton(onPressed: () {}, child: Text('Go')),
])
```

### Notes

- Internally: `flex: <flex> 1 0; min-width: 0; min-height: 0`. The `min-*: 0` bit prevents the classic CSS flex overflow surprise.
- **Outside a flex parent:** silent no-op.
- **Relationship to `Flexible`:** `Expanded` is sugar for `Flexible({ fit: FlexFit.tight })`. See §9.

---

## 9. `Flexible`

A flex child with configurable fit. Flutter's [`Flexible`](https://api.flutter.dev/flutter/widgets/Flexible-class.html).

**Included in v1.** Implementation complexity is trivial (one extra prop over `Expanded`), and it completes the Flutter flex model: `Spacer` (empty filler) + `Expanded` (tight fit) + `Flexible` (loose or tight fit, user choice).

### Props

```ts
export interface FlexibleProps extends BaseProps {
  flex?: number;     // default 1
  fit?: FlexFit;     // default FlexFit.loose
}
```

> Single child (slotted).

| Prop  | Default          | Notes                                                                                              |
| ----- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `flex`| `1`              | Flex grow factor along the main axis.                                                              |
| `fit` | `FlexFit.loose`  | `loose` → child may be smaller than allocated space. `tight` → child must fill allocated space.    |

**CSS mapping**

| `fit`           | Internal style                                            | Equivalent to                |
| --------------- | --------------------------------------------------------- | ---------------------------- |
| `FlexFit.loose` | `flex: <flex> 1 auto; min-width: 0; min-height: 0`        | Flutter `Flexible` (default) |
| `FlexFit.tight` | `flex: <flex> 1 0;    min-width: 0; min-height: 0`        | `<Expanded flex={flex}>`     |

### Usage

```tsx
{/* Image takes up to its natural width; button takes the rest */}
<Row gap={8}>
  <Flexible flex={1}>
    <Avatar src="/me.png" />
  </Flexible>
  <Expanded>
    <Button>Save</Button>
  </Expanded>
</Row>

{/* Equivalent to <Expanded flex={2}> */}
<Row>
  <Flexible flex={2} fit={FlexFit.tight}>
    <Card />
  </Flexible>
  <Flexible flex={1}>
    <Sidebar />
  </Flexible>
</Row>
```

### Flutter equivalent

```dart
Row(children: [
  Flexible(flex: 1, child: Avatar(src: '/me.png')),
  Expanded(child: ElevatedButton(onPressed: () {}, child: Text('Save'))),
])
```

### Notes

- **`Flexible` vs `Expanded`:**
  - `Expanded` always forces the child to fill (tight fit). It's the common case and gets its own widget for readability and Flutter parity.
  - `Flexible` is the more general form. With `fit: FlexFit.tight` it's identical to `Expanded`; with `fit: FlexFit.loose` it allows the child to be smaller than its allocated space.
- **When to reach for `Flexible` over `Expanded`:** when you want a child to *participate* in flex distribution (so it shrinks if needed) but **not** be forced to grow to fill remaining space.
- **Outside a flex parent:** silent no-op (same as `Expanded` and `Spacer`).

---

## 10. `Center`

Centers its child both horizontally and vertically. Flutter's [`Center`](https://api.flutter.dev/flutter/widgets/Center-class.html).

### Props

```ts
export interface CenterProps extends BaseProps {
  widthFactor?: number;   // optional, v1.1 candidate
  heightFactor?: number;  // optional, v1.1 candidate
}
```

> Single child (slotted).

### Usage

```tsx
<Center>
  <Text>Centered</Text>
</Center>

<Container width="100%" height={400}>
  <Center>
    <Spinner />
  </Center>
</Container>
```

### Flutter equivalent

```dart
Center(child: Text('Centered'))
```

### Notes

- Equivalent to `Align({ alignment: Alignment.center })` inside a parent that gives it bounded constraints, or `Container` with full-size + `alignment: Alignment.center`.
- **`widthFactor` / `heightFactor`** live on **`Align`** (§20), not `Center` — keeps `Center` a zero-config convenience widget.
- For arbitrary alignment (not dead-center), use **`Align`** (§20).

---

## 11. `Wrap`

Like `Row` but wraps overflowing children onto new lines. Flutter's [`Wrap`](https://api.flutter.dev/flutter/widgets/Wrap-class.html).

### Props

```ts
export interface WrapProps extends BaseProps {
  direction?: Axis;                         // default Axis.horizontal
  alignment?: WrapAlignment;                // main-axis, default WrapAlignment.start
  runAlignment?: WrapAlignment;             // cross-axis alignment of runs, default start
  crossAxisAlignment?: WrapCrossAlignment;  // alignment within a run, default start
  spacing?: Length;                         // main-axis gap, default 0
  runSpacing?: Length;                      // cross-axis gap, default 0
  textDirection?: TextDirection;
  verticalDirection?: VerticalDirection;
  clipBehavior?: Clip;                      // default Clip.none
}
```

| Prop                 | Maps to (CSS)                                               |
| -------------------- | ----------------------------------------------------------- |
| `direction`          | `flex-direction` (row / column).                            |
| `alignment`          | `justify-content` along the main axis.                      |
| `runAlignment`       | `align-content` (between wrap runs).                        |
| `crossAxisAlignment` | `align-items` (within a single run).                        |
| `spacing`            | `column-gap` (horizontal) / `row-gap` (vertical).           |
| `runSpacing`         | `row-gap` (horizontal) / `column-gap` (vertical).           |
| `clipBehavior`       | `overflow`.                                                 |

### Usage

```tsx
<Wrap spacing={8} runSpacing={8}>
  {tags.map((t) => (
    <Chip key={t}>{t}</Chip>
  ))}
</Wrap>

<Wrap
  direction={Axis.horizontal}
  alignment={WrapAlignment.center}
  runAlignment={WrapAlignment.center}
  crossAxisAlignment={WrapCrossAlignment.center}
  spacing={12}
  runSpacing={12}
>
  <Card />
  <Card />
  <Card />
</Wrap>
```

### Flutter equivalent

```dart
Wrap(
  spacing: 8,
  runSpacing: 8,
  children: tags.map((t) => Chip(label: Text(t))).toList(),
)
```

### Notes

- We intentionally do **not** merge this into `Row` as a `wrap` boolean — Flutter splits them and the prop sets diverge (`spacing` + `runSpacing` vs. `gap`).
- `alignment` uses the **`WrapAlignment`** enum (not `MainAxisAlignment`) because Flutter does — the set is the same today but kept distinct for parity and future divergence.
- `crossAxisAlignment` uses **`WrapCrossAlignment`** (no `stretch` or `baseline`).

---

## 12. `Stack`

Positions children on top of each other. Flutter's [`Stack`](https://api.flutter.dev/flutter/widgets/Stack-class.html).

### Props

```ts
export interface StackProps extends BaseProps {
  alignment?: Alignment;       // default Alignment.topLeft  (Flutter default)
  fit?: StackFit;              // default StackFit.loose
  clipBehavior?: Clip;         // default Clip.hardEdge      (Flutter default)
  textDirection?: TextDirection;
}
```

| Prop           | Default              | Notes                                                                   |
| -------------- | -------------------- | ----------------------------------------------------------------------- |
| `alignment`    | `Alignment.topLeft`  | Aligns **non-positioned** children inside the stack (see §1.9).         |
| `fit`          | `StackFit.loose`     | How non-positioned children are sized (see §1.10).                      |
| `clipBehavior` | `Clip.hardEdge`      | This is the **only** widget where the default is not `Clip.none`.       |
| `textDirection`| inherit              |                                                                         |

### Usage

```tsx
<Stack alignment={Alignment.bottomCenter}>
  <img src="/hero.jpg" alt="" />
  <Container padding={[4, 12]} backgroundColor="rgba(0,0,0,0.5)">
    <Text color="#fff">Caption</Text>
  </Container>
</Stack>

<Stack>
  <Container width={300} height={200} backgroundColor="#eee" />
  <Positioned top={8} right={8}>
    <Button>Close</Button>
  </Positioned>
</Stack>
```

### Flutter equivalent

```dart
Stack(
  alignment: Alignment.bottomCenter,
  children: [
    Image.asset('hero.jpg'),
    Container(
      padding: EdgeInsets.symmetric(vertical: 4, horizontal: 12),
      color: Colors.black54,
      child: Text('Caption', style: TextStyle(color: Colors.white)),
    ),
  ],
)
```

### Notes

- Internally: `position: relative` on stack; non-positioned children laid out per `fit`; positioned children (`<Positioned>`) use `position: absolute`.
- **Non-positioned children** are aligned by `alignment`.
- **Stack sizing rules:**
  - `loose` → stack sized to its largest non-positioned child; children keep their intrinsic size.
  - `expand` → non-positioned children stretched to fill the stack.
  - `passthrough` → stack reports child sizes upward without enforcing.
- **Stack clips by default** to match Flutter. Override with `clipBehavior={Clip.none}`.

---

## 13. `Positioned`

Positions a child inside a `Stack`. Flutter's [`Positioned`](https://api.flutter.dev/flutter/widgets/Positioned-class.html).

### Props

```ts
export interface PositionedProps extends BaseProps {
  top?: Length;
  right?: Length;
  bottom?: Length;
  left?: Length;
  width?: Length;
  height?: Length;
}
```

> Single child (slotted). Only meaningful inside a `Stack`.

| Constraint                       | Behavior                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| Provide `top` + `bottom`         | Height stretches between them.                                      |
| Provide `left` + `right`         | Width stretches between them.                                       |
| Provide `width` AND `left/right` | Same warning as Flutter: ambiguous — we let CSS resolve (no error). |

### Usage

```tsx
<Stack>
  <Container width={400} height={300} backgroundColor="#eef" />

  <Positioned top={8} left={8}>
    <Badge>NEW</Badge>
  </Positioned>

  <Positioned bottom={0} left={0} right={0}>
    <Container padding={12} backgroundColor="rgba(0,0,0,0.6)">
      <Text color="#fff">Footer banner</Text>
    </Container>
  </Positioned>
</Stack>
```

### Flutter equivalent

```dart
Stack(
  children: [
    Container(width: 400, height: 300, color: Color(0xFFEEF)),
    Positioned(top: 8, left: 8, child: Badge(child: Text('NEW'))),
    Positioned(
      bottom: 0, left: 0, right: 0,
      child: Container(
        padding: EdgeInsets.all(12),
        color: Colors.black54,
        child: Text('Footer banner', style: TextStyle(color: Colors.white)),
      ),
    ),
  ],
)
```

### Notes

- **Outside a `Stack`:** behaves as an absolutely positioned element relative to nearest positioned ancestor. Silent — no warning in v1.
- **Flutter named constructors** (`Positioned.fill`, `Positioned.directional`, `Positioned.fromRect`) are **deferred to v1.1**. `Positioned.fill` can be approximated with `<Positioned top={0} right={0} bottom={0} left={0}>`.

---

## 14. `Text`

Displays a run of styled text. Flutter's [`Text`](https://api.flutter.dev/flutter/widgets/Text-class.html).

**Text content is passed as a child** (not via a `text` prop). **Style props are flat** (no nested `TextStyle`).

### Props

```ts
export type TextTag =
  | "span" | "p" | "div" | "label"
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "strong" | "em" | "small";

export interface TextProps extends BaseProps {
  // semantic tag (Principle #2)
  as?: TextTag;              // default "span"

  // typography (flat — Flutter's TextStyle flattened in)
  color?: string;
  fontSize?: Length;
  fontFamily?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  letterSpacing?: Length;
  wordSpacing?: Length;
  lineHeight?: number | Length;          // unitless multiplier preferred
  decoration?: TextDecoration;
  decorationColor?: string;
  decorationStyle?: TextDecorationStyle;
  textTransform?: TextTransform;

  // layout / behavior (Flutter Text's top-level props)
  textAlign?: TextAlign;
  maxLines?: number;
  overflow?: TextOverflow;
  softWrap?: boolean;        // default true
  selectable?: boolean;      // default true (extension over Flutter)
}
```

| Prop | Notes                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| `as` | HTML tag the text renders. Default `"span"`. Use `"h1"`–`"h6"` for headings, `"p"` for paragraphs, `"label"` for form labels (Principle #2). |

> Single string child, or nested `<Text>` children for inline spans (rich text). See notes.

### Usage

```tsx
<Text>Hello</Text>

<Text
  fontSize={20}
  fontWeight={FontWeight.bold}
  color="#222"
  textAlign={TextAlign.center}
>
  Settings
</Text>

<Text maxLines={2} overflow={TextOverflow.ellipsis}>
  A long paragraph that should be truncated after two lines with an ellipsis…
</Text>

{/* Semantic headings + paragraph */}
<Text as="h1" fontSize={32} fontWeight={FontWeight.bold}>
  Welcome
</Text>

<Text as="p" lineHeight={1.5}>
  A paragraph of body copy that renders as a real <p> element.
</Text>
```

### Flutter equivalent

```dart
Text('Hello')

Text(
  'Settings',
  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF222222)),
  textAlign: TextAlign.center,
)

Text(
  'A long paragraph…',
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
)
```

### Notes

- **`as` prop** keeps `Text` as a styling primitive while still emitting semantic HTML. Browser styling defaults of the chosen tag (e.g. `<h1>`'s default `font-size`) are reset; our typography props are the source of truth.
- **Style props are flat**, consistent with `Container`. Trade-off: more props on `Text`, but no `style` collision with `BaseProps.style` (CSSProperties).
- **`children` is intended as a single string** in v1. Nested `<Text>` (Flutter's `Text.rich` / `TextSpan`) is **deferred to v1.1**.
- **`selectable={true}` is the default** — Flutter defaults to non-selectable on mobile, but on web users expect text to be selectable. Deliberate divergence (Principle #3).
- **`fade` overflow** is approximated via `mask-image`. Document the visual limitations.

---

## 15. `Card`

A Material-style **surface** for grouped content — elevation, rounded corners, and padding without the full sizing/alignment surface of `Container`. Flutter's [`Card`](https://api.flutter.dev/flutter/material/Card-class.html).

`Card` is intentionally **narrower than `Container`**: no `width`/`height`/`margin`/`alignment`/`gradient` in v1.1. Use `Container` when you need a generic box; use `Card` when you want a raised panel.

### Props

```ts
export interface CardProps extends BaseProps {
  /** Semantic tag. Default `"div"`. Prefer `"article"` for standalone content cards. */
  as?: ContainerTag;

  /** Shadow depth 0–24 (Material-style presets). Default `1`. Rounded to nearest integer. */
  elevation?: number;

  /** Outer spacing around the card surface (Flutter `margin`). */
  margin?: EdgeInsets;

  /** Inner spacing (Flutter often uses `Padding` child; we expose directly). */
  padding?: EdgeInsets;

  backgroundColor?: string;
  borderRadius?: BorderRadius;
  border?: string | BorderSide;
  /** When set, overrides `elevation` shadow. */
  boxShadow?: string | BoxShadow | BoxShadow[];
}
```

| Prop              | Default   | Notes                                                                                    |
| ----------------- | --------- | ---------------------------------------------------------------------------------------- |
| `as`              | `"div"`   | Reuses `ContainerTag` (§2). Use `"article"` for feed/list cards.                          |
| `elevation`       | `1`       | Maps to layered `box-shadow` presets (0 = flat). Ignored when `boxShadow` is set.        |
| `margin`          | —         | `EdgeInsets` (§0.3). Flutter default margin is `4` — **not** applied by default (§22.1). |
| `padding`         | —         | `EdgeInsets`.                                                                            |
| `backgroundColor` | —         | CSS color string.                                                                        |
| `borderRadius`    | —         | Same shape as `Container` (§5).                                                          |
| `border`          | —         | Raw CSS or `BorderSide`.                                                                 |
| `boxShadow`       | —         | Custom shadow; wins over `elevation`.                                                    |
| _base props_      | —         | See §0.6.                                                                                |

> Single child (slotted). Convention, not enforced.

### Usage

```tsx
<Card as="article" padding={16} borderRadius={12} elevation={2}>
  <Column gap={8}>
    <Text as="h2" fontSize={20} fontWeight={FontWeight.bold}>
      Account
    </Text>
    <Text>Manage your profile and preferences.</Text>
  </Column>
</Card>

<Card elevation={0} border="1px solid var(--border)" padding={12}>
  <Text>Outlined flat card</Text>
</Card>

<Row gap={16}>
  <Card margin={{ y: 8 }} backgroundColor="#fff" elevation={1} padding={16} style={{ flex: 1 }}>
    <Text>Left panel</Text>
  </Card>
  <Card margin={{ y: 8 }} backgroundColor="#fff" elevation={1} padding={16} style={{ flex: 1 }}>
    <Text>Right panel</Text>
  </Card>
</Row>
```

### Flutter equivalent

```dart
Card(
  elevation: 2,
  margin: EdgeInsets.symmetric(vertical: 8),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Account', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Text('Manage your profile and preferences.'),
      ],
    ),
  ),
)
```

### Accessibility considerations

- Prefer `as="article"` when the card is a self-contained piece of content; use `role` + `aria-labelledby` / `aria-describedby` via `BaseProps` when the card is a landmark region.
- **Do not** put click handlers on `Card` — use `Button` or wrap with a focusable control (§0.7, §17).
- Elevation is visual only; do not rely on shadow alone to convey state (pair with `Text`, `border`, or `aria-*`).

### Notes

- Decoration converters are shared with `Container` via `_shared/internal` (implementation detail).
- **`clipBehavior`** deferred to v1.1 alongside `Container.clip` (Decision #14).
- **`shadowColor`** (Flutter) not exposed — use `boxShadow` with explicit color.
- **`semanticContainer`** (Flutter) — use native semantics via `as` + ARIA on `BaseProps`.

### Future extensibility

| Version | Addition                                                                 |
| ------- | ------------------------------------------------------------------------ |
| v1.1    | `clipBehavior?: Clip`                                                    |
| v1.2    | `surfaceTintColor` / theme tokens when a `ThemeProvider` lands (v2)      |
| v2      | `InkWell` / ripple child wrapper; theme-driven default `borderRadius`    |

---

## 16. `Divider`

A thin line separator. Flutter's [`Divider`](https://api.flutter.dev/flutter/material/Divider-class.html) and [`VerticalDivider`](https://api.flutter.dev/flutter/material/VerticalDivider-class.html) unified via `axis`.

### Props

```ts
export interface DividerProps extends BaseProps {
  /** Line orientation. Default `Axis.horizontal`. */
  axis?: Axis;

  /** Thickness of the line itself. Default `1` (px). */
  thickness?: Length;

  /**
   * Total cross-axis size of the widget (Flutter `height` on horizontal
   * divider / `width` on vertical). Default: horizontal `16`, vertical `16`.
   */
  size?: Length;

  /** Inset before the line along the main axis. Default `0`. */
  indent?: Length;

  /** Inset after the line along the main axis. Default `0`. */
  endIndent?: Length;

  color?: string;
}
```

| Prop        | Default (horizontal) | Default (vertical) | Notes                                      |
| ----------- | -------------------- | ------------------ | ------------------------------------------ |
| `axis`      | `Axis.horizontal`    | —                  | Reuses §1.4 `Axis`.                        |
| `thickness` | `1`                  | `1`                | Line width in px.                            |
| `size`      | `16`                 | `16`               | Cross-axis space (Flutter `height` / `width`). |
| `indent`    | `0`                  | `0`                | Main-axis start inset.                       |
| `endIndent` | `0`                  | `0`                | Main-axis end inset.                         |
| `color`     | theme / `#e0e0e0`    | same               | CSS color. Implementation picks a neutral default. |
| _base props_| —                    | —                  | See §0.6.                                  |

> No children (zero-slot widget). Renders a single decorative separator element.

### Usage

```tsx
<Column gap={0}>
  <Text>Section A</Text>
  <Divider />
  <Text>Section B</Text>
</Column>

<Divider indent={16} endIndent={16} color="#ccc" thickness={2} />

<Row style={{ height: 120 }}>
  <Text>Left</Text>
  <Divider axis={Axis.vertical} size="100%" />
  <Text>Right</Text>
</Row>
```

### Flutter equivalent

```dart
Column(
  children: [
    Text('Section A'),
    Divider(),
    Text('Section B'),
  ],
)

Divider(indent: 16, endIndent: 16, color: Colors.grey, thickness: 2)

Row(
  children: [
    Text('Left'),
    VerticalDivider(),
    Text('Right'),
  ],
)
```

### Accessibility considerations

- Renders `<hr>` when `axis={Axis.horizontal}` (implicit `role="separator"`).
- Renders `<div role="separator" aria-orientation="vertical">` when vertical (`<hr>` is only valid horizontally).
- Set `aria-hidden={true}` via `BaseProps` when the divider is purely decorative and section headings already provide structure.
- Do not use `Divider` as the only visual label between controls — pair with visible `Text`.

### Notes

- **No `height` prop** — use `size` for cross-axis dimension (unified API across axes).
- Flutter's default divider color comes from `DividerTheme` — we use a fixed neutral until theming (v2).
- **`vertical` as separate widget** not shipped; `axis` covers both (extension with Flutter parity).

### Future extensibility

| Version | Addition                                      |
| ------- | --------------------------------------------- |
| v1.2    | `variant?: "full" \| "inset"` shorthand        |
| v2      | Theme token `DividerThemeData` equivalent       |

---

## 17. `Button`

A labeled pressable control. Flutter's [`FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html) / [`OutlinedButton`](https://api.flutter.dev/flutter/material/OutlinedButton-class.html) / [`TextButton`](https://api.flutter.dev/flutter/material/TextButton-class.html).

First **interactive** widget (§0.7). Accepts `onClick$`.

### Props

```ts
export interface ButtonProps extends BaseProps, InteractiveProps {
  /** Native element. Default `"button"`. Use `"a"` with `href` for link-styled buttons. */
  as?: ButtonTag;

  variant?: ButtonVariant;

  /** Foreground (label) color. Named `color` to match `Text`, not `foregroundColor`. */
  color?: string;
  backgroundColor?: string;
  padding?: EdgeInsets;
  borderRadius?: BorderRadius;
  border?: string | BorderSide;

  /** Only when `as="button"`. Default `"button"` (prevents accidental form submit). */
  type?: "button" | "submit" | "reset";

  /** When set, renders navigation (see §22.2). */
  href?: string;
  target?: string;
  rel?: string;

  /** Elevation shadow for `ButtonVariant.elevated` only. Default `1`. */
  elevation?: number;
}
```

| Prop              | Default                 | Notes                                                         |
| ----------------- | ----------------------- | ------------------------------------------------------------- |
| `variant`         | `ButtonVariant.filled`  | See §1.22. Preset styles in CSS module per variant.           |
| `type`            | `"button"`              | Ignored when rendering `<a>`.                                 |
| `disabled`        | `false`                 | Native `disabled` on `<button>`; `aria-disabled` + no pointer on `<a>`. |
| `onClick$`        | —                       | Suppressed when `disabled`.                                   |
| `color`           | variant default         | Label color.                                                  |
| `backgroundColor` | variant default         | Override surface color.                                       |
| `padding`         | variant default         | `EdgeInsets`.                                                 |
| `borderRadius`    | variant default         |                                                               |
| `border`          | variant default         | Most relevant for `outlined`.                                 |
| `elevation`       | `1`                     | Only for `elevated` variant.                                  |
| `href`            | —                       | Link navigation; see open questions §22.2.                    |
| _base props_      | —                       | `aria-label` required for icon-only buttons (documented).     |

> Label content is **slotted** (`<Button>Save</Button>`). Icon-only buttons are v1.1 without a dedicated `Icon` widget — use slotted markup + `aria-label`.

### Usage

```tsx
<Button variant={ButtonVariant.filled} onClick$={() => console.log("saved")}>
  Save
</Button>

<Button variant={ButtonVariant.outlined} disabled>
  Unavailable
</Button>

<Button
  variant={ButtonVariant.text}
  href="/docs"
  target="_blank"
  rel="noopener noreferrer"
>
  Read docs
</Button>

<Row gap={8}>
  <Button type="submit">Submit</Button>
  <Button variant={ButtonVariant.text} type="button" onClick$={() => {}}>
    Cancel
  </Button>
</Row>
```

### Flutter equivalent

```dart
FilledButton(
  onPressed: () => print('saved'),
  child: Text('Save'),
)

OutlinedButton(onPressed: null, child: Text('Unavailable'))

TextButton(
  onPressed: () {},
  child: Text('Read docs'),
)
```

### Accessibility considerations

- Default element is **`<button type="button">`** — keyboard activatable, in tab order, announced as button.
- **Visible focus ring** via `:focus-visible` in CSS module (never `outline: none` without replacement).
- **Icon-only:** caller must set `aria-label` (or `aria-labelledby`); document in examples/README.
- **`disabled`:** use native `disabled` on buttons; for links, `aria-disabled="true"` and prevent `onClick$` / navigation.
- **Contrast:** variant presets should meet WCAG AA for default theme; custom `color`/`backgroundColor` are caller's responsibility.
- Do not nest interactive elements inside `Button`.

### Notes

- **`onPressed` → `onClick$`** — Qwik idiom, not Flutter name (Principle #5: Qwik resumability first).
- **`styleFrom` / `ButtonStyle`** not exposed — flat decoration props only (same philosophy as `Container`).
- **`autofocus`**, **`clipBehavior`**, **`isSemanticButton`** — deferred.
- Layout widgets remain non-interactive (§23.6); `Button` is the pattern for future `Link`, `IconButton`.

### Future extensibility

#### `ButtonSize` (v1.2+)

v1.1 ships a single density per `ButtonVariant` (padding, font size, min-height baked into CSS module presets). **`ButtonSize` is intentionally omitted from v1.1** because:

1. **Surface area** — three sizes × four variants = twelve combinations to design, test, and keep accessible (touch targets, contrast).
2. **No theme system yet** — sizes are really design tokens; without `ThemeData` (§27.4), every size would be hard-coded duplication.
3. **Escape hatch exists** — callers can override `padding`, `fontSize` on slotted `Text`, or `class` / `style` until `size` lands.
4. **Flutter parity timing** — Material 3 uses `ButtonStyle` + theme; we ship variants first, then density.

**Planned API (v1.2):**

```ts
// enum §1.24 — not shipped in v1.1
size?: ButtonSize;   // default ButtonSize.medium
```

| `ButtonSize` | Typical min-height | Typical horizontal padding |
| ------------ | ------------------ | -------------------------- |
| `small`      | ~32px              | 12px                       |
| `medium`     | ~40px              | 16px                       |
| `large`      | ~48px              | 24px                       |

Exact values will align with `ThemeData` once theming lands (§27.4).

#### Other planned additions

| Version | Addition                                                                 |
| ------- | ------------------------------------------------------------------------ |
| v1.2    | `size?: ButtonSize` (§1.24); `onKeyDown$`, `autofocus`, `fullWidth?: boolean` |
| v1.2    | `IconButton` widget; slotted `leading` / `trailing` icon slots           |
| v2      | `Button.icon`, `Button.styleFrom` helper, theme-driven defaults, loading state |

---

## 18. `Image`

Displays an image from a URL via a semantic `<img>`. Flutter's [`Image.network`](https://api.flutter.dev/flutter/widgets/Image/Image.network.html) / [`Image.asset`](https://api.flutter.dev/flutter/widgets/Image/Image.asset.html). v1.1 is **URL-only** (`src`) — no asset pipeline.

Wraps the `<img>` in a **positioned container** so **placeholder** and **error** UI (enum presets or optional **QRL builders**) can occupy the same box without named slots or separate widgets.

> **Implementation status:** Core `<img>` props ship in v1.1; **`placeholder`**, **`error`**, **`minWidth`**, and **`minHeight`** ship per this spec (§1.24–§1.25).

### Props

```ts
export interface ImageProps extends BaseProps {
  /** Image URL (required). */
  src: string;

  /**
   * Accessible name. Required unless `decorative={true}`.
   * Maps to the native `alt` attribute.
   */
  alt?: string;

  /** When true, sets `alt=""` and `role="presentation"`. */
  decorative?: boolean;

  width?: Length;
  height?: Length;
  minWidth?: Length;
  minHeight?: Length;
  fit?: BoxFit;

  /** CSS `object-position`. Default `"center"`. */
  alignment?: string;

  /** `0..1` opacity on the `<img>` element. */
  opacity?: number;

  /** Native lazy-loading hint. Default `ImageLoading.lazy` (decision #40). */
  loading?: ImageLoading;

  /** Built-in placeholder until `load`. Default `ImagePlaceholder.none` (§1.24). Ignored when `placeholderBuilder$` is set. */
  placeholder?: ImagePlaceholder;

  /** Custom placeholder until `load`. Takes precedence over `placeholder`. */
  placeholderBuilder$?: ImagePlaceholderBuilder;

  /** Built-in UI on `error`. Default `ImageError.text` (§1.25). Ignored when `errorBuilder$` is set. */
  error?: ImageError;

  /** Custom UI on `error`. Takes precedence over `error`. */
  errorBuilder$?: ImageErrorBuilder;
}

/** QRL returning JSX for the loading state. */
export type ImagePlaceholderBuilder = QRL<() => unknown>;

/** QRL receiving the native `error` event. */
export type ImageErrorBuilder = QRL<(event: Event) => unknown>;
```

| Prop          | Default                   | Notes                                                |
| ------------- | ------------------------- | ---------------------------------------------------- |
| `src`         | (required)                | Passed to `<img src>`.                               |
| `alt`         | —                         | Required if `decorative` is not `true`.              |
| `decorative`  | `false`                   | Decorative images must not duplicate nearby text.    |
| `width` / `height` | —                    | `Length`. Numbers → `px`.                            |
| `minWidth`    | —                         | CSS `min-width`. Prevents layout collapse when loading. |
| `minHeight`   | —                         | CSS `min-height`.                                    |
| `fit`         | `BoxFit.scaleDown`        | Maps to `object-fit` (§1.21).                        |
| `alignment`   | `"center"`                | `object-position`.                                   |
| `opacity`     | —                         | `0..1` on the `<img>` element.                       |
| `loading`     | `ImageLoading.lazy`       | Native `loading` attribute (§1.23).                  |
| `placeholder` | `ImagePlaceholder.none`   | Enum preset (§1.24). Ignored if `placeholderBuilder$` is set. |
| `placeholderBuilder$` | —                   | Custom JSX until `load`; overrides `placeholder`. |
| `error`       | `ImageError.text`         | Enum preset (§1.25). Ignored if `errorBuilder$` is set. |
| `errorBuilder$` | —                       | Custom JSX on `error`; overrides `error`. |
| _base props_  | —                         | See §0.6.                                            |

> Zero children (zero-slot). Self-closing: `<Image src="…" alt="…" />`. Custom UI uses **builder QRLs**, not named slots.

### Placeholder & error (enums + builders)

| Prop | Flutter analogue | When visible |
| ---- | ---------------- | ------------ |
| `placeholder` | `frameBuilder` (preset) | SSR + until `<img>` `load`; hidden after load or on error. |
| `placeholderBuilder$` | `frameBuilder` (custom) | Same as `placeholder`; **overrides** enum when set. |
| `error` | `errorBuilder` (preset) | On `<img>` `error`; hides `<img>` unless `ImageError.none`. |
| `errorBuilder$` | `errorBuilder` (custom) | Same as `error`; **overrides** enum when set. |
| `loading` | (browser `loading` attr) | Native lazy/eager fetch — separate from placeholder UI. |

**Precedence:** `placeholderBuilder$` > `placeholder`; `errorBuilder$` > `error`. Use `error={ImageError.none}` with **no** `errorBuilder$` to keep the browser broken-image affordance.

**Builders** must be Qwik QRLs (`$((…) => …)`). The implementation wraps builder output in a positioned layer; custom error content is inside a `role="alert"` container (provide visible text or `aria-label` for icon-only UIs).

### Usage

```tsx
{/* Minimal — self-closing */}
<Image src="/hero.jpg" alt="Team working together" width={400} height={240} fit={BoxFit.cover} />

<Image src="/logo.svg" decorative width={48} height={48} fit={BoxFit.contain} />

{/* Eager hero (above the fold) */}
<Image
  src="/banner.png"
  alt="Conference hall"
  width="100%"
  height={200}
  minHeight={200}
  fit={BoxFit.cover}
  loading={ImageLoading.eager}
/>

{/* Placeholder + error enums */}
<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={64}
  height={64}
  minWidth={64}
  minHeight={64}
  fit={BoxFit.cover}
  placeholder={ImagePlaceholder.shimmer}
  error={ImageError.text}
/>

{/* Custom builders (Flutter errorBuilder / frameBuilder parity) */}
<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={64}
  height={64}
  fit={BoxFit.cover}
  placeholderBuilder$={$(() => (
    <Center><Text>Loading…</Text></Center>
  ))}
  errorBuilder$={$(() => (
    <Center><Text color="#b00020">Could not load image</Text></Center>
  ))}
/>

<Stack>
  <Image src="/banner.png" alt="" decorative width="100%" height={200} fit={BoxFit.cover} />
  <Positioned bottom={8} left={8}>
    <Text color="#fff">Caption elsewhere</Text>
  </Positioned>
</Stack>
```

### Flutter equivalent

```dart
Image.network(
  'https://example.com/hero.jpg',
  width: 400,
  height: 240,
  fit: BoxFit.cover,
)

// errorBuilder ≈ errorBuilder$={$(() => <Text>…</Text>)} or error={ImageError.text}
Image.network(
  'https://example.com/avatar.jpg',
  width: 64,
  height: 64,
  fit: BoxFit.cover,
  errorBuilder: (context, error, stackTrace) {
    return Center(child: Text('Could not load image'));
  },
)
// TS/JSX: errorBuilder$={$(() => <Center><Text>Could not load image</Text></Center>)}
```

### Accessibility considerations

- **Meaningful images:** `alt` must describe content or function, not the filename.
- **Decorative images:** `decorative={true}` → `alt=""` + `role="presentation"`.
- **`ImageError.text` / `ImageError.icon`:** implementation sets `role="alert"` on the error layer. Do not rely on color alone.
- **`placeholder` enum / `placeholderBuilder$`:** preset and custom layers use `aria-hidden="true"` on the placeholder layer; wrapper uses `aria-busy="true"` until load.
- **`errorBuilder$`:** wrapper layer uses `role="alert"`; ensure custom content is perceivable (text or `aria-label`).
- **Do not** use `Image` for text — use real text or `Text`.
- If the image is the sole control (e.g. icon button), use `Button` with slotted `<img alt="…">` instead.

### Notes

- **`Image.asset` / bundled assets** — caller resolves paths (`/assets/…`); no build-time asset pipeline in v1.1.
- **`loading` vs `placeholder`:** `loading` is the native `loading` attribute (`ImageLoading`); `placeholder` is the enum preset layer until `load`.
- **`BoxFit.fitWidth` / `fitHeight`** — enum members exist; full CSS mapping deferred in implementation (§22.5). Use `contain` / `cover` until then.
- **`semanticLabel`** → `alt`; **`excludeFromSemantics`** → `decorative`.
- **`color` / `colorBlendMode`** (Flutter tint) — deferred; use `filter` via `style` until v2.
- **`gaplessPlayback`**, **`filterQuality`**, **`repeat`** — not applicable or deferred.
- **Enums + QRL builders, not slots** — presets stay typed; custom content via `placeholderBuilder$` / `errorBuilder$` (Principle #7–#8).

### Future extensibility

| Version | Addition                                                          |
| ------- | ----------------------------------------------------------------- |
| v1.2    | `srcset`, `sizes`; `decoding?: "async" \| "sync" \| "auto"`       |
| v2      | `Image.asset`; LQIP; richer builder context (e.g. `src`, dimensions) |

---

## 19. `Visibility`

Shows or hides a child without removing it from the tree (optionally preserving layout space). Flutter's [`Visibility`](https://api.flutter.dev/flutter/widgets/Visibility-class.html).

### Props

```ts
export interface VisibilityProps extends BaseProps {
  /** When false, child is hidden. Default `true`. */
  visible?: boolean;

  /**
   * When false and `visible` is false, remove from layout (`display: none`).
   * When true, keep box but hide visually (`visibility: hidden` + no pointer events).
   * Default `false`.
   */
  maintainSize?: boolean;

  /**
   * When false and `visible` is false, set `aria-hidden` on the wrapper.
   * Default `true`.
   */
  maintainSemantics?: boolean;
}
```

| Prop                 | Default | Behavior when `visible={false}`                                      |
| -------------------- | ------- | -------------------------------------------------------------------- |
| `visible`            | `true`  | —                                                                    |
| `maintainSize`       | `false` | `false` → `display: none`; `true` → `visibility: hidden`, keeps box |
| `maintainSemantics`  | `true`  | `false` → `aria-hidden="true"` on wrapper                            |
| _base props_         | —       | See §0.6.                                                          |

> Single child (slotted).

### Usage

```tsx
<Visibility visible={isOpen}>
  <Text>Details panel</Text>
</Visibility>

{/* Hidden but still occupies space (skeleton layout) */}
<Visibility visible={false} maintainSize>
  <Container height={200} backgroundColor="#f5f5f5" />
</Visibility>

<Column>
  <Text>Always visible</Text>
  <Visibility visible={showBonus} maintainSemantics={false}>
    <Text>Bonus content (excluded from a11y tree when hidden)</Text>
  </Visibility>
</Column>
```

### Flutter equivalent

```dart
Visibility(
  visible: isOpen,
  child: Text('Details panel'),
)

Visibility(
  visible: false,
  maintainSize: true,
  child: Container(height: 200, color: Color(0xFFF5F5F5)),
)
```

### Accessibility considerations

- When `visible={false}` and `maintainSemantics={true}` (default), wrapper gets **`aria-hidden="true"`** so assistive tech skips hidden content.
- When `maintainSize={true}`, content is invisible but still in the tab order **unless** implementation also sets `inert` or `pointer-events: none` — **v1.1 applies `pointer-events: none` and `inert` when hidden** (extension for safety).
- Prefer conditional rendering (`{show && <Panel />}`) when the hidden subtree is expensive or should not mount — `Visibility` is for cheap toggle / layout preservation.

### Notes

- **`replacement` widget** (Flutter) — deferred; use JSX conditional for alternate UI in v1.1.
- **`maintainState`**, **`maintainAnimation`**, **`maintainInteractivity`** — largely N/A on web/Qwik SSR; see §22.4.
- **`Offstage`** analogue — `maintainSize={true}` + `visible={false}`.

### Future extensibility

| Version | Addition                                                                 |
| ------- | ------------------------------------------------------------------------ |
| v1.2    | Named slot `replacement` when `visible={false}`                          |
| v2      | `maintainState` via Qwik `useVisibleTask$` / resumable hide patterns     |

---

## 20. `Align`

Positions a child within itself according to an `alignment` value. Flutter's [`Align`](https://api.flutter.dev/flutter/widgets/Align-class.html).

### Purpose

`Align` is a **layout** widget: it sizes itself from its parent constraints (or from the child when `widthFactor` / `heightFactor` are set), then places the child at a point on the 9-grid (`Alignment` enum, §1.9). Use it when you need top-left badges, bottom-right FABs, or fractional positioning — not just center.

**`Align` vs `Container.alignment`:** `Container.alignment` turns the container into a flex parent to align children inside a **known box** (you set `width`/`height` on `Container`). `Align` is the Flutter layout primitive for positioning one child within **available space** from the parent; it does not require explicit container dimensions.

**`Align` vs `Center`:** `Center` is sugar for `Align` with `alignment: Alignment.center`. Use `Center` when centering is all you need (§10).

### Props

```ts
export interface AlignProps extends BaseProps {
  /** Where to position the child within this widget. Default `Alignment.center`. */
  alignment?: Alignment;

  /**
   * If set, width = child intrinsic width × factor (0..1).
   * Same semantics as Flutter `widthFactor`.
   */
  widthFactor?: number;

  /**
   * If set, height = child intrinsic height × factor (0..1).
   */
  heightFactor?: number;
}
```

| Prop            | Default              | Notes                                                                 |
| --------------- | -------------------- | --------------------------------------------------------------------- |
| `alignment`     | `Alignment.center`   | Maps to CSS positioning per §1.9 flex/grid context for `Align`.       |
| `widthFactor`   | —                    | Shrinks this widget's width relative to child intrinsic size.         |
| `heightFactor`  | —                    | Shrinks this widget's height relative to child intrinsic size.        |
| _base props_    | —                    | See §0.6.                                                             |

> Single child (slotted). Renders a `<div>` layout wrapper (no `as` prop in v1.1 — layout-only).

### Usage

```tsx
<Container width="100%" height={300} backgroundColor="#f0f0f0">
  <Align alignment={Alignment.bottomRight}>
    <Button onClick$={() => {}}>Action</Button>
  </Align>
</Container>

<Align alignment={Alignment.topLeft} widthFactor={0.5}>
  <Text>Badge</Text>
</Align>

<Stack>
  <Image src="/photo.jpg" alt="Product" width="100%" height={240} fit={BoxFit.cover} />
  <Align alignment={Alignment.topRight}>
    <Container padding={8} backgroundColor="rgba(0,0,0,0.5)" borderRadius={4}>
      <Text color="#fff">Sale</Text>
    </Container>
  </Align>
</Stack>
```

### Flutter equivalent

```dart
Align(
  alignment: Alignment.bottomRight,
  child: ElevatedButton(onPressed: () {}, child: Text('Action')),
)

Align(
  alignment: Alignment.topLeft,
  widthFactor: 0.5,
  child: Text('Badge'),
)
```

### Accessibility considerations

- `Align` is a **non-semantic** layout wrapper (`<div>`). It does not affect reading order — the child remains in DOM order.
- Do not use `Align` to hide content off-screen; use `Visibility` (§19) or conditional rendering.
- When overlaying controls on media (`Stack` + `Align`), ensure interactive children remain keyboard-focusable and have sufficient contrast.

### Notes

- Implementation uses a positioned layout context (e.g. `display: grid` with `place-items` mapping, or `position: relative` + child `position: absolute` per §1.9 stack-style mapping) — chosen for SSR-stable static CSS.
- **`widthFactor` / `heightFactor`** are rarely needed but ship in v1.1 for Flutter parity (moved off `Center`, §10).
- Parent must provide **bounded constraints** for alignment to be visible (e.g. full-size `Container`, `Expanded`, or `Stack`).

### Future extensibility

| Version | Addition                                                |
| ------- | ------------------------------------------------------- |
| v1.2    | Optional `as?: ContainerTag` if a semantic wrapper is needed |
| v2      | `Align.directional` parity when `textDirection` context is formalized |

---

## 21. `AspectRatio`

Sizes its child to respect a width-to-height ratio. Flutter's [`AspectRatio`](https://api.flutter.dev/flutter/widgets/AspectRatio-class.html).

### Purpose

Locks **proportional sizing** for media, tiles, and embeds (16∶9 hero, 1∶1 avatars, 4∶3 cards) without manual `height` math. Maps cleanly to CSS `aspect-ratio` (SSR-friendly, no measurement JS).

### Props

```ts
export interface AspectRatioProps extends BaseProps {
  /**
   * Width / height ratio. Required.
   * `aspectRatio={16/9}` → CSS `aspect-ratio: 16 / 9`.
   */
  aspectRatio: number;
}
```

| Prop           | Default | Notes                                                    |
| -------------- | ------- | -------------------------------------------------------- |
| `aspectRatio`  | (req.)  | Must be `> 0`. Flutter uses `width / height`.            |
| _base props_   | —       | See §0.6.                                                |

> Single child (slotted). Child is clipped or letterboxed by its own `fit` (e.g. `Image` + `BoxFit.cover`).

### Usage

```tsx
<AspectRatio aspectRatio={16 / 9}>
  <Image src="/hero.jpg" alt="Hero banner" width="100%" height="100%" fit={BoxFit.cover} />
</AspectRatio>

<Column>
  <AspectRatio aspectRatio={1}>
    <Container backgroundColor="#eee" alignment={Alignment.center}>
      <Text>1:1 tile</Text>
    </Container>
  </AspectRatio>
</Column>

<Row gap={16}>
  <AspectRatio aspectRatio={4 / 3} style={{ flex: 1 }}>
    <Image src="/a.jpg" alt="Product A" width="100%" height="100%" fit={BoxFit.cover} />
  </AspectRatio>
  <AspectRatio aspectRatio={4 / 3} style={{ flex: 1 }}>
    <Image src="/b.jpg" alt="Product B" width="100%" height="100%" fit={BoxFit.cover} />
  </AspectRatio>
</Row>
```

### Flutter equivalent

```dart
AspectRatio(
  aspectRatio: 16 / 9,
  child: Image.network('https://example.com/hero.jpg', fit: BoxFit.cover),
)
```

### Accessibility considerations

- The wrapper is a non-semantic `<div>`. Meaningful names come from the child (`Image` `alt`, `Text` content).
- Ensure text inside a fixed-ratio box still meets contrast and is not clipped without `overflow` handling on the child.

### Notes

- **Width** comes from the parent constraint; **height** is computed from `aspectRatio` (Flutter parity). If parent has no width, ratio box may collapse — pair with `width="100%"` on parent flex child or `Container`.
- Pairs naturally with **`Image`** (§18) and **`Stack`** overlays.
- Invalid `aspectRatio <= 0` — TypeScript should document; runtime: treat as `1` or dev-only warning (implementation choice, §22.7).

### Future extensibility

| Version | Addition                                      |
| ------- | --------------------------------------------- |
| v1.2    | Optional `fit?: BoxFit` on wrapper (clip child) |
| v2      | `AspectRatioPreset` enum (square, video, portrait) sugar |

---

## 22. Open questions (approval required)

All items **approved** — recorded in §25 decisions #32–42. Retained here as an audit trail. Implementation PRs for v1.1 may proceed.

| ID    | Question | Options | Resolution |
| ----- | -------- | ------- | ---------- |
| 22.1  | **Default `Card.margin`?** Flutter Material applies `EdgeInsets.all(4)`. | (A) No default — caller opts in. (B) Default `margin={4}`. | **(A) Approved** — decision #32. |
| 22.2  | **`Button` + `href`:** auto-render `<a>` or require `as="a"`? | (A) `href` alone → `<a>`. (B) `as="a"` required when `href` set. | **(A) Approved** — decision #33. |
| 22.3  | **`ButtonVariant.elevated` in v1.1?** | (A) Ship all four variants. (B) Ship `filled` / `outlined` / `text` only. | **(A) Approved** — decision #34. |
| 22.4  | **`Visibility` + `inert` when hidden?** | (A) Always add `inert` when `visible={false}`. (B) Only when `maintainSize={true}`. | **(A) Approved** — decision #35. |
| 22.5  | **`Image.fitWidth` / `fitHeight` implementation complexity** | (A) Ship in v1.1. (B) Defer; document `contain`/`cover` workarounds. | **(B) Approved** — decision #36. |
| 22.6  | **v1.1 release grouping** | (A) All widgets in one milestone. (B) Split presentational / interactive / layout. | **(A) Approved** — decision #37. |
| 22.7  | **`AspectRatio` invalid ratio at runtime** | (A) Clamp to `1` + dev warning. (B) Dev warning + render empty. | **(A) Approved** — decision #38. |
| 22.8  | **Button loading state in v1.1?** | (A) Ship `loading?: boolean` in v1.1. (B) Defer to v1.2. | **(B) Approved** — decision #39. |
| 22.9  | **Default `Image` `loading` behavior?** | (A) `loading="lazy"`. (B) `loading="eager"`. | **(A) Approved** — decision #40. |
| 22.10 | **Default semantic tag for `Card`?** | (A) `"div"`. (B) `"article"`. | **(A) Approved** — decision #41. |
| 22.11 | **`Align` implementation strategy?** | (A) CSS Grid (`place-items`). (B) Absolute positioning. | **(A) Approved** — decision #42. |

### 22.8 Button loading state

**Question:** Should `Button` ship with loading support in v1.1?

**Options:**

- **(A)** Ship `loading?: boolean` in v1.1
- **(B)** Defer loading to v1.2

**Recommendation:** **(B)** Defer to v1.2

**Reason:**

- Requires spinner design
- Requires disabled interaction behavior
- Requires accessibility announcements
- Requires future icon support integration
- Better to keep `Button` v1.1 focused and minimal

**Resolution:** **Approved (B)** — decision #39.

---

### 22.9 Image lazy loading

**Question:** What should be the default `loading` behavior for `Image`?

**Options:**

- **(A)** `loading="lazy"`
- **(B)** `loading="eager"`

**Recommendation:** **(A)** `loading="lazy"`

**Reason:**

- Better web performance
- Improves page load speed
- Matches modern web best practices
- Hero images can explicitly opt into eager loading via `loading={ImageLoading.eager}`

**Resolution:** **Approved (A)** — decision #40.

---

### 22.10 Card semantic tag

**Question:** What should be the default semantic tag used by `Card`?

**Options:**

- **(A)** `div`
- **(B)** `article`

**Recommendation:** **(A)** `div`

**Reason:**

- Not all cards represent article content
- More predictable default behavior
- Consumers can use `as="article"` when needed

**Resolution:** **Approved (A)** — decision #41.

---

### 22.11 Align implementation strategy

**Question:** What implementation strategy should `Align` use internally?

**Options:**

- **(A)** CSS Grid (`place-items`)
- **(B)** Absolute positioning

**Recommendation:** **(A)** CSS Grid

**Reason:**

- Simpler implementation
- Better SSR compatibility
- Less CSS complexity
- More predictable sizing behavior
- Easier maintenance

**Resolution:** **Approved (A)** — decision #42.

---

## 23. API consistency review

Findings from a self-review against Principles #1–#10 and the established conventions. All items below have been resolved or updated for v1.1.

### 23.1 Confirmed consistent

- **Naming.** All flex children use `flex?: number`, all clip props use the `Clip` enum, all alignment props use either `Alignment` or `*Alignment` enums per Flutter. Container's `backgroundColor` is distinct from Text's `color` because they're semantically different (background vs foreground).
- **Defaults.** Flex defaults (`crossAxisAlignment: center`, `mainAxisSize: max`) match Flutter. `Stack.clipBehavior: hardEdge` matches Flutter. All other widgets default to `Clip.none` / `overflow: visible`.
- **Children API.** Single-child widgets all accept slotted children (not a `child` prop). Multi-child widgets all accept many slotted children. No widget mixes the two patterns.
- **Type sharing.** `RowProps`/`ColumnProps` both alias `FlexProps`. Every widget extends `BaseProps`. `BorderRadius`, `BoxShadow`, `Gradient`, `BorderSide` are exported from `_shared/types.ts` and used consistently.
- **Folder structure.** All widgets follow `lib/<widget>/{<widget>.tsx, types.ts, index.ts}` (+ optional `*.module.css`).

### 23.2 Decisions encoded since the last review

- `Flexible` is now a v1 widget (§9), and `FlexFit` joins the enum catalog (§1.12). `Expanded`'s note now cross-references `Flexible`.
- `MainAxisSize` already existed (§1.3) — this revision documents its behavior + CSS mapping properly. `Row` and `Column` prop tables now describe `min` vs `max` instead of just listing the type.
- `Alignment` already existed (§1.9) — this revision adds the full CSS mapping table for both flex-context and stack-context consumers.
- `BaseProps` now includes `role` and open `aria-*` / `data-*` index signatures (§2). `data-testid` is no longer special-cased.

### 23.3 [RESOLVED] Semantic HTML `as` prop on `Text`

**Gap:** `Text` always rendering `<span>` violated Principle #2 (Semantic HTML). Headings, paragraphs, and labels need their proper tags for SEO and accessibility.

**Resolution:** `as` prop added to `TextProps` (see §14). Tag union exported as `TextTag`. Default `"span"`.

```ts
as?: TextTag;   // "span" | "p" | "div" | "label" | "h1"..."h6" | "strong" | "em" | "small"
```

### 23.4 [RESOLVED] Semantic HTML `as` prop on `Container`

**Gap:** `Container` always rendering `<div>` was fine for most layout cases, but `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, `<main>` are common and Principle #2 says we should support them.

**Resolution:** `as` prop added to `ContainerProps` (see §5). Tag union exported as `ContainerTag`. Default `"div"`.

```ts
as?: ContainerTag;   // "div" | "section" | "article" | "header" | "footer" | "nav" | "aside" | "main"
```

### 23.5 [RESOLVED] `Wrap.spacing` / `Wrap.runSpacing` naming asymmetry with `Row.gap` / `Column.gap`

**Gap:** Within the same library, you use `gap` on `Row`/`Column` but `spacing`/`runSpacing` on `Wrap`. Inconsistent at first glance.

**Justification for keeping as-is:** Direct Flutter parity. Flutter's `Wrap` uses `spacing` and `runSpacing`; `Row`/`Column` have no `gap` (we added it as an extension). Renaming `Wrap.spacing` to `Wrap.gap` would break parity for a small consistency win.

**Recommendation:** **Keep as-is.** Document the asymmetry in `Wrap`'s notes (already done in §11). No action needed; flagged here so the choice is on the record.

### 23.6 [UPDATED] Event handlers on layout widgets

**Gap:** Layout widgets have no `onClick$`. A clickable card must not use `onClick$` on `Card`/`Container`.

**Resolution:** **Unchanged for layout widgets.** `Button` (§17) is the v1.1 interactive primitive; `Link` / `Tappable` remain v2 (§26). `Card` stays presentational — wrap with `Button` or use `Button` with `href` for navigation.

### 23.7 [RESOLVED] Responsive prop shape (deferred to v2)

**Gap:** Principle #9 promises responsive support; v1 only delivers it via CSS strings (`width="50%"`, `padding="clamp(...)"`).

**Recommendation:** **No change in v1.** A future v2 may add an `OrResponsive<T>` wrapper, e.g.:

```ts
type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };
type ContainerProps = { width?: Responsive<Length>; … };
```

Reserved in the roadmap. Avoid prop-name conflicts in v1 so we can adopt this non-breakingly later.

### 23.8 [RESOLVED] `Length` accepts arbitrary strings

**Gap:** `Length = number | string` lets users pass anything — including invalid CSS. We don't validate.

**Recommendation:** **Keep as-is.** Trying to validate every CSS length expression (`calc(...)`, `clamp(...)`, `min(...)`, `max(...)`, `var(--x)`) is a losing battle. Document that strings are pass-through.

### Summary of review actions

All review items resolved.

| #     | Item                                              | Resolution                                |
| ----- | ------------------------------------------------- | ----------------------------------------- |
| 23.3  | `Text.as` for semantic HTML                       | **Shipped in v1** (see §14).              |
| 23.4  | `Container.as` for semantic HTML                  | **Shipped in v1** (see §5).               |
| 23.5  | `Wrap` spacing-naming asymmetry                   | Kept (Flutter parity).                    |
| 23.6  | Event handlers on layout widgets                  | `Button` in v1.1; layout stays non-interactive. |
| 23.7  | Responsive prop shape                             | Deferred to v2.                           |
| 23.8  | `Length` allows arbitrary strings                 | Kept (pragmatic).                         |

### 23.9 [NEW] v1.1 basic UI + layout consistency

- **`Card` vs `Container`:** `Card` owns surface/elevation defaults; `Container` owns sizing/alignment/constraints. No prop duplication beyond shared decoration types.
- **`Button.color` vs `Text.color`:** both mean foreground; `Container.backgroundColor` remains background.
- **`Image` placeholder/error:** `ImagePlaceholder` / `ImageError` enums + optional `placeholderBuilder$` / `errorBuilder$` — not slots (§1.24–§1.25, §18).
- **`Divider` is zero-slot;** `Visibility` / `Card` / `Button` follow single-child slot convention.
- **`Divider.axis`** reuses `Axis` enum (§1.4) instead of a separate `VerticalDivider` widget.
- **`Image.alt` required** unless `decorative` — stricter than Flutter, aligned with web a11y (Principle #3).
- **`Align` vs `Center`:** `Center` = centered `Align`; factors only on `Align` (§20).
- **`AspectRatio`** uses CSS `aspect-ratio`; no client measurement (Principle #4).

---

## 24. Summary table

| Widget       | Children      | v1? | Key Flutter divergence                                                         |
| ------------ | ------------- | --- | ------------------------------------------------------------------------------ |
| `Row`        | many (slot)   | ✅  | `gap` prop (extension); no `wrap` (use `<Wrap>`).                              |
| `Column`     | many (slot)   | ✅  | Same as `Row`.                                                                 |
| `Container`  | one (slot)    | ✅  | Flat decoration props — no nested `BoxDecoration`. `as` prop for semantic HTML. `clip` v1.1. |
| `SizedBox`   | zero/one      | ✅  | No `.expand` / `.shrink` named ctors.                                          |
| `Spacer`     | none          | ✅  | Identical.                                                                     |
| `Expanded`   | one (slot)    | ✅  | `min-*: 0` applied automatically to avoid CSS flex overflow gotcha.            |
| `Flexible`   | one (slot)    | ✅  | Identical; `FlexFit` enum (§1.12).                                             |
| `Center`     | one (slot)    | ✅  | Convenience `Align`; factors on `Align` (§20), not `Center`.                 |
| `Wrap`       | many (slot)   | ✅  | Uses `WrapAlignment` / `WrapCrossAlignment` enums (Flutter parity).            |
| `Stack`      | many (slot)   | ✅  | Default `clipBehavior` is `Clip.hardEdge` (matches Flutter).                   |
| `Positioned` | one (slot)    | ✅  | No `Positioned.fill` named ctor (use `top={0} right={0} bottom={0} left={0}`). |
| `Text`       | string        | ✅  | Flat style props; `as` prop for semantic HTML; selectable by default; no rich text in v1. |
| `Card`       | one (slot)    | 1.1 | Narrower than `Container`; default `elevation: 1`; shares `ContainerTag`.                |
| `Divider`    | none          | 1.1 | `axis` unifies `Divider` + `VerticalDivider`; `<hr>` when horizontal.                    |
| `Button`     | one (slot)    | 1.1 | First interactive widget; `onClick$`; `ButtonVariant` enum; `href` for links.            |
| `Image`      | none          | 1.1 | `<img>` + `BoxFit` + `ImageLoading`; placeholder/error enums + builder QRLs; `min-*`. |
| `Visibility` | one (slot)    | 1.1 | `maintainSize` / `maintainSemantics`; no `replacement` slot yet.                         |
| `Align`      | one (slot)    | 1.1 | General `Alignment`; `widthFactor` / `heightFactor`; distinct from `Container.alignment`. |
| `AspectRatio`| one (slot)    | 1.1 | Required `aspectRatio`; CSS `aspect-ratio` property.                                    |

---

## 25. Decisions log

v1 decisions (#1–31) resolved. **v1.1 open questions** (#32–42) approved in §22.

| #  | Decision                                                                                          | Resolution                                                              |
| -- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1  | `gap` on `Row` / `Column`                                                                         | Ship.                                                                   |
| 2  | `wrap` boolean on `Row` / `Column` vs separate `<Wrap>` widget                                    | Separate `<Wrap>` (see §11).                                            |
| 3  | `Container` decoration: flat props or nested `decoration={{...}}`                                 | Flat only.                                                              |
| 4  | `EdgeInsets` helper alongside the union type                                                      | Union only.                                                             |
| 5  | Overflow default on `Row` / `Column`                                                              | `visible`.                                                              |
| 6  | Dev-time warnings (e.g. `Expanded` outside a flex parent)                                         | None in v1.                                                             |
| 7  | `SizedBox`                                                                                        | Ship.                                                                   |
| 8  | Component file/export layout                                                                      | One widget per folder (see §0.10).                                      |
| 9  | Strings vs enums for prop values                                                                  | `const`-object enums (see §0.11).                                       |
| 10 | `Container.color` vs `Container.backgroundColor`                                                  | `backgroundColor`.                                                      |
| 11 | Wrap in v1                                                                                        | Included (§11).                                                         |
| 12 | Stack & Positioned in v1                                                                          | Included (§12–§13).                                                     |
| 13 | Text in v1                                                                                        | Included (§14).                                                         |
| 14 | Container scope — `alignment`, constraint props, `boxShadow`, `gradient`, `opacity`, `transform`  | All in v1. **`clip` deferred to v1.1.**                                 |
| 15 | `border` shape                                                                                    | Accept **both** raw CSS string and structured `BorderSide`.             |
| 16 | `borderRadius` per-corner                                                                         | **Object form** `{topLeft, topRight, bottomRight, bottomLeft}`.         |
| 17 | `Text` content                                                                                    | **Child-based** (`<Text>Hello</Text>`).                                 |
| 18 | `Text.selectable` default                                                                         | `true` (web idiom).                                                     |
| 19 | `decorationStyle` and `textTransform`                                                             | **First-class enums** (§1.18, §1.19).                                   |
| 20 | `Stack.clipBehavior` default                                                                      | `Clip.hardEdge` (Flutter parity).                                       |
| 21 | `Clip.none` / `Clip.hardEdge` / `Clip.antiAlias`                                                  | Keep all three (Flutter parity).                                        |
| 22 | `FontWeight.normal` / `FontWeight.bold` aliases                                                   | Keep alongside `w100..w900`.                                            |
| 23 | Package entry                                                                                     | **Single flat entry point**. No subpath imports in v1.                  |
| 24 | `Length` numeric unit                                                                             | Numbers → `px`. No global unit override in v1.                          |
| 25 | **Design Principles documented**                                                                  | 10 principles (top of doc). Used as justification for every decision.   |
| 26 | **`Flexible` widget**                                                                             | **Included in v1** (§9). Ships with `FlexFit` enum (§1.12).             |
| 27 | **`MainAxisSize` documentation**                                                                  | Behavior + CSS-mapping table added (§1.3).                              |
| 28 | **`Alignment` documentation**                                                                     | Full 9-point CSS-mapping table for flex- and stack-context (§1.9).      |
| 29 | **`Text.as` for semantic HTML**                                                                   | **Shipped in v1.** `TextTag` union; default `"span"` (§14).             |
| 30 | **`Container.as` for semantic HTML**                                                              | **Shipped in v1.** `ContainerTag` union; default `"div"` (§5).          |
| 31 | `BaseProps` accessibility passthrough                                                             | `role` + open `aria-*` / `data-*` index signatures (§2).                |
| 32 | **`Card.margin` default** (§22.1)                                                                 | **No default margin** — caller opts in; document Flutter `margin: 4` in examples. |
| 33 | **`Button` + `href`** (§22.2)                                                                     | **Automatically render `<a>`** when `href` is set (no `as="a"` required). |
| 34 | **`ButtonVariant.elevated` in v1.1** (§22.3)                                                      | **Ship `elevated`** alongside `filled`, `outlined`, `text`.               |
| 35 | **`Visibility` hidden behavior** (§22.4)                                                          | **Apply `inert`** (and `pointer-events: none`) when `visible={false}`.   |
| 36 | **`Image` `BoxFit.fitWidth` / `fitHeight`** (§22.5)                                               | **Deferred** — v1.1 ships `fill`, `contain`, `cover`, `none`, `scaleDown` only. |
| 37 | **v1.1 release grouping** (§22.6)                                                                 | **Single milestone** — all seven v1.1 widgets; implement `Button` last.  |
| 38 | **`AspectRatio` invalid ratio** (§22.7)                                                            | **Clamp to `1`** and emit **dev warning** in development builds.          |
| 39 | **`Button` loading state** (§22.8)                                                                | **Defer `loading` prop to v1.2** — keep v1.1 `Button` minimal.            |
| 40 | **`Image` default `loading`** (§22.9)                                                             | **Default `ImageLoading.lazy`** (`loading="lazy"`); heroes opt into `eager`. |
| 41 | **`Card` default semantic tag** (§22.10)                                                          | **Default `as="div"`**; consumers use `as="article"` when appropriate.  |
| 42 | **`Align` implementation** (§22.11)                                                               | **CSS Grid** (`place-items`) — not absolute positioning.                  |
| 43 | **v1.1 `Card` widget**                                                                            | Surface widget §15; shares decoration types; not a `Container` alias.     |
| 44 | **v1.1 `Divider` widget**                                                                         | Unified `axis`; `<hr>` horizontal / `role="separator"` vertical.        |
| 45 | **v1.1 `Button` widget**                                                                          | First interactive primitive; `InteractiveProps`; §0.7 conventions.      |
| 46 | **`ButtonVariant` enum**                                                                          | `filled` / `outlined` / `text` / `elevated` (§1.22).                    |
| 47 | **v1.1 `Image` widget**                                                                           | `<img>` + `alt`/`decorative`; `BoxFit`; `ImageLoading` (§18).           |
| 57 | **`ImagePlaceholder` / `ImageError` enums**                                                        | Preset placeholder/error UI — not slots (§1.24–§1.25, §18).         |
| 58 | **`Image` `minWidth` / `minHeight`**                                                              | `Length` constraints on wrapper (§18).                                |
| 59 | **`Image` `placeholderBuilder$` / `errorBuilder$`**                                                | Custom QRL builders; override enum presets when set (§18).          |
| 48 | **`BoxFit` enum**                                                                                 | Maps to `object-fit` (§1.21).                                           |
| 49 | **v1.1 `Visibility` widget**                                                                      | `maintainSize` + `maintainSemantics`; no `replacement` in v1.1.         |
| 50 | **`ImageLoading` enum**                                                                           | v1.1 `loading` attribute (§1.23).                                       |
| 51 | **`ButtonTag` + `InteractiveProps`**                                                              | §2; interactive widgets only.                                           |
| 52 | **v1.1 `Align` widget**                                                                           | Layout positioning; `widthFactor`/`heightFactor`; §20.                  |
| 53 | **v1.1 `AspectRatio` widget**                                                                     | Required ratio; CSS `aspect-ratio`; §21.                                |
| 54 | **`ButtonSize` enum**                                                                             | Documented §1.24; **not** shipped until v1.2+.                          |
| 55 | **Scrolling widgets**                                                                             | `SingleChildScrollView`, `ListView`, `GridView` → v1.2 roadmap §26.2.   |
| 56 | **Forms + Theming**                                                                               | Roadmap-only §26.3–§26.4; no full API in v1.1.                          |

---

## 26. Roadmap

### Version roadmap summary

Canonical widget list per release. Full specs: layout §3–§14; v1.1 §15–§21; scrolling §26.2; forms/theming §26.3–§26.4.

#### v1.0

- `Container`
- `SizedBox`
- `Row`
- `Column`
- `Spacer`
- `Expanded`
- `Flexible`
- `Center`
- `Wrap`
- `Stack`
- `Positioned`
- `Text`

#### v1.1

- `Card`
- `Divider`
- `Button`
- `Image`
- `Visibility`
- `Align`
- `AspectRatio`

#### v1.2

- `SingleChildScrollView`
- `ListView`
- `GridView`
- `ButtonSize` on `Button` (enum §1.24)

#### Future

- `Form`
- `TextField`
- `TextFormField`
- `Checkbox`
- `Radio`
- `Switch`
- `Dropdown`
- `ThemeProvider`
- `ThemeData`
- `ColorScheme`
- `TextTheme`
- Plus: `Link`, `IconButton`, `Responsive<T>`, animation primitives (see §26.2–§26.4)

---

### v1 — Core (this document)

**Layout widgets (in dependency order):**

1. `Container` — foundational box; everything else composes on it.
2. `SizedBox` — fixed-size box.
3. `Row` — horizontal flex.
4. `Column` — vertical flex.
5. `Spacer` — empty flex filler.
6. `Expanded` — tight-fit flex child.
7. `Flexible` — configurable-fit flex child.
8. `Center` — centered single child.
9. `Wrap` — wrapping flex layout.
10. `Stack` — overlay layout.
11. `Positioned` — absolutely positioned child of `Stack`.

**Basic UI:**

12. `Text` — typography.

### v1.1 — Basic UI + layout (this document, §15–§21)

**Presentational + interactive:**

13. `Card` — elevated surface (§15).
14. `Divider` — separators (§16).
15. `Image` — `<img>` wrapper (§18).
16. `Visibility` — show/hide child (§19).
17. `Align` — child positioning (§20).
18. `AspectRatio` — proportional sizing (§21).
19. `Button` — first interactive primitive (§17); **implement last**.

**Shared additions:** `BoxFit`, `ButtonVariant`, `ImageLoading` enums (§1.21–§1.23); `ButtonTag`, `InteractiveProps` (§2). `ButtonSize` (§1.24) documented only — ships v1.2.

**Implementation sequence (v1 layout — complete):**

1. Author `src/lib/_shared/enums.ts` from §1 (20 enums).
2. Author `src/lib/_shared/types.ts` from §2.
3. Author `src/lib/_shared/index.ts` re-exporting both.
4. Implement widgets in the order listed above.
5. Wire `src/index.ts` as the single package entry (§0.10).
6. Add per-widget unit tests + visual smoke tests in the playground (`src/routes/index.tsx`).

**Implementation sequence (v1.1 — next):**

1. Resolve open questions in §22.
2. Extend `src/lib/_shared/enums.ts` with §1.21–§1.23.
3. Extend `src/lib/_shared/types.ts` with `ButtonTag`, `InteractiveProps`; export `ContainerTag` from §2 centrally.
4. Implement layout batch: `Align`, `AspectRatio`.
5. Implement presentational batch: `Card`, `Divider`, `Image`, `Visibility`.
6. Implement `Button` last.
7. Update `src/index.ts` and playground screens.

### v1.1 — Polish (after v1.1 core)

- `Container.clip: boolean | Clip` (deferred per Decision #14).
- `Container.transformOrigin: Alignment | string`.
- Structured per-side borders (`borderTop`, `borderRight`, `borderBottom`, `borderLeft`).
- `Align` advanced positioning helpers (if any beyond §20).
- `SizedBox.expand` / `SizedBox.shrink` named-constructor helpers (`SizedBox.expand()`, `SizedBox.shrink()`).
- `Positioned.fill` / `Positioned.directional` / `Positioned.fromRect` named-constructor helpers.
- `Text.rich` / `TextSpan` (nested `<Text>` for rich content).

### Scrolling widgets (v1.2)

High-priority — most apps need scrollable regions. **Roadmap-level API** (not final); full spec after v1.1 ships.

#### `SingleChildScrollView`

**Purpose:** Scroll a single child when content overflows the viewport (forms, long detail pages). Flutter's [`SingleChildScrollView`](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html).

**Proposed API (direction):**

```ts
export interface SingleChildScrollViewProps extends BaseProps {
  axis?: Axis;              // default Axis.vertical
  reverse?: boolean;
  padding?: EdgeInsets;
  // scrollController — defer (imperative scroll is v2)
}
```

**Usage (illustrative):**

```tsx
<SingleChildScrollView padding={16}>
  <Column gap={12}>
    <Text as="h1">Profile</Text>
    {/* long form… */}
  </Column>
</SingleChildScrollView>
```

**Flutter equivalent:**

```dart
SingleChildScrollView(
  padding: EdgeInsets.all(16),
  child: Column(children: […]),
)
```

**Notes:**

- Native `overflow: auto` on a wrapper `<div>`; SSR renders scroll container without JS.
- Pair with `Column` / `Row` — not a replacement for `ListView` virtualization.

**Open questions:**

| ID | Question | Options |
| -- | -------- | ------- |
| S1 | **Scrollbar styling** | (A) System scrollbars only. (B) Optional `scrollbar` prop. |
| S2 | **`scrollDirection` naming** | (A) Reuse `Axis`. (B) Separate `ScrollDirection` enum. |
| S3 | **Nested scroll** | Document as caller responsibility or warn in dev? |

---

#### `ListView`

**Purpose:** Scrollable list of children; future support for lazy/builder patterns. Flutter's [`ListView`](https://api.flutter.dev/flutter/widgets/ListView-class.html).

**Proposed API (direction):**

```ts
export interface ListViewProps extends BaseProps {
  axis?: Axis;
  reverse?: boolean;
  padding?: EdgeInsets;
  gap?: Length;           // extension: space between children
  // v1.2: children only (slot)
  // v2: itemBuilder, itemCount (builder pattern)
}
```

**Usage (illustrative):**

```tsx
<ListView padding={8} gap={4}>
  {items.map((item) => (
    <Card key={item.id} padding={12}>
      <Text>{item.title}</Text>
    </Card>
  ))}
</ListView>
```

**Flutter equivalent:**

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, i) => ListTile(title: Text(items[i].title)),
)
```

**Notes:**

- v1.2 **non-virtualized** (all children in DOM) — acceptable for moderate lists; document limits.
- Virtualization (`ListView.builder` parity) is **v2** (needs `useVisibleTask$` / intersection observer).

**Open questions:**

| ID | Question | Options |
| -- | -------- | ------- |
| L1 | **v1.2 scope: builder or children-only?** | (A) Slot children only. (B) Add `itemCount` + `itemBuilder$` in v1.2. |
| L2 | **Separator support** | (A) Manual `<Divider />` between items. (B) `separatorBuilder$` prop. |
| L3 | **Pull-to-refresh** | Defer to v2? |

---

#### `GridView`

**Purpose:** Scrollable grid of children. Flutter's [`GridView`](https://api.flutter.dev/flutter/widgets/GridView-class.html).

**Proposed API (direction):**

```ts
export interface GridViewProps extends BaseProps {
  columns?: number;       // fixed cross-axis count (v1.2)
  gap?: Length;
  padding?: EdgeInsets;
  axis?: Axis;            // scroll direction, default vertical
  // v2: crossAxisCount, maxCrossAxisExtent, childAspectRatio
}
```

**Usage (illustrative):**

```tsx
<GridView columns={2} gap={16} padding={16}>
  {products.map((p) => (
    <AspectRatio key={p.id} aspectRatio={1}>
      <Image src={p.src} alt={p.name} width="100%" height="100%" fit={BoxFit.cover} />
    </AspectRatio>
  ))}
</GridView>
```

**Flutter equivalent:**

```dart
GridView.count(
  crossAxisCount: 2,
  crossAxisSpacing: 16,
  mainAxisSpacing: 16,
  children: […],
)
```

**Notes:**

- CSS `display: grid` inside scroll container for v1.2.
- `childAspectRatio` pairs with `AspectRatio` widget or `grid-auto-rows`.

**Open questions:**

| ID | Question | Options |
| -- | -------- | ------- |
| G1 | **Fixed `columns` vs `maxCrossAxisExtent` first?** | (A) `columns` only in v1.2. (B) Both. |
| G2 | **Responsive columns** | Defer to `Responsive<T>` (v2)? |

---

### Forms (future)

Roadmap-level only — **no frozen prop tables**. Full design after scrolling (v1.2) and theming direction are settled.

| Widget | Purpose | Proposed API direction | Flutter equivalent |
| ------ | ------- | ---------------------- | ------------------ |
| `Form` | Groups fields; validation scope | `onSubmit$`, `autovalidateMode?` enum; slotted fields | [`Form`](https://api.flutter.dev/flutter/widgets/Form-class.html) |
| `TextField` | Single-line / obscure text input | `value`, `onInput$`, `placeholder`, `type`, `disabled`, `maxLength` | [`TextField`](https://api.flutter.dev/flutter/material/TextField-class.html) |
| `TextFormField` | `TextField` + `Form` integration | Extends field props + `validator$`, `required` | [`TextFormField`](https://api.flutter.dev/flutter/material/TextFormField-class.html) |
| `Checkbox` | Boolean toggle | `checked`, `onChange$`, `label` slot or `aria-label` | [`Checkbox`](https://api.flutter.dev/flutter/material/Checkbox-class.html) |
| `Radio` | Exclusive choice in group | `name`, `value`, `checked`, `onChange$` | [`Radio`](https://api.flutter.dev/flutter/material/Radio-class.html) |
| `Switch` | On/off control | `checked`, `onChange$` | [`Switch`](https://api.flutter.dev/flutter/material/Switch-class.html) |
| `Dropdown` | Select from options | `value`, `options`, `onChange$` (native `<select>` first) | [`DropdownButton`](https://api.flutter.dev/flutter/material/DropdownButton-class.html) |

**Validation considerations (future):**

- Client-side validators as `validator$` QRLs returning `string | undefined` (error message).
- `Form`-level submit blocking when any field invalid; `aria-invalid` + `aria-describedby` linking to error `Text`.
- Server Actions / API errors passed via props, not global store (Principle #5).

**Accessibility considerations (future):**

- Real `<input>`, `<select>`, `<textarea>`, `<button type="submit">` — not div-based inputs.
- Labels via slotted `<Text as="label">` + `htmlFor` / `id` pairing convention documented.
- Keyboard: tab order, Space/Enter on checkbox/radio/switch.

**Future extensibility notes:**

- `FormField<T>` generic wrapper pattern (Flutter parity).
- Masking, OTP, autocomplete attributes — v2+.
- Depends on **theming** for consistent focus/error colors (§26.4).

---

### Theming (future)

Roadmap-level only — informs `ButtonSize`, `Divider` colors, and form focus rings. **No public `ThemeProvider` API in v1.1.**

| Piece | Purpose | Flutter equivalent |
| ----- | ------- | ------------------ |
| `ThemeProvider` | Supply theme to descendant widgets | [`Theme`](https://api.flutter.dev/flutter/material/Theme-class.html) / `InheritedWidget` |
| `ThemeData` | Bundle of visual defaults | [`ThemeData`](https://api.flutter.dev/flutter/material/ThemeData-class.html) |
| `ColorScheme` | Semantic colors (primary, surface, error, …) | [`ColorScheme`](https://api.flutter.dev/flutter/material/ColorScheme-class.html) |
| `TextTheme` | Typography scale (display, body, label, …) | [`TextTheme`](https://api.flutter.dev/flutter/material/TextTheme-class.html) |

**Proposed architecture (direction):**

1. **CSS custom properties first** — `ThemeProvider` renders a wrapper that sets `--qfu-primary`, `--qfu-surface`, `--qfu-on-surface`, etc. Widget CSS modules consume `var(--qfu-*)`. SSR-friendly: theme is markup + CSS, no runtime style injection (Principle #4, #7).
2. **Optional context for overrides** — lightweight Qwik context (`useTheme()`) for programmatic access (e.g. charts), not required for static pages.
3. **Dark mode** — `colorScheme` prop or `media` strategy documented; default `prefers-color-scheme` with opt-in class.
4. **Widget defaults** — `Button`, `Card`, `Divider`, `Text` read tokens when props omitted; explicit props always win (§0.6).

**Future considerations:**

- **No theme in v1.1** avoids half-migrated widgets; hard-coded neutrals until provider lands.
- Breaking risk: introducing defaults later must preserve explicit prop overrides (non-breaking).
- May split **`ThemeData`** into `export type` only at first; provider ships when ≥3 widgets consume tokens.
- **Material 3** color roles (`surfaceContainer`, `onSurfaceVariant`) vs M2 simplification — decision deferred.

---

### v2 — Expansion (future)

- **Interactive primitives:** `Link`, `IconButton`, `Tappable` — extends §17 `Button` patterns.
- **Responsive prop shape:** `Responsive<T>` wrapper — addresses §23.7 and Principle #9.
- **Virtualized lists / grids** — builder APIs for `ListView` / `GridView`.
- **Animation:** `AnimatedContainer`, `AnimatedOpacity`, transition primitives.

### Tracking

| Status | Items                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **v1.0** | 12 layout/typography widgets, 20 enums, shared types incl. `ContainerTag`, `TextTag`. |
| **v1.1** | +7 widgets (§15–§21); +5 enums (`BoxFit`, `ButtonVariant`, `ImageLoading`, `ImagePlaceholder`, `ImageError`); `InteractiveProps`; `ButtonSize` doc-only (§1.26). |
| **v1.2** | Scrolling §26.2; `ButtonSize` implementation; polish items. |
| **Future** | Forms §26.3, Theming §26.4, virtualization, `Link`, `Responsive<T>`, animation. |

---

## 27. Final implementation checklist

Concrete, line-item to-do list. Work top-to-bottom within each phase.

### Phase 1 — Shared foundation

- [ ] `src/lib/_shared/enums.ts` — author all v1 enums from §1 (20) + v1.1 enums (§1.21–§1.25):
  - [ ] `MainAxisAlignment`, `CrossAxisAlignment`, `MainAxisSize` (§1.1–§1.3)
  - [ ] `Axis`, `WrapAlignment`, `WrapCrossAlignment` (§1.4–§1.6)
  - [ ] `TextDirection`, `VerticalDirection` (§1.7–§1.8)
  - [ ] `Alignment`, `StackFit`, `Clip`, `FlexFit` (§1.9–§1.12)
  - [ ] `TextAlign`, `TextOverflow`, `FontWeight`, `FontStyle` (§1.13–§1.16)
  - [ ] `TextDecoration`, `TextDecorationStyle`, `TextTransform`, `BorderStyle` (§1.17–§1.20)
- [ ] `src/lib/_shared/types.ts` — author all shared types from §2:
  - [ ] `Length`, `EdgeInsets`, `BorderRadius`
  - [ ] `BaseProps` (with `AriaAttributes` + `DataAttributes` template-literal indices, `role`)
  - [ ] `BoxShadow`, `Gradient`, `BorderSide`
  - [ ] `FlexProps`
  - [ ] `ContainerTag`, `TextTag`, `ButtonTag`, `InteractiveProps` (§2)
- [ ] `src/lib/_shared/index.ts` — barrel re-exports for both files.
- [ ] Unit-test the shared layer: enum identity (`MainAxisAlignment.spaceBetween === "space-between"`), `EdgeInsets` union narrowing, `BaseProps` ARIA/data attribute typechecking.

### Phase 2 — Foundational widgets

Order matters: every widget below depends on `Container` and `SizedBox`.

- [ ] `src/lib/container/{container.tsx, types.ts, index.ts}` — implement `ContainerProps` from §5, including `as` prop.
- [ ] `src/lib/sized-box/{sized-box.tsx, types.ts, index.ts}` — implement `SizedBoxProps` from §6.

### Phase 3 — Flex layout

- [ ] `src/lib/row/{row.tsx, types.ts, index.ts}` — implement `RowProps` (alias of `FlexProps`) from §3, including `mainAxisSize` CSS mapping.
- [ ] `src/lib/column/{column.tsx, types.ts, index.ts}` — implement `ColumnProps` from §4.
- [ ] `src/lib/spacer/{spacer.tsx, types.ts, index.ts}` — implement `SpacerProps` from §7.
- [ ] `src/lib/expanded/{expanded.tsx, types.ts, index.ts}` — implement `ExpandedProps` from §8 (with `min-width: 0; min-height: 0`).
- [ ] `src/lib/flexible/{flexible.tsx, types.ts, index.ts}` — implement `FlexibleProps` from §9 using `FlexFit`.
- [ ] `src/lib/center/{center.tsx, types.ts, index.ts}` — implement `CenterProps` from §10.

### Phase 4 — Multi-axis layout

- [ ] `src/lib/wrap/{wrap.tsx, types.ts, index.ts}` — implement `WrapProps` from §11 with `spacing` / `runSpacing` axis-swap logic.
- [ ] `src/lib/stack/{stack.tsx, types.ts, index.ts}` — implement `StackProps` from §12; default `clipBehavior` to `Clip.hardEdge`; implement `Alignment` mapping for non-positioned children.
- [ ] `src/lib/positioned/{positioned.tsx, types.ts, index.ts}` — implement `PositionedProps` from §13.

### Phase 5 — Typography

- [ ] `src/lib/text/{text.tsx, types.ts, index.ts}` — implement `TextProps` from §14, including `as` prop. Reset browser default styles for non-`span` tags so our typography props remain the source of truth.

### Phase 6 — v1.1 basic UI + layout

> **Gate:** §22 open questions approved.

- [ ] Extend `_shared/enums.ts` — `BoxFit`, `ButtonVariant`, `ImageLoading`, `ImagePlaceholder`, `ImageError` (§1.21–§1.25).
- [ ] Extend `_shared/types.ts` — `ButtonTag`, `InteractiveProps`; centralize `ContainerTag` export (§2).
- [ ] `src/lib/align/` — `AlignProps` from §20.
- [ ] `src/lib/aspect-ratio/` — `AspectRatioProps` from §21.
- [ ] `src/lib/card/` — `CardProps` from §15.
- [ ] `src/lib/divider/` — `DividerProps` from §16.
- [ ] `src/lib/image/` — `ImageProps` from §18 (enums + `placeholderBuilder$` / `errorBuilder$`; `minWidth` / `minHeight`).
- [ ] `src/lib/visibility/` — `VisibilityProps` from §19.
- [ ] `src/lib/button/` — `ButtonProps` from §17 (implement last).
- [ ] Playground screens for all seven v1.1 widgets.

### Phase 7 — Package wiring

- [ ] `src/index.ts` — single flat package entry per §0.10. Re-export every component, every `*Props` type, and `* from "./lib/_shared"`.
- [ ] Verify tree-shaking: an app importing only `Row` should not pull in `Text` or its enums.
- [ ] Verify `package.json` `"main"`, `"module"`, `"types"`, and `"exports"` fields all point at `src/index.ts` (or its build output). No subpath exports.

### Phase 8 — Quality gates

- [ ] Per-widget unit tests covering:
  - Default props produce expected DOM + classes.
  - Each enum value maps to the documented CSS.
  - `BaseProps` passthrough (`class`, `style`, `id`, `role`, `aria-*`, `data-*`).
  - `as` prop renders the correct tag (Container, Text).
- [ ] Visual smoke tests in the playground (`src/routes/index.tsx`) — one screen per widget showing the canonical examples from this doc.
- [ ] SSR check (Principle #4): every widget renders identical markup server-side and client-side, no hydration mismatch warnings.
- [ ] Accessibility check (Principle #3): `axe` clean on every playground screen with default props.
- [ ] Bundle-size sanity (Principle #7): single-widget import + tree-shake should produce < 1 KB gzipped per layout widget (excluding shared baseline).

### Phase 9 — Release

- [ ] Update `README.md` with install + minimal usage example.
- [ ] Add `CHANGELOG.md` with v1.0.0 entry referencing this document as the source of truth.
- [ ] Tag `v1.0.0`.

> Out of scope for this checklist: v1.2 scrolling (§26.2), forms/theming (§26.3–§26.4), and v2 expansion. Separate checklists when those milestones open.
