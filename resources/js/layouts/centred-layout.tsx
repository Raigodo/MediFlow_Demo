import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type CentredLayoutProps = {
    children?: ReactNode;
    className?: string;
};

function CentredLayout({ children, className }: CentredLayoutProps) {
    return (
        <div className="relative h-0 min-h-full">
            <div className="relative h-0 min-h-full">
                <div
                    className={cn(
                        'sticky top-0 mx-auto h-full w-[calc(min(100%,1500px))] max-w-full shadow-2xl',
                    )}
                />
                <div
                    className={cn(
                        'absolute top-0 right-0 bottom-0 left-0 mx-auto w-[calc(min(100%,1500px))] max-w-full',
                        className,
                    )}
                >
                    <div className="h-full overflow-x-hidden overflow-y-auto">
                        <ErrorBoundary>{children}</ErrorBoundary>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CentredLayout;
