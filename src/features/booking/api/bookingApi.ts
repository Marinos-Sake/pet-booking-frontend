import type { QuoteRequest, QuoteResponse } from "../types";
import type { BookingListItem } from "../types";

export async function createBooking(
    token: string,
    payload: {
        checkInDate: string;
        checkOutDate: string;
        petId: number;
        roomId: number;
    }
) {
    const r = await fetch("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}


export async function getQuote(
    payload: QuoteRequest,
    token?: string
): Promise<QuoteResponse> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const r = await fetch("/api/bookings/quote", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function getMyBookings(token: string): Promise<BookingListItem[]> {
    const r = await fetch("/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}



