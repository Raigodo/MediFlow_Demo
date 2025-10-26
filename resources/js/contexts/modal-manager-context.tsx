import { CreateModalMap } from '@/lib/preset/modals/create-modal-map';
import { EditModalMap } from '@/lib/preset/modals/edit-modal-map';
import { FilterModalMap } from '@/lib/preset/modals/filter-modal-map';
import { PreviewModalMap } from '@/lib/preset/modals/preview-modal-map';
import { SetIconModalMap } from '@/lib/preset/modals/set-icon.modal-map';
import React, { createContext, useContext, useEffect, useState } from 'react';

type KeyToModalComponentPropsMap = CreateModalMap &
    EditModalMap &
    FilterModalMap &
    PreviewModalMap &
    SetIconModalMap;

type ModalComponentProps<T> = T extends unknown ? Omit<T, 'closeModal' | 'isOpen'> : never;

export type ModalPropsMap = {
    [K in keyof KeyToModalComponentPropsMap]: ModalComponentProps<KeyToModalComponentPropsMap[K]>;
};

//types to ensure that required props are passed
type KeysWithProps = {
    [K in keyof ModalPropsMap]: keyof ModalPropsMap[K] extends never ? never : K;
}[keyof ModalPropsMap];

type KeysWithoutProps = {
    [K in keyof ModalPropsMap]: keyof ModalPropsMap[K] extends never ? K : never;
}[keyof ModalPropsMap];

//modal key and requred props for specific modal component
export type CurrentModalSummary = {
    [K in keyof ModalPropsMap]: {
        modalKey: K;
        props: ModalPropsMap[K];
    };
}[keyof ModalPropsMap];

interface ModalManagerContextProviderProps {
    children: React.ReactNode;
}

//to ensure that if no parameter needed then allow no props passed
export type OpenModalFunction = <K extends KeysWithProps, T extends KeysWithoutProps>(
    props: { key: K; bag: ModalPropsMap[K] } | { key: T; bag?: unknown },
) => void;

export type OpenModalFunctionProps = Parameters<OpenModalFunction>[0];

export type CloseModalFunction = () => void;

type ModalMapKeys = keyof ModalPropsMap;

interface ModalManagerContextType {
    currentModal: CurrentModalSummary | null;
    openModal: OpenModalFunction;
    closeModal: CloseModalFunction;
}

const ModalManagerContext = createContext<ModalManagerContextType | null>(null);

const ModalManagerContextProvider = ({ children }: ModalManagerContextProviderProps) => {
    const [currentModal, setCurrentModal] = useState<CurrentModalSummary | null>(() => {
        const params = new URLSearchParams(window.location.search);
        const modalKey = params.get('modal') as ModalMapKeys;
        return modalKey && ({ modalKey } as CurrentModalSummary);
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (currentModal) {
            params.set('modal', currentModal.modalKey);
        } else {
            params.delete('modal');
        }

        const queryString = params.toString();
        const newUrl = queryString
            ? `${window.location.pathname}?${queryString}`
            : window.location.pathname;

        window.history.replaceState({}, '', newUrl);
    }, [currentModal]);

    const openModal: OpenModalFunction = (modal) => {
        setCurrentModal({ modalKey: modal.key, props: modal.bag } as CurrentModalSummary);
    };

    const closeModal: CloseModalFunction = () => {
        setCurrentModal(null);
    };

    return (
        <ModalManagerContext.Provider value={{ currentModal, closeModal, openModal }}>
            {children}
        </ModalManagerContext.Provider>
    );
};

export default ModalManagerContextProvider;

export function useModalManager() {
    const context = useContext(ModalManagerContext);
    if (!context) throw Error('no modal manager context');
    return context;
}
