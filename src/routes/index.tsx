import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/lib/container/container";
import { Positioned } from "~/lib/positioned";
import { SizedBox } from "~/lib/sized-box";
import { Stack } from "~/lib/stack";

export default component$(() => {
  return (
    <SizedBox height={500}>
      <Stack>
        <Container backgroundColor="red" width={500} height={500}></Container>
        <Positioned top={50} left={30} >
          <Container backgroundColor="blue" width={300} height={300}></Container>
        </Positioned>

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
