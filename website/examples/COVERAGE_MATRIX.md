# Example Coverage Matrix

Recommended examples per widget. **Minimum** = required for docs v1 launch. **Extended** = ship when time allows.

Legend: ✅ minimum | ⭐ extended | — not applicable

Categories: **B** basic · **C** common · **V** variation · **Co** composition · **BP** best practice · **AP** anti-pattern

---

## Layout

### Row

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Row with two Text children |
| `gap.tsx` | V | `gap` prop spacing |
| `main-axis-alignment.tsx` | V | `mainAxisAlignment` variants |
| `cross-axis-alignment.tsx` | V | `crossAxisAlignment` variants |
| `with-expanded.tsx` | Co | Row + Expanded children |
| `responsive-width.tsx` | C | Percentage / clamp widths |
| `anti-no-wrap.tsx` | AP | Row without Expanded in fixed-width parent |

### Column

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Vertical stack of Text |
| `gap.tsx` | V | Column gap |
| `alignment.tsx` | V | Main/cross axis alignment |
| `form-stack.tsx` | Co | Column + form fields |
| `scroll-overflow.tsx` | C | Column in constrained height |

### Container

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Container with padding and child |
| `decoration.tsx` | V | Background, border, radius |
| `constraints.tsx` | V | width, height, min/max |
| `nested-layout.tsx` | Co | Container wrapping Column |

### SizedBox

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Fixed width and height spacer |
| `percentage.tsx` | V | String length `"50%"` |
| `empty-spacer.tsx` | C | SizedBox as vertical gap |

### Spacer

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Row with Spacer pushing items apart |
| `flex-factor.tsx` | V | `flex` prop |

### Expanded

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Expanded child in Row |
| `flex-factor.tsx` | V | `flex` values |
| `column-fill.tsx` | Co | Expanded in Column filling height |

### Flexible

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Flexible with `fit: loose` |
| `fit-tight.tsx` | V | `FlexFit.tight` vs loose |
| `with-flex.tsx` | V | Custom flex factor |

### Center

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Centered child |
| `full-size.tsx` | C | Center filling parent |
| `nested.tsx` | Co | Center inside Container |

### Wrap

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Wrapping chips/tags |
| `spacing.tsx` | V | `spacing` and `runSpacing` |
| `alignment.tsx` | V | `alignment` prop |

### Stack

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Overlaid children |
| `fit.tsx` | V | `StackFit` variants |
| `with-positioned.tsx` | Co | Stack + Positioned badge |

### Positioned

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Positioned in Stack (top/start) |
| `fill.tsx` | V | `top/right/bottom/left: 0` fill |
| `badge-overlay.tsx` | C | Notification badge pattern |

### Align

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Align child to bottom-end |
| `alignment-variants.tsx` | V | All `Alignment` values |

### AspectRatio

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | 16:9 media box |
| `with-image.tsx` | Co | AspectRatio + Image |

---

## Typography

### Text

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Plain Text |
| `semantic-as.tsx` | V | `as="h1"` … `as="p"` |
| `style-props.tsx` | V | fontSize, fontWeight, color |
| `selectable.tsx` | C | `selectable` prop |
| `nested-inline.tsx` | Co | Text inside Row/Column |
| `anti-div-soup.tsx` | AP | Using Text without semantic `as` for headings |

---

## Forms

### TextField

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Placeholder only |
| `controlled.tsx` | C | `value` + `onInput$` |
| `decoration.tsx` | V | Label, hint, prefix icon props |
| `disabled.tsx` | V | Disabled and read-only |
| `types.tsx` | V | `type="password"`, `type="email"` |
| `form-context.tsx` | Co | Inside Form (uncontrolled name) |
| `accessible-label.tsx` | BP | Explicit label association |

### TextFormField

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Named field in Form |
| `validation.tsx` | C | Required + custom validator |
| `initial-value.tsx` | V | `initialValue` |
| `error-display.tsx` | V | Validation error UI |
| `decoration.tsx` | V | InputDecoration props |

### Form

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Form wrapping one field |
| `submit.tsx` | C | `onSubmit$` handler |
| `multi-field.tsx` | Co | TextFormField + CheckboxFormField |
| `validation-reset.tsx` | C | Validate all on submit |
| `anti-uncontrolled-mix.tsx` | AP | Mixing controlled fields incorrectly |

---

## Selection Controls

### Checkbox

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Single checkbox |
| `controlled.tsx` | C | Checked state |
| `disabled.tsx` | V | Disabled |
| `indeterminate.tsx` | V | Indeterminate state (if supported) |

### Radio

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Single radio (with group) |
| `disabled.tsx` | V | Disabled option |

### RadioGroup

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Vertical radio list |
| `controlled.tsx` | C | Selected value signal |
| `horizontal.tsx` | V | Row layout |

### Switch

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Toggle switch |
| `controlled.tsx` | C | Bound checked state |
| `disabled.tsx` | V | Disabled switch |
| `labeled.tsx` | Co | Switch + Text label |

### Dropdown

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Options list |
| `controlled.tsx` | C | Selected value |
| `disabled.tsx` | V | Disabled dropdown |
| `placeholder.tsx` | V | Placeholder option |

---

## Theming

### ThemeProvider

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Default theme wrap |
| `custom-tokens.tsx` | C | Override CSS variables |
| `nested-providers.tsx` | V | Scoped theme subtree |
| `dark-mode.tsx` | C | Dark palette via tokens |

### useTheme

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Read colorScheme in custom component |
| `custom-component.tsx` | Co | Themed div using hook values |

---

## Overlays

> All overlay examples set `requiresOverlayContainer: true` in meta.

### Dialog

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Open via button, close actions |
| `scrollable-content.tsx` | V | Long DialogContent |
| `form-dialog.tsx` | Co | Dialog + Form |

### AlertDialog

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Confirm / cancel |
| `destructive.tsx` | C | Delete confirmation pattern |

### ModalBottomSheet

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Open sheet from button |
| `scrollable.tsx` | V | Scrollable sheet body |
| `mobile-recipe.tsx` | Co | Mobile action sheet pattern |

### SnackBar

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | enqueueSnackBar message |
| `with-action.tsx` | C | Action button |
| `host-setup.tsx` | BP | SnackBarHost placement |

### Tooltip

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Hover/focus tooltip |
| `placement.tsx` | V | Placement variants |
| `long-content.tsx` | V | Multiline tooltip |

### Popover

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Click-triggered popover |
| `placement.tsx` | V | Placement prop |
| `with-menu.tsx` | Co | Popover hosting Menu |

### Menu

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Menu + MenuItem |
| `with-divider.tsx` | V | MenuDivider |
| `context-trigger.tsx` | C | Button-triggered menu |

---

## App Structure

### AppShell

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Shell with body only |
| `with-app-bar.tsx` | Co | AppBar slot |
| `with-drawer.tsx` | Co | Drawer + toggle |
| `full-layout.tsx` | C | AppBar + Drawer + SideSheet |

### AppBar

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Title only |
| `with-actions.tsx` | V | Trailing actions |
| `leading-menu.tsx` | Co | Menu icon opens Drawer |

### Drawer

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Open/close drawer |
| `persistent.tsx` | V | Persistent vs modal (if applicable) |
| `navigation-list.tsx` | C | Nav items pattern |

### SideSheet

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Side panel toggle |
| `position.tsx` | V | Start vs end position |
| `with-form.tsx` | Co | SideSheet filter panel |

### BottomNavigationBar

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Three items, selected index |
| `with-app-shell.tsx` | Co | Mobile shell pattern |
| `icons-labels.tsx` | V | Icon + label items |

*Status: specified in API_DESIGN.md §99; document when exported.*

---

## Navigation (planned v1.9)

Placeholders — create example stubs when widgets ship.

### Link

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Internal route link |
| `external.tsx` | V | External href + security attrs |
| `styled.tsx` | V | Link styled as button |

### Tabs

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Controlled tab index |
| `uncontrolled.tsx` | V | Default index |

### TabBar

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | TabBar with labels |
| `with-icons.tsx` | V | Icon tabs |

### TabPanel

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Single panel visibility |
| `lazy-mount.tsx` | C | Mount on first select |

### Breadcrumb

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Three-level trail |
| `custom-separator.tsx` | V | Custom separator |

### NavigationRail

| Example file | Cat | Description |
| --- | --- | --- |
| `basic.tsx` | B | Rail with destinations |
| `extended.tsx` | V | Extended rail with labels |
| `with-app-shell.tsx` | Co | Desktop shell pattern |

---

## Extended widgets (secondary coverage)

| Widget | Minimum examples |
| --- | --- |
| **Button** | basic, variants, disabled, with-icon, in-form |
| **Card** | basic, elevated, with-actions |
| **Divider** | basic, inset, vertical-in-row |
| **Image** | basic, fit, error-fallback |
| **Visibility** | basic, visible-false, maintain-size |
| **SingleChildScrollView** | basic, horizontal |
| **ListView** | basic, separated, builder-pattern |
| **GridView** | basic, cross-axis-count |
| **MediaQuery** | basic, responsive-hide |
| **OverlayContainer** | basic, setup-once |
| **CheckboxFormField** | basic, validation |
| **RadioGroupFormField** | basic, validation |
| **DropdownFormField** | basic, validation |

---

## Coverage summary

| Section | Widgets | Min examples each | Total min files |
| --- | ---: | ---: | ---: |
| Layout | 13 | 1–3 | ~35 |
| Typography | 1 | 4 | ~4 |
| Forms | 3 | 3–5 | ~12 |
| Selection | 5 | 2–4 | ~15 |
| Theming | 2 | 2 | ~4 |
| Overlays | 7 | 2–3 | ~18 |
| App Structure | 5 | 2–4 | ~15 |
| Navigation (planned) | 6 | 1–3 | ~12 |
| Extended | 13 | 2–5 | ~40 |
| **Total** | **55** | | **~155** |

---

## Launch gate (docs v1)

A widget page may publish when:

1. ✅ `basic.tsx` exists and renders
2. ✅ At least **2** additional examples from this matrix (or all applicable if widget is simple)
3. ✅ Widget MDX page all sections filled
4. ✅ Registry entry added
5. ✅ API reference stub exists
