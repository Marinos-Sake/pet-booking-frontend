import type { LoginRequest, LoginResponse, MeProfile, RegisterPayload } from "../types";

export async function loginApi(body: LoginRequest): Promise<LoginResponse> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
}

export async function meApi(token: string): Promise<MeProfile> {
    const response = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
}


export async function registerApi(payload: RegisterPayload): Promise<RegisterPayload> {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
}
