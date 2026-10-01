const DEFAULT_BASE_URL = 'http://127.0.0.1:3001';

/**
 * Base URL of the json-server API (see `.env.example`).
 *
 * `API_URL` is a server-only variable read at runtime; Next.js never exposes it
 * to the browser, where it is `undefined`. Client-side callers fall back to
 * `NEXT_PUBLIC_API_URL`.
 */
export const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;

export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Fetches a single resource from the API.
 *
 * This is the only place in the app that talks to `fetch`, so request
 * behaviour (base URL, headers, error shape) is defined once.
 */
export const getResource = async <T>(resource: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/${resource}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal,
  });

  if (!response.ok) {
    throw new ApiError(`Request for "${resource}" failed.`, response.status);
  }

  return (await response.json()) as T;
};
