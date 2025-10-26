import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { CalendarProps, DatePicker, DatePickerProps } from '../../ui/date-picker';
import ModalMessage from '../../ui/modal-message';

interface FormInputDateProps
    extends Omit<
            DatePickerProps,
            'value' | 'onValueChange' | 'onChange' | 'classNames' | 'className'
        >,
        Omit<CalendarProps, 'value' | 'onValueChange' | 'classNames' | 'disabled' | 'className'> {
    classNames?: DatePickerProps['classNames'] & CalendarProps['classNames'];
    className?: string;
    value: string | Date | undefined;
    onValueChange?: (value: Date | undefined) => void;
    onStringValueChange?: (value: string | undefined) => void;
    message?: string;
}

function FormInputDate({ message, className, ...rest }: FormInputDateProps) {
    return (
        <div className={cn('relative', className)}>
            <DateInput {...rest} classNames={{ trigger: message && 'pr-8' }} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputDate;

type InputDateProps = Omit<FormInputDateProps, 'message'>;

function DateInput({
    value,
    onValueChange,
    onStringValueChange,
    classNames,
    ...rest
}: InputDateProps) {
    const dateValue = useMemo(() => {
        if (!value) return undefined;
        if (value instanceof Date && !isNaN(value.getTime())) {
            return value;
        }
        if (typeof value === 'string') {
            const date = new Date(value);
            if (isNaN(date.getTime())) return undefined;
            return date;
        }
        return undefined;
    }, [value]);

    function handleChange(value: Date | undefined) {
        onValueChange?.(value);
        onStringValueChange?.(value?.toDateString());
    }

    return (
        <DatePicker
            value={dateValue}
            onChange={handleChange}
            classNames={{
                ...classNames,
                trigger: cn('h-8 w-full min-w-32 pl-1 font-normal', classNames?.trigger),
            }}
            {...rest}
        />
    );
}
