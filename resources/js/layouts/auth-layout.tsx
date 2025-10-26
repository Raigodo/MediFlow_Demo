import { NavSectionLinks } from '@/components/_shared/action/nav/nav-section-links';
import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { ToastContextProvider } from '@/contexts/toast-context';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { ReactNode } from 'react';

function AuthLayout({ children, hideNav }: { children: ReactNode; hideNav?: boolean }) {
    const actions = useSessionActions();

    return (
        <ToastContextProvider>
            <div className="flex">
                <div className="bg-secondary flex grow">
                    <div className="mt-12 ml-16">
                        <h1 className="text-4xl font-bold">MediFlow</h1>
                    </div>
                </div>
                <div className="h-screen w-2/6 shrink-0">
                    <div className="bg-bg-100 scrollbar-thin border-bg-300 h-full overflow-y-auto border-l-1 px-8 py-6">
                        {!hideNav && (
                            <NavSectionLinks
                                sections={{
                                    login: actions.loginPage,
                                    join: actions.joinPage,
                                    register: actions.registerPage,
                                }}
                            />
                        )}
                        <ErrorBoundary>{children}</ErrorBoundary>
                        <a
                            className="cursor-pointer text-sm text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                            href="https://docs.google.com/document/d/1CgOLZ3XHBs5Mk5OV8F2-OXMhEvu5sK1K70ndk4Bf8ss/edit?usp=sharing"
                            target="_blank"
                        >
                            Readme
                        </a>
                    </div>
                </div>
            </div>
        </ToastContextProvider>
    );
}

export default AuthLayout;
