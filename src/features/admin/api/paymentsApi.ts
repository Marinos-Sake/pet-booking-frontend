import type {PageParams, PageResp} from "../../../lib/types/typesPagination.ts";
import type {Payment} from "../types.ts";
import {toSearchParams} from "../../../lib/query.ts";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function adminListPayments(
    token: string,
    params: PageParams
): Promise<PageResp<Payment>> {
    const response = await fetch(`${API_URL}/payments?${toSearchParams(params)}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json() as Promise<PageResp<Payment>>;
}