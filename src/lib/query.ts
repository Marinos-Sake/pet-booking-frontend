import type {PageParams} from "./types/typesPagination.ts";

export function toSearchParams(p: PageParams): string {
    const qs = new URLSearchParams();
    if (p.page !== undefined) qs.set("page", String(p.page));
    if (p.size !== undefined) qs.set("size", String(p.size));
    if (p.sortBy) qs.set("sortBy", p.sortBy);
    if (p.sortDirection) qs.set("sortDirection", p.sortDirection);
    return qs.toString();
}