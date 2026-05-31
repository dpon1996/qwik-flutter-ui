import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Alignment, BorderStyle } from "../lib/_shared";
import { Container } from "../lib/container/container";

export default component$(() => {
  return (
    <Container
      backgroundColor="red"
      width={500}
      height={100}
      alignment={Alignment.bottomCenter}
      padding={10}
      margin={10}
      borderRadius={10}
      border={{ width: 5, color: "blue", style: BorderStyle.solid }}
      boxShadow={{ offsetX: 10, offsetY: 10, blur: 10, color: "green" }}
      gradient={{
        type: "linear",
        angle: 45,
        stops: [{ color: "red" }, { color: "blue" }],
      }}
    >
      Hello from qwik-flutter-ui playground!
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
