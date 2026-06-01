import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BoxFit } from "~/lib/_shared/enums";
import { Container } from "~/lib/container";
import { GridView } from "~/lib/grid-view";
import { Image } from "~/lib/image";
export default component$(() => {
  return (
    <Container height="100vh" padding={16}>
      <GridView columns={4} gap={16} mainAxisSpacing={16} childAspectRatio={1}>
        {Array.from({ length: 12 }, (_, i) => (
          <Image
            key={i}
            src={`https://picsum.photos/seed/qfu-${i}/400/400`}
            alt={`Image ${i + 1}`}
            width="100%"
            height="100%"
            fit={BoxFit.cover}
          />
        ))}
      </GridView>
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
