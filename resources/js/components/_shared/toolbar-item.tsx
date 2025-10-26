import { ToolbarIconMap } from '@/lib/preset/toolbar/toolbar-icon-map';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ButtonVariant, buttonVariants } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type ToolbarItemProps = {
    iconKey: keyof ToolbarIconMap;
    href: string;
    hint: string;
    variant?: ButtonVariant;
    preventCustomColor?: boolean;
};

function ToolbarItem({
    iconKey,
    href,
    hint,
    variant = 'ghost',
    preventCustomColor,
}: ToolbarItemProps) {
    const { url } = usePage();
    const path = new URL(href).pathname;
    const isActive = url.startsWith(path);
    const Icon = ToolbarIconMap[iconKey];

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        buttonVariants({ variant }),
                        'aspect-square h-auto w-full',
                        !preventCustomColor && isActive && 'bg-secondary hover:bg-secondary/90',
                    )}
                >
                    <Icon />
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{hint}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default ToolbarItem;
