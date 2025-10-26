import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { InvalidityGroup } from '@/lib/types/values/invalidity-group';
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

interface FormInputInvalidityGroupProps
    extends Omit<SelectTriggerProps, 'onChange' | 'value'>,
        BaseFormInputProps<InvalidityGroup> {}

function FormInputInvalidityGroup({ message, className, ...rest }: FormInputInvalidityGroupProps) {
    return (
        <div className={cn('relative', className)}>
            <InvalidityGroupSelect {...rest} className={message && 'pr-8'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputInvalidityGroup;

type InvalidityGroupSelectProps = Omit<FormInputInvalidityGroupProps, 'message'>;

function InvalidityGroupSelect({ value, onChange, className }: InvalidityGroupSelectProps) {
    const { invalidityGroup } = useLocalEnum();

    function handleValueChange(value: string) {
        onChange?.(parseInt(value) as InvalidityGroup);
    }

    return (
        <div>
            <Select value={value.toString()} onValueChange={handleValueChange}>
                <SelectTrigger variant={'underline'} className={cn('h-8 w-full', className)}>
                    <SelectValue placeholder="izvēlēties" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Invaliditātes grupas</SelectLabel>
                        {Object.values(InvalidityGroup).map(
                            (item) =>
                                typeof item === 'number' &&
                                isFinite(item) && (
                                    <SelectItem key={item} value={item.toString()}>
                                        {invalidityGroup(item)}
                                    </SelectItem>
                                ),
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
