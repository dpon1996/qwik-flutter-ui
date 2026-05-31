import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Axis, BoxFit, ImageLoading } from "~/lib/_shared";
import { Column } from "~/lib/column";
import { Container } from "~/lib/container";
import { Divider } from "~/lib/divider";
import { Image } from "~/lib/image";
import { Row } from "~/lib/row";
import { Text } from "~/lib/text";
import { Visibility } from "~/lib/visibility";

export default component$(() => {
  const isOpen = useSignal(true);
  const showBonus = useSignal(false);

  return (
    <Column gap={16}>
      <Text>Section A</Text>
      <Divider />
      <Text>Section B</Text>

      <Divider indent={16} endIndent={16} color="#ccc" thickness={2} />

      <Row style={{ height: 120 }}>
        <Text>Left</Text>
        <Divider axis={Axis.vertical} size="100%" />
        <Text>Right</Text>
      </Row>

      <Image
        src="https://picsum.photos/800/480"
        alt="Sample landscape"
        width={400}
        height={240}
        fit={BoxFit.cover}
        loading={ImageLoading.lazy}
      />

      <Divider />

      {/* Toggle panel — Flutter Visibility(visible: isOpen) */}
      <Row gap={8}>
        <button type="button" onClick$={() => (isOpen.value = !isOpen.value)}>
          Toggle details
        </button>
        <Text>Panel is {isOpen.value ? "visible" : "hidden"}</Text>
      </Row>
      <Visibility visible={isOpen.value}>
        <Text>Details panel (hidden with display:none when collapsed)</Text>
      </Visibility>

      {/* maintainSize — layout space preserved (Offstage analogue) */}
      <Visibility visible={false} maintainSize>
        <Container height={80} backgroundColor="#f5f5f5">
          <Text>Reserved 80px slot (invisible)</Text>
        </Container>
      </Visibility>
      <Text>Text below reserved slot</Text>

      {/* maintainSemantics={false} — excluded from a11y tree when hidden */}
      <Row gap={8}>
        <button
          type="button"
          onClick$={() => (showBonus.value = !showBonus.value)}
        >
          Toggle bonus
        </button>
      </Row>
      <Column gap={0}>
        <Text>Always visible</Text>
        <Visibility visible={showBonus.value} maintainSemantics={false}>
          <Text>Bonus content (aria-hidden when hidden)</Text>
        </Visibility>
      </Column>
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
