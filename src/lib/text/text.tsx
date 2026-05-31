import { component$, Slot, type PropsOf } from "@builder.io/qwik";

/**
 * Styled inline text — the qwik analogue of Flutter's `Text` widget.
 */
export interface TextProps extends PropsOf<"span"> {
  /** Optional convenience prop to render text content directly. */
  value?: string;
}

export const Text = component$<TextProps>((props) => {
  const { value, ...rest } = props;
  return (
    <span {...rest}>
      {value}
      <Slot />
    </span>
  );
});
