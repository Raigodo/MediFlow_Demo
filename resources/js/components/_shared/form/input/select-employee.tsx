import { useEmployeeCollection } from '@/lib/hooks/collections/use-employee-collection';
import { EmployeePreview } from '@/lib/types/models/employee/employee-preview';
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
import UserName from '../../user-name';

type SelectEmployeeProps = {
    selectedId?: string;
    onValueChange: (value: EmployeePreview | undefined) => void;
    className?: string;
};

function FormSelectEmployee({
    message,
    className,
    ...rest
}: SelectEmployeeProps & { message?: string }) {
    return (
        <div className={cn('relative', className)}>
            <SelectEmployee {...rest} className={message && 'pr-5'} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default FormSelectEmployee;

function SelectEmployee({ selectedId, onValueChange, className }: SelectEmployeeProps) {
    const employees = useEmployeeCollection().data.map((item) => item.data);
    const items = employees.filter((employee) => !!employee.user);

    function getSelected() {
        return selectedId ? employees.find((employee) => employee.id === selectedId) : undefined;
    }

    const [selected, setSelected] = useState<EmployeePreview | undefined>(getSelected);
    const [open, setOpen] = useState(false);

    const handleSelect = (employee: EmployeePreview | undefined) => {
        setSelected(employee);
        setOpen(false);
        onValueChange(employee);
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
                        {selected ? <UserName user={selected.user?.data} /> : 'Izvēlēties...'}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="rounded-none">
                    <CommandInput placeholder="Meklēt..." />
                    <CommandList>
                        <div className="scrollbar-thumb-border scrollbar-thin scrollbar-track-transparent h-fit max-h-72 overflow-y-auto">
                            <CommandEmpty>Nekas neika atrasts</CommandEmpty>
                            <CommandGroup heading="Cits">
                                <CommandItem
                                    onSelect={() => handleSelect(undefined)}
                                    className="hover:cursor-pointer"
                                >
                                    Atmest
                                </CommandItem>
                            </CommandGroup>

                            <CommandGroup heading="Darbinieki">
                                {items.map((employee) => {
                                    const displayName = `${employee.user?.data.name.charAt(0)}. ${employee.user?.data.surname}`;
                                    return (
                                        <CommandItem
                                            key={employee.id}
                                            value={displayName}
                                            onSelect={() => handleSelect(employee)}
                                            className="w-full justify-start hover:cursor-pointer"
                                        >
                                            {displayName}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
