# qwik-flutter-ui — Public API Design

> **Status:** v1 architecture finalized. All decisions resolved — implementation can begin.
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
- §15 — API consistency review
- §16 — Summary table
- §17 — Decisions log
- §18 — Roadmap
- §19 — Final implementation checklist

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

### 0.7 Naming

- Components: `PascalCase` (matches Flutter).
- Props: `camelCase` (matches Flutter + JS).
- Enums: `PascalCase` type name + `PascalCase` import; member keys are `camelCase` (e.g. `MainAxisAlignment.spaceBetween`) to match Flutter style.
- We keep Flutter prop names (`mainAxisAlignment`) rather than CSS names (`justifyContent`) so Flutter docs translate 1:1.

### 0.8 Overflow

Default `overflow: visible` everywhere except `Stack`, which defaults to `Clip.hardEdge` for Flutter parity. Users opt in to clipping via `Container({ style: { overflow: "hidden" } })` (v1) or future `Container.clip` (v1.1).

### 0.9 Folder structure

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
    └── text/
        ├── text.tsx
        ├── types.ts
        └── index.ts
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

// Prop types
export type { RowProps } from "./lib/row";
export type { ColumnProps } from "./lib/column";
// ...etc

// Shared enums + types
export * from "./lib/_shared";
```

### 0.10 Enums vs string literals

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

### 1.9 `Alignment` — `Container` / `Stack` / `Center`

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

| `Alignment` value | Flex context (`Container`, `Center`) | Stack context (`Stack`) |
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
```

**Notes:**

- `CSSProperties` is imported from `@builder.io/qwik`, not React (Qwik's type is structurally compatible but uses kebab-case-aware keys).
- `AriaAttributes` / `DataAttributes` use template-literal-key index signatures so any `aria-*` or `data-*` attribute typechecks without us having to enumerate them. `data-testid` is no longer a special-cased prop — it's covered by the `data-*` index.
- All widget prop interfaces (`RowProps`, `ColumnProps`, `ContainerProps`, …) extend `BaseProps` either directly or via `FlexProps`, so every widget gets accessibility passthrough for free.

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
- **Overflow defaults to `visible`** (see §0.8).

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

- Equivalent to `Container({ width: '100%', height: '100%', alignment: Alignment.center })`. Shipped because it's idiomatic in Flutter.
- `widthFactor` / `heightFactor` rarely used — **deferred to v1.1** if they complicate implementation.

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

## 15. API consistency review

Findings from a self-review against Principles #1–#10 and the established conventions. All six items below have been resolved — two are now in v1 (§15.3, §15.4); the other four are deferred or kept as-is with rationale recorded.

### 15.1 Confirmed consistent

- **Naming.** All flex children use `flex?: number`, all clip props use the `Clip` enum, all alignment props use either `Alignment` or `*Alignment` enums per Flutter. Container's `backgroundColor` is distinct from Text's `color` because they're semantically different (background vs foreground).
- **Defaults.** Flex defaults (`crossAxisAlignment: center`, `mainAxisSize: max`) match Flutter. `Stack.clipBehavior: hardEdge` matches Flutter. All other widgets default to `Clip.none` / `overflow: visible`.
- **Children API.** Single-child widgets all accept slotted children (not a `child` prop). Multi-child widgets all accept many slotted children. No widget mixes the two patterns.
- **Type sharing.** `RowProps`/`ColumnProps` both alias `FlexProps`. Every widget extends `BaseProps`. `BorderRadius`, `BoxShadow`, `Gradient`, `BorderSide` are exported from `_shared/types.ts` and used consistently.
- **Folder structure.** All 12 widgets follow `lib/<widget>/{<widget>.tsx, types.ts, index.ts}` exactly.

### 15.2 Decisions encoded since the last review

- `Flexible` is now a v1 widget (§9), and `FlexFit` joins the enum catalog (§1.12). `Expanded`'s note now cross-references `Flexible`.
- `MainAxisSize` already existed (§1.3) — this revision documents its behavior + CSS mapping properly. `Row` and `Column` prop tables now describe `min` vs `max` instead of just listing the type.
- `Alignment` already existed (§1.9) — this revision adds the full CSS mapping table for both flex-context and stack-context consumers.
- `BaseProps` now includes `role` and open `aria-*` / `data-*` index signatures (§2). `data-testid` is no longer special-cased.

### 15.3 [RESOLVED] Semantic HTML `as` prop on `Text`

**Gap:** `Text` always rendering `<span>` violated Principle #2 (Semantic HTML). Headings, paragraphs, and labels need their proper tags for SEO and accessibility.

**Resolution:** `as` prop added to `TextProps` (see §14). Tag union exported as `TextTag`. Default `"span"`.

```ts
as?: TextTag;   // "span" | "p" | "div" | "label" | "h1"..."h6" | "strong" | "em" | "small"
```

### 15.4 [RESOLVED] Semantic HTML `as` prop on `Container`

**Gap:** `Container` always rendering `<div>` was fine for most layout cases, but `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, `<main>` are common and Principle #2 says we should support them.

**Resolution:** `as` prop added to `ContainerProps` (see §5). Tag union exported as `ContainerTag`. Default `"div"`.

```ts
as?: ContainerTag;   // "div" | "section" | "article" | "header" | "footer" | "nav" | "aside" | "main"
```

### 15.5 [RESOLVED] `Wrap.spacing` / `Wrap.runSpacing` naming asymmetry with `Row.gap` / `Column.gap`

**Gap:** Within the same library, you use `gap` on `Row`/`Column` but `spacing`/`runSpacing` on `Wrap`. Inconsistent at first glance.

**Justification for keeping as-is:** Direct Flutter parity. Flutter's `Wrap` uses `spacing` and `runSpacing`; `Row`/`Column` have no `gap` (we added it as an extension). Renaming `Wrap.spacing` to `Wrap.gap` would break parity for a small consistency win.

**Recommendation:** **Keep as-is.** Document the asymmetry in `Wrap`'s notes (already done in §11). No action needed; flagged here so the choice is on the record.

### 15.6 [RESOLVED] Event handlers on layout widgets

**Gap:** No layout widget has `onClick$` or any other event handler. A user wanting a clickable card has to wrap `Container` in a `<button>` or `<a>`.

**Justification for keeping as-is:** Layout widgets are intentionally pure layout. Mixing event handlers in would create ambiguity (does `onClick$` on a `Row` fire for the whole row or per-child?) and would require us to decide which element receives the listener. Better to leave this to interactive primitives in a future v2.

**Recommendation:** **Keep as-is for v1.** Document that layout widgets are non-interactive. Add interactive primitives (`Button`, `Link`, `Tappable`) in a future release.

### 15.7 [RESOLVED] Responsive prop shape (deferred to v2)

**Gap:** Principle #9 promises responsive support; v1 only delivers it via CSS strings (`width="50%"`, `padding="clamp(...)"`).

**Recommendation:** **No change in v1.** A future v2 may add an `OrResponsive<T>` wrapper, e.g.:

```ts
type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };
type ContainerProps = { width?: Responsive<Length>; … };
```

Reserved in the roadmap. Avoid prop-name conflicts in v1 so we can adopt this non-breakingly later.

### 15.8 [RESOLVED] `Length` accepts arbitrary strings

**Gap:** `Length = number | string` lets users pass anything — including invalid CSS. We don't validate.

**Recommendation:** **Keep as-is.** Trying to validate every CSS length expression (`calc(...)`, `clamp(...)`, `min(...)`, `max(...)`, `var(--x)`) is a losing battle. Document that strings are pass-through.

### Summary of review actions

All review items resolved.

| #     | Item                                              | Resolution                                |
| ----- | ------------------------------------------------- | ----------------------------------------- |
| 15.3  | `Text.as` for semantic HTML                       | **Shipped in v1** (see §14).              |
| 15.4  | `Container.as` for semantic HTML                  | **Shipped in v1** (see §5).               |
| 15.5  | `Wrap` spacing-naming asymmetry                   | Kept (Flutter parity).                    |
| 15.6  | Event handlers on layout widgets                  | Deferred to v2 interactive primitives.    |
| 15.7  | Responsive prop shape                             | Deferred to v2.                           |
| 15.8  | `Length` allows arbitrary strings                 | Kept (pragmatic).                         |

---

## 16. Summary table

| Widget       | Children      | v1? | Key Flutter divergence                                                         |
| ------------ | ------------- | --- | ------------------------------------------------------------------------------ |
| `Row`        | many (slot)   | ✅  | `gap` prop (extension); no `wrap` (use `<Wrap>`).                              |
| `Column`     | many (slot)   | ✅  | Same as `Row`.                                                                 |
| `Container`  | one (slot)    | ✅  | Flat decoration props — no nested `BoxDecoration`. `as` prop for semantic HTML. `clip` v1.1. |
| `SizedBox`   | zero/one      | ✅  | No `.expand` / `.shrink` named ctors.                                          |
| `Spacer`     | none          | ✅  | Identical.                                                                     |
| `Expanded`   | one (slot)    | ✅  | `min-*: 0` applied automatically to avoid CSS flex overflow gotcha.            |
| `Flexible`   | one (slot)    | ✅  | Identical; `FlexFit` enum (§1.12).                                             |
| `Center`     | one (slot)    | ✅  | `widthFactor` / `heightFactor` deferred to v1.1.                               |
| `Wrap`       | many (slot)   | ✅  | Uses `WrapAlignment` / `WrapCrossAlignment` enums (Flutter parity).            |
| `Stack`      | many (slot)   | ✅  | Default `clipBehavior` is `Clip.hardEdge` (matches Flutter).                   |
| `Positioned` | one (slot)    | ✅  | No `Positioned.fill` named ctor (use `top={0} right={0} bottom={0} left={0}`). |
| `Text`       | string        | ✅  | Flat style props; `as` prop for semantic HTML; selectable by default; no rich text in v1. |

---

## 17. Decisions log

All decisions resolved. No pending items.

| #  | Decision                                                                                          | Resolution                                                              |
| -- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1  | `gap` on `Row` / `Column`                                                                         | Ship.                                                                   |
| 2  | `wrap` boolean on `Row` / `Column` vs separate `<Wrap>` widget                                    | Separate `<Wrap>` (see §11).                                            |
| 3  | `Container` decoration: flat props or nested `decoration={{...}}`                                 | Flat only.                                                              |
| 4  | `EdgeInsets` helper alongside the union type                                                      | Union only.                                                             |
| 5  | Overflow default on `Row` / `Column`                                                              | `visible`.                                                              |
| 6  | Dev-time warnings (e.g. `Expanded` outside a flex parent)                                         | None in v1.                                                             |
| 7  | `SizedBox`                                                                                        | Ship.                                                                   |
| 8  | Component file/export layout                                                                      | One widget per folder (see §0.9).                                       |
| 9  | Strings vs enums for prop values                                                                  | `const`-object enums (see §0.10).                                       |
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

---

## 18. Roadmap

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

**Implementation sequence:**

1. Author `src/lib/_shared/enums.ts` from §1 (20 enums).
2. Author `src/lib/_shared/types.ts` from §2.
3. Author `src/lib/_shared/index.ts` re-exporting both.
4. Implement widgets in the order listed above.
5. Wire `src/index.ts` as the single package entry (§0.9).
6. Add per-widget unit tests + visual smoke tests in the playground (`src/routes/index.tsx`).

### v1.1 — Polish (next milestone)

- `Container.clip: boolean | Clip` (deferred per Decision #14).
- `Container.transformOrigin: Alignment | string`.
- Structured per-side borders (`borderTop`, `borderRight`, `borderBottom`, `borderLeft`).
- `Center.widthFactor` / `Center.heightFactor`.
- `SizedBox.expand` / `SizedBox.shrink` named-constructor helpers (`SizedBox.expand()`, `SizedBox.shrink()`).
- `Positioned.fill` / `Positioned.directional` / `Positioned.fromRect` named-constructor helpers.
- `Text.rich` / `TextSpan` (nested `<Text>` for rich content).

### v2 — Expansion (future)

- **Interactive primitives:** `Button`, `Link`, `Tappable` — addresses §15.6.
- **Responsive prop shape:** `Responsive<T>` wrapper for breakpoint-aware values — addresses §15.7 and Principle #9.
- **Scrolling:** `ListView`, `GridView`, `SingleChildScrollView`.
- **Form primitives:** `Input`, `Checkbox`, `Radio`, `Switch`.
- **Theming:** `ThemeProvider`, design tokens.
- **Animation:** `AnimatedContainer`, `AnimatedOpacity`, transition primitives.

### Tracking

| Status | Items                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **v1** | 12 widgets, 20 enums, 9 shared types (incl. `ContainerTag`, `TextTag`), BaseProps with ARIA/data passthrough, semantic `as` on Container & Text. |
| v1.1   | Container `clip`/`transformOrigin`/structured-per-side-border, Center factors, named ctors, Text.rich.                                 |
| v2     | Interactive primitives, Responsive\<T\>, Scrolling, Form primitives, Theming, Animation.                                               |

---

## 19. Final implementation checklist

Concrete, line-item to-do list for v1. Each box represents a single PR-sized unit of work. Work top-to-bottom; nothing below a checkbox should start until that box is checked.

### Phase 1 — Shared foundation

- [ ] `src/lib/_shared/enums.ts` — author all 20 const-object enums from §1:
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
  - [ ] `ContainerTag`, `TextTag` tag-union types
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

### Phase 6 — Package wiring

- [ ] `src/index.ts` — single flat package entry per §0.9. Re-export every component, every `*Props` type, and `* from "./lib/_shared"`.
- [ ] Verify tree-shaking: an app importing only `Row` should not pull in `Text` or its enums.
- [ ] Verify `package.json` `"main"`, `"module"`, `"types"`, and `"exports"` fields all point at `src/index.ts` (or its build output). No subpath exports.

### Phase 7 — Quality gates

- [ ] Per-widget unit tests covering:
  - Default props produce expected DOM + classes.
  - Each enum value maps to the documented CSS.
  - `BaseProps` passthrough (`class`, `style`, `id`, `role`, `aria-*`, `data-*`).
  - `as` prop renders the correct tag (Container, Text).
- [ ] Visual smoke tests in the playground (`src/routes/index.tsx`) — one screen per widget showing the canonical examples from this doc.
- [ ] SSR check (Principle #4): every widget renders identical markup server-side and client-side, no hydration mismatch warnings.
- [ ] Accessibility check (Principle #3): `axe` clean on every playground screen with default props.
- [ ] Bundle-size sanity (Principle #7): single-widget import + tree-shake should produce < 1 KB gzipped per layout widget (excluding shared baseline).

### Phase 8 — Release

- [ ] Update `README.md` with install + minimal usage example.
- [ ] Add `CHANGELOG.md` with v1.0.0 entry referencing this document as the source of truth.
- [ ] Tag `v1.0.0`.

> Out of scope for this checklist: v1.1 items (see §18) and v2 items (interactive primitives, responsive shape, etc.). Those get their own checklists when their milestones open.
