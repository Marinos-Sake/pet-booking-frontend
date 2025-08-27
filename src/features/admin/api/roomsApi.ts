import type {CreateRoomPayload, Room} from "../../room/types.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getRooms(token: string): Promise<Room[]> {
    const res = await fetch(`${API_URL}/rooms`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error(await res.text().catch(() => "Failed to fetch rooms"));
    return res.json();
}

export async function createRoom(token: string, body: CreateRoomPayload): Promise<Room> {
    const res = await fetch(`${API_URL}/rooms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text().catch(() => "Failed to create room"));
    return res.json();
}

export async function deleteRoom(token: string, id: number): Promise<void> {
    const res = await fetch(`${API_URL}/rooms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text().catch(() => "Failed to delete room"));
}

export async function updateRoomAvailability(
    token: string,
    id: number,
    available: boolean
): Promise<void> {
    const res = await fetch(`${API_URL}/rooms/${id}/availability?available=${available}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text().catch(() => "Failed to update availability"));
}
