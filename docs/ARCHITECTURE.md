# Application architecture

## Dependency direction

```text
app routes → feature public APIs → feature business/data layers
          ↘ shared UI + shared libraries
```

Routes compose capabilities and define metadata. They do not contain business rules. Features own their domain behavior. Shared UI is presentational and knows nothing about individual features.

## Server-first rendering

All components are Server Components unless a browser API, local interactive state or event handler is required. Client boundaries should be leaf components where possible. Data fetching happens in Server Components or server-only feature modules, not in client effects.

## Environment variables

- `.env.example` documents every required variable without secrets.
- `src/env/server.ts` validates server-only values and cannot be bundled into the browser.
- `src/env/client.ts` explicitly lists browser-safe `NEXT_PUBLIC_*` variables.
- Application code imports validated values instead of reading `process.env` directly.

## Import policy

- `@/*` maps to `src/*`.
- `@/components/*` and `@/features/*` are explicit aliases for the primary boundaries.
- Import other features through their root `index.ts` public API.
- Do not deep-import another feature's internal components.

## Quality gates

The pre-commit hook runs lint-staged for changed source files. CI should run `npm run validate`, which performs strict TypeScript checking, ESLint, Prettier verification and a production build.

## API and security

Versioned handlers use the shared API response, validation and error boundary utilities in `src/lib/api`.
Authentication and authorization contracts live in `src/lib/auth`. See `docs/API_STANDARDS.md` for the
required request lifecycle and security boundary.

## Styling

Tailwind is configured as a token-controlled utility layer. Responsive and utility-composition rules are
defined in `docs/TAILWIND_STANDARDS.md`; arbitrary values and oversized static class strings are checked
by `npm run styles:check`.
