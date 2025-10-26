import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input, InputProps } from '../../ui/input';
import ModalMessage from '../../ui/modal-message';
import { BaseFormInputProps } from './form-input-props';

interface FormInputNumberProps
    extends Omit<InputProps, 'onChange' | 'value'>,
        BaseFormInputProps<number> {
    units?: string | null;
}

function FormInputNumber({ message, className, ...rest }: FormInputNumberProps) {
    return (
        <div className={cn('relative', className)}>
            <FormInput {...rest} unitOverlayClassName={message && 'mr-5'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputNumber;

interface FormInputProps extends Omit<FormInputNumberProps, 'message'> {
    unitOverlayClassName?: string;
}

function FormInput({
    value: numericValue,
    onChange,
    className,
    units,
    unitOverlayClassName,
    ...rest
}: FormInputProps) {
    const [value, setValue] = useState(`${numericValue}`);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const cleaned = (e.target as HTMLInputElement).value;
        setValue(cleaned);
        const numericValue = cleaned ? parseFloat(cleaned) : 0;
        onChange?.(numericValue);
    }

    const handleBlur = () => {
        const cleaned = String(Number(value));
        const numericValue = value ? parseFloat(cleaned) : 0;
        setValue(numericValue.toString());
    };

    return (
        <div className="relative h-fit">
            <Input
                variant={'underline'}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                    'h-8 w-full [appearance:textfield] pr-14 shadow-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                    className,
                )}
                {...rest}
                type="number"
            />
            {units && (
                <span
                    className={cn(
                        'text-foreground/50 absolute top-0 right-3 bottom-0 flex items-center text-sm',
                        unitOverlayClassName,
                    )}
                    inert
                >
                    {units}
                </span>
            )}
        </div>
    );
}
