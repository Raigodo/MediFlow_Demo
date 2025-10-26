import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { useForm } from '@inertiajs/react';
import i18next from 'i18next';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { BaseFormProps } from './base-form-props';
import SubmitButton from './submit-button';

export interface IconFormProps extends BaseFormProps {
    action: ResourceActionsItem;
    currentIcon: string;
}

function IconForm({ action, currentIcon, onSuccess }: IconFormProps) {
    const [preview, setPreview] = useState<string>(currentIcon);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { post, setData, errors, processing } = useForm({
        _method: action.method,
        image: null as File | null,
    });

    function handleIconClick() {
        inputRef.current?.click();
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setData('image', file);

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post(action.url, { onSuccess });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className="hidden"
                onChange={handleImageChange}
            />

            <img
                src={preview}
                alt="Current or Selected"
                onClick={handleIconClick}
                className="mx-auto max-w-sm cursor-pointer rounded-xl border shadow-md transition hover:opacity-80"
            />

            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}

            <div className="min-w-32 justify-self-end">
                <SubmitButton processing={processing} className="mt-2 w-full shadow-md">
                    {i18next.t('submit')}
                </SubmitButton>
            </div>
        </form>
    );
}

export default IconForm;
