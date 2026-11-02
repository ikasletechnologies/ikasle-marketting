import { APP_CONFIG } from '../utils/constants';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(this.buildUrl(endpoint, options.params), {
      ...options,
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      let message = `API Error: ${res.statusText} (${res.status})`;
      try {
        const errorBody = await res.json();
        if (typeof errorBody?.message === 'string' && errorBody.message) {
          message = errorBody.message;
        }
      } catch {
        // Keep the HTTP status message when the server does not return JSON.
      }
      throw new Error(message);
    }

    return res.json();
  }

  async post<T>(endpoint: string, body: unknown, options: RequestOptions = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(this.buildUrl(endpoint, options.params), {
      ...options,
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let message = `API Error: ${res.statusText} (${res.status})`;
      try {
        const errorBody = await res.json();
        if (typeof errorBody?.message === 'string' && errorBody.message) {
          message = errorBody.message;
        }
      } catch {
        // Keep the HTTP status message when the server does not return JSON.
      }
      throw new Error(message);
    }

    return res.json();
  }
}

export const api = new ApiClient(APP_CONFIG.apiBaseUrl);
