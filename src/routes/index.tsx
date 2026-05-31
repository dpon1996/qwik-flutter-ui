import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CrossAxisAlignment, MainAxisAlignment } from "~/lib/_shared";
import { Row } from "~/lib/row/row";
import { Container } from "../lib/container/container";

export default component$(() => {
  return (
    <Container width={500} height={500} backgroundColor="yellow">
      <Row mainAxisAlignment={MainAxisAlignment.start} crossAxisAlignment={CrossAxisAlignment.start}>
        <Container backgroundColor="red" width={100} height={200}></Container>
        <Container backgroundColor="blue" width={100} height={100}></Container>
        <Container backgroundColor="green" width={100} height={100}></Container>
      </Row>
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
