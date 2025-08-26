import type { Room} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllRooms(): Promise<Room[]> {
    const r = await fetch(`${API_URL}/rooms`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}



export async function getRoomCalendar(
    roomId: number,
    fromISO: string,
    toISO: string,
    token?: string
): Promise<{ from: string; to: string }[]> {

    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const r = await fetch(
        `${API_URL}/rooms/${roomId}/calendar?from=${fromISO}&to=${toISO}`,
        { headers } // <-- send headers
    );
    if (!r.ok) throw new Error("Failed to load room availability");
    return r.json();
}


