import { cn } from '@/lib/utils';
import { Input, InputProps } from '../../ui/input';
import ModalMessage from '../../ui/modal-message';
import { BaseFormInputProps } from './form-input-props';

interface FormInputLineProps
    extends Omit<InputProps, 'onChange' | 'value'>,
        BaseFormInputProps<string> {}

function FormInputLine({ message, className, ...rest }: FormInputLineProps) {
    return (
        <div className={cn('relative', className)}>
            <FormInput
                {...rest}
                className={cn(rest.inputSize === 'xl' && 'h-10', message && 'pr-8')}
            />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormInputLine;

type FormInputProps = Omit<FormInputLineProps, 'message'>;

function FormInput({ value, onChange, className, ...rest }: FormInputProps) {
    return (
        <Input
            variant={'underline'}
            value={value}
            onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
            className={cn('h-8 w-full', className)}
            {...rest}
        />
    );
}
