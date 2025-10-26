import { useMedicaments } from '@/lib/hooks/current/use-medicaments';
import { MedicamentPreview } from '@/lib/types/models/medicament/medicament-preview';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../../ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../ui/command';
import ModalMessage from '../../ui/modal-message';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

type SelectMedicamentProps = {
    selectedId?: MedicamentPreview['id'];
    onValueChange: (selectedId: MedicamentPreview | undefined) => void;
    className?: string;
    exclude?: { id: string | undefined }[];
};

function FormSelectMedicament({
    message,
    className,
    ...rest
}: SelectMedicamentProps & { message?: string }) {
    return (
        <div className={cn('relative', className)}>
            <SelectMedicament {...rest} className={message && 'pr-5'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormSelectMedicament;

function SelectMedicament({
    selectedId,
    onValueChange,
    className,
    exclude,
}: SelectMedicamentProps) {
    const medicaments = useMedicaments();

    if (!medicaments) throw Error('can not proceed (no medicaments)');

    const excludeIds = new Set(exclude?.map((item) => item.id).filter((id) => id !== undefined));
    const items = medicaments.data.filter((item) => !excludeIds.has(item.data.id));
    const [selected, setSelected] = useState(getSelected);
    const [open, setOpen] = useState(false);

    function getSelected() {
        return selectedId
            ? medicaments?.data.find((medicament) => medicament.data.id === selectedId)?.data
            : undefined;
    }

    const handleSelect = (medicament: MedicamentPreview | undefined) => {
        setSelected(medicament);
        setOpen(false);
        onValueChange(medicament);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'underline'}
                    role="combobox"
                    aria-expanded={open}
                    className={cn('h-8 w-full justify-start font-normal', className)}
                >
                    <p className={cn('truncate', !selected && 'text-foreground/50')}>
                        {selected ? `${selected.medicamentType.data.name}` : 'Izvēlēties...'}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="rounded-none">
                    <CommandInput placeholder="Meklēt darbinieku..." />
                    <CommandList>
                        <div className="scrollbar-thumb-border scrollbar-thin scrollbar-track-transparent h-fit max-h-72 overflow-y-auto">
                            <CommandEmpty>Nekas netika atrasts</CommandEmpty>
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() => handleSelect(undefined)}
                                    className="hover:cursor-pointer"
                                >
                                    Notīrīt
                                </CommandItem>
                            </CommandGroup>

                            {items.length > 0 && (
                                <CommandGroup heading="Medikamenti">
                                    {items.map((medicament) => (
                                        <CommandItem
                                            key={medicament.data.id}
                                            value={medicament.data.medicamentType.data.name}
                                            onSelect={() => handleSelect(medicament.data)}
                                            className="w-full justify-start hover:cursor-pointer"
                                        >
                                            {medicament.data.medicamentType.data.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </div>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
