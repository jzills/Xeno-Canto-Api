# Xeno Canto API

A TypeScript client library for the [Xeno Canto API v3](https://xeno-canto.org/explore/api) — a database of wildlife sound recordings.

## Commands

From the `lib/` directory:

```bash
npm run build            # Compile ESM + CJS bundles with type declarations
npm test                 # Run unit tests in watch mode
npx vitest run           # Run all unit tests once
npm run test:integration # Run integration tests against the live API (requires VITE_API_KEY in lib/.env)
```

## Architecture

### Builder pattern (mixin composition)

The library uses Higher-Order Function (HOF) mixins to compose query builders — the same pattern used across the sibling Freesound-Api and InternetArchive-Api libraries.

```
FilterQueryBuilder (mixin)
    └── QueryBuilder (base class)
            ↓
XenoCantoRequestBuilder (final composed class)
```

Each mixin is a function that takes a base class and returns an extended class:

```typescript
export default function FilterQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<IFilterQueryBuilder>
```

This allows tree-shakeable, type-safe composition without a diamond problem.

### File structure

```
lib/src/
  builders/
    interfaces/filter-query-builder.ts  TypeScript interface for the filter mixin
    query-builder.ts                    Base class: tags[], page, perPage, build(APIKey)
    filter-query-builder.ts             Mixin: all tag filter methods + Group/Area/Sex/Quality types
  types/
    constructor.ts                      Generic Constructor<T> utility type
    annotation.ts                       AnnotationSet, Annotation, OriginalSetMetadata types
    recording.ts                        Recording, Sonogram, Oscillogram types
    recordings-response.ts              RecordingsResponse type
  xeno-canto.ts                         Main API client class
  xeno-canto-request-builder.ts         Composed builder (FilterQueryBuilder + QueryBuilder)
  index.ts                              Public exports
```

### Query building

The Xeno Canto API v3 accepts **tag-based queries only**. Each tag has the form `tag:value`. Multi-word values and operator-prefixed values (`>`, `<`, `=`) are automatically quoted by `QueryBuilder.addTag()`:

```typescript
new XenoCantoRequestBuilder()
  .withGenus("larus")
  .withSpecies("fuscus")         // sp:fuscus
  .withGroup("land mammals")     // grp:"land mammals"  ← auto-quoted
  .withLength(">3600")           // len:">3600"          ← auto-quoted
  .withPage(2)
  .withPerPage(50)
```

The `build(APIKey)` method serialises everything into URLSearchParams: `query`, `key`, `page`, `per_page`.

### HTTP requests

The library uses the native `fetch` API — zero production dependencies.

## Build output

```
dist/xeno-canto-api.js    ESM bundle
dist/xeno-canto-api.cjs   CommonJS bundle
dist/index.d.ts           TypeScript declarations (ESM)
dist/index.d.cts          TypeScript declarations (CommonJS)
```

`vite-plugin-dts` with `rollupTypes: true` merges all `.d.ts` files into a single file.

## Test structure

**Unit tests** (`test/unit/`) — mock `fetch` globally using `vi.stubGlobal`. Tests verify URL construction and query string output without hitting the network.

**Integration tests** (`test/integration/`) — call the live Xeno Canto API. Requires `VITE_API_KEY=<your_key>` in `lib/.env`. A 1-second delay between tests avoids rate limiting.

Test configuration:
- `vitest.config.ts` — unit tests, single thread, 15s timeout
- `vitest.integration.config.ts` — integration tests, single thread, 15s timeout
