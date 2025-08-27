import type { Pet, CreatePetPayload } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPetApi(token: string, payload: CreatePetPayload): Promise<Pet> {
    const res = await fetch(`${API_URL}/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let txt = "";
        try { txt = await res.text(); } catch {}
        const err = new Error(txt || "Αποτυχία δημιουργίας κατοικιδίου");
        (err as any).status = res.status;
        throw err;
    }
    return res.json();
}

export async function getMyPets(token: string): Promise<Pet[]> {
    const r = await fetch(`${API_URL}/pets/my`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(await r.text());
    return await r.json();
}
