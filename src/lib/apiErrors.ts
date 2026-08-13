/**
 * Shared write-error mapping for the stays API routes.
 *
 * Duplicate slug → 409, schema validation (bad category, negative price) → 400
 * with the field messages. Both are caller mistakes, so neither should surface
 * as a 500 in the admin UI or in logs.
 *
 * Lives here rather than in a route file because Next only permits HTTP method
 * and config exports from route.ts.
 */
export function handleWriteError(error: unknown, action: string) {
  if (typeof error === 'object' && error !== null) {
    if ('code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }

    if ((error as { name?: string }).name === 'ValidationError') {
      const errors =
        (error as { errors?: Record<string, { message: string }> }).errors ?? {};
      const message =
        Object.values(errors)
          .map((e) => e.message)
          .join('; ') || 'Validation failed';
      return Response.json({ error: message }, { status: 400 });
    }
  }

  console.log(error);
  return Response.json({ error: `Failed to ${action}` }, { status: 500 });
}
