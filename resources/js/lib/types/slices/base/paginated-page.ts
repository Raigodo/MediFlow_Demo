export interface BasePaginatedPageSlice {
    currentPage: number;
    lastPage: number;
    path: string;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    links: { url: string | null; label: string; active: boolean }[];
    from: number;
    to: number;
    perPage: number;
    total: number;
}
