import { BookOpenIcon, HomeIcon, HouseIcon, LockIcon, PillIcon, UserRoundIcon } from 'lucide-react';

export const ToolbarIconMap = {
    home: HomeIcon,
    admin: LockIcon,
    client: UserRoundIcon,
    medicament: PillIcon,
    journal: BookOpenIcon,
    structure: HouseIcon,
};

export type ToolbarIconMap = typeof ToolbarIconMap;
