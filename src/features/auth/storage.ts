const KEY = "auth.jwt";

export function getToken(): string | null {
    try {
        return localStorage.getItem(KEY);
    } catch {
        return null;
    }
}

export function setToken(token: string) {
    try {
        localStorage.setItem(KEY, token);
    } catch {}
}

export function clearToken() {
    try {
        localStorage.removeItem(KEY);
    } catch {}
}
