import { Toaster } from '@/components/_shared/ui/sonner';
import { usePage } from '@inertiajs/react';
import { createContext, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type ToastContextProviderProps = {
    children: React.ReactNode;
};

type ToastContextType = { PushInfo: (props: { message: string }) => void };

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
    const { props } = usePage();

    useEffect(() => {
        if (props.message) PushInfo({ message: props.message as string });
    }, [props]);

    function PushInfo({ message }: { message: string }) {
        toast(message);
    }

    return (
        <ToastContext.Provider value={{ PushInfo }}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    );
};

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw Error('no toast context');
    return context;
}
