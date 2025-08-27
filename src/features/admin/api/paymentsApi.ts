import type {PageParams, PageResp} from "../../../lib/types/typesPagination.ts";
import type {Payment} from "../types.ts";
import {toSearchParams} from "../../../lib/query.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function adminListPayments(
    token: string,
    params: PageParams
): Promise<PageResp<Payment>> {
    const r = await fetch(`${API_URL}/payments?${toSearchParams(params)}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${await r.text()}`);
    return r.json() as Promise<PageResp<Payment>>;
}