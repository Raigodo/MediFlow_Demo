import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { UserRole } from '@/lib/types/values/user-role';
import { cn } from '@/lib/utils';
import ModalMessage from '../../ui/modal-message';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectTriggerProps,
    SelectValue,
} from '../../ui/select';
import { BaseFormInputProps } from './form-input-props';

interface FormInputUserRoleProps
    extends Omit<SelectTriggerProps, 'onChange' | 'value'>,
        BaseFormInputProps<UserRole> {}

function FormInputUserRole({ message, className, ...rest }: FormInputUserRoleProps) {
    return (
        <div className={cn('relative', className)}>
            <UserRoleSelect {...rest} className={message && 'pr-8'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputUserRole;

type UserRoleSelectProps = Omit<FormInputUserRoleProps, 'message'>;

function UserRoleSelect({ value, onChange, className }: UserRoleSelectProps) {
    const { userRole } = useLocalEnum();

    function handleValueChange(value: string) {
        onChange?.(parseInt(value) as UserRole);
    }

    return (
        <Select value={value.toString()} onValueChange={handleValueChange}>
            <SelectTrigger variant={'underline'} className={cn('w-full', className)}>
                <SelectValue placeholder="izvēlēties ieņemamo amatu" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Lietotāju lomas</SelectLabel>
                    {Object.values(UserRole).map(
                        (role) =>
                            typeof role === 'number' &&
                            isFinite(role) && (
                                <SelectItem value={role.toString()} key={role}>
                                    {userRole(role)}
                                </SelectItem>
                            ),
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
