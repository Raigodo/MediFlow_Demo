import { ReactNode } from 'react';
import { DropdownActions } from '../action/dropdown-actions';
import { ActionsDropdown } from '../action/dropdown/actions-dropdown';

function DossierLayout({ children, actions }: { children: ReactNode; actions?: DropdownActions }) {
    return (
        <div className="min-[300px] relative flex gap-x-2 pb-6">
            <div className="grow">
                {children}
                {actions && (
                    <div className="absolute top-3 right-3 h-fit">
                        <ActionsDropdown actions={actions} />
                    </div>
                )}
            </div>
        </div>
    );
}

export { DossierLayout };
