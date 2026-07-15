/**
 * URL construction depending on the context (client or server).
 * 
 * - Server -> use NEXT_SERVER_HOST to prevent the use of "localhost"
 * - Client -> use NEXT_PUBLIC_API_URL
 */
function resolveApiUrl(endpoint: string, publicApiUrl: string, serverApiUrl: string): string {
  const fullUrl = `${publicApiUrl}${endpoint}`;

  if (typeof window !== "undefined")
    return fullUrl;

  /**
   * Extract only the path + query from the public URL (in case NEXT_PUBLIC_API_URL
   * includes a prefix like "/api/v1"), then rebuild the URL using the server host.
   * This avoids silently dropping any path prefix when running server-side.
   */
  const path = fullUrl.startsWith("http")
    ? new URL(fullUrl).pathname + new URL(fullUrl).search
    : fullUrl;

  return `${serverApiUrl}${path}`;
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const serverApiUrl = process.env.NEXT_SERVER_HOST;

  if (!publicApiUrl || !serverApiUrl) {
    throw new Error("API URLs are not defined in environment variables");
  }

  const url = resolveApiUrl(endpoint, publicApiUrl, serverApiUrl);

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData: { error?: string } = await response.json().catch(() => ({}));
    throw new Error(errorData.error ?? `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}