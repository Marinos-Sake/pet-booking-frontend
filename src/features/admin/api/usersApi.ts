import type {PageParams, PageResp} from "../../../lib/types/typesPagination.ts";
import {toSearchParams} from "../../../lib/query.ts";
import type {User} from "../types.ts";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function adminListUsers(
    token: string,
    params: PageParams
): Promise<PageResp<User>> {
    const response = await fetch(`${API_URL}/users?${toSearchParams(params)}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json() as Promise<PageResp<User>>;
}

