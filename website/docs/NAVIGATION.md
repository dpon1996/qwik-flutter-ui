# Site Navigation Structure

Complete navigation tree for the qwik-flutter-ui documentation site. Sidebar order matches this document. Items marked **(planned)** are specified in `docs/API_DESIGN.md` §106 (v1.9 Navigation) but not yet exported from the package.

---

## Top navigation

| Label | Path | Description |
| --- | --- | --- |
| Docs | `/docs` | Documentation home |
| Widgets | `/docs/widgets` | Component catalog |
| Examples | `/docs/examples` | Recipes and patterns |
| Playground | `/playground` | Interactive demos |
| API | `/docs/api` | Generated reference |
| GitHub | external | Repository link |

---

## Getting Started

Base path: `/docs/getting-started`

| Page | Slug | File |
| --- | --- | --- |
| Introduction | `introduction` | `docs/getting-started/introduction.mdx` |
| Installation | `installation` | `docs/getting-started/installation.mdx` |
| Quick Start | `quick-start` | `docs/getting-started/quick-start.mdx` |
| Design Principles | `design-principles` | `docs/getting-started/design-principles.mdx` |
| Flutter Mapping | `flutter-mapping` | `docs/getting-started/flutter-mapping.mdx` |
| Theming | `theming` | `docs/getting-started/theming.mdx` |

### Sidebar order

1. Introduction
2. Installation
3. Quick Start
4. Design Principles
5. Flutter Mapping
6. Theming

---

## Widgets

Base path: `/docs/widgets`

Each category has an index page plus one page per widget. Widget slugs use kebab-case.

### Layout

Path: `/docs/widgets/layout`

| Widget | Slug | Status |
| --- | --- | --- |
| Row | `row` | shipped |
| Column | `column` | shipped |
| Container | `container` | shipped |
| SizedBox | `sized-box` | shipped |
| Spacer | `spacer` | shipped |
| Expanded | `expanded` | shipped |
| Flexible | `flexible` | shipped |
| Center | `center` | shipped |
| Wrap | `wrap` | shipped |
| Stack | `stack` | shipped |
| Positioned | `positioned` | shipped |
| Align | `align` | shipped |
| AspectRatio | `aspect-ratio` | shipped |

### Typography

Path: `/docs/widgets/typography`

| Widget | Slug | Status |
| --- | --- | --- |
| Text | `text` | shipped |

### Forms

Path: `/docs/widgets/forms`

| Widget | Slug | Status |
| --- | --- | --- |
| TextField | `text-field` | shipped |
| TextFormField | `text-form-field` | shipped |
| Form | `form` | shipped |

### Selection Controls

Path: `/docs/widgets/selection`

| Widget | Slug | Status |
| --- | --- | --- |
| Checkbox | `checkbox` | shipped |
| Radio | `radio` | shipped |
| RadioGroup | `radio-group` | shipped |
| Switch | `switch` | shipped |
| Dropdown | `dropdown` | shipped |

### Theming

Path: `/docs/widgets/theming`

| Widget / Hook | Slug | Status |
| --- | --- | --- |
| ThemeProvider | `theme-provider` | shipped |
| useTheme | `use-theme` | shipped |

### Overlays

Path: `/docs/widgets/overlays`

| Widget | Slug | Status |
| --- | --- | --- |
| OverlayContainer | `overlay-container` | shipped |
| Dialog | `dialog` | shipped |
| AlertDialog | `alert-dialog` | shipped |
| ModalBottomSheet | `modal-bottom-sheet` | shipped |
| SnackBar | `snack-bar` | shipped |
| Tooltip | `tooltip` | shipped |
| Popover | `popover` | shipped |
| Menu | `menu` | shipped |

### App Structure

Path: `/docs/widgets/app-structure`

| Widget | Slug | Status |
| --- | --- | --- |
| AppShell | `app-shell` | shipped |
| AppBar | `app-bar` | shipped |
| Drawer | `drawer` | shipped |
| SideSheet | `side-sheet` | shipped |
| BottomNavigationBar | `bottom-navigation-bar` | specified (v1.8) |

### Navigation **(planned v1.9)**

Path: `/docs/widgets/navigation`

| Widget | Slug | Status |
| --- | --- | --- |
| Link | `link` | planned |
| Tabs | `tabs` | planned |
| TabBar | `tab-bar` | planned |
| TabPanel | `tab-panel` | planned |
| Breadcrumb | `breadcrumb` | planned |
| NavigationRail | `navigation-rail` | planned |

---

## Extended widgets (documented, secondary nav)

Shipped widgets not in the primary taxonomy above. Listed under **Widgets → More** or cross-linked from related pages.

| Widget | Slug | Category link |
| --- | --- | --- |
| Button | `button` | Forms / Actions |
| Card | `card` | Display |
| Divider | `divider` | Display |
| Image | `image` | Display |
| Visibility | `visibility` | Display |
| SingleChildScrollView | `single-child-scroll-view` | Layout |
| ListView | `list-view` | Layout |
| GridView | `grid-view` | Layout |
| MediaQuery | `media-query` | Layout |
| CheckboxFormField | `checkbox-form-field` | Forms |
| RadioGroupFormField | `radio-group-form-field` | Forms |
| DropdownFormField | `dropdown-form-field` | Forms |

---

## Examples

Base path: `/docs/examples`

| Page | Slug | Description |
| --- | --- | --- |
| Overview | `index` | How examples work |
| Widget Examples | `widget-examples` | Index linking to per-widget examples |
| Layout Recipes | `layout-recipes` | Multi-widget layout patterns |
| Form Recipes | `form-recipes` | Validation, decoration, submission |
| Dashboard Layouts | `dashboard-layouts` | AppShell + nav + content |
| Mobile Layouts | `mobile-layouts` | Bottom nav, sheets, responsive |

---

## Playground

Base path: `/playground`

| Route | Description |
| --- | --- |
| `/playground` | Global example picker (all widgets) |
| `/playground/[widget]` | Widget-scoped playground (e.g. `/playground/text-field`) |

---

## API Reference

Base path: `/docs/api`

| Section | Path | Contents |
| --- | --- | --- |
| Overview | `/docs/api` | How to read the reference |
| Components | `/docs/api/components` | One page per exported component |
| Types | `/docs/api/types` | Shared types (`Length`, `EdgeInsets`, …) |
| Enums | `/docs/api/enums` | `MainAxisAlignment`, `ButtonVariant`, … |
| Hooks | `/docs/api/hooks` | `useTheme`, `useMediaQuery`, form hooks |

### Component API slugs

Mirror widget slugs: `/docs/api/components/text-field`.

---

## `navigation.ts` config shape

Sidebar is generated from a typed config (not hand-maintained HTML):

```ts
export type NavItem = {
  title: string;
  href?: string;
  badge?: "new" | "planned";
  children?: NavItem[];
};

export const docsNavigation: NavItem[] = [
  {
    title: "Getting Started",
    children: [
      { title: "Introduction", href: "/docs/getting-started/introduction" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      // ...
    ],
  },
  {
    title: "Widgets",
    children: [
      {
        title: "Layout",
        children: [
          { title: "Row", href: "/docs/widgets/layout/row" },
          // ...
        ],
      },
      // ...
    ],
  },
  // Examples, API sections
];
```

Badge **planned** renders a muted pill on Navigation section items not yet in npm.

---

## Breadcrumbs

Every docs page computes breadcrumbs from the nav tree:

```
Docs / Widgets / Forms / TextField
```

Playground breadcrumbs:

```
Playground / TextField / Basic
```

---

## Footer links

- GitHub repository
- npm package
- Issue tracker
- License (MIT)
