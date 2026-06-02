/**
 * Field-level deep merge for theme subtrees (§57, Decision T1).
 */

import type {
  ButtonTheme,
  ColorScheme,
  InputDecorationTheme,
  TextStyle,
  TextTheme,
  ThemeData,
} from "../_shared";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeTextStyle(
  base?: TextStyle,
  override?: TextStyle,
): TextStyle | undefined {
  if (base === undefined && override === undefined) return undefined;
  if (override === undefined) return base ? { ...base } : undefined;
  if (base === undefined) return { ...override };
  return { ...base, ...override };
}

function mergeTextTheme(
  base?: TextTheme,
  override?: TextTheme,
): TextTheme | undefined {
  if (base === undefined && override === undefined) return undefined;

  const keys = ["body", "title", "label", "caption"] as const;
  let changed = false;
  const result: TextTheme = {};

  for (const key of keys) {
    const merged = mergeTextStyle(base?.[key], override?.[key]);
    if (merged !== undefined) {
      result[key] = merged;
      changed = true;
    }
  }

  return changed ? result : undefined;
}

function mergeColorScheme(
  base: ColorScheme,
  override?: Partial<ColorScheme>,
): ColorScheme {
  if (override === undefined) return { ...base };
  return { ...base, ...override };
}

function mergeShallowThemePart<T extends object>(
  base: T | undefined,
  override: Partial<T> | undefined,
): T | undefined {
  if (override === undefined) {
    return base === undefined ? undefined : { ...base };
  }
  if (base === undefined) {
    return { ...override } as T;
  }
  return { ...base, ...override };
}

/** Deep-merge `override` onto `base` (ThemeData field-by-field). */
export function mergeThemeData(
  base: ThemeData,
  override?: Partial<ThemeData>,
): ThemeData {
  if (override === undefined) {
    return {
      colorScheme: { ...base.colorScheme },
      textTheme: base.textTheme ? { ...base.textTheme } : undefined,
      buttonTheme: base.buttonTheme ? { ...base.buttonTheme } : undefined,
      inputDecorationTheme: base.inputDecorationTheme
        ? { ...base.inputDecorationTheme }
        : undefined,
    };
  }

  const result: ThemeData = {
    colorScheme: mergeColorScheme(
      base.colorScheme,
      isPlainObject(override.colorScheme)
        ? (override.colorScheme as Partial<ColorScheme>)
        : override.colorScheme,
    ),
  };

  const textTheme = mergeTextTheme(base.textTheme, override.textTheme);
  if (textTheme !== undefined) result.textTheme = textTheme;

  const buttonTheme = mergeShallowThemePart<ButtonTheme>(
    base.buttonTheme,
    override.buttonTheme,
  );
  if (buttonTheme !== undefined) result.buttonTheme = buttonTheme;

  const inputDecorationTheme = mergeShallowThemePart<InputDecorationTheme>(
    base.inputDecorationTheme,
    override.inputDecorationTheme,
  );
  if (inputDecorationTheme !== undefined) {
    result.inputDecorationTheme = inputDecorationTheme;
  }

  return result;
}
