import type { Pet, CreatePetPayload } from "../types";

export async function createPetApi(token: string, payload: CreatePetPayload): Promise<Pet> {
    const res = await fetch("/api/pets", {
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
