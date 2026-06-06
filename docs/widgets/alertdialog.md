---
title: AlertDialog
description: Blocking confirmation dialog built on Dialog with alertdialog role, title/content/actions structure, and decision-focused workflows.
widget: AlertDialog
category: overlays
flutterEquivalent: AlertDialog
status: shipped
related:
  - Dialog
  - ModalBottomSheet
  - OverlayContainer
  - Button
since: "0.0.1"
examples:
  - id: alertdialog-basic
    file: examples/alertdialog/basic.tsx
    category: basic
  - id: alertdialog-delete
    file: examples/alertdialog/delete.tsx
    category: common
  - id: alertdialog-sign-out
    file: examples/alertdialog/sign-out.tsx
    category: common
  - id: alertdialog-unsaved-changes
    file: examples/alertdialog/unsaved-changes.tsx
    category: common
  - id: alertdialog-permission
    file: examples/alertdialog/permission.tsx
    category: common
  - id: alertdialog-actions-cancel-confirm
    file: examples/alertdialog/actions-cancel-confirm.tsx
    category: actions
  - id: alertdialog-actions-yes-no
    file: examples/alertdialog/actions-yes-no.tsx
    category: actions
  - id: alertdialog-actions-multiple
    file: examples/alertdialog/actions-multiple.tsx
    category: actions
  - id: alertdialog-destructive-delete-record
    file: examples/alertdialog/destructive-delete-record.tsx
    category: destructive
  - id: alertdialog-destructive-remove-account
    file: examples/alertdialog/destructive-remove-account.tsx
    category: destructive
  - id: alertdialog-destructive-reset-settings
    file: examples/alertdialog/destructive-reset-settings.tsx
    category: destructive
  - id: alertdialog-vs-dialog-dialog
    file: examples/alertdialog/vs-dialog-dialog.tsx
    category: comparison
  - id: alertdialog-vs-dialog-alertdialog
    file: examples/alertdialog/vs-dialog-alertdialog.tsx
    category: comparison
  - id: alertdialog-vs-sheet-alertdialog
    file: examples/alertdialog/vs-sheet-alertdialog.tsx
    category: comparison
  - id: alertdialog-vs-sheet-sheet
    file: examples/alertdialog/vs-sheet-sheet.tsx
    category: comparison
  - id: alertdialog-best-concise-title
    file: examples/alertdialog/best-concise-title.tsx
    category: best-practice
  - id: alertdialog-best-concise-content
    file: examples/alertdialog/best-concise-content.tsx
    category: best-practice
  - id: alertdialog-best-clear-labels
    file: examples/alertdialog/best-clear-labels.tsx
    category: best-practice
  - id: alertdialog-best-obvious-consequences
    file: examples/alertdialog/best-obvious-consequences.tsx
    category: best-practice
  - id: alertdialog-anti-long-form
    file: examples/alertdialog/anti-long-form.tsx
    category: anti-pattern
  - id: alertdialog-anti-many-actions
    file: examples/alertdialog/anti-many-actions.tsx
    category: anti-pattern
  - id: alertdialog-anti-unclear-text
    file: examples/alertdialog/anti-unclear-text.tsx
    category: anti-pattern
---

# AlertDialog

## Overview

`AlertDialog` is a **blocking confirmation dialog** for decisions the user must acknowledge before continuing. It maps to Flutter's [`AlertDialog`](https://api.flutter.dev/flutter/material/AlertDialog-class.html) and is built on [`Dialog`](/docs/widgets/overlays/dialog) with default **`role="alertdialog"`**.

Use **`AlertDialogTitle`**, **`AlertDialogContent`**, and **`AlertDialogActions`** for structure. Content description is wired to **`aria-describedby`** automatically when you use **`AlertDialogContent`**.

Place an **`OverlayContainer`** ancestor at the app root (inside **`ThemeProvider`**).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Confirmation workflows** | User confirms or cancels a single decision |
| **Destructive actions** | Delete, remove, reset — state the consequence in title and content |
| **User decisions** | Binary or small set of explicit choices — not open-ended editing |
| **Simple modal interactions** | Always modal; focus trap, backdrop dismiss, and Escape (defaults from `Dialog`) |

### When to use AlertDialog

- Delete or remove confirmations
- Sign-out or discard-changes warnings
- Permission prompts with allow/deny
- Any **short** blocking decision — not forms or long content

### AlertDialog vs Dialog vs ModalBottomSheet

| | `AlertDialog` | `Dialog` | `ModalBottomSheet` |
| --- | --- | --- | --- |
| **Purpose** | Confirm / warn / decide | General modal tasks | Bottom sheet actions |
| **Default role** | `alertdialog` | `dialog` | Sheet panel |
| **Structure** | Title + content + actions | Same subcomponents (Dialog*) | Free-form slot |
| **Content** | Short copy only | Forms, lists, custom layout | Action lists, filters |
| **Always modal** | Yes | Yes (default) | Yes |
| **Best for** | Delete confirm, sign out | Settings, edit profile | Mobile share/menu |

---

## Import

```tsx
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `AlertDialog` with controlled open state.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
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
          Open alert
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Confirm action</AlertDialogTitle>
          <AlertDialogContent>
            <Text>Are you sure you want to continue?</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Button type="button" onClick$={close$}>
              Cancel
            </Button>
            <Button type="button" onClick$={close$}>
              Confirm
            </Button>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-basic`).

---

## Common Usage

### Delete Confirmation

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
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
          Delete item
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Delete this item?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>This action cannot be undone.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button
                type="button"
                variant={ButtonVariant.text}
                onClick$={close$}
              >
                Cancel
              </Button>
              <Button type="button" onClick$={close$}>
                Delete
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-delete`).

---

### Sign Out Confirmation

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
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
          Sign out
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>You will need to sign in again to access your account.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button
                type="button"
                variant={ButtonVariant.text}
                onClick$={close$}
              >
                Cancel
              </Button>
              <Button type="button" onClick$={close$}>
                Sign out
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-sign-out`).

---

### Unsaved Changes Warning

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  const stay$ = $(() => {
    open.value = false;
  });

  const leave$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Leave page
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>Your edits will be lost if you leave without saving.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={stay$}>
                Keep editing
              </Button>
              <Button type="button" onClick$={leave$}>
                Discard changes
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-unsaved-changes`).

---

### Permission Request

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  const deny$ = $(() => {
    open.value = false;
  });

  const allow$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Enable notifications
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Allow notifications?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>
              We will send alerts about messages and account activity.
            </Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={deny$}>
                Not now
              </Button>
              <Button type="button" onClick$={allow$}>
                Allow
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-permission`).

---

## Structure

Recommended layout — always include all three regions for accessibility:

```
AlertDialog
├── AlertDialogTitle      → accessible name (aria-labelledby)
├── AlertDialogContent    → consequence copy (aria-describedby)
└── AlertDialogActions    → decision buttons
```

| Subcomponent | Role |
| --- | --- |
| **`AlertDialogTitle`** | Short question or statement — renders `<h2>` via `DialogTitle` |
| **`AlertDialogContent`** | One or two sentences explaining consequences; auto-registers `id` for `aria-describedby` |
| **`AlertDialogActions`** | Cancel/dismiss + confirm — use **`Row gap`** for horizontal alignment |

Keep copy scannable. The title states the decision; content explains what happens next.

---

## Actions

### Cancel + Confirm

Default pattern — low-emphasis cancel, filled confirm.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Save changes?</AlertDialogTitle>
          <AlertDialogContent>…</AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={close$}>
                Cancel
              </Button>
              <Button type="button" onClick$={close$}>
                Save
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-actions-cancel-confirm`).

---

### Yes / No

Use explicit **Yes** / **No** labels when the title is already a yes/no question.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Enable dark mode?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>You can change this later in settings.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={close$}>
                No
              </Button>
              <Button type="button" onClick$={close$}>
                Yes
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-actions-yes-no`).

---

### Multiple Actions

Limit to **three** actions. Put the safest dismiss action first.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>File already exists</AlertDialogTitle>
          <AlertDialogContent>
            <Text>A file named report.pdf already exists in this folder.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={close$}>
                Cancel
              </Button>
              <Button
                type="button"
                variant={ButtonVariant.outlined}
                onClick$={close$}
              >
                Replace
              </Button>
              <Button type="button" onClick$={close$}>
                Keep both
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-actions-multiple`).

---

### Button ordering recommendations

| Pattern | Order (left → right) |
| --- | --- |
| **Cancel + confirm** | Dismiss (`text` / `outlined`) → primary action (`filled`) |
| **Destructive confirm** | Cancel → verb matching title ("Delete", "Remove") |
| **Yes / No** | No → Yes |
| **Three actions** | Safest dismiss → alternate → primary |

Use **`ButtonVariant.text`** or **`outlined`** for dismiss; **`filled`** for the committing action. Label buttons with **verbs** — not "OK" alone.

---

## Destructive Actions

State the consequence in the **title** and **content**. Use a specific confirm label (**Delete**, **Remove**, **Reset**) — not generic **Confirm**.

Visual emphasis in v1 comes from **label clarity** and **button order**, not a separate destructive button variant.

### Delete Record

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Delete customer record?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>
              All orders and notes for this customer will be permanently removed.
            </Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={close$}>
                Cancel
              </Button>
              <Button type="button" onClick$={close$}>
                Delete
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-destructive-delete-record`).

---

### Remove Account

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Remove your account?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>
              Your profile, projects, and billing history will be deleted
              within 30 days.
            </Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={close$}>
                Keep account
              </Button>
              <Button type="button" onClick$={close$}>
                Remove account
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-destructive-remove-account`).

---

### Reset Settings

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  ButtonVariant,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);
  const close$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Reset all settings?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>
              Notifications, theme, and privacy preferences will return to
              defaults.
            </Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Row gap={8}>
              <Button type="button" variant={ButtonVariant.text} onClick$={close$}>
                Cancel
              </Button>
              <Button type="button" onClick$={close$}>
                Reset settings
              </Button>
            </Row>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-destructive-reset-settings`).

---

## AlertDialog vs Dialog

| Factor | **AlertDialog** | **Dialog** |
| --- | --- | --- |
| **Customization** | Short confirm copy only | Forms, lists, arbitrary layout |
| **Structure** | Fixed title / content / actions | Same slots, general purpose |
| **Decision workflows** | Binary or few explicit choices | Multi-step tasks, editing |
| **Role** | `alertdialog` (default) | `dialog` |

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
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Edit name
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Rename project</DialogTitle>
          <DialogContent>
            <TextField decoration={{ label: "Project name" }} />
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-vs-dialog-dialog`).

---

### AlertDialog

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
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
          Delete
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>This cannot be undone.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Button type="button" onClick$={close$}>
              Delete
            </Button>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-vs-dialog-alertdialog`).

---

### Guidance summary

- **AlertDialog** — user must choose to proceed or stop; copy fits in two short blocks
- **Dialog** — user completes a task (form, picker, review) before closing

---

## AlertDialog vs ModalBottomSheet

| Factor | **AlertDialog** | **ModalBottomSheet** |
| --- | --- | --- |
| **Desktop UX** | Centered modal — standard confirm pattern | Bottom sheet — less common for confirms |
| **Mobile UX** | Acceptable for critical confirms | Better for action menus |
| **Content complexity** | Title + one paragraph + buttons | Lists, multiple rows, icons |
| **Focus** | `alertdialog` semantics | Sheet panel |

### AlertDialog

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
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
        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Delete photo?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>This photo will be removed from your library.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Button type="button" onClick$={close$}>
              Delete
            </Button>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-vs-sheet-alertdialog`).

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
            <Column gap={12}>
              <Button type="button">Copy link</Button>
              <Button type="button">Send message</Button>
            </Column>
          </Container>
        </ModalBottomSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-vs-sheet-sheet`).

---

### Guidance summary

- **AlertDialog** — critical confirmations on any viewport
- **ModalBottomSheet** — non-blocking action lists, especially on mobile
- Do not replace a delete confirm with a sheet of buttons unless platform guidelines require it

---

## Best Practices

### Concise titles

**Source**

```tsx
<AlertDialogTitle>Delete draft?</AlertDialogTitle>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-best-concise-title`).

---

### Concise content

One or two sentences — no scrollable legal text.

**Source**

```tsx
<AlertDialogContent>
  <Text>This draft will be permanently deleted.</Text>
</AlertDialogContent>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-best-concise-content`).

---

### Clear action labels

**Source**

```tsx
<Button type="button" variant={ButtonVariant.text}>Cancel</Button>
<Button type="button">Delete project</Button>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-best-clear-labels`).

---

### Obvious consequences

Title + content should match — user knows what the confirm button does.

**Source**

```tsx
<AlertDialogTitle>Publish to production?</AlertDialogTitle>
<AlertDialogContent>
  <Text>All users will see these changes immediately.</Text>
</AlertDialogContent>
<AlertDialogActions>
  <Button type="button">Publish now</Button>
</AlertDialogActions>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: alertdialog-best-obvious-consequences`).

---

## Anti-Patterns

### Long forms inside AlertDialog

**Source** (avoid)

```tsx
<AlertDialog open={open.value}>
  <AlertDialogTitle>Create account</AlertDialogTitle>
  <AlertDialogContent>
    {/* Multiple TextFormField widgets, long scrollable form */}
  </AlertDialogContent>
</AlertDialog>
```

**Preferred:** Use **`Dialog`** with a **`Form`** or navigate to a dedicated page.

**Why:** Alert dialogs interrupt flow for a single decision — not data entry.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: alertdialog-anti-long-form`, `preview: false`).

---

### Too many actions

**Source** (avoid)

```tsx
<AlertDialogActions>
  <Button>Cancel</Button>
  <Button>Save draft</Button>
  <Button>Discard</Button>
  <Button>Publish</Button>
  <Button>Schedule</Button>
</AlertDialogActions>
```

**Why:** More than three actions dilutes the decision. Use **`Dialog`** or a **`Menu`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: alertdialog-anti-many-actions`, `preview: false`).

---

### Unclear confirmation text

**Source** (avoid)

```tsx
<AlertDialogTitle>Are you sure?</AlertDialogTitle>
<AlertDialogContent>
  <Text>Please confirm.</Text>
</AlertDialogContent>
<AlertDialogActions>
  <Button>OK</Button>
</AlertDialogActions>
```

**Preferred**

```tsx
<AlertDialogTitle>Delete workspace?</AlertDialogTitle>
<AlertDialogContent>
  <Text>All projects in this workspace will be permanently deleted.</Text>
</AlertDialogContent>
<AlertDialogActions>
  <Button>Delete workspace</Button>
</AlertDialogActions>
```

**Why:** Vague copy forces users to guess what they are agreeing to.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: alertdialog-anti-unclear-text`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **`aria-modal`** | `"true"` — always modal |
| **`role`** | Default **`alertdialog`** for blocking confirms; override to **`dialog`** only for non-critical informational alerts |
| **Focus trapping** | Tab cycles within the panel while open |
| **Keyboard** | **Escape** dismisses when `dismissOnEscape` is enabled (default) |
| **Escape behavior** | Topmost modal layer receives Escape |
| **Name** | **`AlertDialogTitle`** → `aria-labelledby` |
| **Description** | **`AlertDialogContent`** → `aria-describedby` (auto-wired) |
| **Action announcements** | Button labels are read when focused; use specific verbs |

Include **`AlertDialogTitle`** and **`AlertDialogContent`** on every alert dialog.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Closed alert** | No portal content in SSR HTML when `open={false}` |
| **`defaultOpen={true}`** | Dev warning on modal SSR — prefer closed on server, open after hydration |
| **Resumability** | Overlay mounts client-side when opened; `onOpenChange$` hydrates as QRL |
| **Overlay hydration** | Requires **`OverlayContainer`** ancestor |
| **Static rendering** | Trigger button renders on server; dialog panel appears only when open on client |

Same overlay SSR rules as [`Dialog`](/docs/widgets/overlays/dialog).

---

## Flutter Equivalent

| Topic | Flutter `AlertDialog` | qwik-flutter-ui `AlertDialog` |
| --- | --- | --- |
| **Structure** | `title`, `content`, `actions` | `AlertDialogTitle`, `AlertDialogContent`, `AlertDialogActions` |
| **API** | Inside `showDialog()` | Declarative `open` + `onOpenChange$` |
| **Dismiss** | `Navigator.pop` | `onOpenChange$(false)` / backdrop / Escape |
| **Role** | Implicit in Material | `role="alertdialog"` default |
| **Built on** | Standalone widget | Wraps `Dialog` — shared overlay stack |

**Flutter**

```dart
showDialog(
  context: context,
  builder: (context) => AlertDialog(
    title: Text('Delete item?'),
    content: Text('This action cannot be undone.'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel')),
      TextButton(onPressed: () => Navigator.pop(context), child: Text('Delete')),
    ],
  ),
);
```

**qwik-flutter-ui**

```tsx
<AlertDialog open={open.value} onOpenChange$={$((next) => {
  open.value = next;
})}>
  <AlertDialogTitle>Delete item?</AlertDialogTitle>
  <AlertDialogContent>
    <Text>This action cannot be undone.</Text>
  </AlertDialogContent>
  <AlertDialogActions>
    <Button type="button" onClick$={close$}>Cancel</Button>
    <Button type="button" onClick$={close$}>Delete</Button>
  </AlertDialogActions>
</AlertDialog>
```

Similarities: title/content/actions layout, modal barrier, confirm/cancel pattern.

Differences: declarative open state, subcomponents for ARIA wiring, shared `Dialog` infrastructure.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Dialog](/docs/widgets/overlays/dialog) | General-purpose modal — forms and custom content |
| [ModalBottomSheet](/docs/widgets/overlays/modal-bottom-sheet) | Bottom sheet for action lists on mobile |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |
| [Button](/docs/widgets/forms/button) | Dismiss and confirm actions in `AlertDialogActions` |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/alertdialog/`
- **`category`** — groups examples (`basic`, `common`, `actions`, `destructive`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to overlay widgets and `Button`
- **`flutterEquivalent`** — `AlertDialog`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, include title and content, use verb button labels, and import only from `qwik-flutter-ui`.
