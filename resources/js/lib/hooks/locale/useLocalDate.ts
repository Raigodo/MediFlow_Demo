import { format } from 'date-fns';
import { lv } from 'date-fns/locale';

function defaultDate(
    value: string | null | undefined | Date,
    defaultValue: string | null | undefined = 'Nav',
) {
    if (!value) {
        return defaultValue;
    }

    const dateValue = value instanceof Date ? value : new Date(value);

    return dateValue.toLocaleString('lv-LV', {
        dateStyle: 'medium',
    });
}

function shorterDate(
    value: string | null | undefined | Date,
    defaultValue: string | null | undefined = null,
) {
    return value ? format(value, 'd. LLL yyyy', { locale: lv }) : defaultValue;
}

export function useLocalDate() {
    return { defaultDate, shorterDate };
}
