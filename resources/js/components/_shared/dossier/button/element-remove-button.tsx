import { cn } from '@/lib/utils';
import { MinusIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

function ElementRemoveButton({
    className,
    onClick,
    hint,
}: {
    className?: string;
    onClick: () => void;
    hint: string;
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        tabIndex={-1}
                        type="button"
                        variant="outline"
                        size={'icon'}
                        className={cn('m-0 size-6 rounded-full p-0', className)}
                        onClick={onClick}
                    >
                        <MinusIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{hint}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ElementRemoveButton;
