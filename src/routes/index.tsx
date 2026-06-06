import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { FormValues } from "~/lib/_shared";
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
import { Dropdown } from "~/lib/dropdown";
import { DropdownFormField } from "~/lib/dropdown-form-field";
import { Form } from "~/lib/form";
import { OverlayContainer } from "~/lib/overlay";
import { Radio } from "~/lib/radio";
import { RadioGroupFormField } from "~/lib/radio-group-form-field";
import { Switch } from "~/lib/switch";
import { Text } from "~/lib/text";
import { TextField } from "~/lib/text-field";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

export default component$(() => {
  const submitResult = useSignal<string | null>(null);
  const alertOpen = useSignal(false);

  const onFormSubmit = $((values: FormValues) => {
    submitResult.value = JSON.stringify(values, null, 2);
  });

  const onAlertOpenChange = $((next: boolean) => {
    alertOpen.value = next;
  });

  const openAlertDialog = $(() => {
    alertOpen.value = true;
  });

  return (
    <OverlayContainer>
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
