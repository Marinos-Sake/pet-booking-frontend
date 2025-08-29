import type {CreateRoomPayload, Room} from "../../room/types.ts";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getRooms(token: string): Promise<Room[]> {
    const response = await fetch(`${API_URL}/rooms`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}

export async function createRoom(token: string, body: CreateRoomPayload): Promise<Room> {
    const response = await fetch(`${API_URL}/rooms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}

export async function deleteRoom(token: string, id: number): Promise<void> {
    const response = await fetch(`${API_URL}/rooms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

}

export async function updateRoomAvailability(
    token: string,
    id: number,
    available: boolean
): Promise<void> {
    const response = await fetch(`${API_URL}/rooms/${id}/availability?available=${available}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

}
