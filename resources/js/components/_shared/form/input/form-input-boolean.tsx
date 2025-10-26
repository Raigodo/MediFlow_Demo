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

interface FormInputBooleanProps
    extends Omit<SelectTriggerProps, 'onChange' | 'value'>,
        BaseFormInputProps<boolean | undefined> {
    display?: { title?: string; none?: string; true?: string; false?: string };
}

function FormInputBoolean({ message, className, ...rest }: FormInputBooleanProps) {
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

export default FormInputBoolean;

type InvalidityTypeSelectProps = Omit<FormInputBooleanProps, 'message'>;

function InvalidityTypeSelect({ value, onChange, className, display }: InvalidityTypeSelectProps) {
    const tempValue = value ? 'true' : value === false ? 'false' : 'undefined';

    function handleValueChange(value: string) {
        switch (value) {
            case 'undefined':
                onChange?.(undefined);
                break;
            case 'true':
                onChange?.(true);
                break;
            case 'false':
                onChange?.(false);
                break;
        }
    }

    return (
        <div>
            <Select value={tempValue} onValueChange={handleValueChange}>
                <SelectTrigger variant={'underline'} className={cn('h-8 w-full', className)}>
                    <SelectValue placeholder="izvēlēties" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {display?.title && <SelectLabel>{display.title}</SelectLabel>}
                        <SelectItem value={'undefined'}>{display?.none ?? 'Nav'}</SelectItem>
                        <SelectItem value={'true'}>{display?.true ?? 'Jā'}</SelectItem>
                        <SelectItem value={'false'}>{display?.false ?? 'Nē'}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
