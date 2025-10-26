import EmployeeDossier from '@/components/employee/dossier/employee-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useSelectedEmployee } from '@/lib/hooks/selected/use-selected-employee';

function ShowEmployeePage() {
    const employee = useSelectedEmployee();
    const user = useCurrentUser();
    const structure = useCurrentStructure();

    if (!user || !structure) throw Error('can not proceed (no user | structure)');

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Struktūrvienības', href: routeTo.structure.index({ user }).path },
        //     { label: 'Skatīt', href: routeTo.structure.show({ structure }).path },
        //     { label: 'Darbinieki', href: routeTo.employee.index({ structure }).path },
        //     { label: 'Skatīt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <EmployeeDossier employee={employee} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ShowEmployeePage;
