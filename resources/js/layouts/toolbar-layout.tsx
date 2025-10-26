import ToolbarItem from '@/components/_shared/toolbar-item';
import { ScrollArea } from '@/components/_shared/ui/scroll-area';
import { Separator } from '@/components/_shared/ui/separator';
import { TooltipProvider } from '@/components/_shared/ui/tooltip';
import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { useToolbar } from '@/lib/hooks/session/use-toolbar';
import { ToolbarIconMap } from '@/lib/preset/toolbar/toolbar-icon-map';
import { Fragment, PropsWithChildren } from 'react';

function ToolbarLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid h-screen max-h-screen grid-cols-[64px_minmax(0,1fr)] grid-rows-1 overflow-hidden">
            <ErrorBoundary>
                <ToolBar />
            </ErrorBoundary>
            <div className="overflow-y-auto">
                <ErrorBoundary>{children}</ErrorBoundary>
            </div>
        </div>
    );
}

export default ToolbarLayout;

function ToolBar() {
    const toolbar = useToolbar();
    const filtered = Object.entries(toolbar.items)
        .filter(([, value]) => value?.can)
        .map(([key, value]) => ({
            iconKey: key as keyof ToolbarIconMap,
            ...value!,
        }))
        .filter((item) => item);

    return (
        <TooltipProvider>
            <div className="border-border z-10 grid h-full grid-cols-1 grid-rows-[64px_minmax(0,1fr)_auto] border-r">
                <div className="m-1.5 mb-0 border-b pb-1.5 shadow-2xl">
                    <ToolbarItem
                        iconKey={'home'}
                        href={toolbar.home.url}
                        hint="home"
                        variant={'default'}
                        preventCustomColor
                    />
                </div>

                <div className="overflow-visible shadow-md">
                    <ScrollArea className="h-full" viewportClassName="py-1">
                        <ul className="space-y-1 px-2">
                            {filtered.map((item) => (
                                <Fragment key={item.iconKey}>
                                    <li>
                                        <ToolbarItem
                                            iconKey={item.iconKey}
                                            href={item.url}
                                            hint={item.iconKey}
                                        />
                                    </li>
                                    <Separator />
                                </Fragment>
                            ))}
                        </ul>
                    </ScrollArea>
                </div>
            </div>
        </TooltipProvider>
    );
}
