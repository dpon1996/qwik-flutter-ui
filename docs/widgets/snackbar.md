---
title: SnackBar
description: Imperative transient feedback via SnackBarHost and enqueueSnackBar — non-blocking status messages with optional actions.
widget: SnackBar
category: overlays
flutterEquivalent: SnackBar
status: shipped
related:
  - Dialog
  - AlertDialog
  - Button
  - AppShell
  - OverlayContainer
since: "0.0.1"
examples:
  - id: snackbar-basic
    file: examples/snackbar/basic.tsx
    category: basic
  - id: snackbar-save-successful
    file: examples/snackbar/save-successful.tsx
    category: common
  - id: snackbar-item-deleted
    file: examples/snackbar/item-deleted.tsx
    category: common
  - id: snackbar-profile-updated
    file: examples/snackbar/profile-updated.tsx
    category: common
  - id: snackbar-network-status
    file: examples/snackbar/network-status.tsx
    category: common
  - id: snackbar-simple-message
    file: examples/snackbar/simple-message.tsx
    category: showing
  - id: snackbar-message-with-action
    file: examples/snackbar/message-with-action.tsx
    category: showing
  - id: snackbar-programmatic-dismiss
    file: examples/snackbar/programmatic-dismiss.tsx
    category: showing
  - id: snackbar-timed-dismiss
    file: examples/snackbar/timed-dismiss.tsx
    category: showing
  - id: snackbar-undo-action
    file: examples/snackbar/undo-action.tsx
    category: actions
  - id: snackbar-retry-action
    file: examples/snackbar/retry-action.tsx
    category: actions
  - id: snackbar-view-details
    file: examples/snackbar/view-details.tsx
    category: actions
  - id: snackbar-vs-dialog-snackbar
    file: examples/snackbar/vs-dialog-snackbar.tsx
    category: comparison
  - id: snackbar-vs-dialog-dialog
    file: examples/snackbar/vs-dialog-dialog.tsx
    category: comparison
  - id: snackbar-vs-alertdialog-alertdialog
    file: examples/snackbar/vs-alertdialog-alertdialog.tsx
    category: comparison
  - id: snackbar-vs-alertdialog-snackbar
    file: examples/snackbar/vs-alertdialog-snackbar.tsx
    category: comparison
  - id: snackbar-composition-action-button
    file: examples/snackbar/composition-action-button.tsx
    category: composition
  - id: snackbar-composition-icons
    file: examples/snackbar/composition-icons.tsx
    category: composition
  - id: snackbar-composition-status-messages
    file: examples/snackbar/composition-status-messages.tsx
    category: composition
  - id: snackbar-best-concise
    file: examples/snackbar/best-concise.tsx
    category: best-practice
  - id: snackbar-best-meaningful-actions
    file: examples/snackbar/best-meaningful-actions.tsx
    category: best-practice
  - id: snackbar-best-no-spam
    file: examples/snackbar/best-no-spam.tsx
    category: best-practice
  - id: snackbar-best-feedback-not-workflows
    file: examples/snackbar/best-feedback-not-workflows.tsx
    category: best-practice
  - id: snackbar-anti-long-messages
    file: examples/snackbar/anti-long-messages.tsx
    category: anti-pattern
  - id: snackbar-anti-multiple-simultaneous
    file: examples/snackbar/anti-multiple-simultaneous.tsx
    category: anti-pattern
  - id: snackbar-anti-confirmations
    file: examples/snackbar/anti-confirmations.tsx
    category: anti-pattern
  - id: snackbar-anti-critical-errors
    file: examples/snackbar/anti-critical-errors.tsx
    category: anti-pattern
---

# SnackBar

## Overview

`SnackBar` delivers **transient, non-blocking feedback** at the bottom of the screen. It maps to Flutter's [`SnackBar`](https://api.flutter.dev/flutter/material/SnackBar-class.html).

Unlike modal overlays, a snack does **not** trap focus or block page interaction. Users keep working while a short message appears, optionally with a single action.

Mount **`SnackBarHost`** once inside **`OverlayContainer`**, then call **`enqueueSnackBar`** from event handlers to show messages.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Transient feedback** | Auto-dismisses after a timeout (default ~4 seconds) |
| **Non-blocking notifications** | Non-modal overlay — page remains interactive |
| **Action confirmations** | Optional one action (e.g. Undo) before the snack closes |
| **Status messages** | Save success, delete notice, connectivity updates |

### When to use SnackBar

- Confirm a background action completed ("Saved", "Copied")
- Offer a lightweight undo for a reversible operation
- Report recoverable errors with a **Retry** action
- Surface low-urgency status without interrupting the user

### SnackBar vs Dialog vs AlertDialog vs Toast

| | `SnackBar` | `Dialog` | `AlertDialog` | Toast (generic) |
| --- | --- | --- | --- | --- |
| **Blocking** | No | Yes (modal) | Yes (modal) | No |
| **Focus trap** | No | Yes | Yes | No |
| **API** | Imperative `enqueueSnackBar` | Declarative `open` | Declarative `open` | Varies by library |
| **Actions** | One optional text action | Multiple buttons | Confirm / cancel | Often none |
| **Best for** | Feedback + optional undo | Forms, settings | Delete confirm | Passive notices |

qwik-flutter-ui ships **`SnackBar`** + **`SnackBarHost`** — there is no separate Toast widget. Use snacks for Material-style transient feedback.

---

## Import

```tsx
import {
  AppShell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
  OverlayContainer,
  SnackBarHost,
  Text,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";
```

Call **`enqueueSnackBar`** (not `enqueueSnackBar$`) inside **`$()`** event handlers.

---

## Basic Example

Smallest working setup: host + one enqueue call.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const showSaved$ = $(() => {
    enqueueSnackBar({ message: "Saved" });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={showSaved$}>
          Save
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-basic`).

---

## Common Usage

### Save Successful

Brief confirmation after a save completes — no modal required.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const save$ = $(async () => {
    await Promise.resolve(); // persist data
    enqueueSnackBar({ message: "Changes saved" });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={save$}>
          Save
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-save-successful`).

---

### Item Deleted

Notify after deletion; pair with an **Undo** action when the operation is reversible (see [Actions](#actions)).

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const deleteItem$ = $(() => {
    // remove item from list
    enqueueSnackBar({
      message: "Item deleted",
      actionLabel: "Undo",
      onAction$: $(() => {
        // restore item
      }),
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={deleteItem$}>
          Delete
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-item-deleted`).

---

### Profile Updated

Lightweight acknowledgment after profile edits.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const updateProfile$ = $(async () => {
    await Promise.resolve();
    enqueueSnackBar({ message: "Profile updated" });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={updateProfile$}>
          Update profile
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-profile-updated`).

---

### Network Status

Report connectivity changes — keep copy short and factual.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const simulateOffline$ = $(() => {
    enqueueSnackBar({
      message: "You are offline",
      duration: 6000,
    });
  });

  const simulateOnline$ = $(() => {
    enqueueSnackBar({ message: "Back online" });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={simulateOffline$}>
          Simulate offline
        </Button>
        <Button type="button" onClick$={simulateOnline$}>
          Simulate online
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-network-status`).

---

## Showing SnackBars

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| **`message`** | `string` | — | Visible snack text (required) |
| **`actionLabel`** | `string` | — | Optional action button label |
| **`onAction$`** | `QRL<() => void>` | — | Runs when action is clicked; snack dismisses after |
| **`onDismiss$`** | `QRL<() => void>` | — | Runs when snack is dismissed (timer, action, or queue promotion) |
| **`duration`** | `number` (ms) | `4000` | Auto-dismiss delay; `0` disables the timer |

### Simple Message

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const notify$ = $(() => {
    enqueueSnackBar({ message: "Link copied" });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={notify$}>
          Copy link
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-simple-message`).

---

### Message with Action

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const deleteWithUndo$ = $(() => {
    enqueueSnackBar({
      message: "Draft discarded",
      actionLabel: "Undo",
      onAction$: $(() => {
        // restore draft
      }),
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={deleteWithUndo$}>
          Discard draft
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-message-with-action`).

---

### Programmatic Dismiss

The host owns dismiss timing. Snacks close when:

1. **Auto-dismiss timer** fires (default 4 seconds)
2. **Action button** is clicked — runs `onAction$`, then dismisses
3. **Next queued snack** promotes when the visible one closes

Use **`onDismiss$`** to react when a snack closes. Set **`duration: 0`** to keep a snack visible until the user clicks the action or it is replaced by the queue.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  Text,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const status = useSignal("");

  const showPersistent$ = $(() => {
    enqueueSnackBar({
      message: "Syncing…",
      duration: 0,
      actionLabel: "Dismiss",
      onDismiss$: $(() => {
        status.value = "Snack dismissed";
      }),
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={showPersistent$}>
          Start sync
        </Button>
        <Text>{status.value}</Text>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-programmatic-dismiss`).

---

### Timed Dismiss

Override the default duration for longer or shorter visibility.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const showBrief$ = $(() => {
    enqueueSnackBar({ message: "Copied", duration: 2000 });
  });

  const showLong$ = $(() => {
    enqueueSnackBar({
      message: "Check your email for a verification link",
      duration: 8000,
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={showBrief$}>
          Brief (2s)
        </Button>
        <Button type="button" onClick$={showLong$}>
          Long (8s)
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-timed-dismiss`).

---

## Actions

One optional action per snack. Use a **short verb** label — the host renders it as an uppercase text button.

### Undo Action

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const remove$ = $(() => {
    enqueueSnackBar({
      message: "Photo removed",
      actionLabel: "Undo",
      onAction$: $(() => {
        // re-insert photo
      }),
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={remove$}>
          Remove photo
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-undo-action`).

---

### Retry Action

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const upload$ = $(async () => {
    try {
      await Promise.reject(new Error("network"));
    } catch {
      enqueueSnackBar({
        message: "Upload failed",
        actionLabel: "Retry",
        onAction$: upload$,
        duration: 6000,
      });
    }
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={upload$}>
          Upload
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-retry-action`).

---

### View Details

Navigate or open a panel from the action — keep navigation logic in `onAction$`.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  Text,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const detailsOpen = useSignal(false);

  const notifyNewMessage$ = $(() => {
    enqueueSnackBar({
      message: "New message received",
      actionLabel: "View",
      onAction$: $(() => {
        detailsOpen.value = true;
      }),
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={notifyNewMessage$}>
          Simulate message
        </Button>
        {detailsOpen.value ? <Text>Message details</Text> : null}
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-view-details`).

---

### Recommended action patterns

- **One action maximum** — use a verb (`Undo`, `Retry`, `View`)
- **Dismiss after action** — the host closes the snack automatically after `onAction$`
- **Reversible ops → Undo** — destructive list actions with a short undo window
- **Recoverable errors → Retry** — extend `duration` so users have time to act
- **Navigation → View** — open details inline or route; do not nest modals inside the snack

---

## Placement

| Topic | Behavior |
| --- | --- |
| **Default placement** | Bottom center, fixed overlay above page content |
| **Stacking** | **One visible snack at a time** — additional calls enqueue in **FIFO** order |
| **Promotion** | When the visible snack dismisses, the next pending snack shows immediately |
| **AppShell** | Place **`SnackBarHost`** inside **`OverlayContainer`** at the app root — sibling to **`AppShell`**, not inside `<main>` |
| **Bottom navigation** | Snacks render above the viewport bottom edge; may overlap **`BottomNavigationBar`** — keep messages short |

The snack viewport uses **non-modal** overlay registration — it does not block pointer events on the page behind it.

**Typical app structure**

```tsx
<ThemeProvider theme={{}}>
  <OverlayContainer>
    <SnackBarHost />
    <AppShell appBar={/* … */} bottomNavigationBar={/* … */}>
      {/* page content */}
    </AppShell>
  </OverlayContainer>
</ThemeProvider>
```

---

## SnackBar vs Dialog

| Factor | **SnackBar** | **Dialog** |
| --- | --- | --- |
| **Blocking** | Non-blocking | Modal — blocks page |
| **Purpose** | Feedback | Decision-making, forms |
| **Interruption** | Low — user keeps working | High — requires dismiss |
| **Focus** | No trap | Focus trapped |
| **API** | Imperative enqueue | Declarative `open` |

### SnackBar

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const save$ = $(async () => {
    await Promise.resolve();
    enqueueSnackBar({ message: "Saved" });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={save$}>
          Save
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-vs-dialog-snackbar`).

---

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
          Edit settings
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <TextField decoration={{ label: "Display name" }} />
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-vs-dialog-dialog`).

---

### Guidance summary

- **SnackBar** — "done" feedback after an action the user already initiated
- **Dialog** — editing, multi-field input, or tasks that need focused attention
- Never use a snack when the user must read long content or make a blocking choice

---

## SnackBar vs AlertDialog

| Factor | **AlertDialog** | **SnackBar** |
| --- | --- | --- |
| **Confirmations** | Explicit cancel / confirm | Not for confirmations |
| **Feedback** | Rare — short warnings only | Primary use case |
| **Urgency** | High — blocks until resolved | Low — informational |
| **Destructive actions** | Delete confirm with clear consequences | Post-delete undo only |

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
          Delete account
        </Button>

        <AlertDialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogContent>
            <Text>This permanently removes your data.</Text>
          </AlertDialogContent>
          <AlertDialogActions>
            <Button type="button" onClick$={close$}>Cancel</Button>
            <Button type="button" onClick$={close$}>Delete</Button>
          </AlertDialogActions>
        </AlertDialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-vs-alertdialog-alertdialog`).

---

### SnackBar

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  SnackBarHost,
  ThemeProvider,
  enqueueSnackBar,
} from "qwik-flutter-ui";

export default component$(() => {
  const deleteItem$ = $(() => {
    enqueueSnackBar({
      message: "Item deleted",
      actionLabel: "Undo",
      onAction$: $(() => {
        // restore
      }),
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Button type="button" onClick$={deleteItem$}>
          Delete item
        </Button>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-vs-alertdialog-snackbar`).

---

### Guidance summary

- **AlertDialog** — user must confirm before an irreversible action proceeds
- **SnackBar** — inform after the fact; offer **Undo** only when reversal is safe and immediate
- Do not ask "Are you sure?" in a snack — use **`AlertDialog`**

---

## Composition

`SnackBar` is rendered by **`SnackBarHost`** from queue state. Compose via **`enqueueSnackBar`** options — not by mounting `<SnackBar />` directly in app code.

### Action Button

Pass **`actionLabel`** + **`onAction$`**.

**Source**

```tsx
enqueueSnackBar({
  message: "Archived",
  actionLabel: "Undo",
  onAction$: $(() => {
    /* restore */
  }),
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-composition-action-button`).

---

### Icons

v1 accepts a **`message`** string only — no icon slot. Prefix status with concise text or a single Unicode symbol when helpful.

**Source**

```tsx
enqueueSnackBar({ message: "✓ Saved successfully" });
enqueueSnackBar({ message: "⚠ Connection unstable", duration: 6000 });
```

Keep symbols accessible: the full message is announced to screen readers.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-composition-icons`).

---

### Status Messages

Use factual, present-tense copy for outcomes and connectivity.

**Source**

```tsx
enqueueSnackBar({ message: "Changes saved" });
enqueueSnackBar({ message: "Sync complete" });
enqueueSnackBar({ message: "Working offline", duration: 5000 });
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-composition-status-messages`).

---

## Best Practices

### Keep messages concise

One line, under ~60 characters when possible.

**Source**

```tsx
// Good
enqueueSnackBar({ message: "Saved" });

// Avoid
enqueueSnackBar({
  message:
    "Your profile settings have been successfully saved to our servers and will sync across devices.",
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-best-concise`).

---

### Provide meaningful actions

Action labels should describe the outcome — **Undo**, **Retry**, **View** — not **OK**.

**Source**

```tsx
enqueueSnackBar({
  message: "Upload failed",
  actionLabel: "Retry",
  onAction$: retryUpload$,
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-best-meaningful-actions`).

---

### Avoid notification spam

Debounce repeated events; rely on the FIFO queue instead of firing many snacks at once.

**Source**

```tsx
// Debounce save feedback — one snack per save, not per keystroke
const save$ = $(async () => {
  await persist();
  enqueueSnackBar({ message: "Saved" });
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-best-no-spam`).

---

### Use for feedback, not workflows

Snacks acknowledge results — they do not replace forms, wizards, or settings pages.

**Source**

```tsx
// Good — feedback after submit
enqueueSnackBar({ message: "Comment posted" });

// Avoid — multi-step workflow in a snack
// (use Dialog or a dedicated route instead)
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: snackbar-best-feedback-not-workflows`).

---

## Anti-Patterns

### Long messages

**Why:** Snacks are glanceable surfaces. Move detail to inline UI, a dialog, or a dedicated page.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: snackbar-anti-long-messages`, `preview: false`).

---

### Multiple simultaneous SnackBars

**Why:** Only one snack is visible at a time; rapid enqueues stack in a FIFO queue and delay messages. Consolidate or debounce instead.

**Source (problematic pattern)**

```tsx
enqueueSnackBar({ message: "Snack A" });
enqueueSnackBar({ message: "Snack B" });
enqueueSnackBar({ message: "Snack C" });
// User sees A, then B, then C sequentially — not all at once
```

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: snackbar-anti-multiple-simultaneous`, `preview: false`).

---

### Using SnackBar for confirmations

**Why:** Confirmations require an explicit choice before proceeding. Use **`AlertDialog`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: snackbar-anti-confirmations`, `preview: false`).

---

### Critical error handling via SnackBar only

**Why:** Data loss, auth expiry, or payment failures need persistent, actionable UI — not a 4-second auto-dismiss.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: snackbar-anti-critical-errors`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Live region** | `role="status"` with `aria-live="polite"` |
| **Screen readers** | Message text is announced when the snack appears (`aria-atomic="true"`) |
| **Action accessibility** | Action is a native `<button>` with visible label — keyboard and screen-reader accessible |
| **Focus** | No focus trap — focus stays on the page; action button is focusable when tabbed to |
| **Dismissal** | Auto-dismiss after timeout; no dedicated close button in v1 |
| **Assertive alerts** | v1 uses polite `status` for all snacks — critical errors belong in **`AlertDialog`** or inline error UI |

When an action is present, ensure the **`actionLabel`** alone conveys the action (e.g. **Undo**, not **Click here**).

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | **`SnackBarHost`** renders an inert anchor — no visible snack in SSR HTML |
| **Enqueue before hydration** | Options are **buffered** until **`SnackBarHost`** mounts on the client |
| **Resumability** | `onAction$` and `onDismiss$` hydrate as QRLs; timer starts client-side |
| **Missing host** | Dev warning if `enqueueSnackBar` runs without a mounted host; options queue until mount |
| **OverlayContainer** | Required ancestor — same as other overlay widgets |

Snacks are **client-presented** — call `enqueueSnackBar` from user events or client effects, not during static SSR render expecting visible output.

---

## Flutter Equivalent

| Topic | Flutter `SnackBar` | qwik-flutter-ui |
| --- | --- | --- |
| **Show API** | `ScaffoldMessenger.showSnackBar()` | `enqueueSnackBar({ … })` |
| **Host** | `Scaffold` / `ScaffoldMessenger` | `<SnackBarHost />` in `OverlayContainer` |
| **Action** | `SnackBarAction` | `actionLabel` + `onAction$` |
| **Duration** | `duration` | `duration` (ms, default ~4000) |
| **Queue** | Replaces or queues per messenger | One visible + FIFO pending queue |
| **Dismiss callback** | `onVisible` / completion | `onDismiss$` |

**Flutter**

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Item deleted'),
    action: SnackBarAction(
      label: 'Undo',
      onPressed: () { /* restore */ },
    ),
  ),
);
```

**qwik-flutter-ui**

```tsx
<OverlayContainer>
  <SnackBarHost />
  {/* … */}
</OverlayContainer>

// In an event handler:
enqueueSnackBar({
  message: "Item deleted",
  actionLabel: "Undo",
  onAction$: $(() => {
    /* restore */
  }),
});
```

Similarities: bottom presentation, transient message, optional single action, auto-dismiss.

Differences: imperative enqueue vs scaffold messenger, explicit host component, FIFO queue (not replace-by-default), no `floatingActionButton` overlap handling built in.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Dialog](/docs/widgets/overlays/dialog) | Modal tasks — forms and focused work |
| [AlertDialog](/docs/widgets/overlays/alert-dialog) | Blocking confirmations — not feedback |
| [Button](/docs/widgets/forms/button) | Triggers that enqueue snacks after actions |
| [AppShell](/docs/widgets/app-structure/app-shell) | App layout — host sits alongside shell in `OverlayContainer` |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/snackbar/`
- **`category`** — groups examples (`basic`, `common`, `showing`, `actions`, `comparison`, `composition`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to overlay and app-structure widgets
- **`flutterEquivalent`** — `SnackBar`

When adding examples, mount **`SnackBarHost`** inside **`OverlayContainer`**, call **`enqueueSnackBar`** from **`$()`** handlers, and import only from `qwik-flutter-ui`.
