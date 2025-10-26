import { Button } from '@/components/_shared/ui/button';
import { Label } from '@/components/_shared/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/_shared/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/_shared/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import TablePagelayout from '@/layouts/table-page-layout';
import {
    CalendarIcon,
    CircleAlertIcon,
    MoreVerticalIcon,
    SlidersHorizontalIcon,
    UserRoundIcon,
} from 'lucide-react';

function PromptClientPage() {
    return (
        <AppLayout
        //backStack={[{ label: 'Klienta izvēlne' }]}
        //TODO
        >
            <CentredLayout>
                <TablePagelayout>
                    <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-y-3 px-2 pt-1">
                        <div className="px-2 opacity-50">
                            <div className="grid grid-cols-[1fr_auto] items-center">
                                <Label className="text-md">Ieraksti</Label>
                                <div className="flex gap-x-2">
                                    <FilterButton />
                                    <DropdownActions />
                                </div>
                            </div>
                        </div>
                        <DisabledJournalTable />
                    </div>
                </TablePagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default PromptClientPage;

function DisabledJournalTable() {
    return (
        <Table className="table-fixed">
            <TableHeader className="bg-muted opacity-50">
                <TableRow className="hover:bg-transparent [&_svg]:pointer-events-none [&_svg]:size-4">
                    <TableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <CalendarIcon /> Datums
                        </div>
                    </TableHead>
                    <TableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <UserRoundIcon /> Autors
                        </div>
                    </TableHead>
                    <TableHead>Saturs</TableHead>
                    <TableHead className="w-16">
                        <div className="flex items-center justify-center">
                            <CircleAlertIcon />
                        </div>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4}>
                        <div className="flex h-12 items-center justify-center">
                            Nav izvēlēts neviens klients
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

function FilterButton() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={'ghost'} disabled>
                        <SlidersHorizontalIcon /> Filtrēt
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>Filtrēt ierakstus</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function DropdownActions() {
    return (
        <Button disabled variant={'ghost'} size={'icon'}>
            <MoreVerticalIcon />
        </Button>
    );
}
