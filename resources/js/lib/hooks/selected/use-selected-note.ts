import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useNoteToWrite() {
    const { selected } = usePage<SelectedSlice>().props;
    const note = selected?.note;
    const tempNote = selected?.tempNote;
    if (!note && !tempNote) throw Error('no note to write');
    return (note ?? tempNote)!;
}

export function useSelectedNote() {
    const { selected } = usePage<SelectedSlice>().props;
    const note = selected?.note;
    if (!note) throw Error('no note selected');
    return note;
}

export function useSelectedNoteOrDefault() {
    const { selected } = usePage<SelectedSlice>().props;
    const note = selected?.note;
    if (!note) console.error('no note selected');
    return note;
}
