export type SortDirection = "ASC" | "DESC";

export type PageParams = {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: SortDirection;
};

export type PageResp<T = unknown> = {
    content: T[];
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};