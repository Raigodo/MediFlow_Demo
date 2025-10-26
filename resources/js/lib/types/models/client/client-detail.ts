import { InvalidityGroup } from '@/lib/types/values/invalidity-group';
import { InvalidityType } from '@/lib/types/values/invalidity-type';
import { ResourceActionsItem } from '../reource-actions-item';
import { StructurePreviewResource } from '../structure/structure-resources';
import { ClientContactPreview } from './client-contact-preview';

export type ClientDetail = {
    id: string;

    name: string;
    surname: string;

    birthDate: string;
    avatarUrl: string;
    personalCode: string;
    language: string;
    religion: string;
    weight: number;
    height: number;

    invalidity: {
        group: InvalidityGroup;
        type: InvalidityType;
        expiresOn: string | null;
    };

    createdAt: string;
    joinedOn: string;
    archivedOn: string | undefined;

    contacts: ClientContactPreview[];
    structure: StructurePreviewResource;

    sections: Record<string, ResourceActionsItem>;
};
