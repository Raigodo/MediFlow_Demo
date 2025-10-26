export type BaseFormInputProps<T> = {
    value: T;
    onChange?: (value: T) => void;
    message?: string;
};
