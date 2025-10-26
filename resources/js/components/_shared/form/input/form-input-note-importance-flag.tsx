import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { FilterNoteFlag } from '@/lib/types/values/filter-note-flag';
import { cn } from '@/lib/utils';
import ModalMessage from '../../ui/modal-message';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectTriggerProps,
    SelectValue,
} from '../../ui/select';
import { BaseFormInputProps } from './form-input-props';

interface FormInputNoteImportanceFlagProps
    extends Omit<SelectTriggerProps, 'onChange' | 'value'>,
        BaseFormInputProps<FilterNoteFlag> {}

function FormInputNoteImportanceFlag({
    message,
    className,
    ...rest
}: FormInputNoteImportanceFlagProps) {
    return (
        <div className={cn('relative', className)}>
            <InputNoteImportanceFlag {...rest} className={message && 'pr-8'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputNoteImportanceFlag;

type InputNoteImportanceFlagProps = Omit<FormInputNoteImportanceFlagProps, 'message'>;

function InputNoteImportanceFlag({
    value,
    onChange,
    className,
    ...rest
}: InputNoteImportanceFlagProps) {
    const { noteFlag } = useLocalEnum();

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={cn('w-full', className)} variant={'underline'} {...rest}>
                <SelectValue placeholder={'izvēlēties'} />
            </SelectTrigger>
            <SelectContent>
                {Object.values(FilterNoteFlag).map((item) => (
                    <SelectItem key={item} value={item}>
                        {noteFlag(item)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
