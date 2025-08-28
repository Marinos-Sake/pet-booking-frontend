import type {LoginRequest, LoginResponse, MeProfile, RegisterPayload} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginApi(body: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Invalid username or password.")
    }

    return response.json();
}

export async function meApi(token: string): Promise<MeProfile> {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error("Something went wrong. Please try later.");
    }

    return response.json();
}


export async function registerApi(payload: RegisterPayload): Promise<RegisterPayload> {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
    }

    return response.json();
}

export async function updateMyProfile(token: string, payload: any): Promise<MeProfile> {
    const response = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
    }

    return response.json();
}