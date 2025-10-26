import InlineForm from '@/components/_shared/action/inline-form';
import ElementAddButton from '@/components/_shared/dossier/button/element-add-button';
import { DossierContentShell, DossierHeaderShell } from '@/components/_shared/dossier/dossier-main';
import {
    DossierSectionContentShell,
    DossierSectionHeaderShell,
    DossierSectionShell,
} from '@/components/_shared/dossier/dossier-section';
import { DossierFieldShell } from '@/components/_shared/dossier/field/dossier-field-shell';
import { DossierForm } from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputMultiLine from '@/components/_shared/form/input/form-input-multi-line';
import { Label } from '@/components/_shared/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/_shared/ui/tooltip';
import UserName from '@/components/_shared/user-name';
import TemporalAmbulanceCallTable from '@/components/ambulance-call/table/temporal-ambulance-call-table';
import TemporalDiagnoseTable from '@/components/diagnose/table/temporal-diagnose-table';
import TemporalMeasurementTable from '@/components/measurement/table/temporal-measurement-table';
import TemporalMedicationTable from '@/components/medication/table/temporal-medication-table';
import { useModalManager } from '@/contexts/modal-manager-context';
import {
    ResourceSectionContextProvider,
    useResourceSection,
} from '@/contexts/resource-sction-context';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';
import { useNoteToWrite } from '@/lib/hooks/selected/use-selected-note';
import { useTempId } from '@/lib/hooks/use-temp-id';
import { AmbulanceCallTemp } from '@/lib/types/models/ambulance-call/ambulance-call-temp';
import { DiagnoseTemp } from '@/lib/types/models/diagnose/diagnose-temp';
import { MeasurementTemp } from '@/lib/types/models/measurement/measurement-temp';
import { MedicationTemp } from '@/lib/types/models/medication/medication-temp';
import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { ModalKey } from '@/lib/types/values/modal-key';
import { NoteSectionKey } from '@/lib/types/values/note-section-key';
import { useForm } from '@inertiajs/react';
import { CircleAlertIcon } from 'lucide-react';

interface BaseWriteNoteFormProps extends BaseFormProps {
    submitAction: ResourceActionsItem;
    deleteAction?: ResourceActionsItem;
}

function BaseWriteNoteForm(props: BaseWriteNoteFormProps) {
    return (
        <ResourceSectionContextProvider>
            <WriteNoteFormContent {...props} />
        </ResourceSectionContextProvider>
    );
}

function WriteNoteFormContent({ onSuccess, submitAction, deleteAction }: BaseWriteNoteFormProps) {
    const client = useSelectedClient();
    const note = useNoteToWrite();
    const { isTempId } = useTempId();
    const { defaultDate } = useLocalDate();
    const { employeeRole } = useLocalEnum();
    const { openModal } = useModalManager();
    const { section: currentSectionKey } = useResourceSection();

    if (!client) throw Error('can not preceed (No Client selected)');

    const { post, data, setData, errors, processing, transform } = useForm({
        isImportant: note.data.isImportant ?? false,
        content: note.data.content ?? '',
        ambulanceCalls: note.data.ambulanceCalls.data.map(
            (item) =>
                ({
                    id: item.data.id,
                    result: item.data.result,
                }) as AmbulanceCallTemp,
        ),
        measurements: note.data.measurements.data.map(
            (item) =>
                ({
                    id: item.data.id,
                    value: item.data.value,
                    measurementTypeId: item.data.measurementType.data.id,
                }) as MeasurementTemp,
        ),
        medications: note.data.medications.data.map(
            (item) =>
                ({
                    id: item.data.id,
                    amount: item.data.amount,
                    medicamentTypeId: item.data.medicament.data.medicamentType.data.id,
                }) as MedicationTemp,
        ),
        diagnoses: note.data.diagnoses.data.map(
            (item) =>
                ({
                    id: item.data.id,
                    name: item.data.name,
                }) as DiagnoseTemp,
        ),
    });

    transform(({ ambulanceCalls, measurements, medications, diagnoses, ...rest }) => ({
        _method: submitAction.method,
        ambulanceCalls: ambulanceCalls.map(({ id, ...rest }) => ({
            ...rest,
            id: isTempId(id) ? undefined : id,
        })),
        measurements: measurements.map(({ id, ...rest }) => ({
            ...rest,
            id: isTempId(id) ? undefined : id,
        })),
        medications: medications.map(({ id, ...rest }) => ({
            ...rest,
            id: isTempId(id) ? undefined : id,
        })),
        diagnoses: diagnoses.map(({ id, ...rest }) => ({
            ...rest,
            id: isTempId(id) ? undefined : id,
        })),
        ...rest,
    }));

    function handleSubmit() {
        post(submitAction.url, { onSuccess });
    }

    function onToggleIsImportant() {
        setData('isImportant', !data.isImportant);
    }

    function onAddElement() {
        switch (currentSectionKey) {
            case NoteSectionKey.AmbulanceCall:
                onCreateAmbulanceCall();
                break;
            case NoteSectionKey.Diagnose:
                onCreateDiagnose();
                break;
            case NoteSectionKey.Measurement:
                onCreateMeasurement();
                break;
            case NoteSectionKey.Medication:
                onCreateMedication();
                break;
        }
    }

    function onCreateAmbulanceCall() {
        openModal({
            key: ModalKey.CREATE_AMBULANCE_CALL,
            bag: {
                onSubmit: handleCreateAmbulanceCall,
            },
        });
    }
    function onCreateDiagnose() {
        openModal({
            key: ModalKey.CREATE_DIAGNOSE,
            bag: {
                onSubmit: handleCreateDiagnose,
            },
        });
    }
    function onCreateMeasurement() {
        openModal({
            key: ModalKey.CREATE_MEASUREMENT,
            bag: {
                onSubmit: handleCreateMeasurement,
            },
        });
    }
    function onCreateMedication() {
        openModal({
            key: ModalKey.CREATE_MEDICATION,
            bag: {
                onSubmit: handleCreateMedication,
            },
        });
    }

    function onUpdateAmbulanceCall(ambulanceCall: AmbulanceCallTemp) {
        openModal({
            key: ModalKey.EDIT_AMBULANCE_CALL,
            bag: {
                ambulanceCall,
                onSubmit: handleUpdateAmbulanceCall,
                onDelete: handleDeleteAmbulanceCall,
            },
        });
    }
    function onUpdateDiagnose(diagnose: DiagnoseTemp) {
        openModal({
            key: ModalKey.EDIT_DIAGNOSE,
            bag: {
                diagnose,
                onSubmit: handleUpdateDiagnose,
                onDelete: handleDeleteDiagnose,
            },
        });
    }
    function onUpdateMeasurement(measurement: MeasurementTemp) {
        openModal({
            key: ModalKey.EDIT_MEASUREMENT,
            bag: {
                measurement,
                onSubmit: handleUpdateMeasurement,
                onDelete: handleDeleteMeasurement,
            },
        });
    }
    function onUpdateMedication(medication: MedicationTemp) {
        openModal({
            key: ModalKey.EDIT_MEDICATION,
            bag: {
                medication,
                onSubmit: handleUpdateMedication,
                onDelete: handleDeleteMedication,
            },
        });
    }

    function handleCreateAmbulanceCall(ambulanceCall: AmbulanceCallTemp) {
        const items = [...data.ambulanceCalls, ambulanceCall];
        setData('ambulanceCalls', items);
    }
    function handleCreateDiagnose(diagnose: DiagnoseTemp) {
        const items = [...data.diagnoses, diagnose];
        setData('diagnoses', items);
    }
    function handleCreateMeasurement(measurement: MeasurementTemp) {
        const items = [...data.measurements, measurement];
        setData('measurements', items);
    }
    function handleCreateMedication(medication: MedicationTemp) {
        const items = [...data.medications, medication];
        setData('medications', items);
    }

    function handleUpdateItem<T extends Exclude<keyof typeof data, 'isImportant' | 'content'>>(
        field: T,
        target: (typeof data)[T][number],
    ) {
        const index = data[field].findIndex((item) => item.id === target.id);
        const items = data[field].map((item, i) =>
            i === index ? target : item,
        ) as (typeof data)[T];
        setData(field as keyof typeof data, items);
    }

    function handleUpdateAmbulanceCall(ambulanceCall: AmbulanceCallTemp) {
        handleUpdateItem('ambulanceCalls', ambulanceCall);
    }
    function handleUpdateDiagnose(diagnose: DiagnoseTemp) {
        handleUpdateItem('diagnoses', diagnose);
    }
    function handleUpdateMeasurement(measurement: MeasurementTemp) {
        handleUpdateItem('measurements', measurement);
    }
    function handleUpdateMedication(medication: MedicationTemp) {
        handleUpdateItem('medications', medication);
    }

    function handleDeleteItem<T extends Exclude<keyof typeof data, 'isImportant' | 'content'>>(
        field: T,
        target: (typeof data)[T][number],
    ) {
        const index = data[field].findIndex((item) => item.id === target.id);
        const items = data[field].filter((_, i) => i !== index);
        setData(field as keyof typeof data, items as (typeof data)[T]);
    }

    function handleDeleteAmbulanceCall(ambulanceCall: AmbulanceCallTemp) {
        handleDeleteItem('ambulanceCalls', ambulanceCall);
    }
    function handleDeleteDiagnose(diagnose: DiagnoseTemp) {
        handleDeleteItem('diagnoses', diagnose);
    }
    function handleDeleteMeasurement(measurement: MeasurementTemp) {
        handleDeleteItem('measurements', measurement);
    }
    function handleDeleteMedication(medication: MedicationTemp) {
        handleDeleteItem('medications', medication);
    }

    return (
        <>
            {deleteAction && deleteAction.can && (
                <div className="anchored-top-left/delete-note-action w-24 translate-full">
                    <InlineForm
                        size={'default'}
                        variant={'destructive'}
                        action={deleteAction}
                        className="w-full"
                    >
                        Dzēst
                    </InlineForm>
                </div>
            )}

            <DossierForm
                onSubmit={handleSubmit}
                backAction={client.actions.notes}
                renderCancelButton={<div className="anchor/delete-note-action h-9 w-24" />}
                processing={processing}
            >
                <DossierHeaderShell>
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <Label className="col-start-1 row-start-1 text-xl">
                                Šīsdienas ieraksts
                            </Label>
                            <Label className="col-start-1 row-start-2 text-base font-normal">
                                Redigēt šīsdienas žurnāla ierakstu
                            </Label>
                        </div>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger
                                    className="col-start-2 row-span-2 mx-2 self-center justify-self-end"
                                    onClick={onToggleIsImportant}
                                    asChild
                                >
                                    <CircleAlertIcon
                                        size={20}
                                        className={
                                            data.isImportant ? 'text-destructive' : 'text-secondary'
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {data.isImportant
                                            ? 'Ieraksts ir atzīmēts kā svarīgs'
                                            : 'Ieraksts nav atzīmēts kā svarīgs'}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </DossierHeaderShell>

                <DossierContentShell>
                    <DossierFieldShell>
                        <Label>Izveidoja</Label>
                        <UserName user={note.data.creator.data.user?.data} />
                    </DossierFieldShell>
                    <DossierFieldShell>
                        <Label>Amats</Label>
                        {employeeRole(note.data.creator.data.role)}
                    </DossierFieldShell>
                    <DossierFieldShell>
                        <Label>Datums</Label>
                        {defaultDate(note.data.createdAt)}
                    </DossierFieldShell>

                    <div className="mt-1.5 space-y-0.5">
                        <Label className="pb-2 pl-2">Note Content</Label>
                        <FormInputMultiLine
                            rows={5}
                            value={data.content}
                            onChange={(value) => setData('content', value)}
                            message={errors.content}
                        />
                    </div>
                </DossierContentShell>

                <DossierSectionShell>
                    <DossierSectionHeaderShell sections={note.data.sections}>
                        <div className="flex justify-between">
                            <Label className="text-md">Saistītie ieraksti</Label>
                            {currentSectionKey && (
                                <ElementAddButton
                                    onClick={onAddElement}
                                    hint="Izveidot saistīto ierakstu"
                                />
                            )}
                        </div>
                    </DossierSectionHeaderShell>

                    {currentSectionKey && (
                        <DossierSectionContentShell>
                            {currentSectionKey === NoteSectionKey.AmbulanceCall && (
                                <TemporalAmbulanceCallTable
                                    collection={data.ambulanceCalls}
                                    onItemClick={onUpdateAmbulanceCall}
                                />
                            )}
                            {currentSectionKey === NoteSectionKey.Diagnose && (
                                <TemporalDiagnoseTable
                                    collection={data.diagnoses}
                                    onItemClick={onUpdateDiagnose}
                                />
                            )}
                            {currentSectionKey === NoteSectionKey.Measurement && (
                                <TemporalMeasurementTable
                                    collection={data.measurements}
                                    onItemClick={onUpdateMeasurement}
                                />
                            )}
                            {currentSectionKey === NoteSectionKey.Medication && (
                                <TemporalMedicationTable
                                    collection={data.medications}
                                    onItemClick={onUpdateMedication}
                                />
                            )}
                        </DossierSectionContentShell>
                    )}
                </DossierSectionShell>
            </DossierForm>
        </>
    );
}

export default BaseWriteNoteForm;
