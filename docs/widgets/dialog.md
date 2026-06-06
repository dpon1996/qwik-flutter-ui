---
title: Dialog
description: Declarative modal dialog with focus trap, backdrop dismiss, and structured title/content/actions subcomponents.
widget: Dialog
category: overlays
flutterEquivalent: showDialog / Dialog
status: shipped
related:
  - AlertDialog
  - ModalBottomSheet
  - Popover
  - OverlayContainer
  - Button
  - Form
since: "0.0.1"
examples:
  - id: dialog-basic
    file: examples/dialog/basic.tsx
    category: basic
  - id: dialog-confirmation
    file: examples/dialog/confirmation.tsx
    category: common
  - id: dialog-settings
    file: examples/dialog/settings.tsx
    category: common
  - id: dialog-edit-profile
    file: examples/dialog/edit-profile.tsx
    category: common
  - id: dialog-custom-content
    file: examples/dialog/custom-content.tsx
    category: common
  - id: dialog-open
    file: examples/dialog/open.tsx
    category: open-close
  - id: dialog-programmatic-close
    file: examples/dialog/programmatic-close.tsx
    category: open-close
  - id: dialog-backdrop-dismiss
    file: examples/dialog/backdrop-dismiss.tsx
    category: open-close
  - id: dialog-escape-dismiss
    file: examples/dialog/escape-dismiss.tsx
    category: open-close
  - id: dialog-title
    file: examples/dialog/title.tsx
    category: content-layout
  - id: dialog-body
    file: examples/dialog/body.tsx
    category: content-layout
  - id: dialog-actions
    file: examples/dialog/actions.tsx
    category: content-layout
  - id: dialog-scrollable-content
    file: examples/dialog/scrollable-content.tsx
    category: content-layout
  - id: dialog-focus-trap
    file: examples/dialog/focus-trap.tsx
    category: focus
  - id: dialog-composition-form
    file: examples/dialog/composition-form.tsx
    category: composition
  - id: dialog-composition-textfield
    file: examples/dialog/composition-textfield.tsx
    category: composition
  - id: dialog-composition-button
    file: examples/dialog/composition-button.tsx
    category: composition
  - id: dialog-composition-listview
    file: examples/dialog/composition-listview.tsx
    category: composition
  - id: dialog-vs-sheet-dialog
    file: examples/dialog/vs-sheet-dialog.tsx
    category: comparison
  - id: dialog-vs-sheet-sheet
    file: examples/dialog/vs-sheet-sheet.tsx
    category: comparison
  - id: dialog-best-concise
    file: examples/dialog/best-concise.tsx
    category: best-practice
  - id: dialog-best-clear-actions
    file: examples/dialog/best-clear-actions.tsx
    category: best-practice
  - id: dialog-best-meaningful-title
    file: examples/dialog/best-meaningful-title.tsx
    category: best-practice
  - id: dialog-anti-very-large
    file: examples/dialog/anti-very-large.tsx
    category: anti-pattern
  - id: dialog-anti-nested
    file: examples/dialog/anti-nested.tsx
    category: anti-pattern
  - id: dialog-anti-many-actions
    file: examples/dialog/anti-many-actions.tsx
    category: anti-pattern
  - id: dialog-anti-passive-info
    file: examples/dialog/anti-passive-info.tsx
    category: anti-pattern
---

# Dialog

## Overview

`Dialog` presents **modal content** above the page — focused tasks, confirmations, or forms that require a user decision before continuing. It maps to Flutter's [`showDialog`](https://api.flutter.dev/flutter/material/showDialog.html) / [`Dialog`](https://api.flutter.dev/flutter/material/Dialog-class.html).

v1 ships **declarative** dialogs only (`open` / `defaultOpen` + `onOpenChange$`). Compose with **`DialogTitle`**, **`DialogContent`**, and **`DialogActions`** for structure and accessibility.

Place an **`OverlayContainer`** ancestor (typically at the app root) so dialogs portal into the overlay stack.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Modal interactions** | Blocks interaction with page content behind the backdrop (when `modal={true}`) |
| **Focus management** | Focus moves into the dialog on open; Tab cycles within the panel; focus restores on close |
| **Blocking workflows** | User must dismiss or complete the dialog before returning to the page |
| **User decisions** | Confirm, cancel, or submit — pair with **`Button`** in **`DialogActions`** |

### When to use Dialog

- Confirm destructive or irreversible actions (prefer **`AlertDialog`** for simple confirms)
- Short forms or settings that do not need a full page
- Custom content that requires focused attention on desktop and tablet

### Dialog vs AlertDialog vs ModalBottomSheet vs Popover

| | `Dialog` | `AlertDialog` | `ModalBottomSheet` | `Popover` |
| --- | --- | --- | --- | --- |
| **Purpose** | General modal panel | Blocking confirm/cancel | Bottom-anchored sheet | Contextual non-modal panel |
| **Default role** | `dialog` | `alertdialog` | N/A (sheet panel) | Anchored popover |
| **Modal** | Yes (default) | Always | Yes | No (default) |
| **Focus trap** | Yes (default) | Yes | Yes | No |
| **Backdrop** | Yes | Yes | Yes | No |
| **Structure** | Title / content / actions | Same subcomponents | Free-form slot | Trigger + content |
| **Best for** | Forms, settings, custom UI | Delete confirms | Mobile action lists | Filters, pickers near trigger |

---

## Import

```tsx
import {
  Button,
  Column,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Form,
  ListView,
  OverlayContainer,
  Row,
  SingleChildScrollView,
  Text,
  TextField,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

import { OverlayDismissReason } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working dialog with controlled open state.

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
          Open dialog
        </Button>

        <Dialog
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <DialogTitle>Hello</DialogTitle>
          <DialogContent>
            <Text>This is a basic dialog.</Text>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-basic`).

---

## Common Usage

### Confirmation Dialog

Simple confirm/cancel — for standardized destructive prompts, consider **`AlertDialog`**.

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
          Discard draft
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Discard unsaved changes?</DialogTitle>
          <DialogContent>
            <Text>Your draft will be lost.</Text>
          </DialogContent>
          <DialogActions>
            <Row gap={8}>
              <Button type="button" onClick$={$(() => {
                open.value = false;
              })}>
                Keep editing
              </Button>
              <Button type="button" onClick$={$(() => {
                open.value = false;
              })}>
                Discard
              </Button>
            </Row>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-confirmation`).

---

### Settings Dialog

Toggle preferences inside a modal.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OverlayContainer,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const notifications = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Notification settings
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Notifications</DialogTitle>
          <DialogContent>
            <Column gap={12}>
              <Switch
                label="Email notifications"
                checked={notifications.value}
                onChange$={$((on) => {
                  notifications.value = on;
                })}
              />
            </Column>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-settings`).

---

### Edit Profile Dialog

Form fields inside dialog content.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Form,
  OverlayContainer,
  Row,
  TextFormField,
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
          Edit profile
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Edit profile</DialogTitle>
          <Form onSubmit$={$(() => {
            open.value = false;
          })}>
            <DialogContent>
              <Column gap={16}>
                <TextFormField
                  name="displayName"
                  decoration={{ label: "Display name" }}
                  defaultValue="Alex Chen"
                />
              </Column>
            </DialogContent>
            <DialogActions>
              <Row gap={8}>
                <Button type="button" onClick$={$(() => {
                  open.value = false;
                })}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </Row>
            </DialogActions>
          </Form>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-edit-profile`).

---

### Custom Content Dialog

Arbitrary layout — not limited to title/body/actions pattern beyond accessibility needs.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Card,
  Column,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
          View summary
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Order summary</DialogTitle>
          <DialogContent>
            <Card padding={16}>
              <Column gap={8}>
                <Text>Subtotal: $42.00</Text>
                <Text>Shipping: $5.99</Text>
                <Text>Total: $47.99</Text>
              </Column>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-custom-content`).

---

## Opening and Closing

| Prop / pattern | Behavior |
| --- | --- |
| **`open`** | Controlled visibility |
| **`defaultOpen`** | Uncontrolled initial state (avoid `true` on modal SSR — dev warning) |
| **`onOpenChange$`** | Fires when open state changes; optional **`OverlayDismissReason`** |
| **`dismissOnBackdropClick`** | Default `true` — backdrop click closes |
| **`dismissOnEscape`** | Default `true` when `modal` — Escape closes top modal layer |
| **`restoreFocus`** | Default `true` — focus returns to trigger on close |

Dismiss reasons: `escape`, `backdrop`, `outsidePointer`, `programmatic`.

### Open Dialog

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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

        <Dialog
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <DialogTitle>Open example</DialogTitle>
          <DialogContent>
            <Text>Dialog is open.</Text>
          </DialogContent>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-open`).

---

### Programmatic Close

Close from a button handler or after async work.

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
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Open
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Save changes</DialogTitle>
          <DialogContent>…</DialogContent>
          <DialogActions>
            <Button type="button" onClick$={saveAndClose$}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-programmatic-close`).

---

### Backdrop Dismiss

Disable with **`dismissOnBackdropClick={false}`** when accidental dismiss is costly.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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

        <Dialog
          open={open.value}
          dismissOnBackdropClick={false}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <DialogTitle>Backdrop locked</DialogTitle>
          <DialogContent>
            <Text>Click outside does not close this dialog.</Text>
          </DialogContent>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-backdrop-dismiss`).

---

### Escape Dismiss

Disable with **`dismissOnEscape={false}`** for mandatory flows.

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

        <Dialog
          open={open.value}
          dismissOnEscape={false}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <DialogTitle>Escape disabled</DialogTitle>
          <DialogContent>
            <Text>Use the action button to close.</Text>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-escape-dismiss`).

---

## Content Layout

Recommended structure: **`DialogTitle`** → **`DialogContent`** → **`DialogActions`**.

| Subcomponent | Role |
| --- | --- |
| **`DialogTitle`** | Accessible name — renders `<h2>`; wires `aria-labelledby` |
| **`DialogContent`** | Body region; optional `id` for `describedBy` |
| **`DialogActions`** | Primary/secondary buttons aligned at the bottom |

The panel scrolls when content exceeds **`max-height`** (default ~85vh).

### Title

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Dialog,
  DialogTitle,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Rename project</DialogTitle>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-title`).

---

### Body

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Invite teammate</DialogTitle>
          <DialogContent>
            <Text>Send an invite link to add someone to your workspace.</Text>
          </DialogContent>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-body`).

---

### Actions

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
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Delete file?</DialogTitle>
          <DialogContent>…</DialogContent>
          <DialogActions>
            <Row gap={8}>
              <Button type="button">Cancel</Button>
              <Button type="button">Delete</Button>
            </Row>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-actions`).

---

### Scrollable Content

Long body content scrolls inside the panel.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  OverlayContainer,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogContent>
            <SingleChildScrollView>
              <Text>{/* Long legal text */}…</Text>
            </SingleChildScrollView>
          </DialogContent>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-scrollable-content`).

---

## Focus Management

When **`modal={true}`** (default):

| Behavior | Default |
| --- | --- |
| **Initial focus** | First focusable element in the panel on open |
| **Focus trap** | Tab / Shift+Tab cycle within the panel |
| **Focus restoration** | `restoreFocus={true}` returns focus to the trigger on close |
| **Escape** | Closes only the **top** modal layer when `dismissOnEscape={true}` |
| **Stacked overlays** | Nested dialog over sheet — Escape targets the topmost modal |

Pass **`labelledBy`** or use **`DialogTitle`** so screen readers announce the dialog name. Pass **`describedBy`** or set **`id`** on **`DialogContent`** for supplementary description.

### Focus trap example

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
  Row,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Focus trap</DialogTitle>
          <DialogContent>
            <TextField decoration={{ label: "Name" }} />
          </DialogContent>
          <DialogActions>
            <Row gap={8}>
              <Button type="button">Cancel</Button>
              <Button type="button">Save</Button>
            </Row>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-focus-trap`).

---

## Composition

### Dialog with Form

Submit closes the dialog from **`onSubmit$`**.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Form,
  OverlayContainer,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Create tag</DialogTitle>
          <DialogContent>
            <Form onSubmit$={$(() => {
              open.value = false;
            })}>
              <Column gap={16}>
                <TextFormField
                  name="tag"
                  required
                  decoration={{ label: "Tag name" }}
                />
                <DialogActions>
                  <Button type="submit">Create</Button>
                </DialogActions>
              </Column>
            </Form>
          </DialogContent>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-composition-form`).

---

### Dialog with TextField

Standalone field outside a form — quick single-value edit.

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
  const open = useSignal(true);
  const name = useSignal("My project");

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Rename</DialogTitle>
          <DialogContent>
            <TextField
              decoration={{ label: "Project name" }}
              value={name.value}
              onInput$={$((v) => {
                name.value = v;
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-composition-textfield`).

---

### Dialog with Button

Action row pattern — cancel + primary.

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
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Publish changes?</DialogTitle>
          <DialogContent>…</DialogContent>
          <DialogActions>
            <Row gap={8}>
              <Button type="button">Cancel</Button>
              <Button type="button">Publish</Button>
            </Row>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-composition-button`).

---

### Dialog with ListView

Selectable list inside a modal.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListView,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const ITEMS = ["Design", "Engineering", "Marketing"];

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Choose team</DialogTitle>
          <DialogContent>
            <ListView>
              {ITEMS.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </ListView>
          </DialogContent>
          <DialogActions>
            <Button type="button">Select</Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-composition-listview`).

---

## Dialog vs ModalBottomSheet

| Factor | **Dialog** | **ModalBottomSheet** |
| --- | --- | --- |
| **Desktop** | Centered panel — familiar modal pattern | Bottom-anchored; max-width on wide screens |
| **Mobile** | Centered (may feel cramped for long lists) | Thumb-friendly bottom sheet |
| **Content density** | Moderate forms and confirms | Action lists, filters, short flows |
| **User expectations** | Focused task or decision | Sheet of options sliding up |

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
          Edit account
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Edit account</DialogTitle>
          <DialogContent>…</DialogContent>
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-vs-sheet-dialog`).

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

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Share
        </Button>

        <ModalBottomSheet open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <Container padding={24}>
            <Column gap={16}>
              <Text as="h3">Share link</Text>
              <Button type="button">Copy link</Button>
              <Button type="button">Send email</Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-vs-sheet-sheet`).

---

### Guidance summary

- **Dialog** — desktop-first modals, short forms, confirmations with custom layout
- **ModalBottomSheet** — mobile action menus, share sheets, filter panels
- **Stack carefully** — Escape closes the topmost modal; avoid deep nesting

---

## Best Practices

### Concise content

**Source**

```tsx
<DialogTitle>Delete project?</DialogTitle>
<DialogContent>
  <Text>This permanently removes the project and all files.</Text>
</DialogContent>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-best-concise`).

---

### Clear actions

One primary action; secondary cancel. Use **`Row gap`** in **`DialogActions`**.

**Source**

```tsx
<DialogActions>
  <Row gap={8}>
    <Button type="button">Cancel</Button>
    <Button type="button">Save</Button>
  </Row>
</DialogActions>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-best-clear-actions`).

---

### Meaningful titles

State the decision — not generic "Confirm".

**Source**

```tsx
<DialogTitle>Remove teammate from workspace?</DialogTitle>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dialog-best-meaningful-title`).

---

## Anti-Patterns

### Very large dialogs

**Why:** Full-page content belongs on a route or dedicated panel — not a modal that traps focus for long reading sessions.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dialog-anti-very-large`, `preview: false`).

---

### Deeply nested dialogs

**Why:** Each layer traps focus and stacks z-index. Prefer a single dialog, a sheet, or navigation to a sub-step.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dialog-anti-nested`, `preview: false`).

---

### Too many actions

**Why:** More than two or three actions confuse the primary path. Use a menu or sheet for many choices.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dialog-anti-many-actions`, `preview: false`).

---

### Dialogs for passive information

**Why:** Read-only info that needs no decision is better as inline content, a **`SnackBar`**, or a non-modal **`Popover`**. Modals interrupt workflow.

**Preferred:** Use **`SnackBar`** for transient feedback; **`AlertDialog`** only when the user must acknowledge.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dialog-anti-passive-info`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **`aria-modal`** | `"true"` on the panel when `modal={true}` |
| **Focus trap** | Tab cycles within the open modal panel |
| **Keyboard** | **Escape** dismisses (when enabled); focusable controls reachable by Tab |
| **Escape behavior** | Only the **top** modal layer receives Escape |
| **Name** | `DialogTitle` → `aria-labelledby`; or explicit **`labelledBy`** |
| **Description** | Optional **`describedBy`** or **`DialogContent`** `id` |
| **Screen readers** | Announce dialog role, name, and focused control |

Always include a **`DialogTitle`** (or `labelledBy`) so the dialog has an accessible name.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Closed dialog** | No portal content in SSR HTML — `open={false}` / default closed |
| **`defaultOpen={true}`** | Dev warning on modal SSR — prefer `open={false}` on server, open after hydration |
| **Resumability** | Overlay markup mounts client-side when opened; `onOpenChange$` hydrates as QRL |
| **Overlay hydration** | Requires **`OverlayContainer`** ancestor; auto-fallback host if omitted |
| **Theme** | Place **`OverlayContainer`** inside **`ThemeProvider`** for token colors |

Dialogs are inherently client-interactive — control open state from signals after hydration for predictable SSR.

---

## Flutter Equivalent

| Topic | Flutter | qwik-flutter-ui `Dialog` |
| --- | --- | --- |
| **API style** | Imperative `showDialog()` | Declarative `open` + `onOpenChange$` |
| **Structure** | `AlertDialog` / custom `Widget` | `DialogTitle` / `DialogContent` / `DialogActions` |
| **Dismiss** | `Navigator.pop` | `onOpenChange$(false)` / backdrop / Escape |
| **Focus** | Framework-managed route | Focus trap + restore in overlay layer |
| **Backdrop** | `barrierDismissible` | `dismissOnBackdropClick` |
| **Imperative helper** | `showDialog` | Deferred v1.8 — use controlled `open` in v1 |

**Flutter**

```dart
showDialog(
  context: context,
  builder: (context) => AlertDialog(
    title: Text('Delete item?'),
    content: Text('This cannot be undone.'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel')),
      TextButton(onPressed: () => Navigator.pop(context), child: Text('Delete')),
    ],
  ),
);
```

**qwik-flutter-ui**

```tsx
<Dialog open={open.value} onOpenChange$={$((next) => {
  open.value = next;
})}>
  <DialogTitle>Delete item?</DialogTitle>
  <DialogContent>
    <Text>This cannot be undone.</Text>
  </DialogContent>
  <DialogActions>
    <Button type="button" onClick$={close$}>Cancel</Button>
    <Button type="button" onClick$={close$}>Delete</Button>
  </DialogActions>
</Dialog>
```

Similarities: modal barrier, title/content/actions structure, dismiss on barrier tap.

Differences: declarative open state, native DOM overlay stack, QRL callbacks, subcomponents for ARIA wiring.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [AlertDialog](/docs/widgets/overlays/alert-dialog) | Preset blocking confirm — built on `Dialog` with `role="alertdialog"` |
| [ModalBottomSheet](/docs/widgets/overlays/modal-bottom-sheet) | Bottom-anchored modal — mobile-friendly alternative |
| [Popover](/docs/widgets/overlays/popover) | Non-modal contextual panel — no focus trap |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |
| [Button](/docs/widgets/forms/button) | Triggers and actions inside dialogs |
| [Form](/docs/widgets/forms/form) | Validated forms inside dialog content |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/dialog/`
- **`category`** — groups examples (`basic`, `common`, `open-close`, `content-layout`, `focus`, `composition`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to overlay widgets and form controls
- **`flutterEquivalent`** — `showDialog` / `Dialog`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, use controlled **`open`** with signals, include **`DialogTitle`**, and import only from `qwik-flutter-ui`.
