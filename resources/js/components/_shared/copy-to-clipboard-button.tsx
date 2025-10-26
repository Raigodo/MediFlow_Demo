import { cn } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

function CopyToClipboardButton({
    value,
    hint,
    className,
}: {
    value: string;
    hint?: string;
    className?: string;
}) {
    const copyInvitationToken = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        value: string,
    ) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
    };

    return (
        <TooltipProvider>
            <Tooltip defaultOpen={false}>
                <TooltipTrigger asChild>
                    <Button
                        autoFocus={false}
                        size={'icon'}
                        variant={'ghost'}
                        onClick={(e) => copyInvitationToken(e, value)}
                        className={cn('aspect-square h-full w-auto rounded-[30%]', className)}
                    >
                        <CopyIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{hint}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default CopyToClipboardButton;
