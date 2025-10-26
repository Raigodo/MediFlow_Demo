import { cn } from '@/lib/utils';
import ModalMessage from '../../ui/modal-message';
import { Textarea, TextareaProps } from '../../ui/textarea';
import { BaseFormInputProps } from './form-input-props';

interface FormInputMultiLineProps
    extends Omit<TextareaProps, 'onChange' | 'value'>,
        BaseFormInputProps<string> {
    classNames?: {
        textArea?: string;
    };
}

function FormInputMultiLine({ message, className, classNames, ...rest }: FormInputMultiLineProps) {
    return (
        <div className={cn('relative', className)}>
            <FormInput {...rest} className={cn(message && 'pr-8', classNames?.textArea)} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0 flex items-start pt-1 pr-1`}>
                    <ModalMessage message={message} className="h-fit" />
                </div>
            )}
        </div>
    );
}

export default FormInputMultiLine;

type FormInputProps = Omit<FormInputMultiLineProps, 'message'>;

function FormInput({ value, onChange, className, ...rest }: FormInputProps) {
    return (
        <Textarea
            value={value}
            onChange={(e) => onChange?.((e.target as HTMLTextAreaElement).value)}
            className={cn('h-8 max-h-[400px] min-h-[200px] w-full', className)}
            {...rest}
        />
    );
}
