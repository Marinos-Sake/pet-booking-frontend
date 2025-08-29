import type { Room} from "../types";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllRooms(): Promise<Room[]> {
    const response = await fetch(`${API_URL}/rooms`);

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}



export async function getRoomCalendar(
    roomId: number,
    fromISO: string,
    toISO: string,
    token?: string
): Promise<{ from: string; to: string }[]> {

    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
        `${API_URL}/rooms/${roomId}/calendar?from=${fromISO}&to=${toISO}`,
        { headers } // <-- send headers
    );
    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}


