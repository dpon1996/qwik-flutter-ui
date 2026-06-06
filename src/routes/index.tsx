import { $, component$, useSignal, type Signal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AppBar } from "~/components/app-bar";
import { AppShell } from "~/components/app-shell";
import {
  BottomNavigationBar,
  BottomNavigationItem,
} from "~/components/bottom-navigation-bar";
import { Drawer } from "~/components/drawer";
import { SideSheet } from "~/components/side-sheet";
import type { FormValues } from "~/lib/_shared";
import { OverlayPlacement, SideSheetPosition } from "~/lib/_shared";
import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogTitle,
} from "~/lib/alert-dialog";
import { Button } from "~/lib/button";
import { CheckboxFormField } from "~/lib/checkbox-form-field";
import { Column } from "~/lib/column";
import { Container } from "~/lib/container";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "~/lib/dialog";
import { Dropdown } from "~/lib/dropdown";
import { DropdownFormField } from "~/lib/dropdown-form-field";
import { Form } from "~/lib/form";
import { Menu, MenuDivider, MenuItem } from "~/lib/menu";
import { ModalBottomSheet } from "~/lib/modal-bottom-sheet";
import { OverlayContainer } from "~/lib/overlay";
import { Popover } from "~/lib/popover";
import { Radio } from "~/lib/radio";
import { RadioGroupFormField } from "~/lib/radio-group-form-field";
import { enqueueSnackBar, SnackBarHost } from "~/lib/snack-bar";
import { Switch } from "~/lib/switch";
import { Text } from "~/lib/text";
import { TextField } from "~/lib/text-field";
import { ThemeProvider } from "~/lib/theme";
import { Tooltip } from "~/lib/tooltip";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

/** Playground-only ref so module-scoped QRLs can update snack demo status. */
const snackDemo = {
  status: null as Signal<string> | null,
};

/** Playground-only ref for menu selection demo. */
const menuDemo = {
  status: null as Signal<string> | null,
};

const onMenuEdit$ = $(() => {
  if (menuDemo.status) {
    menuDemo.status.value = "Selected: Edit";
  }
});

const onMenuCopy$ = $(() => {
  if (menuDemo.status) {
    menuDemo.status.value = "Selected: Copy";
  }
});

const onMenuDelete$ = $(() => {
  if (menuDemo.status) {
    menuDemo.status.value = "Selected: Delete";
  }
});

const onUndoSnackAction$ = $(() => {
  if (snackDemo.status) {
    snackDemo.status.value = "Undo action fired";
  }
});

const onSnackDismissed$ = $(() => {
  if (snackDemo.status) {
    snackDemo.status.value = "Snack dismissed";
  }
});

const enqueueActionSnack = $(() => {
  enqueueSnackBar({
    message: "Item deleted",
    actionLabel: "Undo",
    onAction$: onUndoSnackAction$,
    onDismiss$: onSnackDismissed$,
  });
});

export default component$(() => {
  const drawerOpen = useSignal(false);
  const sideSheetOpen = useSignal(false);
  const submitResult = useSignal<string | null>(null);
  const alertOpen = useSignal(false);
  const sheetOpen = useSignal(false);
  const stackDialogOpen = useSignal(false);
  const popoverOpen = useSignal(false);
  const menuStatus = useSignal("No menu action yet.");
  const snackStatus = useSignal("No snack enqueued yet.");
  const bottomNavValue = useSignal("home");

  snackDemo.status = snackStatus;
  menuDemo.status = menuStatus;

  const onDrawerOpenChange$ = $((next: boolean) => {
    drawerOpen.value = next;
  });

  const openDrawer$ = $(() => {
    drawerOpen.value = true;
  });

  const closeDrawer$ = $(() => {
    drawerOpen.value = false;
  });

  const toggleSideSheet$ = $(() => {
    sideSheetOpen.value = !sideSheetOpen.value;
  });

  const closeSideSheet$ = $(() => {
    sideSheetOpen.value = false;
  });

  const onBottomNavChange$ = $((next: string) => {
    bottomNavValue.value = next;
  });

  const onFormSubmit = $((values: FormValues) => {
    submitResult.value = JSON.stringify(values, null, 2);
  });

  const onAlertOpenChange = $((next: boolean) => {
    alertOpen.value = next;
  });

  const openAlertDialog = $(() => {
    alertOpen.value = true;
  });

  const openSheet = $(() => {
    sheetOpen.value = true;
  });

  const openStackDialog = $(() => {
    stackDialogOpen.value = true;
  });

  const onSheetOpenChange = $((next: boolean) => {
    sheetOpen.value = next;
  });

  const onStackDialogOpenChange = $((next: boolean) => {
    stackDialogOpen.value = next;
  });

  const onPopoverOpenChange = $((next: boolean) => {
    popoverOpen.value = next;
  });

  const closeAlert = $(() => {
    alertOpen.value = false;
  });

  const closeSheet = $(() => {
    sheetOpen.value = false;
  });

  const closeStackDialog = $(() => {
    stackDialogOpen.value = false;
  });

  const enqueueSavedSnack = $(() => {
    enqueueSnackBar({ message: "Saved" });
    snackStatus.value = 'Enqueued: "Saved"';
  });

  const enqueueQueuedSnacks = $(() => {
    enqueueSnackBar({ message: "Snack A", duration: 5000 });
    enqueueSnackBar({ message: "Snack B" });
    enqueueSnackBar({ message: "Snack C" });
    snackStatus.value = "Enqueued A, B, C (FIFO queue)";
  });

  return (
    <ThemeProvider inherit={false} theme={{}}>
      <OverlayContainer>
        <SnackBarHost />
        <Drawer open={drawerOpen.value} onOpenChange$={onDrawerOpenChange$}>
          <nav aria-label="Main">
            <Container padding={16}>
              <Column gap={8}>
                <Text as="h2">Navigation</Text>
                <Button type="button" onClick$={closeDrawer$}>
                  Home
                </Button>
                <Button type="button" onClick$={closeDrawer$}>
                  Components
                </Button>
                <Button type="button" onClick$={closeDrawer$}>
                  Settings
                </Button>
              </Column>
            </Container>
          </nav>
        </Drawer>
        <SideSheet
          id="playground-filters"
          open={sideSheetOpen.value}
          width={320}
          height={280}
          position={SideSheetPosition.right}
          aria-label="Playground filters"
        >
          <Container padding={16}>
            <Column gap={12}>
              <Text as="h2">Filters</Text>
              <Text>
                Edge overlay panel — stacks above page content without a backdrop
                or focus trap.
              </Text>
              <Switch label="Show archived" defaultChecked={false} />
              <Switch label="Show drafts" defaultChecked={true} />
              <Button type="button" onClick$={closeSideSheet$}>
                Close panel
              </Button>
            </Column>
          </Container>
        </SideSheet>
        <AppShell>
          <AppBar
            q:slot="appBar"
            leading={
              <Button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen.value}
                onClick$={openDrawer$}
              >
                ☰
              </Button>
            }
            title={<Text as="h1">qwik-flutter-ui playground</Text>}
            actions={[
              <Button
                key="filters"
                type="button"
                aria-expanded={sideSheetOpen.value}
                aria-controls="playground-filters"
                onClick$={toggleSideSheet$}
              >
                Filters
              </Button>,
              <Button key="docs" type="button" aria-label="Documentation">
                Docs
              </Button>,
            ]}
          />
          <BottomNavigationBar
            q:slot="bottomNavigationBar"
            aria-label="Primary destinations"
            value={bottomNavValue.value}
            onChange$={onBottomNavChange$}
          >
            <BottomNavigationItem
              value="home"
              label="Home"
              icon={<span>⌂</span>}
            />
            <BottomNavigationItem
              value="search"
              label="Search"
              icon={<span>⌕</span>}
            />
            <BottomNavigationItem
              value="profile"
              label="Profile"
              icon={<span>👤</span>}
            />
          </BottomNavigationBar>
          <Container padding={24}>
            <Column gap={24}>
              <Text as="h2">
                App Structure — AppShell + AppBar + Drawer + SideSheet +
                BottomNavigationBar
              </Text>
              <Text>
                Page chrome uses <code>AppShell</code> for <code>AppBar</code>,
                <code>BottomNavigationBar</code>, plus modal <code>Drawer</code>{" "}
                and edge-overlay <code>SideSheet</code> inside{" "}
                <code>OverlayContainer</code> (§91–§99). Open the drawer with ☰;
                toggle the right-side filter panel with Filters in the app bar.
                The side sheet overlays page content — no backdrop or focus
                trap. Panel state: {sideSheetOpen.value ? "open" : "closed"}.
                Bottom nav selection (no routing): {bottomNavValue.value}.
              </Text>
              <Button type="button" onClick$={toggleSideSheet$}>
                Toggle filters panel (main content)
              </Button>

              <Text as="h2">Overlays — AlertDialog</Text>

              <Button type="button" onClick$={openAlertDialog}>
                Delete item
              </Button>

              <AlertDialog open={alertOpen.value} onOpenChange$={onAlertOpenChange}>
                <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                <AlertDialogContent>
                  <Text>This action cannot be undone.</Text>
                </AlertDialogContent>
                <AlertDialogActions>
                  <Button type="button" onClick$={closeAlert}>
                    Cancel
                  </Button>
                  <Button type="button" onClick$={closeAlert}>
                    Delete
                  </Button>
                </AlertDialogActions>
              </AlertDialog>

              <Text as="h2">Overlays — ModalBottomSheet</Text>

              <Button type="button" onClick$={openSheet}>
                Open bottom sheet
              </Button>

              <ModalBottomSheet
                open={sheetOpen.value}
                onOpenChange$={onSheetOpenChange}
                aria-labelledby="sheet-title"
                aria-describedby="sheet-desc"
              >
                <Container padding={24}>
                  <Column gap={16}>
                    <Text as="h3" id="sheet-title">
                      Sheet options
                    </Text>
                    <Text id="sheet-desc">Choose an action below.</Text>
                    <Button type="button" onClick$={openStackDialog}>
                      Open dialog over sheet
                    </Button>
                    <Button type="button" onClick$={closeSheet}>
                      Close sheet
                    </Button>
                  </Column>
                </Container>
              </ModalBottomSheet>

              <Dialog
                open={stackDialogOpen.value}
                onOpenChange$={onStackDialogOpenChange}
                labelledBy="stack-dialog-title"
              >
                <DialogTitle id="stack-dialog-title">Dialog over sheet</DialogTitle>
                <DialogContent>
                  <Text>Only this dialog should receive Escape while open.</Text>
                </DialogContent>
                <DialogActions>
                  <Button type="button" onClick$={closeStackDialog}>
                    Close dialog
                  </Button>
                </DialogActions>
              </Dialog>

              <Text as="h2">Overlays — SnackBar (OV14)</Text>

              <Button type="button" onClick$={enqueueSavedSnack}>
                enqueueSnackBar$ — Saved
              </Button>
              <Button type="button" onClick$={enqueueQueuedSnacks}>
                enqueueSnackBar$ — queue A + B
              </Button>
              <Button type="button" onClick$={enqueueActionSnack}>
                enqueueSnackBar$ — with action
              </Button>
              <Text>{snackStatus.value}</Text>

              <Text as="h2">Overlays — Tooltip</Text>

              <Tooltip content="Helpful hint" placement={OverlayPlacement.top}>
                <Button type="button">Hover or focus me</Button>
              </Tooltip>

              <Text as="h2">Overlays — Popover</Text>

              <Popover
                open={popoverOpen.value}
                onOpenChange$={onPopoverOpenChange}
                placement={OverlayPlacement.bottom}
              >
                <Button q:slot="trigger" type="button">
                  Controlled popover
                </Button>
                <Container padding={12}>
                  <Text>Click outside or press Escape to dismiss.</Text>
                </Container>
              </Popover>

              <Popover placement={OverlayPlacement.end}>
                <Button q:slot="trigger" type="button">
                  Click popover
                </Button>
                <Container padding={12}>
                  <Text>Uncontrolled click trigger.</Text>
                </Container>
              </Popover>

              <Text as="h2">Overlays — Menu</Text>

              <Menu>
                <Button q:slot="trigger" type="button">
                  Open menu
                </Button>
                <MenuItem onSelect$={onMenuEdit$}>Edit</MenuItem>
                <MenuItem onSelect$={onMenuCopy$}>Copy</MenuItem>
                <MenuDivider />
                <MenuItem disabled>Disabled item</MenuItem>
                <MenuItem onSelect$={onMenuDelete$}>Delete</MenuItem>
              </Menu>

              <Text>{menuStatus.value}</Text>

              <Text as="h2">Selection controls + Form</Text>

              <Form onSubmit$={onFormSubmit}>
                <Column gap={16}>
                  <TextField
                    name="name"
                    decoration={{ label: "Name" }}
                    required
                    outlineColor="red"
                    focusOutlineColor="black"
                  />

                  <CheckboxFormField
                    name="terms"
                    required
                    defaultChecked={true}
                    decoration={{
                      label: "I agree to the terms",
                      helperText: "You must accept to continue",
                    }}
                    validator$={(checked) =>
                      checked ? undefined : "Please accept the terms"
                    }
                  />
                  <Switch
                    name="notifications"
                    label="Push notifications"
                    defaultChecked={true}
                  />
                  <RadioGroupFormField
                    name="plan"
                    required
                    defaultValue="free"
                    decoration={{
                      label: "Billing plan",
                      helperText: "Choose a billing plan",
                    }}
                    validator$={(v) =>
                      v === "" ? "Please select a plan" : undefined
                    }
                  >
                    <Column gap={8}>
                      <Radio value="free" label="Free" />
                      <Radio value="pro" label="Pro" />
                    </Column>
                  </RadioGroupFormField>
                  <Dropdown
                    options={COUNTRIES}
                    placeholder="Select a country"
                    required
                    defaultValue="us"
                  />
                  <DropdownFormField
                    name="country"
                    placeholder="Select a country"
                    required
                    defaultValue="us"
                    options={COUNTRIES}
                    decoration={{
                      label: "Country",
                      helperText: "Shipping address country",
                    }}
                    validator$={(v) =>
                      v === "" ? "Please select a country" : undefined
                    }
                  />
                  <Button type="submit">Submit</Button>
                </Column>
              </Form>

              <Text>
                {submitResult.value === null
                  ? "Submit the form to see FormValues here."
                  : submitResult.value}
              </Text>
            </Column>
          </Container>
        </AppShell>
      </OverlayContainer>
    </ThemeProvider>
  );
});

export const head: DocumentHead = {
  title: "qwik-flutter-ui playground",
  meta: [
    {
      name: "description",
      content: "Playground for developing qwik-flutter-ui components.",
    },
  ],
};
