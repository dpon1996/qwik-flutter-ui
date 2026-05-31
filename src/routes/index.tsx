import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/lib/container/container";
import { SizedBox } from "~/lib/sized-box";
import { Stack } from "~/lib/stack";

export default component$(() => {
  return (
    <SizedBox height={500}>
      <Stack>
        <Container backgroundColor="red" width={500} height={500}></Container>
        <Container backgroundColor="blue" width={300} height={300}></Container>
      </Stack>
    </SizedBox>
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
