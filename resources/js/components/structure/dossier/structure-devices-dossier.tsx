import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import DeviceTable from '@/components/trusted-device/table/device-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedTrustedDevices } from '@/lib/hooks/paginated/use-paginated-trusted-devices';
import { StructureDetailResource } from '@/lib/types/models/structure/structure-resources';
import StructureDossierHeader from './structure-dossier-header';

function StructureDevicesDossier({ structure }: { structure: StructureDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedTrustedDevices();

    return (
        <ResourceSectionContextProvider defaultSectionKey="trustedDevices">
            <DossierLayout actions={{ title: 'Structure', dropdown: structure.actions.dropdown }}>
                <StructureDossierHeader structure={structure} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <DeviceTable collection={collection} />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default StructureDevicesDossier;
