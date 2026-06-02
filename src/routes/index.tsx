import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { FormValues } from "~/lib/_shared";
import { Button } from "~/lib/button";
import { Checkbox } from "~/lib/checkbox";
import { Column } from "~/lib/column";
import { Container } from "~/lib/container";
import { Dropdown } from "~/lib/dropdown";
import { Form } from "~/lib/form";
import { Radio } from "~/lib/radio";
import { RadioGroup } from "~/lib/radio-group";
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

  const onFormSubmit = $((values: FormValues) => {
    submitResult.value = JSON.stringify(values, null, 2);
  });

  return (
    <Container padding={24}>
      <Column gap={24}>
        <Text as="h1">Selection controls + Form</Text>

        <Form onSubmit$={onFormSubmit}>
          <Column gap={16}>

            <TextField name="name" decoration={{ label: "Name" }} required outlineColor="red" focusOutlineColor="black" />


            <Checkbox
              name="terms"
              label="I agree to the terms"
              required
              defaultChecked={true}
            />
            <Switch
              name="notifications"
              label="Push notifications"
              defaultChecked={true}
            />
            <RadioGroup
              name="plan"
              legend="Billing plan"
              required
              defaultValue="free"
            >
              <Column gap={8}>
                <Radio value="free" label="Free" />
                <Radio value="pro" label="Pro" />
              </Column>
            </RadioGroup>
            <Dropdown
              name="country"
              label="Country"
              placeholder="Select a country"
              required
              defaultValue="us"
              options={COUNTRIES}
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
