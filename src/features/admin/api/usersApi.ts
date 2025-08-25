import type {PageParams, PageResp} from "../../../lib/types/typesPagination.ts";
import {toSearchParams} from "../../../lib/query.ts";
import type {User} from "../types.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function adminListUsers(
    token: string,
    params: PageParams
): Promise<PageResp<User>> {
    const r = await fetch(`${API_URL}/users?${toSearchParams(params)}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${await r.text()}`);
    return r.json() as Promise<PageResp<User>>;
}

