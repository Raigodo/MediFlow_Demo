import { StructurePreviewResource } from '../structure/structure-resources';

export type ClientPreview = {
    id: string;
    name: string;
    surname: string;
    avatarUrl: string;

    createdAt: string;
    joinedOn: string;
    archivedOn: string | undefined;

    structure: StructurePreviewResource;
};
