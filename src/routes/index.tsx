import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container, Text } from "../index";

export default component$(() => {
  return (
    <Container
      padding="32px"
      margin="24px"
      color="#1976d2"
      borderRadius={12}
      style={{ maxWidth: "640px" }}
    >
      <Text
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Hello from qwik-flutter-ui playground!
      </Text>
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
