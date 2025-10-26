import { BasePaginatedPageSlice } from '@/lib/types/slices/base/paginated-page';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from '../ui/pagination';

export type BasePaginationProps = {
    pagination: BasePaginatedPageSlice;
    paginationBag?: Record<string, string | number | boolean | null | undefined>;
    children: ReactNode;
    className?: string;
};

function BasePagination({ pagination, paginationBag, children, className }: BasePaginationProps) {
    return (
        <div className={cn('grid h-full grid-rows-[minmax(0,1fr)_auto] gap-y-1 px-2', className)}>
            <div className="h-fit min-h-[300px]">{children}</div>
            <div className="py-2">
                <PaginationNav bag={paginationBag} {...pagination} />
            </div>
        </div>
    );
}

function PaginationNav({
    links,
    bag,
}: BasePaginatedPageSlice & {
    bag?: Record<string, string | number | boolean | null | undefined>;
}) {
    // const prevLink = links[0].label.includes('&') ? links[0] : null;
    // const nextLink = links[links.length - 1].label.includes('&') ? links[links.length - 1] : null;
    const linksToRender = links.filter((value) => value.url && !value.label.includes('&'));

    return (
        <Pagination>
            <PaginationContent>
                {/* {prevLink?.url && (
                    <PaginationItem>
                        <PaginationPrevious href={prevLink.url} />
                    </PaginationItem>
                )} */}
                {linksToRender.map((link, idx) => {
                    const route = new URL(link.url!);
                    if (bag) {
                        for (const [key, value] of Object.entries(bag)) {
                            // if (key === 'page') continue;
                            if (value) route.searchParams.append(key, value.toString());
                        }
                    }
                    return (
                        <PaginationItem key={idx}>
                            {link.label === '...' && <PaginationEllipsis />}
                            {link.label !== '...' && (
                                <PaginationLink
                                    href={route.toString()}
                                    className={
                                        link.active ? 'bg-primary text-white' : 'text-gray-700'
                                    }
                                >
                                    {link.label}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    );
                })}
                {/* {nextLink?.url && (
                    <PaginationItem>
                        <PaginationNext href={nextLink.url} />
                    </PaginationItem>
                )} */}
            </PaginationContent>
        </Pagination>
    );
}

export default BasePagination;
