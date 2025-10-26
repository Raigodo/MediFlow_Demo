import {
    CurrentModalSummary,
    ModalPropsMap,
    useModalManager,
} from '@/contexts/modal-manager-context';
import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../utility/error-boundary';

export interface BaseModalComponentProps {
    isOpen: boolean;
    closeModal: () => void;
}

type ModalComponent<K extends keyof ModalPropsMap> = React.ComponentType<
    ModalPropsMap[K] & BaseModalComponentProps
>;

type ModalComponentProps<K extends keyof ModalPropsMap> = ModalPropsMap[K] &
    BaseModalComponentProps &
    React.Attributes;

export default function ModalWrapper<K extends keyof ModalPropsMap>({
    modalKey,
    modalComponent,
}: {
    modalKey: K;
    modalComponent: ModalComponent<K>;
}) {
    const { currentModal, closeModal } = useModalManager();
    const [isOpen, setIsOpen] = useState(false);

    //handle smooth close
    const [isFading, setIsFading] = useState(false);
    const timerId = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        if (currentModal?.modalKey === modalKey && !isOpen) {
            setIsOpen(true);
            setIsFading(false);
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current = undefined;
        }
        //start fading
        if (currentModal?.modalKey !== modalKey && isOpen) {
            setIsOpen(false);
            setIsFading(true);
            timerId.current = setTimeout(() => {
                setIsFading(false);
                timerId.current = undefined;
            }, 1000);
        }
    }, [currentModal?.modalKey, modalKey, isOpen]);

    const [cachedModalProps, setCachedModalProps] = useState<
        CurrentModalSummary['props'] | undefined
    >(undefined);

    useEffect(() => {
        if (isOpen && !cachedModalProps) setCachedModalProps(currentModal?.props);
        if (!(isOpen || isFading) && cachedModalProps) setCachedModalProps(undefined);
    }, [isOpen, isFading, currentModal, cachedModalProps]);

    function handleCloseModal() {
        closeModal();
    }

    const modalProps = {
        ...(currentModal?.props ?? cachedModalProps),
        isOpen,
        closeModal: handleCloseModal,
    } as ModalComponentProps<K>;

    return (
        <div className="hidden">
            <ErrorBoundary onError={handleCloseModal}>
                {(isOpen || isFading) && React.createElement(modalComponent, modalProps)}
            </ErrorBoundary>
        </div>
    );
}
