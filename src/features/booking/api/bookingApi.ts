import type {createBooking, QuoteRequest, QuoteResponse} from "../types";
import type { BookingListItem } from "../types";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function createBooking(
    token: string,
    payload: createBooking
) {
    const response = await fetch(`${API_URL}/bookings`, {
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


export async function getQuote(
    payload: QuoteRequest,
    token?: string
): Promise<QuoteResponse> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/bookings/quote`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}

export async function getMyBookings(token: string): Promise<BookingListItem[]> {
    const response = await fetch(`${API_URL}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}




