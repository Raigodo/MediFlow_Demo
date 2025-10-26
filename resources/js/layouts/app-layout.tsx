import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '@/components/_shared/ui/breadcrumb';
import { Label } from '@/components/_shared/ui/label';
import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { LocaleContextProvider } from '@/contexts/locale-context';
import ModalManagerContextProvider from '@/contexts/modal-manager-context';
import { ToastContextProvider } from '@/contexts/toast-context';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import HeaderLayout from './header-layout';
import ModalLayout from './modal-layout';
import SidebarClientsLayout from './sidebar-clients-layout';
import ToolbarLayout from './toolbar-layout';

function AppLayout({ children }: { children: ReactNode }) {
    return (
        <ToastContextProvider>
            <ModalManagerContextProvider>
                <LocaleContextProvider>
                    <ModalLayout>
                        <ToolbarLayout>
                            <HeaderLayout
                                title={
                                    <Breadcrumb className="h-full">
                                        <BreadcrumbList className="h-full">
                                            <BreadcrumbItem className="h-full">
                                                <BreadcrumbLink asChild className="h-full">
                                                    <Link href="/home">
                                                        <Label className="h-full cursor-pointer text-lg">
                                                            Mediflow
                                                        </Label>
                                                    </Link>
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {/* {backStack?.map((item) => (
                                                    <Fragment key={item.label}>
                                                        <BreadcrumbSeparator />
                                                        <BreadcrumbItem className="h-full">
                                                            {item.href ? (
                                                                <BreadcrumbLink
                                                                    className="text-md flex h-full items-center"
                                                                    href={item.href}
                                                                >
                                                                    {item.label}
                                                                </BreadcrumbLink>
                                                            ) : (
                                                                <BreadcrumbPage className="text-md flex h-full items-center">
                                                                    {item.label}
                                                                </BreadcrumbPage>
                                                            )}
                                                        </BreadcrumbItem>
                                                    </Fragment>
                                                ))} */}
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                }
                            >
                                <ErrorBoundary>
                                    <SidebarClientsLayout>{children}</SidebarClientsLayout>
                                </ErrorBoundary>
                            </HeaderLayout>
                        </ToolbarLayout>
                    </ModalLayout>
                </LocaleContextProvider>
            </ModalManagerContextProvider>
        </ToastContextProvider>
    );
}

export default AppLayout;
