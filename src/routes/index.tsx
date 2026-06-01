import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ButtonVariant } from "~/lib/_shared/enums";
import { Button } from "~/lib/button";

import { Column } from "~/lib/column";

export default component$(() => {


  return (
    <Column gap={16}>
      <Button
        onClick$={() => console.log("clicked")}
        variant={ButtonVariant.filled}
      >Click me</Button>
    </Column>
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
