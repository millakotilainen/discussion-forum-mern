import { getAuthToken } from "./auth";

const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

function buildHeaders(includeJson: boolean): HeadersInit {
    const token = getAuthToken();

    return {
        ...(includeJson ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
}

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${base}${path}`, { method: 'GET', headers: buildHeaders(false), cache: 'no-store' });
    if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
}
