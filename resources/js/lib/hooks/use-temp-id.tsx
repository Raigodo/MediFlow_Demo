import { nanoid } from 'nanoid';

const prefix = 'temp_id:';

export function useTempId() {
    function generate() {
        return `${prefix}${nanoid()}`;
    }
    function isTempId(id: string) {
        return id.startsWith(prefix);
    }
    return { generate, isTempId };
}
