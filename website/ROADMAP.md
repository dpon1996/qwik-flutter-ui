# Documentation Roadmap

Phased plan to ship the documentation website. Each phase has clear exit criteria. **No widget API changes** — docs consume the existing public surface.

---

## Phase 0 — Foundation (current)

**Status:** Architecture complete

Deliverables:

- [x] Website directory structure and architecture docs
- [x] Navigation structure defined
- [x] Widget page template specified
- [x] Example system + metadata schema
- [x] Live preview (`ExamplePreview`) design
- [x] Playground architecture
- [x] Example coverage matrix
- [x] This roadmap

Exit criteria: All design docs reviewed; team aligned on approach.

---

## Phase 1 — Docs shell (4–6 weeks)

**Goal:** Runnable docs site with Getting Started and one reference widget end-to-end.

### Tasks

1. **Scaffold Qwik City app** in `website/`
   - Vite config extending monorepo paths
   - `npm run dev:docs`, `npm run build:docs` scripts at repo root
   - Static adapter pre-render config

2. **Docs shell components**
   - `DocsLayout`, `Sidebar`, `TopNav`, `TableOfContents`
   - `navigation.ts` from [NAVIGATION.md](./docs/NAVIGATION.md)

3. **Core doc components (v1 subset)**
   - `CodeBlock` + Shiki
   - `ExamplePreview` + `PreviewShell`
   - `WidgetHeader`, `Callout`, `PackageImport`

4. **Getting Started content**
   - All 6 MDX pages (content migrated from README + API_DESIGN principles)

5. **Pilot widget page**
   - Full `TextField` page per [WIDGET_PAGE_TEMPLATE.md](./docs/WIDGET_PAGE_TEMPLATE.md)
   - 3 examples in `examples/text-field/` (basic, controlled, decoration)

6. **Deployment**
   - GitHub Actions workflow → GitHub Pages (or Cloudflare)
   - `DOCS_BASE_PATH` for project pages

### Exit criteria

- `npm run build:docs` produces static `website/dist/`
- Getting Started + TextField page live on staging URL
- ExamplePreview copy works; Shiki highlights TSX
- Lighthouse performance ≥ 90 on static page

---

## Phase 2 — Widget catalog (6–8 weeks)

**Goal:** Every shipped widget has a documentation page meeting launch gate.

### Tasks

1. **Batch widget MDX pages** by category:
   - Layout (13)
   - Typography (1)
   - Forms (3)
   - Selection (5)
   - Theming (2)
   - Overlays (7)
   - App Structure (4–5)

2. **Example implementation** per [COVERAGE_MATRIX.md](./examples/COVERAGE_MATRIX.md)
   - Priority: minimum examples first (~80 files)
   - `examples/registry.ts` manual index

3. **Remaining doc components**
   - `PropsTable` (hand-authored JSON v1)
   - `FlutterComparison`, `RelatedWidgets`
   - `AccessibilityNotes`, `SSRNotes`

4. **Widget catalog index** at `/docs/widgets`
   - Grid with category filters and search

5. **Extended widgets** (Button, Card, scrolling, form fields)

### Exit criteria

- All **shipped** widgets pass launch gate in COVERAGE_MATRIX
- Navigation sidebar complete for shipped widgets
- Related widget links bidirectional for top 20 widgets

---

## Phase 3 — Playground + Examples (3–4 weeks)

**Goal:** Public playground and recipe pages.

### Tasks

1. **Playground v1** per [playground/README.md](./playground/README.md)
   - `/playground` and `/playground/[widget]`
   - Example picker, theme toggle, source copy

2. **Recipe pages**
   - Layout recipes, form recipes, dashboard, mobile layouts

3. **Example validation CI**
   - `scripts/validate-examples.ts` in GitHub Actions

4. **Migrate contributor playground**
   - Deprecate inline demos in `src/routes/index.tsx` gradually
   - Link from old playground to new docs

### Exit criteria

- Every registry example runnable in playground
- URL deep-linking works (`?ex=basic`)
- CI fails on missing required examples

---

## Phase 4 — API reference (3–4 weeks)

**Goal:** Searchable API reference generated from types.

### Tasks

1. **`scripts/generate-api-docs.ts`**
   - Parse `lib-types/` → JSON
   - Merge descriptions from `docs/API_DESIGN.md` (manual map initially)

2. **API section pages**
   - `/docs/api/components`, `/types`, `/enums`, `/hooks`

3. **PropsTable codegen**
   - Replace hand-authored JSON

4. **Static search (Pagefind)**
   - Index MDX + API pages post-build

### Exit criteria

- PropsTable auto-generated for all exported components
- Search returns widget pages and API entries
- Zero drift between npm types and docs (CI diff check)

---

## Phase 5 — Navigation widgets + polish (2–3 weeks)

**Goal:** Document v1.9 Navigation when shipped; production polish.

### Tasks

1. Navigation widget pages (Link, Tabs, TabBar, TabPanel, Breadcrumb, NavigationRail)
2. BottomNavigationBar page when exported
3. OG images, sitemap, RSS (optional)
4. Analytics hook (optional Plausible)
5. "Edit this page on GitHub" links

### Exit criteria

- Planned widgets show `planned` badge with spec links
- Custom domain configured (if applicable)
- README points to docs URL

---

## Phase 6 — Playground v2 (future)

**Not required for v1.** Track separately.

- Live Monaco editor + esbuild-wasm
- Property controls from API JSON
- Shareable playground URLs with state
- Visual regression for examples

---

## Milestone timeline (estimate)

```
2025 Q2  Phase 0 ████████████ COMPLETE (architecture)
2025 Q3  Phase 1 ████░░░░░░░░ Docs shell + pilot
2025 Q3  Phase 2 ░░░░████████ Widget catalog
2025 Q4  Phase 3 ░░░░░░░░████ Playground + recipes
2025 Q4  Phase 4 ░░░░░░░░░░██ API reference + search
2026 Q1  Phase 5 ░░░░░░░░░░░░ Navigation + polish
2026+    Phase 6 ░░░░░░░░░░░░ Live editor (optional)
```

---

## Ownership matrix

| Area | Primary artifacts |
| --- | --- |
| Content (MDX) | `website/docs/` |
| Examples | `website/examples/` |
| Doc components | `website/components/` |
| Playground | `website/playground/` + routes |
| API data | `lib-types/` + `scripts/generate-api-docs.ts` |
| CI / deploy | `.github/workflows/deploy-docs.yml` |

---

## Risk register

| Risk | Mitigation |
| --- | --- |
| Example drift from API | CI compile + validate-examples |
| Large bundle from Shiki themes | Single theme pair; lazy load |
| Overlay examples break SSR | PreviewShell client boundary; static fallback |
| Navigation widgets delayed | Planned badge pages; don't block Phase 2 |
| Duplicate playground maintenance | Single registry; deprecate `src/routes/index.tsx` |

---

## Success metrics

| Metric | Target |
| --- | --- |
| Widget pages with ≥3 examples | 100% shipped widgets |
| Time to first preview (LCP) | < 2.5s on 3G |
| Copy-to-clipboard success | Works in all target browsers |
| Search coverage | All widget + API pages indexed |
| External links from README | Point to docs site, not GitHub blob |

---

## Next action

Start **Phase 1** by scaffolding the Qwik City app in `website/` and implementing `ExamplePreview` + one pilot widget (`TextField`).

See [README.md](./README.md) for links to all architecture documents.
