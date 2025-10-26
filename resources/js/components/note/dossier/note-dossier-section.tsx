import {
    DossierSectionContentShell,
    DossierSectionHeaderShell,
    DossierSectionShell,
} from '@/components/_shared/dossier/dossier-section';
import { Label } from '@/components/_shared/ui/label';
import AmbulanceCallTable from '@/components/ambulance-call/table/ambulance-call-table';
import DiagnoseTable from '@/components/diagnose/table/diagnose-table';
import MeasurementTable from '@/components/measurement/table/measurement-table';
import MedicationTable from '@/components/medication/table/medication-table';
import { useResourceSection } from '@/contexts/resource-sction-context';
import { NoteDetailResource } from '@/lib/types/models/note/note-resources';
import { NoteSectionKey } from '@/lib/types/values/note-section-key';

function NoteDossierSection({ note }: { note: NoteDetailResource }) {
    const { section } = useResourceSection();

    return (
        <DossierSectionShell>
            <DossierSectionHeaderShell
                className="flex justify-between"
                sections={note.data.sections}
            >
                <Label className="text-md">Saistītie ieraksti</Label>
            </DossierSectionHeaderShell>

            {section && (
                <DossierSectionContentShell>
                    {section === NoteSectionKey.AmbulanceCall && (
                        <AmbulanceCallTable
                            collection={note.data.ambulanceCalls}
                            showPreview
                            minimal404
                            hideHeader
                        />
                    )}
                    {section === NoteSectionKey.Diagnose && (
                        <DiagnoseTable
                            collection={note.data.diagnoses}
                            showPreview
                            minimal404
                            hideHeader
                        />
                    )}

                    {section === NoteSectionKey.Measurement && (
                        <MeasurementTable
                            collection={note.data.measurements}
                            showPreview
                            minimal404
                            hideHeader
                        />
                    )}

                    {section === NoteSectionKey.Medication && (
                        <MedicationTable
                            collection={note.data.medications}
                            showPreview
                            minimal404
                            hideHeader
                        />
                    )}
                </DossierSectionContentShell>
            )}
        </DossierSectionShell>
    );
}

export default NoteDossierSection;
