import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Column } from "~/lib/column";
import { Container } from "~/lib/container/container";
import { Expanded } from "~/lib/expanded";
import { Row } from "~/lib/row";
import { SizedBox } from "~/lib/sized-box";

export default component$(() => {
  return (
    <SizedBox height={500}>
      <Column>
        <Row>
          <Container width={300} height={300} backgroundColor="yellow"></Container>
          <Expanded><Container backgroundColor="green" height={10} ></Container></Expanded>
        </Row>
        <Expanded><Container backgroundColor="green" width={10} ></Container></Expanded>
        <Container backgroundColor="red" height={100} width={100} ></Container>
      </Column>
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
