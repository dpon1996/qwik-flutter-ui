---
title: ModalBottomSheet
description: Declarative bottom-anchored modal sheet for mobile-first action lists, filters, and supplementary workflows.
widget: ModalBottomSheet
category: overlays
flutterEquivalent: showModalBottomSheet
status: shipped
related:
  - Dialog
  - AlertDialog
  - Menu
  - ListView
  - OverlayContainer
  - Button
since: "0.0.1"
examples:
  - id: modalbottomsheet-basic
    file: examples/modalbottomsheet/basic.tsx
    category: basic
  - id: modalbottomsheet-action-sheet
    file: examples/modalbottomsheet/action-sheet.tsx
    category: common
  - id: modalbottomsheet-profile-actions
    file: examples/modalbottomsheet/profile-actions.tsx
    category: common
  - id: modalbottomsheet-filter-panel
    file: examples/modalbottomsheet/filter-panel.tsx
    category: common
  - id: modalbottomsheet-share-options
    file: examples/modalbottomsheet/share-options.tsx
    category: common
  - id: modalbottomsheet-open
    file: examples/modalbottomsheet/open.tsx
    category: open-close
  - id: modalbottomsheet-programmatic-close
    file: examples/modalbottomsheet/programmatic-close.tsx
    category: open-close
  - id: modalbottomsheet-backdrop-dismiss
    file: examples/modalbottomsheet/backdrop-dismiss.tsx
    category: open-close
  - id: modalbottomsheet-drag-dismiss
    file: examples/modalbottomsheet/drag-dismiss.tsx
    category: open-close
  - id: modalbottomsheet-action-list
    file: examples/modalbottomsheet/action-list.tsx
    category: content-layout
  - id: modalbottomsheet-form-content
    file: examples/modalbottomsheet/form-content.tsx
    category: content-layout
  - id: modalbottomsheet-settings-panel
    file: examples/modalbottomsheet/settings-panel.tsx
    category: content-layout
  - id: modalbottomsheet-scrollable-content
    file: examples/modalbottomsheet/scrollable-content.tsx
    category: content-layout
  - id: modalbottomsheet-mobile-action-menu
    file: examples/modalbottomsheet/mobile-action-menu.tsx
    category: mobile
  - id: modalbottomsheet-mobile-sort
    file: examples/modalbottomsheet/mobile-sort.tsx
    category: mobile
  - id: modalbottomsheet-mobile-filter
    file: examples/modalbottomsheet/mobile-filter.tsx
    category: mobile
  - id: modalbottomsheet-mobile-quick-settings
    file: examples/modalbottomsheet/mobile-quick-settings.tsx
    category: mobile
  - id: modalbottomsheet-vs-dialog-dialog
    file: examples/modalbottomsheet/vs-dialog-dialog.tsx
    category: comparison
  - id: modalbottomsheet-vs-dialog-sheet
    file: examples/modalbottomsheet/vs-dialog-sheet.tsx
    category: comparison
  - id: modalbottomsheet-vs-menu-menu
    file: examples/modalbottomsheet/vs-menu-menu.tsx
    category: comparison
  - id: modalbottomsheet-vs-menu-sheet
    file: examples/modalbottomsheet/vs-menu-sheet.tsx
    category: comparison
  - id: modalbottomsheet-composition-listview
    file: examples/modalbottomsheet/composition-listview.tsx
    category: composition
  - id: modalbottomsheet-composition-form
    file: examples/modalbottomsheet/composition-form.tsx
    category: composition
  - id: modalbottomsheet-composition-buttons
    file: examples/modalbottomsheet/composition-buttons.tsx
    category: composition
  - id: modalbottomsheet-composition-selection
    file: examples/modalbottomsheet/composition-selection.tsx
    category: composition
  - id: modalbottomsheet-best-mobile-first
    file: examples/modalbottomsheet/best-mobile-first.tsx
    category: best-practice
  - id: modalbottomsheet-best-concise
    file: examples/modalbottomsheet/best-concise.tsx
    category: best-practice
  - id: modalbottomsheet-best-predictable-actions
    file: examples/modalbottomsheet/best-predictable-actions.tsx
    category: best-practice
  - id: modalbottomsheet-best-easy-dismiss
    file: examples/modalbottomsheet/best-easy-dismiss.tsx
    category: best-practice
  - id: modalbottomsheet-anti-huge-form
    file: examples/modalbottomsheet/anti-huge-form.tsx
    category: anti-pattern
  - id: modalbottomsheet-anti-nested
    file: examples/modalbottomsheet/anti-nested.tsx
    category: anti-pattern
  - id: modalbottomsheet-anti-excessive-actions
    file: examples/modalbottomsheet/anti-excessive-actions.tsx
    category: anti-pattern
  - id: modalbottomsheet-anti-full-page
    file: examples/modalbottomsheet/anti-full-page.tsx
    category: anti-pattern
---

# ModalBottomSheet

## Overview

`ModalBottomSheet` presents a **bottom-anchored modal surface** for temporary workflows — action lists, filters, share options, or short forms. It maps to Flutter's [`showModalBottomSheet`](https://api.flutter.dev/flutter/material/showModalBottomSheet.html).

v1 ships **declarative** open/close only (`open` / `defaultOpen` + `onOpenChange$`). The panel uses **`role="dialog"`** and **`aria-modal="true"`** with the same focus trap and dismiss behavior as [`Dialog`](/docs/widgets/overlays/dialog).

Place an **`OverlayContainer`** ancestor at the app root (inside **`ThemeProvider`**).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Mobile-first interactions** | Full-width sheet anchored to the bottom; thumb-friendly action targets |
| **Contextual actions** | Share, sort, filter, or profile actions triggered from a button |
| **Temporary surfaces** | Opens over the page; dismiss to return to prior context |
| **Supplementary workflows** | Short tasks that do not need a full route or centered dialog |

### When to use ModalBottomSheet

- Mobile action menus and share sheets
- Filter or sort panels with a handful of controls
- Quick settings toggles (not full app settings)
- Supplementary flows on phone-sized viewports

On desktop (≥600px), the sheet renders as a **centered constrained panel** (max 560px) — still usable, but centered **`Dialog`** is often clearer for dense forms.

### ModalBottomSheet vs Dialog vs AlertDialog vs Menu

| | `ModalBottomSheet` | `Dialog` | `AlertDialog` | `Menu` |
| --- | --- | --- | --- | --- |
| **Anchor** | Bottom (mobile) | Center | Center | Near trigger |
| **Modal** | Yes | Yes (default) | Yes | No (Popover-based) |
| **Focus trap** | Yes | Yes | Yes | No |
| **Structure** | Free-form slot | Title / content / actions | Title / content / actions | `MenuItem` list |
| **Best for** | Action lists, filters | Forms, settings | Confirm / warn | 3–6 quick actions at trigger |

---

## Import

```tsx
import {
  Button,
  Checkbox,
  Column,
  Container,
  Dialog,
  Form,
  ListView,
  Menu,
  MenuItem,
  ModalBottomSheet,
  OverlayContainer,
  Radio,
  RadioGroup,
  Row,
  Switch,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working bottom sheet with controlled open state.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Open sheet
        </Button>

        <ModalBottomSheet
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          aria-labelledby="sheet-title"
        >
          <Container padding={24}>
            <Column gap={16}>
              <Text as="h3" id="sheet-title">
                Sheet options
              </Text>
              <Button type="button" onClick$={$(() => {
                open.value = false;
              })}>
                Close
              </Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-basic`).

---

## Common Usage

### Action Sheet

Vertical list of actions — classic mobile pattern.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Actions
        </Button>

        <ModalBottomSheet
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          aria-labelledby="actions-title"
        >
          <Container padding={24}>
            <Column gap={12}>
              <Text as="h3" id="actions-title">
                Choose an action
              </Text>
              <Button type="button" onClick$={close$}>
                Edit
              </Button>
              <Button type="button" onClick$={close$}>
                Duplicate
              </Button>
              <Button type="button" onClick$={close$}>
                Archive
              </Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-action-sheet`).

---

### Profile Actions

Account-related actions from a profile screen.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Profile menu
        </Button>

        <ModalBottomSheet
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          aria-labelledby="profile-title"
        >
          <Container padding={24}>
            <Column gap={12}>
              <Text as="h3" id="profile-title">
                Profile
              </Text>
              <Button type="button" onClick$={close$}>
                Edit profile
              </Button>
              <Button type="button" onClick$={close$}>
                Account settings
              </Button>
              <Button type="button" onClick$={close$}>
                Sign out
              </Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-profile-actions`).

---

### Filter Panel

Short filter controls without leaving the list view.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Checkbox,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Filters
        </Button>

        <ModalBottomSheet
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          aria-labelledby="filter-title"
        >
          <Container padding={24}>
            <Column gap={16}>
              <Text as="h3" id="filter-title">
                Filters
              </Text>
              <Checkbox label="In stock only" />
              <Checkbox label="On sale" />
              <Row gap={8}>
                <Button type="button" onClick$={$(() => {
                  open.value = false;
                })}>
                  Apply
                </Button>
                <Button type="button" onClick$={$(() => {
                  open.value = false;
                })}>
                  Reset
                </Button>
              </Row>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-filter-panel`).

---

### Share Options

Share sheet with outbound actions.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Share
        </Button>

        <ModalBottomSheet
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          aria-labelledby="share-title"
        >
          <Container padding={24}>
            <Column gap={12}>
              <Text as="h3" id="share-title">
                Share link
              </Text>
              <Button type="button" onClick$={close$}>
                Copy link
              </Button>
              <Button type="button" onClick$={close$}>
                Send email
              </Button>
              <Button type="button" onClick$={close$}>
                Message
              </Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-share-options`).

---

## Opening and Closing

| Prop / pattern | Behavior |
| --- | --- |
| **`open`** | Controlled visibility |
| **`defaultOpen`** | Uncontrolled initial state (avoid `true` on modal SSR — dev warning) |
| **`onOpenChange$`** | Fires when open changes; optional dismiss **`reason`** |
| **`dismissOnBackdropClick`** | Default `true` — tap backdrop to close |
| **`dismissOnEscape`** | Default `true` — Escape closes top modal layer |
| **`restoreFocus`** | Default `true` — focus returns to trigger on close |

### Open Bottom Sheet

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Open
        </Button>

        <ModalBottomSheet
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <Container padding={24}>
            <Text>Sheet is open.</Text>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-open`).

---

### Programmatic Close

Close after an action completes.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  const saveAndClose$ = $(async () => {
    await Promise.resolve();
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <ModalBottomSheet open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <Container padding={24}>
            <Button type="button" onClick$={saveAndClose$}>
              Save
            </Button>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-programmatic-close`).

---

### Backdrop Dismiss

Disable with **`dismissOnBackdropClick={false}`** when accidental dismiss is costly.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <ModalBottomSheet
          open={open.value}
          dismissOnBackdropClick={false}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <Container padding={24}>
            <Text>Tap outside does not close this sheet.</Text>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Done
            </Button>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-backdrop-dismiss`).

---

### Drag Dismiss

**Not supported in v1.** Drag gestures, snap points, and fling-to-dismiss are planned for a future release.

Use **backdrop tap**, **Escape**, or an explicit **Close** button. For swipe-down dismiss, wait for a future release or use native platform patterns sparingly.

**Preview**

> **Preview placeholder** — code-only note (`id: modalbottomsheet-drag-dismiss`, `preview: false`).

---

## Content Layout

Recommended structure:

```
ModalBottomSheet
└── Container (padding)
    ├── Heading (id for aria-labelledby)
    ├── Body (actions, form, list)
    └── Primary dismiss / apply action
```

The panel scrolls when content exceeds **max-height** (~85vh).

### Action List

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <ModalBottomSheet open aria-labelledby="list-title">
        <Container padding={24}>
          <Column gap={12}>
            <Text as="h3" id="list-title">
              Actions
            </Text>
            <Button type="button">Rename</Button>
            <Button type="button">Move</Button>
            <Button type="button">Delete</Button>
          </Column>
        </Container>
      </ModalBottomSheet>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-action-list`).

---

### Form Content

Keep forms **short** — one or two fields plus submit.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  Form,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <ModalBottomSheet open aria-labelledby="form-title">
        <Container padding={24}>
          <Text as="h3" id="form-title">
            Add label
          </Text>
          <Form onSubmit$={$(() => {})}>
            <Column gap={16}>
              <TextFormField
                name="label"
                required
                decoration={{ label: "Label name" }}
              />
              <Button type="submit">Add</Button>
            </Column>
          </Form>
        </Container>
      </ModalBottomSheet>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-form-content`).

---

### Settings Panel

Quick toggles — not a full settings app.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const wifi = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <ModalBottomSheet open aria-labelledby="settings-title">
          <Container padding={24}>
            <Column gap={16}>
              <Text as="h3" id="settings-title">
                Quick settings
              </Text>
              <Switch
                label="Wi‑Fi only downloads"
                checked={wifi.value}
                onChange$={$((on) => {
                  wifi.value = on;
                })}
              />
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-settings-panel`).

---

### Scrollable Content

Long lists scroll inside the panel.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  ListView,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const ITEMS = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`);

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <ModalBottomSheet open aria-labelledby="scroll-title">
        <Container padding={24}>
          <Text as="h3" id="scroll-title">
            Pick a city
          </Text>
          <ListView>
            {ITEMS.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </ListView>
        </Container>
      </ModalBottomSheet>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-scrollable-content`).

---

## Mobile Patterns

### Action Menu

Replace overflow menus on narrow viewports with a bottom sheet of full-width buttons.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          More
        </Button>

        <ModalBottomSheet open={open.value} onOpenChange$={$((n) => {
          open.value = n;
        })} aria-labelledby="more-title">
          <Container padding={24}>
            <Column gap={12}>
              <Text as="h3" id="more-title">
                More actions
              </Text>
              <Button type="button" onClick$={close$}>Report</Button>
              <Button type="button" onClick$={close$}>Hide</Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-mobile-action-menu`).

---

### Sort Options

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Radio,
  RadioGroup,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <ModalBottomSheet open aria-labelledby="sort-title">
        <Container padding={24}>
          <Text as="h3" id="sort-title">
            Sort by
          </Text>
          <RadioGroup name="sort" defaultValue="recent">
            <Column gap={8}>
              <Radio value="recent" label="Most recent" />
              <Radio value="price-asc" label="Price: low to high" />
              <Radio value="price-desc" label="Price: high to low" />
            </Column>
          </RadioGroup>
        </Container>
      </ModalBottomSheet>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-mobile-sort`).

---

### Filter Options

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Checkbox,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <ModalBottomSheet open aria-labelledby="filter-mobile-title">
        <Container padding={24}>
          <Column gap={12}>
            <Text as="h3" id="filter-mobile-title">
              Show results for
            </Text>
            <Checkbox label="Electronics" />
            <Checkbox label="Books" />
            <Checkbox label="Home" />
          </Column>
        </Container>
      </ModalBottomSheet>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-mobile-filter`).

---

### Quick Settings

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dark = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <ModalBottomSheet open aria-labelledby="quick-title">
          <Container padding={24}>
            <Column gap={16}>
              <Text as="h3" id="quick-title">
                Display
              </Text>
              <Switch
                label="Dark mode"
                checked={dark.value}
                onChange$={$((on) => {
                  dark.value = on;
                })}
              />
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-mobile-quick-settings`).

---

### Mobile UX recommendations

- Use **full-width buttons** with clear labels — minimum 44px touch targets
- Provide **visible Close** or **Done** when backdrop dismiss is disabled
- Set **`aria-labelledby`** on a heading inside the sheet
- Prefer sheets for **≤8 actions**; more items → consider search or a full page
- Test thumb reach — primary action at the bottom of the sheet content

---

## ModalBottomSheet vs Dialog

| Factor | **Dialog** | **ModalBottomSheet** |
| --- | --- | --- |
| **Desktop** | Centered modal — standard | Centered panel at ≥600px — acceptable |
| **Mobile** | Can feel cramped | Bottom sheet — native-feeling |
| **Content complexity** | Forms, multi-section | Action lists, short filters |
| **Discoverability** | Blocks center — high attention | Slides from bottom — contextual |

### Dialog

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OverlayContainer,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((n) => {
          open.value = n;
        })}>
          <DialogTitle>Edit name</DialogTitle>
          <DialogContent>
            <TextField decoration={{ label: "Name" }} />
          </DialogContent>
          <DialogActions>
            <Button type="button">Save</Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-vs-dialog-dialog`).

---

### ModalBottomSheet

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <ModalBottomSheet open={open.value} onOpenChange$={$((n) => {
          open.value = n;
        })} aria-labelledby="share-title">
          <Container padding={24}>
            <Column gap={12}>
              <Text as="h3" id="share-title">
                Share
              </Text>
              <Button type="button" onClick$={close$}>
                Copy link
              </Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-vs-dialog-sheet`).

---

### Guidance summary

- **Dialog** — confirmations and forms on desktop; critical centered attention
- **ModalBottomSheet** — share sheets, filters, and action lists on mobile
- **AlertDialog** — short binary decisions — not action lists (use sheet or menu)

---

## ModalBottomSheet vs Menu

| Factor | **Menu** | **ModalBottomSheet** |
| --- | --- | --- |
| **Anchor** | Popover at trigger | Bottom of viewport |
| **Modal** | No | Yes — backdrop + focus trap |
| **Action count** | 3–6 items ideal | 4–10+ full-width actions |
| **Mobile ergonomics** | Small target area | Thumb-friendly sheet |
| **Dismiss** | Outside pointer, Escape | Backdrop, Escape, button |

### Menu

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Menu>
        <Button q:slot="trigger" type="button">
          Open menu
        </Button>
        <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Copy</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-vs-menu-menu`).

---

### ModalBottomSheet

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  ModalBottomSheet,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Actions
        </Button>

        <ModalBottomSheet open={open.value} onOpenChange$={$((n) => {
          open.value = n;
        })} aria-labelledby="actions-title">
          <Container padding={24}>
            <Column gap={12}>
              <Text as="h3" id="actions-title">
                Actions
              </Text>
              <Button type="button" onClick$={close$}>Edit</Button>
              <Button type="button" onClick$={close$}>Copy</Button>
              <Button type="button" onClick$={close$}>Share</Button>
              <Button type="button" onClick$={close$}>Archive</Button>
              <Button type="button" onClick$={close$}>Delete</Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-vs-menu-sheet`).

---

### Guidance summary

- **Menu** — few actions near a desktop trigger; lightweight, non-modal
- **ModalBottomSheet** — many actions or mobile layouts; modal focus and backdrop
- On mobile, prefer a sheet over a tiny anchored menu when actions need readable labels

---

## Composition

### ListView

See **Scrollable Content** above — `ListView` inside padded `Container`.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-composition-listview`).

---

### Form

See **Form Content** — short `Form` + `TextFormField` + submit.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-composition-form`).

---

### Buttons

Stack **`Button`** components in **`Column gap`** for action sheets.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-composition-buttons`).

---

### Selection Controls

Combine **`RadioGroup`**, **`Checkbox`**, or **`Switch`** for filter/sort/settings sheets.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-composition-selection`).

---

## Best Practices

### Mobile-first workflows

Open sheets from thumb-zone triggers; full-width actions inside.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-best-mobile-first`).

---

### Concise content

One heading, one purpose — filter, share, or sort — not an entire app section.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-best-concise`).

---

### Predictable actions

Verb labels on every button; primary apply/done at the bottom.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-best-predictable-actions`).

---

### Easy dismissal

Keep **`dismissOnBackdropClick`** enabled unless data loss is possible; always offer **Close** / **Done**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: modalbottomsheet-best-easy-dismiss`).

---

## Anti-Patterns

### Huge forms

**Why:** Sheets are temporary surfaces — multi-step or long forms belong on a route or in **`Dialog`** on desktop.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: modalbottomsheet-anti-huge-form`, `preview: false`).

---

### Deeply nested sheets

**Why:** Each sheet traps focus and stacks modals. Navigate in-page or use a single sheet with steps.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: modalbottomsheet-anti-nested`, `preview: false`).

---

### Excessive actions

**Why:** A dozen equal buttons are hard to scan. Group, paginate, or use **`Menu`** / search.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: modalbottomsheet-anti-excessive-actions`, `preview: false`).

---

### Replacing full pages

**Why:** Sheets supplement the current view — they should not host entire settings or checkout flows. Use routing for persistent workflows.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: modalbottomsheet-anti-full-page`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **`aria-modal`** | `"true"` on the sheet panel |
| **`role`** | `"dialog"` on the panel |
| **Accessible name** | Set **`aria-labelledby`** pointing to a visible heading `id` |
| **Description** | Optional **`aria-describedby`** for helper copy |
| **Focus trapping** | Tab cycles within the sheet while open |
| **Keyboard** | **Escape** closes when `dismissOnEscape={true}` (default) |
| **Dismissal** | Backdrop is a button (decorative); focusable controls remain in the panel |
| **Screen readers** | Announce as dialog; include heading text in the accessible name |

Stacked overlays (sheet + dialog): Escape targets the **topmost** modal layer only.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Closed sheet** | No portal content in SSR HTML when `open={false}` |
| **`defaultOpen={true}`** | Dev warning on SSR — prefer closed on server, open after hydration |
| **Resumability** | Panel mounts client-side when opened; `onOpenChange$` hydrates as QRL |
| **Overlay hydration** | Requires **`OverlayContainer`** ancestor |
| **Static rendering** | Trigger button renders on server; sheet appears only when open on client |

Same overlay SSR rules as [`Dialog`](/docs/widgets/overlays/dialog).

---

## Flutter Equivalent

| Topic | Flutter | qwik-flutter-ui `ModalBottomSheet` |
| --- | --- | --- |
| **API** | `showModalBottomSheet()` imperative | Declarative `open` + `onOpenChange$` |
| **Anchor** | Bottom | Bottom (mobile); centered max-width (desktop) |
| **Drag dismiss** | Supported in Material | **Not in v1** |
| **Snap points** | `DraggableScrollableSheet` etc. | **Not in v1** |
| **Content** | Any `Widget` | JSX slot — `Container`, `Column`, etc. |
| **Focus** | Framework route | Focus trap + restore (overlay layer) |

**Flutter**

```dart
showModalBottomSheet(
  context: context,
  builder: (context) => Column(
    mainAxisSize: MainAxisSize.min,
    children: [
      ListTile(title: Text('Copy link'), onTap: () => Navigator.pop(context)),
      ListTile(title: Text('Share'), onTap: () => Navigator.pop(context)),
    ],
  ),
);
```

**qwik-flutter-ui**

```tsx
<ModalBottomSheet open={open.value} onOpenChange$={$((next) => {
  open.value = next;
})} aria-labelledby="share-title">
  <Container padding={24}>
    <Column gap={12}>
      <Text as="h3" id="share-title">Share</Text>
      <Button type="button" onClick$={close$}>Copy link</Button>
      <Button type="button" onClick$={close$}>Share</Button>
    </Column>
  </Container>
</ModalBottomSheet>
```

Similarities: bottom presentation, modal barrier, temporary surface, action lists.

Differences: declarative open state, no drag/snap in v1, responsive desktop layout, native DOM dialog semantics.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Dialog](/docs/widgets/overlays/dialog) | Centered modal — forms and desktop-first tasks |
| [AlertDialog](/docs/widgets/overlays/alert-dialog) | Blocking confirm — not action lists |
| [Menu](/docs/widgets/overlays/menu) | Lightweight non-modal menu at trigger |
| [ListView](/docs/widgets/layout/listview) | Scrollable lists inside sheet content |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |
| [Button](/docs/widgets/forms/button) | Action sheet items and dismiss controls |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/modalbottomsheet/`
- **`category`** — groups examples (`basic`, `common`, `open-close`, `content-layout`, `mobile`, `comparison`, `composition`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to overlay widgets and layout helpers
- **`flutterEquivalent`** — `showModalBottomSheet`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, set **`aria-labelledby`**, use **`Container padding`** for inset content, and import only from `qwik-flutter-ui`.
