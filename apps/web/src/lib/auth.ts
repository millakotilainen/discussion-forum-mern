export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAuthToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem("authToken");
}

export function getAuthUser(): AuthUser | null {
    if (!isBrowser()) return null;
    const userJson = window.localStorage.getItem("user");
    if (!userJson) return null;

    try {
        return JSON.parse(userJson) as AuthUser;
    } catch {
        return null;
    }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function setAuthSession(token: string, user: AuthUser) {
    if (!isBrowser()) return;
    window.localStorage.setItem("authToken", token);
    window.localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuthSession() {
    if (!isBrowser()) return;
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("user");
}