import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ className }: { className?: string }) {
    return <Loader2 className={cn('text-muted-foreground animate-spin', className)} />;
}
