import { useMedicamentTypes } from '@/lib/hooks/current/use-medicament-types';
import { MedicamentTypePreview } from '@/lib/types/models/medicament/medicament-type-preview';
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
import { ScrollArea } from '../../ui/scroll-area';

type SelectMedicamentTypeProps = {
    selectedId?: MedicamentTypePreview['id'];
    onValueChange: (value: MedicamentTypePreview | undefined) => void;
    className?: string;
    exclude?: { id: number | undefined }[];
};

function FormSelectMedicamentType({
    message,
    className,
    ...rest
}: SelectMedicamentTypeProps & { message?: string }) {
    return (
        <div className={cn('relative', className)}>
            <SelectMedicamentType {...rest} className={message && 'pr-5'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormSelectMedicamentType;

function SelectMedicamentType({
    selectedId,
    onValueChange,
    className,
    exclude,
}: SelectMedicamentTypeProps) {
    const medicamentTypes = useMedicamentTypes();
    const excludeIds = new Set(exclude?.map((item) => item.id).filter((id) => id !== undefined));
    const items = medicamentTypes.data.filter((item) => !excludeIds.has(item.data.id));

    function getSelected() {
        return selectedId
            ? medicamentTypes.data.find((medicamentType) => medicamentType.data.id === selectedId)
                  ?.data
            : undefined;
    }

    const [selected, setSelected] = useState(getSelected);
    const [open, setOpen] = useState(false);

    const handleSelect = (value: MedicamentTypePreview | undefined) => {
        setSelected(value);
        setOpen(false);
        onValueChange(value);
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
                        {selected ? selected.name : 'Izvēlēties...'}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="rounded-none">
                    <CommandInput placeholder="Meklēt..." />
                    <CommandList className="pr-0">
                        <ScrollArea className="h-[300px] pr-1.5">
                            <CommandEmpty>Nekas neika atrasts</CommandEmpty>
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() => handleSelect(undefined)}
                                    className="hover:cursor-pointer"
                                >
                                    Atmest
                                </CommandItem>
                            </CommandGroup>

                            {items.length > 0 && (
                                <CommandGroup heading="Medikamenti">
                                    {items.map((medicament) => (
                                        <CommandItem
                                            key={medicament.data.id}
                                            value={medicament.data.name}
                                            onSelect={() => handleSelect(medicament.data)}
                                            className="w-full justify-start hover:cursor-pointer"
                                        >
                                            {medicament.data.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
