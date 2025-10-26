import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';

export type DropdownActions = {
    title: string;
    dropdown: Record<string, ResourceActionsItem> | null;
};
