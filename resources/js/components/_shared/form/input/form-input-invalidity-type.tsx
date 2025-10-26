import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { InvalidityType } from '@/lib/types/values/invalidity-type';
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

interface FormInputInvalidityTypeProps
    extends Omit<SelectTriggerProps, 'onChange' | 'value'>,
        BaseFormInputProps<InvalidityType> {}

function FormInputInvalidityType({ message, className, ...rest }: FormInputInvalidityTypeProps) {
    return (
        <div className={cn('relative', className)}>
            <InvalidityTypeSelect {...rest} className={message && 'pr-8'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputInvalidityType;

type InvalidityTypeSelectProps = Omit<FormInputInvalidityTypeProps, 'message'>;

function InvalidityTypeSelect({ value, onChange, className }: InvalidityTypeSelectProps) {
    const { invalidityType } = useLocalEnum();

    function handleValueChange(value: string) {
        onChange?.(parseInt(value) as InvalidityType);
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
                        {Object.values(InvalidityType).map(
                            (item) =>
                                typeof item === 'number' &&
                                isFinite(item) && (
                                    <SelectItem key={item} value={item.toString()}>
                                        {invalidityType(item)}
                                    </SelectItem>
                                ),
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
