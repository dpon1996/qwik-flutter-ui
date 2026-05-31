import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { FontWeight, TextAlign, TextDecoration, TextDecorationStyle, TextOverflow, TextTransform } from "~/lib/_shared";
import { Container } from "~/lib/container/container";
import { Text } from "~/lib/text";

export default component$(() => {
  return (
    <Container backgroundColor="#010101" maxWidth={500} padding={[16, 32, 50, 25]}>
      <Text maxLines={2}
        overflow={TextOverflow.ellipsis}
        color="#fff"
        fontSize={20}
        fontWeight={FontWeight.bold}
        fontFamily="Arial, sans-serif"
        letterSpacing={1}
        wordSpacing={1}
        lineHeight={1.5}
        decoration={TextDecoration.underline}
        decorationColor="#fff"
        decorationStyle={TextDecorationStyle.dashed}
        textTransform={TextTransform.uppercase}
        textAlign={TextAlign.center}  >Hello World this is a test message that should be truncated</Text>
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
