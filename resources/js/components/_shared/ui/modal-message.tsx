import { cn } from '@/lib/utils';
import { CircleAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

type ModalMessageProps = {
    side?: 'bottom' | 'top' | 'right' | 'left' | undefined;
    message: string | undefined;
    className?: string;
};

function ModalMessage({ side = 'top', message, className }: ModalMessageProps) {
    const [open, setOpen] = useState(false);

    if (!message) return null;

    return (
        <div className={cn('flex h-full items-center', className)}>
            <TooltipProvider>
                <Tooltip open={open} onOpenChange={setOpen}>
                    <TooltipTrigger asChild>
                        <Button
                            tabIndex={-1}
                            type="button"
                            variant={'transparent'}
                            size={'icon'}
                            className="size-fit rounded-full p-2"
                        >
                            <CircleAlertIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>
                        <p>{message}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default ModalMessage;
