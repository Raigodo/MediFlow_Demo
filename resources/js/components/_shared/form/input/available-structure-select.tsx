import { useAccessibleStructures } from '@/lib/hooks/current/use-accessible-structure-collection-resource';
import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';
import ProcessingOverlay from '../processing-overlay';

type AvailableStructureSelectProps = {
    value?: StructurePreviewResource;
    processing?: boolean;
    onValueChange: (value: StructurePreviewResource) => void;
};

function AvailableStructureSelect({
    value,
    onValueChange,
    processing = false,
}: AvailableStructureSelectProps) {
    const structures = useAccessibleStructures();

    function handleValueChange(structureId: string) {
        const structure = structures.data.find((structure) => structure.data.id === structureId);
        if (structure && structure.data.id !== value?.data.id) onValueChange(structure);
        else throw Error('selected structure not found');
    }

    return (
        <Select value={value?.data.id ?? ''} onValueChange={handleValueChange}>
            <SelectTrigger
                data-size="custom"
                className="text-muted-foreground size-full py-0 text-sm font-normal"
            >
                <ProcessingOverlay processing={processing}>
                    <SelectValue placeholder="izvēlēties struktūrvienību" />
                </ProcessingOverlay>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="px-2">Pieejamās struktūrvienības</SelectLabel>
                    {structures.data.map((structure) => (
                        <SelectItem key={structure.data.id} value={structure.data.id}>
                            {structure.data.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default AvailableStructureSelect;
