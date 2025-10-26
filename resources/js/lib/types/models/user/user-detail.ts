import { UserRole } from '@/lib/types/values/user-role';
import { ResourceActionsItem } from '../reource-actions-item';
import { StructureCollectionResource } from '../structure/structure-resources';

export type UserDetail = {
    id: string;
    name: string;
    surname: string;
    email: string;
    avatarUrl: string;
    role: UserRole;
    createdAt: string;
    verifiedAt: string | null;

    structures: StructureCollectionResource;

    sections: Record<string, ResourceActionsItem>;
};
