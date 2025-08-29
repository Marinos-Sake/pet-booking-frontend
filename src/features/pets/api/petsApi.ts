import type { Pet, CreatePetPayload } from "../types";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPetApi(token: string, payload: CreatePetPayload): Promise<Pet> {
    const response = await fetch(`${API_URL}/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}

export async function getMyPets(token: string): Promise<Pet[]> {
    const response = await fetch(`${API_URL}/pets/my`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return await response.json();
}
