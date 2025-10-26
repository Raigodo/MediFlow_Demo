import { createContext, useContext, useEffect, useState } from 'react';

type ResourceContextContextProps = {
    children: React.ReactNode;
    defaultSectionKey?: string;
};

type SetSectionFunction = (section: string) => void;

type ResourceSectionContextType = {
    pushSection: SetSectionFunction;
    section?: string;
};

export const ResourceContext = createContext<ResourceSectionContextType | null>(null);

export const ResourceSectionContextProvider = ({
    children,
    defaultSectionKey,
}: ResourceContextContextProps) => {
    const [section, setSection] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('section');
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (section) {
            params.set('section', section);
        } else {
            params.delete('section');
        }

        const queryString = params.toString();
        const newUrl = queryString
            ? `${window.location.pathname}?${queryString}`
            : window.location.pathname;

        window.history.replaceState({}, '', newUrl);
    }, [section]);

    const pushSection: SetSectionFunction = (section) => {
        setSection(section);
    };

    return (
        <ResourceContext.Provider value={{ section: section ?? defaultSectionKey, pushSection }}>
            {children}
        </ResourceContext.Provider>
    );
};

export function useResourceSection() {
    const context = useContext(ResourceContext);
    if (!context) throw Error('no resource section context');
    return context;
}
