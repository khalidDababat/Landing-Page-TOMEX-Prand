const DEFAULT_BASE_URL = 'http://localhost:3001';

/** Base URL of the json-server API (see `.env.example`). */
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_BASE_URL;

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
    signal,
  });

  if (!response.ok) {
    throw new ApiError(`Request for "${resource}" failed.`, response.status);
  }

  return (await response.json()) as T;
};
