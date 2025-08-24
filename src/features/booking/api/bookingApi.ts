import type {createBooking, QuoteRequest, QuoteResponse} from "../types";
import type { BookingListItem } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createBooking(
    token: string,
    payload: createBooking
) {
    const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Οι ημερομηνίες που επέλεξες δεν είναι διαθέσιμες για κράτηση.");
    }

    return res.json();
}


export async function getQuote(
    payload: QuoteRequest,
    token?: string
): Promise<QuoteResponse> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const r = await fetch(`${API_URL}/bookings/quote`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function getMyBookings(token: string): Promise<BookingListItem[]> {
    const r = await fetch(`${API_URL}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}




