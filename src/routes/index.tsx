import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Axis } from "~/lib/_shared";
import { Column } from "~/lib/column";
import { Divider } from "~/lib/divider";
import { Row } from "~/lib/row";
import { Text } from "~/lib/text";

export default component$(() => {
  return (
    <Column gap={0} >
      <Text>Section A</Text>
      <Divider />
      <Text>Section B</Text>

      <Divider indent={16} endIndent={16} color="#ccc" thickness={2} />

      <Row style={{ height: 120 }}>
        <Text>Left</Text>
        <Divider axis={Axis.vertical} size="100%" />
        <Text>Right</Text>
      </Row>

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
