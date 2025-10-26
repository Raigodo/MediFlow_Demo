import { Locale } from 'date-fns';
import { lv } from 'date-fns/locale';
import { createContext, useContext } from 'react';

type LocaleContextProviderProps = {
    children: React.ReactNode;
};

type LocaleContextType = {
    locale: Locale;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleContextProvider = ({ children }: LocaleContextProviderProps) => {
    return <LocaleContext.Provider value={{ locale: lv }}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) throw Error('no locale context');
    return context;
}
