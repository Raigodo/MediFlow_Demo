import { UserRole } from '@/lib/types/values/user-role';

export type UserPreview = {
    id: string;
    name: string;
    surname: string;
    avatarUrl: string;
    role: UserRole;
    createdAt: string;
};
