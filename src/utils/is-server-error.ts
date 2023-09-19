import type { ServerResponse } from "../types/api";

export function isServerError(
  error: unknown,
): error is ServerResponse<unknown> {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as ServerResponse<unknown>).error === 1
  );
}
