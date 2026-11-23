# Tailwind and responsive standards

## Token-first utilities

Tailwind is a composition layer over the existing design tokens. The approved Tailwind theme is defined
in `src/styles/tailwind.css`; it does not replace `tokens.css`. Use semantic utilities such as
`bg-brand-primary`, `text-ink`, `border-ui-border`, `rounded-ui-lg` and `shadow-ui-sm`.

Do not use arbitrary values (`w-[37px]`), raw hex colors, inline pixel styles or one-off spacing. Add a
token only when a value is reusable and belongs to the system. `npm run styles:check` rejects arbitrary
values in static `className` attributes and class strings longer than twelve utilities.

## Mobile-first behavior

Unprefixed utilities describe the mobile layout. Add enhancements in ascending order:

| Prefix |       Width | Layout intent                                                   |
| ------ | ----------: | --------------------------------------------------------------- |
| none   | below 480px | Mobile: single column and full-width actions where useful       |
| `sm:`  |       480px | Larger phones and compact refinements                           |
| `md:`  |       768px | Tablet: two-column opportunities and navigation expansion       |
| `lg:`  |      1024px | Desktop: full content grids and persistent secondary navigation |
| `xl:`  |      1280px | Large desktop: wider composition without wider prose            |
| `2xl:` |      1440px | Additional outer whitespace; content remains capped             |

Never write desktop defaults followed by repeated mobile overrides. Responsive changes should follow
content needs, not particular device models.

## Layout and spacing

- Use `content-container` or `content-container-wide` instead of repeating width and gutter utilities.
- Use `section-block` for standard vertical section rhythm.
- Use the numbered spacing tokens only. Their names map to the project's approved scale, not Tailwind's
  default numeric values.
- Prefer `gap-*` on parents to child margins.
- Keep prose constrained with the existing `.prose` pattern even on large screens.

## Class composition

- Use a shared UI primitive before writing another button, input, card or overlay class list.
- Keep page-level `className` values short and structural.
- Extract repeated combinations as `@utility` rules or as a reusable component.
- Use `classNames()` for conditional states. Do not assemble utilities from partial dynamic strings;
  Tailwind must be able to detect complete class names statically.

## Touch and type

- Interactive targets are at least 44×44px. Use `touch-target` for icon-only controls.
- Primary controls remain 48px high through the UI library.
- Typography uses fluid `text-ui-*` tokens, so headings scale without breakpoint-specific pixel values.
- Hover behavior must have an equivalent focus state; do not depend on hover for essential actions.

## Responsive QA matrix

Before a feature is complete, verify it at approximately 360px, 768px, 1024px, 1280px and 1440px.
Check overflow, readable line length, tap targets, keyboard focus, navigation behavior, tables, dialogs and
reduced-motion mode.
