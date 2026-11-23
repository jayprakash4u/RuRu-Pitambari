# API and security standards

## Versioning

Public handlers live under `/api/v1`. Responses include `x-api-version` and `x-request-id` headers,
and repeat version, request ID and timestamp in the response metadata. Breaking contract changes require
a new path version. Additive fields do not.

## Response contract

Success:

```json
{ "success": true, "data": {}, "meta": { "requestId": "…", "timestamp": "…", "version": "v1" } }
```

Failure:

```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "…", "details": [] },
  "meta": { "requestId": "…", "timestamp": "…", "version": "v1" }
}
```

Use stable machine-readable error codes. Internal errors are logged with the request ID but never sent
to clients. Route handlers should be wrapped with `withApiHandler`.

## Validation

Validate every external boundary with Zod, including JSON bodies, query parameters, environment values
and third-party payloads. `parseJson` distinguishes malformed JSON from schema violations and converts
Zod issues into the standard error detail shape.

## Authentication and authorization

`proxy.ts` provides an early session-cookie presence check for protected route families. This is only a
coarse gate, not proof of identity. Every protected server action and route handler must call
`requireSession` with the production authentication provider's `SessionVerifier`, which must verify the
token signature, issuer, audience, expiry and revocation state.

Authorization is explicit and server-side. Call `requireRole` or `requirePermission` after authentication
and before data access. UI visibility is convenience only and never an authorization boundary.

The authentication provider is intentionally not fabricated in this foundation. Integrate the selected
provider by implementing `SessionVerifier`; do not parse or trust raw cookie payloads.
