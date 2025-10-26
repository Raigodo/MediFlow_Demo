import { useMedicamentTypes } from '@/lib/hooks/current/use-medicament-types';
import { MeasurementTypePreview } from '@/lib/types/models/measurement/measurement-type-preview';
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

type SelectMeasurementTypeProps = {
    selectedId?: MeasurementTypePreview['id'];
    onValueChange: (value: MedicamentTypePreview | undefined) => void;
    className?: string;
};

function FormSelectMeasurementType({
    message,
    className,
    ...rest
}: SelectMeasurementTypeProps & { message?: string }) {
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

export default FormSelectMeasurementType;

function SelectMedicamentType({
    selectedId,
    onValueChange,
    className,
}: SelectMeasurementTypeProps) {
    const medicamentTypes = useMedicamentTypes();

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

                            <CommandGroup heading="Medikamenti">
                                {medicamentTypes.data.map((measurementType) => (
                                    <CommandItem
                                        key={measurementType.data.id}
                                        value={measurementType.data.name}
                                        onSelect={() => handleSelect(measurementType.data)}
                                        className="w-full justify-start hover:cursor-pointer"
                                    >
                                        {measurementType.data.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
