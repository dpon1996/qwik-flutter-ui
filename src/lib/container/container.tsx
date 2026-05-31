import { component$, Slot, type PropsOf } from "@builder.io/qwik";

/**
 * A box that styles, positions, and sizes its child — the qwik analogue
 * of Flutter's `Container` widget.
 */
export interface ContainerProps extends Omit<PropsOf<"div">, "color"> {
  /** Background color (any valid CSS color). */
  color?: string;
  /** Inner padding (any valid CSS length). */
  padding?: string;
  /** Outer margin (any valid CSS length). */
  margin?: string;
  /** Explicit width. */
  width?: string | number;
  /** Explicit height. */
  height?: string | number;
  /** Border radius. */
  borderRadius?: string | number;
}

const toCss = (v: string | number | undefined) =>
  typeof v === "number" ? `${v}px` : v;

export const Container = component$<ContainerProps>((props) => {
  const {
    color,
    padding,
    margin,
    width,
    height,
    borderRadius,
    style,
    ...rest
  } = props;

  const mergedStyle = {
    backgroundColor: color,
    padding,
    margin,
    width: toCss(width),
    height: toCss(height),
    borderRadius: toCss(borderRadius),
    ...(typeof style === "object" && style !== null ? style : {}),
  } satisfies Record<string, string | number | undefined>;

  return (
    <div {...rest} style={mergedStyle}>
      <Slot />
    </div>
  );
});
