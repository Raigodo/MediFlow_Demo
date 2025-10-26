import { StructurePreviewResource } from '../structure/structure-resources';
import { MedicamentTypePreviewResource } from './medicament-resources';

export type MedicamentPreview = {
    id: string;
    amount: number;

    medicamentType: MedicamentTypePreviewResource;
    structure: StructurePreviewResource;
};
