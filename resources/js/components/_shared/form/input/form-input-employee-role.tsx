import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { EmployeeRole } from '@/lib/types/values/employee-role';
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

interface FormInputEmployeeRoleProps
    extends Omit<SelectTriggerProps, 'onChange' | 'value'>,
        BaseFormInputProps<EmployeeRole> {}

function FormInputEmployeeRole({ message, className, ...rest }: FormInputEmployeeRoleProps) {
    return (
        <div className={cn('relative', className)}>
            <EmployeeRoleSelect {...rest} className={message && 'pr-8'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputEmployeeRole;

type EmployeeRoleSelectProps = Omit<FormInputEmployeeRoleProps, 'message'>;

function EmployeeRoleSelect({ value, onChange, className }: EmployeeRoleSelectProps) {
    const { employeeRole } = useLocalEnum();

    function handleValueChange(value: string) {
        onChange?.(parseInt(value) as EmployeeRole);
    }

    return (
        <Select value={value.toString()} onValueChange={handleValueChange}>
            <SelectTrigger variant={'underline'} className={cn('w-full', className)}>
                <SelectValue placeholder="izvēlēties ieņemamo amatu" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Iespējamie amati</SelectLabel>
                    {Object.values(EmployeeRole).map(
                        (role) =>
                            typeof role === 'number' &&
                            isFinite(role) && (
                                <SelectItem value={role.toString()} key={role}>
                                    {employeeRole(role)}
                                </SelectItem>
                            ),
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
