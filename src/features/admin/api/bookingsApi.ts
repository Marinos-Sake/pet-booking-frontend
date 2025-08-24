import type {PageParams, PageResp} from "../../../lib/types/typesPagination.ts";
import type {Booking} from "../types.ts";
import {toSearchParams} from "../../../lib/query.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function adminListBookings(
    token: string,
    params: PageParams
): Promise<PageResp<Booking>> {
    const r = await fetch(`${API_URL}/bookings?${toSearchParams(params)}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${await r.text()}`);
    return r.json() as Promise<PageResp<Booking>>;
}


export async function adminDeleteBooking(token: string, id: number): Promise<void> {
    const r = await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${await r.text()}`);
}