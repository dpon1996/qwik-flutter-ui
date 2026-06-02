/**
 * Internal field-decoration module (§59).
 * @internal Not exported from `src/index.ts`.
 */

export {
  FieldDecorationError,
  FieldDecorationHelper,
  FieldDecorationLabel,
  FieldDecorationLegend,
} from "./field-decoration";

export { buildAriaDescribedBy } from "./types";

export type {
  FieldDecorationControlMeta,
  FieldDecorationErrorProps,
  FieldDecorationHelperProps,
  FieldDecorationLabelProps,
  FieldDecorationLegendProps,
} from "./types";
