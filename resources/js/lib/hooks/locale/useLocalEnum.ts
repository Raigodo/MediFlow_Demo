import { EmployeeRole } from '@/lib/types/values/employee-role';
import { FilterNoteFlag } from '@/lib/types/values/filter-note-flag';
import { InvalidityGroup } from '@/lib/types/values/invalidity-group';
import { InvalidityType } from '@/lib/types/values/invalidity-type';
import { UserRole } from '@/lib/types/values/user-role';

function employeeRole(value: EmployeeRole) {
    return employeeRoleTranslations[value];
}

function noteFlag(value: FilterNoteFlag) {
    return noteFlagTranslations[value];
}

function invalidityGroup(value: InvalidityGroup) {
    return invalidityGroupTranslations[value];
}

function invalidityType(value: InvalidityType) {
    return invalidityTypeTranslations[value];
}

function userRole(value: UserRole) {
    return userRoleTranslations[value];
}

export function useLocalEnum() {
    return { employeeRole, noteFlag, invalidityGroup, invalidityType, userRole };
}

const employeeRoleTranslations: Record<EmployeeRole, string> = {
    [EmployeeRole.NONE]: 'Nav',
    [EmployeeRole.NURSE]: 'Medmāsa',
    [EmployeeRole.CAREGIVER]: 'Aprūpētājs',
    [EmployeeRole.REHABILITATOR]: 'Rehabilitētājs',
};

const noteFlagTranslations: Record<FilterNoteFlag, string> = {
    [FilterNoteFlag.All]: 'Visi',
    [FilterNoteFlag.Important]: 'Svarīgi',
    [FilterNoteFlag.NotImportant]: 'Mazsvarīgi',
};

const invalidityGroupTranslations: Record<InvalidityGroup, string> = {
    [InvalidityGroup.NONE]: 'Nav',
    [InvalidityGroup.FIRST]: 'Pirmā',
    [InvalidityGroup.SECOND]: 'Otrā',
    [InvalidityGroup.THIRD]: 'Trešā',
};

const invalidityTypeTranslations: Record<InvalidityType, string> = {
    [InvalidityType.NONE]: 'Nav',
    [InvalidityType.PERMANENT]: 'Pastāvīga',
    [InvalidityType.TEMPORARY]: 'Pagaidu',
};

const userRoleTranslations: Record<UserRole, string> = {
    [UserRole.Admin]: 'Administrators',
    [UserRole.Employee]: 'Darbinieks',
    [UserRole.Manager]: 'Vadītājs',
};
