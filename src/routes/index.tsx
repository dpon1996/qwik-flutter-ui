import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CrossAxisAlignment, MainAxisAlignment, MainAxisSize } from "~/lib/_shared";
import { Column } from "~/lib/column";
import { Row } from "~/lib/row/row";
import { SizedBox } from "~/lib/sized-box";
import { Container } from "../lib/container/container";

export default component$(() => {
  return (
    <SizedBox height={1000}>
      <Column mainAxisAlignment={MainAxisAlignment.center} crossAxisAlignment={CrossAxisAlignment.start} mainAxisSize={MainAxisSize.min} >
        <Container width={300} height={300} backgroundColor="yellow">
          <Row mainAxisAlignment={MainAxisAlignment.start} crossAxisAlignment={CrossAxisAlignment.start}>
            <Container backgroundColor="red" width={100} height={200}></Container>
            <Container backgroundColor="blue" width={100} height={100}></Container>
            <Container backgroundColor="green" width={100} height={100}></Container>
          </Row>
        </Container>
        <SizedBox height={16}></SizedBox>
        <Container width={300} height={300} backgroundColor="yellow"></Container>
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
