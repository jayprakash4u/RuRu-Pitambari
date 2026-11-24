# Ruru Pitambari Design System

## Brand idea

**Heritage Gold × Modern Ivory** — a trusted Nepali household-care brand presented with the restraint of a premium international FMCG brand.

The seal carries heritage; the interface provides clarity. Gold is an accent, not a background treatment. Whitespace, hierarchy and consistent product photography do most of the visual work.

## Foundations

### Color roles

| Role                | Token                 | Value     | Use                                                |
| ------------------- | --------------------- | --------- | -------------------------------------------------- |
| Brand (Pure Yellow) | `--color-brand`       | `#F5BE18` | Iconic Pitambari pure yellow (matches packet body) |
| Heritage Crimson    | `--brand-crimson-600` | `#991B1B` | Red banner accents, active pills, cart badges      |
| Main text / action  | `--color-text`        | `#24231F` | Headings, body, primary buttons, footer            |
| Page background     | `--color-background`  | `#FBF9F4` | Default page canvas                                |
| Surface             | `--color-surface`     | `#FFFFFF` | Cards, forms, menus                                |
| Alternate surface   | `--color-surface-alt` | `#F5F1E8` | Section contrast, product staging                  |
| Muted text          | `--color-text-muted`  | `#706C63` | Supporting copy only                               |
| Border              | `--color-border`      | `#E3DCCF` | Card and section separation                        |
| Natural support     | `--sage-500`          | `#68735F` | Natural-care messages only                         |

Target visual ratio: **60% warm ivory, 20% white, 12% charcoal, 6% gold, 2% functional/supporting colors.** Never use gold for large page backgrounds or every button.

### Typography

- UI/body: **Manrope**; fallback includes **Noto Sans Devanagari**.
- Editorial/display: **Newsreader** for short English heritage headlines only.
- Nepali: **Noto Sans Devanagari**. Never set Nepali copy in the display serif.
- Body copy starts at 16px and uses 1.65 line-height.
- Labels are uppercase English only; Nepali labels retain natural casing and spacing.
- Limit prose to 68 characters per line.

### Spacing and layout

- Base rhythm: 8px with a 4px half-step for micro spacing.
- Main content: 1200px; wide content maximum: 1280px.
- Fluid page gutter: 18–40px.
- Section spacing: 64–128px depending on viewport.
- Use 12-column grids on desktop and one column below 768px.
- Cards: maximum 8px radius; controls: 2–6px radius. Use only subtle rounding and reserve
  circular shapes for seals, status indicators, radio controls and other inherently round elements.

### Elevation and borders

Prefer a 1px warm border. Shadows are reserved for floating menus and interactive hover states. Product cards at rest use `--shadow-xs` only.

### Motion

- 80ms for pressed-state feedback; 120ms for hover and focus.
- 220ms for component state changes and small overlays.
- 420ms maximum for intentional page reveals or larger layout transitions.
- Use `--ease-enter` for appearing elements, `--ease-exit` for leaving elements,
  `--ease-standard` for state changes and `--ease-emphasized` for deliberate branded motion.
- Animate opacity and transform whenever practical; avoid routine layout-dimension animation.
- Respect `prefers-reduced-motion`; no continuous or decorative animation.

### Responsive breakpoints

Breakpoints are mobile-first and content-led. They mark layout capacity, not device brands.

| Name  |          Width | Intended use                                       |
| ----- | -------------: | -------------------------------------------------- |
| `sm`  |  480px / 30rem | Compact layout refinements                         |
| `md`  |  768px / 48rem | Two-column layouts and navigation candidates       |
| `lg`  | 1024px / 64rem | Desktop content grids                              |
| `xl`  | 1280px / 80rem | Wide composition at the standard maximum           |
| `2xl` | 1440px / 90rem | Additional breathing room; content stops expanding |

Use `min-width` queries for progressive enhancement. Prefer container queries when a component must
adapt independently across multiple page regions.

## Component rules

The reusable UI library is exported from `@/components/ui`. Primitives are Server Component
compatible by default and contain no business logic. Feature-specific variants stay with the feature.

### Buttons

- Primary charcoal: default customer action.
- Secondary outline: alternate action.
- Brand gold: one special commercial action per view, such as “Become a dealer”.
- Labels describe outcomes; do not add arrows inside buttons.
- Minimum target height: 48px.

### Cards

- White background, warm border, consistent 24px padding.
- Product imagery must use one aspect ratio across a collection.
- One benefit line and one clear action; no feature overload.

### Forms

- Visible labels are mandatory; placeholders are examples, not labels.
- Errors use text plus color. Never communicate status using color alone.
- Focus rings must remain visible against ivory and white.
- Pair `Field` with `Input`; connect help and error IDs through `aria-describedby` at the call site.

### Available primitives

- `Button`: primary, secondary, brand and ghost variants in three sizes.
- `Card`: composable header, title, description, content and footer regions.
- `Badge`: brand, neutral and semantic status tones.
- `Input` and `Field`: accessible form foundation with hint and error presentation.
- `Textarea`, `Select`, `Checkbox` and `Radio`: native form semantics with shared states.
- `Dialog` and `Drawer`: controlled modal overlays with native focus management.
- `Dropdown` and `Tooltip`: compact contextual actions and supporting information.
- `Table` and `Pagination`: responsive data presentation and navigation.
- `Tabs`: keyboard-focusable client-side content switching.
- `Skeleton`, `Loader` and `EmptyState`: consistent loading and no-result feedback.
- `Container`, `Stack` and `Cluster`: consistent composition and spacing primitives.

## Photography direction

- Front-facing product pack on ivory or white studio background.
- Soft, natural shadow; consistent camera angle and color temperature.
- Use real copper/brass vessels and authentic Nepali home context selectively.
- Avoid generic stock cleaning imagery, collages and mixed backgrounds.

## Logo usage

- Preserve the supplied circular seal exactly; do not redraw its symbols.
- Full seal: footer, story, packaging and certification contexts.
- Future horizontal lockup: seal/emblem left, “Ruru Pitambari” wordmark right.
- Clear space: at least 25% of the seal diameter on every side.
- Never place the antique-gold mark over a busy photograph.
- The supplied image is retained as the source reference; a transparent SVG master should be prepared before final launch.

## Content voice

Warm, confident, simple, trustworthy, Nepali-rooted and modern. Prefer verifiable statements such as “Made for copper and brass care.” Avoid unsupported superlatives such as “Nepal’s leading” or “world-class”.

## Accessibility baseline

- WCAG AA contrast for all functional text and controls.
- Keyboard-visible focus on every interactive element.
- Minimum 44×44px touch target; buttons use 48px.
- Semantic headings, labels and landmarks.
- Meaningful alt text for product images; decorative images use empty alt text.
- Reduced-motion support is built into the base styles.

## Engineering rule

Components consume semantic tokens (`--color-text`, `--color-surface`) rather than raw hex values. New colors, spacing values, radii or shadows must be added to `tokens.css` first—never introduced ad hoc inside a page.
