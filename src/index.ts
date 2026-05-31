/**
 * Public entry point for `qwik-flutter-ui`.
 *
 * Anything re-exported from this file is part of the public API and is
 * subject to semver guarantees. Widgets will be added here as they land
 * (see docs/API_DESIGN.md §19 implementation checklist).
 */

// Shared enums + types (Phase 1).
export * from "./lib/_shared";

// Widgets (Phase 2+).
export * from "./lib/container";
export * from "./lib/sized-box";
export * from "./lib/row";
export * from "./lib/column";
export * from "./lib/spacer";
