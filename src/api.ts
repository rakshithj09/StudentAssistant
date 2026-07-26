let csrfToken: string | null = null;

export interface ApiErrorPayload {
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string; code: string }>;
  };
}

export class ApiClientError extends Error {
  status: number;
  payload: ApiErrorPayload;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.error.message);
    this.status = status;
    this.payload = payload;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = options.method ?? 'GET';
  const headers = new Headers(options.headers);

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    csrfToken ??= await fetchCsrfToken();
    headers.set('x-csrf-token', csrfToken);
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(path, {
    ...options,
    method,
    credentials: 'include',
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const json = await response.json();
  if (!response.ok) {
    throw new ApiClientError(response.status, json);
  }

  return json.data as T;
}

async function fetchCsrfToken(): Promise<string> {
  const response = await fetch('/api/auth/csrf', { credentials: 'include' });
  const json = await response.json();
  return json.data.csrfToken;
}
