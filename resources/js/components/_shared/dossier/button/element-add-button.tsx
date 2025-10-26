import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

function ElementAddButton({
    className,
    onClick,
    hint,
}: {
    className?: string;
    onClick: () => void;
    hint?: string;
}) {
    return !hint ? (
        <Button
            tabIndex={-1}
            type="button"
            variant="outline"
            size={'icon'}
            className={cn('size-6 rounded-full p-0', className)}
            onClick={onClick}
        >
            <PlusIcon />
        </Button>
    ) : (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        tabIndex={-1}
                        type="button"
                        variant="outline"
                        size={'icon'}
                        className={cn('size-6 rounded-full p-0', className)}
                        onClick={onClick}
                    >
                        <PlusIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{hint}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ElementAddButton;
