/**
 * `createThemeData` — library theme factory (§57, Decision T5).
 */

import type {
  ButtonTheme,
  ColorScheme,
  InputDecorationTheme,
  TextStyle,
  TextTheme,
  ThemeData,
} from "./types";

/** WCAG-oriented Material-style defaults; pure (no DOM reads). */
export const DEFAULT_COLOR_SCHEME: ColorScheme = {
  primary: "#1976d2",
  onPrimary: "#ffffff",
  surface: "#ffffff",
  onSurface: "#212121",
  error: "#c62828",
  onError: "#ffffff",
  outline: "#e0e0e0",
};

const DEFAULT_THEME_DATA: ThemeData = {
  colorScheme: DEFAULT_COLOR_SCHEME,
};

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

function mergeShallowPart<T extends object>(
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

/** Field-level deep merge (Decision T1). */
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
    colorScheme: mergeColorScheme(base.colorScheme, override.colorScheme),
  };

  const textTheme = mergeTextTheme(base.textTheme, override.textTheme);
  if (textTheme !== undefined) result.textTheme = textTheme;

  const buttonTheme = mergeShallowPart<ButtonTheme>(
    base.buttonTheme,
    override.buttonTheme,
  );
  if (buttonTheme !== undefined) result.buttonTheme = buttonTheme;

  const inputDecorationTheme = mergeShallowPart<InputDecorationTheme>(
    base.inputDecorationTheme,
    override.inputDecorationTheme,
  );
  if (inputDecorationTheme !== undefined) {
    result.inputDecorationTheme = inputDecorationTheme;
  }

  return result;
}

/**
 * Returns a complete `ThemeData` with default `colorScheme` (including `outline`).
 * Optional `partial` is deep-merged over the library baseline.
 */
export function createThemeData(partial?: Partial<ThemeData>): ThemeData {
  return mergeThemeData(DEFAULT_THEME_DATA, partial);
}
