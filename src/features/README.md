# Features

Each business capability owns its components, server actions, data access, schemas, types and tests.

```text
features/<feature-name>/
  components/     feature-specific presentation
  server/         server-only data access and actions
  lib/            framework-independent business rules
  schemas/        validation at system boundaries
  types/          feature-owned types
  index.ts        public API; other modules import only from here
```

Rules:

1. Server Components are the default; add `"use client"` only at the smallest interactive boundary.
2. UI components do not fetch data or contain business rules.
3. Data access stays in `server/` and imports `server-only`.
4. Shared, brand-agnostic primitives belong in `src/components/ui`.
5. Cross-feature logic moves to `src/lib` only after it is genuinely shared.
6. Features expose a deliberate public API from `index.ts`; avoid deep imports.
