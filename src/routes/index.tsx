import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/lib/button";
import { Column } from "~/lib/column";
import { Container } from "~/lib/container";
import { Form } from "~/lib/form";
import { Switch } from "~/lib/switch";
import { Text } from "~/lib/text";

export default component$(() => {
  const darkMode = useSignal(false);
  const submitResult = useSignal<string | null>(null);

  return (
    <Container padding={24}>
      <Column gap={32}>
        <Text as="h1">Switch</Text>

        <Column gap={8}>
          <Text as="h2">Controlled</Text>
          <Switch
            label="Dark mode"
            checked={darkMode.value}
            onChange$={(on) => {
              darkMode.value = on;
            }}
          />
          <Text>On: {darkMode.value ? "yes" : "no"}</Text>
        </Column>

        <Column gap={8}>
          <Text as="h2">Inside Form</Text>
          <Form
            onSubmit$={$((values) => {
              submitResult.value = JSON.stringify(values, null, 2);
            })}
          >
            <Column gap={12}>
              <Switch
                name="notifications"
                label="Push notifications"
                defaultChecked={true}
              />
              <Switch
                name="marketing"
                label="Marketing emails"
                defaultChecked={false}
              />
              <Button type="submit">Submit</Button>
            </Column>
          </Form>
          {submitResult.value !== null && (
            <Text>{submitResult.value}</Text>
          )}
        </Column>
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
