import { $, component$, useSignal, type Signal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { FormValues } from "~/lib/_shared";
import { OverlayPlacement } from "~/lib/_shared";
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
import { ModalBottomSheet } from "~/lib/modal-bottom-sheet";
import { OverlayContainer } from "~/lib/overlay";
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
  const submitResult = useSignal<string | null>(null);
  const alertOpen = useSignal(false);
  const sheetOpen = useSignal(false);
  const stackDialogOpen = useSignal(false);

  const snackStatus = useSignal("No snack enqueued yet.");
  snackDemo.status = snackStatus;

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
        <Container padding={24}>
          <Column gap={24}>
            <Text as="h1">qwik-flutter-ui playground</Text>

            <Button type="button" onClick$={openAlertDialog}>
              Delete item
            </Button>

            <AlertDialog open={alertOpen.value} onOpenChange$={onAlertOpenChange}>
              <AlertDialogTitle>Delete this item?</AlertDialogTitle>
              <AlertDialogContent>
                <Text>This action cannot be undone.</Text>
              </AlertDialogContent>
              <AlertDialogActions>
                <Button type="button" onClick$={() => (alertOpen.value = false)}>
                  Cancel
                </Button>
                <Button type="button" onClick$={() => (alertOpen.value = false)}>
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
                  <Button type="button" onClick$={() => (sheetOpen.value = false)}>
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
                <Button type="button" onClick$={() => (stackDialogOpen.value = false)}>
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
